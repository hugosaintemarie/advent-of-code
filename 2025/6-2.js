import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);
  const lines = data.split('\n');

  // console.log(lines);

  let total = 0;
  let op = '';
  let str = '';

  for (let i = 0; i < lines[0].length; i++) {
    if (lines.every((line) => line[i] === ' ')) {
      // console.log('---');
      console.log(str);

      total += eval(str);

      op = '';
      str = '';
      continue;
    } else if (op) {
      // console.log(op);
      str += op;
    }

    for (let line = 0; line < lines.length; line++) {
      const char = lines[line][i];

      if (line === lines.length - 1) {
        if (char !== ' ') {
          op = char;
        }
      } else if (char !== ' ') {
        // console.log(char);
        str += char;
      }
    }
  }

  console.log(str);
  total += eval(str);

  console.log({ total });
});
