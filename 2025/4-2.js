import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);

  let accessible = 0;
  let accessibleThisTurn = 0;

  let rows = data.split('\n').map((d) => d.split(''));

  const work = () => {
    accessibleThisTurn = 0;

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

        const count = adjencent.filter((d) => d === '@' || d === 'x').length;
        // console.log(count);

        if (cell === '@' && count < 4) {
          accessible += 1;
          accessibleThisTurn += 1;

          rows[y] ??= [];
          rows[y][x] = 'x';
        } else {
          rows[y] ??= [];
          rows[y][x] = cell;
        }
      }
    }

    console.log('-');
    console.log(rows.map((d) => d.join('')).join('\n'));
    console.log('remove', accessibleThisTurn, 'rolls of paper');

    rows = rows.map((r) => r.map((c) => (c === 'x' ? '.' : c)));

    if (accessibleThisTurn) work();
  };

  work();

  // console.log(out);
  console.log(accessible);
});
