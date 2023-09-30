const nodemailer = require("nodemailer");

// Create a nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cretoprof@gmail.com", // generated ethereal user
    pass: "bondutvwjwvhruvu", // generated ethereal password
  },
});

// send mail from user
const sendmailuser = async (email, otp) => {
  let info = await transporter.sendMail({
    from: "CretoPro@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    html: `
                 <!doctype html>
                 <html ⚡4email>
                   <head>
                     <meta charset="utf-8">
                     <style>
                     .heading {
                        font-weight: "700";
                        display: flex;
                        align-items: center;
                        gap: 0.7rem;
                    }
            
                    .sgfsdf {
                        font-size: "26px";
                    }
            
                    img {
                        height: 70px;
                        width: 70px;
                    }
            
                    .container {
                        width: "100%";
                    }
            
                    .sub_container {
                        width: 400px;
                        display: block;
                        margin: auto;
                        margin-top: auto;
                        margin-top: 38px;
            
                    }
            
                    .color_box {
                        background-color: "green"
                    }
            
                    h2 button {
                        color: "white";
                        background-color: "black";
                        width: "200px";
                        height: "30px";
                    }
            
                    a {
                        text-decoration: "none";
                        text-align: "center"
                    }
                     </style>
                   </head>
                   <body>
                   <div class="container">
                   <div class="sub_container">
                       <div class="heading">
                           <img
                               src="https://media.istockphoto.com/id/1226386279/vector/vector-double-line-alternative-logo-letter-c.jpg?s=612x612&w=0&k=20&c=vstn9zTeMFjee-WY5G1KYX2expZMLpltpiDZkEgx1oI=" />
                           <span style="font-size: 30px;font-weight: 600;padding-left: 20px">Creto</span>
                       </div>
                       <div class="color_box" style="margin-top: 10px;">
                           <p>
                               Hi your otp in now check and fill !
                           <h2>
                              ${otp}
                           </h2>
                           <p>Complete otp step and join Creto</p>
                           <p>Thank you for Registration</p>
       
                           <footer>
                               © Creto, Inc. All rights reserved. CRETO and other trademarks, logos, and service marks used
                               in this email are the trademarks of Creto, Inc. or their respective third-party owners.
                           </footer>
                       </div>
                   </div>
               </div>
                 </html>
                 `, // plain text body // html body
  });
};

// reset password mail send for user
const resetpassowrdsendemail = async (id, token, email) => {
  let info = await transporter.sendMail({
    from: "CretoPro@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    html: `
        <!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style>
               .heading {
                  font-size: "16px";
                  font-weight: "700"
               }
               .container {
                 width: "100%",
                 margin: "auto"
               }
               .color_box {
                  background-color: "green"
               }
               button {
                color: "white"
                background-color: "black"
               }
            </style>
          </head>
          <body>
          <div class="container">
            <div class="heading">
             Creto
            </div>
            <div>
            <h2>
              Reset password
            </h2>
            </div>
            <div class="color_box">
            <h2>
            Hi,
          </h2>
           <p>We just got a request to reset your password.</p>
           <p>If that was you, click on the link below to update your password.</p>
           <a href="http://localhost:3000/forgotpassword/${id}/${token}">Reset Password</a>
           <p>If you didn't ask to reset your password, it might mean someone tried to access your account. We recommend changing your password to be on the safe side.</p>
           <p>Creto</p>
           </div>
          </div>
          </body>
        </html>
          `,
  });
};

// resend opt mail send for user
const resendotpfrogmail = async (email, otp) => {
  let info = await transporter.sendMail({
    from: "CretoPro@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    html: `
                     <!doctype html>
                     <html>
                       <head>
                         <meta charset="utf-8">
                         <style>
                         .heading {
                            font-weight: "700";
                            display: flex;
                            align-items: center;
                            gap: 0.7rem;
                        }
                
                        .sgfsdf {
                            font-size: "26px";
                        }
                
                        img {
                            height: 70px;
                            width: 70px;
                        }
                
                        .container {
                            width: "100%";
                        }
                
                        .sub_container {
                            width: 400px;
                            display: block;
                            margin: auto;
                            margin-top: auto;
                            margin-top: 38px;
                
                        }
                
                        .color_box {
                            background-color: "green"
                        }
                
                        h2 button {
                            color: "white";
                            background-color: "black";
                            width: "200px";
                            height: "30px";
                        }
                
                        a {
                            text-decoration: "none";
                            text-align: "center"
                        }
                         </style>
                       </head>
                       <body>
                       <div class="container">
                       <div class="sub_container">
                           <div class="heading">
                               <img
                                   src="https://media.istockphoto.com/id/1226386279/vector/vector-double-line-alternative-logo-letter-c.jpg?s=612x612&w=0&k=20&c=vstn9zTeMFjee-WY5G1KYX2expZMLpltpiDZkEgx1oI=" />
                               <span style="font-size: 30px;font-weight: 600;padding-left: 20px">Creto</span>
                           </div>
                           <div class="color_box" style="margin-top: 10px;">
                               <p>
                                   Hi your resend otp in now check and fill ! <br/>
                                   This otp are expire in 30 min;
                               <h2>
                                  ${otp}
                               </h2>
                               <p>Complete otp step and join Creto</p>
                               <p>Thank you for Registration</p>
           
                               <footer>
                                   © Creto, Inc. All rights reserved. CRETO and other trademarks, logos, and service marks used
                                   in this email are the trademarks of Creto, Inc. or their respective third-party owners.
                               </footer>
                           </div>
                       </div>
                   </div>
                     </html>
                     `, // plain text body // html body
  });
};

module.exports = { sendmailuser, resetpassowrdsendemail, resendotpfrogmail };
