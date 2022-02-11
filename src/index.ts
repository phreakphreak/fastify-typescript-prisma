import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

import { AddressInfo } from "net";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  Fastify({});

const routeOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          world: {
            type: "string",
          },
          hello: {
            type: "string",
          },
          products: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                price: {
                  type: "number",
                },
              },
            },
          },
        },
      },
    },
  },
};

server.get("/hello", routeOptions, async (request, reply) => {
  const products = [...Array(10)].map((_, i) => ({
    name: `Product ${i}`,
    price: i * 10,
  }));

  return {
    world: " world",
    hello: "hello",
    products,
  };
});

const start = async () => {
  try {
    await server.listen(3000);

    const address: string | AddressInfo = server.server.address();
    const port = typeof address === "string" ? address : address?.port;

    console.log(`server listening on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
