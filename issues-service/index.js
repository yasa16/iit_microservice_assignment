const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT | 3002;

app.get('/', (req, res) => {
  res.json({health:"Issues Service UP"})
})

app.get('/api/issues/:username/:repository', (req, res) => {

  axios.get(`https://api.github.com/repos/${req.params.username}/${req.params.repository}/issues`).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    res.json({message:e.message})
  })
})

app.listen(port, () => {
  console.log(`Issues service app listening on port ${port}`)
})