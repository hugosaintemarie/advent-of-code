import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);

  let lines = data.split('\n').map((d) => d.split(''));
  // console.log(lines);

  let n = 1;

  for (let y = 0; y < lines.length; y++) {
    let line = lines[y];
    // console.log(line);

    for (let x = 0; x < lines[0].length; x++) {
      const char = line[x];
      const above = lines[y - 1]?.[x];

      if (!above) {
        lines[y][x] = char;
        continue;
      }

      // console.log(char, above);

      if (char === '.' && above === 'S') {
        lines[y][x] = [n];
      } else if (char === '.' && Array.isArray(above)) {
        lines[y][x] = [...above];
      } else if (char === '^' && above !== '.') {
        if (lines[y][x - 1] === '.') {
          lines[y][x - 1] = [...above];
        } else if (Array.isArray(lines[y][x - 1])) {
          lines[y][x - 1].push(...above);
        }

        lines[y][x] = char;

        if (lines[y][x + 1] === '.') {
          lines[y][x + 1] = [];

          for (const _id of above) {
            n++;
            lines[y][x + 1].push(n);
          }
        }
      } else if (Array.isArray(char) && Array.isArray(above)) {
        lines[y][x].push(...above);
      }
    }

    console.log(y);
    // console.log(lines[y].join(''));
  }

  console.log(lines.map((d) => d.join(' ')).join('\n'));
  console.log({ n });
});
