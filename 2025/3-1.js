import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);

  let sum = 0;

  for (const bank of data.split('\n')) {
    // console.log(bank);
    const batteries = [...bank].map((d) => parseInt(d));
    // console.log(batteries);

    const batteriesButLast = [...batteries];
    batteriesButLast.pop();
    // console.log(batteriesButLast);

    const highest = Math.max(...batteriesButLast);
    // console.log(highest);

    const index = batteries.indexOf(highest);
    console.log('highest is', highest, 'at first index', index);

    const sub = bank.substring(index + 1);
    console.log(sub);

    for (let i = 9; i >= 0; i--) {
      if (sub.includes(i.toString())) {
        console.log(`${highest}${i}`);
        sum += parseInt(`${highest}${i}`);
        break;
      }
    }
  }

  console.log({ sum });
});
