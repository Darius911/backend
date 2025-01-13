const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});