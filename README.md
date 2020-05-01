# DIR Server
[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

Node utility server returning first `n` filenames of the woking directory.
Only one `GET` API endpoint: `/display` with a query parameter: `items`
cURL command: `curl -X GET "http://localhost:3000/display?items=5" -H "accept: application/json"`

### Installation

Requires [Node.js](https://nodejs.org/) and [Loopback](http://loopback.io/) to run.

Install the dependencies and start the server.

```sh
$ cd ${workspaceFolder}
$ npm install --save
$ npm run start
```
