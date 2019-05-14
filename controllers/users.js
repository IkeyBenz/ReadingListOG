const router = require('express').Router();
const User = require('../models/user');


router.get('/signup', (_, res) => res.render('signup'));
router.get('/signin', (_, res) => res.render('signin'));
router.get('/profile', (_, res) => res.render('profile'));

router.get('/signout', (_, res) => {
  res.clearCookie('rl');
  res.redirect('/?success=Your are signed out.');
});

router.post('/signup', async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.email });
  if (currentUser) {
    return res.redirect('/signin?success=Your account already exists, please sign in.');
  }

  try {
    const newUser = new User(req.body);
    await newUser.save();
    return res.redirect(`/signin?success=Your account has been created, ${req.body.name}. Please sign in.`);
  } catch (err) {
    return res.redirect(`/signin?error=${err}`);
  }
});

router.post('/signin', async (req, res) => {
  const user = await User.findOne({ email: req.body.email }, 'email password name');
  if (user) {
    return user.comparePassword(req.body.password, (err, same) => {
      if (err) return res.redirect(`/?signin?error=${err}`);
      if (same) {
        const token = user.createJWT();
        res.cookie('rl', token, { maxAge: 10 * 60 * 60 * 24 * 60 });
        return res.redirect(`/?success=Signed in as ${user.name}`);
      }
      return res.redirect('/signin?error=The email or password you entered is incorrect.');
    });
  }
  return res.redirect('/signin?error=The email or password you entered is incorrect.');
});

module.exports = router;
