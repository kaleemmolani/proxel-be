const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const uri = "mongodb+srv://kaleem:roots@cluster0.13rub.mongodb.net/schema?retryWrites=true&w=majority";
        mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error',(error)=>{console.error(error)});
        db.once('open',()=>{console.log('database is conected')})
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB