const express = require('express');
const server = express();
const cors = require('cors');
const PORT = 3001;

server.use(express.json());
server.use(cors({
  origin: '*'
}));

server.get('/', (request, response) => {
  response.status(200).send("The server is functioning properly.");
});

server.listen(PORT, () => {
  console.log(`The Express server is listening on port ${PORT}.`);
});