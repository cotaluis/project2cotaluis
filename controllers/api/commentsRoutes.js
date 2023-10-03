const router = require('express').Router();
const { Blog, Comment } = require('../models'); 

router.get('/blogs:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByPk(blogId, {
      include: [Comment]
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.render('blog', { blog });
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve the blog post.' });
  }
});
router.post('/blogs/:id/comments', async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;
  
      const Comment = await Comment.create({
        text,
        blog_id: id,
        user_id: req.session.user_id, 
      });
        
     res.redirect(`/blogs/${id}`); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to submit the comment.' });
    }
  });

module.exports = router;
