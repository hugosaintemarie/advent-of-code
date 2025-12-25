import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);

  let lines = data.split('\n').map((d) => d.split(''));
  // console.log(lines);

  let splits = 0;

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

      console.log(char, above);

      if (char === '.' && (above === 'S' || above === '|')) {
        lines[y][x] = '|';
      } else if (char === '^' && above === '|') {
        splits += 1;
        if (lines[y][x - 1] === '.') lines[y][x - 1] = '|';
        lines[y][x] = char;
        if (lines[y][x + 1] === '.') lines[y][x + 1] = '|';
      }
    }
  }

  console.log(lines.map((d) => d.join('')).join('\n'));
  console.log(splits);
});
