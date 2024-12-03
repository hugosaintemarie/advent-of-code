import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  let safe = 0;

  for (const line of data.split('\n')) {
    const vals = line.split(' ').map((d) => parseInt(d));

    let dir = '';

    for (let i = 1; i < vals.length; i += 1) {
      const prev = vals[i - 1];
      const curr = vals[i];

      if (prev - curr === 0) {
        console.log(
          vals,
          `Unsafe because ${prev} ${curr} is neither an increase or a decrease`
        );
        break;
      }

      if (i === 1) {
        if (prev - curr > 0) dir = 'desc';
        else if (prev - curr < 0) dir = 'asc';
      } else {
        if (prev - curr < 0 && dir === 'desc') {
          console.log(
            vals,
            `Unsafe because ${vals[0]} ${vals[1]} is decreasing but ${prev} ${curr} is increasing`
          );
          break;
        }
        if (prev - curr > 0 && dir === 'asc') {
          console.log(
            vals,
            `Unsafe because ${vals[0]} ${vals[1]} is increasing but ${prev} ${curr} is decreasing`
          );
          break;
        }
      }

      if (prev - curr < -3) {
        console.log(
          vals,
          `Unsafe because ${prev} ${curr} is an increase of ${-(prev - curr)}`
        );
        break;
      }
      if (prev - curr > 3) {
        console.log(
          vals,
          `Unsafe because ${prev} ${curr} is a decrease of ${prev - curr}`
        );
        break;
      }

      if (i === vals.length - 1) {
        console.log(vals, 'Safe');
        safe += 1;
      }
    }
  }

  console.log(safe);
});
