const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Database connection
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login'));
app.use('/posts', require('./routes/posts'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
