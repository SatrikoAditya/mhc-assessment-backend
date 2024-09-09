const bcrypt = require("bcryptjs");


export const generateHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND || ''));
  return await bcrypt.hash(password, salt);
};

export const compareHashedPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
