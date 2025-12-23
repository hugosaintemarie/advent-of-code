import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);

  let val = 50;
  let count = 0;

  for (const line of data.split('\n')) {
    // console.log('---');

    const dir = line[0];
    const num = parseInt(line.substring(1));

    // console.log(dir, num);

    if (dir === 'L') {
      val -= num;
    } else if (dir === 'R') {
      val += num;
    }

    if (val < 0) {
      while (val < 0) {
        val += 100;
      }
    } else if (val > 100) {
      while (val > 100) {
        val -= 100;
      }
    }

    if (val === 100) {
      val = 0;
    }

    if (val === 0) {
      count += 1;
    }
    console.log(dir, num, val);
  }

  console.log(count);
});
