const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT, () => {
  process.stdout.write(`Server running on ${process.env.PORT}`);
});
