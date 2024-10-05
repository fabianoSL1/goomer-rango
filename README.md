# API Goomer-Rango

API Restful para gerenciar restaurantes e produtos.

## Requisitos
- Docker
- NodeJS

## dev

```bash
npm install
export $(cat .env.default)
docker compose up -d
```

Execute a query `database.sql` no banco de dados.

```bash
npm run dev
```

## Estrutura de pastas

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

## Desafios

### Classes
As classes e Typescript são um tanto exoticas, sinto falta do LOMBOK do java com as anotations para gerar builders, construtores, getters e setters.

### ORM
Estou tendo alguns problemas com SQL, por exemplo como garantir que os objetos relacionados a minha entidade estão sincronizados 
com o que de fato está salvo no banco. Um ORM faz bastante falta. Porém é legal em como construir essas soluções.
