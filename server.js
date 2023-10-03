//boiler plate for server 
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
//helpers importing and using the helpers from helper.js
const helpers = require('./utilities/helper');
const hbs = exphbs.create({ helpers });

//sequalize connection and importing for session
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//callback for starting the app and opening connection for port 3001
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/assets',express.static(path.join(__dirname, 'public')));
//app.use('/assets', require('./controllers/blogRoutes'));
//app.use('/assets', require('./controllers/api'));

// app.use('/homepage', require ('./public/assets'));
// app.use('/blogs', require ('./public/assets'));
// app.use('/login', require ('./public/assets'));
// app.use('/logout', require ('./public/assets'));
// app.use('/logout', require ('./public/assets/logout.html'));

app.use(routes);

// app.get('/blogs', (req, res) => {
//   res.render('blogpost.handlebars'); 
// });
// app.get('/', (req, res) => {
//   res.render('main.handlebars'); 
// });
// app.get('/login', (req, res) => {
//   res.render('login.handlebars'); 
// });
// app.get('/home', (req, res) => {
//   res.render('homepage.handlebars'); 
// });
// app.get('/view', (req, res) => {
//   res.render('viewblogs.handlebars'); 
// });

sequelize.sync({ force: false }).then(() => {  //activates the server
  app.listen(PORT, () => console.log('Now listening'));
});