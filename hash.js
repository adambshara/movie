const bcrypt = require("bcrypt");

const salt = await bcrypt.genSalt(10);
User.password = await bcrypt.hash(user.password, salt);
