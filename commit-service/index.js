const express = require('express');
const axios = require('axios');
const { addCommit, getCommits } = require('./dynamodb');
const app = express();
const port = process.env.PORT | 3001;

// for us to be able to post json data to our api
app.use(express.json())

app.get('/', (req, res) => {
    res.json({health:"Commit Service UP"})
})

app.get('/commits', (req, res) => {
  getCommits().then((commits)=>{
    res.json(commits)
  }).catch((err)=>{
    console.log(err)
  });
  
})


app.get('/api/commits/:username/:repository', (req, res) => {

  axios.get(`https://api.github.com/repos/${req.params.username}/${req.params.repository}/commits`).then((response)=>{
  addCommit(response.data).then(()=>{
    res.json(response.data)
  }).catch((error)=>{
    console.log(error)
  })  

  }).catch((e)=>{
    res.json({message:e.message})
  })
})

app.listen(port, () => {
  console.log(`Commit service app listening on port ${port}`)
})