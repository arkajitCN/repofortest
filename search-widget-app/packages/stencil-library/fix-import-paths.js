const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, './lib/components/stencil-generated/component.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace incorrect import path
content = content.replace(/from "stencil-library\/dist\/components\//g, 'from "../../../../stencil-library/dist/components/');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Import paths fixed.');
