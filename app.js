const express = require('express');
const path = require('path');
const cors = require('cors');

//const helmet = require('helmet');
//const rateLimit = require("express-rate-limit");

//allow origin
//const cors = require('cors');

const passport = require('passport');
const logger = require('morgan');

const { logHandler } = require('./middleware/logHandler');
const { errorHandler } = require('./middleware/errorHandler');

const config = require('./config/index');
const connectDB = require('./config/db')

const userRoute = require('./routes/userRoute');
const guideRoute = require('./routes/guideRoute');
const commentRoute = require('./routes/commentRoute');
const guideplanRoute = require('./routes/guideplanRoute')
const post = require('./models/planModel');

const app = express();

//console.log(process.env);
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}

app.use(logger('dev'))
app.use(logHandler);

connectDB(); 

/*
// connect to local database
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));

// connect to Atlast DB
mongoose.connect('mongodb+srv://dbuser02:dbuser02@cluster0-z4eg1.gcp.mongodb.net/codecamp?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}); */

//CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//'./public'
app.use(express.static(path.join(__dirname, 'public')));

//init passport
app.use(passport.initialize());

app.use('/api/user', cors(), userRoute);
<<<<<<< HEAD
app.use('/api/guide', cors(), guideRoute);git
app.use('/api/comment', cors() , commentRoute);
app.use('/api/guideplan' ,cors(),guideplanRoute)
=======
app.use('/api/guide', cors(),guideRoute);
app.use('/api/comment', cors(), commentRoute);
app.use('/api/guideplan', cors(),guideplanRoute)
>>>>>>> develop-nong

app.use(errorHandler);

app.listen(config.PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.PORT}`));

