## Requirements

- Docker (if you are on Windows, you should use WSL 2 backend)
- if you need to change the URL of the backend (by default it assumes local environment), you need to create `.env` file in this directory and add a line like this `BACKEND_URL=http://example.com`
- generate a terminal API key by calling a backend endpoint and paste it into a new file in this directory called `terminal_api_key.txt`

## Setup on Windows

Connect the HARDWARIO Radio Dongle (USB Dongle) to your default WSL 2 distribution by following [this guide](https://learn.microsoft.com/en-us/windows/wsl/connect-usb). You should be able to see `/dev/ttyUSB0` device in the distribution.

`usbipd list` - list USB devices  
`usbipd attach --wsl --busid <busid>` - connect the USB device to WSL

## Running

`docker compose up --build` - build and run containers

## Useful resources:

- https://nodered.org/docs/getting-started/docker
- https://docs.hardwario.com/tower/command-line-tools/gateway-service
- https://github.com/hardwario/bc-developers/blob/master/tools/bigclown-gateway.md
- MQTT topics
  - https://docs.hardwario.com/tower/mqtt-protocol/topics-reference
  - https://github.com/hardwario/bc-developers/blob/master/interfaces/mqtt-topics.md
  - https://github.com/hardwario/bch-gateway
- https://docs.docker.com/compose/use-secrets/
