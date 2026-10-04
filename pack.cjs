// After editing restored sources, repack for this temporary GitHub upload workflow.
const fs=require('node:fs');const path=require('node:path');
const file=path.join(__dirname,'source-bundle.json');const bundle=JSON.parse(fs.readFileSync(file,'utf8'));
for(const [name,old] of Object.entries(bundle)) {
 const data=fs.readFileSync(path.join(__dirname,name));
 bundle[name]=old.text!==undefined?{text:data.toString('utf8')}:{base64:data.toString('base64')};
}
fs.writeFileSync(file,JSON.stringify(bundle,null,2)+'\n');
console.log('Source bundle updated. Add new paths to the bundle before packing.');
