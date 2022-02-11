import Fastify from "fastify";

const fastifyInstance = Fastify({
  logger: true,
});

fastifyInstance.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastifyInstance.post("/", async (request, reply) => {
  return {
    hello: "world",
    body: request.body,
    type: "post",
  };
});

const start = async () => {
  try {
    await fastifyInstance.listen(3000);
  } catch (err) {
    fastifyInstance.log.error(err);
    process.exit(1);
  }
};

start();
