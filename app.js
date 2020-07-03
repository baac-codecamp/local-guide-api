const express = require('express');
const mongoose = require('mongoose');

const {logIntercepter} = require('./middleware/logMiddleware');

//const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');

const app = express();

// connect to local database
mongoose.connect("mongodb://127.0.0.1:27017/CodeCampDB", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// connect to Atlast DB
/*mongoose.connect('mongodb+srv://dbuser02:dbuser02@cluster0-z4eg1.gcp.mongodb.net/codecamp?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}); */



app.use(express.static('./public/'))
app.use(express.json());
app.use(logIntercepter);

// API USER
app.use('/api/user/', userRoute);

app.listen(3000);
