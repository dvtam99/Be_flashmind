const fs = require("fs");
const path = require("path");
const { SetCard } = require("../models/setCard");

const createSetCard = (user, setCard) => {
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
  const postFolderPath = `/public/posts/${user.username}`;

  fs.mkdirSync(rootFolderPath + postFolderPath, { recursive: true });
  fs.writeFileSync(
    rootFolderPath + postFolderPath + `/${newSetCard.slug}.md`,
    setCard.content
  );
  newSetCard.contentFilePath = postFolderPath + `/${newSetCard.slug}.md`;
  return newSetCard.save();
};

module.exports = { createSetCard };
