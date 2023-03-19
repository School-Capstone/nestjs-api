# 🐈 Nest.js REST API 🔴

## Description

This is a simple RESTful API built using [Nestjs](https://nestjs.com/), which is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

⚠️ This is currently a work-in-progress endeavour, but I plan for it to be a simple API for a blog. It currently has management for:

- users
- authentication
- posts
- categories
- e2e tests

and with more features to come if I find the need for their introduction. 🙃

## 🍀 Tech Stack

- [Nest](https://nestjs.com/) 🐈
- [Prisma ORM](https://www.prisma.io/) ⧖
- [Postgres DB](https://www.postgresql.org/) 🐘
- [Jest](https://jestjs.io/) 🧪 🥼 🔬
- [Docker](https://www.docker.com/) 🐳

  - [Pactum JS](https://pactumjs.github.io/) 🧪 ⚡️
  - [Argon](https://www.npmjs.com/package/argon2)
  - [@nestjs/config](https://www.npmjs.com/package/@nestjs/config)
  - [@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt)
  - [passport](https://www.npmjs.com/package/passport)
  - [@nestjs/passport](https://www.npmjs.com/package/@nestjs/passport)
  - [class-validator](https://www.npmjs.com/package/class-validator)
  - [passport-jwt](https://www.npmjs.com/package/passport-jwt) \*
  - ...

## 📦 Installation

```bash
 pnpm install
```

## 🏃 Running the app

```bash
# development
 pnpm run start

# watch mode
 pnpm run start:dev

# production mode
 pnpm run start:prod
```

## 📡 Connect to the db

```bash
#spawn the docker image & run migrations automatically
pnpm db:dev:restart

# visualize data
pnpm exec prisma studio
```

## 🧪 🥼 Test

```bash
# unit tests
 pnpm run test

# e2e tests
 pnpm run test:e2e

# test coverage
 pnpm run test:cov
```

## 🙇 Appreciation

Major, major, and major appreciation to [Vlad](https://www.youtube.com/@CodeWithVlad)
