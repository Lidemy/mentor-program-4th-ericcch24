/* eslint-disable import/no-unresolved */
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5001;


const adminController = require('./controllers/admin');
const prizeController = require('./controllers/prize');


app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.id = req.session.id;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

function redirectBack(req, res) {
  res.redirect('back');
}

app.get('/login', adminController.login);
app.post('/login', adminController.handleLogin, redirectBack);
app.get('/logout', adminController.logout);
app.get('/admin', adminController.admin);

app.get('/admin/add', prizeController.add);
app.post('/admin/add', prizeController.handleAdd, redirectBack);
app.get('/admin/update/:id', prizeController.update);
app.post('/admin/update/:id', prizeController.handleUpdate, redirectBack);
app.get('/admin/delete/:id', prizeController.delete);

app.get('/game', prizeController.getGamePage);
app.get('/game-prize', prizeController.getPrize);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
