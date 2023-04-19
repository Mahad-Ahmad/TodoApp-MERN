const { Router } = require('express');

const {
  getToDo,
  saveToDo,
  deleteToDo,
  updateToDo,
} = require('../controllers/ToDoController');

const router = Router();

router.get('/', getToDo);

router.post('/add', saveToDo);

router.delete('/delete/:id', deleteToDo);

router.put('/update/:id', updateToDo);

module.exports = router;
