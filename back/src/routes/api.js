'use strict';

const express = require('express');
/// Use model-finder middleware to import modles
const modelFinder = require('../middleware/model-finder.js');


const router = express.Router();

//define a paramater which which to run our middleware
router.param('model', modelFinder);

// define a consiszent set of routes that can be used for any model in our 
// Model directory

router.get('/api/v1/:model', handleGetAll);
router.get('/api/v1/:model/:id', handleGetOne);

router.post('/api/v1/:model/', handlePost);
router.put('/api/v1/:model/:id', handlePut)
router.delete('/api/v1/:model/:id', handleDelete)

function handleGetAll(request, response, next) {
  request.model.get()
    .then(results => {
      response.json(results);
    })
    .catch(next);
}

function handleGetOne(request, response, next) {
  const id = request.params.id;
  request.model.get(id)
    .then(results => response.json(results[0]))
    .catch(next);
}

function handlePost(request, response, next) {
  const data = request.body;
  request.model.post(data)
    .then(results => response.json(results))
    .catch(next);
}

function handlePut(request, response, next) {
  const id = request.params.id;
  const data = request.body;
  request.model.post(id, data)
    .then(results => response.json(results))
    .catch(next);
}

function handleDelete(request, response, next) {
  const id = request.params.id;
  request.model.delete(id)
    .then((result) => {
      console.log(result);
      response.status = 204;
    })
    .catch(next);
}

module.exports = router;