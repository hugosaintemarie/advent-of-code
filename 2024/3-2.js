import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  // console.log(data);

  const chunks = data.split(/don't\(\)/g);
  const first = chunks.shift();

  const muls = [...first.match(/mul\(\d+,\d+\)/g)];

  for (const chunk of chunks) {
    // console.log('---');

    // console.log({ chunk });
    let [_before, ...afterDo] = chunk.split(/do\(\)/);

    afterDo = afterDo.join('');
    if (!afterDo.length) continue;

    // console.log({ afterDo });
    muls.push(...afterDo.match(/mul\(\d+,\d+\)/g));
  }

  // console.log({ muls });

  const total = muls.reduce((acc, curr) => {
    // console.log(curr);
    const [a, b] = curr.match(/\d+/g).map((d) => parseInt(d));
    return acc + a * b;
  }, 0);
  console.log({ total });
});
