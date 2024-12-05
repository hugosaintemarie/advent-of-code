import fs from 'fs';

fs.readFile('./data.txt', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  // console.log(data);

  const [rules, updates] = data.split('\n\n').map((d) => d.split('\n'));

  // console.log({ rules, updates });

  const invalidUpdates = [];

  for (let [u, update] of updates.entries()) {
    update = update.split(',');

    let isValid = true;

    for (const [firstIndex, first] of update.entries()) {
      // console.log({ update, page });
      const rulesForPage = rules.filter((r) => r.split('|')[0] === first);
      // console.log({ rulesForPage });

      const isCorrect = rulesForPage.every((rule) => {
        const second = rule.split('|')[1];
        const secondIndex = update.indexOf(second);
        // console.log({ second, secondIndex });

        if (secondIndex !== -1 && secondIndex < firstIndex) {
          console.log(
            `> Update ${u} invalid, would print ${second} before ${first}, which violates ${rule}`
          );
        }

        return secondIndex === -1 || secondIndex > firstIndex;
      });

      if (isCorrect) {
        console.log(
          `${first} is correctly ${firstIndex + 1}th because: ${rulesForPage.join(', ')}`
        );
      } else {
        isValid = false;
        invalidUpdates.push(update);
        break;
      }
    }

    if (isValid) console.log(`> Update ${u} valid`);
    console.log('---');
  }

  const fixedUpdates = [];

  for (const invalidUpdate of invalidUpdates) {
    const fixed = [...invalidUpdate].sort((a, b) => {
      const rule = rules.find((r) => r === `${a}|${b}` || r === `${b}|${a}`);
      const first = rule.split('|')[0];
      console.log(a, b, { rule }, first);
      return a === first ? -1 : 1;
    });

    console.log(`${invalidUpdate.join(',')} becomes ${fixed.join(',')}`);
    fixedUpdates.push(fixed);
  }

  console.log({ fixedUpdates });
  const sum = fixedUpdates.reduce((acc, curr) => {
    const middleIndex = Math.floor(curr.length / 2);
    return acc + parseInt(curr[middleIndex]);
  }, 0);
  console.log({ sum });
});
