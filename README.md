# API Goomer-Rango

API Restful para gerenciar restaurantes e produtos.

## Requisitos
- Docker
- NodeJS

## dev
```
npm install
export $(cat .env.default)
docker compose up -d
npm run dev
```

## estrutura de pastas

Procurei separar o codigo entre `politicas` e `detalhes`.

Na pasta `core` temos codigos relacionados às politicas da aplicação. A pasta `infra` contem detalhes de implementação. Já a pasta `dtos` é um intermediario entre essas camadas.

```
/src
----/core
----|---/entities
----|---/repositories
----/dtos
----/infra
----|---/http
----|---/repositories
/tests
```