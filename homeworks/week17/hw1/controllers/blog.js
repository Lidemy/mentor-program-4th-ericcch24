const db = require('../models');
const { sequelize } = require('../models/index');

const { Blog } = db;
const { Admin } = db;

const blogController = {
  index: (req, res) => {
    Blog.findAll({
      order: sequelize.literal('id DESC'),
      include: Admin,
      limit: 5,
    }).then((blogs) => {
      res.render('index', {
        blogs,
      });
    });
  },

  post: (req, res) => {
    res.render('article');
  },
  // eslint-disable-next-line consistent-return
  handlePost: (req, res, next) => {
    const { username, adminId } = req.session;
    const { topic, article } = req.body;
    if (!article || !topic) {
      req.flash('errorMessage', '請輸入文章標題與內容');
      return next();
    }
    if (!username || !adminId) {
      req.flash('errorMessage', '請登入後繼續');
      return next();
    }
    Blog.create({
      username,
      topic,
      article,
      AdminId: adminId,
    }).then(() => {
      res.redirect('/');
    });
  },

  update: (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id,
      },
    }).then((blog) => {
      res.render('update', {
        blog,
      });
    });
  },
  handleUpdate: (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    }).then(blog => blog.update({
      topic: req.body.topic,
      article: req.body.article,
    })).then(() => {
      const { id } = req.params;
      res.redirect(`/blog/${id}`);
    }).catch(() => {
      res.redirect('/');
    });
  },

  delete: (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    }).then(blog => blog.destroy()).then(() => {
      res.redirect('/admin');
    }).catch(() => {
      res.redirect('/admin');
    });
  },
  single: (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id,
      },
    }).then((blog) => {
      res.render('blog', {
        blog,
      });
    });
  },
  list: (req, res) => {
    Blog.findAll({
      order: sequelize.literal('id DESC'),
      include: Admin,
    }).then((blogs) => {
      res.render('list', {
        blogs,
      });
    });
  },
};

module.exports = blogController;
