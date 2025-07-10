import Hapi from "@hapi/hapi"

const helloName = (request, h) => {
  const name = request.params.name;
  return `hello ${name}`
}

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
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

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
