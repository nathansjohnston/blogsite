const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')['development']);

router
  .get('/:id', (request, response) => {
    knex.select('*').from('users').where('id', '=', request.params.id)
      .then(data => response.status(200).json(data[0]));
  })
  .post('/', (request, response) => {
    knex.insert(request.body).into('users')
      .then(data => response.status(201).send("User account successfully created."))
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .patch('/:id', (request, response) => {
    knex('users').where('id', '=', request.params.id).update(request.body)
      .then(data => response.status(201).send("User account successfully updated."))
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .delete('/:id', (request, response) => {
    knex('users').where('id', '=', request.params.id).delete()
      .then(data => response.status(200).send("User account successfully deleted."))
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .get('/:id/posts', (request, response) => {
    knex.select('*').from('posts').where('author_id', '=', request.params.id)
      .then(data => response.status(200).json(data))
      .catch(err => {
        console.log(err);
        throw err;
      });
  });

module.exports = router;