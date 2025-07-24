# Explicação Detalhada dos Arquivos de Configuração Kubernetes

Este documento detalha, linha a linha, o propósito e a função de cada componente nos arquivos de configuração Kubernetes do seu projeto.

---

## `k8s/namespace.yaml`

Define um namespace para a aplicação principal. Namespaces ajudam a organizar recursos dentro de um cluster Kubernetes.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: Namespace
# metadata: Contém metadados sobre o objeto, como seu nome.
metadata:
  # name: O nome do namespace.
  name: lanchonete-tc2
```

---

## `k8s/db-namespace.yaml`

Define um namespace separado para o banco de dados, promovendo isolamento e organização.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: Namespace
# metadata: Contém metadados sobre o objeto, como seu nome.
metadata:
  # name: O nome do namespace do banco de dados.
  name: lanchonete-db
```

---

## `k8s/configMap.yaml`

Armazena dados de configuração não sensíveis em pares chave-valor. Usado para injetar configurações na aplicação.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: ConfigMap
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do ConfigMap.
  name: api-configmap
  # namespace: O namespace onde este ConfigMap será criado.
  namespace: lanchonete-tc2
# data: A seção onde os pares chave-valor de configuração são definidos.
data:
  # API_BASE_URL: Uma variável de ambiente para a URL base da API do Mercado Pago.
  API_BASE_URL: "https://api.mercadopago.com/v1/payments"
  # NODE_TLS_REJECT_UNAUTHORIZED: Desativa a verificação de certificado TLS para Node.js.
  # Geralmente usado em ambientes de desenvolvimento ou com certificados autoassinados.
  NODE_TLS_REJECT_UNAUTHORIZED: "0"
```

---

## `k8s/secrets.yaml`

Armazena dados sensíveis (como senhas, tokens) de forma segura (base64 encoded). Usado para injetar credenciais na aplicação.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: Secret
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do Secret.
  name: api-secrets
  # namespace: O namespace onde este Secret será criado.
  namespace: lanchonete-tc2
# type: O tipo de Secret. 'Opaque' é o tipo padrão para dados arbitrários.
type: Opaque
# data: A seção onde os pares chave-valor de dados sensíveis são definidos.
# Os valores devem ser codificados em base64.
data:
  # DB_USER: Usuário do banco de dados (admin, codificado em base64).
  DB_USER: "YWRtaW4=" # admin
  # DB_PASSWORD: Senha do banco de dados (admin, codificado em base64).
  DB_PASSWORD: "YWRtaW4=" # admin
  # DB_NAME: Nome do banco de dados (lanchonete_db, codificado em base64).
  DB_NAME: "bGFuY2hvbmV0ZV9kYg==" # lanchonete_db
  # ACCESS_TOKEN: Token de acesso para a API (exemplo de token, codificado em base64).
  ACCESS_TOKEN: "VEVTVC0yMzI0MjEyOTg5MzMyNzIxLTA1MjEyMS1mZjZlMDE1NjM0M2RlYjgyNjQ2MzY2OTMwZjYyMmVjYS0zNzQwMTc5OTQ=" # TEST-2324212989332721-052121-ff6e0156343deb82646366930f622eca-374017994
  # DATABASE_URL: URL de conexão completa do banco de dados, incluindo o FQDN do serviço.
  # (postgresql://admin:admin@postgres-db-service.lanchonete-db.svc.cluster.local:5432/lanchonete_db?schema=public, codificado em base64)
  DATABASE_URL: "cG9zdGdyZXNxbDovL2FkbWluOmFkbWluQHBvc3RncmVzLWRiLXNlcnZpY2UubGFuY2hvbmV0ZS1kYi5zdmMuY2x1c3Rlci5sb2NhbDo1NDMyL2xhbmNob25ldGVfZGI/c2NoZW1hPXB1YmxpYw==" # postgresql://admin:admin@postgres-db-service.lanchonete-db.svc.cluster.local:5432/lanchonete_db?schema=public
```

---

## `k8s/db-secrets.yaml`

