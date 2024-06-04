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
  const postData = { ...body, user: data._id }
  const post = await PostModel(postData).save();

  return res
    .status(201)
    .json({ post })
}

async function Update(req, res) {
  const { postID } = req.params;
  const { body } = req;

  const postFilter = { _id: postID };
  const postUpdate = {
    title: body.title,
    description: body.description
  };

  const { modifiedCount } = await PostModel.updateOne(postFilter, postUpdate);

  if (modifiedCount === 1) {
    return res
      .status(200)
      .json({ message: 'Post alterado com sucesso!' });
  }

  return res
    .status(304)
    .end();

}

module.exports = {
  Home,
  Create,
  Update
}
