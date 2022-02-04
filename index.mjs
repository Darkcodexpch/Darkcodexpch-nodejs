import express from 'express'
const app = express()
const port = process.env.port || 3000
app.use(express.json()) //use for parse data in json format 


let posts = [
  { text: "Kamran" },
  { text: "Ali" },
  { text: "Basit" }
]

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
  res.send(`Your Post is saved now and now we have ${posts.length} posts`)
})

// for updating record

app.put('/post', (req, res) => {
  res.send('Here is your food')
})

// for deleting records
app.delete('/post', (req, res) => {
  res.send('Here is your food')
})

app.listen(port, () => {
  console.log(`app listening at ${port}`)
})