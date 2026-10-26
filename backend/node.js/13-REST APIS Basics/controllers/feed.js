export function getPosts(req, res, next) {
  res.status(200).json({
    posts: [{ title: "post1", description: "this is post1" }],
  });
}

export function createPost(req, res, next) {
  console.log(req.body);
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "post created successfully",
    post: {
      myid: new Date().toISOString(),
      title: title,
      content: content,
    },
  });
}