Este Secret é dedicado às credenciais do banco de dados e é criado no namespace do banco de dados (`lanchonete-db`). Isso garante que apenas os recursos dentro desse namespace tenham acesso direto a essas credenciais.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: Secret
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do Secret.
  name: db-credentials-secret
  # namespace: O namespace onde este Secret será criado.
  namespace: lanchonete-db
# type: O tipo de Secret. 'Opaque' é o tipo padrão para dados arbitrários.
type: Opaque
# data: A seção onde os pares chave-valor de dados sensíveis são definidos.
# Os valores devem ser codificados em base64.
data:
  # DB_USER: Usuário do banco de dados (admin, codificado em base64).
  DB_USER: "YWRtaW4="
  # DB_PASSWORD: Senha do banco de dados (admin, codificado em base64).
  DB_PASSWORD: "YWRtaW4="
  # DB_NAME: Nome do banco de dados (lanchonete_db, codificado em base64).
  DB_NAME: "bGFuY2hvbmV0ZV9kYg=="
```

---

## `k8s/db-deployment.yaml`

Define o Deployment para o banco de dados PostgreSQL, incluindo a configuração do PersistentVolumeClaim para armazenamento persistente.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: apps/v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: Deployment
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do Deployment.
  name: postgres-db
  # namespace: O namespace onde este Deployment será criado.
  namespace: lanchonete-db
# spec: Define as especificações desejadas para o Deployment.
spec:
  # replicas: O número de réplicas (pods) que o Deployment deve manter.
  replicas: 1
  # selector: Define como o Deployment encontra os pods que ele deve gerenciar.
  selector:
    # matchLabels: Os rótulos que os pods devem ter para serem selecionados.
    matchLabels:
      app: postgres-db
  # template: O modelo para os pods que serão criados por este Deployment.
  template:
    # metadata: Metadados para os pods.
    metadata:
      # labels: Rótulos aplicados aos pods.
      labels:
        app: postgres-db
    # spec: Especificações para os contêineres dentro do pod.
    spec:
      # containers: Lista de contêineres que serão executados no pod.
      - name: postgres
        # image: A imagem Docker a ser usada para o contêiner.
        image: postgres:15-alpine
        # ports: As portas que o contêiner expõe.
        ports:
        - containerPort: 5432
        # livenessProbe: Define uma sonda para verificar se o contêiner está em execução e saudável.
        # Se a sonda falhar, o Kubernetes reiniciará o contêiner.
        livenessProbe:
          # exec: O comando a ser executado dentro do contêiner para a sonda.
          exec:
            command:
            - pg_isready
            - -U
            - $(POSTGRES_USER) # Usa a variável de ambiente para o usuário do DB.
            - -d
            - $(POSTGRES_DB)  # Usa a variável de ambiente para o nome do DB.
          # initialDelaySeconds: Tempo em segundos para esperar antes de iniciar a sonda.
          initialDelaySeconds: 30
          # periodSeconds: Frequência da execução da sonda em segundos.
          periodSeconds: 10
        # readinessProbe: Define uma sonda para verificar se o contêiner está pronto para receber tráfego.
        # Se a sonda falhar, o Kubernetes não enviará tráfego para este contêiner.
        readinessProbe:
          # exec: O comando a ser executado dentro do contêiner para a sonda.
          exec:
            command:
            - pg_isready
            - -U
            - $(POSTGRES_USER) # Usa a variável de ambiente para o usuário do DB.
            - -d
            - $(POSTGRES_DB)  # Usa a variável de ambiente para o nome do DB.
          # initialDelaySeconds: Tempo em segundos para esperar antes de iniciar a sonda.
          initialDelaySeconds: 5
          # periodSeconds: Frequência da execução da sonda em segundos.
          periodSeconds: 5
        # env: Variáveis de ambiente a serem injetadas no contêiner.
        env:
        # name: Nome da variável de ambiente.
        - name: POSTGRES_DB
          # valueFrom: Obtém o valor de uma fonte externa (Secret, ConfigMap).
          valueFrom:
            # secretKeyRef: Referencia uma chave específica dentro de um Secret.
            secretKeyRef:
              # name: O nome do Secret.
              name: db-credentials-secret
              # key: A chave dentro do Secret cujo valor será usado.
              key: DB_NAME
        - name: POSTGRES_USER
          valueFrom:
            secretKeyRef:
              name: db-credentials-secret
              key: DB_USER
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials-secret
              key: DB_PASSWORD
        # volumeMounts: Monta volumes dentro do contêiner.
        volumeMounts:
        - name: postgres-storage
          # mountPath: O caminho dentro do contêiner onde o volume será montado.
          mountPath: /var/lib/postgresql/data
      # volumes: Define os volumes que podem ser montados pelos contêineres no pod.
      volumes:
      - name: postgres-storage
        # persistentVolumeClaim: Referencia um PersistentVolumeClaim existente.
        persistentVolumeClaim:
          # claimName: O nome do PersistentVolumeClaim a ser usado.
          claimName: db-pvc
---
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: PersistentVolumeClaim
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do PersistentVolumeClaim.
  name: db-pvc
  # namespace: O namespace onde este PVC será criado.
  namespace: lanchonete-db
# spec: Define as especificações desejadas para o PVC.
spec:
  # accessModes: Define como o volume pode ser acessado (e.g., ReadWriteOnce, ReadOnlyMany).
  accessModes:
    - ReadWriteOnce # O volume pode ser montado como leitura-escrita por um único nó.
  # resources: Define os recursos de armazenamento solicitados.
  resources:
    # requests: Os recursos mínimos solicitados.
    requests:
      # storage: A quantidade de armazenamento solicitada.
      storage: 1Gi
```

