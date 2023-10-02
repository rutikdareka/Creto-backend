const db = require("../lib/postgres.connection");
const generateUniqueId = require("generate-unique-id");
const axios = require("axios");
const {
  resetpassowrdsendemail,
  resendotpfrogmail,
  sendmailuser,
} = require("../utils/sendEmailTouser");
const client = require("../lib/redis.connection");
const { Genrate } = require("../helper/jsonToken.auth");

async function signupnuser(req, res) {
  try {
    const { username, email, password, birthdate, displayname } = req.body;

    if (!username || !email || !password || !birthdate || !displayname) {
      return res.json({
        success: false,
        message: "please fill are all feilds",
      });
    }

    const id = generateUniqueId({
      length: 20,
      useLetters: false,
    });

    db.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
      if (err) {
        return res.send(err);
      }

      if (result?.rows[0]) {
        return res.json({
          success: false,
          message: "This user are already exist",
        });
      }

      const date = new Date();

      db.query(
        `INSERT INTO users (id,username,email,password,createdat,avatar,birthdate,displayname) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [id, username, email, password, date, "", birthdate, displayname],
        (error, result) => {
          if (error) {
            return res.send(error);
          }

          db.query(
            "select * from users where email=$1",
            [email],
            async (error, result) => {
              if (error) {
                return res.send(error);
              }

              const generatedotp = Math.floor(10000 + Math.random() * 90000);
              const setotpuser = await client.set(
                `otp:${id}`,
                JSON.stringify(generatedotp)
              );
              res.status(200).json({ success: true, result: result.rows[0] });

              //send mail for user gmail
              sendmailuser(email, generatedotp);
            }
          );
        }
      );
    });
  } catch (error) {
    res.status(400).send("some error occured");
  }
}

async function resendapi(req, res) {
  try {
    const { id } = req.params;
    db.query("select * from users where id=$1", [id], async (err, result) => {
      if (err) {
        res.send(err);
      }
      const deleteotpfromredis = await client.del(`otp:${id}`);
      const generatedotp = Math.floor(10000 + Math.random() * 90000);
      const inserttofrom = await client.set(
        `otp:${id}`,
        JSON.stringify(generatedotp)
      );
      res
        .status(201)
        .json({ success: true, message: "your otp resend now successfuly" });

      // send resent opt for gmail user
      resendotpfrogmail(result.rows[0].email, generatedotp);
    });
  } catch (error) {
    res.send("some error occured");
  }
}

async function verifyopt(req, res) {
  try {
    const { otp, id } = req.body;
    const getotp = await client.get(`otp:${id}`);
    if (getotp === otp) {
      const authtoken = Genrate(id);
      res.status(201).json({ success: true, authtoken: authtoken });
      client.del(`otp:${id}`, (err, done) => {
        if (err) {
          res.send(err);
        }
      });
    } else {
      res.status(201).json({ success: false });
    }
  } catch (error) {
    res.status(403).send("some error occured");
  }
}

async function loginuser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "please fill are all feilds",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email =$1 and password=$2",
      [email, password],
      async (err, data) => {
        if (err) {
          return res
            .status(401)
            .send("Sorry correct email and password fillup");
        }

        if (!data.rows[0]) {
          return res.status(401).send("This user Not exist");
        } else {
          const checkotp = await client.get(`otp:${data.rows[0]?.id}`);

          if (checkotp) {
            res.json({
              result: data.rows[0],
              message: "This user not otp fillup",
            });
          }
          if (!checkotp) {
            const authtoken = Genrate(data.rows[0]?.id);
            res.status(200).json({
              success: true,
              authtoken: authtoken,
              result: data.rows[0],
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).send("intervel server error");
  }
}

async function sendmail(req, res) {
  const { email } = req.body;
  try {
    db.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      async (err, result) => {
        if (err) {
          console.log(err);
        }

        const token = Genrate(result?.rows[0]?.id);

        // send reset passoword gmail for user
        resetpassowrdsendemail(result.rows[0].id, token, email);
      }
    );
  } catch (error) {
    res.status(402).send("some error occured");
  }
}

async function forgotPassword(req, res) {
  try {
    const { id } = req.params;
    const { password } = req.body;
    db.query("SELECT * FROM users WHERE id = $1", [id], async (err, result) => {
      if (err) {
        console.log(err);
      }
      db.query(
        `UPDATE users set password=$1 where id=$2`,
        [password, id],
        (error, result) => {
          if (error) {
            return res.status(401).send("Link is not valid");
          }

          res.status(201).send("Successfuly updated password");
        }
      );
    });
  } catch (error) {
    res.status(402).send("some error occured");
  }
}

async function googlelogin(req, res, next) {
  try {
    let data = {};
    const { access_token } = req.body;
    const getinfo = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        data = res.data;
      })
      .catch((err) => console.log("err"));

    db.query(
      "SELECT * FROM users WHERE id=$1",
      [data.id],
      async (err, info) => {
        if (err) {
          return res
            .status(401)
            .send("Sorry correct email and password fillup");
        }

        if (info.rows[0]) {
          const authtoken = Genrate(info.rows[0]?.id);
          return res.status(200).json({
            success: true,
            authtoken: authtoken,
            result: info.rows[0],
          });
        } else {
          const date = new Date();
          db.query(
            `INSERT INTO users (id,username,email,createdat,avatar,password,displayname) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [
              data.id,
              data.given_name,
              data.email,
              date,
              data.picture,
              "",
              data.name,
            ],
            async (error, result) => {
              if (error) {
                console.log("not done");
                return res.send(error);
              }

              db.query(
                "SELECT * FROM users WHERE id=$1",
                [data.id],
                (err, result) => {
                  if (err) {
                    return res
                      .status(401)
                      .send("Sorry correct email and password fillup");
                  }

                  const authtoken = Genrate(result.rows[0]?.id);
                  res.status(200).json({
                    success: true,
                    authtoken: authtoken,
                    result: result.rows[0],
                  });
                }
              );
            }
          );
        }
      }
    );
  } catch (error) {
    next(error);
  }
}

async function Onetapgooglelogin(req, res, next) {
  try {
    const { sub, email, picture, name, given_name } = req.body;
    db.query("SELECT * FROM users WHERE id=$1", [sub], async (err, info) => {
      if (err) {
        return res.status(401).send("Sorry correct email and password fillup");
      }

      if (info.rows[0]) {
        const authtoken = Genrate(sub);
        return res.status(200).json({
          success: true,
          authtoken: authtoken,
          result: info.rows[0],
        });
      } else {
        const date = new Date();
        db.query(
          `INSERT INTO users (id,username,email,createdat,avatar,password,displayname) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
          [sub, given_name, email, date, picture, "", name],
          async (error, result) => {
            if (error) {
              return res.send(error);
            }

            db.query(
              "SELECT * FROM users WHERE id=$1",
              [sub],
              (err, result) => {
                if (err) {
                  return res
                    .status(401)
                    .send("Sorry correct email and password fillup");
                }

                const authtoken = Genrate(sub);
                res.status(200).json({
                  success: true,
                  authtoken: authtoken,
                  result: result.rows[0],
                });
              }
            );
          }
        );
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  googlelogin,
  resendapi,
  loginuser,
  signupnuser,
  sendmail,
  forgotPassword,
  verifyopt,
  Onetapgooglelogin,
};
