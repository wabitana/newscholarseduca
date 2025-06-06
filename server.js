const express = require('express');
const app = express();
const port =process.env.APP_PORT || 3000;
const path= require('path')
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname,'Front_End')))
app.use(cors());
const dotenv = require('dotenv')
dotenv.config();
// Data base connaction


//Routing

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','index.html'))
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','index.html'))
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','index.html'))
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','index.html'))
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','index.html'))
});

app.get('/skills', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','index.html'))
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','project.html'))
});

app.get('/achivments', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','index.html'))
});





//Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:process.env.Email_USER,
      pass:process.env.Email_PASSWORD, 
    },
  });
  
  // Route to handle contact form submissions
  app.post("/Contact", async (req, res) => {
    const { name, email,subject, message } = req.body;
  
    if (!name || !email || !subject ||!message) {
      return res.status(400).send("All fields are required.");
    }
  
    const mailOptions = {
      from: email,
      to: "wabitena@gmail.com", 
      subject: `${subject} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Message sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send message.");
    }
  });
  




app.listen(port, () => {
    console.log(`your Server is listening at http://localhost:${port}`);
});


