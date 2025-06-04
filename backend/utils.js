const fs = require('fs/promises');
const path = require('path');

async function readJSON(name) {
  const filePath = path.join(__dirname, '..', 'models', name);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

async function writeJSON(name, data) {
  const filePath = path.join(__dirname, '..', 'models', name);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  readJSON,
  writeJSON,
};
