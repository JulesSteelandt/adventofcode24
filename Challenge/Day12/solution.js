import fs from 'fs/promises';

const readDataFile = async () => {
  try {
    const rawData = await fs.readFile('./data.txt', 'utf8');
    const data = rawData.split('\n').map(line => line.split(''));

    const fieldCoord = new Map();
    data.forEach((line, i) => {
      line.forEach((cell, j) => {
        if (fieldCoord.has(cell)) {
          const coords = fieldCoord.get(cell);
          coords.push([i, j]);
          fieldCoord.set(cell, coords);
        } else {
          fieldCoord.set(cell, [[i, j]]);
        }
      });
    });

    const zones = new Map();
    const visited = new Set();

    for (const [key, value] of fieldCoord.entries()) {
      zones.set(key, []);

      value.forEach((coord) => {
        if (!visited.has(coord.toString())) {
          const zone = exploreZone(coord, value, visited);
          zones.get(key).push(zone);
        }
      });
    }

    const field = new Map();
    let i = 1;

    for (const [key, zonesList] of zones.entries()) {
      zonesList.forEach((zone, index) => {
        const uniqueKey = `${key}-${i + index}`;
        let wallCount = 0;

        const coords = fieldCoord.get(key);

        zone.forEach((coord) => {
          wallCount += checkWall(coord, coords);
        });

        field.set(uniqueKey, [
          zone.length,
          wallCount,
        ]);
      });

      i += zonesList.length;
    }

    let total = 0;
    for (const [key, value] of field.entries()) {
      total += value[0] * value[1];
    }

    console.log('Calcul partie 1 :');
    console.log(total);

  } catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error);
  }
};

const exploreZone = (coord, coords, visited) => {
  const stack = [coord];
  const zone = [];

  while (stack.length > 0) {
    const current = stack.pop();
    if (visited.has(current.toString())) continue;

    visited.add(current.toString());
    zone.push(current);

    const neighbors = [
      [current[0] - 1, current[1]],
      [current[0] + 1, current[1]],
      [current[0], current[1] - 1],
      [current[0], current[1] + 1],
    ];

    neighbors.forEach((neighbor) => {
      if (
        coords.some(c => c[0] === neighbor[0] && c[1] === neighbor[1]) &&
        !visited.has(neighbor.toString())
      ) {
        stack.push(neighbor);
      }
    });
  }

  return zone;
};

const checkWall = (coord, coords) => {
  let wall = 0;
  const exists = ([x, y]) => coords.some(c => c[0] === x && c[1] === y);

  if (!exists([coord[0] - 1, coord[1]])) wall++;
  if (!exists([coord[0] + 1, coord[1]])) wall++;
  if (!exists([coord[0], coord[1] - 1])) wall++;
  if (!exists([coord[0], coord[1] + 1])) wall++;

  return wall;
};

readDataFile();
