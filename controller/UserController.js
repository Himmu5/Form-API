const { UserModel } = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10; // Define your salt value.

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await UserModel.findOne({ email });

  if (findUser) {
    const passOk = bcrypt.compareSync(password, findUser.password);

    if (passOk == true) {
      jwt.sign(
        { userId: findUser._id, email },
        process.env.SECRET,
        (err, token) => {
          return res.status(200).json({ user: findUser, token });
        }
      );
    } else {
      return res.status(404).json("Invalid Credacial!!");
    }
  } else {
    return res.status(400).json("Invalid Credientials!!!");
  }
};

const createUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const createdUser = await UserModel.create({
      username,
      password: hashedPassword,
      email,
    });
    console.log("createdUser ", createdUser);

    jwt.sign(
      { userId: createdUser._id, user: createdUser },
      process.env.SECRET,
      {},
      (err, token) => {
        console.log(createdUser);
        res.status(201).json({ user: createdUser, token });
      }
    );
  } catch (err) {
    res.status(400).json("error");
  }
};

function getUserProfile(req, res) {
  console.log("req.headers", req.headers);
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET, {}, async (err, decoded) => {
      if (err) {
        res.status(422).json("error");
      } else {
        const findUser = await UserModel.findOne({email: decoded.email });
        if (findUser) {
          res.status(200).json({user : findUser});
        }else{
          res.status(404).json({ message : "User Not Found" });
        }
      }
    });
  } else {
    res.status(401).json({ message : "No token found" });
  }
}

module.exports = { signIn, createUser, getUserProfile };
