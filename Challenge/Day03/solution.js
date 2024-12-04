import fs from 'fs';

try {
  const data = fs.readFileSync('data.txt', 'utf8'); 
  const jsonData = JSON.parse(data); 
  console.log(jsonData);
} catch (error) {
  console.error('Erreur lors de la lecture ou du parsing du fichier :', error);
}
pr