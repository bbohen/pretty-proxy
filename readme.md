# pretty-proxy

WIP proxy server & app for usage while developing / whatever.

## Setup

Instructions assume usage of yarn, see [here](https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc#.fmvbt1ju2) for a cheatsheet if you are using npm.

1. Clone this repo
2. `yarn`
3. Set your computers wifi/ethernet to proxy traffic to port 5060


## Usage

### Proxy server

You can run the proxy server by itself but this will provide no output or UI.

`yarn start-proxy`

### Proxy server with a UI using terminal

Basic output using [blessed](https://github.com/chjj/blessed)

`yarn start-proxy-terminal`

### Proxy server with a desktop app (dev only currently)

1. `yarn start-proxy-sockets` in one window to kick off the server using socket.io to broadcast proxied requests
2. `yarn electron-dev` in a separate one for an electron app listening for said broadcasts
