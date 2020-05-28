const fs = require("fs");
const path = require("path");
const { SetCard } = require("../models/setCard");
const ERROR = require("../types/error");


const createSetCard = (setCard) => {
  const user = {
    _id: "5ecd37b61e1e982ddcfa95c5",
    username: "dvtam99",
  };

  const newSetCard = new SetCard({
    title: setCard.title,
    avatar: setCard.avatar,
    date_create: new Date(),
    author: user._id,
    empty: setCard.empty,
    finish: setCard.finish,
    folder: setCard.folder,
    description: setCard.description,
    detail: setCard.detail,
  });
  newSetCard.generateSlug();
  const rootFolderPath = `${path.join(__dirname, "/..")}`;
  const cardFolderPath = `/public/set_card/${user.username}`;

  fs.mkdirSync(rootFolderPath + cardFolderPath, { recursive: true });
  fs.writeFileSync(
    rootFolderPath + cardFolderPath + `/${newSetCard.slug}.md`,
    setCard.content
  );
  newSetCard.contentFilePath = cardFolderPath + `/${newSetCard.slug}.md`;
  return newSetCard.save();
};

const getListSetCard = async (currentUser) => {
  const setCards = await SetCard.aggregate()
    .limit(10)
    .sort({ createdAt: -1 })
    .lookup({
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "author",
    })
    .unwind("author")
    .project({
      title: 1,
      photoUrl: 1,
      tags: 1,
      slug: 1,
      likeCount: { $size: "$like" },
      createdAt: 1,
      updatedAt: 1,
      "author._id": 1,
      "author.username": 1,
      "author.displayName": 1,
      "author.photoUrl": 1,
    })
    .exec();
  return setCards;
};


const getSetCard = async (slug) => {
  const setCard = await SetCard.aggregate()
    .match({ slug: slug })
    .limit(1)
    .lookup({
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "author",
    })
    .unwind("author")
    .project({
      title: 1,
      avatar: 1,
      detail: 1,
      finish: 1,
      date_create: 1,
      author: 1,
      contentFilePath: 1,
      slug: 1,
    })
    .exec();
  return setCard[0];
};

const updateSetCard = async (id, setCard) => {
  const newSetCard = await SetCard.findOneAndUpdate({ _id: id }, setCard, {
    new: true,
  });
  return newSetCard;
};
const deleteSetCard = async (id) => {
  const newSetCard = await SetCard.findOne({
    _id: id,
  });
  if (!newSetCard) throw new Error(ERROR.SET_CARD_NOT_EXISTED);
  await SetCard.deleteOne({ _id: id });
  return true;
};

module.exports = {
  createSetCard,
  getListSetCard,
  getSetCard,
  deleteSetCard,
  updateSetCard,
};

