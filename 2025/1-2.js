import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);

  let val = 50;
  let count = 0;

  for (const line of data.split('\n')) {
    console.log('---');

    const dir = line[0];
    const num = parseInt(line.substring(1));

    console.log(dir, num);

    for (let i = 0; i < num; i++) {
      if (dir === 'L') {
        val -= 1;
        if (val === -1) {
          val = 99;
        }
      } else if (dir === 'R') {
        val += 1;
        if (val === 100) {
          val = 0;
        }
      }

      if (val === 0) {
        count += 1;
      }
    }
  }

  console.log(count);
});