---

## `k8s/db-service.yaml`

Define um Service para o banco de dados PostgreSQL, permitindo que outros pods no cluster se conectem a ele.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: Service
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do Service.
  name: postgres-db-service
  # namespace: O namespace onde este Service será criado.
  namespace: lanchonete-db
# spec: Define as especificações desejadas para o Service.
spec:
  # selector: Define como o Service encontra os pods que ele deve rotear o tráfego.
  selector:
    app: postgres-db
  # ports: As portas que o Service expõe.
  ports:
    - protocol: TCP # O protocolo de rede (TCP, UDP, SCTP).
      port: 5432    # A porta que o Service expõe internamente no cluster.
      targetPort: 5432 # A porta no pod para a qual o tráfego será roteado.
```

---

## `k8s/api-deployment.yaml`

Define o Deployment para a aplicação principal (API), gerenciando seus pods e contêineres.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: apps/v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: Deployment
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do Deployment.
  name: api-deployment
  # namespace: O namespace onde este Deployment será criado.
  namespace: lanchonete-tc2
# spec: Define as especificações desejadas para o Deployment.
spec:
  # replicas: O número de réplicas (pods) que o Deployment deve manter.
  replicas: 1
  # selector: Define como o Deployment encontra os pods que ele deve gerenciar.
  selector:
    # matchLabels: Os rótulos que os pods devem ter para serem selecionados.
    matchLabels:
      app: api
  # template: O modelo para os pods que serão criados por este Deployment.
  template:
    # metadata: Metadados para os pods.
    metadata:
      # labels: Rótulos aplicados aos pods.
      labels:
        app: api
    # spec: Especificações para os contêineres dentro do pod.
    spec:
      # containers: Lista de contêineres que serão executados no pod.
      - name: api
        # image: A imagem Docker a ser usada para o contêiner.
        image: fealves/tc2:latest # Use a mesma imagem da app
        # imagePullPolicy: Define quando o Kubernetes deve tentar puxar a imagem.
        # IfNotPresent: Puxa a imagem apenas se ela não estiver presente localmente.
        imagePullPolicy: IfNotPresent
        # ports: As portas que o contêiner expõe.
        ports:
        - containerPort: 3000
        # readinessProbe: Define uma sonda para verificar se o contêiner está pronto para receber tráfego.
        # Se a sonda falhar, o Kubernetes não enviará tráfego para este contêiner.
        readinessProbe:
          # httpGet: Define uma sonda HTTP GET.
          httpGet:
            # path: O caminho HTTP a ser acessado.
            path: /health
            # port: A porta no contêiner a ser acessada.
            port: 3000
          # initialDelaySeconds: Tempo em segundos para esperar antes de iniciar a sonda.
          initialDelaySeconds: 15
          # periodSeconds: Frequência da execução da sonda em segundos.
          periodSeconds: 5
        # livenessProbe: Define uma sonda para verificar se o contêiner está em execução e saudável.
        # Se a sonda falhar, o Kubernetes reiniciará o contêiner.
        livenessProbe:
          # httpGet: Define uma sonda HTTP GET.
          httpGet:
            # path: O caminho HTTP a ser acessado.
            path: /health
            # port: A porta no contêiner a ser acessada.
            port: 3000
          # initialDelaySeconds: Tempo em segundos para esperar antes de iniciar a sonda.
          initialDelaySeconds: 30
          # periodSeconds: Frequência da execução da sonda em segundos.
          periodSeconds: 10
        # envFrom: Injeta todas as chaves de um ConfigMap ou Secret como variáveis de ambiente.
        envFrom:
        - configMapRef: # Referencia um ConfigMap.
            name: api-configmap # O nome do ConfigMap.
        - secretRef:    # Referencia um Secret.
            name: api-secrets   # O nome do Secret.
        # resources: Define os limites e requisições de recursos para o contêiner.
        resources:
          # requests: Os recursos mínimos garantidos para o contêiner.
          requests:
            memory: "256Mi" # 256 Megabytes de memória.
            cpu: "250m"     # 250 milicores de CPU (0.25 de um core).
          # limits: Os limites máximos de recursos que o contêiner pode consumir.
          limits:
            memory: "512Mi" # 512 Megabytes de memória.
            cpu: "500m"     # 500 milicores de CPU (0.5 de um core).
```

