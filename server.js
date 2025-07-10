import Hapi from "@hapi/hapi"
import { userRoute } from "./routes/userRoutes.js";

const helloName = (request, h) => {
  const name = request.params.name;
  return `hello ${name}`
}

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      validate: {
        failAction: (request, h, err) => {
          return h
            .response({ error: err.details[0].message })
            .code(400)
            .takeover();
        }
      }
    }
  });

  server.route([{
    method: 'GET',
    path: '/',
    handler: helloName
  },
  {
    method: 'GET',
    path: '/hello/{name}',
    handler: helloName
  }]);
  await server.register(userRoute);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
