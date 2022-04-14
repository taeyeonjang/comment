const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const port = process.env.PORT || 5100;


//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
//application/json
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/comment', require('./routes/comment'));
app.get('/', (req, res)=> {
  res.send('hello hrk');
})

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('mongoDB connected'))
  .catch((err) => console.log(err))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
