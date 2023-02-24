export default () => ({
  mongoUri: process.env.MONGO_URI,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.JWT_ESPIRES_IN,
});
