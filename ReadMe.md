# back (API)
- express
- postgres

## Routes
- users ( CRUD )
- posts ( CRUD )

## Tables

### USer
- id [Int PK]
- username [varchar]
- password [varchar]
- email [varchar]
-created_at [timestamp]

### Post

- id [Int PK]
- user_id [Int FK] ( Many To One )
- title [varchar]   
- content [varchar]
- created_at [timestamp]
- image_path [varchar]

# Step to init project ( Back )
- create folder (api)
- npm init
- typescript init
- install dependencies ( express, typescript, ts-node-dev, nodemon, dotenv, ...)
- create files and folders project (index.ts, folder src, ...)
- create routes (user, posts)
- test with Postman
- config docker-compose (services: postgres, adminer)
- up containers
- create database and Tables
- install dependencies postgres
- connect db