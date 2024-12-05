import fs from 'fs';

fs.readFile('./data.txt', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  const w = data.split('\n')[0].length;
  data = data.split('\n').join('');

  // console.log(data, w);

  let total = 0;
  let copy = new Array(data.length).fill('.');

  for (let i = 0; i < data.length; i += 1) {
    const c = data[i];
    if (c !== 'A') continue;

    console.log(i, w, i % w);

    if (i % w >= w - 1) continue;
    if (i % w < 1) continue;

    // M.S
    // .A.
    // M.S
    if (
      data[i - w - 1] === 'M' &&
      data[i - w + 1] === 'S' &&
      data[i + w - 1] === 'M' &&
      data[i + w + 1] === 'S'
    ) {
      total += 1;

      copy[i] = 'A';
      copy[i - w - 1] = 'M';
      copy[i - w + 1] = 'S';
      copy[i + w - 1] = 'M';
      copy[i + w + 1] = 'S';
    }

    // S.S
    // .A.
    // M.M
    if (
      data[i - w - 1] === 'S' &&
      data[i - w + 1] === 'S' &&
      data[i + w - 1] === 'M' &&
      data[i + w + 1] === 'M'
    ) {
      total += 1;

      copy[i] = 'A';
      copy[i - w - 1] = 'S';
      copy[i - w + 1] = 'S';
      copy[i + w - 1] = 'M';
      copy[i + w + 1] = 'M';
    }

    // M.M
    // .A.
    // S.S
    if (
      data[i - w - 1] === 'M' &&
      data[i - w + 1] === 'M' &&
      data[i + w - 1] === 'S' &&
      data[i + w + 1] === 'S'
    ) {
      total += 1;

      copy[i] = 'A';
      copy[i - w - 1] = 'M';
      copy[i - w + 1] = 'M';
      copy[i + w - 1] = 'S';
      copy[i + w + 1] = 'S';
    }

    // S.M
    // .A.
    // S.M
    if (
      data[i - w - 1] === 'S' &&
      data[i - w + 1] === 'M' &&
      data[i + w - 1] === 'S' &&
      data[i + w + 1] === 'M'
    ) {
      total += 1;

      copy[i] = 'A';
      copy[i - w - 1] = 'S';
      copy[i - w + 1] = 'M';
      copy[i + w - 1] = 'S';
      copy[i + w + 1] = 'M';
    }
  }

  var chunks = [];
  for (var i = 0; i < copy.length; i += w) {
    chunks.push(copy.join('').substring(i, i + w));
  }
  console.log(chunks.join('\n'));

  console.log({ total });
});
