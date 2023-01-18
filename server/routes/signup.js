import UserCol from "../DB_Collections/users.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const Secure_Key = process.env.JWT_KEY_EMAIL;

export const signup = async (request, response) => {
  console.log(request.body);

  try {
    const { name, email, phone, password } = request.body;

    if (!name || !email || !phone || !password ) {
      return response
        .status(401)
        .json({ error: "Please fill the form completely !" });
    }

    const isUserAccountExist = await UserCol.findOne({ email });

    if (!isUserAccountExist) {
      return response
        .status(401)
        .json({ error: "Your Email is Not Verified yet" });
    }

    const salt = bcrypt.genSaltSync();
    const secure = await bcrypt.hash(password, salt);

    const userDetails = { name, email, phone, password:secure };

    const addUser = await UserCol.updateMany({email},userDetails);

    if (addUser) {
      // Send a Mail to user

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "cikurra@gmail.com",
          pass: "xlizhlqnzzznjxky",
        },
      });

      const mailMessage = {
        from: "cikurra@gmail.com",
        to: email,
        subject: " CikUra Registration ",
        text: `Hi ${name}, You have successfuly Created an account at CikUra Salon.
                  Thankyou   `,
      };
      transporter.sendMail(mailMessage, async (error, info) => {
        if (error) {
          return response.status(500).json({ error });
        } else {
          response
            .status(201)
            .json({ message: "You have Successfully Registered !" });
        }
      });
      
    } else {
      response.status(401).json({ error: " Register Process Failed !" });
    }
  } catch (error) {
    response.status(401).json({ error });
  }
};

// Send a OTP to User Email to verify the email address
export const sendOTPtoEmail = async(request,response)=>{
  
    const {role,email} = request.body;

    if(!role|| !email){
      return response.status(400).json({error:"Provide Proper Details"})
    }
    
    const checkEmail = await UserCol.findOne({email});
    if(checkEmail){
      return response.status(200).json({error:"Account Already Exist. Please Login !"});
    }
    const otp = Math.floor(1000 + Math.random() * 9000);

    const data = {
      OTP: otp + 1,
      role:role,
      email:email,
    };
    const emailVerifyToken = jwt.sign(data, Secure_Key, { expiresIn: "0.5h" });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "birdsheartbeat.in@gmail.com",
        pass: "jsibsanmsicmjest",
      },
    });

    const mailMessage = {
      from: "",
      to: email,
      subject: " Email Verification ",
      text: ` Hi, the secret OTP code is : ${otp} . Please never share with others.  `,
    };
    transporter.sendMail(mailMessage, async (error, info) => {
      if (error) {
        return response.status(500).json({ error });
      } else {
        response
          .status(201)
          .cookie("A_CUT_Email", emailVerifyToken)
          .json({ token: emailVerifyToken });
      }
    });
    
}


// Verify the OTP entered by the user to verify its email
export const verifyOTPforEmail = async(request ,response)=>{

  const { userOtp } = request.body;

  const userToken = request.cookies.A_CUT_Email;

  if (!userToken) {
    return response.status(401).json({ error: " UnAuthorised User !" });
  }
  const isTokenVerified = jwt.verify(userToken, Secure_Key);
  if (!isTokenVerified) {
    return response.status(401).json({ error: "UnAuthorised User !" });
  }

  const otp = isTokenVerified.OTP - 1;
  const email = isTokenVerified.email;
  const role = isTokenVerified.role;
  console.log(otp);
  console.log(email);
  console.log(role);
  console.log(userOtp);
  
  if(Number(userOtp) === otp) {
    await UserCol.create({email,userRole:{role}});

    response.status(201).json({ message: "OTP Matched!" ,email});
  } else {
    
    return response.status(401).json({ error: " Invalid OTP !" });
  }
}