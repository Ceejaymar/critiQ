const router = require('express').Router();
const Document = require('../models').Document;
const Comment = require('../models').Comment;

const getAllDocuments = (req, res) => {
  console.log('eslint sucks');
  Document.findAll()
  .then((users) => {
    res.send(users);
  });
};

const documentCreate = (req, res) => {
  // req.body will include userId
  const documentData = req.body;
  Document.create(documentData)
  .then((doc) => {
    console.log(doc);
    res.send(doc);
  });
};

const getOneDocument = (req, res) => {
  const id = req.params.id;
  Document.findById(id, {
    include: [Comment],
  })
  .then((user) => {
    console.log('AYOOOOO', user);
    res.send(user);
  });
};

router.route('/')
  .get(getAllDocuments)
  .post(documentCreate);

router.route('/:id')
  .get(getOneDocument);

module.exports = router;
