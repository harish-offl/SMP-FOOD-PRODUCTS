const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Annamalai\\Desktop\\PROJECT FOLDER\\SMP-FOOD-PRODUCTS\\data\\products.ts', 'utf8');

const productRegex = /(\s+id: '(\d+)',[\s\S]*?basePrice: (\d+),[\s\S]*?salePrice: (\d+),[\s\S]*?sku: '([^']+)',)([\s\S]*?)(variants: \[)([\s\S]*?)(\],\s*)/g;

const match = productRegex.exec(content);
if (match) {
  console.log('Full match length:', match[0].length);
  console.log('Group 1 end:', match[1].substring(match[1].length - 30));
  console.log('Group 6:', JSON.stringify(match[6]));
  console.log('Group 7:', JSON.stringify(match[7]));
  console.log('Group 8:', JSON.stringify(match[8]));
  console.log('Group 9:', JSON.stringify(match[9]));
  
  const newVariants = `[
      {
        id: '1-10g',
        name: 'Standard Pack',
        weight: '10g',
        packSize: 1,
        price: 6,
        salePrice: 5,
        stock: 50,
        sku: 'SMP-BM-500-10g',
      },
      {
        id: '1-500g',
        name: 'Standard Pack',
        weight: '500g',
        packSize: 1,
        price: 299,
        salePrice: 249,
        stock: 50,
        sku: 'SMP-BM-500',
      },
      {
        id: '1-2500g',
        name: 'Standard Pack',
        weight: '2500g',
        packSize: 1,
        price: 1495,
        salePrice: 1245,
        stock: 50,
        sku: 'SMP-BM-500-2500g',
      },
    ]`;
  
  const newText = match[1] + match[6] + 'variants: [' + newVariants + match[9];
  console.log('---');
  console.log('Replacement starts with:', newText.substring(0, 200));
  console.log('Replacement ends with:', newText.substring(newText.length - 100));
}
