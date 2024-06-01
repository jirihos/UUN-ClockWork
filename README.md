# ClockWork

## Vision

ClockWork is an attendance system. When an employee comes to or leaves work, he enters his identification code and action on the keypad. System validates and records this information. Managers can see and filter these records in the application. They also have an option to export the data.

## Backend setup

`cd server`  
`npm install` - installs required dependencies  
`npm start` - starts the server

you can also use `npm run dev` which will automatically restart the server when source code changes

## Frontend setup

`cd client`  
`npm install` - installs required dependencies  
`npm run dev` - runs a development server

`npm run build` - builds the frontend

## IoT node setup

setup Git submodules by running `git submodule update --init --recursive`

follow instructions over at https://docs.hardwario.com/tower/firmware-development/ and flash the firmware to your HARDWARIO Core Module

## IoT gateway setup

follow [iot_gateway/README.md](./iot_gateway/README.md) for instructions

## Technologies

Backend: Node.js, Express, MongoDB  
Frontend: Vite, React, Semantic UI React  
IoT node: HARDWARIO Core Module, 4x4 matrix keyboard  
IoT gateway: Docker, Node-RED, HARDWARIO Radio Dongle, Mosquitto, MongoDB
