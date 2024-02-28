const express = require('express')
const app = express()
const config = require('./db');
const port = 5000
const createUser = require('./routes/createUser');
const fetchData = require('./routes/fetchData');

const cors = require('cors');
config();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', createUser);
app.use('/api', fetchData);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})