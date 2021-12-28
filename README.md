
# movies-monorepo

Movies monorepo consume OMDB movie database. Once authenticated you can get movie details searched by title.

## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)


[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Technologies Used

- Nest.js
- ElasticSearch
- Docker
- Axios
- GraphQL
- JWT
- Fastify
- Lerna
- Jest
- Swagger

## Setup

Navigate to main directory and run docker compose. This will create 2 services based on Docker files.

```bash
  JWT_SECTER=[provideSecret] docker-compose up -d
```
    
## Running Tests

To run tests, run the following commands (cov for coverage report)

```bash
  npm run test
```

```bash
  npm run test:cov
```


## API Reference

```bash
Use swagger with REST endpoints: http://localhost:4000/api
```

```bash
GraphQL is available at: http://localhost:4000/graphql
```

## Run Locally

Clone the project then go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Usage/Examples

Get token: POST: http://localhost:3000/auth with username and password

GraphQL (add authorization bearer token from previous call). Use docs to navigate through available options:

example call:
```bash
query {
  findAll {
    title
    released
  }
}
```
