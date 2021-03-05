# Film Inventory App API

An API for keeping track of your film collection. It allows users to manage their film collection inventory by adding, updating and deleting films linked to their profile.

## Purpose

To allow users to monitor their film collection more easily and to provide myself with an opportunity to use more TypeScript.

# Getting Started

## Prerequisites

In order to run the project, you will need the following installed on your local machine.

- [NodeJS v12.x LTS](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/download)

Optional

- [Docker](https://docs.docker.com/get-docker)

## Installing and Setup

Open a terminal and type `npm install` to install dependencies.

Next, create a `.env` file in the root folder and add settings relevant to your machine. The required variables are:

```
PORT=*PORT API RUNS*
DB_HOST=*DB HOST, e.g. localhost for local db*
*DB_USER=*YOUR MYSQL USERNAME*
*DB_PW=*YOUR MYSQL PASSWORD*
DB_NAME="DESIRED DB NAME"
DB_NAME_DEV="DESIRED DEV DB NAME"
```

\*not needed for Mac users

N.B. Should you rename the dbs, you will need to update the knex migration files found in `src/db/migrations`

## Running the API

### Local development

In your console, type `npm start` to run the API. The API should run on the port specified in the `.env` file.

### Production

To run transpile code locally, type `npm run start:production`. TSC (TypeScript Compiler) is required for this.

#### Docker

For docker, you can run `npm run docker:build` to create the container and `npm run docker:run` for starting the application.

The port exposed is 3000, and this is passed into the application. Therefore, if you change the exposed port, you will be required to update the script.

## Running tests

Jest is used as the test runner and can be run from the console using `npm t` or `npm test` which will run all of the tests found. If you wish to restrict the tests to one file, you can use `npm test -t <filename regex>`.
