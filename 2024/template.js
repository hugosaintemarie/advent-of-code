import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  console.log(data);
});