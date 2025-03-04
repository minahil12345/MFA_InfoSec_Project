// controllers/index.js
const nodemailer = require('nodemailer');
const { Login_Credentials, MFACode } = require('../models');
const dotenv = require('dotenv');

dotenv.config()


const KEY = process.env.KEY;
const EMAIL = process.env.EMAIL;

var user_email = "";
var user_security_question = "";
var user_id = -1;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.KEY,
  },
});

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {

    const user = await Login_Credentials.findOne({
      where: {
        username,
        password,
      },
    });
    console.log("User id is:", user.id);
    user_email = user.email;
    user_security_question = user.security_question;
    user_id = user.id;

    if (user) {

      res.status(200).json({ message: 'Authentication successful' });
    } else {
      // User not found or password is incorrect
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (err) {

    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const sendMFACode = async (req, res) => {
  try {
    

    const codes = Array.from({ length: 3 }, () => Math.floor(Math.random() * 90) + 10);

    // Select one random code
    const selectedCode = codes[Math.floor(Math.random() * 3)];

    // Store the selected code in the MFA_Code table
    await MFACode.create({
      id: user_id,
      code: selectedCode 
    });
    // Set a timer to delete the code after 1 minute
    setTimeout(async () => {
      // Check if the code still exists (it may have been used or deleted manually)
       
      const existingCode = await MFACode.findByPk(user_id);

      if (existingCode) {
        // Delete the MFA code
        await existingCode.destroy();
        console.log('Code deleted after 1 minute:', user_id);
      }
    }, 1 * 60 * 1000); // 1 minute in milliseconds

    const mailOptions = {
      from: EMAIL, 
      to: user_email,
      subject: 'MFA Code',
      text: `Your MFA code is: ${selectedCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      console.log('Email sent:', info.response);
    });

    res.status(200).json({ codes, selectedCode });
  } 
  catch (err) {
    console.error('Error generating and storing MFA code:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const checkMFACode = async (req, res) => {
  try {
    const { code } = req.body;

    // Check if the provided code exists for the specified user
    const mfaCode = await MFACode.findOne({
      where: {
        code: code,
      },
    });

    if (mfaCode) {
      res.status(200).json({ message: 'Code is valid' });
      
      //if code is valid delete from the database
      const existingCode = await MFACode.findByPk(user_id);

      if (existingCode) {
        // Delete the MFA code
        await existingCode.destroy();
        console.log('Code deleted after 1 minute:', user_id);
      }
    } else {
      res.status(401).json({ message: 'Code is invalid' });
    }
  } catch (err) {
    console.error('Error checking MFA code:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const checkSecurityQuestion = (req, res) => {
  try{
    const ans = req.body.ans;
    if(ans.toLowerCase() == user_security_question.toLowerCase()) {
      res.status(200).json({ message: 'User is correct' });
    } else {
      res.status(400).json({ message: 'Wrong Answer' });
    }
  }
  catch(err){
    console.log("Error sending security question answer");
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  sendMFACode,
  checkMFACode,
  checkSecurityQuestion,
  userLogin
};
