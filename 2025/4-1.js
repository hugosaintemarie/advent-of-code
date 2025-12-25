import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);

  let accessible = 0;

  const out = [];

  const rows = data.split('\n');
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[0].length; x++) {
      const cell = rows[y][x];
      // console.log(cell);

      const adjencent = [
        rows[y - 1]?.[x - 1],
        rows[y - 1]?.[x],
        rows[y - 1]?.[x + 1],
        rows[y][x - 1],
        rows[y][x + 1],
        rows[y + 1]?.[x - 1],
        rows[y + 1]?.[x],
        rows[y + 1]?.[x + 1],
      ];

      const count = adjencent.filter((d) => d === '@').length;
      // console.log(count);

      if (cell === '@' && count < 4) {
        accessible += 1;

        out[y] ??= [];
        out[y][x] = 'x';
      } else {
        out[y] ??= [];
        out[y][x] = cell;
      }
    }
  }

  // console.log(out);
  console.log(accessible);
});
