const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user')
const projectRoutes = require('./routes/projectRoutes')
const taskRoutes = require('./routes/taskRoutes')
var cors = require('cors')

const dbUrl = "mongodb://localhost/pmo"
app.use(express.json())
app.use(cors())
app.use('/api/auth', userRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/task', taskRoutes)


mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('DB started successful');
})

app.get("/", (req, res) => {
    res.send("hello world new");
});

app.listen(2400, (req, res) => {
    console.log('Server started 2400');
})