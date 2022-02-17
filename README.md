# Tate Modern API

# Setup

This project require a database installation to complete; however, the knex.ts query builder is configured for a sample Mysql database.

## Local Installation

Follow the instructions below if you prefer to install the application on your local machine:

1. Install the latest version of [Node.js](https://nodejs.org). This application requires Node.js 4+.

2. Install [MySQL](https://www.mysql.com/) locally 

3. Start MySQL and create a database. ex: tate-modern-db.

4. Clone this repository https://github.com/jamalhamilton/tate-modern-api.git.

## Setup Instructions

Create a `.env` in the directory.

See the `.env.example` file to see what fields are available.

Spin up a local Mysql database or connect to the hosted development database.

Add your database credentials to the `.env` file.

Install NPM Packages. `npm i`

For this project We're using Mysql database, but thanks to Knex you can use other RDSMs :

for that install one of these :

$ npm install pg-native
$ npm install @vscode/sqlite3 # required for sqlite
$ npm install better-sqlite3
$ npm install mysql
$ npm install mysql2
$ npm install oracledb
$ npm install tedious

and set database credentials on your `.env` file.

If using a locally hosted database, migrate and seed.

Migrate the database. `knex migrate:latest --knexfile=knex.ts`.

Run the database seeds. `knex seed:run --knexfile=knex.ts`.

Start the dev server, `npm run watch`.
