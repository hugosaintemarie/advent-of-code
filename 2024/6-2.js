import fs from 'fs';

const sleep = (delay) => new Promise((res) => setTimeout(res, delay));

fs.readFile('./data.txt', 'utf8', async (_, data) => {
  console.clear();
  data = data.trim();

  // console.log(data);

  const map = data.split('\n').map((d) => d.split(''));

  const start = { y: map.findIndex((y) => y.includes('^')) };
  start.x = map[start.y].indexOf('^');

  // console.log({ start });

  const dirs = [
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 }, // right
    { x: 0, y: 1 }, // down
    { x: -1, y: 0 }, // left
  ];

  let dirIndex = 0;
  let dir = dirs[dirIndex];

  let curr = { ...start };

  const findNext = (map, curr, dir) => {
    const _y = curr.y + dir.y;
    const _x = curr.x + dir.x;
    return map[_y]?.[_x];
  };

  let obstructions = [];

  const loop = async (map, curr, dir, dirIndex, deep) => {
    let next = true;
    let step = 0;

    while (next) {
      // console.clear();
      step += 1;

      next = findNext(map, curr, dir, dirIndex);
      // console.log({ next });

      // console.log(map.map((d) => d.join('')).join('\n'));
      // console.log();
      // console.log(`curr in y:${curr.y}, x:${curr.x}`);
      // console.log(`step: ${step}`);
      // console.log(`obstructions: ${obstructions.length}`);

      // console.log();

      if (next === '#' || next === 'O') {
        // console.log(`Hit ${next}, turn right`);
        dirIndex = (dirIndex + 1) % 4;
        dir = dirs[dirIndex];
        next = findNext(map, curr, dir);
      } else {
        if (!deep) {
          if (!next) return;

          const y = curr.y + dir.y;
          const x = curr.x + dir.x;

          // console.log(`Try with O in y:${y}, x:${x}`);
          const _map = JSON.parse(JSON.stringify(map));
          _map[y][x] = 'O';

          const _curr = { ...curr };
          const _dir = { ...dir };

          // await sleep(100);
          const obstruction = await loop(_map, _curr, _dir, dirIndex, true);
          if (obstruction) {
            if (!obstructions.some((o) => o.y === y && o.x === x)) {
              obstructions.push({ y, x });
            }
          }
        }
      }

      if (['.', '^', '>', 'v', '<'].includes(next)) {
        curr.y += dir.y;
        curr.x += dir.x;
        map[curr.y][curr.x] = ['^', '>', 'v', '<'][dirIndex];
      }

      if (!next) {
        // console.log('Oops, out');
        return;
      }

      if (next === ['^', '>', 'v', '<'][dirIndex]) {
        return true;
      }

      // await sleep(100);
    }
  };

  await loop(map, curr, dir, dirIndex);

  console.log('');
  // console.log(map.map((d) => d.join('')).join('\n'));

  const total = map
    .flat()
    .join('')
    .match(/[<>v\^]/g).length;
  // console.log(total);
  console.log(obstructions.length);
});
