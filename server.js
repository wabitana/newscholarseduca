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
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

db.connect((err) => {
    if (err) { 
        throw err;
    }
    console.log('MySQL Connecteed...');
});

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
    res.sendFile(path.join(__dirname,'Front_End','about.html'))
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','contact.html'))
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','services.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','login.html'))
});

app.get('/gallary', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','gallary.html'))
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'Front_End','register.html'))
});



//rejister


app.post('/Register', (req, res) => {
    const { username1,email1, password1 } = req.body;

    db.query('SELECT Name FROM login WHERE Email = ?', [email1], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).send('User already exists!');
        } 
else{
   
bcrypt.hash(password1, 10, (err, hash) => {
    if (err) throw err;
    db.query('INSERT INTO login (Name,Email, Password) VALUES (?, ?,?)', [username1,email1, hash], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully!');
    });
});
   
}
    });
 
});
  
//login


app.post('/Login', (req, res) => {
    const {username,password } = req.body;

    db.query('SELECT * FROM login WHERE Email = ?', [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            bcrypt.compare(password, result[0].Password, (err, match) => {
                
                if (match) {
                    res.send("loading.....")
                } else {
                    res.send("Incorrect password!")  
                }
            });
        } else {
            res.status(400).send('User not found!');
        }
    });
});


//Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "justforchacke@gmail.com", 
      pass: "mbzk yvwr dfpl ammn", 
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
      to: "justforchacke@gmail.com", 
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


