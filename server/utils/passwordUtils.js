const crypto = require("crypto");

function hashPassword(password, salt = crypto.randomBytes(32).toString("hex")) {
  const phash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    phash: phash,
  };
}

function isSamePassword(candidate, phash, salt) {
  return phash === hashPassword(candidate, salt);
}

module.exports = { hashPassword, isSamePassword };
