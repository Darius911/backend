const fs = require("fs");

const path = require("path");


const dir = path.join(__dirname, "../data/data.json");
const users = JSON.parse(fs.readFileSync(dir));

module.exports = {fs, dir , users}