const fs = require('fs');
let content = fs.readFileSync('src/constants.ts', 'utf8');

// remove content within parens and trim spacing
content = content.replace(/\s*\([^)]*\)/g, '');

const maxIdMatch = content.match(/id:\s*'(\d+)'/g);
let maxId = 125;
if (maxIdMatch) {
  maxId = Math.max(...maxIdMatch.map(id => parseInt(id.replace(/[^\d]/g, ''))));
}

const casinos = [
  { name: 'Betpanda', category: 'Casino', url: 'https://betpanda.io' },
  { name: 'Coincasino', category: 'Casino', url: 'https://coincasino.com' },
  { name: 'Cryptorino', category: 'Casino', url: 'https://cryptorino.com' }, // using sensible defaults for urls as they were requested by name
  { name: 'BC.Game', category: 'Casino', url: 'https://bc.game' }
];

let addedString = "";
for (let c of casinos) {
  maxId++;
  addedString += `  { id: '${maxId}', name: '${c.name}', category: 'Casino', description: 'Crypto Casino.', tags: ['No KYC'], supportedAssets: ['BTC', 'ETH', 'LTC'], trustScore: 8, url: '${c.url}' },\n`;
}

content = content.replace(/\];/, addedString + '];');

fs.writeFileSync('src/constants.ts', content);
