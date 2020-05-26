const fs = require("fs");
const path = require("path");
const { SetCard } = require("../models/setCard");

const createSetCard = (setCard) => {
  const user = {
    _id: "5ebd54d5034aef3d44d67220",
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
  const postFolderPath = `/public/set_card/${user.username}`;

  fs.mkdirSync(rootFolderPath + postFolderPath, { recursive: true });
  fs.writeFileSync(
    rootFolderPath + postFolderPath + `/${newSetCard.slug}.md`,
    setCard.content
  );
  newSetCard.contentFilePath = postFolderPath + `/${newSetCard.slug}.md`;
  return newSetCard.save();
};

const getListSetCard = async (currentUser) => {
  const setCard = await Post.aggregate()
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
  return setCard;
};
module.exports = { createSetCard, getListSetCard };
