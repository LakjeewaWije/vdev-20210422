import fastify from "fastify";
import Fuse from "fuse.js";

const server = fastify();

const MovieList = [
  {
    id: 1,
    name: "Inception",
    year: 2010,
    description: "A thief tries to plant an idea into the mind of a C.E.O.",
  },
  {
    id: 2,
    name: "The Matrix",
    year: 1999,
    description: "A hacker discovers a shocking truth about his world.",
  },
  {
    id: 3,
    name: "Donnie Darko",
    year: 2001,
    description: "A troubled teenager follows a man in a rabbit suit.",
  },
];

server.get("/", async (request, reply) => {
  return "server running";
});

server.get("/api/info", async (request, reply) => {
  return { version: 1, description: "Movies server API" };
});

server.get<{
  Querystring: { keyword: string };
}>("/api/movies", async (request, reply) => {
  const { keyword } = request.query;
  console.log("Keyword BackEnd ", keyword);
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "POST");

  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ["name", "year", "description"],
  };
  let newMovieList : any = [];
  if (keyword) {
    const fuse = new Fuse(MovieList, options);
    let tempNewMovieList = fuse.search(keyword);
    tempNewMovieList.forEach(function(obj) { newMovieList.push(obj.item) });
    console.log("new movie list ",newMovieList);
  } else {
    newMovieList = MovieList;
    console.log("new movie list ",newMovieList);
  }

  return newMovieList;
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
