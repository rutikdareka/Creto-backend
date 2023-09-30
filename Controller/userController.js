const getdatauri = require("../utils/datauri");
const cloudinary = require("cloudinary").v2;
const client = require("../lib/redis.connection");
const db = require("../lib/postgres.connection");

const CreateProfile = async (req, res) => {
  try {
    const files = req.files;
    // const { name, location, website, bio, file } = req.body;
    console.log(files);
    // if (!name) {
    //   return res.status(401).send("some error occured name");
    // }

    // if (files) {
    //     const filuri = getdatauri(files);
    //     const avatar = await cloudinary.uploader.upload(filuri.content);
    //     const data = {
    //         name: name,
    //         location: location,
    //         website: website,
    //         bio: bio,
    //         pic: avatar.secure_url,
    //     }

    //     db.query('select * from users where id=?', [req.user], async (error, result) => {
    //         if (error) {
    //             res.send(error)
    //         }
    //         const givendata = await client.set(`user:${req.user}`, JSON.stringify(data), 3600);
    //         res.status(201).send(givendata)
    //     })

    // }

    // else {
    //     const cdata = {
    //         name: name,
    //         location: location,
    //         website: website,
    //         bio: bio,
    //     }

    //     const result = await client.set(`user:${req.user}`, JSON.stringify(cdata));
    //     res.status(201).send(result)
    // }
  } catch (error) {
    res.send("some error occured");
  }
};

const getProfileuser = async (req, res) => {
  try {
    const data = await client.get(`user:${req.user}`, false);

    if (data) {
      res.json(JSON.parse(data));
    }
    // else {

    //     db.query('SELECT * from users where id=?', [req?.user], (error, result) => {
    //         if (error) {
    //             res.send(error)
    //         }
    //         res.json(result[0])
    //     })
    // }
  } catch (error) {
    res.send("some error occured");
  }
};

module.exports = { CreateProfile, getProfileuser };
