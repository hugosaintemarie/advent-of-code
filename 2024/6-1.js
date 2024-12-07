import fs from 'fs';

fs.readFile('./data.txt', 'utf8', (_, data) => {
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

  const findNext = () => {
    const _y = curr.y + dir.y;
    const _x = curr.x + dir.x;
    return map[_y]?.[_x];
  };

  let next = findNext(curr);
  while (next) {
    // console.log('');
    // console.log({ next });

    if (next === '.' || next === 'X') {
      // console.log(map.map((d) => d.join('')).join('\n'));
      map[curr.y][curr.x] = 'X';
      curr.y += dir.y;
      curr.x += dir.x;
      map[curr.y][curr.x] = '^';
    } else if (next === '#') {
      dirIndex = (dirIndex + 1) % 4;
      // } else {
      //   break;
    }

    dir = dirs[dirIndex];
    next = findNext({ curr });
  }

  console.log('');
  console.log(map.map((d) => d.join('')).join('\n'));

  const total = map.flat().join('').match(/X|\^/g).length;
  console.log(total);
});
