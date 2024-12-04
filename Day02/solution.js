import fs from 'fs/promises';

const readDataFile = async () => {
  try {
    const rawData = await fs.readFile('./data.txt', 'utf8');
    const lines = rawData.split('\n');
    const data = lines.map((line) => line.trim().split(/\s+/).map(Number));

    part1(data);

    part2(data);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error);
  }
};

const part1 = (data) => {
  let safe = 0;
  let is_safe = false;

  data.forEach((row, i) => {
    if (is_safe) safe += 1;
    let sign = 1;
    let compare = 0;
    is_safe = true;

    row.forEach((cell, j) => {
      if (!is_safe) return true;
      if (j === 0) {
        compare = cell;
      } else {
        if (j === 1) sign = Math.sign(compare - cell);
        const new_sign = Math.sign(compare - cell);
        if (
          new_sign === 0 ||
          new_sign !== sign ||
          Math.abs(compare - cell) > 3 ||
          Math.abs(compare - cell) < 1
        ) {
          is_safe = false;
        }
        compare = cell;
      }
    });
  });

  console.log('Calcul partie 1 :');
  console.log(safe);
};

const part2 = (data) => {
  let safe = 0;
  let is_safe = false;

  data.forEach((row, i) => {
    if (is_safe) safe += 1;
    let sign = 1;
    let compare = 0;
    is_safe = false;

    for (let k = 0; k < row.length; k++) {
      let del_safe = true;

      const newRow = row.filter((_, j) => j !== k);

      newRow.forEach((cell, j) => {
        if (is_safe) return true;
        if (j === 0) {
          compare = cell;
        } else {
          if (j === 1) sign = Math.sign(compare - cell);
          const new_sign = Math.sign(compare - cell);
          if (
            new_sign === 0 ||
            new_sign !== sign ||
            Math.abs(compare - cell) > 3 ||
            Math.abs(compare - cell) < 1
          ) {
            del_safe = false;
          } else {
            compare = cell;
          }
        }
      });
      if (del_safe) {
        is_safe = true;
        break;
      }
    }
  });

  console.log('Calcul partie 2 :');
  console.log(safe);
};

readDataFile();
