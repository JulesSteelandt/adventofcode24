import fs from 'fs/promises';
const readDataFile = async () => {
  try {
    const rawData = await fs.readFile('./data.txt', 'utf8');
    const lines = rawData.split('\n');
    const data = lines.map(line => line.trim().split(/\s+/).map(Number));

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
          let new_sign = Math.sign(compare - cell);
          if (new_sign === 0 || new_sign !== sign || Math.abs(compare - cell) > 3 || Math.abs(compare - cell) < 1) {
            is_safe = false;
          }
          compare = cell;
        }
      });
    });

    console.log(safe);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error);
  }
};

readDataFile();
