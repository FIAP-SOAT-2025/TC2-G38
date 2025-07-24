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
```

### 3. Verificar o Status do Deploy

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

### 4. Testar a Aplicação

Quando os pods estiverem prontos, a aplicação estará acessível.

-   **Endpoint de Health Check**: Abra seu navegador e acesse [http://localhost:8080/health](http://localhost:8080/health). Você deve receber a resposta `{"status":"ok"}`.
-   **Outros Endpoints**: Utilize uma ferramenta como Postman ou `curl` para testar as outras funcionalidades da API.

### 5. Limpar o Ambiente

Após concluir os testes, você pode remover o cluster para liberar os recursos da sua máquina.

```bash
kind delete cluster --name lanchonete-cluster
```