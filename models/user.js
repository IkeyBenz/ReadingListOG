const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select: false },
  readingList: [{ type: Schema.Types.ObjectId, ref: 'book', required: false }],
}, { timestamps: true });

UserSchema.methods.comparePassword = function compareHashed(password, done) {
  bcrypt.compare(password, this.password, done);
};

UserSchema.methods.createJWT = function createNewJWT() {
  const today = new Date();
  const expires = new Date(today);
  expires.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
  }, process.env.SECRET, { expiresIn: '60 days' });
};

UserSchema.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) { return next(); }

  return bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (error, hash) => {
      this.password = hash;
      return next();
    });
  });
});


module.exports = model('user', UserSchema);