---

## `k8s/api-service.yaml`

Define um Service para a aplicação API, expondo-a dentro e fora do cluster.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: Service
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do Service.
  name: api-service
  # namespace: O namespace onde este Service será criado.
  namespace: lanchonete-tc2
# spec: Define as especificações desejadas para o Service.
spec:
  # selector: Define como o Service encontra os pods que ele deve rotear o tráfego.
  selector:
    app: api
  # ports: As portas que o Service expõe.
  ports:
    - protocol: TCP # O protocolo de rede (TCP, UDP, SCTP).
      port: 80      # A porta que o Service expõe internamente no cluster.
      targetPort: 3000 # A porta no pod para a qual o tráfego será roteado.
      # nodePort: A porta que será aberta em cada nó do cluster para expor o serviço.
      # O Kind mapeia esta porta para uma porta no seu host (definida em kind-config.yaml).
      nodePort: 30000
  # type: O tipo de Service. NodePort expõe o serviço em uma porta estática em cada nó.
  type: NodePort
```

---

## `k8s/api-hpa.yaml`

Define um Horizontal Pod Autoscaler (HPA) para a aplicação API, permitindo que o número de réplicas seja ajustado automaticamente com base na utilização de CPU e memória.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: autoscaling/v2
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: HorizontalPodAutoscaler
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do HPA.
  name: api-hpa
  # namespace: O namespace onde este HPA será criado.
  namespace: lanchonete-tc2
# spec: Define as especificações desejadas para o HPA.
spec:
  # scaleTargetRef: Referência ao objeto que o HPA deve escalar (neste caso, um Deployment).
  scaleTargetRef:
    # apiVersion: A versão da API do objeto alvo.
    apiVersion: apps/v1
    # kind: O tipo do objeto alvo.
    kind: Deployment
    # name: O nome do objeto alvo.
    name: api-deployment
  # minReplicas: O número mínimo de réplicas que o HPA deve manter.
  minReplicas: 1
  # maxReplicas: O número máximo de réplicas que o HPA pode escalar.
  maxReplicas: 5
  # metrics: Define as métricas que o HPA usará para escalar.
  metrics:
  - type: Resource # Tipo de métrica baseada em recursos (CPU, memória).
    resource:
      # name: O nome do recurso a ser monitorado.
      name: cpu
      # target: O valor alvo para a métrica.
      target:
        # type: Tipo de alvo (Utilization, AverageValue, Value).
        type: Utilization
        # averageUtilization: Porcentagem média de utilização do recurso.
        # O HPA tentará manter a utilização média da CPU em 80%.
        averageUtilization: 80
  - type: Resource # Tipo de métrica baseada em recursos (CPU, memória).
    resource:
      # name: O nome do recurso a ser monitorado.
      name: memory
      # target: O valor alvo para a métrica.
      target:
        # type: Tipo de alvo (Utilization, AverageValue, Value).
        type: Utilization
        # averageUtilization: Porcentagem média de utilização do recurso.
        # O HPA tentará manter a utilização média da memória em 80%.
        averageUtilization: 80
```

