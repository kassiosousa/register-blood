const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bloodRoutes = require('./src/routes/bloodRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', bloodRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
