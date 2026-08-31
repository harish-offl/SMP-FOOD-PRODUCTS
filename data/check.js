const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Annamalai\\Desktop\\PROJECT FOLDER\\SMP-FOOD-PRODUCTS\\data\\products.ts', 'utf8');
console.log('Has double brackets:', content.includes('variants: [['));
console.log('Has old variant format:', content.includes("id: 'v1-1'"));
