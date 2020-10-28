const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('ok');
})

app.listen(port, () => console.log(`Ready: ${port}`));