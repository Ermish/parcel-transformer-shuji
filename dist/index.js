var e=require("path").basename,r=require("@ermish/shuji").transformMarkdownString,a=require("@parcel/diagnostic"),s=require("@parcel/plugin").Transformer,t=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0});var o=void 0;exports.default=o;var i=t(a);o=new s({transform:async function({asset:a,config:s,logger:t,resolve:o,options:n}){try{const s=await a.getCode(),o=e(a.filePath,".md");t.verbose({message:"Shuji: Converting markdown to jsx..."});const i=await r(s,o);return t.verbose({message:`Shuji: creating ${o} component...`}),[{type:"js",content:i,uniqueKey:o,filePath:"jsxFiles",sourcemap:!1,...a}]}catch(e){throw t.info({message:"Shuji: Error occurred!"}),new i.default({diagnostic:{message:e.message,filePath:a.filePath,language:a.type,stack:e.stack,name:e.name,codeFrame:{code:await a.getCode(),codeHighlights:[{start:{line:1,column:5},end:{line:2,column:3},message:"This is my error message!!!! oh noes!"}]},hints:["Try using a markdown validator to ensure your mardown files are valid."]}})}}}),exports.default=o;
//# sourceMappingURL=index.js.map
