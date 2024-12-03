import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  // console.log(data);
  const muls = data.match(/mul\(\d+,\d+\)/g);
  const total = muls.reduce((acc, curr) => {
    // console.log(curr);
    const [a, b] = curr.match(/\d+/g).map((d) => parseInt(d));
    return acc + a * b;
  }, 0);
  console.log(total);
});