---

## `k8s/secrets.yaml`

Armazena dados sensíveis (como senhas, tokens) de forma segura (base64 encoded). Usado para injetar credenciais na aplicação.

```yaml
# apiVersion: Define a versão da API Kubernetes que este objeto usa.
apiVersion: v1
# kind: Define o tipo de objeto Kubernetes que está sendo criado.
kind: Secret
# metadata: Contém metadados sobre o objeto.
metadata:
  # name: O nome do Secret.
  name: api-secrets
  # namespace: O namespace onde este Secret será criado.
  namespace: lanchonete-tc2
# type: O tipo de Secret. 'Opaque' é o tipo padrão para dados arbitrários.
type: Opaque
# data: A seção onde os pares chave-valor de dados sensíveis são definidos.
# Os valores devem ser codificados em base64.
data:
  # DB_USER: Usuário do banco de dados (admin, codificado em base64).
  DB_USER: "YWRtaW4=" # admin
  # DB_PASSWORD: Senha do banco de dados (admin, codificado em base64).
  DB_PASSWORD: "YWRtaW4=" # admin
  # DB_NAME: Nome do banco de dados (lanchonete_db, codificado em base64).
  DB_NAME: "bGFuY2hvbmV0ZV9kYg==" # lanchonete_db
  # ACCESS_TOKEN: Token de acesso para a API (exemplo de token, codificado em base64).
  ACCESS_TOKEN: "VEVTVC0yMzI0MjEyOTg5MzMyNzIxLTA1MjEyMS1mZjZlMDE1NjM0M2RlYjgyNjQ2MzY2OTMwZjYyMmVjYS0zNzQwMTc5OTQ=" # TEST-2324212989332721-052121-ff6e0156343deb82646366930f622eca-374017994
  # DATABASE_URL: URL de conexão completa do banco de dados, incluindo o FQDN do serviço.
  # (postgresql://admin:admin@postgres-db-service.lanchonete-db.svc.cluster.local:5432/lanchonete_db?schema=public, codificado em base64)
  DATABASE_URL: "cG9zdGdyZXNxbDovL2FkbWluOmFkbWluQHBvc3RncmVzLWRiLXNlcnZpY2UubGFuY2hvbmV0ZS1kYi5zdmMuY2x1c3Rlci5sb2NhbDo1NDMyL2xhbmNob25ldGVfZGI/c2NoZW1hPXB1YmxpYw==" # postgresql://admin:admin@postgres-db-service.lanchonete-db.svc.cluster.local:5432/lanchonete_db?schema=public
```

---

## `kind/kind-config.yaml`

Define a configuração para o cluster Kind, incluindo o mapeamento de portas do host para o nó do cluster.

```yaml
# kind: Define o tipo de objeto de configuração do Kind.
kind: Cluster
# apiVersion: Define a versão da API de configuração do Kind.
apiVersion: kind.x-k8s.io/v1alpha4
# nodes: Lista de nós que comporão o cluster.
nodes:
- role: control-plane # Define o papel do nó no cluster (nó de controle ou worker).
  # extraPortMappings: Mapeia portas do host para o contêiner do nó Kind.
  extraPortMappings:
  - containerPort: 30000 # A porta no contêiner do nó Kind que será mapeada.
                         # Esta é a porta NodePort do seu serviço API.
    hostPort: 8080       # A porta no seu host (máquina local) que será acessível.
    protocol: TCP        # O protocolo de rede.
```

---
