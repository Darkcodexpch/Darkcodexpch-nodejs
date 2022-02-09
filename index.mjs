import express,{response} from 'express'
import mongoose from 'mongoose'
import cors from "cors"
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json()) //use for parse data in json format
app.use(cors()); 


let posts = [
  { text: "Kamran" },
  { text: "Ali" },
  { text: "Basit" }
]
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


app.get('/', (req, res) => {
  res.send('hello this is express js server and kamran here!')
})

// for getting all post from server
app.get('/posts', (req, res) => {
  res.send(posts)
})

// for getting single post from server
app.get('/post:id', (req, res) => {
  let id = req.params.id;
  res.send(posts[id])
})

// for add post data to server
app.post('/posts', (req, res) => {
  posts.push(req.body);
  res.send(`Your post is saved now and now ❤  we have ${posts.length} posts`)
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