const PasswordValidator = require("password-validator");
const pswSchema = new PasswordValidator();

pswSchema
.is().min(8)
.is().max(64)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().symbols()
.has().not().spaces()

module.exports = pswSchema;

//The password must contain 8 characters, uppercase, lowercase, digit and symbols