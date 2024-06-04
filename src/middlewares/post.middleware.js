const PostModel = require("../models/post.model");

async function checkPostOwnership(req, res, next) {
  const { data } = req.token;
  const { postID } = req.params;

  const post = await PostModel
    .findOne({ _id: postID, user: data._id }) || false;

  if (!post) {
    const error = new Error('Post não encontrado', { cause: { statusCode: 404 } });
    next(error);
  }

  next();
}

module.exports = {
  checkPostOwnership
};

