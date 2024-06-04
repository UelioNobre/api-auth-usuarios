const PostModel = require("../models/post.model");

async function Home(req, res) {
  const token = req.token;
  const posts = await PostModel
    .find({ user: token.data._id })
    .select('title description _id');
  return res.json({ posts });
}

async function Create(req, res) {
  const { body } = req;
  const { data } = req.token;
  const postPayload = { ...body, user: data._id }
  const post = new PostModel(postPayload);
  const postSave = await post.save();

  return res.json({ message: 'Criar posts', body, post, postSave })
}

module.exports = {
  Home,
  Create,
}
