import fastify from 'fastify'

const server = fastify()

server.get('/', async (request, reply) => {
  return 'pong\n'
});

server.get('/api/info', async (request, reply) => {
    return { "version": 1, "description": "Movies server API" }

  });

server.get('/api/movies', async (request, reply) => {
    return [{
        "id": 1,
           "name": "Inception",
           "year": 2010,
           "description": "A thief tries to plant an idea into the mind of a C.E.O."
        },{
            "id": 2,
            "name": "The Matrix",
            "year": 1999,
            "description": "A hacker discovers a shocking truth about his world."
        },{
            "id": 3,
            "name": "Donnie Darko",
            "year": 2001,
            "description": "A troubled teenager follows a man in a rabbit suit."
        }]

  });

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})