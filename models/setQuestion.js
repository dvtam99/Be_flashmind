const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const setQuestionSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: String,
  listQuestion: [
    { type: Schema.Types.Question, ref: 'Question', require: true },
  ],
  contentFilePath: String,
  slug: {
    type: String,
    required: true,
  },
});

setQuestionSchema.methods.generateSlug = function () {
  this.slug =
    this.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '') +
    '-' +
    this._id;
};

const SetQuestion = mongoose.model('Question', setQuestionSchema);
module.exports = { SetQuestion, listQuestionSchema: setQuestionSchema };
