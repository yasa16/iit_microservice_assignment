const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT | 3001;

app.get('/', (req, res) => {
  res.json({health:"Pull Request Service UP"})
})

app.get('/api/pulls/:username/:repository', (req, res) => {

  axios.get(`https://api.github.com/repos/${req.params.username}/${req.params.repository}/pulls`).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    res.json({message:e.message})
  })
})

app.listen(port, () => {
  console.log(`Pull Request service app listening on port ${port}`)
})