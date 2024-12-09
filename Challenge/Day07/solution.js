import fs from 'fs/promises';

const readDataFile = async () => {
  try {
    const rawData = await fs.readFile('./data.txt', 'utf8');
    const lines = rawData.trim().split('\n');

    /// /////////////
    // P1
    /// /////////////
    let sum = 0;
    lines.forEach((line) => {
      const [key, values] = line.split(':');
      if (!key || !values) return;
      const testValue = Number(key.trim());
      const numbers = values.trim().split(/\s+/).map(Number);

      const combo = createCombo(numbers.length - 1);
      let equationPossible = false;
      combo.forEach((op) => {
        if (equationPossible) return;
        let result = numbers[0];
        op.forEach((operator, i) => {
          if (operator === '+') {
            result += numbers[i + 1];
          } else {
            result *= numbers[i + 1];
          }
        });
        if (result === testValue) {
          equationPossible = true;
        }
      });
      if (equationPossible) {
        sum += testValue;
        equationPossible = false;
      }
    });

    console.log(`Calcul partie 1 : ${sum}`);
    /// /////////////
    // P2
    /// /////////////
    sum = 0;
    lines.forEach((line) => {
      const [key, values] = line.split(':');
      if (!key || !values) return;
      const testValue = Number(key.trim());
      const numbers = values.trim().split(/\s+/).map(Number);

      const combo = createCombo(numbers.length - 1, true);
      let equationPossible = false;
      combo.forEach((op) => {
        if (equationPossible) return;
        let result = numbers[0];
        op.forEach((operator, i) => {
          if (operator === '+') {
            result += numbers[i + 1];
          } else if (operator === '*') {
            result *= numbers[i + 1];
          } else {
            result = Number(`${result}${numbers[i + 1]}`);
          }
        });
        if (result === testValue) {
          equationPossible = true;
        }
      });
      if (equationPossible) {
        sum += testValue;
        equationPossible = false;
      }
    });
    console.log(`Calcul partie 2 : ${sum}`);
  } catch (error) {
    console.error(
      'Erreur lors de la lecture ou du traitement du fichier :',
      error.message
    );
  }
};

readDataFile();

const createCombo = (length, p2 = false) => {
  const operators = ['+', '*'];
  if (p2) {
    operators.push('||');
  }
  const combos = [];

  const generate = (combo) => {
    if (combo.length === length) {
      combos.push([...combo]);
      return;
    }

    // Ce qui a en dessous c'est un classique que j'ai claqué
    // 2 ans j'ai pas fait d'algo j'en suis pas peu fier
    operators.forEach((op) => {
      combo.push(op);
      generate(combo);
      combo.pop();
    });
  };

  generate([]);
  return combos;
};
