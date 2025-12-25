import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);
  const lines = data.split('\n');

  const parts = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const part = line
      .split(/\s+/)
      .filter((d) => d)
      .map((d) => (i === lines.length - 1 ? d : parseInt(d)));

    parts.push(part);
  }

  let total = 0;

  for (let i = 0; i < parts[0].length; i++) {
    let res = 0;
    const op = parts[parts.length - 1][i];
    // console.log(op);

    for (let line = 0; line < parts.length - 1; line++) {
      const num = parts[line][i];

      if (op === '+') {
        res += num;
      } else if (op === '*') {
        res ||= 1;
        res *= num;
      }
    }

    console.log(res);
    total += res;
  }

  console.log({ total });
});
