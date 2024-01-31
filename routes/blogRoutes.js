const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

router.get('/', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.delete('/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err.message));
});

module.exports = router;
