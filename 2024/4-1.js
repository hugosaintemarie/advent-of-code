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
    if (c !== 'X') continue;

    if (data[i + 1] === 'M' && data[i + 2] === 'A' && data[i + 3] === 'S') {
      // To right >
      if (i % w < w - 3) {
        // X distant enough from right edge to avoid wrap
        total += 1;

        copy[i] = 'X';
        copy[i + 1] = 'M';
        copy[i + 2] = 'A';
        copy[i + 3] = 'S';
      }
    }

    if (data[i - 1] === 'M' && data[i - 2] === 'A' && data[i - 3] === 'S') {
      // To left <
      if (i % w >= 3) {
        // X distant enough from left edge to avoid wrap
        total += 1;

        copy[i] = 'X';
        copy[i - 1] = 'M';
        copy[i - 2] = 'A';
        copy[i - 3] = 'S';
      }
    }

    if (
      data[i + w] === 'M' &&
      data[i + w * 2] === 'A' &&
      data[i + w * 3] === 'S'
    ) {
      // To bottom v
      total += 1;

      copy[i] = 'X';
      copy[i + w] = 'M';
      copy[i + w * 2] = 'A';
      copy[i + w * 3] = 'S';
    }

    if (
      data[i - w] === 'M' &&
      data[i - w * 2] === 'A' &&
      data[i - w * 3] === 'S'
    ) {
      // To top ^
      total += 1;

      copy[i] = 'X';
      copy[i - w] = 'M';
      copy[i - w * 2] = 'A';
      copy[i - w * 3] = 'S';
    }

    if (
      data[i + (w + 1)] === 'M' &&
      data[i + (w + 1) * 2] === 'A' &&
      data[i + (w + 1) * 3] === 'S'
    ) {
      // To bottom-right
      if (i % w < w - 3) {
        // X distant enough from right edge to avoid wrap
        total += 1;

        copy[i] = 'X';
        copy[i + (w + 1)] = 'M';
        copy[i + (w + 1) * 2] = 'A';
        copy[i + (w + 1) * 3] = 'S';
      }
    }

    if (
      data[i + (w - 1)] === 'M' &&
      data[i + (w - 1) * 2] === 'A' &&
      data[i + (w - 1) * 3] === 'S'
    ) {
      // To bottom-left
      if (i % w >= 3) {
        // X distant enough from left edge to avoid wrap
        total += 1;

        copy[i] = 'X';
        copy[i + (w - 1)] = 'M';
        copy[i + (w - 1) * 2] = 'A';
        copy[i + (w - 1) * 3] = 'S';
      }
    }

    if (
      data[i - (w + 1)] === 'M' &&
      data[i - (w + 1) * 2] === 'A' &&
      data[i - (w + 1) * 3] === 'S'
    ) {
      // To top-left
      if (i % w >= 3) {
        // X distant enough from left edge to avoid wrap
        total += 1;

        copy[i] = 'X';
        copy[i - (w + 1)] = 'M';
        copy[i - (w + 1) * 2] = 'A';
        copy[i - (w + 1) * 3] = 'S';
      }
    }

    if (
      data[i - (w - 1)] === 'M' &&
      data[i - (w - 1) * 2] === 'A' &&
      data[i - (w - 1) * 3] === 'S'
    ) {
      // To top-right
      if (i % w < w - 3) {
        // X distant enough from right edge to avoid wrap
        total += 1;

        copy[i] = 'X';
        copy[i - (w - 1)] = 'M';
        copy[i - (w - 1) * 2] = 'A';
        copy[i - (w - 1) * 3] = 'S';
      }
    }
  }

  var chunks = [];
  for (var i = 0; i < copy.length; i += w) {
    chunks.push(copy.join('').substring(i, i + w));
  }
  console.log(chunks.join('\n'));

  console.log({ total });

  // between 2644 and 2652
});
