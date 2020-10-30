/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const db = require('../models');

const { Prize } = db;

function getPrizeRandom(prizeArr, probArr) {
  const probSum = probArr.reduce((accumulator, currentValue) => accumulator + currentValue);
  const randomArr = [];
  for (let i = 0; i < prizeArr.length; i += 1) {
    for (let j = 0; j < probArr[i]; j += 1) {
      randomArr.push(i);
    }
  }
  const randomNumber = Math.floor(Math.random() * probSum);
  console.log('prize_name:', prizeArr[randomArr[randomNumber]]);
  return prizeArr[randomArr[randomNumber]];
}

const blogController = {
  add: (req, res) => {
    res.render('add');
  },
  handleAdd: (req, res, next) => {
    const { username, adminId } = req.session;
    const {
      prize_name, image_URL, description, probability,
    } = req.body;
    if (!prize_name || !image_URL || !description || !probability) {
      req.flash('errorMessage', '所有欄位皆需輸入');
      return next();
    }
    if (probability <= 0) {
      req.flash('errorMessage', '機率須為正整數');
      return next();
    }
    if (!username || !adminId) {
      req.flash('errorMessage', '請登入後繼續');
      return next();
    }
    Prize.create({
      prize_name,
      image_URL,
      description,
      probability,
      Admin2Id: adminId,
    }).then(() => {
      res.redirect('/admin');
    }).catch((err) => {
      console.log(err);
      res.redirect('/admin');
    });
  },

  update: (req, res) => {
    Prize.findOne({
      where: {
        id: req.params.id,
      },
    }).then((prize) => {
      res.render('update', {
        prize,
      });
    });
  },
  handleUpdate: (req, res, next) => {
    const { username, adminId } = req.session;
    const {
      prize_name, image_URL, description, probability,
    } = req.body;
    if (!prize_name || !image_URL || !description || !probability) {
      req.flash('errorMessage', '所有欄位皆需輸入');
      return next();
    }
    if (probability <= 0) {
      req.flash('errorMessage', '機率須為正整數');
      return next();
    }
    if (!username || !adminId) {
      req.flash('errorMessage', '請登入後繼續');
      return next();
    }

    Prize.findOne({
      where: {
        id: req.params.id,
      },
    }).then(prize => prize.update({
      prize_name,
      image_URL,
      description,
      probability,
    })).then(() => {
      res.redirect('/admin');
    }).catch((err) => {
      console.log(err);
      res.redirect('/admin');
    });
  },

  delete: (req, res) => {
    const { username, adminId } = req.session;
    if (!username || !adminId) {
      req.flash('errorMessage', '請登入後繼續');
      return res.redirect('/admin');
    }

    Prize.findOne({
      where: {
        id: req.params.id,
      },
    }).then(prize => prize.update({
      is_deleted: '1',
    })).then(() => {
      res.redirect('/admin');
    }).catch((err) => {
      console.log(err);
      res.redirect('/admin');
    });
  },

  getGamePage: (req, res) => {
    Prize.findAll({
      order: [['probability']],
    }).then((prizes) => {
      res.render('game', {
        prizes,
      });
    }).catch(() => res.send('網頁壞了'));
  },

  getPrize: (req, res) => {
    Prize.findAll({
      where: {
        is_deleted: null,
      },
    }).then((prizes) => {
      const prizeArr = [];
      const probArr = [];
      for (const prize of prizes) {
        prizeArr.push(prize.prize_name);
        probArr.push(prize.probability);
      }
      const result = getPrizeRandom(prizeArr, probArr);
      Prize.findOne({
        where: {
          prize_name: result,
        },
      }).then(prizeWin => res.status(200).json(prizeWin));
    }).catch((err) => {
      console.log(err);
    });
  },
};

module.exports = blogController;
