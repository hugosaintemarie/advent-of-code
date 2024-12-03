import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  let safe = 0;

  const solve = (vals) => {
    let dir = '';

    for (let i = 1; i < vals.length; i += 1) {
      const prev = vals[i - 1];
      const curr = vals[i];

      if (prev - curr === 0) {
        console.log(
          vals.join(','),
          `: Unsafe because ${prev} ${curr} is neither an increase or a decrease`
        );

        return false;
      }

      if (i === 1) {
        if (prev - curr > 0) dir = 'desc';
        else if (prev - curr < 0) dir = 'asc';
      } else {
        if (prev - curr < 0 && dir === 'desc') {
          console.log(
            vals.join(','),
            `: Unsafe because ${vals[0]} ${vals[1]} is decreasing but ${prev} ${curr} is increasing`
          );
          return false;
        }
        if (prev - curr > 0 && dir === 'asc') {
          console.log(
            vals.join(','),
            `: Unsafe because ${vals[0]} ${vals[1]} is increasing but ${prev} ${curr} is decreasing`
          );
          return false;
        }
      }

      if (prev - curr < -3) {
        console.log(
          vals.join(','),
          `: Unsafe because ${prev} ${curr} is an increase of ${-(prev - curr)}`
        );
        return false;
      }
      if (prev - curr > 3) {
        console.log(
          vals.join(','),
          `: Unsafe because ${prev} ${curr} is a decrease of ${prev - curr}`
        );
        return false;
      }

      if (i === vals.length - 1) {
        console.log(vals.join(','), 'Safe');
        return true;
      }
    }
  };

  for (const line of data.split('\n')) {
    const vals = line.split(' ').map((d) => parseInt(d));

    console.log('------------------------------------');

    const res = solve(vals);
    if (res) {
      safe += 1;
    } else {
      console.log('');
      console.log("Let's brute force variants then…");

      for (let i = 0; i < vals.length; i += 1) {
        const variant = [...vals].filter((_item, n) => n !== i);
        if (solve(variant)) {
          safe += 1;
          break;
        }
      }
    }
  }

  console.log(safe);
});
