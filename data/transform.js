const fs = require('fs');
const path = 'C:\\Users\\Annamalai\\Desktop\\PROJECT FOLDER\\SMP-FOOD-PRODUCTS\\data\\products.ts';
let content = fs.readFileSync(path, 'utf8');

// Match each product block and replace variants
// Group 1: from id to sku line
// Group 2: product id
// Group 3: basePrice
// Group 4: salePrice
// Group 5: product sku
// Group 6: content before "variants: ["
// Group 7: "variants: ["
// Group 8: old variants content
// Group 9: closing "]," and whitespace
const productRegex = /(\s+id: '(\d+)',[\s\S]*?basePrice: (\d+),[\s\S]*?salePrice: (\d+),[\s\S]*?sku: '([^']+)',)([\s\S]*?)(variants: \[)([\s\S]*?)(\],\s*)/g;

let match;
let count = 0;
const replacements = [];

while ((match = productRegex.exec(content)) !== null) {
  const productId = match[2];
  const basePrice = parseInt(match[3]);
  const salePrice = parseInt(match[4]);
  const productSku = match[5];
  const variantsBlock = match[8];
  
  // Find 500g variant SKU, or fall back to product SKU
  const variant500gMatch = variantsBlock.match(/weight: '500g'[\s\S]*?sku: '([^']+)'/);
  const sku500g = variant500gMatch ? variant500gMatch[1] : productSku;
  
  const price10g = Math.round(basePrice * 10 / 500);
  const price2500g = Math.round(basePrice * 2500 / 500);
  const salePrice10g = Math.round(salePrice * 10 / 500);
  const salePrice2500g = Math.round(salePrice * 2500 / 500);
  
  // Build variants without the final closing bracket - match[9] provides "],"
  const newVariants = `[
      {
        id: '${productId}-10g',
        name: 'Standard Pack',
        weight: '10g',
        packSize: 1,
        price: ${price10g},
        salePrice: ${salePrice10g},
        stock: 50,
        sku: '${sku500g}-10g',
      },
      {
        id: '${productId}-500g',
        name: 'Standard Pack',
        weight: '500g',
        packSize: 1,
        price: ${basePrice},
        salePrice: ${salePrice},
        stock: 50,
        sku: '${sku500g}',
      },
      {
        id: '${productId}-2500g',
        name: 'Standard Pack',
        weight: '2500g',
        packSize: 1,
        price: ${price2500g},
        salePrice: ${salePrice2500g},
        stock: 50,
        sku: '${sku500g}-2500g',
      },
    `;
  
  replacements.push({
    index: match.index,
    length: match[0].length,
    newText: match[1] + match[6] + match[7] + newVariants + match[9],
    productId: productId,
    basePrice: basePrice,
    salePrice: salePrice,
    sku500g: sku500g,
  });
  count++;
}

console.log('Found ' + count + ' products to update');

// Apply replacements in reverse order to maintain indices
for (let i = replacements.length - 1; i >= 0; i--) {
  const r = replacements[i];
  content = content.substring(0, r.index) + r.newText + content.substring(r.index + r.length);
}

fs.writeFileSync(path, content);
console.log('File updated successfully');

// Print examples
replacements.slice(0, 5).forEach(r => {
  console.log('Product ' + r.productId + ': basePrice=' + r.basePrice + ', salePrice=' + r.salePrice + ', sku500g=' + r.sku500g);
});
