const express = require('express')
const cors = require('cors')
var schema = require('./routes/objectschema');
const session = require('express-session');
const passport  = require('passport')
const connectDB = require('./database/db');
const auth = require('./routes/auth');
require("dotenv").config();
require('./config/passport')(passport)
connectDB();

const app = express()
app.use(express.urlencoded({extended:false}));
app.use(express.json())
const apiPort = process.env.PORT || 5000

//session middleware
app.use(session({
    secret:'kaleem',
    resave:false,
    saveUninitialized:false,
}))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

app.use('/schema',schema);
app.use('/auth',auth);
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/tm',(req,res)=>{
    console.log(req.body);
    res.send('req');
    
})


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))