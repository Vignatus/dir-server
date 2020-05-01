import {ApplicationConfig} from '@loopback/core';
import {TensorGoApplication} from './application';

export {TensorGoApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new TensorGoApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}
