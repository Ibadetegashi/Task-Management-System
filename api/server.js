const express = require('express')
const app = express();
const statusRoutes = require('./routes/statusRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const taskRoutes = require('./routes/taskRoutes.js')
const cores = require('cors')

// Middelware
app.use(express.json());
app.use(cores())
app.use('/status', statusRoutes)
app.use('/user', userRoutes)
app.use('/task', taskRoutes)

app.get('/', (req, res) => {
    res.send(
        '<h1>Task Management System</h1>'
    )
})


app.listen(3000, () => {
    console.log("Server is running on port 3000!");
})