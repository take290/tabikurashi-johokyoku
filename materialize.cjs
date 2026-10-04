// Restore the original editable Next.js source tree from the checked-in bundle.
const fs=require('node:fs'); const path=require('node:path');
const root=__dirname; const bundle=JSON.parse(fs.readFileSync(path.join(root,'source-bundle.json'),'utf8'));
for(const [name,value] of Object.entries(bundle)) {
 const target=path.resolve(root,name);
 if(!target.startsWith(root+path.sep)||name.split('/').includes('..')) throw new Error('Invalid bundled path');
 fs.mkdirSync(path.dirname(target),{recursive:true});
 const data=value.text!==undefined?Buffer.from(value.text,'utf8'):Buffer.from(value.base64,'base64');
 if(!fs.existsSync(target)) fs.writeFileSync(target,data);
}
console.log('Next.js source tree is ready.');
