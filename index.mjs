import http from 'http';
import express from 'express';
import expressGraphQL from 'express-graphql';
import { schema } from './schema/schema.mjs';

const PORT = 3333;
const app = express();
app
  .use(express.static('public'))
  .use('/graphql', expressGraphQL({
    graphiql: true,
    schema
  }))
  .use((r, res, n) => console.log(r.url) || n())
  .get('/hello', r => r.res.end('Hello world!'))

  .get('/add/:a/:b', r => r.res.end(String(Number(r.params.a) + Number(r.params.b))))

  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
;
http
  .createServer(app)
  .listen(PORT, () => console.log(process.pid))
;
