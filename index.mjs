import express, { response } from 'express'
import mongoose from 'mongoose'
import cors from "cors"
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json()) //use for parse data in json format
app.use(cors());

// let posts = [
//   { text: "Kamran" },
//   { text: "Ali" },
//   { text: "Basit" }
// ]
// mongodb connect
let dbURI = 'mongodb+srv://dark:dark@cluster0.odg9f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
  console.log("Mongoose is connected");
  // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection closed');
    process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

// Post Schema is mein hm btate heinn k is Collection mein hm kia kia cheizein sent krein gye
const postSchema = new mongoose.Schema({
  "text": String,
  "createdOn": { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);



app.get('/', (req, res) => {
  res.send('hello this is express js server and kamran here!')
})

// for getting all post from server
app.get('/posts', (req, res) => {

  Post.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    }
    else {
      res.status(500).send("something Went Wrong 🤦‍♀️")
    }
  })

})

// for getting single post from server
app.get('/post:id', (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.send(data);

    }
    else {
      res.status(500).send("Something went Wrong")
    }
  })
})

// for add post data to server
app.post('/post', (req, res) => {
  if (!req.body.text || req.body.text.length > 200) {
    res.status(400).send(`text is required in json body (max 200 chars), e.g: { "text" : "what is in your mind" }`);
    return;
  }

  let newPost = new Post({
    text: req.body.text
  });

  newPost.save((err, saved) => {
    if (!err) {
      res.send("your post is saved 🥳");
    } else {
      res.status(500).send("some thing went wrong, please try later");
    }
  })
})

// for updating record

app.put('/post', (req, res) => {
  res.send('Here is your food')
})

// for deleting records
app.delete('/post', (req, res) => {
  res.send('Here is your food')
})

app.listen(PORT, () => {
})
console.log(`app listening at ${PORT}`)