const fs = require('fs');
const path = require('path');
const { SetQuestion } = require('../models/setQuestion');

const createSetQuestion = (user, setQuestion) => {
  const newSetQuestion = new SetQuestion({
    title: setQuestion.title,
    author: user._id,
    description: setQuestion.description,
    listQuestion: setQuestion.listQuestion,
  });
  newSetQuestion.generateSlug();
  const rootFolderPath = `${path.join(__dirname, '/..')}`;
  const postFolderPath = `/public/posts/${user.username}`;

  fs.mkdirSync(rootFolderPath + postFolderPath, { recursive: true });
  fs.writeFileSync(
    rootFolderPath + postFolderPath + `/${newSetQuestion.slug}.md`,
    setQuestion.content
  );
  newSetQuestion.contentFilePath =
    postFolderPath + `/${newSetQuestion.slug}.md`;
  return newSetQuestion.save();
};

const getListPost = async (currentUser) => {
  const posts = await SetQuestion.aggregate()
    .limit(10)
    .sort({ createdAt: -1 })
    .lookup({
      from: 'users',
      localField: 'author',
      foreignField: '_id',
      as: 'author',
    })
    .unwind('author')
    .project({
      title: 1,
      photoUrl: 1,
      tags: 1,
      slug: 1,
      likeCount: { $size: '$like' },
      createdAt: 1,
      updatedAt: 1,
      'author._id': 1,
      'author.username': 1,
      'author.displayName': 1,
      'author.photoUrl': 1,
    })
    .exec();
  return posts;
};

const getPost = async (slug) => {
  const posts = await SetQuestion.aggregate()
    .match({ slug: slug })
    .limit(1)
    .lookup({
      from: 'users',
      localField: 'author',
      foreignField: '_id',
      as: 'author',
    })
    .unwind('author')
    .project({
      title: 1,
      photoUrl: 1,
      contentFilePath: 1,
      tags: 1,
      slug: 1,
      likeCount: { $size: '$like' },
      createdAt: 1,
      updatedAt: 1,
      author: 1,
    })
    .exec();
  return posts[0];
};

module.exports = { createSetQuestion, getListPost, getPost };
