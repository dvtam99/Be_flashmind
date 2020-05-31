const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const setCardSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  avatar: String,
  date_create: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  empty: Boolean,
  publish: Boolean,
  finish: Boolean,
  folder: [{}],
  description: String,
  detail: [
    {
      card_id: {
        type: String,
        require: true,
      },
      card_title: {
        type: String,
        require: true,
      },
      card_desc: {
        type: String,
        require: true,
      },
      card_completed: {
        type: String,
        require: true,
      },
    },
  ],
  contentFilePath: String,
  slug: {
    type: String,
    required: true,
  },
});

setCardSchema.methods.generateSlug = function () {
  this.slug =
    this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") +
    "-" +
    this._id;
};

const SetCard = mongoose.model("Question", setCardSchema);
module.exports = { SetCard, setCardSchema };
