# Gateways

Gateways is a MERN stack application managing multiple gateways and it's peripheral devices.

## Getting started

### Install project dependencies

Run the following command `npm install` in the **root** directory & **client** directory to install all project dependencies (server side & client side)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

This command will concurrently run both server & client in the development mode.\
The page will reload if you make any changes.

### `npm start` or `npm run server`

This command wil run only the server side application

### `npm run client`

This command wil run only the client side application

## Deployment & Automation

For deployment on Heroku the automation process is handled through a pipeline called `release` that deploy a new staging build for the app when any changes pushed on `main` branch on this repo.

You can view the live build here [https://gateways-ms.herokuapp.com/](https://gateways-ms.herokuapp.com/)
