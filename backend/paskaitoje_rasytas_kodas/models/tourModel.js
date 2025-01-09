const fs = require("fs");

const path = require("path");


const dir = path.join(__dirname, "../data/tours-simple.json");
const tours = JSON.parse(fs.readFileSync(dir));

module.exports = {fs, dir , tours}