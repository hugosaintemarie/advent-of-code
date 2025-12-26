import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);

  let lines = data.split('\n').map((d) => d.split(''));
  // console.log(lines);

  for (let y = 2; y < lines.length; y++) {
    let line = lines[y];
    // console.log(line);

    for (let x = 0; x < lines[0].length; x++) {
      const char = line[x];

      if (char === '^' || (char === '.' && y === lines.length - 1)) {
        // console.log({ x, y });
        let val = 0;
        let rowY = y - 1;

        while (lines[rowY]) {
          let cell = lines[rowY][x];
          // console.log({ cell });

          if (cell === '^' || !isNaN(cell)) break;
          if (cell === 'S') val = 1;

          let left = lines[rowY][x - 1];
          let right = lines[rowY][x + 1];

          if (!isNaN(left)) {
            val += left;
          }

          if (!isNaN(right)) {
            val += right;
          }

          rowY--;
        }

        lines[y][x] = val;
      }
    }
  }
  const lastLine = lines.pop();
  const total = lastLine.reduce((acc, curr) => acc + curr, 0);
  console.log({ total });
});
