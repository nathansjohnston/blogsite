const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')['development']);

router
  .get('/', (request, response) => {
    knex.select('*').from('users')
    .where('username', '=', request.query.username)
    .andWhere('secret', '=', request.query.token)
    .then(data => response.status(200).json(data[0]))
    .catch(err => {
      console.log(err);
      throw err;
    });
  })
  .get('/:id', (request, response) => {
    knex.select('*').from('users').where('id', '=', request.params.id)
      .then(data => response.status(200).json(data[0]));
  })
  .post('/', (request, response) => {
    knex.insert(request.body).into('users').onConflict('username').merge()
      .then(data => response.status(201).send("User account successfully created."))
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .patch('/:username', (request, response) => {
    knex('users').where('username', '=', request.params.username).update(request.body)
      .then(data => response.status(201).send("User account successfully updated."))
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .delete('/:username', (request, response) => {
    knex('users').where('username', '=', request.params.username).delete()
      .then(data => response.status(200).send("User account successfully deleted."))
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .get('/:username/posts', (request, response) => {
    knex.select('*').from('posts').where('author_id', '=', request.params.id)
      .then(data => response.status(200).json(data))
      .catch(err => {
        console.log(err);
        throw err;
      });
  });

module.exports = router;