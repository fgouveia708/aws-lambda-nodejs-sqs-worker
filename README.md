

# Processando filas com Amazon SQS e AWS Lambda (NodeJS)

Esta é uma aplicação que demonstra como desenvolver e implantar um serviço PRODUCER-CONSUMER utilizando SERVERLESS com Serverless Framework, AWS Lambda, Amazon SQS e Amazon API Gateway.

  - [Como funciona](https://github.com/fgouveia708/aws-lambda-nodejs-sqs-worker#como-funciona)
  - [Setup](https://github.com/fgouveia708/aws-lambda-nodejs-sqs-worker#setup)
  - [Deployment](https://github.com/fgouveia708/aws-lambda-nodejs-sqs-worker#deployment)
  - [Uso](https://github.com/fgouveia708/aws-lambda-nodejs-sqs-worker#uso)

## Como funciona

Esta aplicação possui duas funções, o `producer` é acionado pelo evento `http`, aceita um JSON e envia para uma fila do SQS para processamento posterior e o `consumer` que é responsável pelo processamento das mensagens da fila do SQS.

Além disso, a aplicação disponibiliza o provisionamento de uma outra fila para devoluções do SQS. A fila de devoluções é definida para evitar o processamento de mensagens inválidas repetidamente. Em nosso caso, se a mensagem for entregue à fila de origem mais de 5 vezes, ela será movida para a fila de devoluções. 


## Setup

1. Instalar [NodeJS](https://nodejs.org/en/)
2. Instalar [Serverless](https://www.serverless.com/)

```bash
npm install serverless -g
```

## Deployment

1. Configurar AWS credentials:
   
```bash
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_SESSION_TOKEN="..."
```
Veja como configurar no artigo: [Como configurar o Serverless Framework com AWS Lambda](https://fernandogouveia.medium.com/como-configurar-o-serverless-framework-com-aws-lambda-10c302846a67) 

2. Publicar aplicação:

```bash
serverless deploy
```

O resultado esperado deve ser semelhante a:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...

Service Information
service: aws-lambda-nodejs-sqs-worker
stage: dev
region: us-east-1
stack: aws-lambda-nodejs-sqs-worker-dev
resources: 17
api keys:
  None
endpoints:
  POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/produce
functions:
  producer: aws-lambda-nodejs-sqs-worker-dev-producer
  consumer: aws-lambda-nodejs-sqs-worker-dev-consumer
layers:
  None
```

## Uso

Assim que sua publicação foi concluída, você pode fazer a chamada para o endpoint da API com o método `POST` na requisição invocando a função `producer`:


```bash
curl --request POST 'https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/produce' --header 'Content-Type: application/json' --data-raw '{"name": "Robert","email":"email@email.com"}'
```

Exemplo do resultado:
```bash
{"message": "Message accepted!"}
```

## 👨‍💻

Leia o artigo "**Processando filas com Amazon SQS e AWS Lambda — Serverless**": https://fernandogouveia.medium.com/processando-filas-com-amazon-sqs-e-aws-lambda-serverless-cc04f6c6a1
