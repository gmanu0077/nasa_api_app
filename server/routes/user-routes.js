const router = require("express").Router();
let User = require("../models/user");

//console.log('user acess')

router.route("/").get((req, res) => {
  console.log("here");
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const { username, password, passwordVerify } = req.body;

  if (!username || !password || !passwordVerify)
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });

  if (password.length < 6)
    return res.status(400).json({
      errorMessage: "Please enter a password of at least 6 characters.",
    });

  if (password !== passwordVerify)
    return res.status(400).json({
      errorMessage: "Please enter the same password twice.",
    });

  const exist = await User.findOne({ username });
  if (exist) {
    return res.status(400).json({
      errorMessage: "An account with this username already exists.",
    });
  }

  const newUser = new User({
    username,
    password,
  });

  const saved = await newUser.save();

  const token = {
    user: saved._id,
    name: saved.username,
    status: true,
  };

  res
    .cookie("token", token, {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
    })
    .send();
});
router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate

    if (!username || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res
        .status(401)
        .json({ errorMessage: "Wrong username or password." });

    // const passwordCorrect = await bcrypt.compare(
    //   password,
    //   existingUser.password
    // );
    if (password !== existingUser.password)
      return res
        .status(401)
        .json({ errorMessage: "Wrong username or password." });

    const token = {
      user: existingUser._id,
      name: existingUser.username,
      status: true,
    };

    console.log(token, "cookies hai");
    res
      .cookie("token", token, {
        httpOnly: false,
        maxAge: 100000,
        // sameSite: "lax",
      })
      .send();

    return;
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.route("/logout").get((req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);
    else return res.json(true).status(true), console.log("here");
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
