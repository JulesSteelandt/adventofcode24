import fs from 'fs/promises';

const readDataFile = async () => {
  try {
    const rawData = await fs.readFile('./data.txt', 'utf8');

    /// /////////////
    // P1
    /// /////////////
    const mulMatches = rawData.match(/mul\(\d+,\s*\d+\)/g);
    let sum = 0;
    if (mulMatches) {
      mulMatches.forEach((match) => {
        const [a, b] = match.match(/\d+/g).map(Number);
        sum += a * b;
      });
      console.log('Résultat de la 1ere somme de multiplication :', sum);
    } else {
      console.log('Aucune correspondance trouvée.');
    }

    /// /////////////
    // P2
    /// /////////////
    const mulMatchesDo = rawData.match(/(do\(\)|don't\(\)|mul\(\d+,\s*\d+\))/g);
    sum = 0;
    let mulEnabled = true;

    if (mulMatchesDo) {
      mulMatchesDo.forEach((instruction) => {
        if (instruction === 'do()') {
          mulEnabled = true;
        } else if (instruction === "don't()") {
          mulEnabled = false;
        } else if (mulEnabled && instruction.startsWith('mul(')) {
          const [a, b] = instruction.match(/\d+/g).map(Number);
          sum += a * b;
        }
      });
      console.log('Résultat de la somme de multiplication :', sum);
    } else {
      console.log('Aucune correspondance trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error);
  }
};

readDataFile();
