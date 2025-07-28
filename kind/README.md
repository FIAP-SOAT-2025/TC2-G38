# Testando o Ambiente Kubernetes Localmente com Kind

Este guia descreve como usar o [Kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker) para criar um cluster Kubernetes local e testar as configurações deste projeto. A arquitetura utiliza namespaces separados para a aplicação (`lanchonete-tc2`) e para o banco de dados (`lanchonete-db`), seguindo boas práticas de isolamento de recursos.

## Pré-requisitos

1.  **Docker**: Garanta que o [Docker Desktop](https://www.docker.com/products/docker-desktop/) ou o Docker Engine esteja instalado e em execução.
2.  **kubectl**: A ferramenta de linha de comando do Kubernetes. Siga o [guia de instalação oficial](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/).
3.  **Kind**: A ferramenta para executar o Kubernetes localmente. Siga o [guia de instalação oficial](https://kind.sigs.k8s.io/docs/user/quick-start/#installation).

## Passo a Passo

### 1. Limpar e Recriar o Cluster Kind

É crucial começar com um ambiente limpo para evitar conflitos de configurações anteriores. Além disso, para resolver problemas de `ErrImagePull` (como `tls: failed to verify certificate`), vamos pré-carregar a imagem do PostgreSQL no cluster.

```bash
# 1. Deleta o cluster Kind existente (se houver)
kind delete cluster --name lanchonete-cluster

# 2. Recria o cluster Kind com o mapeamento de portas
kind create cluster --name lanchonete-cluster --config kind/kind-config.yaml

# 3. Baixa a imagem do PostgreSQL para o seu Docker local (se ainda não tiver)
docker pull postgres:15-alpine

# 4. Carrega a imagem do PostgreSQL diretamente no cluster Kind
kind load docker-image postgres:15-alpine --name lanchonete-cluster
```

### 2. Aplicar as Configurações do Kubernetes

Com o cluster em execução e a imagem do PostgreSQL carregada, aplique os manifestos do Kubernetes na ordem correta. A ordem é importante para garantir que os namespaces e as dependências existam antes dos recursos que os utilizam.

Execute os seguintes comandos a partir da raiz do projeto:

```bash
# 1. Crie os Namespaces para a aplicação e o banco
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/db-namespace.yaml

# 2. Crie os recursos da aplicação no namespace lanchonete-tc2
kubectl apply -f k8s/configMap.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/api-service.yaml
kubectl apply -f k8s/api-hpa.yaml

# 3. Crie o Secret específico para as credenciais do banco de dados no namespace lanchonete-db
kubectl apply -f k8s/db-secrets.yaml

# 4. Crie os recursos do banco de dados no namespace lanchonete-db
kubectl apply -f k8s/db-deployment.yaml
kubectl apply -f k8s/db-service.yaml

# 5. Finalmente, faça o deploy da aplicação no namespace lanchonete-tc2
kubectl apply -f k8s/api-deployment.yaml

# 6. Crie o pod para rodar as migrates e seeds. Obs rodar após lanchonete-db esteja Running
kubectl apply -f k8s/db-migrate-seed-job.yaml

# 7. Ou execute todos os comandos 
kubectl apply -f k8s/namespace.yaml && kubectl apply -f k8s/db-namespace.yaml && kubectl apply -f k8s/configMap.yaml && kubectl apply -f k8s/secrets.yaml && kubectl apply -f k8s/api-service.yaml && kubectl apply -f k8s/api-hpa.yaml && kubectl apply -f k8s/db-secrets.yaml && kubectl apply -f k8s/db-deployment.yaml && kubectl apply -f k8s/db-service.yaml && kubectl apply -f k8s/api-deployment.yaml && kubectl apply -f k8s/db-migrate-seed-job.yaml
```

### 3. Instalação do Metrics Server

O Metrics Server é um agregador de dados de uso de recursos (CPU e memória) do cluster, essencial para o funcionamento do Horizontal Pod Autoscaler (HPA).

1.  **Aplicar o manifesto do Metrics Server:**
    Este comando instala os componentes básicos do Metrics Server no namespace `kube-system`.
    ```bash
    kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
    ```

2.  **Obter o nome da imagem do Metrics Server:**
    Precisamos do nome exato da imagem para carregá-la no cluster Kind.
    ```bash
    kubectl get deployment metrics-server -n kube-system -o jsonpath='{.spec.template.spec.containers[0].image}'
    ```
    A saída será algo como `registry.k8s.io/metrics-server/metrics-server:v0.8.0`.

3.  **Baixar a imagem do Docker (opcional, se já não tiver):**
    Se a imagem ainda não estiver no seu cache local do Docker, baixe-a.
    ```bash
    docker pull registry.k8s.io/metrics-server/metrics-server:v0.8.0 # Substitua pela imagem obtida no passo anterior
    ```

4.  **Carregar a imagem no cluster Kind:**
    Em ambientes Kind, os nós do cluster podem não ter acesso direto ao Docker Hub. Carregar a imagem localmente garante que ela esteja disponível para os pods.
    ```bash
    kind load docker-image registry.k8s.io/metrics-server/metrics-server:v0.8.0 -n lanchonete-cluster # Substitua pela imagem e nome do cluster
    ```

5.  **Aplicar patch de TLS (para Kind):**
    Em alguns ambientes Kind, o Metrics Server pode ter problemas para se comunicar com o Kubelet devido a certificados TLS. Este patch adiciona um argumento para ignorar a verificação de TLS.
    ```bash
    kubectl patch deployment metrics-server -n kube-system --type='json' -p='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--kubelet-insecure-tls"}]'
    ```

### 4. Verificar o Status do Deploy

Monitore a criação dos pods em ambos os namespaces para garantir que tudo suba corretamente. Você pode abrir dois terminais para observar ambos simultaneamente.

**Terminal 1 - Monitorar a Aplicação:**
```bash
kubectl get pods -n lanchonete-tc2 --watch
```

**Terminal 2 - Monitorar o Banco de Dados:**
```bash
kubectl get pods -n lanchonete-db --watch
```

Aguarde até que os pods em ambos os namespaces estejam com o status `Running`.

### 5. Testar a Aplicação

Quando os pods estiverem prontos, a aplicação estará acessível.

-   **Endpoint de Health Check**: Abra seu navegador e acesse [http://localhost:8080/health](http://localhost:8080/health). Você deve receber a resposta `{"status":"ok"}`.
-   **Outros Endpoints**: Utilize uma ferramenta como Postman ou `curl` para testar as outras funcionalidades da API.

### 6. Limpar o Ambiente

Após concluir os testes, você pode remover o cluster para liberar os recursos da sua máquina.

```bash
kind delete cluster --name lanchonete-cluster
```
