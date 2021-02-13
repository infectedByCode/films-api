# Film Inventory App API

An API for keeping track of your film collection. It allows users to manage their film collection inventory by adding, updating and deleting films linked to their profile.

## Purpose

To allow users to monitor their film collection more easily and to provide myself with an opportunity to use more TypeScript.

# Getting Started

## Prerequisites

In order to run the project, you will need the following installed on your local machine.

- [NodeJS v12.x LTS](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)

## Installing and Setup

Open a terminal and type `npm install` to install dependencies.

Next, create a `.env` file in the root folder and add settings relevant to your machine. The required variables are:

```
PORT=*PORT API RUNS*
DB_HOST=*DB HOST, e.g. localhost for local db*
DB_USER=*YOUR MYSQL USERNAME*
DB_PW=*YOUR MYSQL PASSWORD*
DB_NAME="DESIRED DB NAME"
DB_NAME_DEV="DESIRED DEV DB NAME"
```

N.B. Should you rename the dbs, you will need to update the knex migration files found in `src/db/migrations`

## Running the API

In your console, type `npm start` to run the API. The API should run on the port specified in the `.env` file.

# TODOs

- Finish README 😃
- Add auth middleware and update tests on protect routes
- Improve error handling
- Add cleanup of failed signup
