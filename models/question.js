const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = Schema({
  question: {
    type: String,
    required: true,
  },
  photoUrl: String,
  answer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = { Question, questionSchema };
