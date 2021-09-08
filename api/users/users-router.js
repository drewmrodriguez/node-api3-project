const express = require('express');
const { get, getById, getUserPosts } = require('./users-model')
const { insert } = require('../posts/posts-model');
const { validateUser, validatePost } = require('../middleware/middleware');


const router = express.Router();

router.get('/', async (req, res) => {
  const users = await get()
  res.send(users)
});

router.get('/:id', async (req, res) => {
  const user = await getById(req.params.id)
 res.send(user)
});

router.post('/', validateUser,  async (req, res) => {
  const user = req.body
  res.status(201).send(user)
});

router.put('/:id',validateUser, async (req, res) => {
  const user = req.body
  res.send(user)
});

router.delete('/:id', async (req, res) => {
  const user = await delete(req.params.id)
  res.send(user)
});

router.get('/:id/posts', async (req, res) => {
  const posts = await getUserPosts(req.params.id)
  res.send(posts)
});

router.post('/:id/posts', validatePost, async (req, res) => {
  const post = await insert(req.params.id)
  res.send(post)
});

// do not forget to export the router
module.exports = router
