const fs = require("node:fs");
let requiredData = ``;

const data = fs.readFileSync("./words.txt", { encoding: "utf8", flag: "r" });

const splitedData = data.split(",");

for (let i = 0; i < splitedData.length; i++) {
  if (!splitedData[i].length <= 4) {
    requiredData += `${splitedData[i]}",`;
  }
}

console.log(requiredData);

fs.writeFileSync("newData.js", requiredData);
