const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'products.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Match each variant array: variants: [ ... ],
// The variants array is followed by a comma and then another field
const variantArrayPattern = /variants:\s*\[[\s\S]*?\n\s*\],/g;

let match;
const replacements = [];
let productIndex = 0;

while ((match = variantArrayPattern.exec(content)) !== null) {
  const fullMatch = match[0];
  const matchIndex = match.index;
  
  // Search backwards from this match to find the product's basePrice, salePrice, and sku
  const beforeMatch = content.substring(Math.max(0, matchIndex - 500), matchIndex);
  
  const basePriceMatch = beforeMatch.match(/basePrice:\s*(\d+)/);
  const salePriceMatch = beforeMatch.match(/salePrice:\s*(\d+)/);
  const skuMatch = beforeMatch.match(/sku:\s*'([^']+)'/);
  
  if (!basePriceMatch || !salePriceMatch || !skuMatch) {
    console.log(`Warning: Could not find price/SKU for match at index ${matchIndex}`);
    continue;
  }
  
  const basePrice = parseInt(basePriceMatch[1]);
  const salePrice = parseInt(salePriceMatch[1]);
  const sku = skuMatch[1];
  
  const price10g = Math.round(basePrice * 10 / 500);
  const salePrice10g = Math.round(salePrice * 10 / 500);
  const price2500g = Math.round(basePrice * 2500 / 500);
  const salePrice2500g = Math.round(salePrice * 2500 / 500);
  
  const newVariants = `variants: [
      {
        id: '${productIndex + 1}-10g',
        name: 'Standard Pack',
        weight: '10g',
        packSize: 1,
        price: ${price10g},
        salePrice: ${salePrice10g},
        stock: 50,
        sku: '${sku}-10g',
      },
      {
        id: '${productIndex + 1}-500g',
        name: 'Standard Pack',
        weight: '500g',
        packSize: 1,
        price: ${basePrice},
        salePrice: ${salePrice},
        stock: 50,
        sku: '${sku}',
      },
      {
        id: '${productIndex + 1}-2500g',
        name: 'Standard Pack',
        weight: '2500g',
        packSize: 1,
        price: ${price2500g},
        salePrice: ${salePrice2500g},
        stock: 50,
        sku: '${sku}-2500g',
      },
    ],`;
  
  replacements.push({ index: matchIndex, length: fullMatch.length, replacement: newVariants });
  productIndex++;
}

// Apply replacements in reverse order to maintain indices
for (let i = replacements.length - 1; i >= 0; i--) {
  const { index, length, replacement } = replacements[i];
  content = content.substring(0, index) + replacement + content.substring(index + length);
}

fs.writeFileSync(filePath, content);
console.log(`Updated ${replacements.length} products with 3 variants each`);
