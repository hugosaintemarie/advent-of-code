import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  console.log(data);
  let [ranges, ids] = data.split('\n\n').map((d) => d.split('\n'));
  ranges = ranges.map((d) => d.split('-').map((n) => parseInt(n)));
  ids = ids.map((d) => parseInt(d));

  console.log({ ranges, ids });

  let fresh = 0;
  for (const id of ids) {
    const found = ranges.some((r) => r[0] <= id && r[1] >= id);
    if (found) {
      fresh += 1;
    }
  }

  console.log({ fresh });
});
