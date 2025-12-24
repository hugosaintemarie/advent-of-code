import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);

  let sum = 0;

  for (const bank of data.split('\n')) {
    console.log(bank);

    const getHighestAndIndex = (string, i) => {
      // console.log(i);
      const sub = string.substring(0, string.length - 12 + i);
      // console.log(sub);

      const highest = Math.max(...[...sub].map((d) => parseInt(d)));
      // console.log(highest);

      const index = sub.indexOf(highest);

      return [highest, index];
    };

    let joltage = '';
    let b = bank;
    for (let i = 1; i <= 12; i++) {
      const [highest, index] = getHighestAndIndex(b, i);
      // console.log('highest is', highest, 'at index', index);
      joltage += highest;
      b = b.substring(index + 1);
    }

    console.log(parseInt(joltage));
    sum += parseInt(joltage);
  }

  console.log({ sum });
});
