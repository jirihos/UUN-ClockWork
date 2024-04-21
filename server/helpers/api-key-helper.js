const crypto = require("crypto");

function generateApiKey(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let apiKey = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(charset.length);
    apiKey += charset[randomIndex];
  }
  return apiKey;
}

module.exports = {
  generateApiKey,
};
