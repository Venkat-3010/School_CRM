const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

const app = express();

dotenv.config()

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MongoDB_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("error:", err.message));

app.get('/healthCheck', (req, res) => {
    console.log("server is active and running");
    res.json({
        service: "School_crm server",
        status: "Active",
        timestamp: new Date().getTime(),
    });
})

app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})