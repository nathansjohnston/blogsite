const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')['development']);

router
  .get('/', (request, response) => {
    knex.select('*').from('posts')
      .then(data => response.status(200).json(data));
  })
  .post('/', (request, response) => {
    knex.insert(request.body).into('posts')
      .then(data => response.status(201).send("Blog post successfully created."))
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .patch('/:id', (request, response) => {
    knex('posts').where('id', '=', request.params.id).update(request.body)
      .then(data => response.status(201).send("Post successfully updated."))
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .delete('/:id', (request, response) => {
    knex('posts').where('id', '=', request.params.id).delete()
      .then(data => response.status(200).send("Post successfully deleted."))
      .catch(err => {
        console.log(err);
        throw err;
      });
  });

module.exports = router;