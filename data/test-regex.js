const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Annamalai\\Desktop\\PROJECT FOLDER\\SMP-FOOD-PRODUCTS\\data\\products.ts', 'utf8');

const productRegex = /(\s+id: '(\d+)',[\s\S]*?basePrice: (\d+),[\s\S]*?salePrice: (\d+),[\s\S]*?sku: '([^']+)',)([\s\S]*?variants: \[)([\s\S]*?)(\],\s*)/g;

let match = productRegex.exec(content);
if (match) {
  console.log('Group 6:', JSON.stringify(match[6]));
  console.log('Group 7:', JSON.stringify(match[7].substring(0, 50)));
  console.log('Group 8:', JSON.stringify(match[8]));
}
