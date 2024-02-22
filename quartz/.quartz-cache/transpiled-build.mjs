var __defProp=Object.defineProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});import sourceMapSupport from"source-map-support";import path11 from"path";import chalk from"chalk";import pretty from"pretty-time";var PerfTimer=class{static{__name(this,"PerfTimer")}evts;constructor(){this.evts={},this.addEvent("start")}addEvent(evtName){this.evts[evtName]=process.hrtime()}timeSince(evtName){return chalk.yellow(pretty(process.hrtime(this.evts[evtName??"start"])))}};import{rimraf}from"rimraf";import{isGitIgnored}from"globby";import chalk6 from"chalk";import esbuild from"esbuild";import remarkParse from"remark-parse";import remarkRehype from"remark-rehype";import{unified}from"unified";import{read}from"to-vfile";import{slug as slugAnchor}from"github-slugger";import rfdc from"rfdc";var clone=rfdc(),QUARTZ="quartz";function isRelativeURL(s){let validStart=/^\.{1,2}/.test(s),validEnding=!(s.endsWith("/index")||s==="index");return validStart&&validEnding&&![".md",".html"].includes(_getFileExtension(s)??"")}__name(isRelativeURL,"isRelativeURL");function sluggify(s){return s.split("/").map(segment=>segment.replace(/\s/g,"-").replace(/%/g,"-percent").replace(/\?/g,"-q").replace(/#/g,"")).join("/").replace(/\/$/,"")}__name(sluggify,"sluggify");function slugifyFilePath(fp,excludeExt){fp=_stripSlashes(fp);let ext=_getFileExtension(fp),withoutFileExt=fp.replace(new RegExp(ext+"$"),"");(excludeExt||[".md",".html",void 0].includes(ext))&&(ext="");let slug=sluggify(withoutFileExt);return _endsWith(slug,"_index")&&(slug=slug.replace(/_index$/,"index")),slug+ext}__name(slugifyFilePath,"slugifyFilePath");function simplifySlug(fp){let res=_stripSlashes(_trimSuffix(fp,"index"),!0);return res.length===0?"/":res}__name(simplifySlug,"simplifySlug");function transformInternalLink(link){let[fplike,anchor]=splitAnchor(decodeURI(link)),folderPath=_isFolderPath(fplike),segments=fplike.split("/").filter(x=>x.length>0),prefix=segments.filter(_isRelativeSegment).join("/"),fp=segments.filter(seg=>!_isRelativeSegment(seg)&&seg!=="").join("/"),simpleSlug=simplifySlug(slugifyFilePath(fp)),joined=joinSegments(_stripSlashes(prefix),_stripSlashes(simpleSlug)),trail=folderPath?"/":"";return _addRelativeToStart(joined)+trail+anchor}__name(transformInternalLink,"transformInternalLink");var _rebaseHastElement=__name((el,attr,curBase,newBase)=>{if(el.properties?.[attr]){if(!isRelativeURL(String(el.properties[attr])))return;let rel=joinSegments(resolveRelative(curBase,newBase),"..",el.properties[attr]);el.properties[attr]=rel}},"_rebaseHastElement");function normalizeHastElement(rawEl,curBase,newBase){let el=clone(rawEl);return _rebaseHastElement(el,"src",curBase,newBase),_rebaseHastElement(el,"href",curBase,newBase),el.children&&(el.children=el.children.map(child=>normalizeHastElement(child,curBase,newBase))),el}__name(normalizeHastElement,"normalizeHastElement");function pathToRoot(slug){let rootPath=slug.split("/").filter(x=>x!=="").slice(0,-1).map(_=>"..").join("/");return rootPath.length===0&&(rootPath="."),rootPath}__name(pathToRoot,"pathToRoot");function resolveRelative(current,target){return joinSegments(pathToRoot(current),simplifySlug(target))}__name(resolveRelative,"resolveRelative");function splitAnchor(link){let[fp,anchor]=link.split("#",2);return anchor=anchor===void 0?"":"#"+slugAnchor(anchor),[fp,anchor]}__name(splitAnchor,"splitAnchor");function slugTag(tag){return tag.split("/").map(tagSegment=>sluggify(tagSegment)).join("/")}__name(slugTag,"slugTag");function joinSegments(...args){return args.filter(segment=>segment!=="").join("/").replace(/\/\/+/g,"/")}__name(joinSegments,"joinSegments");function getAllSegmentPrefixes(tags){let segments=tags.split("/"),results=[];for(let i=0;i<segments.length;i++)results.push(segments.slice(0,i+1).join("/"));return results}__name(getAllSegmentPrefixes,"getAllSegmentPrefixes");function transformLink(src,target,opts){let targetSlug=transformInternalLink(target);if(opts.strategy==="relative")return targetSlug;{let folderTail=_isFolderPath(targetSlug)?"/":"",canonicalSlug=_stripSlashes(targetSlug.slice(1)),[targetCanonical,targetAnchor]=splitAnchor(canonicalSlug);if(opts.strategy==="shortest"){let matchingFileNames=opts.allSlugs.filter(slug=>{let fileName=slug.split("/").at(-1);return targetCanonical===fileName});if(matchingFileNames.length===1){let targetSlug2=matchingFileNames[0];return resolveRelative(src,targetSlug2)+targetAnchor}}return joinSegments(pathToRoot(src),canonicalSlug)+folderTail}}__name(transformLink,"transformLink");function _isFolderPath(fplike){return fplike.endsWith("/")||_endsWith(fplike,"index")||_endsWith(fplike,"index.md")||_endsWith(fplike,"index.html")}__name(_isFolderPath,"_isFolderPath");function _endsWith(s,suffix){return s===suffix||s.endsWith("/"+suffix)}__name(_endsWith,"_endsWith");function _trimSuffix(s,suffix){return _endsWith(s,suffix)&&(s=s.slice(0,-suffix.length)),s}__name(_trimSuffix,"_trimSuffix");function _getFileExtension(s){return s.match(/\.[A-Za-z0-9]+$/)?.[0]}__name(_getFileExtension,"_getFileExtension");function _isRelativeSegment(s){return/^\.{0,2}$/.test(s)}__name(_isRelativeSegment,"_isRelativeSegment");function _stripSlashes(s,onlyStripPrefix){return s.startsWith("/")&&(s=s.substring(1)),!onlyStripPrefix&&s.endsWith("/")&&(s=s.slice(0,-1)),s}__name(_stripSlashes,"_stripSlashes");function _addRelativeToStart(s){return s===""&&(s="."),s.startsWith(".")||(s=joinSegments(".",s)),s}__name(_addRelativeToStart,"_addRelativeToStart");import path from"path";import workerpool,{Promise as WorkerPromise}from"workerpool";import{Spinner}from"cli-spinner";var QuartzLogger=class{static{__name(this,"QuartzLogger")}verbose;spinner;constructor(verbose){this.verbose=verbose}start(text){this.verbose?console.log(text):(this.spinner=new Spinner(`%s ${text}`),this.spinner.setSpinnerString(18),this.spinner.start())}end(text){this.verbose||this.spinner.stop(!0),text&&console.log(text)}};import chalk2 from"chalk";import process2 from"process";import{isMainThread}from"workerpool";var rootFile=/.*at file:/;function trace(msg,err){let stack=err.stack??"",lines=[];lines.push(""),lines.push(`
`+chalk2.bgRed.black.bold(" ERROR ")+`

`+chalk2.red(` ${msg}`)+(err.message.length>0?`: ${err.message}`:""));let reachedEndOfLegibleTrace=!1;for(let line of stack.split(`
`).slice(1)){if(reachedEndOfLegibleTrace)break;line.includes("node_modules")||(lines.push(` ${line}`),rootFile.test(line)&&(reachedEndOfLegibleTrace=!0))}let traceMsg=lines.join(`
`);if(isMainThread)console.error(traceMsg),process2.exit(1);else throw new Error(traceMsg)}__name(trace,"trace");function createProcessor(ctx){let transformers=ctx.cfg.plugins.transformers;return unified().use(remarkParse).use(transformers.filter(p=>p.markdownPlugins).flatMap(plugin=>plugin.markdownPlugins(ctx))).use(remarkRehype,{allowDangerousHtml:!0}).use(transformers.filter(p=>p.htmlPlugins).flatMap(plugin=>plugin.htmlPlugins(ctx)))}__name(createProcessor,"createProcessor");function*chunks(arr,n){for(let i=0;i<arr.length;i+=n)yield arr.slice(i,i+n)}__name(chunks,"chunks");async function transpileWorkerScript(){return esbuild.build({entryPoints:["./quartz/worker.ts"],outfile:path.join(QUARTZ,"./.quartz-cache/transpiled-worker.mjs"),bundle:!0,keepNames:!0,platform:"node",format:"esm",packages:"external",sourcemap:!0,sourcesContent:!1,plugins:[{name:"css-and-scripts-as-text",setup(build){build.onLoad({filter:/\.scss$/},_=>({contents:"",loader:"text"})),build.onLoad({filter:/\.inline\.(ts|js)$/},_=>({contents:"",loader:"text"}))}}]})}__name(transpileWorkerScript,"transpileWorkerScript");function createFileParser(ctx,fps){let{argv,cfg}=ctx;return async processor=>{let res=[];for(let fp of fps)try{let perf=new PerfTimer,file=await read(fp);file.value=file.value.toString().trim();for(let plugin of cfg.plugins.transformers.filter(p=>p.textTransform))file.value=plugin.textTransform(ctx,file.value.toString());file.data.filePath=file.path,file.data.relativePath=path.posix.relative(argv.directory,file.path),file.data.slug=slugifyFilePath(file.data.relativePath);let ast=processor.parse(file),newAst=await processor.run(ast,file);res.push([newAst,file]),argv.verbose&&console.log(`[process] ${fp} -> ${file.data.slug} (${perf.timeSince()})`)}catch(err){trace(`
Failed to process \`${fp}\``,err)}return res}}__name(createFileParser,"createFileParser");var clamp=__name((num,min,max)=>Math.min(Math.max(Math.round(num),min),max),"clamp");async function parseMarkdown(ctx,fps){let{argv}=ctx,perf=new PerfTimer,log=new QuartzLogger(argv.verbose),CHUNK_SIZE=128,concurrency=ctx.argv.concurrency??clamp(fps.length/CHUNK_SIZE,1,4),res=[];if(log.start(`Parsing input files using ${concurrency} threads`),concurrency===1)try{let processor=createProcessor(ctx);res=await createFileParser(ctx,fps)(processor)}catch(error){throw log.end(),error}else{await transpileWorkerScript();let pool=workerpool.pool("./quartz/bootstrap-worker.mjs",{minWorkers:"max",maxWorkers:concurrency,workerType:"thread"}),childPromises=[];for(let chunk of chunks(fps,CHUNK_SIZE))childPromises.push(pool.exec("parseFiles",[argv,chunk,ctx.allSlugs]));res=(await WorkerPromise.all(childPromises).catch(err=>{let errString=err.toString().slice(6);console.error(errString),process.exit(1)})).flat(),await pool.terminate()}return log.end(`Parsed ${res.length} Markdown files in ${perf.timeSince()}`),res}__name(parseMarkdown,"parseMarkdown");function filterContent(ctx,content){let{cfg,argv}=ctx,perf=new PerfTimer,initialLength=content.length;for(let plugin of cfg.plugins.filters){let updatedContent=content.filter(item=>plugin.shouldPublish(ctx,item));if(argv.verbose){let diff=content.filter(x=>!updatedContent.includes(x));for(let file of diff)console.log(`[filter:${plugin.name}] ${file[1].data.slug}`)}content=updatedContent}return console.log(`Filtered out ${initialLength-content.length} files in ${perf.timeSince()}`),content}__name(filterContent,"filterContent");import matter from"gray-matter";import remarkFrontmatter from"remark-frontmatter";import yaml from"js-yaml";import toml from"toml";var defaultOptions={delims:"---",language:"yaml"};function coalesceAliases(data,aliases){for(let alias of aliases)if(data[alias]!==void 0&&data[alias]!==null)return data[alias]}__name(coalesceAliases,"coalesceAliases");function coerceToArray(input){if(input!=null)return Array.isArray(input)||(input=input.toString().split(",").map(tag=>tag.trim())),input.filter(tag=>typeof tag=="string"||typeof tag=="number").map(tag=>tag.toString())}__name(coerceToArray,"coerceToArray");var FrontMatter=__name(userOpts=>{let opts={...defaultOptions,...userOpts};return{name:"FrontMatter",markdownPlugins(){return[[remarkFrontmatter,["yaml","toml"]],()=>(_,file)=>{let{data}=matter(Buffer.from(file.value),{...opts,engines:{yaml:s=>yaml.load(s,{schema:yaml.JSON_SCHEMA}),toml:s=>toml.parse(s)}});data.title?data.title=data.title.toString():(data.title===null||data.title===void 0)&&(data.title=file.stem??"Untitled");let tags=coerceToArray(coalesceAliases(data,["tags","tag"]));tags&&(data.tags=[...new Set(tags.map(tag=>slugTag(tag)))]);let aliases=coerceToArray(coalesceAliases(data,["aliases","alias"]));aliases&&(data.aliases=aliases);let cssclasses=coerceToArray(coalesceAliases(data,["cssclasses","cssclass"]));cssclasses&&(data.cssclasses=cssclasses),file.data.frontmatter=data}]}}},"FrontMatter");import remarkGfm from"remark-gfm";import smartypants from"remark-smartypants";import rehypeSlug from"rehype-slug";import rehypeAutolinkHeadings from"rehype-autolink-headings";var defaultOptions2={enableSmartyPants:!0,linkHeadings:!0},GitHubFlavoredMarkdown=__name(userOpts=>{let opts={...defaultOptions2,...userOpts};return{name:"GitHubFlavoredMarkdown",markdownPlugins(){return opts.enableSmartyPants?[remarkGfm,smartypants]:[remarkGfm]},htmlPlugins(){return opts.linkHeadings?[rehypeSlug,[rehypeAutolinkHeadings,{behavior:"append",properties:{ariaHidden:!0,tabIndex:-1,"data-no-popover":!0},content:{type:"element",tagName:"svg",properties:{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},children:[{type:"element",tagName:"path",properties:{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"},children:[]},{type:"element",tagName:"path",properties:{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"},children:[]}]}}]]:[]}}},"GitHubFlavoredMarkdown");import fs from"fs";import path2 from"path";import{Repository}from"@napi-rs/simple-git";import chalk3 from"chalk";var defaultOptions3={priority:["frontmatter","git","filesystem"]};function coerceDate(fp,d){let dt=new Date(d),invalidDate=isNaN(dt.getTime())||dt.getTime()===0;return invalidDate&&d!==void 0&&console.log(chalk3.yellow(`
Warning: found invalid date "${d}" in \`${fp}\`. Supported formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format`)),invalidDate?new Date:dt}__name(coerceDate,"coerceDate");var CreatedModifiedDate=__name(userOpts=>{let opts={...defaultOptions3,...userOpts};return{name:"CreatedModifiedDate",markdownPlugins(){return[()=>{let repo;return async(_tree,file)=>{let created,modified,published,fp=file.data.filePath,fullFp=path2.isAbsolute(fp)?fp:path2.posix.join(file.cwd,fp);for(let source of opts.priority)if(source==="filesystem"){let st=await fs.promises.stat(fullFp);created||=st.birthtimeMs,modified||=st.mtimeMs}else if(source==="frontmatter"&&file.data.frontmatter)created||=file.data.frontmatter.date,modified||=file.data.frontmatter.lastmod,modified||=file.data.frontmatter.updated,modified||=file.data.frontmatter["last-modified"],published||=file.data.frontmatter.publishDate;else if(source==="git"){repo||(repo=Repository.discover(file.cwd));try{modified||=await repo.getFileLatestModifiedDateAsync(file.data.filePath)}catch{console.log(chalk3.yellow(`
Warning: ${file.data.filePath} isn't yet tracked by git, last modification date is not available for this file`))}}file.data.dates={created:coerceDate(fp,created),modified:coerceDate(fp,modified),published:coerceDate(fp,published)}}}]}}},"CreatedModifiedDate");import remarkMath from"remark-math";import rehypeKatex from"rehype-katex";import rehypeMathjax from"rehype-mathjax/svg";var Latex=__name(opts=>{let engine=opts?.renderEngine??"katex";return{name:"Latex",markdownPlugins(){return[remarkMath]},htmlPlugins(){return engine==="katex"?[[rehypeKatex,{output:"html"}]]:[rehypeMathjax]},externalResources(){return engine==="katex"?{css:["https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"],js:[{src:"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/copy-tex.min.js",loadTime:"afterDOMReady",contentType:"external"}]}:{}}}},"Latex");import{toString}from"hast-util-to-string";var escapeHTML=__name(unsafe=>unsafe.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),"escapeHTML");var defaultOptions4={descriptionLength:150},Description=__name(userOpts=>{let opts={...defaultOptions4,...userOpts};return{name:"Description",htmlPlugins(){return[()=>async(tree,file)=>{let frontMatterDescription=file.data.frontmatter?.description,text=escapeHTML(toString(tree)),sentences=(frontMatterDescription??text).replace(/\s+/g," ").split("."),finalDesc="",sentenceIdx=0,len=opts.descriptionLength;for(;finalDesc.length<len;){let sentence=sentences[sentenceIdx];if(!sentence)break;finalDesc+=sentence+".",sentenceIdx++}file.data.description=finalDesc,file.data.text=text}]}}},"Description");import path3 from"path";import{visit}from"unist-util-visit";import isAbsoluteUrl from"is-absolute-url";var defaultOptions5={markdownLinkResolution:"absolute",prettyLinks:!0,openLinksInNewTab:!1,lazyLoad:!1,externalLinkIcon:!0},CrawlLinks=__name(userOpts=>{let opts={...defaultOptions5,...userOpts};return{name:"LinkProcessing",htmlPlugins(ctx){return[()=>(tree,file)=>{let curSlug=simplifySlug(file.data.slug),outgoing=new Set,transformOptions={strategy:opts.markdownLinkResolution,allSlugs:ctx.allSlugs};visit(tree,"element",(node,_index,_parent)=>{if(node.tagName==="a"&&node.properties&&typeof node.properties.href=="string"){let dest=node.properties.href,classes=node.properties.className??[],isExternal=isAbsoluteUrl(dest);classes.push(isExternal?"external":"internal"),isExternal&&opts.externalLinkIcon&&node.children.push({type:"element",tagName:"svg",properties:{class:"external-icon",viewBox:"0 0 512 512"},children:[{type:"element",tagName:"path",properties:{d:"M320 0H288V64h32 82.7L201.4 265.4 178.7 288 224 333.3l22.6-22.6L448 109.3V192v32h64V192 32 0H480 320zM32 32H0V64 480v32H32 456h32V480 352 320H424v32 96H64V96h96 32V32H160 32z"},children:[]}]}),node.children.length===1&&node.children[0].type==="text"&&node.children[0].value!==dest&&classes.push("alias"),node.properties.className=classes,opts.openLinksInNewTab&&(node.properties.target="_blank");let isInternal=!(isAbsoluteUrl(dest)||dest.startsWith("#"));if(isInternal){dest=node.properties.href=transformLink(file.data.slug,dest,transformOptions);let canonicalDest=new URL(dest,`https://base.com/${curSlug}`).pathname,[destCanonical,_destAnchor]=splitAnchor(canonicalDest);destCanonical.endsWith("/")&&(destCanonical+="index");let full=decodeURIComponent(_stripSlashes(destCanonical,!0)),simple=simplifySlug(full);outgoing.add(simple),node.properties["data-slug"]=full}opts.prettyLinks&&isInternal&&node.children.length===1&&node.children[0].type==="text"&&!node.children[0].value.startsWith("#")&&(node.children[0].value=path3.basename(node.children[0].value))}if(["img","video","audio","iframe"].includes(node.tagName)&&node.properties&&typeof node.properties.src=="string"&&(opts.lazyLoad&&(node.properties.loading="lazy"),!isAbsoluteUrl(node.properties.src))){let dest=node.properties.src;dest=node.properties.src=transformLink(file.data.slug,dest,transformOptions),node.properties.src=dest}}),file.data.links=[...outgoing]}]}}},"CrawlLinks");import{findAndReplace as mdastFindReplace}from"mdast-util-find-and-replace";import{slug as slugAnchor2}from"github-slugger";import rehypeRaw from"rehype-raw";import{SKIP,visit as visit2}from"unist-util-visit";import path4 from"path";var callout_inline_default=`function c(){let t=this.parentElement;t.classList.toggle("is-collapsed");let l=t.classList.contains("is-collapsed")?this.scrollHeight:t.scrollHeight;t.style.maxHeight=l+"px";let o=t,e=t.parentElement;for(;e;){if(!e.classList.contains("callout"))return;let n=e.classList.contains("is-collapsed")?e.scrollHeight:e.scrollHeight+o.scrollHeight;e.style.maxHeight=n+"px",o=e,e=e.parentElement}}function i(){let t=document.getElementsByClassName("callout is-collapsible");for(let s of t){let l=s.firstElementChild;if(l){l.addEventListener("click",c),window.addCleanup(()=>l.removeEventListener("click",c));let e=s.classList.contains("is-collapsed")?l.scrollHeight:s.scrollHeight;s.style.maxHeight=e+"px"}}}document.addEventListener("nav",i);window.addEventListener("resize",i);
`;import{toHast}from"mdast-util-to-hast";import{toHtml}from"hast-util-to-html";function pluralize(count,s){return count===1?`1 ${s}`:`${count} ${s}s`}__name(pluralize,"pluralize");function capitalize(s){return s.substring(0,1).toUpperCase()+s.substring(1)}__name(capitalize,"capitalize");function classNames(displayClass,...classes){return displayClass&&classes.push(displayClass),classes.join(" ")}__name(classNames,"classNames");var defaultOptions6={comments:!0,highlight:!0,wikilinks:!0,callouts:!0,mermaid:!0,parseTags:!0,parseArrows:!0,parseBlockReferences:!0,enableInHtmlEmbed:!1,enableYouTubeEmbed:!0,enableVideoEmbed:!0},calloutMapping={note:"note",abstract:"abstract",summary:"abstract",tldr:"abstract",info:"info",todo:"todo",tip:"tip",hint:"tip",important:"tip",success:"success",check:"success",done:"success",question:"question",help:"question",faq:"question",warning:"warning",attention:"warning",caution:"warning",failure:"failure",missing:"failure",fail:"failure",danger:"danger",error:"danger",bug:"bug",example:"example",quote:"quote",cite:"quote"},arrowMapping={"->":"&rarr;","-->":"&rArr;","=>":"&rArr;","==>":"&rArr;","<-":"&larr;","<--":"&lArr;","<=":"&lArr;","<==":"&lArr;"};function canonicalizeCallout(calloutName){let normalizedCallout=calloutName.toLowerCase();return calloutMapping[normalizedCallout]??calloutName}__name(canonicalizeCallout,"canonicalizeCallout");var externalLinkRegex=/^https?:\/\//i,arrowRegex=new RegExp(/(-{1,2}>|={1,2}>|<-{1,2}|<={1,2})/,"g"),wikilinkRegex=new RegExp(/!?\[\[([^\[\]\|\#]+)?(#+[^\[\]\|\#]+)?(\|[^\[\]\#]+)?\]\]/,"g"),highlightRegex=new RegExp(/==([^=]+)==/,"g"),commentRegex=new RegExp(/%%[\s\S]*?%%/,"g"),calloutRegex=new RegExp(/^\[\!(\w+)\]([+-]?)/),calloutLineRegex=new RegExp(/^> *\[\!\w+\][+-]?.*$/,"gm"),tagRegex=new RegExp(/(?:^| )#((?:[-_\p{L}\p{Emoji}\d])+(?:\/[-_\p{L}\p{Emoji}\d]+)*)/,"gu"),blockReferenceRegex=new RegExp(/\^([-_A-Za-z0-9]+)$/,"g"),ytLinkRegex=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,videoExtensionRegex=new RegExp(/\.(mp4|webm|ogg|avi|mov|flv|wmv|mkv|mpg|mpeg|3gp|m4v)$/),wikilinkImageEmbedRegex=new RegExp(/^(?<alt>(?!^\d*x?\d*$).*?)?(\|?\s*?(?<width>\d+)(x(?<height>\d+))?)?$/),ObsidianFlavoredMarkdown=__name(userOpts=>{let opts={...defaultOptions6,...userOpts},mdastToHtml=__name(ast=>{let hast=toHast(ast,{allowDangerousHtml:!0});return toHtml(hast,{allowDangerousHtml:!0})},"mdastToHtml");return{name:"ObsidianFlavoredMarkdown",textTransform(_ctx,src){return opts.comments&&(src instanceof Buffer&&(src=src.toString()),src=src.replace(commentRegex,"")),opts.callouts&&(src instanceof Buffer&&(src=src.toString()),src=src.replace(calloutLineRegex,value=>value+`
> `)),opts.wikilinks&&(src instanceof Buffer&&(src=src.toString()),src=src.replace(wikilinkRegex,(value,...capture)=>{let[rawFp,rawHeader,rawAlias]=capture,fp=rawFp??"",anchor=rawHeader?.trim().replace(/^#+/,""),blockRef=anchor?.startsWith("^")?"^":"",displayAnchor=anchor?`#${blockRef}${slugAnchor2(anchor)}`:"",displayAlias=rawAlias??rawHeader?.replace("#","|")??"",embedDisplay=value.startsWith("!")?"!":"";return rawFp?.match(externalLinkRegex)?`${embedDisplay}[${displayAlias.replace(/^\|/,"")}](${rawFp})`:`${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`})),src},markdownPlugins(){let plugins=[];return plugins.push(()=>(tree,file)=>{let replacements=[],base=pathToRoot(file.data.slug);opts.wikilinks&&replacements.push([wikilinkRegex,(value,...capture)=>{let[rawFp,rawHeader,rawAlias]=capture,fp=rawFp?.trim()??"",anchor=rawHeader?.trim()??"",alias=rawAlias?.slice(1).trim();if(value.startsWith("!")){let ext=path4.extname(fp).toLowerCase(),url2=slugifyFilePath(fp);if([".png",".jpg",".jpeg",".gif",".bmp",".svg",".webp"].includes(ext)){let match=wikilinkImageEmbedRegex.exec(alias??""),alt=match?.groups?.alt??"",width=match?.groups?.width??"auto",height=match?.groups?.height??"auto";return{type:"image",url:url2,data:{hProperties:{width,height,alt}}}}else{if([".mp4",".webm",".ogv",".mov",".mkv"].includes(ext))return{type:"html",value:`<video src="${url2}" controls></video>`};if([".mp3",".webm",".wav",".m4a",".ogg",".3gp",".flac"].includes(ext))return{type:"html",value:`<audio src="${url2}" controls></audio>`};if([".pdf"].includes(ext))return{type:"html",value:`<iframe src="${url2}"></iframe>`};{let block=anchor;return{type:"html",data:{hProperties:{transclude:!0}},value:`<blockquote class="transclude" data-url="${url2}" data-block="${block}"><a href="${url2+anchor}" class="transclude-inner">Transclude of ${url2}${block}</a></blockquote>`}}}}return{type:"link",url:fp+anchor,children:[{type:"text",value:alias??fp}]}}]),opts.highlight&&replacements.push([highlightRegex,(_value,...capture)=>{let[inner]=capture;return{type:"html",value:`<span class="text-highlight">${inner}</span>`}}]),opts.parseArrows&&replacements.push([arrowRegex,(value,..._capture)=>{let maybeArrow=arrowMapping[value];return maybeArrow===void 0?SKIP:{type:"html",value:`<span>${maybeArrow}</span>`}}]),opts.parseTags&&replacements.push([tagRegex,(_value,tag)=>{if(/^\d+$/.test(tag))return!1;if(tag=slugTag(tag),file.data.frontmatter){let noteTags=file.data.frontmatter.tags??[];file.data.frontmatter.tags=[...new Set([...noteTags,tag])]}return{type:"link",url:base+`/tags/${tag}`,data:{hProperties:{className:["tag-link"]}},children:[{type:"text",value:`#${tag}`}]}}]),opts.enableInHtmlEmbed&&visit2(tree,"html",node=>{for(let[regex,replace]of replacements)typeof replace=="string"?node.value=node.value.replace(regex,replace):node.value=node.value.replace(regex,(substring,...args)=>{let replaceValue=replace(substring,...args);return typeof replaceValue=="string"?replaceValue:Array.isArray(replaceValue)?replaceValue.map(mdastToHtml).join(""):typeof replaceValue=="object"&&replaceValue!==null?mdastToHtml(replaceValue):substring})}),mdastFindReplace(tree,replacements)}),opts.enableVideoEmbed&&plugins.push(()=>(tree,_file)=>{visit2(tree,"image",(node,index,parent)=>{if(parent&&index!=null&&videoExtensionRegex.test(node.url)){let newNode={type:"html",value:`<video controls src="${node.url}"></video>`};return parent.children.splice(index,1,newNode),SKIP}})}),opts.callouts&&plugins.push(()=>(tree,_file)=>{visit2(tree,"blockquote",node=>{if(node.children.length===0)return;let firstChild=node.children[0];if(firstChild.type!=="paragraph"||firstChild.children[0]?.type!=="text")return;let text=firstChild.children[0].value,restOfTitle=firstChild.children.slice(1),[firstLine,...remainingLines]=text.split(`
`),remainingText=remainingLines.join(`
`),match=firstLine.match(calloutRegex);if(match&&match.input){let[calloutDirective,typeString,collapseChar]=match,calloutType=canonicalizeCallout(typeString.toLowerCase()),collapse=collapseChar==="+"||collapseChar==="-",defaultState=collapseChar==="-"?"collapsed":"expanded",titleContent=match.input.slice(calloutDirective.length).trim(),titleNode={type:"paragraph",children:[{type:"text",value:titleContent===""&&restOfTitle.length===0?capitalize(calloutType):titleContent+" "},...restOfTitle]},blockquoteContent=[{type:"html",value:`<div
                  class="callout-title"
                >
                  <div class="callout-icon"></div>
                  <div class="callout-title-inner">${mdastToHtml(titleNode)}</div>
                  ${collapse?'<div class="fold-callout-icon"></div>':""}
                </div>`}];remainingText.length>0&&blockquoteContent.push({type:"paragraph",children:[{type:"text",value:remainingText}]}),node.children.splice(0,1,...blockquoteContent),node.data={hProperties:{...node.data?.hProperties??{},className:`callout ${calloutType} ${collapse?"is-collapsible":""} ${defaultState==="collapsed"?"is-collapsed":""}`,"data-callout":calloutType,"data-callout-fold":collapse}}}})}),opts.mermaid&&plugins.push(()=>(tree,_file)=>{visit2(tree,"code",node=>{node.lang==="mermaid"&&(node.data={hProperties:{className:["mermaid"]}})})}),plugins},htmlPlugins(){let plugins=[rehypeRaw];return opts.parseBlockReferences&&plugins.push(()=>{let inlineTagTypes=new Set(["p","li"]),blockTagTypes=new Set(["blockquote"]);return(tree,file)=>{file.data.blocks={},visit2(tree,"element",(node,index,parent)=>{if(blockTagTypes.has(node.tagName)){let nextChild=parent?.children.at(index+2);if(nextChild&&nextChild.tagName==="p"){let text=nextChild.children.at(0);if(text&&text.value&&text.type==="text"){let matches=text.value.match(blockReferenceRegex);if(matches&&matches.length>=1){parent.children.splice(index+2,1);let block=matches[0].slice(1);Object.keys(file.data.blocks).includes(block)||(node.properties={...node.properties,id:block},file.data.blocks[block]=node)}}}}else if(inlineTagTypes.has(node.tagName)){let last=node.children.at(-1);if(last&&last.value&&typeof last.value=="string"){let matches=last.value.match(blockReferenceRegex);if(matches&&matches.length>=1){last.value=last.value.slice(0,-matches[0].length);let block=matches[0].slice(1);Object.keys(file.data.blocks).includes(block)||(node.properties={...node.properties,id:block},file.data.blocks[block]=node)}}}}),file.data.htmlAst=tree}}),opts.enableYouTubeEmbed&&plugins.push(()=>tree=>{visit2(tree,"element",node=>{if(node.tagName==="img"&&typeof node.properties.src=="string"){let match=node.properties.src.match(ytLinkRegex),videoId=match&&match[2].length==11?match[2]:null;videoId&&(node.tagName="iframe",node.properties={class:"external-embed",allow:"fullscreen",frameborder:0,width:"600px",height:"350px",src:`https://www.youtube.com/embed/${videoId}`})}})}),plugins},externalResources(){let js=[];return opts.callouts&&js.push({script:callout_inline_default,loadTime:"afterDOMReady",contentType:"inline"}),opts.mermaid&&js.push({script:`
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs';
          const darkMode = document.documentElement.getAttribute('saved-theme') === 'dark'
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: darkMode ? 'dark' : 'default'
          });
          document.addEventListener('nav', async () => {
            await mermaid.run({
              querySelector: '.mermaid'
            })
          });
          `,loadTime:"afterDOMReady",moduleType:"module",contentType:"inline"}),{js}}}},"ObsidianFlavoredMarkdown");var relrefRegex=new RegExp(/\[([^\]]+)\]\(\{\{< relref "([^"]+)" >\}\}\)/,"g"),predefinedHeadingIdRegex=new RegExp(/(.*) {#(?:.*)}/,"g"),hugoShortcodeRegex=new RegExp(/{{(.*)}}/,"g"),figureTagRegex=new RegExp(/< ?figure src="(.*)" ?>/,"g"),inlineLatexRegex=new RegExp(/\\\\\((.+?)\\\\\)/,"g"),blockLatexRegex=new RegExp(/(?:\\begin{equation}|\\\\\(|\\\\\[)([\s\S]*?)(?:\\\\\]|\\\\\)|\\end{equation})/,"g"),quartzLatexRegex=new RegExp(/\$\$[\s\S]*?\$\$|\$.*?\$/,"g");import rehypePrettyCode from"rehype-pretty-code";var SyntaxHighlighting=__name(()=>({name:"SyntaxHighlighting",htmlPlugins(){return[[rehypePrettyCode,{keepBackground:!1,theme:{dark:"github-dark",light:"github-light"}}]]}}),"SyntaxHighlighting");import{visit as visit3}from"unist-util-visit";import{toString as toString2}from"mdast-util-to-string";import Slugger from"github-slugger";var defaultOptions7={maxDepth:3,minEntries:1,showByDefault:!0,collapseByDefault:!1},regexMdLinks=new RegExp(/\[([^\[]+)\](\(.*\))/,"g"),slugAnchor3=new Slugger,TableOfContents=__name(userOpts=>{let opts={...defaultOptions7,...userOpts};return{name:"TableOfContents",markdownPlugins(){return[()=>async(tree,file)=>{if(file.data.frontmatter?.enableToc??opts.showByDefault){slugAnchor3.reset();let toc=[],highestDepth=opts.maxDepth;visit3(tree,"heading",node=>{if(node.depth<=opts.maxDepth){let text=toString2(node);text=text.replace(wikilinkRegex,(_,rawFp,__,rawAlias)=>{let fp=rawFp?.trim()??"";return rawAlias?.slice(1).trim()??fp}),text=text.replace(regexMdLinks,"$1"),highestDepth=Math.min(highestDepth,node.depth),toc.push({depth:node.depth,text,slug:slugAnchor3.slug(text)})}}),toc.length>opts.minEntries&&(file.data.toc=toc.map(entry=>({...entry,depth:entry.depth-highestDepth})),file.data.collapseToc=opts.collapseByDefault)}}]}}},"TableOfContents");import remarkBreaks from"remark-breaks";var RemoveDrafts=__name(()=>({name:"RemoveDrafts",shouldPublish(_ctx,[_tree,vfile]){return!(vfile.data?.frontmatter?.draft??!1)}}),"RemoveDrafts");import{jsx}from"preact/jsx-runtime";function Header({children}){return children.length>0?jsx("header",{children}):null}__name(Header,"Header");Header.css=`
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  flex: auto;
}
`;var Header_default=__name(()=>Header,"default");var clipboard_inline_default=`var r='<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>',l='<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';document.addEventListener("nav",()=>{let n=document.getElementsByTagName("pre");for(let t=0;t<n.length;t++){let o=n[t].getElementsByTagName("code")[0];if(o){let a=function(){navigator.clipboard.writeText(i).then(()=>{e.blur(),e.innerHTML=l,setTimeout(()=>{e.innerHTML=r,e.style.borderColor=""},2e3)},d=>console.error(d))};var c=a;let i=o.innerText.replace(/\\n\\n/g,\`
\`),e=document.createElement("button");e.className="clipboard-button",e.type="button",e.innerHTML=r,e.ariaLabel="Copy source",e.addEventListener("click",a),window.addCleanup(()=>e.removeEventListener("click",a)),n[t].prepend(e)}}});
`;var clipboard_default=`.clipboard-button {
  position: absolute;
  display: flex;
  float: right;
  right: 0;
  padding: 0.4rem;
  margin: 0.3rem;
  color: var(--gray);
  border-color: var(--dark);
  background-color: var(--light);
  border: 1px solid;
  border-radius: 5px;
  opacity: 0;
  transition: 0.2s;
}
.clipboard-button > svg {
  fill: var(--light);
  filter: contrast(0.3);
}
.clipboard-button:hover {
  cursor: pointer;
  border-color: var(--secondary);
}
.clipboard-button:focus {
  outline: 0;
}

pre:hover > .clipboard-button {
  opacity: 1;
  transition: 0.2s;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiY2xpcGJvYXJkLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBOztBQUdGO0VBQ0U7OztBQUtGO0VBQ0U7RUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi5jbGlwYm9hcmQtYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbG9hdDogcmlnaHQ7XG4gIHJpZ2h0OiAwO1xuICBwYWRkaW5nOiAwLjRyZW07XG4gIG1hcmdpbjogMC4zcmVtO1xuICBjb2xvcjogdmFyKC0tZ3JheSk7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZGFyayk7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcbiAgYm9yZGVyOiAxcHggc29saWQ7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogMC4ycztcblxuICAmID4gc3ZnIHtcbiAgICBmaWxsOiB2YXIoLS1saWdodCk7XG4gICAgZmlsdGVyOiBjb250cmFzdCgwLjMpO1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgfVxuXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IDA7XG4gIH1cbn1cblxucHJlIHtcbiAgJjpob3ZlciA+IC5jbGlwYm9hcmQtYnV0dG9uIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zaXRpb246IDAuMnM7XG4gIH1cbn1cbiJdfQ== */`;import{jsx as jsx2}from"preact/jsx-runtime";function Body({children}){return jsx2("div",{id:"quartz-body",children})}__name(Body,"Body");Body.afterDOMLoaded=clipboard_inline_default;Body.css=clipboard_default;var Body_default=__name(()=>Body,"default");import{render}from"preact-render-to-string";import{randomUUID}from"crypto";import{jsx as jsx3}from"preact/jsx-runtime";function JSResourceToScriptElement(resource,preserve){let scriptType=resource.moduleType??"application/javascript",spaPreserve=preserve??resource.spaPreserve;if(resource.contentType==="external")return jsx3("script",{src:resource.src,type:scriptType,"spa-preserve":spaPreserve},resource.src);{let content=resource.script;return jsx3("script",{type:scriptType,"spa-preserve":spaPreserve,dangerouslySetInnerHTML:{__html:content}},randomUUID())}}__name(JSResourceToScriptElement,"JSResourceToScriptElement");import{visit as visit4}from"unist-util-visit";import{jsx as jsx4,jsxs}from"preact/jsx-runtime";function pageResources(baseDir,staticResources){let contentIndexScript=`const fetchData = fetch("${joinSegments(baseDir,"static/contentIndex.json")}").then(data => data.json())`;return{css:[joinSegments(baseDir,"index.css"),...staticResources.css],js:[{src:joinSegments(baseDir,"prescript.js"),loadTime:"beforeDOMReady",contentType:"external"},{loadTime:"beforeDOMReady",contentType:"inline",spaPreserve:!0,script:contentIndexScript},...staticResources.js,{src:joinSegments(baseDir,"postscript.js"),loadTime:"afterDOMReady",moduleType:"module",contentType:"external"}]}}__name(pageResources,"pageResources");var pageIndex;function getOrComputeFileIndex(allFiles){if(!pageIndex){pageIndex=new Map;for(let file of allFiles)pageIndex.set(file.slug,file)}return pageIndex}__name(getOrComputeFileIndex,"getOrComputeFileIndex");function renderPage(slug,componentData,components,pageResources2){visit4(componentData.tree,"element",(node,_index,_parent)=>{if(node.tagName==="blockquote"&&(node.properties?.className??[]).includes("transclude")){let inner=node.children[0],transcludeTarget=inner.properties["data-slug"],page=getOrComputeFileIndex(componentData.allFiles).get(transcludeTarget);if(!page)return;let blockRef=node.properties.dataBlock;if(blockRef?.startsWith("#^")){blockRef=blockRef.slice(2);let blockNode=page.blocks?.[blockRef];blockNode&&(blockNode.tagName==="li"&&(blockNode={type:"element",tagName:"ul",properties:{},children:[blockNode]}),node.children=[normalizeHastElement(blockNode,slug,transcludeTarget),{type:"element",tagName:"a",properties:{href:inner.properties?.href,class:["internal"]},children:[{type:"text",value:"Link to original"}]}])}else if(blockRef?.startsWith("#")&&page.htmlAst){blockRef=blockRef.slice(1);let startIdx,endIdx;for(let[i,el]of page.htmlAst.children.entries())if(el.type==="element"&&el.tagName.match(/h[1-6]/)){if(endIdx)break;startIdx!==void 0?endIdx=i:el.properties?.id===blockRef&&(startIdx=i)}if(startIdx===void 0)return;node.children=[...page.htmlAst.children.slice(startIdx,endIdx).map(child=>normalizeHastElement(child,slug,transcludeTarget)),{type:"element",tagName:"a",properties:{href:inner.properties?.href,class:["internal"]},children:[{type:"text",value:"Link to original"}]}]}else page.htmlAst&&(node.children=[{type:"element",tagName:"h1",properties:{},children:[{type:"text",value:page.frontmatter?.title??`Transclude of ${page.slug}`}]},...page.htmlAst.children.map(child=>normalizeHastElement(child,slug,transcludeTarget)),{type:"element",tagName:"a",properties:{href:inner.properties?.href,class:["internal"]},children:[{type:"text",value:"Link to original"}]}])}});let{head:Head,header,beforeBody,pageBody:Content2,left,right,footer:Footer}=components,Header2=Header_default(),Body2=Body_default(),LeftComponent=jsx4("div",{class:"left sidebar",children:left.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))}),RightComponent=jsx4("div",{class:"right sidebar",children:right.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))}),doc=jsxs("html",{children:[jsx4(Head,{...componentData}),jsx4("body",{"data-slug":slug,children:jsxs("div",{id:"quartz-root",class:"page",children:[jsxs(Body2,{...componentData,children:[LeftComponent,jsxs("div",{class:"center",children:[jsxs("div",{class:"page-header",children:[jsx4(Header2,{...componentData,children:header.map(HeaderComponent=>jsx4(HeaderComponent,{...componentData}))}),jsx4("div",{class:"popover-hint",children:beforeBody.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))})]}),jsx4(Content2,{...componentData})]}),RightComponent]}),jsx4(Footer,{...componentData})]})}),pageResources2.js.filter(resource=>resource.loadTime==="afterDOMReady").map(res=>JSResourceToScriptElement(res))]});return`<!DOCTYPE html>
`+render(doc)}__name(renderPage,"renderPage");import{toJsxRuntime}from"hast-util-to-jsx-runtime";import{Fragment,jsx as jsx5,jsxs as jsxs2}from"preact/jsx-runtime";import{jsx as jsx6}from"preact/jsx-runtime";var customComponents={table:props=>jsx6("div",{class:"table-container",children:jsx6("table",{...props})})};function htmlToJsx(fp,tree){try{return toJsxRuntime(tree,{Fragment,jsx:jsx5,jsxs:jsxs2,elementAttributeNameCase:"html",components:customComponents})}catch(e){trace(`Failed to parse Markdown in \`${fp}\` into JSX`,e)}}__name(htmlToJsx,"htmlToJsx");import{jsx as jsx7}from"preact/jsx-runtime";function Content({fileData,tree}){let content=htmlToJsx(fileData.filePath,tree),classString=["popover-hint",...fileData.frontmatter?.cssclasses??[]].join(" ");return jsx7("article",{class:classString,children:content})}__name(Content,"Content");var Content_default=__name(()=>Content,"default");var listPage_default=`ul.section-ul {
  list-style: none;
  margin-top: 2em;
  padding-left: 0;
}

li.section-li {
  margin-bottom: 1em;
}
li.section-li > .section {
  display: grid;
  grid-template-columns: 6em 3fr 1fr;
}
@media all and (max-width: 600px) {
  li.section-li > .section > .tags {
    display: none;
  }
}
li.section-li > .section > .desc > h3 > a {
  background-color: transparent;
}
li.section-li > .section > .meta {
  margin: 0;
  flex-basis: 6em;
  opacity: 0.6;
}

.popover .section {
  grid-template-columns: 6em 1fr !important;
}
.popover .section > .tags {
  display: none;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsibGlzdFBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFO0VBQ0E7RUFDQTs7O0FBR0Y7RUFDRTs7QUFFQTtFQUNFO0VBQ0E7O0FBRUE7RUFDRTtJQUNFOzs7QUFJSjtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBOzs7QUFNTjtFQUNFOztBQUNBO0VBQ0UiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlIFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcblxudWwuc2VjdGlvbi11bCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbi10b3A6IDJlbTtcbiAgcGFkZGluZy1sZWZ0OiAwO1xufVxuXG5saS5zZWN0aW9uLWxpIHtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xuXG4gICYgPiAuc2VjdGlvbiB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDZlbSAzZnIgMWZyO1xuXG4gICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJG1vYmlsZUJyZWFrcG9pbnQpIHtcbiAgICAgICYgPiAudGFncyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJiA+IC5kZXNjID4gaDMgPiBhIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cblxuICAgICYgPiAubWV0YSB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBmbGV4LWJhc2lzOiA2ZW07XG4gICAgICBvcGFjaXR5OiAwLjY7XG4gICAgfVxuICB9XG59XG5cbi8vIG1vZGlmaWNhdGlvbnMgaW4gcG9wb3ZlciBjb250ZXh0XG4ucG9wb3ZlciAuc2VjdGlvbiB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNmVtIDFmciAhaW1wb3J0YW50O1xuICAmID4gLnRhZ3Mge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cbiJdfQ== */`;import{Fragment as Fragment2,jsx as jsx8}from"preact/jsx-runtime";function getDate(cfg,data){if(!cfg.defaultDateType)throw new Error("Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.");return data.dates?.[cfg.defaultDateType]}__name(getDate,"getDate");function formatDate(d,locale="en-US"){return d.toLocaleDateString(locale,{year:"numeric",month:"short",day:"2-digit"})}__name(formatDate,"formatDate");function Date2({date,locale}){return jsx8(Fragment2,{children:formatDate(date,locale)})}__name(Date2,"Date");import{jsx as jsx9,jsxs as jsxs3}from"preact/jsx-runtime";function byDateAndAlphabetical(cfg){return(f1,f2)=>{if(f1.dates&&f2.dates)return getDate(cfg,f2).getTime()-getDate(cfg,f1).getTime();if(f1.dates&&!f2.dates)return-1;if(!f1.dates&&f2.dates)return 1;let f1Title=f1.frontmatter?.title.toLowerCase()??"",f2Title=f2.frontmatter?.title.toLowerCase()??"";return f1Title.localeCompare(f2Title)}}__name(byDateAndAlphabetical,"byDateAndAlphabetical");function PageList({cfg,fileData,allFiles,limit}){let list=allFiles.sort(byDateAndAlphabetical(cfg));return limit&&(list=list.slice(0,limit)),jsx9("ul",{class:"section-ul",children:list.map(page=>{let title=page.frontmatter?.title,tags=page.frontmatter?.tags??[];return jsx9("li",{class:"section-li",children:jsxs3("div",{class:"section",children:[page.dates&&jsx9("p",{class:"meta",children:jsx9(Date2,{date:getDate(cfg,page),locale:cfg.locale})}),jsx9("div",{class:"desc",children:jsx9("h3",{children:jsx9("a",{href:resolveRelative(fileData.slug,page.slug),class:"internal",children:title})})}),jsx9("ul",{class:"tags",children:tags.map(tag=>jsx9("li",{children:jsxs3("a",{class:"internal tag-link",href:resolveRelative(fileData.slug,`tags/${tag}`),children:["#",tag]})}))})]})})})})}__name(PageList,"PageList");PageList.css=`
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`;var en_default={"404":"Either this page is private or doesn't exist.",backlinks:{backlinks:"Backlinks",noBlacklinksFound:"No backlinks found"},common:{item:"item"},darkmode:{lightMode:"Light mode"},folderContent:{underThisFolder:"under this folder"},footer:{createdWith:"Created with"},graph:{graphView:"Graph View"},head:{noDescriptionProvided:"No description provided",untitled:"Untitled"},recentNotes:{seeRemainingMore:"See {{remaining}} more"},search:"Search",tableOfContent:"Table of Contents",tagContent:{showingFirst:"Showing first",totalTags:"total tags",withThisTag:"with this tag",found:"Found"}};var fr_default={"404":"Soit cette page est priv\xE9e, soit elle n'existe pas.",backlinks:{backlinks:"R\xE9troliens",noBlacklinksFound:"Aucun r\xE9trolien trouv\xE9"},common:{item:"fichier"},darkmode:{darkmode:"Th\xE8me sombre",lightMode:"Th\xE8me clair"},folderContent:{underThisFolder:"dans ce dossier"},footer:{createdWith:"Cr\xE9\xE9 avec"},graph:{graphView:"Vue Graphique"},head:{noDescriptionProvided:"Aucune description n'a \xE9t\xE9 fournie",untitled:"Sans titre"},recentNotes:{seeRemainingMore:"Voir {{remaining}} plus"},search:"Rechercher",tableOfContent:"Table des Mati\xE8res",tagContent:{showingFirst:"Afficher en premier",totalTags:"tags totaux",withThisTag:"avec ce tag",found:"Trouv\xE9"}};var TRANSLATION={"en-US":en_default,"fr-FR":fr_default},i18n=__name((lang="en-US",key,options2)=>{let locale=Object.keys(TRANSLATION).find(key2=>key2.toLowerCase()===lang.toLowerCase()||key2.toLowerCase().includes(lang.toLowerCase()))??"en-US",getTranslation=__name(key2=>{let keys=key2.split("."),translationString=TRANSLATION[locale];return keys.forEach(key3=>{translationString=translationString[key3]}),translationString},"getTranslation");if(options2){let translationString=getTranslation(key).toString();return Object.keys(options2).forEach(key2=>{translationString=translationString.replace(`{{${key2}}}`,options2[key2])}),translationString}return getTranslation(key).toString()},"i18n");import{jsx as jsx10,jsxs as jsxs4}from"preact/jsx-runtime";var numPages=10;function TagContent(props){let{tree,fileData,allFiles,cfg}=props,slug=fileData.slug;if(!(slug?.startsWith("tags/")||slug==="tags"))throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`);let tag=simplifySlug(slug.slice(5)),allPagesWithTag=__name(tag2=>allFiles.filter(file=>(file.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes).includes(tag2)),"allPagesWithTag"),content=tree.children.length===0?fileData.description:htmlToJsx(fileData.filePath,tree),classes=["popover-hint",...fileData.frontmatter?.cssclasses??[]].join(" ");if(tag==="/"){let tags=[...new Set(allFiles.flatMap(data=>data.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes))].sort((a,b)=>a.localeCompare(b)),tagItemMap=new Map;for(let tag2 of tags)tagItemMap.set(tag2,allPagesWithTag(tag2));return jsxs4("div",{class:classes,children:[jsx10("article",{children:jsx10("p",{children:content})}),jsxs4("p",{children:[i18n(cfg.locale,"tagContent.found")," ",tags.length," ",i18n(cfg.locale,"tagContent.totalTags"),"."]}),jsx10("div",{children:tags.map(tag2=>{let pages=tagItemMap.get(tag2),listProps={...props,allFiles:pages},content2=allFiles.filter(file=>file.slug===`tags/${tag2}`)[0]?.description;return jsxs4("div",{children:[jsx10("h2",{children:jsxs4("a",{class:"internal tag-link",href:`../tags/${tag2}`,children:["#",tag2]})}),content2&&jsx10("p",{children:content2}),jsxs4("div",{class:"page-listing",children:[jsxs4("p",{children:[pluralize(pages.length,i18n(cfg.locale,"common.item"))," ",i18n(cfg.locale,"tagContent.withThisTag"),"."," ",pages.length>numPages&&`${i18n(cfg.locale,"tagContent.showingFirst")} ${numPages}.`]}),jsx10(PageList,{limit:numPages,...listProps})]})]})})})]})}else{let pages=allPagesWithTag(tag),listProps={...props,allFiles:pages};return jsxs4("div",{class:classes,children:[jsx10("article",{children:content}),jsxs4("div",{class:"page-listing",children:[jsxs4("p",{children:[pluralize(pages.length,i18n(cfg.locale,"common.item"))," ",i18n(cfg.locale,"tagContent.withThisTag"),"."]}),jsx10("div",{children:jsx10(PageList,{...listProps})})]})]})}}__name(TagContent,"TagContent");TagContent.css=listPage_default+PageList.css;var TagContent_default=__name(()=>TagContent,"default");import path5 from"path";import{jsx as jsx11,jsxs as jsxs5}from"preact/jsx-runtime";var defaultOptions8={showFolderCount:!0},FolderContent_default=__name(opts=>{let options2={...defaultOptions8,...opts};function FolderContent(props){let{tree,fileData,allFiles,cfg}=props,folderSlug=_stripSlashes(simplifySlug(fileData.slug)),allPagesInFolder=allFiles.filter(file=>{let fileSlug=_stripSlashes(simplifySlug(file.slug)),prefixed=fileSlug.startsWith(folderSlug)&&fileSlug!==folderSlug,folderParts=folderSlug.split(path5.posix.sep),isDirectChild=fileSlug.split(path5.posix.sep).length===folderParts.length+1;return prefixed&&isDirectChild}),classes=["popover-hint",...fileData.frontmatter?.cssclasses??[]].join(" "),listProps={...props,allFiles:allPagesInFolder},content=tree.children.length===0?fileData.description:htmlToJsx(fileData.filePath,tree);return jsxs5("div",{class:classes,children:[jsx11("article",{children:jsx11("p",{children:content})}),jsxs5("div",{class:"page-listing",children:[options2.showFolderCount&&jsxs5("p",{children:[pluralize(allPagesInFolder.length,i18n(cfg.locale,"common.item"))," ",i18n(cfg.locale,"folderContent.underThisFolder"),"."]}),jsx11("div",{children:jsx11(PageList,{...listProps})})]})]})}return __name(FolderContent,"FolderContent"),FolderContent.css=listPage_default+PageList.css,FolderContent},"default");import{jsx as jsx12,jsxs as jsxs6}from"preact/jsx-runtime";function NotFound({cfg}){return jsxs6("article",{class:"popover-hint",children:[jsx12("h1",{children:"404"}),jsx12("p",{children:i18n(cfg.locale,"404")})]})}__name(NotFound,"NotFound");var __default=__name(()=>NotFound,"default");import{jsx as jsx13}from"preact/jsx-runtime";function ArticleTitle({fileData,displayClass}){let title=fileData.frontmatter?.title;return title?jsx13("h1",{class:classNames(displayClass,"article-title"),children:title}):null}__name(ArticleTitle,"ArticleTitle");ArticleTitle.css=`
.article-title {
  margin: 2rem 0 0 0;
}
`;var ArticleTitle_default=__name(()=>ArticleTitle,"default");var darkmode_inline_default=`var h=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark",o=localStorage.getItem("theme")??h;document.documentElement.setAttribute("saved-theme",o);var d=t=>{let n=new CustomEvent("themechange",{detail:{theme:t}});document.dispatchEvent(n)};document.addEventListener("nav",()=>{let t=a=>{let e=a.target?.checked?"dark":"light";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),d(e)},n=a=>{let e=a.matches?"dark":"light";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),c.checked=a.matches,d(e)},c=document.querySelector("#darkmode-toggle");c.addEventListener("change",t),window.addCleanup(()=>c.removeEventListener("change",t)),o==="dark"&&(c.checked=!0);let m=window.matchMedia("(prefers-color-scheme: dark)");m.addEventListener("change",n),window.addCleanup(()=>m.removeEventListener("change",n))});
`;var darkmode_default=`.darkmode {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0 10px;
}
.darkmode > .toggle {
  display: none;
  box-sizing: border-box;
}
.darkmode svg {
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 20px;
  height: 20px;
  top: calc(50% - 10px);
  fill: var(--darkgray);
  transition: opacity 0.1s ease;
}

:root[saved-theme=dark] {
  color-scheme: dark;
}

:root[saved-theme=light] {
  color-scheme: light;
}

:root[saved-theme=dark] .toggle ~ label > #dayIcon {
  opacity: 0;
}
:root[saved-theme=dark] .toggle ~ label > #nightIcon {
  opacity: 1;
}

:root .toggle ~ label > #dayIcon {
  opacity: 1;
}
:root .toggle ~ label > #nightIcon {
  opacity: 0;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiZGFya21vZGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztBQUlKO0VBQ0U7OztBQUdGO0VBQ0U7OztBQUlBO0VBQ0U7O0FBRUY7RUFDRTs7O0FBS0Y7RUFDRTs7QUFFRjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiLmRhcmttb2RlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBtYXJnaW46IDAgMTBweDtcblxuICAmID4gLnRvZ2dsZSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgJiBzdmcge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgdG9wOiBjYWxjKDUwJSAtIDEwcHgpO1xuICAgIGZpbGw6IHZhcigtLWRhcmtncmF5KTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMXMgZWFzZTtcbiAgfVxufVxuXG46cm9vdFtzYXZlZC10aGVtZT1cImRhcmtcIl0ge1xuICBjb2xvci1zY2hlbWU6IGRhcms7XG59XG5cbjpyb290W3NhdmVkLXRoZW1lPVwibGlnaHRcIl0ge1xuICBjb2xvci1zY2hlbWU6IGxpZ2h0O1xufVxuXG46cm9vdFtzYXZlZC10aGVtZT1cImRhcmtcIl0gLnRvZ2dsZSB+IGxhYmVsIHtcbiAgJiA+ICNkYXlJY29uIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gICYgPiAjbmlnaHRJY29uIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbjpyb290IC50b2dnbGUgfiBsYWJlbCB7XG4gICYgPiAjZGF5SWNvbiB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAmID4gI25pZ2h0SWNvbiB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxufVxuIl19 */`;import{jsx as jsx14,jsxs as jsxs7}from"preact/jsx-runtime";function Darkmode({displayClass,cfg}){return jsxs7("div",{class:classNames(displayClass,"darkmode"),children:[jsx14("input",{class:"toggle",id:"darkmode-toggle",type:"checkbox",tabIndex:-1}),jsx14("label",{id:"toggle-label-light",for:"darkmode-toggle",tabIndex:-1,children:jsxs7("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",id:"dayIcon",x:"0px",y:"0px",viewBox:"0 0 35 35",style:"enable-background:new 0 0 35 35",xmlSpace:"preserve",children:[jsx14("title",{children:i18n(cfg.locale,"darkmode.lightMode")}),jsx14("path",{d:"M6,17.5C6,16.672,5.328,16,4.5,16h-3C0.672,16,0,16.672,0,17.5    S0.672,19,1.5,19h3C5.328,19,6,18.328,6,17.5z M7.5,26c-0.414,0-0.789,0.168-1.061,0.439l-2,2C4.168,28.711,4,29.086,4,29.5    C4,30.328,4.671,31,5.5,31c0.414,0,0.789-0.168,1.06-0.44l2-2C8.832,28.289,9,27.914,9,27.5C9,26.672,8.329,26,7.5,26z M17.5,6    C18.329,6,19,5.328,19,4.5v-3C19,0.672,18.329,0,17.5,0S16,0.672,16,1.5v3C16,5.328,16.671,6,17.5,6z M27.5,9    c0.414,0,0.789-0.168,1.06-0.439l2-2C30.832,6.289,31,5.914,31,5.5C31,4.672,30.329,4,29.5,4c-0.414,0-0.789,0.168-1.061,0.44    l-2,2C26.168,6.711,26,7.086,26,7.5C26,8.328,26.671,9,27.5,9z M6.439,8.561C6.711,8.832,7.086,9,7.5,9C8.328,9,9,8.328,9,7.5    c0-0.414-0.168-0.789-0.439-1.061l-2-2C6.289,4.168,5.914,4,5.5,4C4.672,4,4,4.672,4,5.5c0,0.414,0.168,0.789,0.439,1.06    L6.439,8.561z M33.5,16h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3c0.828,0,1.5-0.672,1.5-1.5S34.328,16,33.5,16z     M28.561,26.439C28.289,26.168,27.914,26,27.5,26c-0.828,0-1.5,0.672-1.5,1.5c0,0.414,0.168,0.789,0.439,1.06l2,2    C28.711,30.832,29.086,31,29.5,31c0.828,0,1.5-0.672,1.5-1.5c0-0.414-0.168-0.789-0.439-1.061L28.561,26.439z M17.5,29    c-0.829,0-1.5,0.672-1.5,1.5v3c0,0.828,0.671,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3C19,29.672,18.329,29,17.5,29z M17.5,7    C11.71,7,7,11.71,7,17.5S11.71,28,17.5,28S28,23.29,28,17.5S23.29,7,17.5,7z M17.5,25c-4.136,0-7.5-3.364-7.5-7.5    c0-4.136,3.364-7.5,7.5-7.5c4.136,0,7.5,3.364,7.5,7.5C25,21.636,21.636,25,17.5,25z"})]})}),jsx14("label",{id:"toggle-label-dark",for:"darkmode-toggle",tabIndex:-1,children:jsxs7("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",id:"nightIcon",x:"0px",y:"0px",viewBox:"0 0 100 100",style:"enable-background:new 0 0 100 100",xmlSpace:"preserve",children:[jsx14("title",{children:i18n(cfg.locale,"darkmode.lightMode")}),jsx14("path",{d:"M96.76,66.458c-0.853-0.852-2.15-1.064-3.23-0.534c-6.063,2.991-12.858,4.571-19.655,4.571  C62.022,70.495,50.88,65.88,42.5,57.5C29.043,44.043,25.658,23.536,34.076,6.47c0.532-1.08,0.318-2.379-0.534-3.23  c-0.851-0.852-2.15-1.064-3.23-0.534c-4.918,2.427-9.375,5.619-13.246,9.491c-9.447,9.447-14.65,22.008-14.65,35.369  c0,13.36,5.203,25.921,14.65,35.368s22.008,14.65,35.368,14.65c13.361,0,25.921-5.203,35.369-14.65  c3.872-3.871,7.064-8.328,9.491-13.246C97.826,68.608,97.611,67.309,96.76,66.458z"})]})})]})}__name(Darkmode,"Darkmode");Darkmode.beforeDOMLoaded=darkmode_inline_default;Darkmode.css=darkmode_default;var Darkmode_default=__name(()=>Darkmode,"default");import{jsx as jsx15,jsxs as jsxs8}from"preact/jsx-runtime";var Head_default=__name(()=>{function Head({cfg,fileData,externalResources}){let title=fileData.frontmatter?.title??i18n(cfg.locale,"head.untitled"),description=fileData.description?.trim()??i18n(cfg.locale,"head.noDescriptionProvided"),{css,js}=externalResources,path12=new URL(`https://${cfg.baseUrl??"example.com"}`).pathname,baseDir=fileData.slug==="404"?path12:pathToRoot(fileData.slug),iconPath=joinSegments(baseDir,"static/icon.png"),ogImagePath=`https://${cfg.baseUrl}/static/og-image.png`;return jsxs8("head",{children:[jsx15("title",{children:title}),jsx15("meta",{charSet:"utf-8"}),jsx15("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),jsx15("meta",{property:"og:title",content:title}),jsx15("meta",{property:"og:description",content:description}),cfg.baseUrl&&jsx15("meta",{property:"og:image",content:ogImagePath}),jsx15("meta",{property:"og:width",content:"1200"}),jsx15("meta",{property:"og:height",content:"675"}),jsx15("link",{rel:"icon",href:iconPath}),jsx15("meta",{name:"description",content:description}),jsx15("meta",{name:"generator",content:"Quartz"}),jsx15("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),jsx15("link",{rel:"preconnect",href:"https://fonts.gstatic.com"}),css.map(href=>jsx15("link",{href,rel:"stylesheet",type:"text/css","spa-preserve":!0},href)),js.filter(resource=>resource.loadTime==="beforeDOMReady").map(res=>JSResourceToScriptElement(res,!0))]})}return __name(Head,"Head"),Head},"default");import{jsx as jsx16}from"preact/jsx-runtime";function PageTitle({fileData,cfg,displayClass}){let title=cfg?.pageTitle??"Untitled Quartz",baseDir=pathToRoot(fileData.slug);return jsx16("h1",{class:classNames(displayClass,"page-title"),children:jsx16("a",{href:baseDir,children:title})})}__name(PageTitle,"PageTitle");PageTitle.css=`
.page-title {
  margin: 0;
}
`;var PageTitle_default=__name(()=>PageTitle,"default");import readingTime from"reading-time";import{jsx as jsx17}from"preact/jsx-runtime";var defaultOptions9={showReadingTime:!0},ContentMeta_default=__name(opts=>{let options2={...defaultOptions9,...opts};function ContentMetadata({cfg,fileData,displayClass}){let text=fileData.text;if(text){let segments=[];if(fileData.dates&&segments.push(formatDate(getDate(cfg,fileData),cfg.locale)),options2.showReadingTime){let{text:timeTaken,words:_words}=readingTime(text);segments.push(timeTaken)}return jsx17("p",{class:classNames(displayClass,"content-meta"),children:segments.join(", ")})}else return null}return __name(ContentMetadata,"ContentMetadata"),ContentMetadata.css=`
  .content-meta {
    margin-top: 0;
    color: var(--gray);
  }
  `,ContentMetadata},"default");import{jsx as jsx18}from"preact/jsx-runtime";function Spacer({displayClass}){return jsx18("div",{class:classNames(displayClass,"spacer")})}__name(Spacer,"Spacer");var Spacer_default=__name(()=>Spacer,"default");var legacyToc_default=`details#toc summary {
  cursor: pointer;
}
details#toc summary::marker {
  color: var(--dark);
}
details#toc summary > * {
  padding-left: 0.25rem;
  display: inline-block;
  margin: 0;
}
details#toc ul {
  list-style: none;
  margin: 0.5rem 1.25rem;
  padding: 0;
}
details#toc .depth-1 {
  padding-left: calc(1rem * 1);
}
details#toc .depth-2 {
  padding-left: calc(1rem * 2);
}
details#toc .depth-3 {
  padding-left: calc(1rem * 3);
}
details#toc .depth-4 {
  padding-left: calc(1rem * 4);
}
details#toc .depth-5 {
  padding-left: calc(1rem * 5);
}
details#toc .depth-6 {
  padding-left: calc(1rem * 6);
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsibGVnYWN5VG9jLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBOztBQUlKO0VBQ0U7RUFDQTtFQUNBOztBQUlBO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiZGV0YWlscyN0b2Mge1xuICAmIHN1bW1hcnkge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICY6Om1hcmtlciB7XG4gICAgICBjb2xvcjogdmFyKC0tZGFyayk7XG4gICAgfVxuXG4gICAgJiA+ICoge1xuICAgICAgcGFkZGluZy1sZWZ0OiAwLjI1cmVtO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbiAgfVxuXG4gICYgdWwge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgbWFyZ2luOiAwLjVyZW0gMS4yNXJlbTtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCA2IHtcbiAgICAmIC5kZXB0aC0jeyRpfSB7XG4gICAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoMXJlbSAqICN7JGl9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ== */`;var toc_default=`button#toc {
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 0;
  color: var(--dark);
  display: flex;
  align-items: center;
}
button#toc h3 {
  font-size: 1rem;
  display: inline-block;
  margin: 0;
}
button#toc .fold {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  opacity: 0.8;
}
button#toc.collapsed .fold {
  transform: rotateZ(-90deg);
}

#toc-content {
  list-style: none;
  overflow: hidden;
  max-height: none;
  transition: max-height 0.5s ease;
  position: relative;
}
#toc-content.collapsed > .overflow::after {
  opacity: 0;
}
#toc-content ul {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
}
#toc-content ul > li > a {
  color: var(--dark);
  opacity: 0.35;
  transition: 0.5s ease opacity, 0.3s ease color;
}
#toc-content ul > li > a.in-view {
  opacity: 0.75;
}
#toc-content .depth-0 {
  padding-left: calc(1rem * 0);
}
#toc-content .depth-1 {
  padding-left: calc(1rem * 1);
}
#toc-content .depth-2 {
  padding-left: calc(1rem * 2);
}
#toc-content .depth-3 {
  padding-left: calc(1rem * 3);
}
#toc-content .depth-4 {
  padding-left: calc(1rem * 4);
}
#toc-content .depth-5 {
  padding-left: calc(1rem * 5);
}
#toc-content .depth-6 {
  padding-left: calc(1rem * 6);
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsidG9jLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBOztBQUdGO0VBQ0U7OztBQUlKO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBOztBQUNBO0VBQ0U7RUFDQTtFQUNBLFlBQ0U7O0FBRUY7RUFDRTs7QUFNSjtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9uI3RvYyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgY29sb3I6IHZhcigtLWRhcmspO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICYgaDMge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgJiAuZm9sZCB7XG4gICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxuXG4gICYuY29sbGFwc2VkIC5mb2xkIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVooLTkwZGVnKTtcbiAgfVxufVxuXG4jdG9jLWNvbnRlbnQge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXgtaGVpZ2h0OiBub25lO1xuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuNXMgZWFzZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICYuY29sbGFwc2VkID4gLm92ZXJmbG93OjphZnRlciB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuXG4gICYgdWwge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgICYgPiBsaSA+IGEge1xuICAgICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgICAgb3BhY2l0eTogMC4zNTtcbiAgICAgIHRyYW5zaXRpb246XG4gICAgICAgIDAuNXMgZWFzZSBvcGFjaXR5LFxuICAgICAgICAwLjNzIGVhc2UgY29sb3I7XG4gICAgICAmLmluLXZpZXcge1xuICAgICAgICBvcGFjaXR5OiAwLjc1O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBmb3IgJGkgZnJvbSAwIHRocm91Z2ggNiB7XG4gICAgJiAuZGVwdGgtI3skaX0ge1xuICAgICAgcGFkZGluZy1sZWZ0OiBjYWxjKDFyZW0gKiAjeyRpfSk7XG4gICAgfVxuICB9XG59XG4iXX0= */`;var toc_inline_default='var o=new IntersectionObserver(e=>{for(let t of e){let n=t.target.id,s=document.querySelector(`a[data-for="${n}"]`),i=t.rootBounds?.height;i&&s&&(t.boundingClientRect.y<i?s.classList.add("in-view"):s.classList.remove("in-view"))}});function c(){this.classList.toggle("collapsed");let e=this.nextElementSibling;e&&(e.classList.toggle("collapsed"),e.style.maxHeight=e.style.maxHeight==="0px"?e.scrollHeight+"px":"0px")}function l(){let e=document.getElementById("toc");if(e){let t=e.classList.contains("collapsed"),n=e.nextElementSibling;if(!n)return;n.style.maxHeight=t?"0px":n.scrollHeight+"px",e.addEventListener("click",c),window.addCleanup(()=>e.removeEventListener("click",c))}}window.addEventListener("resize",l);document.addEventListener("nav",()=>{l(),o.disconnect(),document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach(t=>o.observe(t))});\n';import{jsx as jsx19,jsxs as jsxs9}from"preact/jsx-runtime";var defaultOptions10={layout:"modern"};function TableOfContents2({fileData,displayClass,cfg}){return fileData.toc?jsxs9("div",{class:classNames(displayClass,"toc"),children:[jsxs9("button",{type:"button",id:"toc",class:fileData.collapseToc?"collapsed":"",children:[jsx19("h3",{children:i18n(cfg.locale,"tableOfContent")}),jsx19("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"fold",children:jsx19("polyline",{points:"6 9 12 15 18 9"})})]}),jsx19("div",{id:"toc-content",children:jsx19("ul",{class:"overflow",children:fileData.toc.map(tocEntry=>jsx19("li",{class:`depth-${tocEntry.depth}`,children:jsx19("a",{href:`#${tocEntry.slug}`,"data-for":tocEntry.slug,children:tocEntry.text})},tocEntry.slug))})})]}):null}__name(TableOfContents2,"TableOfContents");TableOfContents2.css=toc_default;TableOfContents2.afterDOMLoaded=toc_inline_default;function LegacyTableOfContents({fileData,cfg}){return fileData.toc?jsxs9("details",{id:"toc",open:!fileData.collapseToc,children:[jsx19("summary",{children:jsx19("h3",{children:i18n(cfg.locale,"tableOfContent")})}),jsx19("ul",{children:fileData.toc.map(tocEntry=>jsx19("li",{class:`depth-${tocEntry.depth}`,children:jsx19("a",{href:`#${tocEntry.slug}`,"data-for":tocEntry.slug,children:tocEntry.text})},tocEntry.slug))})]}):null}__name(LegacyTableOfContents,"LegacyTableOfContents");LegacyTableOfContents.css=legacyToc_default;var TableOfContents_default=__name(opts=>(opts?.layout??defaultOptions10.layout)==="modern"?TableOfContents2:LegacyTableOfContents,"default");var explorer_default=`button#explorer {
  all: unset;
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 0;
  color: var(--dark);
  display: flex;
  align-items: center;
}
button#explorer h1 {
  font-size: 1rem;
  display: inline-block;
  margin: 0;
}
button#explorer .fold {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  opacity: 0.8;
}
button#explorer.collapsed .fold {
  transform: rotateZ(-90deg);
}

.folder-outer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-in-out;
}

.folder-outer.open {
  grid-template-rows: 1fr;
}

.folder-outer > ul {
  overflow: hidden;
}

#explorer-content {
  list-style: none;
  overflow: hidden;
  max-height: none;
  transition: max-height 0.35s ease;
  margin-top: 0.5rem;
}
#explorer-content.collapsed > .overflow::after {
  opacity: 0;
}
#explorer-content ul {
  list-style: none;
  margin: 0.08rem 0;
  padding: 0;
  transition: max-height 0.35s ease, transform 0.35s ease, opacity 0.2s ease;
}
#explorer-content ul li > a {
  color: var(--dark);
  opacity: 0.75;
  pointer-events: all;
}

svg {
  pointer-events: all;
}
svg > polyline {
  pointer-events: none;
}

.folder-container {
  flex-direction: row;
  display: flex;
  align-items: center;
  user-select: none;
}
.folder-container div > a {
  color: var(--secondary);
  font-family: var(--headerFont);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.5rem;
  display: inline-block;
}
.folder-container div > a:hover {
  color: var(--tertiary);
}
.folder-container div > button {
  color: var(--dark);
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding-left: 0;
  padding-right: 0;
  display: flex;
  align-items: center;
  font-family: var(--headerFont);
}
.folder-container div > button span {
  font-size: 0.95rem;
  display: inline-block;
  color: var(--secondary);
  font-weight: 700;
  margin: 0;
  line-height: 1.5rem;
  pointer-events: none;
}

.folder-icon {
  margin-right: 5px;
  color: var(--secondary);
  cursor: pointer;
  transition: transform 0.3s ease;
  backface-visibility: visible;
}

li:has(> .folder-outer:not(.open)) > .folder-container > svg {
  transform: rotate(-90deg);
}

.folder-icon:hover {
  color: var(--tertiary);
}

.no-background::after {
  background: none !important;
}

#explorer-end {
  height: 4px;
  margin: 0;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiZXhwbG9yZXIuc2NzcyIsIi4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTs7O0FBR0Y7RUFDRTs7O0FBR0Y7RUFDRTs7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQSxZQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBOzs7QUFLTjtFQUNFOztBQUVBO0VBQ0U7OztBQUlKO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQSxhQ25GUztFRG9GVDtFQUNBOztBQUdGO0VBQ0U7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTtFQUNBLGFDNUdPO0VENkdQO0VBQ0E7RUFDQTs7O0FBS047RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUVFO0VBRUEiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlIFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcblxuYnV0dG9uI2V4cGxvcmVyIHtcbiAgYWxsOiB1bnNldDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBjb2xvcjogdmFyKC0tZGFyayk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgJiBoMSB7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAmIC5mb2xkIHtcbiAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG4gICAgb3BhY2l0eTogMC44O1xuICB9XG5cbiAgJi5jb2xsYXBzZWQgLmZvbGQge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWigtOTBkZWcpO1xuICB9XG59XG5cbi5mb2xkZXItb3V0ZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDBmcjtcbiAgdHJhbnNpdGlvbjogZ3JpZC10ZW1wbGF0ZS1yb3dzIDAuM3MgZWFzZS1pbi1vdXQ7XG59XG5cbi5mb2xkZXItb3V0ZXIub3BlbiB7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyO1xufVxuXG4uZm9sZGVyLW91dGVyID4gdWwge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4jZXhwbG9yZXItY29udGVudCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1heC1oZWlnaHQ6IG5vbmU7XG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4zNXMgZWFzZTtcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xuXG4gICYuY29sbGFwc2VkID4gLm92ZXJmbG93OjphZnRlciB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuXG4gICYgdWwge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgbWFyZ2luOiAwLjA4cmVtIDA7XG4gICAgcGFkZGluZzogMDtcbiAgICB0cmFuc2l0aW9uOlxuICAgICAgbWF4LWhlaWdodCAwLjM1cyBlYXNlLFxuICAgICAgdHJhbnNmb3JtIDAuMzVzIGVhc2UsXG4gICAgICBvcGFjaXR5IDAuMnMgZWFzZTtcbiAgICAmIGxpID4gYSB7XG4gICAgICBjb2xvcjogdmFyKC0tZGFyayk7XG4gICAgICBvcGFjaXR5OiAwLjc1O1xuICAgICAgcG9pbnRlci1ldmVudHM6IGFsbDtcbiAgICB9XG4gIH1cbn1cblxuc3ZnIHtcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcblxuICAmID4gcG9seWxpbmUge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG59XG5cbi5mb2xkZXItY29udGFpbmVyIHtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgJiBkaXYgPiBhIHtcbiAgICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgICBmb250LWZhbWlseTogdmFyKC0taGVhZGVyRm9udCk7XG4gICAgZm9udC1zaXplOiAwLjk1cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiAkYm9sZFdlaWdodDtcbiAgICBsaW5lLWhlaWdodDogMS41cmVtO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgfVxuXG4gICYgZGl2ID4gYTpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRlcnRpYXJ5KTtcbiAgfVxuXG4gICYgZGl2ID4gYnV0dG9uIHtcbiAgICBjb2xvcjogdmFyKC0tZGFyayk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LWZhbWlseTogdmFyKC0taGVhZGVyRm9udCk7XG5cbiAgICAmIHNwYW4ge1xuICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XG4gICAgICBmb250LXdlaWdodDogJGJvbGRXZWlnaHQ7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBsaW5lLWhlaWdodDogMS41cmVtO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbi5mb2xkZXItaWNvbiB7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG5saTpoYXMoPiAuZm9sZGVyLW91dGVyOm5vdCgub3BlbikpID4gLmZvbGRlci1jb250YWluZXIgPiBzdmcge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xufVxuXG4uZm9sZGVyLWljb246aG92ZXIge1xuICBjb2xvcjogdmFyKC0tdGVydGlhcnkpO1xufVxuXG4ubm8tYmFja2dyb3VuZDo6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiBub25lICFpbXBvcnRhbnQ7XG59XG5cbiNleHBsb3Jlci1lbmQge1xuICAvLyBuZWVkcyBoZWlnaHQgc28gSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgZ2V0cyB0cmlnZ2VyZWRcbiAgaGVpZ2h0OiA0cHg7XG4gIC8vIHJlbW92ZSBkZWZhdWx0IG1hcmdpbiBmcm9tIGxpXG4gIG1hcmdpbjogMDtcbn1cbiIsIiRwYWdlV2lkdGg6IDc1MHB4O1xuJG1vYmlsZUJyZWFrcG9pbnQ6IDYwMHB4O1xuJHRhYmxldEJyZWFrcG9pbnQ6IDEwMDBweDtcbiRzaWRlUGFuZWxXaWR0aDogMzgwcHg7XG4kdG9wU3BhY2luZzogNnJlbTtcbiRmdWxsUGFnZVdpZHRoOiAkcGFnZVdpZHRoICsgMiAqICRzaWRlUGFuZWxXaWR0aDtcbiRib2xkV2VpZ2h0OiA3MDA7XG4kbm9ybWFsV2VpZ2h0OiA0MDA7XG4iXX0= */`;var explorer_inline_default='var s,p=new IntersectionObserver(e=>{let t=document.getElementById("explorer-ul");if(t)for(let o of e)o.isIntersecting?t.classList.add("no-background"):t.classList.remove("no-background")});function m(){this.classList.toggle("collapsed");let e=this.nextElementSibling;e&&(e.classList.toggle("collapsed"),e.style.maxHeight=e.style.maxHeight==="0px"?e.scrollHeight+"px":"0px")}function i(e){e.stopPropagation();let t=e.target;if(!t)return;let o=t.nodeName==="svg",l=o?t.parentElement?.nextSibling:t.parentElement?.parentElement?.nextElementSibling,a=o?t.nextElementSibling:t.parentElement;if(!(l&&a))return;l.classList.toggle("open");let c=l.classList.contains("open");E(l,!c);let n=a.dataset.folderpath;f(s,n);let r=JSON.stringify(s);localStorage.setItem("fileTree",r)}function g(){let e=document.getElementById("explorer");if(!e)return;if(e.dataset.behavior==="collapse")for(let n of document.getElementsByClassName("folder-button"))n.addEventListener("click",i),window.addCleanup(()=>n.removeEventListener("click",i));e.addEventListener("click",m),window.addCleanup(()=>e.removeEventListener("click",m));for(let n of document.getElementsByClassName("folder-icon"))n.addEventListener("click",i),window.addCleanup(()=>n.removeEventListener("click",i));let t=localStorage.getItem("fileTree"),o=e?.dataset.savestate==="true",l=t&&o?JSON.parse(t):[],a=new Map(l.map(n=>[n.path,n.collapsed])),c=e.dataset.tree?JSON.parse(e.dataset.tree):[];s=[];for(let{path:n,collapsed:r}of c)s.push({path:n,collapsed:a.get(n)??r});s.map(n=>{let d=document.querySelector(`[data-folderpath=\'${n.path}\']`)?.parentElement?.nextElementSibling;d&&E(d,n.collapsed)})}window.addEventListener("resize",g);document.addEventListener("nav",()=>{g(),p.disconnect();let e=document.getElementById("explorer-end");e&&p.observe(e)});function E(e,t){return t?e.classList.remove("open"):e.classList.add("open")}function f(e,t){let o=e.find(l=>l.path===t);o&&(o.collapsed=!o.collapsed)}\n';import{Fragment as Fragment3,jsx as jsx20,jsxs as jsxs10}from"preact/jsx-runtime";import{jsx as jsx21,jsxs as jsxs11}from"preact/jsx-runtime";import{jsx as jsx22}from"preact/jsx-runtime";function TagList({fileData,displayClass}){let tags=fileData.frontmatter?.tags,baseDir=pathToRoot(fileData.slug);return tags&&tags.length>0?jsx22("ul",{class:classNames(displayClass,"tags"),children:tags.map(tag=>{let display=`#${tag}`,linkDest=baseDir+`/tags/${slugTag(tag)}`;return jsx22("li",{children:jsx22("a",{href:linkDest,class:"internal tag-link",children:display})})})}):null}__name(TagList,"TagList");TagList.css=`
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-self: end;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`;var TagList_default=__name(()=>TagList,"default");var graph_inline_default='var yu=Object.create;var Ze=Object.defineProperty;var vu=Object.getOwnPropertyDescriptor;var wu=Object.getOwnPropertyNames;var _u=Object.getPrototypeOf,Eu=Object.prototype.hasOwnProperty;var Au=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Cu=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let u of wu(e))!Eu.call(t,u)&&u!==n&&Ze(t,u,{get:()=>e[u],enumerable:!(r=vu(e,u))||r.enumerable});return t};var bu=(t,e,n)=>(n=t!=null?yu(_u(t)):{},Cu(e||!t||!t.__esModule?Ze(n,"default",{value:t,enumerable:!0}):n,t));var hu=Au((zp,cu)=>{"use strict";cu.exports=Ko;function Ct(t){return t instanceof Buffer?Buffer.from(t):new t.constructor(t.buffer.slice(),t.byteOffset,t.length)}function Ko(t){if(t=t||{},t.circles)return Qo(t);return t.proto?r:n;function e(u,o){for(var i=Object.keys(u),a=new Array(i.length),l=0;l<i.length;l++){var s=i[l],f=u[s];typeof f!="object"||f===null?a[s]=f:f instanceof Date?a[s]=new Date(f):ArrayBuffer.isView(f)?a[s]=Ct(f):a[s]=o(f)}return a}function n(u){if(typeof u!="object"||u===null)return u;if(u instanceof Date)return new Date(u);if(Array.isArray(u))return e(u,n);if(u instanceof Map)return new Map(e(Array.from(u),n));if(u instanceof Set)return new Set(e(Array.from(u),n));var o={};for(var i in u)if(Object.hasOwnProperty.call(u,i)!==!1){var a=u[i];typeof a!="object"||a===null?o[i]=a:a instanceof Date?o[i]=new Date(a):a instanceof Map?o[i]=new Map(e(Array.from(a),n)):a instanceof Set?o[i]=new Set(e(Array.from(a),n)):ArrayBuffer.isView(a)?o[i]=Ct(a):o[i]=n(a)}return o}function r(u){if(typeof u!="object"||u===null)return u;if(u instanceof Date)return new Date(u);if(Array.isArray(u))return e(u,r);if(u instanceof Map)return new Map(e(Array.from(u),r));if(u instanceof Set)return new Set(e(Array.from(u),r));var o={};for(var i in u){var a=u[i];typeof a!="object"||a===null?o[i]=a:a instanceof Date?o[i]=new Date(a):a instanceof Map?o[i]=new Map(e(Array.from(a),r)):a instanceof Set?o[i]=new Set(e(Array.from(a),r)):ArrayBuffer.isView(a)?o[i]=Ct(a):o[i]=r(a)}return o}}function Qo(t){var e=[],n=[];return t.proto?o:u;function r(i,a){for(var l=Object.keys(i),s=new Array(l.length),f=0;f<l.length;f++){var D=l[f],c=i[D];if(typeof c!="object"||c===null)s[D]=c;else if(c instanceof Date)s[D]=new Date(c);else if(ArrayBuffer.isView(c))s[D]=Ct(c);else{var p=e.indexOf(c);p!==-1?s[D]=n[p]:s[D]=a(c)}}return s}function u(i){if(typeof i!="object"||i===null)return i;if(i instanceof Date)return new Date(i);if(Array.isArray(i))return r(i,u);if(i instanceof Map)return new Map(r(Array.from(i),u));if(i instanceof Set)return new Set(r(Array.from(i),u));var a={};e.push(i),n.push(a);for(var l in i)if(Object.hasOwnProperty.call(i,l)!==!1){var s=i[l];if(typeof s!="object"||s===null)a[l]=s;else if(s instanceof Date)a[l]=new Date(s);else if(s instanceof Map)a[l]=new Map(r(Array.from(s),u));else if(s instanceof Set)a[l]=new Set(r(Array.from(s),u));else if(ArrayBuffer.isView(s))a[l]=Ct(s);else{var f=e.indexOf(s);f!==-1?a[l]=n[f]:a[l]=u(s)}}return e.pop(),n.pop(),a}function o(i){if(typeof i!="object"||i===null)return i;if(i instanceof Date)return new Date(i);if(Array.isArray(i))return r(i,o);if(i instanceof Map)return new Map(r(Array.from(i),o));if(i instanceof Set)return new Set(r(Array.from(i),o));var a={};e.push(i),n.push(a);for(var l in i){var s=i[l];if(typeof s!="object"||s===null)a[l]=s;else if(s instanceof Date)a[l]=new Date(s);else if(s instanceof Map)a[l]=new Map(r(Array.from(s),o));else if(s instanceof Set)a[l]=new Set(r(Array.from(s),o));else if(ArrayBuffer.isView(s))a[l]=Ct(s);else{var f=e.indexOf(s);f!==-1?a[l]=n[f]:a[l]=o(s)}}return e.pop(),n.pop(),a}}});var Bu={value:()=>{}};function je(){for(var t=0,e=arguments.length,n={},r;t<e;++t){if(!(r=arguments[t]+"")||r in n||/[\\s.]/.test(r))throw new Error("illegal type: "+r);n[r]=[]}return new Jt(n)}function Jt(t){this._=t}function Su(t,e){return t.trim().split(/^|\\s+/).map(function(n){var r="",u=n.indexOf(".");if(u>=0&&(r=n.slice(u+1),n=n.slice(0,u)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:r}})}Jt.prototype=je.prototype={constructor:Jt,on:function(t,e){var n=this._,r=Su(t+"",n),u,o=-1,i=r.length;if(arguments.length<2){for(;++o<i;)if((u=(t=r[o]).type)&&(u=Nu(n[u],t.name)))return u;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++o<i;)if(u=(t=r[o]).type)n[u]=Je(n[u],t.name,e);else if(e==null)for(u in n)n[u]=Je(n[u],t.name,null);return this},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new Jt(t)},call:function(t,e){if((u=arguments.length-2)>0)for(var n=new Array(u),r=0,u,o;r<u;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=this._[t],r=0,u=o.length;r<u;++r)o[r].value.apply(e,n)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],u=0,o=r.length;u<o;++u)r[u].value.apply(e,n)}};function Nu(t,e){for(var n=0,r=t.length,u;n<r;++n)if((u=t[n]).name===e)return u.value}function Je(t,e,n){for(var r=0,u=t.length;r<u;++r)if(t[r].name===e){t[r]=Bu,t=t.slice(0,r).concat(t.slice(r+1));break}return n!=null&&t.push({name:e,value:n}),t}var nt=je;var jt="http://www.w3.org/1999/xhtml",Ce={svg:"http://www.w3.org/2000/svg",xhtml:jt,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function rt(t){var e=t+="",n=e.indexOf(":");return n>=0&&(e=t.slice(0,n))!=="xmlns"&&(t=t.slice(n+1)),Ce.hasOwnProperty(e)?{space:Ce[e],local:t}:t}function Mu(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===jt&&e.documentElement.namespaceURI===jt?e.createElement(t):e.createElementNS(n,t)}}function Tu(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function te(t){var e=rt(t);return(e.local?Tu:Mu)(e)}function Iu(){}function mt(t){return t==null?Iu:function(){return this.querySelector(t)}}function tn(t){typeof t!="function"&&(t=mt(t));for(var e=this._groups,n=e.length,r=new Array(n),u=0;u<n;++u)for(var o=e[u],i=o.length,a=r[u]=new Array(i),l,s,f=0;f<i;++f)(l=o[f])&&(s=t.call(l,l.__data__,f,o))&&("__data__"in l&&(s.__data__=l.__data__),a[f]=s);return new O(r,this._parents)}function bt(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function ku(){return[]}function Bt(t){return t==null?ku:function(){return this.querySelectorAll(t)}}function zu(t){return function(){return bt(t.apply(this,arguments))}}function en(t){typeof t=="function"?t=zu(t):t=Bt(t);for(var e=this._groups,n=e.length,r=[],u=[],o=0;o<n;++o)for(var i=e[o],a=i.length,l,s=0;s<a;++s)(l=i[s])&&(r.push(t.call(l,l.__data__,s,i)),u.push(l));return new O(r,u)}function St(t){return function(){return this.matches(t)}}function ee(t){return function(e){return e.matches(t)}}var Ou=Array.prototype.find;function Ru(t){return function(){return Ou.call(this.children,t)}}function Lu(){return this.firstElementChild}function nn(t){return this.select(t==null?Lu:Ru(typeof t=="function"?t:ee(t)))}var Pu=Array.prototype.filter;function Hu(){return Array.from(this.children)}function $u(t){return function(){return Pu.call(this.children,t)}}function rn(t){return this.selectAll(t==null?Hu:$u(typeof t=="function"?t:ee(t)))}function un(t){typeof t!="function"&&(t=St(t));for(var e=this._groups,n=e.length,r=new Array(n),u=0;u<n;++u)for(var o=e[u],i=o.length,a=r[u]=[],l,s=0;s<i;++s)(l=o[s])&&t.call(l,l.__data__,s,o)&&a.push(l);return new O(r,this._parents)}function ne(t){return new Array(t.length)}function on(){return new O(this._enter||this._groups.map(ne),this._parents)}function Nt(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}Nt.prototype={constructor:Nt,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function an(t){return function(){return t}}function qu(t,e,n,r,u,o){for(var i=0,a,l=e.length,s=o.length;i<s;++i)(a=e[i])?(a.__data__=o[i],r[i]=a):n[i]=new Nt(t,o[i]);for(;i<l;++i)(a=e[i])&&(u[i]=a)}function Xu(t,e,n,r,u,o,i){var a,l,s=new Map,f=e.length,D=o.length,c=new Array(f),p;for(a=0;a<f;++a)(l=e[a])&&(c[a]=p=i.call(l,l.__data__,a,e)+"",s.has(p)?u[a]=l:s.set(p,l));for(a=0;a<D;++a)p=i.call(t,o[a],a,o)+"",(l=s.get(p))?(r[a]=l,l.__data__=o[a],s.delete(p)):n[a]=new Nt(t,o[a]);for(a=0;a<f;++a)(l=e[a])&&s.get(c[a])===l&&(u[a]=l)}function Vu(t){return t.__data__}function sn(t,e){if(!arguments.length)return Array.from(this,Vu);var n=e?Xu:qu,r=this._parents,u=this._groups;typeof t!="function"&&(t=an(t));for(var o=u.length,i=new Array(o),a=new Array(o),l=new Array(o),s=0;s<o;++s){var f=r[s],D=u[s],c=D.length,p=Yu(t.call(f,f&&f.__data__,s,r)),w=p.length,F=a[s]=new Array(w),g=i[s]=new Array(w),d=l[s]=new Array(c);n(f,D,F,g,d,p,e);for(var v=0,B=0,m,C;v<w;++v)if(m=F[v]){for(v>=B&&(B=v+1);!(C=g[B])&&++B<w;);m._next=C||null}}return i=new O(i,r),i._enter=a,i._exit=l,i}function Yu(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function ln(){return new O(this._exit||this._groups.map(ne),this._parents)}function fn(t,e,n){var r=this.enter(),u=this,o=this.exit();return typeof t=="function"?(r=t(r),r&&(r=r.selection())):r=r.append(t+""),e!=null&&(u=e(u),u&&(u=u.selection())),n==null?o.remove():n(o),r&&u?r.merge(u).order():u}function cn(t){for(var e=t.selection?t.selection():t,n=this._groups,r=e._groups,u=n.length,o=r.length,i=Math.min(u,o),a=new Array(u),l=0;l<i;++l)for(var s=n[l],f=r[l],D=s.length,c=a[l]=new Array(D),p,w=0;w<D;++w)(p=s[w]||f[w])&&(c[w]=p);for(;l<u;++l)a[l]=n[l];return new O(a,this._parents)}function hn(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var r=t[e],u=r.length-1,o=r[u],i;--u>=0;)(i=r[u])&&(o&&i.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(i,o),o=i);return this}function pn(t){t||(t=Uu);function e(D,c){return D&&c?t(D.__data__,c.__data__):!D-!c}for(var n=this._groups,r=n.length,u=new Array(r),o=0;o<r;++o){for(var i=n[o],a=i.length,l=u[o]=new Array(a),s,f=0;f<a;++f)(s=i[f])&&(l[f]=s);l.sort(e)}return new O(u,this._parents).order()}function Uu(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function mn(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function dn(){return Array.from(this)}function Dn(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],u=0,o=r.length;u<o;++u){var i=r[u];if(i)return i}return null}function gn(){let t=0;for(let e of this)++t;return t}function xn(){return!this.node()}function Fn(t){for(var e=this._groups,n=0,r=e.length;n<r;++n)for(var u=e[n],o=0,i=u.length,a;o<i;++o)(a=u[o])&&t.call(a,a.__data__,o,u);return this}function Wu(t){return function(){this.removeAttribute(t)}}function Gu(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Ku(t,e){return function(){this.setAttribute(t,e)}}function Qu(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function Zu(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttribute(t):this.setAttribute(t,n)}}function Ju(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function yn(t,e){var n=rt(t);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((e==null?n.local?Gu:Wu:typeof e=="function"?n.local?Ju:Zu:n.local?Qu:Ku)(n,e))}function re(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function ju(t){return function(){this.style.removeProperty(t)}}function ti(t,e,n){return function(){this.style.setProperty(t,e,n)}}function ei(t,e,n){return function(){var r=e.apply(this,arguments);r==null?this.style.removeProperty(t):this.style.setProperty(t,r,n)}}function vn(t,e,n){return arguments.length>1?this.each((e==null?ju:typeof e=="function"?ei:ti)(t,e,n??"")):ot(this.node(),t)}function ot(t,e){return t.style.getPropertyValue(e)||re(t).getComputedStyle(t,null).getPropertyValue(e)}function ni(t){return function(){delete this[t]}}function ri(t,e){return function(){this[t]=e}}function ui(t,e){return function(){var n=e.apply(this,arguments);n==null?delete this[t]:this[t]=n}}function wn(t,e){return arguments.length>1?this.each((e==null?ni:typeof e=="function"?ui:ri)(t,e)):this.node()[t]}function _n(t){return t.trim().split(/^|\\s+/)}function be(t){return t.classList||new En(t)}function En(t){this._node=t,this._names=_n(t.getAttribute("class")||"")}En.prototype={add:function(t){var e=this._names.indexOf(t);e<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function An(t,e){for(var n=be(t),r=-1,u=e.length;++r<u;)n.add(e[r])}function Cn(t,e){for(var n=be(t),r=-1,u=e.length;++r<u;)n.remove(e[r])}function ii(t){return function(){An(this,t)}}function oi(t){return function(){Cn(this,t)}}function ai(t,e){return function(){(e.apply(this,arguments)?An:Cn)(this,t)}}function bn(t,e){var n=_n(t+"");if(arguments.length<2){for(var r=be(this.node()),u=-1,o=n.length;++u<o;)if(!r.contains(n[u]))return!1;return!0}return this.each((typeof e=="function"?ai:e?ii:oi)(n,e))}function si(){this.textContent=""}function li(t){return function(){this.textContent=t}}function fi(t){return function(){var e=t.apply(this,arguments);this.textContent=e??""}}function Bn(t){return arguments.length?this.each(t==null?si:(typeof t=="function"?fi:li)(t)):this.node().textContent}function ci(){this.innerHTML=""}function hi(t){return function(){this.innerHTML=t}}function pi(t){return function(){var e=t.apply(this,arguments);this.innerHTML=e??""}}function Sn(t){return arguments.length?this.each(t==null?ci:(typeof t=="function"?pi:hi)(t)):this.node().innerHTML}function mi(){this.nextSibling&&this.parentNode.appendChild(this)}function Nn(){return this.each(mi)}function di(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Mn(){return this.each(di)}function Tn(t){var e=typeof t=="function"?t:te(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function Di(){return null}function In(t,e){var n=typeof t=="function"?t:te(t),r=e==null?Di:typeof e=="function"?e:mt(e);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function gi(){var t=this.parentNode;t&&t.removeChild(this)}function kn(){return this.each(gi)}function xi(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function Fi(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function zn(t){return this.select(t?Fi:xi)}function On(t){return arguments.length?this.property("__data__",t):this.node().__data__}function yi(t){return function(e){t.call(this,e,this.__data__)}}function vi(t){return t.trim().split(/^|\\s+/).map(function(e){var n="",r=e.indexOf(".");return r>=0&&(n=e.slice(r+1),e=e.slice(0,r)),{type:e,name:n}})}function wi(t){return function(){var e=this.__on;if(e){for(var n=0,r=-1,u=e.length,o;n<u;++n)o=e[n],(!t.type||o.type===t.type)&&o.name===t.name?this.removeEventListener(o.type,o.listener,o.options):e[++r]=o;++r?e.length=r:delete this.__on}}}function _i(t,e,n){return function(){var r=this.__on,u,o=yi(e);if(r){for(var i=0,a=r.length;i<a;++i)if((u=r[i]).type===t.type&&u.name===t.name){this.removeEventListener(u.type,u.listener,u.options),this.addEventListener(u.type,u.listener=o,u.options=n),u.value=e;return}}this.addEventListener(t.type,o,n),u={type:t.type,name:t.name,value:e,listener:o,options:n},r?r.push(u):this.__on=[u]}}function Rn(t,e,n){var r=vi(t+""),u,o=r.length,i;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,s=a.length,f;l<s;++l)for(u=0,f=a[l];u<o;++u)if((i=r[u]).type===f.type&&i.name===f.name)return f.value}return}for(a=e?_i:wi,u=0;u<o;++u)this.each(a(r[u],e,n));return this}function Ln(t,e,n){var r=re(t),u=r.CustomEvent;typeof u=="function"?u=new u(e,n):(u=r.document.createEvent("Event"),n?(u.initEvent(e,n.bubbles,n.cancelable),u.detail=n.detail):u.initEvent(e,!1,!1)),t.dispatchEvent(u)}function Ei(t,e){return function(){return Ln(this,t,e)}}function Ai(t,e){return function(){return Ln(this,t,e.apply(this,arguments))}}function Pn(t,e){return this.each((typeof e=="function"?Ai:Ei)(t,e))}function*Hn(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],u=0,o=r.length,i;u<o;++u)(i=r[u])&&(yield i)}var Mt=[null];function O(t,e){this._groups=t,this._parents=e}function $n(){return new O([[document.documentElement]],Mt)}function Ci(){return this}O.prototype=$n.prototype={constructor:O,select:tn,selectAll:en,selectChild:nn,selectChildren:rn,filter:un,data:sn,enter:on,exit:ln,join:fn,merge:cn,selection:Ci,order:hn,sort:pn,call:mn,nodes:dn,node:Dn,size:gn,empty:xn,each:Fn,attr:yn,style:vn,property:wn,classed:bn,text:Bn,html:Sn,raise:Nn,lower:Mn,append:Tn,insert:In,remove:kn,clone:zn,datum:On,on:Rn,dispatch:Pn,[Symbol.iterator]:Hn};var ut=$n;function P(t){return typeof t=="string"?new O([[document.querySelector(t)]],[document.documentElement]):new O([[t]],Mt)}function qn(t){let e;for(;e=t.sourceEvent;)t=e;return t}function K(t,e){if(t=qn(t),e===void 0&&(e=t.currentTarget),e){var n=e.ownerSVGElement||e;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=t.clientX,r.y=t.clientY,r=r.matrixTransform(e.getScreenCTM().inverse()),[r.x,r.y]}if(e.getBoundingClientRect){var u=e.getBoundingClientRect();return[t.clientX-u.left-e.clientLeft,t.clientY-u.top-e.clientTop]}}return[t.pageX,t.pageY]}function Tt(t){return typeof t=="string"?new O([document.querySelectorAll(t)],[document.documentElement]):new O([bt(t)],Mt)}var Xn={passive:!1},dt={capture:!0,passive:!1};function ue(t){t.stopImmediatePropagation()}function at(t){t.preventDefault(),t.stopImmediatePropagation()}function It(t){var e=t.document.documentElement,n=P(t).on("dragstart.drag",at,dt);"onselectstart"in e?n.on("selectstart.drag",at,dt):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")}function kt(t,e){var n=t.document.documentElement,r=P(t).on("dragstart.drag",null);e&&(r.on("click.drag",at,dt),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in n?r.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}var zt=t=>()=>t;function Ot(t,{sourceEvent:e,subject:n,target:r,identifier:u,active:o,x:i,y:a,dx:l,dy:s,dispatch:f}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},subject:{value:n,enumerable:!0,configurable:!0},target:{value:r,enumerable:!0,configurable:!0},identifier:{value:u,enumerable:!0,configurable:!0},active:{value:o,enumerable:!0,configurable:!0},x:{value:i,enumerable:!0,configurable:!0},y:{value:a,enumerable:!0,configurable:!0},dx:{value:l,enumerable:!0,configurable:!0},dy:{value:s,enumerable:!0,configurable:!0},_:{value:f}})}Ot.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};function bi(t){return!t.ctrlKey&&!t.button}function Bi(){return this.parentNode}function Si(t,e){return e??{x:t.x,y:t.y}}function Ni(){return navigator.maxTouchPoints||"ontouchstart"in this}function Be(){var t=bi,e=Bi,n=Si,r=Ni,u={},o=nt("start","drag","end"),i=0,a,l,s,f,D=0;function c(m){m.on("mousedown.drag",p).filter(r).on("touchstart.drag",g).on("touchmove.drag",d,Xn).on("touchend.drag touchcancel.drag",v).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function p(m,C){if(!(f||!t.call(this,m,C))){var S=B(this,e.call(this,m,C),m,C,"mouse");S&&(P(m.view).on("mousemove.drag",w,dt).on("mouseup.drag",F,dt),It(m.view),ue(m),s=!1,a=m.clientX,l=m.clientY,S("start",m))}}function w(m){if(at(m),!s){var C=m.clientX-a,S=m.clientY-l;s=C*C+S*S>D}u.mouse("drag",m)}function F(m){P(m.view).on("mousemove.drag mouseup.drag",null),kt(m.view,s),at(m),u.mouse("end",m)}function g(m,C){if(t.call(this,m,C)){var S=m.changedTouches,M=e.call(this,m,C),I=S.length,z,L;for(z=0;z<I;++z)(L=B(this,M,m,C,S[z].identifier,S[z]))&&(ue(m),L("start",m,S[z]))}}function d(m){var C=m.changedTouches,S=C.length,M,I;for(M=0;M<S;++M)(I=u[C[M].identifier])&&(at(m),I("drag",m,C[M]))}function v(m){var C=m.changedTouches,S=C.length,M,I;for(f&&clearTimeout(f),f=setTimeout(function(){f=null},500),M=0;M<S;++M)(I=u[C[M].identifier])&&(ue(m),I("end",m,C[M]))}function B(m,C,S,M,I,z){var L=o.copy(),X=K(z||S,C),ht,pt,h;if((h=n.call(m,new Ot("beforestart",{sourceEvent:S,target:c,identifier:I,active:i,x:X[0],y:X[1],dx:0,dy:0,dispatch:L}),M))!=null)return ht=h.x-X[0]||0,pt=h.y-X[1]||0,function _(y,A,x){var E=X,b;switch(y){case"start":u[I]=_,b=i++;break;case"end":delete u[I],--i;case"drag":X=K(x||A,C),b=i;break}L.call(y,m,new Ot(y,{sourceEvent:A,subject:h,target:c,identifier:I,active:b,x:X[0]+ht,y:X[1]+pt,dx:X[0]-E[0],dy:X[1]-E[1],dispatch:L}),M)}}return c.filter=function(m){return arguments.length?(t=typeof m=="function"?m:zt(!!m),c):t},c.container=function(m){return arguments.length?(e=typeof m=="function"?m:zt(m),c):e},c.subject=function(m){return arguments.length?(n=typeof m=="function"?m:zt(m),c):n},c.touchable=function(m){return arguments.length?(r=typeof m=="function"?m:zt(!!m),c):r},c.on=function(){var m=o.on.apply(o,arguments);return m===o?c:m},c.clickDistance=function(m){return arguments.length?(D=(m=+m)*m,c):Math.sqrt(D)},c}function ie(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function Se(t,e){var n=Object.create(t.prototype);for(var r in e)n[r]=e[r];return n}function Pt(){}var Rt=.7,se=1/Rt,yt="\\\\s*([+-]?\\\\d+)\\\\s*",Lt="\\\\s*([+-]?(?:\\\\d*\\\\.)?\\\\d+(?:[eE][+-]?\\\\d+)?)\\\\s*",tt="\\\\s*([+-]?(?:\\\\d*\\\\.)?\\\\d+(?:[eE][+-]?\\\\d+)?)%\\\\s*",Mi=/^#([0-9a-f]{3,8})$/,Ti=new RegExp(`^rgb\\\\(${yt},${yt},${yt}\\\\)$`),Ii=new RegExp(`^rgb\\\\(${tt},${tt},${tt}\\\\)$`),ki=new RegExp(`^rgba\\\\(${yt},${yt},${yt},${Lt}\\\\)$`),zi=new RegExp(`^rgba\\\\(${tt},${tt},${tt},${Lt}\\\\)$`),Oi=new RegExp(`^hsl\\\\(${Lt},${tt},${tt}\\\\)$`),Ri=new RegExp(`^hsla\\\\(${Lt},${tt},${tt},${Lt}\\\\)$`),Vn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ie(Pt,st,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:Yn,formatHex:Yn,formatHex8:Li,formatHsl:Pi,formatRgb:Un,toString:Un});function Yn(){return this.rgb().formatHex()}function Li(){return this.rgb().formatHex8()}function Pi(){return Jn(this).formatHsl()}function Un(){return this.rgb().formatRgb()}function st(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=Mi.exec(t))?(n=e[1].length,e=parseInt(e[1],16),n===6?Wn(e):n===3?new G(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):n===8?oe(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):n===4?oe(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=Ti.exec(t))?new G(e[1],e[2],e[3],1):(e=Ii.exec(t))?new G(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=ki.exec(t))?oe(e[1],e[2],e[3],e[4]):(e=zi.exec(t))?oe(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=Oi.exec(t))?Qn(e[1],e[2]/100,e[3]/100,1):(e=Ri.exec(t))?Qn(e[1],e[2]/100,e[3]/100,e[4]):Vn.hasOwnProperty(t)?Wn(Vn[t]):t==="transparent"?new G(NaN,NaN,NaN,0):null}function Wn(t){return new G(t>>16&255,t>>8&255,t&255,1)}function oe(t,e,n,r){return r<=0&&(t=e=n=NaN),new G(t,e,n,r)}function Hi(t){return t instanceof Pt||(t=st(t)),t?(t=t.rgb(),new G(t.r,t.g,t.b,t.opacity)):new G}function vt(t,e,n,r){return arguments.length===1?Hi(t):new G(t,e,n,r??1)}function G(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r}ie(G,vt,Se(Pt,{brighter(t){return t=t==null?se:Math.pow(se,t),new G(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?Rt:Math.pow(Rt,t),new G(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new G(gt(this.r),gt(this.g),gt(this.b),le(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Gn,formatHex:Gn,formatHex8:$i,formatRgb:Kn,toString:Kn}));function Gn(){return`#${Dt(this.r)}${Dt(this.g)}${Dt(this.b)}`}function $i(){return`#${Dt(this.r)}${Dt(this.g)}${Dt(this.b)}${Dt((isNaN(this.opacity)?1:this.opacity)*255)}`}function Kn(){let t=le(this.opacity);return`${t===1?"rgb(":"rgba("}${gt(this.r)}, ${gt(this.g)}, ${gt(this.b)}${t===1?")":`, ${t})`}`}function le(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function gt(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function Dt(t){return t=gt(t),(t<16?"0":"")+t.toString(16)}function Qn(t,e,n,r){return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new J(t,e,n,r)}function Jn(t){if(t instanceof J)return new J(t.h,t.s,t.l,t.opacity);if(t instanceof Pt||(t=st(t)),!t)return new J;if(t instanceof J)return t;t=t.rgb();var e=t.r/255,n=t.g/255,r=t.b/255,u=Math.min(e,n,r),o=Math.max(e,n,r),i=NaN,a=o-u,l=(o+u)/2;return a?(e===o?i=(n-r)/a+(n<r)*6:n===o?i=(r-e)/a+2:i=(e-n)/a+4,a/=l<.5?o+u:2-o-u,i*=60):a=l>0&&l<1?0:i,new J(i,a,l,t.opacity)}function jn(t,e,n,r){return arguments.length===1?Jn(t):new J(t,e,n,r??1)}function J(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}ie(J,jn,Se(Pt,{brighter(t){return t=t==null?se:Math.pow(se,t),new J(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?Rt:Math.pow(Rt,t),new J(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*e,u=2*n-r;return new G(Ne(t>=240?t-240:t+120,u,r),Ne(t,u,r),Ne(t<120?t+240:t-120,u,r),this.opacity)},clamp(){return new J(Zn(this.h),ae(this.s),ae(this.l),le(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){let t=le(this.opacity);return`${t===1?"hsl(":"hsla("}${Zn(this.h)}, ${ae(this.s)*100}%, ${ae(this.l)*100}%${t===1?")":`, ${t})`}`}}));function Zn(t){return t=(t||0)%360,t<0?t+360:t}function ae(t){return Math.max(0,Math.min(1,t||0))}function Ne(t,e,n){return(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)*255}function Me(t,e,n,r,u){var o=t*t,i=o*t;return((1-3*t+3*o-i)*e+(4-6*o+3*i)*n+(1+3*t+3*o-3*i)*r+i*u)/6}function tr(t){var e=t.length-1;return function(n){var r=n<=0?n=0:n>=1?(n=1,e-1):Math.floor(n*e),u=t[r],o=t[r+1],i=r>0?t[r-1]:2*u-o,a=r<e-1?t[r+2]:2*o-u;return Me((n-r/e)*e,i,u,o,a)}}function er(t){var e=t.length;return function(n){var r=Math.floor(((n%=1)<0?++n:n)*e),u=t[(r+e-1)%e],o=t[r%e],i=t[(r+1)%e],a=t[(r+2)%e];return Me((n-r/e)*e,u,o,i,a)}}var Te=t=>()=>t;function qi(t,e){return function(n){return t+n*e}}function Xi(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(r){return Math.pow(t+r*e,n)}}function nr(t){return(t=+t)==1?fe:function(e,n){return n-e?Xi(e,n,t):Te(isNaN(e)?n:e)}}function fe(t,e){var n=e-t;return n?qi(t,n):Te(isNaN(t)?e:t)}var ce=function t(e){var n=nr(e);function r(u,o){var i=n((u=vt(u)).r,(o=vt(o)).r),a=n(u.g,o.g),l=n(u.b,o.b),s=fe(u.opacity,o.opacity);return function(f){return u.r=i(f),u.g=a(f),u.b=l(f),u.opacity=s(f),u+""}}return r.gamma=t,r}(1);function rr(t){return function(e){var n=e.length,r=new Array(n),u=new Array(n),o=new Array(n),i,a;for(i=0;i<n;++i)a=vt(e[i]),r[i]=a.r||0,u[i]=a.g||0,o[i]=a.b||0;return r=t(r),u=t(u),o=t(o),a.opacity=1,function(l){return a.r=r(l),a.g=u(l),a.b=o(l),a+""}}}var Vi=rr(tr),Yi=rr(er);function Q(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}var ke=/[-+]?(?:\\d+\\.?\\d*|\\.?\\d+)(?:[eE][-+]?\\d+)?/g,Ie=new RegExp(ke.source,"g");function Ui(t){return function(){return t}}function Wi(t){return function(e){return t(e)+""}}function ze(t,e){var n=ke.lastIndex=Ie.lastIndex=0,r,u,o,i=-1,a=[],l=[];for(t=t+"",e=e+"";(r=ke.exec(t))&&(u=Ie.exec(e));)(o=u.index)>n&&(o=e.slice(n,o),a[i]?a[i]+=o:a[++i]=o),(r=r[0])===(u=u[0])?a[i]?a[i]+=u:a[++i]=u:(a[++i]=null,l.push({i,x:Q(r,u)})),n=Ie.lastIndex;return n<e.length&&(o=e.slice(n),a[i]?a[i]+=o:a[++i]=o),a.length<2?l[0]?Wi(l[0].x):Ui(e):(e=l.length,function(s){for(var f=0,D;f<e;++f)a[(D=l[f]).i]=D.x(s);return a.join("")})}var ur=180/Math.PI,he={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Oe(t,e,n,r,u,o){var i,a,l;return(i=Math.sqrt(t*t+e*e))&&(t/=i,e/=i),(l=t*n+e*r)&&(n-=t*l,r-=e*l),(a=Math.sqrt(n*n+r*r))&&(n/=a,r/=a,l/=a),t*r<e*n&&(t=-t,e=-e,l=-l,i=-i),{translateX:u,translateY:o,rotate:Math.atan2(e,t)*ur,skewX:Math.atan(l)*ur,scaleX:i,scaleY:a}}var pe;function ir(t){let e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?he:Oe(e.a,e.b,e.c,e.d,e.e,e.f)}function or(t){return t==null?he:(pe||(pe=document.createElementNS("http://www.w3.org/2000/svg","g")),pe.setAttribute("transform",t),(t=pe.transform.baseVal.consolidate())?(t=t.matrix,Oe(t.a,t.b,t.c,t.d,t.e,t.f)):he)}function ar(t,e,n,r){function u(s){return s.length?s.pop()+" ":""}function o(s,f,D,c,p,w){if(s!==D||f!==c){var F=p.push("translate(",null,e,null,n);w.push({i:F-4,x:Q(s,D)},{i:F-2,x:Q(f,c)})}else(D||c)&&p.push("translate("+D+e+c+n)}function i(s,f,D,c){s!==f?(s-f>180?f+=360:f-s>180&&(s+=360),c.push({i:D.push(u(D)+"rotate(",null,r)-2,x:Q(s,f)})):f&&D.push(u(D)+"rotate("+f+r)}function a(s,f,D,c){s!==f?c.push({i:D.push(u(D)+"skewX(",null,r)-2,x:Q(s,f)}):f&&D.push(u(D)+"skewX("+f+r)}function l(s,f,D,c,p,w){if(s!==D||f!==c){var F=p.push(u(p)+"scale(",null,",",null,")");w.push({i:F-4,x:Q(s,D)},{i:F-2,x:Q(f,c)})}else(D!==1||c!==1)&&p.push(u(p)+"scale("+D+","+c+")")}return function(s,f){var D=[],c=[];return s=t(s),f=t(f),o(s.translateX,s.translateY,f.translateX,f.translateY,D,c),i(s.rotate,f.rotate,D,c),a(s.skewX,f.skewX,D,c),l(s.scaleX,s.scaleY,f.scaleX,f.scaleY,D,c),s=f=null,function(p){for(var w=-1,F=c.length,g;++w<F;)D[(g=c[w]).i]=g.x(p);return D.join("")}}}var Re=ar(ir,"px, ","px)","deg)"),Le=ar(or,", ",")",")");var Gi=1e-12;function sr(t){return((t=Math.exp(t))+1/t)/2}function Ki(t){return((t=Math.exp(t))-1/t)/2}function Qi(t){return((t=Math.exp(2*t))-1)/(t+1)}var Pe=function t(e,n,r){function u(o,i){var a=o[0],l=o[1],s=o[2],f=i[0],D=i[1],c=i[2],p=f-a,w=D-l,F=p*p+w*w,g,d;if(F<Gi)d=Math.log(c/s)/e,g=function(M){return[a+M*p,l+M*w,s*Math.exp(e*M*d)]};else{var v=Math.sqrt(F),B=(c*c-s*s+r*F)/(2*s*n*v),m=(c*c-s*s-r*F)/(2*c*n*v),C=Math.log(Math.sqrt(B*B+1)-B),S=Math.log(Math.sqrt(m*m+1)-m);d=(S-C)/e,g=function(M){var I=M*d,z=sr(C),L=s/(n*v)*(z*Qi(e*I+C)-Ki(C));return[a+L*p,l+L*w,s*z/sr(e*I+C)]}}return g.duration=d*1e3*e/Math.SQRT2,g}return u.rho=function(o){var i=Math.max(.001,+o),a=i*i,l=a*a;return t(i,a,l)},u}(Math.SQRT2,2,4);var wt=0,$t=0,Ht=0,fr=1e3,me,qt,de=0,xt=0,De=0,Xt=typeof performance=="object"&&performance.now?performance:Date,cr=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function Yt(){return xt||(cr(Zi),xt=Xt.now()+De)}function Zi(){xt=0}function Vt(){this._call=this._time=this._next=null}Vt.prototype=_t.prototype={constructor:Vt,restart:function(t,e,n){if(typeof t!="function")throw new TypeError("callback is not a function");n=(n==null?Yt():+n)+(e==null?0:+e),!this._next&&qt!==this&&(qt?qt._next=this:me=this,qt=this),this._call=t,this._time=n,He()},stop:function(){this._call&&(this._call=null,this._time=1/0,He())}};function _t(t,e,n){var r=new Vt;return r.restart(t,e,n),r}function hr(){Yt(),++wt;for(var t=me,e;t;)(e=xt-t._time)>=0&&t._call.call(void 0,e),t=t._next;--wt}function lr(){xt=(de=Xt.now())+De,wt=$t=0;try{hr()}finally{wt=0,ji(),xt=0}}function Ji(){var t=Xt.now(),e=t-de;e>fr&&(De-=e,de=t)}function ji(){for(var t,e=me,n,r=1/0;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:me=n);qt=t,He(r)}function He(t){if(!wt){$t&&($t=clearTimeout($t));var e=t-xt;e>24?(t<1/0&&($t=setTimeout(lr,t-Xt.now()-De)),Ht&&(Ht=clearInterval(Ht))):(Ht||(de=Xt.now(),Ht=setInterval(Ji,fr)),wt=1,cr(lr))}}function ge(t,e,n){var r=new Vt;return e=e==null?0:+e,r.restart(u=>{r.stop(),t(u+e)},e,n),r}var to=nt("start","end","cancel","interrupt"),eo=[],dr=0,pr=1,Fe=2,xe=3,mr=4,ye=5,Ut=6;function lt(t,e,n,r,u,o){var i=t.__transition;if(!i)t.__transition={};else if(n in i)return;no(t,n,{name:e,index:r,group:u,on:to,tween:eo,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:dr})}function Wt(t,e){var n=H(t,e);if(n.state>dr)throw new Error("too late; already scheduled");return n}function q(t,e){var n=H(t,e);if(n.state>xe)throw new Error("too late; already running");return n}function H(t,e){var n=t.__transition;if(!n||!(n=n[e]))throw new Error("transition not found");return n}function no(t,e,n){var r=t.__transition,u;r[e]=n,n.timer=_t(o,0,n.time);function o(s){n.state=pr,n.timer.restart(i,n.delay,n.time),n.delay<=s&&i(s-n.delay)}function i(s){var f,D,c,p;if(n.state!==pr)return l();for(f in r)if(p=r[f],p.name===n.name){if(p.state===xe)return ge(i);p.state===mr?(p.state=Ut,p.timer.stop(),p.on.call("interrupt",t,t.__data__,p.index,p.group),delete r[f]):+f<e&&(p.state=Ut,p.timer.stop(),p.on.call("cancel",t,t.__data__,p.index,p.group),delete r[f])}if(ge(function(){n.state===xe&&(n.state=mr,n.timer.restart(a,n.delay,n.time),a(s))}),n.state=Fe,n.on.call("start",t,t.__data__,n.index,n.group),n.state===Fe){for(n.state=xe,u=new Array(c=n.tween.length),f=0,D=-1;f<c;++f)(p=n.tween[f].value.call(t,t.__data__,n.index,n.group))&&(u[++D]=p);u.length=D+1}}function a(s){for(var f=s<n.duration?n.ease.call(null,s/n.duration):(n.timer.restart(l),n.state=ye,1),D=-1,c=u.length;++D<c;)u[D].call(t,f);n.state===ye&&(n.on.call("end",t,t.__data__,n.index,n.group),l())}function l(){n.state=Ut,n.timer.stop(),delete r[e];for(var s in r)return;delete t.__transition}}function ft(t,e){var n=t.__transition,r,u,o=!0,i;if(n){e=e==null?null:e+"";for(i in n){if((r=n[i]).name!==e){o=!1;continue}u=r.state>Fe&&r.state<ye,r.state=Ut,r.timer.stop(),r.on.call(u?"interrupt":"cancel",t,t.__data__,r.index,r.group),delete n[i]}o&&delete t.__transition}}function Dr(t){return this.each(function(){ft(this,t)})}function ro(t,e){var n,r;return function(){var u=q(this,t),o=u.tween;if(o!==n){r=n=o;for(var i=0,a=r.length;i<a;++i)if(r[i].name===e){r=r.slice(),r.splice(i,1);break}}u.tween=r}}function uo(t,e,n){var r,u;if(typeof n!="function")throw new Error;return function(){var o=q(this,t),i=o.tween;if(i!==r){u=(r=i).slice();for(var a={name:e,value:n},l=0,s=u.length;l<s;++l)if(u[l].name===e){u[l]=a;break}l===s&&u.push(a)}o.tween=u}}function gr(t,e){var n=this._id;if(t+="",arguments.length<2){for(var r=H(this.node(),n).tween,u=0,o=r.length,i;u<o;++u)if((i=r[u]).name===t)return i.value;return null}return this.each((e==null?ro:uo)(n,t,e))}function Et(t,e,n){var r=t._id;return t.each(function(){var u=q(this,r);(u.value||(u.value={}))[e]=n.apply(this,arguments)}),function(u){return H(u,r).value[e]}}function ve(t,e){var n;return(typeof e=="number"?Q:e instanceof st?ce:(n=st(e))?(e=n,ce):ze)(t,e)}function io(t){return function(){this.removeAttribute(t)}}function oo(t){return function(){this.removeAttributeNS(t.space,t.local)}}function ao(t,e,n){var r,u=n+"",o;return function(){var i=this.getAttribute(t);return i===u?null:i===r?o:o=e(r=i,n)}}function so(t,e,n){var r,u=n+"",o;return function(){var i=this.getAttributeNS(t.space,t.local);return i===u?null:i===r?o:o=e(r=i,n)}}function lo(t,e,n){var r,u,o;return function(){var i,a=n(this),l;return a==null?void this.removeAttribute(t):(i=this.getAttribute(t),l=a+"",i===l?null:i===r&&l===u?o:(u=l,o=e(r=i,a)))}}function fo(t,e,n){var r,u,o;return function(){var i,a=n(this),l;return a==null?void this.removeAttributeNS(t.space,t.local):(i=this.getAttributeNS(t.space,t.local),l=a+"",i===l?null:i===r&&l===u?o:(u=l,o=e(r=i,a)))}}function xr(t,e){var n=rt(t),r=n==="transform"?Le:ve;return this.attrTween(t,typeof e=="function"?(n.local?fo:lo)(n,r,Et(this,"attr."+t,e)):e==null?(n.local?oo:io)(n):(n.local?so:ao)(n,r,e))}function co(t,e){return function(n){this.setAttribute(t,e.call(this,n))}}function ho(t,e){return function(n){this.setAttributeNS(t.space,t.local,e.call(this,n))}}function po(t,e){var n,r;function u(){var o=e.apply(this,arguments);return o!==r&&(n=(r=o)&&ho(t,o)),n}return u._value=e,u}function mo(t,e){var n,r;function u(){var o=e.apply(this,arguments);return o!==r&&(n=(r=o)&&co(t,o)),n}return u._value=e,u}function Fr(t,e){var n="attr."+t;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;var r=rt(t);return this.tween(n,(r.local?po:mo)(r,e))}function Do(t,e){return function(){Wt(this,t).delay=+e.apply(this,arguments)}}function go(t,e){return e=+e,function(){Wt(this,t).delay=e}}function yr(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?Do:go)(e,t)):H(this.node(),e).delay}function xo(t,e){return function(){q(this,t).duration=+e.apply(this,arguments)}}function Fo(t,e){return e=+e,function(){q(this,t).duration=e}}function vr(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?xo:Fo)(e,t)):H(this.node(),e).duration}function yo(t,e){if(typeof e!="function")throw new Error;return function(){q(this,t).ease=e}}function wr(t){var e=this._id;return arguments.length?this.each(yo(e,t)):H(this.node(),e).ease}function vo(t,e){return function(){var n=e.apply(this,arguments);if(typeof n!="function")throw new Error;q(this,t).ease=n}}function _r(t){if(typeof t!="function")throw new Error;return this.each(vo(this._id,t))}function Er(t){typeof t!="function"&&(t=St(t));for(var e=this._groups,n=e.length,r=new Array(n),u=0;u<n;++u)for(var o=e[u],i=o.length,a=r[u]=[],l,s=0;s<i;++s)(l=o[s])&&t.call(l,l.__data__,s,o)&&a.push(l);return new V(r,this._parents,this._name,this._id)}function Ar(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,n=t._groups,r=e.length,u=n.length,o=Math.min(r,u),i=new Array(r),a=0;a<o;++a)for(var l=e[a],s=n[a],f=l.length,D=i[a]=new Array(f),c,p=0;p<f;++p)(c=l[p]||s[p])&&(D[p]=c);for(;a<r;++a)i[a]=e[a];return new V(i,this._parents,this._name,this._id)}function wo(t){return(t+"").trim().split(/^|\\s+/).every(function(e){var n=e.indexOf(".");return n>=0&&(e=e.slice(0,n)),!e||e==="start"})}function _o(t,e,n){var r,u,o=wo(e)?Wt:q;return function(){var i=o(this,t),a=i.on;a!==r&&(u=(r=a).copy()).on(e,n),i.on=u}}function Cr(t,e){var n=this._id;return arguments.length<2?H(this.node(),n).on.on(t):this.each(_o(n,t,e))}function Eo(t){return function(){var e=this.parentNode;for(var n in this.__transition)if(+n!==t)return;e&&e.removeChild(this)}}function br(){return this.on("end.remove",Eo(this._id))}function Br(t){var e=this._name,n=this._id;typeof t!="function"&&(t=mt(t));for(var r=this._groups,u=r.length,o=new Array(u),i=0;i<u;++i)for(var a=r[i],l=a.length,s=o[i]=new Array(l),f,D,c=0;c<l;++c)(f=a[c])&&(D=t.call(f,f.__data__,c,a))&&("__data__"in f&&(D.__data__=f.__data__),s[c]=D,lt(s[c],e,n,c,s,H(f,n)));return new V(o,this._parents,e,n)}function Sr(t){var e=this._name,n=this._id;typeof t!="function"&&(t=Bt(t));for(var r=this._groups,u=r.length,o=[],i=[],a=0;a<u;++a)for(var l=r[a],s=l.length,f,D=0;D<s;++D)if(f=l[D]){for(var c=t.call(f,f.__data__,D,l),p,w=H(f,n),F=0,g=c.length;F<g;++F)(p=c[F])&&lt(p,e,n,F,c,w);o.push(c),i.push(f)}return new V(o,i,e,n)}var Ao=ut.prototype.constructor;function Nr(){return new Ao(this._groups,this._parents)}function Co(t,e){var n,r,u;return function(){var o=ot(this,t),i=(this.style.removeProperty(t),ot(this,t));return o===i?null:o===n&&i===r?u:u=e(n=o,r=i)}}function Mr(t){return function(){this.style.removeProperty(t)}}function bo(t,e,n){var r,u=n+"",o;return function(){var i=ot(this,t);return i===u?null:i===r?o:o=e(r=i,n)}}function Bo(t,e,n){var r,u,o;return function(){var i=ot(this,t),a=n(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(t),ot(this,t))),i===l?null:i===r&&l===u?o:(u=l,o=e(r=i,a))}}function So(t,e){var n,r,u,o="style."+e,i="end."+o,a;return function(){var l=q(this,t),s=l.on,f=l.value[o]==null?a||(a=Mr(e)):void 0;(s!==n||u!==f)&&(r=(n=s).copy()).on(i,u=f),l.on=r}}function Tr(t,e,n){var r=(t+="")=="transform"?Re:ve;return e==null?this.styleTween(t,Co(t,r)).on("end.style."+t,Mr(t)):typeof e=="function"?this.styleTween(t,Bo(t,r,Et(this,"style."+t,e))).each(So(this._id,t)):this.styleTween(t,bo(t,r,e),n).on("end.style."+t,null)}function No(t,e,n){return function(r){this.style.setProperty(t,e.call(this,r),n)}}function Mo(t,e,n){var r,u;function o(){var i=e.apply(this,arguments);return i!==u&&(r=(u=i)&&No(t,i,n)),r}return o._value=e,o}function Ir(t,e,n){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(e==null)return this.tween(r,null);if(typeof e!="function")throw new Error;return this.tween(r,Mo(t,e,n??""))}function To(t){return function(){this.textContent=t}}function Io(t){return function(){var e=t(this);this.textContent=e??""}}function kr(t){return this.tween("text",typeof t=="function"?Io(Et(this,"text",t)):To(t==null?"":t+""))}function ko(t){return function(e){this.textContent=t.call(this,e)}}function zo(t){var e,n;function r(){var u=t.apply(this,arguments);return u!==n&&(e=(n=u)&&ko(u)),e}return r._value=t,r}function zr(t){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;return this.tween(e,zo(t))}function Or(){for(var t=this._name,e=this._id,n=we(),r=this._groups,u=r.length,o=0;o<u;++o)for(var i=r[o],a=i.length,l,s=0;s<a;++s)if(l=i[s]){var f=H(l,e);lt(l,t,n,s,i,{time:f.time+f.delay+f.duration,delay:0,duration:f.duration,ease:f.ease})}return new V(r,this._parents,t,n)}function Rr(){var t,e,n=this,r=n._id,u=n.size();return new Promise(function(o,i){var a={value:i},l={value:function(){--u===0&&o()}};n.each(function(){var s=q(this,r),f=s.on;f!==t&&(e=(t=f).copy(),e._.cancel.push(a),e._.interrupt.push(a),e._.end.push(l)),s.on=e}),u===0&&o()})}var Oo=0;function V(t,e,n,r){this._groups=t,this._parents=e,this._name=n,this._id=r}function Lr(t){return ut().transition(t)}function we(){return++Oo}var it=ut.prototype;V.prototype=Lr.prototype={constructor:V,select:Br,selectAll:Sr,selectChild:it.selectChild,selectChildren:it.selectChildren,filter:Er,merge:Ar,selection:Nr,transition:Or,call:it.call,nodes:it.nodes,node:it.node,size:it.size,empty:it.empty,each:it.each,on:Cr,attr:xr,attrTween:Fr,style:Tr,styleTween:Ir,text:kr,textTween:zr,remove:br,tween:gr,delay:yr,duration:vr,ease:wr,easeVarying:_r,end:Rr,[Symbol.iterator]:it[Symbol.iterator]};function _e(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}var Ro={time:null,delay:0,duration:250,ease:_e};function Lo(t,e){for(var n;!(n=t.__transition)||!(n=n[e]);)if(!(t=t.parentNode))throw new Error(`transition ${e} not found`);return n}function Pr(t){var e,n;t instanceof V?(e=t._id,t=t._name):(e=we(),(n=Ro).time=Yt(),t=t==null?null:t+"");for(var r=this._groups,u=r.length,o=0;o<u;++o)for(var i=r[o],a=i.length,l,s=0;s<a;++s)(l=i[s])&&lt(l,t,e,s,i,n||Lo(l,e));return new V(r,this._parents,t,e)}ut.prototype.interrupt=Dr;ut.prototype.transition=Pr;var{abs:Ah,max:Ch,min:bh}=Math;function Hr(t){return[+t[0],+t[1]]}function Po(t){return[Hr(t[0]),Hr(t[1])]}var Bh={name:"x",handles:["w","e"].map($e),input:function(t,e){return t==null?null:[[+t[0],e[0][1]],[+t[1],e[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},Sh={name:"y",handles:["n","s"].map($e),input:function(t,e){return t==null?null:[[e[0][0],+t[0]],[e[1][0],+t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},Nh={name:"xy",handles:["n","w","e","s","nw","ne","sw","se"].map($e),input:function(t){return t==null?null:Po(t)},output:function(t){return t}};function $e(t){return{type:t}}function qe(t,e){var n,r=1;t==null&&(t=0),e==null&&(e=0);function u(){var o,i=n.length,a,l=0,s=0;for(o=0;o<i;++o)a=n[o],l+=a.x,s+=a.y;for(l=(l/i-t)*r,s=(s/i-e)*r,o=0;o<i;++o)a=n[o],a.x-=l,a.y-=s}return u.initialize=function(o){n=o},u.x=function(o){return arguments.length?(t=+o,u):t},u.y=function(o){return arguments.length?(e=+o,u):e},u.strength=function(o){return arguments.length?(r=+o,u):r},u}function $r(t){let e=+this._x.call(null,t),n=+this._y.call(null,t);return qr(this.cover(e,n),e,n,t)}function qr(t,e,n,r){if(isNaN(e)||isNaN(n))return t;var u,o=t._root,i={data:r},a=t._x0,l=t._y0,s=t._x1,f=t._y1,D,c,p,w,F,g,d,v;if(!o)return t._root=i,t;for(;o.length;)if((F=e>=(D=(a+s)/2))?a=D:s=D,(g=n>=(c=(l+f)/2))?l=c:f=c,u=o,!(o=o[d=g<<1|F]))return u[d]=i,t;if(p=+t._x.call(null,o.data),w=+t._y.call(null,o.data),e===p&&n===w)return i.next=o,u?u[d]=i:t._root=i,t;do u=u?u[d]=new Array(4):t._root=new Array(4),(F=e>=(D=(a+s)/2))?a=D:s=D,(g=n>=(c=(l+f)/2))?l=c:f=c;while((d=g<<1|F)===(v=(w>=c)<<1|p>=D));return u[v]=o,u[d]=i,t}function Xr(t){var e,n,r=t.length,u,o,i=new Array(r),a=new Array(r),l=1/0,s=1/0,f=-1/0,D=-1/0;for(n=0;n<r;++n)isNaN(u=+this._x.call(null,e=t[n]))||isNaN(o=+this._y.call(null,e))||(i[n]=u,a[n]=o,u<l&&(l=u),u>f&&(f=u),o<s&&(s=o),o>D&&(D=o));if(l>f||s>D)return this;for(this.cover(l,s).cover(f,D),n=0;n<r;++n)qr(this,i[n],a[n],t[n]);return this}function Vr(t,e){if(isNaN(t=+t)||isNaN(e=+e))return this;var n=this._x0,r=this._y0,u=this._x1,o=this._y1;if(isNaN(n))u=(n=Math.floor(t))+1,o=(r=Math.floor(e))+1;else{for(var i=u-n||1,a=this._root,l,s;n>t||t>=u||r>e||e>=o;)switch(s=(e<r)<<1|t<n,l=new Array(4),l[s]=a,a=l,i*=2,s){case 0:u=n+i,o=r+i;break;case 1:n=u-i,o=r+i;break;case 2:u=n+i,r=o-i;break;case 3:n=u-i,r=o-i;break}this._root&&this._root.length&&(this._root=a)}return this._x0=n,this._y0=r,this._x1=u,this._y1=o,this}function Yr(){var t=[];return this.visit(function(e){if(!e.length)do t.push(e.data);while(e=e.next)}),t}function Ur(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function $(t,e,n,r,u){this.node=t,this.x0=e,this.y0=n,this.x1=r,this.y1=u}function Wr(t,e,n){var r,u=this._x0,o=this._y0,i,a,l,s,f=this._x1,D=this._y1,c=[],p=this._root,w,F;for(p&&c.push(new $(p,u,o,f,D)),n==null?n=1/0:(u=t-n,o=e-n,f=t+n,D=e+n,n*=n);w=c.pop();)if(!(!(p=w.node)||(i=w.x0)>f||(a=w.y0)>D||(l=w.x1)<u||(s=w.y1)<o))if(p.length){var g=(i+l)/2,d=(a+s)/2;c.push(new $(p[3],g,d,l,s),new $(p[2],i,d,g,s),new $(p[1],g,a,l,d),new $(p[0],i,a,g,d)),(F=(e>=d)<<1|t>=g)&&(w=c[c.length-1],c[c.length-1]=c[c.length-1-F],c[c.length-1-F]=w)}else{var v=t-+this._x.call(null,p.data),B=e-+this._y.call(null,p.data),m=v*v+B*B;if(m<n){var C=Math.sqrt(n=m);u=t-C,o=e-C,f=t+C,D=e+C,r=p.data}}return r}function Gr(t){if(isNaN(f=+this._x.call(null,t))||isNaN(D=+this._y.call(null,t)))return this;var e,n=this._root,r,u,o,i=this._x0,a=this._y0,l=this._x1,s=this._y1,f,D,c,p,w,F,g,d;if(!n)return this;if(n.length)for(;;){if((w=f>=(c=(i+l)/2))?i=c:l=c,(F=D>=(p=(a+s)/2))?a=p:s=p,e=n,!(n=n[g=F<<1|w]))return this;if(!n.length)break;(e[g+1&3]||e[g+2&3]||e[g+3&3])&&(r=e,d=g)}for(;n.data!==t;)if(u=n,!(n=n.next))return this;return(o=n.next)&&delete n.next,u?(o?u.next=o:delete u.next,this):e?(o?e[g]=o:delete e[g],(n=e[0]||e[1]||e[2]||e[3])&&n===(e[3]||e[2]||e[1]||e[0])&&!n.length&&(r?r[d]=n:this._root=n),this):(this._root=o,this)}function Kr(t){for(var e=0,n=t.length;e<n;++e)this.remove(t[e]);return this}function Qr(){return this._root}function Zr(){var t=0;return this.visit(function(e){if(!e.length)do++t;while(e=e.next)}),t}function Jr(t){var e=[],n,r=this._root,u,o,i,a,l;for(r&&e.push(new $(r,this._x0,this._y0,this._x1,this._y1));n=e.pop();)if(!t(r=n.node,o=n.x0,i=n.y0,a=n.x1,l=n.y1)&&r.length){var s=(o+a)/2,f=(i+l)/2;(u=r[3])&&e.push(new $(u,s,f,a,l)),(u=r[2])&&e.push(new $(u,o,f,s,l)),(u=r[1])&&e.push(new $(u,s,i,a,f)),(u=r[0])&&e.push(new $(u,o,i,s,f))}return this}function jr(t){var e=[],n=[],r;for(this._root&&e.push(new $(this._root,this._x0,this._y0,this._x1,this._y1));r=e.pop();){var u=r.node;if(u.length){var o,i=r.x0,a=r.y0,l=r.x1,s=r.y1,f=(i+l)/2,D=(a+s)/2;(o=u[0])&&e.push(new $(o,i,a,f,D)),(o=u[1])&&e.push(new $(o,f,a,l,D)),(o=u[2])&&e.push(new $(o,i,D,f,s)),(o=u[3])&&e.push(new $(o,f,D,l,s))}n.push(r)}for(;r=n.pop();)t(r.node,r.x0,r.y0,r.x1,r.y1);return this}function tu(t){return t[0]}function eu(t){return arguments.length?(this._x=t,this):this._x}function nu(t){return t[1]}function ru(t){return arguments.length?(this._y=t,this):this._y}function Gt(t,e,n){var r=new Xe(e??tu,n??nu,NaN,NaN,NaN,NaN);return t==null?r:r.addAll(t)}function Xe(t,e,n,r,u,o){this._x=t,this._y=e,this._x0=n,this._y0=r,this._x1=u,this._y1=o,this._root=void 0}function uu(t){for(var e={data:t.data},n=e;t=t.next;)n=n.next={data:t.data};return e}var Y=Gt.prototype=Xe.prototype;Y.copy=function(){var t=new Xe(this._x,this._y,this._x0,this._y0,this._x1,this._y1),e=this._root,n,r;if(!e)return t;if(!e.length)return t._root=uu(e),t;for(n=[{source:e,target:t._root=new Array(4)}];e=n.pop();)for(var u=0;u<4;++u)(r=e.source[u])&&(r.length?n.push({source:r,target:e.target[u]=new Array(4)}):e.target[u]=uu(r));return t};Y.add=$r;Y.addAll=Xr;Y.cover=Vr;Y.data=Yr;Y.extent=Ur;Y.find=Wr;Y.remove=Gr;Y.removeAll=Kr;Y.root=Qr;Y.size=Zr;Y.visit=Jr;Y.visitAfter=jr;Y.x=eu;Y.y=ru;function Ft(t){return function(){return t}}function ct(t){return(t()-.5)*1e-6}function Ho(t){return t.index}function iu(t,e){var n=t.get(e);if(!n)throw new Error("node not found: "+e);return n}function Ve(t){var e=Ho,n=D,r,u=Ft(30),o,i,a,l,s,f=1;t==null&&(t=[]);function D(g){return 1/Math.min(a[g.source.index],a[g.target.index])}function c(g){for(var d=0,v=t.length;d<f;++d)for(var B=0,m,C,S,M,I,z,L;B<v;++B)m=t[B],C=m.source,S=m.target,M=S.x+S.vx-C.x-C.vx||ct(s),I=S.y+S.vy-C.y-C.vy||ct(s),z=Math.sqrt(M*M+I*I),z=(z-o[B])/z*g*r[B],M*=z,I*=z,S.vx-=M*(L=l[B]),S.vy-=I*L,C.vx+=M*(L=1-L),C.vy+=I*L}function p(){if(i){var g,d=i.length,v=t.length,B=new Map(i.map((C,S)=>[e(C,S,i),C])),m;for(g=0,a=new Array(d);g<v;++g)m=t[g],m.index=g,typeof m.source!="object"&&(m.source=iu(B,m.source)),typeof m.target!="object"&&(m.target=iu(B,m.target)),a[m.source.index]=(a[m.source.index]||0)+1,a[m.target.index]=(a[m.target.index]||0)+1;for(g=0,l=new Array(v);g<v;++g)m=t[g],l[g]=a[m.source.index]/(a[m.source.index]+a[m.target.index]);r=new Array(v),w(),o=new Array(v),F()}}function w(){if(i)for(var g=0,d=t.length;g<d;++g)r[g]=+n(t[g],g,t)}function F(){if(i)for(var g=0,d=t.length;g<d;++g)o[g]=+u(t[g],g,t)}return c.initialize=function(g,d){i=g,s=d,p()},c.links=function(g){return arguments.length?(t=g,p(),c):t},c.id=function(g){return arguments.length?(e=g,c):e},c.iterations=function(g){return arguments.length?(f=+g,c):f},c.strength=function(g){return arguments.length?(n=typeof g=="function"?g:Ft(+g),w(),c):n},c.distance=function(g){return arguments.length?(u=typeof g=="function"?g:Ft(+g),F(),c):u},c}function ou(){let t=1;return()=>(t=(1664525*t+1013904223)%4294967296)/4294967296}function au(t){return t.x}function su(t){return t.y}var $o=10,qo=Math.PI*(3-Math.sqrt(5));function Ye(t){var e,n=1,r=.001,u=1-Math.pow(r,1/300),o=0,i=.6,a=new Map,l=_t(D),s=nt("tick","end"),f=ou();t==null&&(t=[]);function D(){c(),s.call("tick",e),n<r&&(l.stop(),s.call("end",e))}function c(F){var g,d=t.length,v;F===void 0&&(F=1);for(var B=0;B<F;++B)for(n+=(o-n)*u,a.forEach(function(m){m(n)}),g=0;g<d;++g)v=t[g],v.fx==null?v.x+=v.vx*=i:(v.x=v.fx,v.vx=0),v.fy==null?v.y+=v.vy*=i:(v.y=v.fy,v.vy=0);return e}function p(){for(var F=0,g=t.length,d;F<g;++F){if(d=t[F],d.index=F,d.fx!=null&&(d.x=d.fx),d.fy!=null&&(d.y=d.fy),isNaN(d.x)||isNaN(d.y)){var v=$o*Math.sqrt(.5+F),B=F*qo;d.x=v*Math.cos(B),d.y=v*Math.sin(B)}(isNaN(d.vx)||isNaN(d.vy))&&(d.vx=d.vy=0)}}function w(F){return F.initialize&&F.initialize(t,f),F}return p(),e={tick:c,restart:function(){return l.restart(D),e},stop:function(){return l.stop(),e},nodes:function(F){return arguments.length?(t=F,p(),a.forEach(w),e):t},alpha:function(F){return arguments.length?(n=+F,e):n},alphaMin:function(F){return arguments.length?(r=+F,e):r},alphaDecay:function(F){return arguments.length?(u=+F,e):+u},alphaTarget:function(F){return arguments.length?(o=+F,e):o},velocityDecay:function(F){return arguments.length?(i=1-F,e):1-i},randomSource:function(F){return arguments.length?(f=F,a.forEach(w),e):f},force:function(F,g){return arguments.length>1?(g==null?a.delete(F):a.set(F,w(g)),e):a.get(F)},find:function(F,g,d){var v=0,B=t.length,m,C,S,M,I;for(d==null?d=1/0:d*=d,v=0;v<B;++v)M=t[v],m=F-M.x,C=g-M.y,S=m*m+C*C,S<d&&(I=M,d=S);return I},on:function(F,g){return arguments.length>1?(s.on(F,g),e):s.on(F)}}}function Ue(){var t,e,n,r,u=Ft(-30),o,i=1,a=1/0,l=.81;function s(p){var w,F=t.length,g=Gt(t,au,su).visitAfter(D);for(r=p,w=0;w<F;++w)e=t[w],g.visit(c)}function f(){if(t){var p,w=t.length,F;for(o=new Array(w),p=0;p<w;++p)F=t[p],o[F.index]=+u(F,p,t)}}function D(p){var w=0,F,g,d=0,v,B,m;if(p.length){for(v=B=m=0;m<4;++m)(F=p[m])&&(g=Math.abs(F.value))&&(w+=F.value,d+=g,v+=g*F.x,B+=g*F.y);p.x=v/d,p.y=B/d}else{F=p,F.x=F.data.x,F.y=F.data.y;do w+=o[F.data.index];while(F=F.next)}p.value=w}function c(p,w,F,g){if(!p.value)return!0;var d=p.x-e.x,v=p.y-e.y,B=g-w,m=d*d+v*v;if(B*B/l<m)return m<a&&(d===0&&(d=ct(n),m+=d*d),v===0&&(v=ct(n),m+=v*v),m<i&&(m=Math.sqrt(i*m)),e.vx+=d*p.value*r/m,e.vy+=v*p.value*r/m),!0;if(p.length||m>=a)return;(p.data!==e||p.next)&&(d===0&&(d=ct(n),m+=d*d),v===0&&(v=ct(n),m+=v*v),m<i&&(m=Math.sqrt(i*m)));do p.data!==e&&(B=o[p.data.index]*r/m,e.vx+=d*B,e.vy+=v*B);while(p=p.next)}return s.initialize=function(p,w){t=p,n=w,f()},s.strength=function(p){return arguments.length?(u=typeof p=="function"?p:Ft(+p),f(),s):u},s.distanceMin=function(p){return arguments.length?(i=p*p,s):Math.sqrt(i)},s.distanceMax=function(p){return arguments.length?(a=p*p,s):Math.sqrt(a)},s.theta=function(p){return arguments.length?(l=p*p,s):Math.sqrt(l)},s}var Kt=t=>()=>t;function We(t,{sourceEvent:e,target:n,transform:r,dispatch:u}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:u}})}function j(t,e,n){this.k=t,this.x=e,this.y=n}j.prototype={constructor:j,scale:function(t){return t===1?this:new j(this.k*t,this.x,this.y)},translate:function(t,e){return t===0&e===0?this:new j(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Qt=new j(1,0,0);Ge.prototype=j.prototype;function Ge(t){for(;!t.__zoom;)if(!(t=t.parentNode))return Qt;return t.__zoom}function Ee(t){t.stopImmediatePropagation()}function At(t){t.preventDefault(),t.stopImmediatePropagation()}function Xo(t){return(!t.ctrlKey||t.type==="wheel")&&!t.button}function Vo(){var t=this;return t instanceof SVGElement?(t=t.ownerSVGElement||t,t.hasAttribute("viewBox")?(t=t.viewBox.baseVal,[[t.x,t.y],[t.x+t.width,t.y+t.height]]):[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]):[[0,0],[t.clientWidth,t.clientHeight]]}function lu(){return this.__zoom||Qt}function Yo(t){return-t.deltaY*(t.deltaMode===1?.05:t.deltaMode?1:.002)*(t.ctrlKey?10:1)}function Uo(){return navigator.maxTouchPoints||"ontouchstart"in this}function Wo(t,e,n){var r=t.invertX(e[0][0])-n[0][0],u=t.invertX(e[1][0])-n[1][0],o=t.invertY(e[0][1])-n[0][1],i=t.invertY(e[1][1])-n[1][1];return t.translate(u>r?(r+u)/2:Math.min(0,r)||Math.max(0,u),i>o?(o+i)/2:Math.min(0,o)||Math.max(0,i))}function Ke(){var t=Xo,e=Vo,n=Wo,r=Yo,u=Uo,o=[0,1/0],i=[[-1/0,-1/0],[1/0,1/0]],a=250,l=Pe,s=nt("start","zoom","end"),f,D,c,p=500,w=150,F=0,g=10;function d(h){h.property("__zoom",lu).on("wheel.zoom",I,{passive:!1}).on("mousedown.zoom",z).on("dblclick.zoom",L).filter(u).on("touchstart.zoom",X).on("touchmove.zoom",ht).on("touchend.zoom touchcancel.zoom",pt).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}d.transform=function(h,_,y,A){var x=h.selection?h.selection():h;x.property("__zoom",lu),h!==x?C(h,_,y,A):x.interrupt().each(function(){S(this,arguments).event(A).start().zoom(null,typeof _=="function"?_.apply(this,arguments):_).end()})},d.scaleBy=function(h,_,y,A){d.scaleTo(h,function(){var x=this.__zoom.k,E=typeof _=="function"?_.apply(this,arguments):_;return x*E},y,A)},d.scaleTo=function(h,_,y,A){d.transform(h,function(){var x=e.apply(this,arguments),E=this.__zoom,b=y==null?m(x):typeof y=="function"?y.apply(this,arguments):y,N=E.invert(b),T=typeof _=="function"?_.apply(this,arguments):_;return n(B(v(E,T),b,N),x,i)},y,A)},d.translateBy=function(h,_,y,A){d.transform(h,function(){return n(this.__zoom.translate(typeof _=="function"?_.apply(this,arguments):_,typeof y=="function"?y.apply(this,arguments):y),e.apply(this,arguments),i)},null,A)},d.translateTo=function(h,_,y,A,x){d.transform(h,function(){var E=e.apply(this,arguments),b=this.__zoom,N=A==null?m(E):typeof A=="function"?A.apply(this,arguments):A;return n(Qt.translate(N[0],N[1]).scale(b.k).translate(typeof _=="function"?-_.apply(this,arguments):-_,typeof y=="function"?-y.apply(this,arguments):-y),E,i)},A,x)};function v(h,_){return _=Math.max(o[0],Math.min(o[1],_)),_===h.k?h:new j(_,h.x,h.y)}function B(h,_,y){var A=_[0]-y[0]*h.k,x=_[1]-y[1]*h.k;return A===h.x&&x===h.y?h:new j(h.k,A,x)}function m(h){return[(+h[0][0]+ +h[1][0])/2,(+h[0][1]+ +h[1][1])/2]}function C(h,_,y,A){h.on("start.zoom",function(){S(this,arguments).event(A).start()}).on("interrupt.zoom end.zoom",function(){S(this,arguments).event(A).end()}).tween("zoom",function(){var x=this,E=arguments,b=S(x,E).event(A),N=e.apply(x,E),T=y==null?m(N):typeof y=="function"?y.apply(x,E):y,R=Math.max(N[1][0]-N[0][0],N[1][1]-N[0][1]),k=x.__zoom,U=typeof _=="function"?_.apply(x,E):_,W=l(k.invert(T).concat(R/k.k),U.invert(T).concat(R/U.k));return function(Z){if(Z===1)Z=U;else{var et=W(Z),Ae=R/et[2];Z=new j(Ae,T[0]-et[0]*Ae,T[1]-et[1]*Ae)}b.zoom(null,Z)}})}function S(h,_,y){return!y&&h.__zooming||new M(h,_)}function M(h,_){this.that=h,this.args=_,this.active=0,this.sourceEvent=null,this.extent=e.apply(h,_),this.taps=0}M.prototype={event:function(h){return h&&(this.sourceEvent=h),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(h,_){return this.mouse&&h!=="mouse"&&(this.mouse[1]=_.invert(this.mouse[0])),this.touch0&&h!=="touch"&&(this.touch0[1]=_.invert(this.touch0[0])),this.touch1&&h!=="touch"&&(this.touch1[1]=_.invert(this.touch1[0])),this.that.__zoom=_,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(h){var _=P(this.that).datum();s.call(h,this.that,new We(h,{sourceEvent:this.sourceEvent,target:d,type:h,transform:this.that.__zoom,dispatch:s}),_)}};function I(h,..._){if(!t.apply(this,arguments))return;var y=S(this,_).event(h),A=this.__zoom,x=Math.max(o[0],Math.min(o[1],A.k*Math.pow(2,r.apply(this,arguments)))),E=K(h);if(y.wheel)(y.mouse[0][0]!==E[0]||y.mouse[0][1]!==E[1])&&(y.mouse[1]=A.invert(y.mouse[0]=E)),clearTimeout(y.wheel);else{if(A.k===x)return;y.mouse=[E,A.invert(E)],ft(this),y.start()}At(h),y.wheel=setTimeout(b,w),y.zoom("mouse",n(B(v(A,x),y.mouse[0],y.mouse[1]),y.extent,i));function b(){y.wheel=null,y.end()}}function z(h,..._){if(c||!t.apply(this,arguments))return;var y=h.currentTarget,A=S(this,_,!0).event(h),x=P(h.view).on("mousemove.zoom",T,!0).on("mouseup.zoom",R,!0),E=K(h,y),b=h.clientX,N=h.clientY;It(h.view),Ee(h),A.mouse=[E,this.__zoom.invert(E)],ft(this),A.start();function T(k){if(At(k),!A.moved){var U=k.clientX-b,W=k.clientY-N;A.moved=U*U+W*W>F}A.event(k).zoom("mouse",n(B(A.that.__zoom,A.mouse[0]=K(k,y),A.mouse[1]),A.extent,i))}function R(k){x.on("mousemove.zoom mouseup.zoom",null),kt(k.view,A.moved),At(k),A.event(k).end()}}function L(h,..._){if(t.apply(this,arguments)){var y=this.__zoom,A=K(h.changedTouches?h.changedTouches[0]:h,this),x=y.invert(A),E=y.k*(h.shiftKey?.5:2),b=n(B(v(y,E),A,x),e.apply(this,_),i);At(h),a>0?P(this).transition().duration(a).call(C,b,A,h):P(this).call(d.transform,b,A,h)}}function X(h,..._){if(t.apply(this,arguments)){var y=h.touches,A=y.length,x=S(this,_,h.changedTouches.length===A).event(h),E,b,N,T;for(Ee(h),b=0;b<A;++b)N=y[b],T=K(N,this),T=[T,this.__zoom.invert(T),N.identifier],x.touch0?!x.touch1&&x.touch0[2]!==T[2]&&(x.touch1=T,x.taps=0):(x.touch0=T,E=!0,x.taps=1+!!f);f&&(f=clearTimeout(f)),E&&(x.taps<2&&(D=T[0],f=setTimeout(function(){f=null},p)),ft(this),x.start())}}function ht(h,..._){if(this.__zooming){var y=S(this,_).event(h),A=h.changedTouches,x=A.length,E,b,N,T;for(At(h),E=0;E<x;++E)b=A[E],N=K(b,this),y.touch0&&y.touch0[2]===b.identifier?y.touch0[0]=N:y.touch1&&y.touch1[2]===b.identifier&&(y.touch1[0]=N);if(b=y.that.__zoom,y.touch1){var R=y.touch0[0],k=y.touch0[1],U=y.touch1[0],W=y.touch1[1],Z=(Z=U[0]-R[0])*Z+(Z=U[1]-R[1])*Z,et=(et=W[0]-k[0])*et+(et=W[1]-k[1])*et;b=v(b,Math.sqrt(Z/et)),N=[(R[0]+U[0])/2,(R[1]+U[1])/2],T=[(k[0]+W[0])/2,(k[1]+W[1])/2]}else if(y.touch0)N=y.touch0[0],T=y.touch0[1];else return;y.zoom("touch",n(B(b,N,T),y.extent,i))}}function pt(h,..._){if(this.__zooming){var y=S(this,_).event(h),A=h.changedTouches,x=A.length,E,b;for(Ee(h),c&&clearTimeout(c),c=setTimeout(function(){c=null},p),E=0;E<x;++E)b=A[E],y.touch0&&y.touch0[2]===b.identifier?delete y.touch0:y.touch1&&y.touch1[2]===b.identifier&&delete y.touch1;if(y.touch1&&!y.touch0&&(y.touch0=y.touch1,delete y.touch1),y.touch0)y.touch0[1]=this.__zoom.invert(y.touch0[0]);else if(y.end(),y.taps===2&&(b=K(b,this),Math.hypot(D[0]-b[0],D[1]-b[1])<g)){var N=P(this).on("dblclick.zoom");N&&N.apply(this,arguments)}}}return d.wheelDelta=function(h){return arguments.length?(r=typeof h=="function"?h:Kt(+h),d):r},d.filter=function(h){return arguments.length?(t=typeof h=="function"?h:Kt(!!h),d):t},d.touchable=function(h){return arguments.length?(u=typeof h=="function"?h:Kt(!!h),d):u},d.extent=function(h){return arguments.length?(e=typeof h=="function"?h:Kt([[+h[0][0],+h[0][1]],[+h[1][0],+h[1][1]]]),d):e},d.scaleExtent=function(h){return arguments.length?(o[0]=+h[0],o[1]=+h[1],d):[o[0],o[1]]},d.translateExtent=function(h){return arguments.length?(i[0][0]=+h[0][0],i[1][0]=+h[1][0],i[0][1]=+h[0][1],i[1][1]=+h[1][1],d):[[i[0][0],i[0][1]],[i[1][0],i[1][1]]]},d.constrain=function(h){return arguments.length?(n=h,d):n},d.duration=function(h){return arguments.length?(a=+h,d):a},d.interpolate=function(h){return arguments.length?(l=h,d):l},d.on=function(){var h=s.on.apply(s,arguments);return h===s?d:h},d.clickDistance=function(h){return arguments.length?(F=(h=+h)*h,d):Math.sqrt(F)},d.tapDistance=function(h){return arguments.length?(g=+h,d):g},d}function fu(t,e){if(!t)return;function n(u){u.target===this&&(u.preventDefault(),e())}function r(u){u.key.startsWith("Esc")&&(u.preventDefault(),e())}t?.addEventListener("click",n),window.addCleanup(()=>t?.removeEventListener("click",n)),document.addEventListener("keydown",r),window.addCleanup(()=>document.removeEventListener("keydown",r))}function Qe(t){for(;t.firstChild;)t.removeChild(t.firstChild)}var Ip=Object.hasOwnProperty;var pu=bu(hu(),1),Lp=(0,pu.default)();function mu(t){return t.document.body.dataset.slug}function Zt(t){let e=ea(ta(t,"index"),!0);return e.length===0?"/":e}function Zo(t){let e=t.split("/").filter(n=>n!=="").slice(0,-1).map(n=>"..").join("/");return e.length===0&&(e="."),e}function du(t,e){return Jo(Zo(t),Zt(e))}function Jo(...t){return t.filter(e=>e!=="").join("/").replace(/\\/\\/+/g,"/")}function jo(t,e){return t===e||t.endsWith("/"+e)}function ta(t,e){return jo(t,e)&&(t=t.slice(0,-e.length)),t}function ea(t,e){return t.startsWith("/")&&(t=t.substring(1)),!e&&t.endsWith("/")&&(t=t.slice(0,-1)),t}var gu="graph-visited";function xu(){return new Set(JSON.parse(localStorage.getItem(gu)??"[]"))}function na(t){let e=xu();e.add(t),localStorage.setItem(gu,JSON.stringify([...e]))}async function Fu(t,e){let n=Zt(e),r=xu(),u=document.getElementById(t);if(!u)return;Qe(u);let{drag:o,zoom:i,depth:a,scale:l,repelForce:s,centerForce:f,linkDistance:D,fontSize:c,opacityScale:p,removeTags:w,showTags:F}=JSON.parse(u.dataset.cfg),g=new Map(Object.entries(await fetchData).map(([x,E])=>[Zt(x),E])),d=[],v=[],B=new Set(g.keys());for(let[x,E]of g.entries()){let b=E.links??[];for(let N of b)B.has(N)&&d.push({source:x,target:N});if(F){let N=E.tags.filter(T=>!w.includes(T)).map(T=>Zt("tags/"+T));v.push(...N.filter(T=>!v.includes(T)));for(let T of N)d.push({source:x,target:T})}}let m=new Set,C=[n,"__SENTINEL"];if(a>=0)for(;a>=0&&C.length>0;){let x=C.shift();if(x==="__SENTINEL")a--,C.push("__SENTINEL");else{m.add(x);let E=d.filter(N=>N.source===x),b=d.filter(N=>N.target===x);C.push(...E.map(N=>N.target),...b.map(N=>N.source))}}else B.forEach(x=>m.add(x)),F&&v.forEach(x=>m.add(x));let S={nodes:[...m].map(x=>{let E=x.startsWith("tags/")?"#"+x.substring(5):g.get(x)?.title??x;return{id:x,text:E,tags:g.get(x)?.tags??[]}}),links:d.filter(x=>m.has(x.source)&&m.has(x.target))},M=Ye(S.nodes).force("charge",Ue().strength(-100*s)).force("link",Ve(S.links).id(x=>x.id).distance(D)).force("center",qe().strength(f)),I=Math.max(u.offsetHeight,250),z=u.offsetWidth,L=P("#"+t).append("svg").attr("width",z).attr("height",I).attr("viewBox",[-z/2/l,-I/2/l,z/l,I/l]),X=L.append("g").selectAll("line").data(S.links).join("line").attr("class","link").attr("stroke","var(--lightgray)").attr("stroke-width",1),ht=L.append("g").selectAll("g").data(S.nodes).enter().append("g"),pt=x=>x.id===n?"var(--secondary)":r.has(x.id)||x.id.startsWith("tags/")?"var(--tertiary)":"var(--gray)",h=x=>{function E(R,k){R.active||x.alphaTarget(1).restart(),k.fx=k.x,k.fy=k.y}function b(R,k){k.fx=R.x,k.fy=R.y}function N(R,k){R.active||x.alphaTarget(0),k.fx=null,k.fy=null}let T=()=>{};return Be().on("start",o?E:T).on("drag",o?b:T).on("end",o?N:T)};function _(x){let E=d.filter(b=>b.source.id===x.id||b.target.id===x.id).length;return 2+Math.sqrt(E)}let y=ht.append("circle").attr("class","node").attr("id",x=>x.id).attr("r",_).attr("fill",pt).style("cursor","pointer").on("click",(x,E)=>{let b=du(e,E.id);window.spaNavigate(new URL(b,window.location.toString()))}).on("mouseover",function(x,E){let b=g.get(n)?.links??[],N=Tt(".node").filter(W=>b.includes(W.id)),T=E.id,R=Tt(".link").filter(W=>W.source.id===T||W.target.id===T);N.transition().duration(200).attr("fill",pt),R.transition().duration(200).attr("stroke","var(--gray)").attr("stroke-width",1);let k=c*1.5,U=this.parentNode;P(U).raise().select("text").transition().duration(200).attr("opacityOld",P(U).select("text").style("opacity")).style("opacity",1).style("font-size",k+"em")}).on("mouseleave",function(x,E){let b=E.id;Tt(".link").filter(R=>R.source.id===b||R.target.id===b).transition().duration(200).attr("stroke","var(--lightgray)");let T=this.parentNode;P(T).select("text").transition().duration(200).style("opacity",P(T).select("text").attr("opacityOld")).style("font-size",c+"em")}).call(h(M)),A=ht.append("text").attr("dx",0).attr("dy",x=>-_(x)+"px").attr("text-anchor","middle").text(x=>x.text).style("opacity",(p-1)/3.75).style("pointer-events","none").style("font-size",c+"em").raise().call(h(M));i&&L.call(Ke().extent([[0,0],[z,I]]).scaleExtent([.25,4]).on("zoom",({transform:x})=>{X.attr("transform",x),y.attr("transform",x);let E=x.k*p,b=Math.max((E-1)/3.75,0);A.attr("transform",x).style("opacity",b)})),M.on("tick",()=>{X.attr("x1",x=>x.source.x).attr("y1",x=>x.source.y).attr("x2",x=>x.target.x).attr("y2",x=>x.target.y),y.attr("cx",x=>x.x).attr("cy",x=>x.y),A.attr("x",x=>x.x).attr("y",x=>x.y)})}function Du(){let t=mu(window),e=document.getElementById("global-graph-outer"),n=e?.closest(".sidebar");e?.classList.add("active"),n&&(n.style.zIndex="1"),Fu("global-graph-container",t);function r(){e?.classList.remove("active");let u=document.getElementById("global-graph-container");n&&(n.style.zIndex="unset"),u&&Qe(u)}fu(e,r)}document.addEventListener("nav",async t=>{let e=t.detail.url;na(e),await Fu("graph-container",e);let n=document.getElementById("global-graph-icon");n?.addEventListener("click",Du),window.addCleanup(()=>n?.removeEventListener("click",Du))});\n';var graph_default=`.graph > h3 {
  font-size: 1rem;
  margin: 0;
}
.graph > .graph-outer {
  border-radius: 5px;
  border: 1px solid var(--lightgray);
  box-sizing: border-box;
  height: 250px;
  margin: 0.5em 0;
  position: relative;
  overflow: hidden;
}
.graph > .graph-outer > #global-graph-icon {
  color: var(--dark);
  opacity: 0.5;
  width: 18px;
  height: 18px;
  position: absolute;
  padding: 0.2rem;
  margin: 0.3rem;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: transparent;
  transition: background-color 0.5s ease;
  cursor: pointer;
}
.graph > .graph-outer > #global-graph-icon:hover {
  background-color: var(--lightgray);
}
.graph > #global-graph-outer {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  backdrop-filter: blur(4px);
  display: none;
  overflow: hidden;
}
.graph > #global-graph-outer.active {
  display: inline-block;
}
.graph > #global-graph-outer > #global-graph-container {
  border: 1px solid var(--lightgray);
  background-color: var(--light);
  border-radius: 5px;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 60vh;
  width: 50vw;
}
@media all and (max-width: 1510px) {
  .graph > #global-graph-outer > #global-graph-container {
    width: 90%;
  }
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiZ3JhcGguc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHRTtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUNBO0VBQ0U7O0FBS047RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBWkY7SUFhSSIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuXG4uZ3JhcGgge1xuICAmID4gaDMge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAmID4gLmdyYXBoLW91dGVyIHtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGhlaWdodDogMjUwcHg7XG4gICAgbWFyZ2luOiAwLjVlbSAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgJiA+ICNnbG9iYWwtZ3JhcGgtaWNvbiB7XG4gICAgICBjb2xvcjogdmFyKC0tZGFyayk7XG4gICAgICBvcGFjaXR5OiAwLjU7XG4gICAgICB3aWR0aDogMThweDtcbiAgICAgIGhlaWdodDogMThweDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHBhZGRpbmc6IDAuMnJlbTtcbiAgICAgIG1hcmdpbjogMC4zcmVtO1xuICAgICAgdG9wOiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0Z3JheSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJiA+ICNnbG9iYWwtZ3JhcGgtb3V0ZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiA5OTk5O1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDRweCk7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgJi5hY3RpdmUge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cblxuICAgICYgPiAjZ2xvYmFsLWdyYXBoLWNvbnRhaW5lciB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICBoZWlnaHQ6IDYwdmg7XG4gICAgICB3aWR0aDogNTB2dztcblxuICAgICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ== */`;import{jsx as jsx23,jsxs as jsxs12}from"preact/jsx-runtime";var defaultOptions11={localGraph:{drag:!0,zoom:!0,depth:1,scale:1.1,repelForce:.5,centerForce:.3,linkDistance:30,fontSize:.6,opacityScale:1,showTags:!0,removeTags:[]},globalGraph:{drag:!0,zoom:!0,depth:-1,scale:.9,repelForce:.5,centerForce:.3,linkDistance:30,fontSize:.6,opacityScale:1,showTags:!0,removeTags:[]}},Graph_default=__name(opts=>{function Graph({displayClass,cfg}){let localGraph={...defaultOptions11.localGraph,...opts?.localGraph},globalGraph={...defaultOptions11.globalGraph,...opts?.globalGraph};return jsxs12("div",{class:classNames(displayClass,"graph"),children:[jsx23("h3",{children:i18n(cfg.locale,"graph.graphView")}),jsxs12("div",{class:"graph-outer",children:[jsx23("div",{id:"graph-container","data-cfg":JSON.stringify(localGraph)}),jsx23("svg",{version:"1.1",id:"global-graph-icon",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 55 55",fill:"currentColor",xmlSpace:"preserve",children:jsx23("path",{d:`M49,0c-3.309,0-6,2.691-6,6c0,1.035,0.263,2.009,0.726,2.86l-9.829,9.829C32.542,17.634,30.846,17,29,17
	s-3.542,0.634-4.898,1.688l-7.669-7.669C16.785,10.424,17,9.74,17,9c0-2.206-1.794-4-4-4S9,6.794,9,9s1.794,4,4,4
	c0.74,0,1.424-0.215,2.019-0.567l7.669,7.669C21.634,21.458,21,23.154,21,25s0.634,3.542,1.688,4.897L10.024,42.562
	C8.958,41.595,7.549,41,6,41c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6c0-1.035-0.263-2.009-0.726-2.86l12.829-12.829
	c1.106,0.86,2.44,1.436,3.898,1.619v10.16c-2.833,0.478-5,2.942-5,5.91c0,3.309,2.691,6,6,6s6-2.691,6-6c0-2.967-2.167-5.431-5-5.91
	v-10.16c1.458-0.183,2.792-0.759,3.898-1.619l7.669,7.669C41.215,39.576,41,40.26,41,41c0,2.206,1.794,4,4,4s4-1.794,4-4
	s-1.794-4-4-4c-0.74,0-1.424,0.215-2.019,0.567l-7.669-7.669C36.366,28.542,37,26.846,37,25s-0.634-3.542-1.688-4.897l9.665-9.665
	C46.042,11.405,47.451,12,49,12c3.309,0,6-2.691,6-6S52.309,0,49,0z M11,9c0-1.103,0.897-2,2-2s2,0.897,2,2s-0.897,2-2,2
	S11,10.103,11,9z M6,51c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S8.206,51,6,51z M33,49c0,2.206-1.794,4-4,4s-4-1.794-4-4
	s1.794-4,4-4S33,46.794,33,49z M29,31c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S32.309,31,29,31z M47,41c0,1.103-0.897,2-2,2
	s-2-0.897-2-2s0.897-2,2-2S47,39.897,47,41z M49,10c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S51.206,10,49,10z`})})]}),jsx23("div",{id:"global-graph-outer",children:jsx23("div",{id:"global-graph-container","data-cfg":JSON.stringify(globalGraph)})})]})}return __name(Graph,"Graph"),Graph.css=graph_default,Graph.afterDOMLoaded=graph_inline_default,Graph},"default");var backlinks_default=`.backlinks {
  position: relative;
}
.backlinks > h3 {
  font-size: 1rem;
  margin: 0;
}
.backlinks > ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}
.backlinks > ul > li > a {
  background-color: transparent;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiYmFja2xpbmtzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTs7QUFFQTtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBR0U7RUFDRSIsInNvdXJjZXNDb250ZW50IjpbIi5iYWNrbGlua3Mge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJiA+IGgzIHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgJiA+IHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbWFyZ2luOiAwLjVyZW0gMDtcblxuICAgICYgPiBsaSB7XG4gICAgICAmID4gYSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19 */`;import{jsx as jsx24,jsxs as jsxs13}from"preact/jsx-runtime";function Backlinks({fileData,allFiles,displayClass,cfg}){let slug=simplifySlug(fileData.slug),backlinkFiles=allFiles.filter(file=>file.links?.includes(slug));return jsxs13("div",{class:classNames(displayClass,"backlinks"),children:[jsx24("h3",{children:i18n(cfg.locale,"backlinks.backlinks")}),jsx24("ul",{class:"overflow",children:backlinkFiles.length>0?backlinkFiles.map(f=>jsx24("li",{children:jsx24("a",{href:resolveRelative(fileData.slug,f.slug),class:"internal",children:f.frontmatter?.title})})):jsx24("li",{children:i18n(cfg.locale,"backlinks.noBlacklinksFound")})})]})}__name(Backlinks,"Backlinks");Backlinks.css=backlinks_default;var Backlinks_default=__name(()=>Backlinks,"default");var search_default=`.search {
  min-width: fit-content;
  max-width: 14rem;
  flex-grow: 0.3;
}
.search > #search-icon {
  background-color: var(--lightgray);
  border-radius: 4px;
  height: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
}
.search > #search-icon > div {
  flex-grow: 1;
}
.search > #search-icon > p {
  display: inline;
  padding: 0 1rem;
}
.search > #search-icon svg {
  cursor: pointer;
  width: 18px;
  min-width: 18px;
  margin: 0 0.5rem;
}
.search > #search-icon svg .search-path {
  stroke: var(--darkgray);
  stroke-width: 2px;
  transition: stroke 0.5s ease;
}
.search > #search-container {
  position: fixed;
  contain: layout;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: none;
  backdrop-filter: blur(4px);
}
.search > #search-container.active {
  display: inline-block;
}
.search > #search-container > #search-space {
  width: 65%;
  margin-top: 12vh;
  margin-left: auto;
  margin-right: auto;
}
.search > #search-container > #search-space > * {
  width: 100%;
  border-radius: 7px;
  background: var(--light);
  box-shadow: 0 14px 50px rgba(27, 33, 48, 0.12), 0 10px 30px rgba(27, 33, 48, 0.16);
  margin-bottom: 2em;
}
.search > #search-container > #search-space > input {
  box-sizing: border-box;
  padding: 0.5em 1em;
  font-family: var(--bodyFont);
  color: var(--dark);
  font-size: 1.1em;
  border: 1px solid var(--lightgray);
}
.search > #search-container > #search-space > input:focus {
  outline: none;
}
.search > #search-container > #search-space > #search-layout {
  display: none;
  flex-direction: row;
  border: 1px solid var(--lightgray);
  flex: 0 0 100%;
  box-sizing: border-box;
}
.search > #search-container > #search-space > #search-layout.display-results {
  display: flex;
}
.search > #search-container > #search-space > #search-layout[data-preview] > #results-container {
  flex: 0 0 min(30%, 450px);
}
@media all and (min-width: 1000px) {
  .search > #search-container > #search-space > #search-layout[data-preview] .result-card > p.preview {
    display: none;
  }
  .search > #search-container > #search-space > #search-layout[data-preview] > div:first-child {
    border-right: 1px solid var(--lightgray);
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
  }
  .search > #search-container > #search-space > #search-layout[data-preview] > div:last-child {
    border-top-left-radius: unset;
    border-bottom-left-radius: unset;
  }
}
.search > #search-container > #search-space > #search-layout > div {
  height: 63vh;
  border-radius: 5px;
}
@media all and (max-width: 1000px) {
  .search > #search-container > #search-space > #search-layout > #preview-container {
    display: none !important;
  }
  .search > #search-container > #search-space > #search-layout[data-preview] > #results-container {
    width: 100%;
    height: auto;
    flex: 0 0 100%;
  }
}
.search > #search-container > #search-space > #search-layout .highlight {
  background: color-mix(in srgb, var(--tertiary) 60%, rgba(255, 255, 255, 0));
  border-radius: 5px;
  scroll-margin-top: 2rem;
}
.search > #search-container > #search-space > #search-layout > #preview-container {
  display: block;
  overflow: hidden;
  font-family: inherit;
  color: var(--dark);
  line-height: 1.5em;
  font-weight: 400;
  overflow-y: auto;
  padding: 0 2rem;
}
.search > #search-container > #search-space > #search-layout > #preview-container .preview-inner {
  margin: 0 auto;
  width: min(750px, 100%);
}
.search > #search-container > #search-space > #search-layout > #results-container {
  overflow-y: auto;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card {
  overflow: hidden;
  padding: 1em;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid var(--lightgray);
  width: 100%;
  display: block;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  text-transform: none;
  text-align: left;
  outline: none;
  font-weight: inherit;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card:hover, .search > #search-container > #search-space > #search-layout > #results-container .result-card:focus, .search > #search-container > #search-space > #search-layout > #results-container .result-card.focus {
  background: var(--lightgray);
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > h3 {
  margin: 0;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > ul.tags {
  margin-top: 0.45rem;
  margin-bottom: 0;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > ul > li > p {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
  line-height: 1.4rem;
  font-weight: 700;
  color: var(--secondary);
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > ul > li > p.match-tag {
  color: var(--tertiary);
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > p {
  margin-bottom: 0;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsic2VhcmNoLnNjc3MiLCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBOztBQUtOO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBO0VBQ0EsWUFDRTtFQUVGOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7O0FBSUo7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7O0FBR0Y7RUFDRTs7QUFHRjtFQUVJO0lBQ0U7O0VBSUE7SUFDRTtJQUNBO0lBQ0E7O0VBR0Y7SUFDRTtJQUNBOzs7QUFNUjtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtJQUNFOztFQUdGO0lBQ0U7SUFDQTtJQUNBOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxhQzlJSztFRCtJTDtFQUNBOztBQUVBO0VBQ0U7RUFDQTs7QUFJSjtFQUNFOztBQUVBO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUdBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFHRTs7QUFHRjtFQUNFOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxhQ3JNRDtFRHNNQzs7QUFFQTtFQUNFOztBQUlKO0VBQ0UiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlIFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcblxuLnNlYXJjaCB7XG4gIG1pbi13aWR0aDogZml0LWNvbnRlbnQ7XG4gIG1heC13aWR0aDogMTRyZW07XG4gIGZsZXgtZ3JvdzogMC4zO1xuXG4gICYgPiAjc2VhcmNoLWljb24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0Z3JheSk7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGhlaWdodDogMnJlbTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgICAmID4gZGl2IHtcbiAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICB9XG5cbiAgICAmID4gcCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgfVxuXG4gICAgJiBzdmcge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgd2lkdGg6IDE4cHg7XG4gICAgICBtaW4td2lkdGg6IDE4cHg7XG4gICAgICBtYXJnaW46IDAgMC41cmVtO1xuXG4gICAgICAuc2VhcmNoLXBhdGgge1xuICAgICAgICBzdHJva2U6IHZhcigtLWRhcmtncmF5KTtcbiAgICAgICAgc3Ryb2tlLXdpZHRoOiAycHg7XG4gICAgICAgIHRyYW5zaXRpb246IHN0cm9rZSAwLjVzIGVhc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJiA+ICNzZWFyY2gtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgY29udGFpbjogbGF5b3V0O1xuICAgIHotaW5kZXg6IDk5OTtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDRweCk7XG5cbiAgICAmLmFjdGl2ZSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuXG4gICAgJiA+ICNzZWFyY2gtc3BhY2Uge1xuICAgICAgd2lkdGg6IDY1JTtcbiAgICAgIG1hcmdpbi10b3A6IDEydmg7XG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcblxuICAgICAgJiA+ICoge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogN3B4O1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1saWdodCk7XG4gICAgICAgIGJveC1zaGFkb3c6XG4gICAgICAgICAgMCAxNHB4IDUwcHggcmdiYSgyNywgMzMsIDQ4LCAwLjEyKSxcbiAgICAgICAgICAwIDEwcHggMzBweCByZ2JhKDI3LCAzMywgNDgsIDAuMTYpO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAyZW07XG4gICAgICB9XG5cbiAgICAgICYgPiBpbnB1dCB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHBhZGRpbmc6IDAuNWVtIDFlbTtcbiAgICAgICAgZm9udC1mYW1pbHk6IHZhcigtLWJvZHlGb250KTtcbiAgICAgICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgICAgICBmb250LXNpemU6IDEuMWVtO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuXG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJiA+ICNzZWFyY2gtbGF5b3V0IHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgICAgICAgZmxleDogMCAwIDEwMCU7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgICAgICAgJi5kaXNwbGF5LXJlc3VsdHMge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIH1cblxuICAgICAgICAmW2RhdGEtcHJldmlld10gPiAjcmVzdWx0cy1jb250YWluZXIge1xuICAgICAgICAgIGZsZXg6IDAgMCBtaW4oMzAlLCA0NTBweCk7XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEgYWxsIGFuZCAobWluLXdpZHRoOiAkdGFibGV0QnJlYWtwb2ludCkge1xuICAgICAgICAgICZbZGF0YS1wcmV2aWV3XSB7XG4gICAgICAgICAgICAmIC5yZXN1bHQtY2FyZCA+IHAucHJldmlldyB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYgPiBkaXYge1xuICAgICAgICAgICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuICAgICAgICAgICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiB1bnNldDtcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogdW5zZXQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IHVuc2V0O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IHVuc2V0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJiA+IGRpdiB7XG4gICAgICAgICAgaGVpZ2h0OiBjYWxjKDc1dmggLSAxMnZoKTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0QnJlYWtwb2ludCkge1xuICAgICAgICAgICYgPiAjcHJldmlldy1jb250YWluZXIge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgICZbZGF0YS1wcmV2aWV3XSA+ICNyZXN1bHRzLWNvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgICAgIGZsZXg6IDAgMCAxMDAlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYgLmhpZ2hsaWdodCB7XG4gICAgICAgICAgYmFja2dyb3VuZDogY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLXRlcnRpYXJ5KSA2MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCkpO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgICBzY3JvbGwtbWFyZ2luLXRvcDogMnJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgICYgPiAjcHJldmlldy1jb250YWluZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcbiAgICAgICAgICBmb250LXdlaWdodDogJG5vcm1hbFdlaWdodDtcbiAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgIHBhZGRpbmc6IDAgMnJlbTtcblxuICAgICAgICAgICYgLnByZXZpZXctaW5uZXIge1xuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICB3aWR0aDogbWluKCRwYWdlV2lkdGgsIDEwMCUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYgPiAjcmVzdWx0cy1jb250YWluZXIge1xuICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG5cbiAgICAgICAgICAmIC5yZXN1bHQtY2FyZCB7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgcGFkZGluZzogMWVtO1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzIGVhc2U7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgICAgICAgICAvLyBub3JtYWxpemUgY2FyZCBwcm9wc1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgICAgICAgICBmb250LXNpemU6IDEwMCU7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgICBmb250LXdlaWdodDogaW5oZXJpdDtcblxuICAgICAgICAgICAgJjpob3ZlcixcbiAgICAgICAgICAgICY6Zm9jdXMsXG4gICAgICAgICAgICAmLmZvY3VzIHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHRncmF5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJiA+IGgzIHtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmID4gdWwudGFncyB7XG4gICAgICAgICAgICAgIG1hcmdpbi10b3A6IDAuNDVyZW07XG4gICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYgPiB1bCA+IGxpID4gcCB7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGlnaGxpZ2h0KTtcbiAgICAgICAgICAgICAgcGFkZGluZzogMC4ycmVtIDAuNHJlbTtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwIDAuMXJlbTtcbiAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNHJlbTtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6ICRib2xkV2VpZ2h0O1xuICAgICAgICAgICAgICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcblxuICAgICAgICAgICAgICAmLm1hdGNoLXRhZyB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHZhcigtLXRlcnRpYXJ5KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmID4gcCB7XG4gICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIkcGFnZVdpZHRoOiA3NTBweDtcbiRtb2JpbGVCcmVha3BvaW50OiA2MDBweDtcbiR0YWJsZXRCcmVha3BvaW50OiAxMDAwcHg7XG4kc2lkZVBhbmVsV2lkdGg6IDM4MHB4O1xuJHRvcFNwYWNpbmc6IDZyZW07XG4kZnVsbFBhZ2VXaWR0aDogJHBhZ2VXaWR0aCArIDIgKiAkc2lkZVBhbmVsV2lkdGg7XG4kYm9sZFdlaWdodDogNzAwO1xuJG5vcm1hbFdlaWdodDogNDAwO1xuIl19 */`;var search_inline_default='var Ke=Object.create;var Fe=Object.defineProperty;var $e=Object.getOwnPropertyDescriptor;var Ge=Object.getOwnPropertyNames;var Je=Object.getPrototypeOf,Ve=Object.prototype.hasOwnProperty;var ce=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ze=(e,t,u,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ge(t))!Ve.call(e,n)&&n!==u&&Fe(e,n,{get:()=>t[n],enumerable:!(i=$e(t,n))||i.enumerable});return e};var Qe=(e,t,u)=>(u=e!=null?Ke(Je(e)):{},Ze(t||!e||!e.__esModule?Fe(u,"default",{value:e,enumerable:!0}):u,e));var fe=ce(()=>{});var Ie=ce((Ut,je)=>{"use strict";je.exports=Et;function _(e){return e instanceof Buffer?Buffer.from(e):new e.constructor(e.buffer.slice(),e.byteOffset,e.length)}function Et(e){if(e=e||{},e.circles)return gt(e);return e.proto?i:u;function t(n,s){for(var l=Object.keys(n),r=new Array(l.length),D=0;D<l.length;D++){var o=l[D],F=n[o];typeof F!="object"||F===null?r[o]=F:F instanceof Date?r[o]=new Date(F):ArrayBuffer.isView(F)?r[o]=_(F):r[o]=s(F)}return r}function u(n){if(typeof n!="object"||n===null)return n;if(n instanceof Date)return new Date(n);if(Array.isArray(n))return t(n,u);if(n instanceof Map)return new Map(t(Array.from(n),u));if(n instanceof Set)return new Set(t(Array.from(n),u));var s={};for(var l in n)if(Object.hasOwnProperty.call(n,l)!==!1){var r=n[l];typeof r!="object"||r===null?s[l]=r:r instanceof Date?s[l]=new Date(r):r instanceof Map?s[l]=new Map(t(Array.from(r),u)):r instanceof Set?s[l]=new Set(t(Array.from(r),u)):ArrayBuffer.isView(r)?s[l]=_(r):s[l]=u(r)}return s}function i(n){if(typeof n!="object"||n===null)return n;if(n instanceof Date)return new Date(n);if(Array.isArray(n))return t(n,i);if(n instanceof Map)return new Map(t(Array.from(n),i));if(n instanceof Set)return new Set(t(Array.from(n),i));var s={};for(var l in n){var r=n[l];typeof r!="object"||r===null?s[l]=r:r instanceof Date?s[l]=new Date(r):r instanceof Map?s[l]=new Map(t(Array.from(r),i)):r instanceof Set?s[l]=new Set(t(Array.from(r),i)):ArrayBuffer.isView(r)?s[l]=_(r):s[l]=i(r)}return s}}function gt(e){var t=[],u=[];return e.proto?s:n;function i(l,r){for(var D=Object.keys(l),o=new Array(D.length),F=0;F<D.length;F++){var E=D[F],f=l[E];if(typeof f!="object"||f===null)o[E]=f;else if(f instanceof Date)o[E]=new Date(f);else if(ArrayBuffer.isView(f))o[E]=_(f);else{var h=t.indexOf(f);h!==-1?o[E]=u[h]:o[E]=r(f)}}return o}function n(l){if(typeof l!="object"||l===null)return l;if(l instanceof Date)return new Date(l);if(Array.isArray(l))return i(l,n);if(l instanceof Map)return new Map(i(Array.from(l),n));if(l instanceof Set)return new Set(i(Array.from(l),n));var r={};t.push(l),u.push(r);for(var D in l)if(Object.hasOwnProperty.call(l,D)!==!1){var o=l[D];if(typeof o!="object"||o===null)r[D]=o;else if(o instanceof Date)r[D]=new Date(o);else if(o instanceof Map)r[D]=new Map(i(Array.from(o),n));else if(o instanceof Set)r[D]=new Set(i(Array.from(o),n));else if(ArrayBuffer.isView(o))r[D]=_(o);else{var F=t.indexOf(o);F!==-1?r[D]=u[F]:r[D]=n(o)}}return t.pop(),u.pop(),r}function s(l){if(typeof l!="object"||l===null)return l;if(l instanceof Date)return new Date(l);if(Array.isArray(l))return i(l,s);if(l instanceof Map)return new Map(i(Array.from(l),s));if(l instanceof Set)return new Set(i(Array.from(l),s));var r={};t.push(l),u.push(r);for(var D in l){var o=l[D];if(typeof o!="object"||o===null)r[D]=o;else if(o instanceof Date)r[D]=new Date(o);else if(o instanceof Map)r[D]=new Map(i(Array.from(o),s));else if(o instanceof Set)r[D]=new Set(i(Array.from(o),s));else if(ArrayBuffer.isView(o))r[D]=_(o);else{var F=t.indexOf(o);F!==-1?r[D]=u[F]:r[D]=s(o)}}return t.pop(),u.pop(),r}}});var m;function Y(e){return typeof e<"u"?e:!0}function he(e){let t=Array(e);for(let u=0;u<e;u++)t[u]=p();return t}function p(){return Object.create(null)}function Xe(e,t){return t.length-e.length}function v(e){return typeof e=="string"}function k(e){return typeof e=="object"}function le(e){return typeof e=="function"}function de(e,t){var u=Ye;if(e&&(t&&(e=b(e,t)),this.H&&(e=b(e,this.H)),this.J&&1<e.length&&(e=b(e,this.J)),u||u==="")){if(t=e.split(u),this.filter){e=this.filter,u=t.length;let i=[];for(let n=0,s=0;n<u;n++){let l=t[n];l&&!e[l]&&(i[s++]=l)}e=i}else e=t;return e}return e}var Ye=/[\\p{Z}\\p{S}\\p{P}\\p{C}]+/u,be=/[\\u0300-\\u036f]/g;function ae(e,t){let u=Object.keys(e),i=u.length,n=[],s="",l=0;for(let r=0,D,o;r<i;r++)D=u[r],(o=e[D])?(n[l++]=B(t?"(?!\\\\b)"+D+"(\\\\b|_)":D),n[l++]=o):s+=(s?"|":"")+D;return s&&(n[l++]=B(t?"(?!\\\\b)("+s+")(\\\\b|_)":"("+s+")"),n[l]=""),n}function b(e,t){for(let u=0,i=t.length;u<i&&(e=e.replace(t[u],t[u+1]),e);u+=2);return e}function B(e){return new RegExp(e,"g")}function pe(e){let t="",u="";for(let i=0,n=e.length,s;i<n;i++)(s=e[i])!==u&&(t+=u=s);return t}var et={encode:me,F:!1,G:""};function me(e){return de.call(this,(""+e).toLowerCase(),!1)}var Be={},j={};function ye(e){q(e,"add"),q(e,"append"),q(e,"search"),q(e,"update"),q(e,"remove")}function q(e,t){e[t+"Async"]=function(){let u=this,i=arguments;var n=i[i.length-1];let s;return le(n)&&(s=n,delete i[i.length-1]),n=new Promise(function(l){setTimeout(function(){u.async=!0;let r=u[t].apply(u,i);u.async=!1,l(r)})}),s?(n.then(s),this):n}}function we(e,t,u,i){let n=e.length,s=[],l,r,D=0;i&&(i=[]);for(let o=n-1;0<=o;o--){let F=e[o],E=F.length,f=p(),h=!l;for(let c=0;c<E;c++){let g=F[c],d=g.length;if(d)for(let S=0,x,w;S<d;S++)if(w=g[S],l){if(l[w]){if(!o){if(u)u--;else if(s[D++]=w,D===t)return s}(o||i)&&(f[w]=1),h=!0}if(i&&(x=(r[w]||0)+1,r[w]=x,x<n)){let R=i[x-2]||(i[x-2]=[]);R[R.length]=w}}else f[w]=1}if(i)l||(r=f);else if(!h)return[];l=f}if(i)for(let o=i.length-1,F,E;0<=o;o--){F=i[o],E=F.length;for(let f=0,h;f<E;f++)if(h=F[f],!l[h]){if(u)u--;else if(s[D++]=h,D===t)return s;l[h]=1}}return s}function tt(e,t){let u=p(),i=p(),n=[];for(let s=0;s<e.length;s++)u[e[s]]=1;for(let s=0,l;s<t.length;s++){l=t[s];for(let r=0,D;r<l.length;r++)D=l[r],u[D]&&!i[D]&&(i[D]=1,n[n.length]=D)}return n}function te(e){this.l=e!==!0&&e,this.cache=p(),this.h=[]}function ve(e,t,u){k(e)&&(e=e.query);let i=this.cache.get(e);return i||(i=this.search(e,t,u),this.cache.set(e,i)),i}te.prototype.set=function(e,t){if(!this.cache[e]){var u=this.h.length;for(u===this.l?delete this.cache[this.h[u-1]]:u++,--u;0<u;u--)this.h[u]=this.h[u-1];this.h[0]=e}this.cache[e]=t};te.prototype.get=function(e){let t=this.cache[e];if(this.l&&t&&(e=this.h.indexOf(e))){let u=this.h[e-1];this.h[e-1]=this.h[e],this.h[e]=u}return t};var ut={memory:{charset:"latin:extra",D:3,B:4,m:!1},performance:{D:3,B:3,s:!1,context:{depth:2,D:1}},match:{charset:"latin:extra",G:"reverse"},score:{charset:"latin:advanced",D:20,B:3,context:{depth:3,D:9}},default:{}};function xe(e,t,u,i,n,s,l,r){setTimeout(function(){let D=e(u?u+"."+i:i,JSON.stringify(l));D&&D.then?D.then(function(){t.export(e,t,u,n,s+1,r)}):t.export(e,t,u,n,s+1,r)})}function H(e,t){if(!(this instanceof H))return new H(e);var u;if(e){v(e)?e=ut[e]:(u=e.preset)&&(e=Object.assign({},u[u],e)),u=e.charset;var i=e.lang;v(u)&&(u.indexOf(":")===-1&&(u+=":default"),u=j[u]),v(i)&&(i=Be[i])}else e={};let n,s,l=e.context||{};if(this.encode=e.encode||u&&u.encode||me,this.register=t||p(),this.D=n=e.resolution||9,this.G=t=u&&u.G||e.tokenize||"strict",this.depth=t==="strict"&&l.depth,this.l=Y(l.bidirectional),this.s=s=Y(e.optimize),this.m=Y(e.fastupdate),this.B=e.minlength||1,this.C=e.boost,this.map=s?he(n):p(),this.A=n=l.resolution||1,this.h=s?he(n):p(),this.F=u&&u.F||e.rtl,this.H=(t=e.matcher||i&&i.H)&&ae(t,!1),this.J=(t=e.stemmer||i&&i.J)&&ae(t,!0),u=t=e.filter||i&&i.filter){u=t,i=p();for(let r=0,D=u.length;r<D;r++)i[u[r]]=1;u=i}this.filter=u,this.cache=(t=e.cache)&&new te(t)}m=H.prototype;m.append=function(e,t){return this.add(e,t,!0)};m.add=function(e,t,u,i){if(t&&(e||e===0)){if(!i&&!u&&this.register[e])return this.update(e,t);if(t=this.encode(t),i=t.length){let o=p(),F=p(),E=this.depth,f=this.D;for(let h=0;h<i;h++){let c=t[this.F?i-1-h:h];var n=c.length;if(c&&n>=this.B&&(E||!F[c])){var s=Q(f,i,h),l="";switch(this.G){case"full":if(2<n){for(s=0;s<n;s++)for(var r=n;r>s;r--)if(r-s>=this.B){var D=Q(f,i,h,n,s);l=c.substring(s,r),K(this,F,l,D,e,u)}break}case"reverse":if(1<n){for(r=n-1;0<r;r--)l=c[r]+l,l.length>=this.B&&K(this,F,l,Q(f,i,h,n,r),e,u);l=""}case"forward":if(1<n){for(r=0;r<n;r++)l+=c[r],l.length>=this.B&&K(this,F,l,s,e,u);break}default:if(this.C&&(s=Math.min(s/this.C(t,c,h)|0,f-1)),K(this,F,c,s,e,u),E&&1<i&&h<i-1){for(n=p(),l=this.A,s=c,r=Math.min(E+1,i-h),n[s]=1,D=1;D<r;D++)if((c=t[this.F?i-1-h-D:h+D])&&c.length>=this.B&&!n[c]){n[c]=1;let g=this.l&&c>s;K(this,o,g?s:c,Q(l+(i/2>l?0:1),i,h,r-1,D-1),e,u,g?c:s)}}}}}this.m||(this.register[e]=1)}}return this};function Q(e,t,u,i,n){return u&&1<e?t+(i||0)<=e?u+(n||0):(e-1)/(t+(i||0))*(u+(n||0))+1|0:0}function K(e,t,u,i,n,s,l){let r=l?e.h:e.map;(!t[u]||l&&!t[u][l])&&(e.s&&(r=r[i]),l?(t=t[u]||(t[u]=p()),t[l]=1,r=r[l]||(r[l]=p())):t[u]=1,r=r[u]||(r[u]=[]),e.s||(r=r[i]||(r[i]=[])),s&&r.includes(n)||(r[r.length]=n,e.m&&(e=e.register[n]||(e.register[n]=[]),e[e.length]=r)))}m.search=function(e,t,u){u||(!t&&k(e)?(u=e,e=u.query):k(t)&&(u=t));let i=[],n,s,l=0;if(u){e=u.query||e,t=u.limit,l=u.offset||0;var r=u.context;s=u.suggest}if(e&&(e=this.encode(""+e),n=e.length,1<n)){u=p();var D=[];for(let F=0,E=0,f;F<n;F++)if((f=e[F])&&f.length>=this.B&&!u[f])if(this.s||s||this.map[f])D[E++]=f,u[f]=1;else return i;e=D,n=e.length}if(!n)return i;t||(t=100),r=this.depth&&1<n&&r!==!1,u=0;let o;r?(o=e[0],u=1):1<n&&e.sort(Xe);for(let F,E;u<n;u++){if(E=e[u],r?(F=Ee(this,i,s,t,l,n===2,E,o),s&&F===!1&&i.length||(o=E)):F=Ee(this,i,s,t,l,n===1,E),F)return F;if(s&&u===n-1){if(D=i.length,!D){if(r){r=0,u=-1;continue}return i}if(D===1)return Se(i[0],t,l)}}return we(i,t,l,s)};function Ee(e,t,u,i,n,s,l,r){let D=[],o=r?e.h:e.map;if(e.s||(o=ge(o,l,r,e.l)),o){let F=0,E=Math.min(o.length,r?e.A:e.D);for(let f=0,h=0,c,g;f<E&&!((c=o[f])&&(e.s&&(c=ge(c,l,r,e.l)),n&&c&&s&&(g=c.length,g<=n?(n-=g,c=null):(c=c.slice(n),n=0)),c&&(D[F++]=c,s&&(h+=c.length,h>=i))));f++);if(F){if(s)return Se(D,i,0);t[t.length]=D;return}}return!u&&D}function Se(e,t,u){return e=e.length===1?e[0]:[].concat.apply([],e),u||e.length>t?e.slice(u,u+t):e}function ge(e,t,u,i){return u?(i=i&&t>u,e=(e=e[i?t:u])&&e[i?u:t]):e=e[t],e}m.contain=function(e){return!!this.register[e]};m.update=function(e,t){return this.remove(e).add(e,t)};m.remove=function(e,t){let u=this.register[e];if(u){if(this.m)for(let i=0,n;i<u.length;i++)n=u[i],n.splice(n.indexOf(e),1);else ee(this.map,e,this.D,this.s),this.depth&&ee(this.h,e,this.A,this.s);if(t||delete this.register[e],this.cache){t=this.cache;for(let i=0,n,s;i<t.h.length;i++)s=t.h[i],n=t.cache[s],n.includes(e)&&(t.h.splice(i--,1),delete t.cache[s])}}return this};function ee(e,t,u,i,n){let s=0;if(e.constructor===Array)if(n)t=e.indexOf(t),t!==-1?1<e.length&&(e.splice(t,1),s++):s++;else{n=Math.min(e.length,u);for(let l=0,r;l<n;l++)(r=e[l])&&(s=ee(r,t,u,i,n),i||s||delete e[l])}else for(let l in e)(s=ee(e[l],t,u,i,n))||delete e[l];return s}m.searchCache=ve;m.export=function(e,t,u,i,n,s){let l=!0;typeof s>"u"&&(l=new Promise(o=>{s=o}));let r,D;switch(n||(n=0)){case 0:if(r="reg",this.m){D=p();for(let o in this.register)D[o]=1}else D=this.register;break;case 1:r="cfg",D={doc:0,opt:this.s?1:0};break;case 2:r="map",D=this.map;break;case 3:r="ctx",D=this.h;break;default:typeof u>"u"&&s&&s();return}return xe(e,t||this,u,r,i,n,D,s),l};m.import=function(e,t){if(t)switch(v(t)&&(t=JSON.parse(t)),e){case"cfg":this.s=!!t.opt;break;case"reg":this.m=!1,this.register=t;break;case"map":this.map=t;break;case"ctx":this.h=t}};ye(H.prototype);function nt(e){e=e.data;var t=self._index;let u=e.args;var i=e.task;switch(i){case"init":i=e.options||{},e=e.factory,t=i.encode,i.cache=!1,t&&t.indexOf("function")===0&&(i.encode=Function("return "+t)()),e?(Function("return "+e)()(self),self._index=new self.FlexSearch.Index(i),delete self.FlexSearch):self._index=new H(i);break;default:e=e.id,t=t[i].apply(t,u),postMessage(i==="search"?{id:e,msg:t}:{id:e})}}var Ce=0;function W(e){if(!(this instanceof W))return new W(e);var t;e?le(t=e.encode)&&(e.encode=t.toString()):e={},(t=(self||window)._factory)&&(t=t.toString());let u=typeof window>"u"&&self.exports,i=this;this.o=it(t,u,e.worker),this.h=p(),this.o&&(u?this.o.on("message",function(n){i.h[n.id](n.msg),delete i.h[n.id]}):this.o.onmessage=function(n){n=n.data,i.h[n.id](n.msg),delete i.h[n.id]},this.o.postMessage({task:"init",factory:t,options:e}))}G("add");G("append");G("search");G("update");G("remove");function G(e){W.prototype[e]=W.prototype[e+"Async"]=function(){let t=this,u=[].slice.call(arguments);var i=u[u.length-1];let n;return le(i)&&(n=i,u.splice(u.length-1,1)),i=new Promise(function(s){setTimeout(function(){t.h[++Ce]=s,t.o.postMessage({task:e,id:Ce,args:u})})}),n?(i.then(n),this):i}}function it(e,t,u){let i;try{i=t?new(fe()).Worker(__dirname+"/node/node.js"):e?new Worker(URL.createObjectURL(new Blob(["onmessage="+nt.toString()],{type:"text/javascript"}))):new Worker(v(u)?u:"worker/worker.js",{type:"module"})}catch{}return i}function $(e){if(!(this instanceof $))return new $(e);var t=e.document||e.doc||e,u;this.K=[],this.h=[],this.A=[],this.register=p(),this.key=(u=t.key||t.id)&&X(u,this.A)||"id",this.m=Y(e.fastupdate),this.C=(u=t.store)&&u!==!0&&[],this.store=u&&p(),this.I=(u=t.tag)&&X(u,this.A),this.l=u&&p(),this.cache=(u=e.cache)&&new te(u),e.cache=!1,this.o=e.worker,this.async=!1,u=p();let i=t.index||t.field||t;v(i)&&(i=[i]);for(let n=0,s,l;n<i.length;n++)s=i[n],v(s)||(l=s,s=s.field),l=k(l)?Object.assign({},e,l):e,this.o&&(u[s]=new W(l),u[s].o||(this.o=!1)),this.o||(u[s]=new H(l,this.register)),this.K[n]=X(s,this.A),this.h[n]=s;if(this.C)for(e=t.store,v(e)&&(e=[e]),t=0;t<e.length;t++)this.C[t]=X(e[t],this.A);this.index=u}function X(e,t){let u=e.split(":"),i=0;for(let n=0;n<u.length;n++)e=u[n],0<=e.indexOf("[]")&&(e=e.substring(0,e.length-2))&&(t[i]=!0),e&&(u[i++]=e);return i<u.length&&(u.length=i),1<i?u:u[0]}function ie(e,t){if(v(t))e=e[t];else for(let u=0;e&&u<t.length;u++)e=e[t[u]];return e}function re(e,t,u,i,n){if(e=e[n],i===u.length-1)t[n]=e;else if(e)if(e.constructor===Array)for(t=t[n]=Array(e.length),n=0;n<e.length;n++)re(e,t,u,i,n);else t=t[n]||(t[n]=p()),n=u[++i],re(e,t,u,i,n)}function se(e,t,u,i,n,s,l,r){if(e=e[l])if(i===t.length-1){if(e.constructor===Array){if(u[i]){for(t=0;t<e.length;t++)n.add(s,e[t],!0,!0);return}e=e.join(" ")}n.add(s,e,r,!0)}else if(e.constructor===Array)for(l=0;l<e.length;l++)se(e,t,u,i,n,s,l,r);else l=t[++i],se(e,t,u,i,n,s,l,r)}m=$.prototype;m.add=function(e,t,u){if(k(e)&&(t=e,e=ie(t,this.key)),t&&(e||e===0)){if(!u&&this.register[e])return this.update(e,t);for(let i=0,n,s;i<this.h.length;i++)s=this.h[i],n=this.K[i],v(n)&&(n=[n]),se(t,n,this.A,0,this.index[s],e,n[0],u);if(this.I){let i=ie(t,this.I),n=p();v(i)&&(i=[i]);for(let s=0,l,r;s<i.length;s++)if(l=i[s],!n[l]&&(n[l]=1,r=this.l[l]||(this.l[l]=[]),!u||!r.includes(e))&&(r[r.length]=e,this.m)){let D=this.register[e]||(this.register[e]=[]);D[D.length]=r}}if(this.store&&(!u||!this.store[e])){let i;if(this.C){i=p();for(let n=0,s;n<this.C.length;n++)s=this.C[n],v(s)?i[s]=t[s]:re(t,i,s,0,s[0])}this.store[e]=i||t}}return this};m.append=function(e,t){return this.add(e,t,!0)};m.update=function(e,t){return this.remove(e).add(e,t)};m.remove=function(e){if(k(e)&&(e=ie(e,this.key)),this.register[e]){for(var t=0;t<this.h.length&&(this.index[this.h[t]].remove(e,!this.o),!this.m);t++);if(this.I&&!this.m)for(let u in this.l){t=this.l[u];let i=t.indexOf(e);i!==-1&&(1<t.length?t.splice(i,1):delete this.l[u])}this.store&&delete this.store[e],delete this.register[e]}return this};m.search=function(e,t,u,i){u||(!t&&k(e)?(u=e,e=""):k(t)&&(u=t,t=0));let n=[],s=[],l,r,D,o,F,E,f=0;if(u)if(u.constructor===Array)D=u,u=null;else{if(e=u.query||e,D=(l=u.pluck)||u.index||u.field,o=u.tag,r=this.store&&u.enrich,F=u.bool==="and",t=u.limit||t||100,E=u.offset||0,o&&(v(o)&&(o=[o]),!e)){for(let c=0,g;c<o.length;c++)(g=rt.call(this,o[c],t,E,r))&&(n[n.length]=g,f++);return f?n:[]}v(D)&&(D=[D])}D||(D=this.h),F=F&&(1<D.length||o&&1<o.length);let h=!i&&(this.o||this.async)&&[];for(let c=0,g,d,S;c<D.length;c++){let x;if(d=D[c],v(d)||(x=d,d=x.field,e=x.query||e,t=x.limit||t,r=x.enrich||r),h)h[c]=this.index[d].searchAsync(e,t,x||u);else{if(i?g=i[c]:g=this.index[d].search(e,t,x||u),S=g&&g.length,o&&S){let w=[],R=0;F&&(w[0]=[g]);for(let z=0,V,P;z<o.length;z++)V=o[z],(S=(P=this.l[V])&&P.length)&&(R++,w[w.length]=F?[P]:P);R&&(g=F?we(w,t||100,E||0):tt(g,w),S=g.length)}if(S)s[f]=d,n[f++]=g;else if(F)return[]}}if(h){let c=this;return new Promise(function(g){Promise.all(h).then(function(d){g(c.search(e,t,u,d))})})}if(!f)return[];if(l&&(!r||!this.store))return n[0];for(let c=0,g;c<s.length;c++){if(g=n[c],g.length&&r&&(g=Le.call(this,g)),l)return g;n[c]={field:s[c],result:g}}return n};function rt(e,t,u,i){let n=this.l[e],s=n&&n.length-u;if(s&&0<s)return(s>t||u)&&(n=n.slice(u,u+t)),i&&(n=Le.call(this,n)),{tag:e,result:n}}function Le(e){let t=Array(e.length);for(let u=0,i;u<e.length;u++)i=e[u],t[u]={id:i,doc:this.store[i]};return t}m.contain=function(e){return!!this.register[e]};m.get=function(e){return this.store[e]};m.set=function(e,t){return this.store[e]=t,this};m.searchCache=ve;m.export=function(e,t,u,i,n,s){let l;if(typeof s>"u"&&(l=new Promise(r=>{s=r})),n||(n=0),i||(i=0),i<this.h.length){let r=this.h[i],D=this.index[r];t=this,setTimeout(function(){D.export(e,t,n?r:"",i,n++,s)||(i++,n=1,t.export(e,t,r,i,n,s))})}else{let r,D;switch(n){case 1:r="tag",D=this.l,u=null;break;case 2:r="store",D=this.store,u=null;break;default:s();return}xe(e,this,u,r,i,n,D,s)}return l};m.import=function(e,t){if(t)switch(v(t)&&(t=JSON.parse(t)),e){case"tag":this.l=t;break;case"reg":this.m=!1,this.register=t;for(let i=0,n;i<this.h.length;i++)n=this.index[this.h[i]],n.register=t,n.m=!1;break;case"store":this.store=t;break;default:e=e.split(".");let u=e[0];e=e[1],u&&e&&this.index[u].import(e,t)}};ye($.prototype);var st={encode:Me,F:!1,G:""},lt=[B("[\\xE0\\xE1\\xE2\\xE3\\xE4\\xE5]"),"a",B("[\\xE8\\xE9\\xEA\\xEB]"),"e",B("[\\xEC\\xED\\xEE\\xEF]"),"i",B("[\\xF2\\xF3\\xF4\\xF5\\xF6\\u0151]"),"o",B("[\\xF9\\xFA\\xFB\\xFC\\u0171]"),"u",B("[\\xFD\\u0177\\xFF]"),"y",B("\\xF1"),"n",B("[\\xE7c]"),"k",B("\\xDF"),"s",B(" & ")," and "];function Me(e){var t=e=""+e;return t.normalize&&(t=t.normalize("NFD").replace(be,"")),de.call(this,t.toLowerCase(),!e.normalize&&lt)}var Dt={encode:Te,F:!1,G:"strict"},ot=/[^a-z0-9]+/,Ae={b:"p",v:"f",w:"f",z:"s",x:"s",\\u00DF:"s",d:"t",n:"m",c:"k",g:"k",j:"k",q:"k",i:"e",y:"e",u:"o"};function Te(e){e=Me.call(this,e).join(" ");let t=[];if(e){let u=e.split(ot),i=u.length;for(let n=0,s,l=0;n<i;n++)if((e=u[n])&&(!this.filter||!this.filter[e])){s=e[0];let r=Ae[s]||s,D=r;for(let o=1;o<e.length;o++){s=e[o];let F=Ae[s]||s;F&&F!==D&&(r+=F,D=F)}t[l++]=r}}return t}var Ft={encode:Re,F:!1,G:""},ct=[B("ae"),"a",B("oe"),"o",B("sh"),"s",B("th"),"t",B("ph"),"f",B("pf"),"f",B("(?![aeo])h(?![aeo])"),"",B("(?!^[aeo])h(?!^[aeo])"),""];function Re(e,t){return e&&(e=Te.call(this,e).join(" "),2<e.length&&(e=b(e,ct)),t||(1<e.length&&(e=pe(e)),e&&(e=e.split(" ")))),e||[]}var ft={encode:at,F:!1,G:""},ht=B("(?!\\\\b)[aeo]");function at(e){return e&&(e=Re.call(this,e,!0),1<e.length&&(e=e.replace(ht,"")),1<e.length&&(e=pe(e)),e&&(e=e.split(" "))),e||[]}j["latin:default"]=et;j["latin:simple"]=st;j["latin:balance"]=Dt;j["latin:advanced"]=Ft;j["latin:extra"]=ft;var ke={Index:H,Document:$,Worker:W,registerCharset:function(e,t){j[e]=t},registerLanguage:function(e,t){Be[e]=t}};function He(e,t){if(!e)return;function u(n){n.target===this&&(n.preventDefault(),t())}function i(n){n.key.startsWith("Esc")&&(n.preventDefault(),t())}e?.addEventListener("click",u),window.addCleanup(()=>e?.removeEventListener("click",u)),document.addEventListener("keydown",i),window.addCleanup(()=>document.removeEventListener("keydown",i))}function J(e){for(;e.firstChild;)e.removeChild(e.firstChild)}var Ot=Object.hasOwnProperty;var Pe=Qe(Ie(),1),zt=(0,Pe.default)();function Ct(e){let t=Bt(mt(e,"index"),!0);return t.length===0?"/":t}var Oe=(e,t,u)=>{let i=new URL(e.getAttribute(t),u);e.setAttribute(t,i.pathname+i.hash)};function Ue(e,t){e.querySelectorAll(\'[href^="./"], [href^="../"]\').forEach(u=>Oe(u,"href",t)),e.querySelectorAll(\'[src^="./"], [src^="../"]\').forEach(u=>Oe(u,"src",t))}function At(e){let t=e.split("/").filter(u=>u!=="").slice(0,-1).map(u=>"..").join("/");return t.length===0&&(t="."),t}function We(e,t){return dt(At(e),Ct(t))}function dt(...e){return e.filter(t=>t!=="").join("/").replace(/\\/\\/+/g,"/")}function pt(e,t){return e===t||e.endsWith("/"+t)}function mt(e,t){return pt(e,t)&&(e=e.slice(0,-t.length)),e}function Bt(e,t){return e.startsWith("/")&&(e=e.substring(1)),!t&&e.endsWith("/")&&(e=e.slice(0,-1)),e}var I="basic",O="",yt=e=>e.toLowerCase().split(/([^a-z]|[^\\x00-\\x7F])/),ne=new ke.Document({charset:"latin:extra",encode:yt,document:{id:"id",index:[{field:"title",tokenize:"forward"},{field:"content",tokenize:"forward"},{field:"tags",tokenize:"forward"}]}}),wt=new DOMParser,De=new Map,ue=30,_e=8,vt=5,Ne=e=>{let t=e.split(/\\s+/).filter(i=>i.trim()!==""),u=t.length;if(u>1)for(let i=1;i<u;i++)t.push(t.slice(0,i+1).join(" "));return t.sort((i,n)=>n.length-i.length)};function ze(e,t,u){let i=Ne(e),n=t.split(/\\s+/).filter(D=>D!==""),s=0,l=n.length-1;if(u){let D=f=>i.some(h=>f.toLowerCase().startsWith(h.toLowerCase())),o=n.map(D),F=0,E=0;for(let f=0;f<Math.max(n.length-ue,0);f++){let c=o.slice(f,f+ue).reduce((g,d)=>g+(d?1:0),0);c>=F&&(F=c,E=f)}s=Math.max(E-ue,0),l=Math.min(s+2*ue,n.length-1),n=n.slice(s,l)}let r=n.map(D=>{for(let o of i)if(D.toLowerCase().includes(o.toLowerCase())){let F=new RegExp(o.toLowerCase(),"gi");return D.replace(F,\'<span class="highlight">$&</span>\')}return D}).join(" ");return`${s===0?"":"..."}${r}${l===n.length-1?"":"..."}`}function xt(e,t){let u=new DOMParser,i=Ne(e),n=u.parseFromString(t.innerHTML,"text/html"),s=r=>{let D=document.createElement("span");return D.className="highlight",D.textContent=r,D},l=(r,D)=>{if(r.nodeType===Node.TEXT_NODE){let o=r.nodeValue??"",F=new RegExp(D.toLowerCase(),"gi"),E=o.match(F);if(!E||E.length===0)return;let f=document.createElement("span"),h=0;for(let c of E){let g=o.indexOf(c,h);f.appendChild(document.createTextNode(o.slice(h,g))),f.appendChild(s(c)),h=g+c.length}f.appendChild(document.createTextNode(o.slice(h))),r.parentNode?.replaceChild(f,r)}else if(r.nodeType===Node.ELEMENT_NODE){if(r.classList.contains("highlight"))return;Array.from(r.childNodes).forEach(o=>l(o,D))}};for(let r of i)l(n.body,r);return n.body}document.addEventListener("nav",async e=>{let t=e.detail.url,u=await fetchData,i=document.getElementById("search-container"),n=i?.closest(".sidebar"),s=document.getElementById("search-icon"),l=document.getElementById("search-bar"),r=document.getElementById("search-layout"),D=Object.keys(u),o=a=>{r?.querySelector(`#${a.id}`)===null&&r?.appendChild(a)},F=r?.dataset?.preview==="true",E,f,h=document.createElement("div");h.id="results-container",o(h),F&&(E=document.createElement("div"),E.id="preview-container",o(E));function c(){i?.classList.remove("active"),l&&(l.value=""),n&&(n.style.zIndex="unset"),h&&J(h),E&&J(E),r&&r.classList.remove("display-results"),I="basic"}function g(a){I=a,n&&(n.style.zIndex="1"),i?.classList.add("active"),l?.focus()}let d=null;async function S(a){if(a.key==="k"&&(a.ctrlKey||a.metaKey)&&!a.shiftKey){a.preventDefault(),i?.classList.contains("active")?c():g("basic");return}else if(a.shiftKey&&(a.ctrlKey||a.metaKey)&&a.key.toLowerCase()==="k"){a.preventDefault(),i?.classList.contains("active")?c():g("tags"),l&&(l.value="#");return}if(d&&d.classList.remove("focus"),!!i?.classList.contains("active")){if(a.key==="Enter")if(h?.contains(document.activeElement)){let C=document.activeElement;if(C.classList.contains("no-match"))return;await U(C),C.click()}else{let C=document.getElementsByClassName("result-card")[0];if(!C||C?.classList.contains("no-match"))return;await U(C),C.click()}else if(a.key==="ArrowUp"||a.shiftKey&&a.key==="Tab"){if(a.preventDefault(),h?.contains(document.activeElement)){let C=d||document.activeElement,A=C?.previousElementSibling;C?.classList.remove("focus"),A?.focus(),A&&(d=A),await U(A)}}else if((a.key==="ArrowDown"||a.key==="Tab")&&(a.preventDefault(),document.activeElement===l||d!==null)){let C=d||document.getElementsByClassName("result-card")[0],A=C?.nextElementSibling;C?.classList.remove("focus"),A?.focus(),A&&(d=A),await U(A)}}}let x=(a,C)=>{let A=D[C];return{id:C,slug:A,title:I==="tags"?u[A].title:ze(a,u[A].title??""),content:ze(a,u[A].content??"",!0),tags:w(a.substring(1),u[A].tags)}};function w(a,C){return!C||I!=="tags"?[]:C.map(A=>A.toLowerCase().includes(a.toLowerCase())?`<li><p class="match-tag">#${A}</p></li>`:`<li><p>#${A}</p></li>`).slice(0,vt)}function R(a){return new URL(We(t,a),location.toString())}let z=({slug:a,title:C,content:A,tags:T})=>{let M=T.length>0?`<ul class="tags">${T.join("")}</ul>`:"",y=document.createElement("a");y.classList.add("result-card"),y.id=a,y.href=R(a).toString(),y.innerHTML=`<h3>${C}</h3>${M}${F&&window.innerWidth>600?"":`<p>${A}</p>`}`,y.addEventListener("click",L=>{L.altKey||L.ctrlKey||L.metaKey||L.shiftKey||c()});let N=L=>{L.altKey||L.ctrlKey||L.metaKey||L.shiftKey||c()};async function Z(L){if(!L.target)return;let qe=L.target;await U(qe)}return y.addEventListener("mouseenter",Z),window.addCleanup(()=>y.removeEventListener("mouseenter",Z)),y.addEventListener("click",N),window.addCleanup(()=>y.removeEventListener("click",N)),y};async function V(a){if(h)if(J(h),a.length===0?h.innerHTML=`<a class="result-card no-match">\n          <h3>No results.</h3>\n          <p>Try another search term?</p>\n      </a>`:h.append(...a.map(z)),a.length===0&&E)J(E);else{let C=h.firstElementChild;C.classList.add("focus"),d=C,await U(C)}}async function P(a){if(De.has(a))return De.get(a);let C=R(a).toString(),A=await fetch(C).then(T=>T.text()).then(T=>{if(T===void 0)throw new Error(`Could not fetch ${C}`);let M=wt.parseFromString(T??"","text/html");return Ue(M,C),[...M.getElementsByClassName("popover-hint")]});return De.set(a,A),A}async function U(a){if(!r||!F||!a||!E)return;let C=a.id,A=await P(C).then(M=>M.flatMap(y=>[...xt(O,y).children]));f=document.createElement("div"),f.classList.add("preview-inner"),f.append(...A),E.replaceChildren(f),[...E.querySelectorAll(".highlight")].sort((M,y)=>y.innerHTML.length-M.innerHTML.length)[0]?.scrollIntoView({block:"start"})}async function oe(a){if(!r||!ne)return;O=a.target.value,r.classList.toggle("display-results",O!==""),I=O.startsWith("#")?"tags":"basic";let C;I==="tags"?C=await ne.searchAsync({query:O.substring(1),limit:_e,index:["tags"]}):I==="basic"&&(C=await ne.searchAsync({query:O,limit:_e,index:["title","content"]}));let A=y=>{let N=C.filter(Z=>Z.field===y);return N.length===0?[]:[...N[0].result]},M=[...new Set([...A("title"),...A("content"),...A("tags")])].map(y=>x(O,y));await V(M)}document.addEventListener("keydown",S),window.addCleanup(()=>document.removeEventListener("keydown",S)),s?.addEventListener("click",()=>g("basic")),window.addCleanup(()=>s?.removeEventListener("click",()=>g("basic"))),l?.addEventListener("input",oe),window.addCleanup(()=>l?.removeEventListener("input",oe)),He(i,c),await St(u)});async function St(e){let t=0,u=[];for(let[i,n]of Object.entries(e))u.push(ne.addAsync(t++,{id:t,slug:i,title:n.title,content:n.content,tags:n.tags}));return await Promise.all(u)}\n';import{jsx as jsx25,jsxs as jsxs14}from"preact/jsx-runtime";var defaultOptions12={enablePreview:!0},Search_default=__name(userOpts=>{function Search({displayClass,cfg}){let opts={...defaultOptions12,...userOpts};return jsxs14("div",{class:classNames(displayClass,"search"),children:[jsxs14("div",{id:"search-icon",children:[jsx25("p",{children:i18n(cfg.locale,"search")}),jsx25("div",{}),jsxs14("svg",{tabIndex:0,"aria-labelledby":"title desc",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19.9 19.7",children:[jsx25("title",{id:"title",children:"Search"}),jsx25("desc",{id:"desc",children:"Search"}),jsxs14("g",{class:"search-path",fill:"none",children:[jsx25("path",{"stroke-linecap":"square",d:"M18.5 18.3l-5.4-5.4"}),jsx25("circle",{cx:"8",cy:"8",r:"7"})]})]})]}),jsx25("div",{id:"search-container",children:jsxs14("div",{id:"search-space",children:[jsx25("input",{autocomplete:"off",id:"search-bar",name:"search",type:"text","aria-label":"Search for something",placeholder:"Search for something"}),jsx25("div",{id:"search-layout","data-preview":opts.enablePreview})]})})]})}return __name(Search,"Search"),Search.afterDOMLoaded=search_inline_default,Search.css=search_default,Search},"default");var footer_default=`footer {
  text-align: left;
  margin-bottom: 4rem;
  opacity: 0.7;
}
footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: -1rem;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiZm9vdGVyLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSIsInNvdXJjZXNDb250ZW50IjpbImZvb3RlciB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIG1hcmdpbi1ib3R0b206IDRyZW07XG4gIG9wYWNpdHk6IDAuNztcblxuICAmIHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBnYXA6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogLTFyZW07XG4gIH1cbn1cbiJdfQ== */`;var version="4.2.1";import{jsx as jsx26,jsxs as jsxs15}from"preact/jsx-runtime";var Footer_default=__name(opts=>{function Footer({displayClass,cfg}){let year=new Date().getFullYear(),links=opts?.links??[];return jsxs15("footer",{class:`${displayClass??""}`,children:[jsx26("hr",{}),jsxs15("p",{children:[i18n(cfg.locale,"footer.createdWith")," ",jsxs15("a",{href:"https://quartz.jzhao.xyz/",children:["Quartz v",version]}),", \xA9 ",year]}),jsx26("ul",{children:Object.entries(links).map(([text,link])=>jsx26("li",{children:jsx26("a",{href:link,children:text})}))})]})}return __name(Footer,"Footer"),Footer.css=footer_default,Footer},"default");import{Fragment as Fragment4,jsx as jsx27}from"preact/jsx-runtime";var DesktopOnly_default=__name(component=>{if(component){let DesktopOnly2=function(props){return jsx27(Component,{displayClass:"desktop-only",...props})};var DesktopOnly=DesktopOnly2;__name(DesktopOnly2,"DesktopOnly");let Component=component;return DesktopOnly2.displayName=component.displayName,DesktopOnly2.afterDOMLoaded=component?.afterDOMLoaded,DesktopOnly2.beforeDOMLoaded=component?.beforeDOMLoaded,DesktopOnly2.css=component?.css,DesktopOnly2}else return()=>jsx27(Fragment4,{})},"default");import{Fragment as Fragment5,jsx as jsx28}from"preact/jsx-runtime";var MobileOnly_default=__name(component=>{if(component){let MobileOnly2=function(props){return jsx28(Component,{displayClass:"mobile-only",...props})};var MobileOnly=MobileOnly2;__name(MobileOnly2,"MobileOnly");let Component=component;return MobileOnly2.displayName=component.displayName,MobileOnly2.afterDOMLoaded=component?.afterDOMLoaded,MobileOnly2.beforeDOMLoaded=component?.beforeDOMLoaded,MobileOnly2.css=component?.css,MobileOnly2}else return()=>jsx28(Fragment5,{})},"default");import{jsx as jsx29,jsxs as jsxs16}from"preact/jsx-runtime";import{Fragment as Fragment6,jsx as jsx30,jsxs as jsxs17}from"preact/jsx-runtime";import{Fragment as Fragment7,jsx as jsx31,jsxs as jsxs18}from"preact/jsx-runtime";function getPathSegment(fp,idx){if(fp)return fp.split("/").at(idx)}__name(getPathSegment,"getPathSegment");var TagNode=class _TagNode{static{__name(this,"TagNode")}children;name;displayName;file;depth;constructor(slugSegment,displayName,file,depth){this.children=[],this.name=slugSegment,this.displayName=displayName??file?.frontmatter?.title??slugSegment,this.file=file?clone(file):null,this.depth=depth??0}insert(fileData){if(fileData.path.length===0)return;let nextSegment=fileData.path[0];if(fileData.path.length===1){if(nextSegment===""){let title=fileData.file.frontmatter?.title;title&&title!=="index"&&(this.displayName=title)}else this.children.push(new _TagNode(nextSegment,void 0,fileData.file,this.depth+1));return}fileData.path=fileData.path.splice(1);let child=this.children.find(c=>c.name===nextSegment);if(child){child.insert(fileData);return}let newChild=new _TagNode(nextSegment,getPathSegment(fileData.tagpath,this.depth),void 0,this.depth+1);newChild.insert(fileData),this.children.push(newChild)}add(file){file.frontmatter?.tags?.forEach(tag=>{let tagpath=tag.concat("/",file.slug.split("/").pop());this.insert({file,path:simplifySlug(slugifyFilePath(tagpath)).split("/"),tagpath})})}filter(filterFn){this.children=this.children.filter(filterFn),this.children.forEach(child=>child.filter(filterFn))}map(mapFn){mapFn(this),this.children.forEach(child=>child.map(mapFn))}getFolderPaths(collapsed){let folderPaths=[],traverse=__name((node,currentPath)=>{if(!node.file){let folderPath=joinSegments(currentPath,node.name);folderPath!==""&&folderPaths.push({path:folderPath,collapsed}),node.children.forEach(child=>traverse(child,folderPath))}},"traverse");return traverse(this,""),folderPaths}sort(sortFn){this.children=this.children.sort(sortFn),this.children.forEach(e=>e.sort(sortFn))}};function TagExplorerNode({node,opts,fullPath,fileData}){let folderBehavior=opts.folderClickBehavior,isDefaultOpen=opts.folderDefaultState==="open",folderPath="";return node.name!==""&&(folderPath=joinSegments(fullPath??"",node.name)),jsx31(Fragment7,{children:node.file?jsx31("li",{children:jsx31("a",{href:resolveRelative(fileData.slug,node.file.slug),"data-for":node.file.slug,children:node.displayName})},node.file.slug):jsxs18("li",{children:[node.name!==""&&jsxs18("div",{class:"folder-container",children:[jsx31("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"5 8 14 8",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"folder-icon",children:jsx31("polyline",{points:"6 9 12 15 18 9"})}),jsx31("div",{"data-folderpath":folderPath,children:folderBehavior==="link"?jsx31("a",{href:resolveRelative(fileData.slug,folderPath),"data-for":node.name,class:"folder-title",children:node.displayName}):jsx31("button",{class:"folder-button",children:jsx31("span",{class:"folder-title",children:node.displayName})})},node.name)]}),jsx31("div",{class:`folder-outer ${node.depth===0||isDefaultOpen?"open":""}`,children:jsx31("ul",{style:{paddingLeft:node.name!==""?"1.4rem":"0"},class:"content","data-folderul":folderPath,children:node.children.map((childNode,i)=>jsx31(TagExplorerNode,{node:childNode,opts,fullPath:folderPath,fileData},i))})})]})})}__name(TagExplorerNode,"TagExplorerNode");import{jsx as jsx32,jsxs as jsxs19}from"preact/jsx-runtime";var defaultOptions13={folderClickBehavior:"collapse",folderDefaultState:"collapsed",useSavedState:!0,mapFn:node=>node,sortFn:(a,b)=>!a.file&&!b.file||a.file&&b.file?a.displayName.localeCompare(b.displayName,void 0,{numeric:!0,sensitivity:"base"}):a.file&&!b.file?1:-1,filterFn:node=>node.name!=="tags",order:["filter","map","sort"]},TagExplorer_default=__name(userOpts=>{let opts={...defaultOptions13,...userOpts},fileTree,jsonTree;function constructFileTree(allFiles){if(fileTree)return;if(fileTree=new TagNode(""),allFiles.forEach(file=>fileTree.add(file)),opts.order)for(let i=0;i<opts.order.length;i++){let functionName=opts.order[i];functionName==="map"?fileTree.map(opts.mapFn):functionName==="sort"?fileTree.sort(opts.sortFn):functionName==="filter"&&fileTree.filter(opts.filterFn)}let folders=fileTree.getFolderPaths(opts.folderDefaultState==="collapsed");jsonTree=JSON.stringify(folders)}__name(constructFileTree,"constructFileTree");let TagExplorer=__name(({cfg,allFiles,displayClass,fileData})=>(constructFileTree(allFiles),jsxs19("div",{class:classNames(displayClass,"explorer"),children:[jsxs19("button",{type:"button",id:"explorer","data-behavior":opts.folderClickBehavior,"data-collapsed":opts.folderDefaultState,"data-savestate":opts.useSavedState,"data-tree":jsonTree,children:[jsx32("h1",{children:opts.title}),jsx32("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"5 8 14 8",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"fold",children:jsx32("polyline",{points:"6 9 12 15 18 9"})})]}),jsx32("div",{id:"explorer-content",children:jsxs19("ul",{class:"overflow",id:"explorer-ul",children:[jsx32(TagExplorerNode,{node:fileTree,opts,fileData}),jsx32("li",{id:"explorer-end"})]})})]})),"TagExplorer");return TagExplorer.css=explorer_default,TagExplorer.afterDOMLoaded=explorer_inline_default,TagExplorer},"default");var sharedPageComponents={head:Head_default(),header:[],footer:Footer_default({links:{Goodreads:"https://www.goodreads.com/indravajra",Github:"https://www.github.com/indravajra",Guestbook:"https://www.yourworldoftext.com/~indravajra/",VocabJournal:"https://indravajra.github.io/vocabJournal/",OpenStatus:"https://cyber-samadhi.openstatus.dev/"}})},defaultContentPageLayout={beforeBody:[ContentMeta_default(),TagList_default()],left:[PageTitle_default(),MobileOnly_default(Spacer_default()),Darkmode_default(),Search_default(),DesktopOnly_default(TagExplorer_default({mapFn:node=>{node.depth>0&&(node.file?node.displayName="\u{1F4C4} "+node.displayName:node.displayName="#"+node.displayName)}})),DesktopOnly_default(TableOfContents_default())],right:[Graph_default(),Backlinks_default()]},defaultListPageLayout={beforeBody:[ArticleTitle_default()],left:[PageTitle_default(),MobileOnly_default(Spacer_default()),Search_default(),Darkmode_default()],right:[]};import chalk4 from"chalk";import path6 from"path";import fs2 from"fs";var write=__name(async({ctx,slug,ext,content})=>{let pathToPage=joinSegments(ctx.argv.output,slug+ext),dir=path6.dirname(pathToPage);return await fs2.promises.mkdir(dir,{recursive:!0}),await fs2.promises.writeFile(pathToPage,content),pathToPage},"write");var ContentPage=__name(userOpts=>{let opts={...sharedPageComponents,...defaultContentPageLayout,pageBody:Content_default(),...userOpts},{head:Head,header,beforeBody,pageBody,left,right,footer:Footer}=opts,Header2=Header_default(),Body2=Body_default();return{name:"ContentPage",getQuartzComponents(){return[Head,Header2,Body2,...header,...beforeBody,pageBody,...left,...right,Footer]},async emit(ctx,content,resources){let cfg=ctx.cfg.configuration,fps=[],allFiles=content.map(c=>c[1].data),containsIndex=!1;for(let[tree,file]of content){let slug=file.data.slug;slug==="index"&&(containsIndex=!0);let externalResources=pageResources(pathToRoot(slug),resources),componentData={fileData:file.data,externalResources,cfg,children:[],tree,allFiles},content2=renderPage(slug,componentData,opts,externalResources),fp=await write({ctx,content:content2,slug,ext:".html"});fps.push(fp)}return containsIndex||console.log(chalk4.yellow(`
Warning: you seem to be missing an \`index.md\` home page file at the root of your \`${ctx.argv.directory}\` folder. This may cause errors when deploying.`)),fps}}},"ContentPage");import{VFile}from"vfile";function defaultProcessedContent(vfileData){let root={type:"root",children:[]},vfile=new VFile("");return vfile.data=vfileData,[root,vfile]}__name(defaultProcessedContent,"defaultProcessedContent");var TagPage=__name(userOpts=>{let opts={...sharedPageComponents,...defaultListPageLayout,pageBody:TagContent_default(),...userOpts},{head:Head,header,beforeBody,pageBody,left,right,footer:Footer}=opts,Header2=Header_default(),Body2=Body_default();return{name:"TagPage",getQuartzComponents(){return[Head,Header2,Body2,...header,...beforeBody,pageBody,...left,...right,Footer]},async emit(ctx,content,resources){let fps=[],allFiles=content.map(c=>c[1].data),cfg=ctx.cfg.configuration,tags=new Set(allFiles.flatMap(data=>data.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes));tags.add("index");let tagDescriptions=Object.fromEntries([...tags].map(tag=>{let title=tag==="index"?"Tag Index":`Tag: #${tag}`;return[tag,defaultProcessedContent({slug:joinSegments("tags",tag),frontmatter:{title,tags:[]}})]}));for(let[tree,file]of content){let slug=file.data.slug;if(slug.startsWith("tags/")){let tag=slug.slice(5);tags.has(tag)&&(tagDescriptions[tag]=[tree,file])}}for(let tag of tags){let slug=joinSegments("tags",tag),externalResources=pageResources(pathToRoot(slug),resources),[tree,file]=tagDescriptions[tag],componentData={fileData:file.data,externalResources,cfg,children:[],tree,allFiles},content2=renderPage(slug,componentData,opts,externalResources),fp=await write({ctx,content:content2,slug:file.data.slug,ext:".html"});fps.push(fp)}return fps}}},"TagPage");import path7 from"path";var FolderPage=__name(userOpts=>{let opts={...sharedPageComponents,...defaultListPageLayout,pageBody:FolderContent_default(),...userOpts},{head:Head,header,beforeBody,pageBody,left,right,footer:Footer}=opts,Header2=Header_default(),Body2=Body_default();return{name:"FolderPage",getQuartzComponents(){return[Head,Header2,Body2,...header,...beforeBody,pageBody,...left,...right,Footer]},async emit(ctx,content,resources){let fps=[],allFiles=content.map(c=>c[1].data),cfg=ctx.cfg.configuration,folders=new Set(allFiles.flatMap(data=>{let slug=data.slug,folderName=path7.dirname(slug??"");return slug&&folderName!=="."&&folderName!=="tags"?[folderName]:[]})),folderDescriptions=Object.fromEntries([...folders].map(folder=>[folder,defaultProcessedContent({slug:joinSegments(folder,"index"),frontmatter:{title:`Folder: ${folder}`,tags:[]}})]));for(let[tree,file]of content){let slug=_stripSlashes(simplifySlug(file.data.slug));folders.has(slug)&&(folderDescriptions[slug]=[tree,file])}for(let folder of folders){let slug=joinSegments(folder,"index"),externalResources=pageResources(pathToRoot(slug),resources),[tree,file]=folderDescriptions[folder],componentData={fileData:file.data,externalResources,cfg,children:[],tree,allFiles},content2=renderPage(slug,componentData,opts,externalResources),fp=await write({ctx,content:content2,slug,ext:".html"});fps.push(fp)}return fps}}},"FolderPage");import{toHtml as toHtml2}from"hast-util-to-html";var defaultOptions14={enableSiteMap:!0,enableRSS:!0,rssLimit:10,rssFullHtml:!1,includeEmptyFiles:!0};function generateSiteMap(cfg,idx){let base=cfg.baseUrl??"",createURLEntry=__name((slug,content)=>`<url>
    <loc>https://${joinSegments(base,encodeURI(slug))}</loc>
    <lastmod>${content.date?.toISOString()}</lastmod>
  </url>`,"createURLEntry");return`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${Array.from(idx).map(([slug,content])=>createURLEntry(simplifySlug(slug),content)).join("")}</urlset>`}__name(generateSiteMap,"generateSiteMap");function generateRSSFeed(cfg,idx,limit){let base=cfg.baseUrl??"",createURLEntry=__name((slug,content)=>`<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base,encodeURI(slug))}</link>
    <guid>https://${joinSegments(base,encodeURI(slug))}</guid>
    <description>${content.richContent??content.description}</description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`,"createURLEntry"),items=Array.from(idx).sort(([_,f1],[__,f2])=>f1.date&&f2.date?f2.date.getTime()-f1.date.getTime():f1.date&&!f2.date?-1:!f1.date&&f2.date?1:f1.title.localeCompare(f2.title)).map(([slug,content])=>createURLEntry(simplifySlug(slug),content)).slice(0,limit??idx.size).join("");return`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <description>${limit?`Last ${limit} notes`:"Recent notes"} on ${escapeHTML(cfg.pageTitle)}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`}__name(generateRSSFeed,"generateRSSFeed");var ContentIndex=__name(opts=>(opts={...defaultOptions14,...opts},{name:"ContentIndex",async emit(ctx,content,_resources){let cfg=ctx.cfg.configuration,emitted=[],linkIndex=new Map;for(let[tree,file]of content){let slug=file.data.slug,date=getDate(ctx.cfg.configuration,file.data)??new Date;(opts?.includeEmptyFiles||file.data.text&&file.data.text!=="")&&linkIndex.set(slug,{title:file.data.frontmatter?.title,links:file.data.links??[],tags:file.data.frontmatter?.tags??[],content:file.data.text??"",richContent:opts?.rssFullHtml?escapeHTML(toHtml2(tree,{allowDangerousHtml:!0})):void 0,date,description:file.data.description??""})}opts?.enableSiteMap&&emitted.push(await write({ctx,content:generateSiteMap(cfg,linkIndex),slug:"sitemap",ext:".xml"})),opts?.enableRSS&&emitted.push(await write({ctx,content:generateRSSFeed(cfg,linkIndex,opts.rssLimit),slug:"index",ext:".xml"}));let fp=joinSegments("static","contentIndex"),simplifiedIndex=Object.fromEntries(Array.from(linkIndex).map(([slug,content2])=>(delete content2.description,delete content2.date,[slug,content2])));return emitted.push(await write({ctx,content:JSON.stringify(simplifiedIndex),slug:fp,ext:".json"})),emitted},getQuartzComponents:()=>[]}),"ContentIndex");import path8 from"path";var AliasRedirects=__name(()=>({name:"AliasRedirects",getQuartzComponents(){return[]},async emit(ctx,content,_resources){let{argv}=ctx,fps=[];for(let[_tree,file]of content){let ogSlug=simplifySlug(file.data.slug),dir=path8.posix.relative(argv.directory,path8.dirname(file.data.filePath)),slugs=(file.data.frontmatter?.aliases??[]).map(alias=>path8.posix.join(dir,alias)),permalink=file.data.frontmatter?.permalink;typeof permalink=="string"&&slugs.push(permalink);for(let slug of slugs){slug.endsWith("/")&&(slug=joinSegments(slug,"index"));let redirUrl=resolveRelative(slug,file.data.slug),fp=await write({ctx,content:`
            <!DOCTYPE html>
            <html lang="en-us">
            <head>
            <title>${ogSlug}</title>
            <link rel="canonical" href="${redirUrl}">
            <meta name="robots" content="noindex">
            <meta charset="utf-8">
            <meta http-equiv="refresh" content="0; url=${redirUrl}">
            </head>
            </html>
            `,slug,ext:".html"});fps.push(fp)}}return fps}}),"AliasRedirects");import path10 from"path";import fs3 from"fs";import path9 from"path";import{globby}from"globby";function toPosixPath(fp){return fp.split(path9.sep).join("/")}__name(toPosixPath,"toPosixPath");async function glob(pattern,cwd,ignorePatterns){return(await globby(pattern,{cwd,ignore:ignorePatterns,gitignore:!0})).map(toPosixPath)}__name(glob,"glob");var Assets=__name(()=>({name:"Assets",getQuartzComponents(){return[]},async emit({argv,cfg},_content,_resources){let assetsPath=argv.output,fps=await glob("**",argv.directory,["**/*.md",...cfg.configuration.ignorePatterns]),res=[];for(let fp of fps){let ext=path10.extname(fp),src=joinSegments(argv.directory,fp),name=slugifyFilePath(fp,!0)+ext,dest=joinSegments(assetsPath,name),dir=path10.dirname(dest);await fs3.promises.mkdir(dir,{recursive:!0}),await fs3.promises.copyFile(src,dest),res.push(dest)}return res}}),"Assets");import fs4 from"fs";var Static=__name(()=>({name:"Static",getQuartzComponents(){return[]},async emit({argv,cfg},_content,_resources){let staticPath=joinSegments(QUARTZ,"static"),fps=await glob("**",staticPath,cfg.configuration.ignorePatterns);return await fs4.promises.cp(staticPath,joinSegments(argv.output,"static"),{recursive:!0,dereference:!0}),fps.map(fp=>joinSegments(argv.output,"static",fp))}}),"Static");var spa_inline_default='var O=Object.create;var b=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var W=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var V=(u,e)=>()=>(e||u((e={exports:{}}).exports,e),e.exports);var H=(u,e,D,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let F of _(e))!I.call(u,F)&&F!==D&&b(u,F,{get:()=>e[F],enumerable:!(r=$(e,F))||r.enumerable});return u};var q=(u,e,D)=>(D=u!=null?O(W(u)):{},H(e||!u||!u.__esModule?b(D,"default",{value:u,enumerable:!0}):D,u));var T=V((Eu,L)=>{"use strict";L.exports=J;function f(u){return u instanceof Buffer?Buffer.from(u):new u.constructor(u.buffer.slice(),u.byteOffset,u.length)}function J(u){if(u=u||{},u.circles)return X(u);return u.proto?r:D;function e(F,i){for(var t=Object.keys(F),n=new Array(t.length),a=0;a<t.length;a++){var l=t[a],o=F[l];typeof o!="object"||o===null?n[l]=o:o instanceof Date?n[l]=new Date(o):ArrayBuffer.isView(o)?n[l]=f(o):n[l]=i(o)}return n}function D(F){if(typeof F!="object"||F===null)return F;if(F instanceof Date)return new Date(F);if(Array.isArray(F))return e(F,D);if(F instanceof Map)return new Map(e(Array.from(F),D));if(F instanceof Set)return new Set(e(Array.from(F),D));var i={};for(var t in F)if(Object.hasOwnProperty.call(F,t)!==!1){var n=F[t];typeof n!="object"||n===null?i[t]=n:n instanceof Date?i[t]=new Date(n):n instanceof Map?i[t]=new Map(e(Array.from(n),D)):n instanceof Set?i[t]=new Set(e(Array.from(n),D)):ArrayBuffer.isView(n)?i[t]=f(n):i[t]=D(n)}return i}function r(F){if(typeof F!="object"||F===null)return F;if(F instanceof Date)return new Date(F);if(Array.isArray(F))return e(F,r);if(F instanceof Map)return new Map(e(Array.from(F),r));if(F instanceof Set)return new Set(e(Array.from(F),r));var i={};for(var t in F){var n=F[t];typeof n!="object"||n===null?i[t]=n:n instanceof Date?i[t]=new Date(n):n instanceof Map?i[t]=new Map(e(Array.from(n),r)):n instanceof Set?i[t]=new Set(e(Array.from(n),r)):ArrayBuffer.isView(n)?i[t]=f(n):i[t]=r(n)}return i}}function X(u){var e=[],D=[];return u.proto?i:F;function r(t,n){for(var a=Object.keys(t),l=new Array(a.length),o=0;o<a.length;o++){var A=a[o],s=t[A];if(typeof s!="object"||s===null)l[A]=s;else if(s instanceof Date)l[A]=new Date(s);else if(ArrayBuffer.isView(s))l[A]=f(s);else{var S=e.indexOf(s);S!==-1?l[A]=D[S]:l[A]=n(s)}}return l}function F(t){if(typeof t!="object"||t===null)return t;if(t instanceof Date)return new Date(t);if(Array.isArray(t))return r(t,F);if(t instanceof Map)return new Map(r(Array.from(t),F));if(t instanceof Set)return new Set(r(Array.from(t),F));var n={};e.push(t),D.push(n);for(var a in t)if(Object.hasOwnProperty.call(t,a)!==!1){var l=t[a];if(typeof l!="object"||l===null)n[a]=l;else if(l instanceof Date)n[a]=new Date(l);else if(l instanceof Map)n[a]=new Map(r(Array.from(l),F));else if(l instanceof Set)n[a]=new Set(r(Array.from(l),F));else if(ArrayBuffer.isView(l))n[a]=f(l);else{var o=e.indexOf(l);o!==-1?n[a]=D[o]:n[a]=F(l)}}return e.pop(),D.pop(),n}function i(t){if(typeof t!="object"||t===null)return t;if(t instanceof Date)return new Date(t);if(Array.isArray(t))return r(t,i);if(t instanceof Map)return new Map(r(Array.from(t),i));if(t instanceof Set)return new Set(r(Array.from(t),i));var n={};e.push(t),D.push(n);for(var a in t){var l=t[a];if(typeof l!="object"||l===null)n[a]=l;else if(l instanceof Date)n[a]=new Date(l);else if(l instanceof Map)n[a]=new Map(r(Array.from(l),i));else if(l instanceof Set)n[a]=new Set(r(Array.from(l),i));else if(ArrayBuffer.isView(l))n[a]=f(l);else{var o=e.indexOf(l);o!==-1?n[a]=D[o]:n[a]=i(l)}}return e.pop(),D.pop(),n}}});var g=u=>(e,D)=>e[`node${u}`]===D[`node${u}`],z=g("Name"),K=g("Type"),Z=g("Value");function x(u,e){if(u.attributes.length===0&&e.attributes.length===0)return[];let D=[],r=new Map,F=new Map;for(let i of u.attributes)r.set(i.name,i.value);for(let i of e.attributes){let t=r.get(i.name);i.value===t?r.delete(i.name):(typeof t<"u"&&r.delete(i.name),F.set(i.name,i.value))}for(let i of r.keys())D.push({type:5,name:i});for(let[i,t]of F.entries())D.push({type:4,name:i,value:t});return D}function d(u,e=!0){let D=`${u.localName}`;for(let{name:r,value:F}of u.attributes)e&&r.startsWith("data-")||(D+=`[${r}=${F}]`);return D+=u.innerHTML,D}function p(u){switch(u.tagName){case"BASE":case"TITLE":return u.localName;case"META":{if(u.hasAttribute("name"))return`meta[name="${u.getAttribute("name")}"]`;if(u.hasAttribute("property"))return`meta[name="${u.getAttribute("property")}"]`;break}case"LINK":{if(u.hasAttribute("rel")&&u.hasAttribute("href"))return`link[rel="${u.getAttribute("rel")}"][href="${u.getAttribute("href")}"]`;if(u.hasAttribute("href"))return`link[href="${u.getAttribute("href")}"]`;break}}return d(u)}function Q(u){let[e,D=""]=u.split("?");return`${e}?t=${Date.now()}&${D.replace(/t=\\d+/g,"")}`}function E(u){if(u.nodeType===1&&u.hasAttribute("data-persist"))return u;if(u.nodeType===1&&u.localName==="script"){let e=document.createElement("script");for(let{name:D,value:r}of u.attributes)D==="src"&&(r=Q(r)),e.setAttribute(D,r);return e.innerHTML=u.innerHTML,e}return u.cloneNode(!0)}function Y(u,e){if(u.children.length===0&&e.children.length===0)return[];let D=[],r=new Map,F=new Map,i=new Map;for(let t of u.children)r.set(p(t),t);for(let t of e.children){let n=p(t),a=r.get(n);a?d(t,!1)!==d(a,!1)&&F.set(n,E(t)):i.set(n,E(t)),r.delete(n)}for(let t of u.childNodes){if(t.nodeType===1){let n=p(t);if(r.has(n)){D.push({type:1});continue}else if(F.has(n)){let a=F.get(n);D.push({type:3,attributes:x(t,a),children:R(t,a)});continue}}D.push(void 0)}for(let t of i.values())D.push({type:0,node:E(t)});return D}function R(u,e){let D=[],r=Math.max(u.childNodes.length,e.childNodes.length);for(let F=0;F<r;F++){let i=u.childNodes.item(F),t=e.childNodes.item(F);D[F]=c(i,t)}return D}function c(u,e){if(!u)return{type:0,node:E(e)};if(!e)return{type:1};if(K(u,e)){if(u.nodeType===3){let D=u.nodeValue,r=e.nodeValue;if(D.trim().length===0&&r.trim().length===0)return}if(u.nodeType===1){if(z(u,e)){let D=u.tagName==="HEAD"?Y:R;return{type:3,attributes:x(u,e),children:D(u,e)}}return{type:2,node:E(e)}}else return u.nodeType===9?c(u.documentElement,e.documentElement):Z(u,e)?void 0:{type:2,value:e.nodeValue}}return{type:2,node:E(e)}}function G(u,e){if(e.length!==0)for(let{type:D,name:r,value:F}of e)D===5?u.removeAttribute(r):D===4&&u.setAttribute(r,F)}async function h(u,e,D){if(!e)return;let r;switch(u.nodeType===9?(u=u.documentElement,r=u):D?r=D:r=u,e.type){case 0:{let{node:F}=e;u.appendChild(F);return}case 1:{if(!r)return;u.removeChild(r);return}case 2:{if(!r)return;let{node:F,value:i}=e;if(typeof i=="string"){r.nodeValue=i;return}r.replaceWith(F);return}case 3:{if(!r)return;let{attributes:F,children:i}=e;G(r,F);let t=Array.from(r.childNodes);await Promise.all(i.map((n,a)=>h(r,n,t[a])));return}}}function m(u,e){let D=c(u,e);return h(u,D)}var su=Object.hasOwnProperty;var U=q(T(),1),cu=(0,U.default)();function y(u){return u.document.body.dataset.slug}var M=(u,e,D)=>{let r=new URL(u.getAttribute(e),D);u.setAttribute(e,r.pathname+r.hash)};function j(u,e){u.querySelectorAll(\'[href^="./"], [href^="../"]\').forEach(D=>M(D,"href",e)),u.querySelectorAll(\'[src^="./"], [src^="../"]\').forEach(D=>M(D,"src",e))}var k=1,C=document.createElement("route-announcer"),uu=u=>u?.nodeType===k,eu=u=>{try{let e=new URL(u);if(window.location.origin===e.origin)return!0}catch{}return!1},tu=u=>{let e=u.origin===window.location.origin,D=u.pathname===window.location.pathname;return e&&D},N=({target:u})=>{if(!uu(u)||u.attributes.getNamedItem("target")?.value==="_blank")return;let e=u.closest("a");if(!e||"routerIgnore"in e.dataset)return;let{href:D}=e;if(eu(D))return{url:new URL(D),scroll:"routerNoscroll"in e.dataset?!1:void 0}};function P(u){let e=new CustomEvent("nav",{detail:{url:u}});document.dispatchEvent(e)}var v=new Set;window.addCleanup=u=>v.add(u);var w;async function B(u,e=!1){w=w||new DOMParser;let D=await fetch(`${u}`).then(n=>{if(n.headers.get("content-type")?.startsWith("text/html"))return n.text();window.location.assign(u)}).catch(()=>{window.location.assign(u)});if(!D)return;v.forEach(n=>n()),v.clear();let r=w.parseFromString(D,"text/html");j(r,u);let F=r.querySelector("title")?.textContent;if(F)document.title=F;else{let n=document.querySelector("h1");F=n?.innerText??n?.textContent??u.pathname}C.textContent!==F&&(C.textContent=F),C.dataset.persist="",r.body.appendChild(C),m(document.body,r.body),e||(u.hash?document.getElementById(decodeURIComponent(u.hash.substring(1)))?.scrollIntoView():window.scrollTo({top:0})),document.head.querySelectorAll(":not([spa-preserve])").forEach(n=>n.remove()),r.head.querySelectorAll(":not([spa-preserve])").forEach(n=>document.head.appendChild(n)),e||history.pushState({},"",u),P(y(window)),delete C.dataset.persist}window.spaNavigate=B;function Du(){return typeof window<"u"&&(window.addEventListener("click",async u=>{let{url:e}=N(u)??{};if(!(!e||u.ctrlKey||u.metaKey)){if(u.preventDefault(),tu(e)&&e.hash){document.getElementById(decodeURIComponent(e.hash.substring(1)))?.scrollIntoView(),history.pushState({},"",e);return}try{B(e,!1)}catch{window.location.assign(e)}}}),window.addEventListener("popstate",u=>{let{url:e}=N(u)??{};if(!(window.location.hash&&window.location.pathname===e?.pathname))try{B(new URL(window.location.toString()),!0)}catch{window.location.reload()}})),new class{go(e){let D=new URL(e,window.location.toString());return B(D,!1)}back(){return window.history.back()}forward(){return window.history.forward()}}}Du();P(y(window));if(!customElements.get("route-announcer")){let u={"aria-live":"assertive","aria-atomic":"true",style:"position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"};customElements.define("route-announcer",class extends HTMLElement{constructor(){super()}connectedCallback(){for(let[D,r]of Object.entries(u))this.setAttribute(D,r)}})}\n';var popover_inline_default='var qt=Object.create;var mt=Object.defineProperty;var Kt=Object.getOwnPropertyDescriptor;var Zt=Object.getOwnPropertyNames;var Qt=Object.getPrototypeOf,Gt=Object.prototype.hasOwnProperty;var Jt=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var te=(t,e,n,u)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Zt(e))!Gt.call(t,i)&&i!==n&&mt(t,i,{get:()=>e[i],enumerable:!(u=Kt(e,i))||u.enumerable});return t};var ee=(t,e,n)=>(n=t!=null?qt(Qt(t)):{},te(e||!t||!t.__esModule?mt(n,"default",{value:t,enumerable:!0}):n,t));var zt=Jt((qe,Vt)=>{"use strict";Vt.exports=Be;function k(t){return t instanceof Buffer?Buffer.from(t):new t.constructor(t.buffer.slice(),t.byteOffset,t.length)}function Be(t){if(t=t||{},t.circles)return xe(t);return t.proto?u:n;function e(i,r){for(var o=Object.keys(i),s=new Array(o.length),c=0;c<o.length;c++){var l=o[c],a=i[l];typeof a!="object"||a===null?s[l]=a:a instanceof Date?s[l]=new Date(a):ArrayBuffer.isView(a)?s[l]=k(a):s[l]=r(a)}return s}function n(i){if(typeof i!="object"||i===null)return i;if(i instanceof Date)return new Date(i);if(Array.isArray(i))return e(i,n);if(i instanceof Map)return new Map(e(Array.from(i),n));if(i instanceof Set)return new Set(e(Array.from(i),n));var r={};for(var o in i)if(Object.hasOwnProperty.call(i,o)!==!1){var s=i[o];typeof s!="object"||s===null?r[o]=s:s instanceof Date?r[o]=new Date(s):s instanceof Map?r[o]=new Map(e(Array.from(s),n)):s instanceof Set?r[o]=new Set(e(Array.from(s),n)):ArrayBuffer.isView(s)?r[o]=k(s):r[o]=n(s)}return r}function u(i){if(typeof i!="object"||i===null)return i;if(i instanceof Date)return new Date(i);if(Array.isArray(i))return e(i,u);if(i instanceof Map)return new Map(e(Array.from(i),u));if(i instanceof Set)return new Set(e(Array.from(i),u));var r={};for(var o in i){var s=i[o];typeof s!="object"||s===null?r[o]=s:s instanceof Date?r[o]=new Date(s):s instanceof Map?r[o]=new Map(e(Array.from(s),u)):s instanceof Set?r[o]=new Set(e(Array.from(s),u)):ArrayBuffer.isView(s)?r[o]=k(s):r[o]=u(s)}return r}}function xe(t){var e=[],n=[];return t.proto?r:i;function u(o,s){for(var c=Object.keys(o),l=new Array(c.length),a=0;a<c.length;a++){var D=c[a],F=o[D];if(typeof F!="object"||F===null)l[D]=F;else if(F instanceof Date)l[D]=new Date(F);else if(ArrayBuffer.isView(F))l[D]=k(F);else{var f=e.indexOf(F);f!==-1?l[D]=n[f]:l[D]=s(F)}}return l}function i(o){if(typeof o!="object"||o===null)return o;if(o instanceof Date)return new Date(o);if(Array.isArray(o))return u(o,i);if(o instanceof Map)return new Map(u(Array.from(o),i));if(o instanceof Set)return new Set(u(Array.from(o),i));var s={};e.push(o),n.push(s);for(var c in o)if(Object.hasOwnProperty.call(o,c)!==!1){var l=o[c];if(typeof l!="object"||l===null)s[c]=l;else if(l instanceof Date)s[c]=new Date(l);else if(l instanceof Map)s[c]=new Map(u(Array.from(l),i));else if(l instanceof Set)s[c]=new Set(u(Array.from(l),i));else if(ArrayBuffer.isView(l))s[c]=k(l);else{var a=e.indexOf(l);a!==-1?s[c]=n[a]:s[c]=i(l)}}return e.pop(),n.pop(),s}function r(o){if(typeof o!="object"||o===null)return o;if(o instanceof Date)return new Date(o);if(Array.isArray(o))return u(o,r);if(o instanceof Map)return new Map(u(Array.from(o),r));if(o instanceof Set)return new Set(u(Array.from(o),r));var s={};e.push(o),n.push(s);for(var c in o){var l=o[c];if(typeof l!="object"||l===null)s[c]=l;else if(l instanceof Date)s[c]=new Date(l);else if(l instanceof Map)s[c]=new Map(u(Array.from(l),r));else if(l instanceof Set)s[c]=new Set(u(Array.from(l),r));else if(ArrayBuffer.isView(l))s[c]=k(l);else{var a=e.indexOf(l);a!==-1?s[c]=n[a]:s[c]=r(l)}}return e.pop(),n.pop(),s}}});var j=Math.min,w=Math.max,K=Math.round;var O=t=>({x:t,y:t}),ue={left:"right",right:"left",bottom:"top",top:"bottom"},ne={start:"end",end:"start"};function lt(t,e,n){return w(t,j(e,n))}function Z(t,e){return typeof t=="function"?t(e):t}function T(t){return t.split("-")[0]}function nt(t){return t.split("-")[1]}function ct(t){return t==="x"?"y":"x"}function Dt(t){return t==="y"?"height":"width"}function Q(t){return["top","bottom"].includes(T(t))?"y":"x"}function at(t){return ct(Q(t))}function dt(t,e,n){n===void 0&&(n=!1);let u=nt(t),i=at(t),r=Dt(i),o=i==="x"?u===(n?"end":"start")?"right":"left":u==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(o=q(o)),[o,q(o)]}function At(t){let e=q(t);return[ut(t),e,ut(e)]}function ut(t){return t.replace(/start|end/g,e=>ne[e])}function ie(t,e,n){let u=["left","right"],i=["right","left"],r=["top","bottom"],o=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:u:e?u:i;case"left":case"right":return e?r:o;default:return[]}}function gt(t,e,n,u){let i=nt(t),r=ie(T(t),n==="start",u);return i&&(r=r.map(o=>o+"-"+i),e&&(r=r.concat(r.map(ut)))),r}function q(t){return t.replace(/left|right|bottom|top/g,e=>ue[e])}function oe(t){return{top:0,right:0,bottom:0,left:0,...t}}function ft(t){return typeof t!="number"?oe(t):{top:t,right:t,bottom:t,left:t}}function P(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function pt(t,e,n){let{reference:u,floating:i}=t,r=Q(e),o=at(e),s=Dt(o),c=T(e),l=r==="y",a=u.x+u.width/2-i.width/2,D=u.y+u.height/2-i.height/2,F=u[s]/2-i[s]/2,f;switch(c){case"top":f={x:a,y:u.y-i.height};break;case"bottom":f={x:a,y:u.y+u.height};break;case"right":f={x:u.x+u.width,y:D};break;case"left":f={x:u.x-i.width,y:D};break;default:f={x:u.x,y:u.y}}switch(nt(e)){case"start":f[o]-=F*(n&&l?-1:1);break;case"end":f[o]+=F*(n&&l?-1:1);break}return f}var Et=async(t,e,n)=>{let{placement:u="bottom",strategy:i="absolute",middleware:r=[],platform:o}=n,s=r.filter(Boolean),c=await(o.isRTL==null?void 0:o.isRTL(e)),l=await o.getElementRects({reference:t,floating:e,strategy:i}),{x:a,y:D}=pt(l,u,c),F=u,f={},m=0;for(let d=0;d<s.length;d++){let{name:A,fn:g}=s[d],{x:E,y:p,data:B,reset:C}=await g({x:a,y:D,initialPlacement:u,placement:F,strategy:i,middlewareData:f,rects:l,platform:o,elements:{reference:t,floating:e}});a=E??a,D=p??D,f={...f,[A]:{...f[A],...B}},C&&m<=50&&(m++,typeof C=="object"&&(C.placement&&(F=C.placement),C.rects&&(l=C.rects===!0?await o.getElementRects({reference:t,floating:e,strategy:i}):C.rects),{x:a,y:D}=pt(l,F,c)),d=-1)}return{x:a,y:D,placement:F,strategy:i,middlewareData:f}};async function Ct(t,e){var n;e===void 0&&(e={});let{x:u,y:i,platform:r,rects:o,elements:s,strategy:c}=t,{boundary:l="clippingAncestors",rootBoundary:a="viewport",elementContext:D="floating",altBoundary:F=!1,padding:f=0}=Z(e,t),m=ft(f),A=s[F?D==="floating"?"reference":"floating":D],g=P(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(A)))==null||n?A:A.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(s.floating)),boundary:l,rootBoundary:a,strategy:c})),E=D==="floating"?{...o.floating,x:u,y:i}:o.reference,p=await(r.getOffsetParent==null?void 0:r.getOffsetParent(s.floating)),B=await(r.isElement==null?void 0:r.isElement(p))?await(r.getScale==null?void 0:r.getScale(p))||{x:1,y:1}:{x:1,y:1},C=P(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:E,offsetParent:p,strategy:c}):E);return{top:(g.top-C.top+m.top)/B.y,bottom:(C.bottom-g.bottom+m.bottom)/B.y,left:(g.left-C.left+m.left)/B.x,right:(C.right-g.right+m.right)/B.x}}var ht=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,u;let{placement:i,middlewareData:r,rects:o,initialPlacement:s,platform:c,elements:l}=e,{mainAxis:a=!0,crossAxis:D=!0,fallbackPlacements:F,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:d=!0,...A}=Z(t,e);if((n=r.arrow)!=null&&n.alignmentOffset)return{};let g=T(i),E=T(s)===s,p=await(c.isRTL==null?void 0:c.isRTL(l.floating)),B=F||(E||!d?[q(s)]:At(s));!F&&m!=="none"&&B.push(...gt(s,d,m,p));let C=[s,...B],N=await Ct(e,A),_=[],U=((u=r.flip)==null?void 0:u.overflows)||[];if(a&&_.push(N[g]),D){let b=dt(i,o,p);_.push(N[b[0]],N[b[1]])}if(U=[...U,{placement:i,overflows:_}],!_.every(b=>b<=0)){var et,x;let b=(((et=r.flip)==null?void 0:et.index)||0)+1,I=C[b];if(I)return{data:{index:b,overflows:U},reset:{placement:I}};let H=(x=U.filter(S=>S.overflows[0]<=0).sort((S,L)=>S.overflows[1]-L.overflows[1])[0])==null?void 0:x.placement;if(!H)switch(f){case"bestFit":{var z;let S=(z=U.map(L=>[L.placement,L.overflows.filter($=>$>0).reduce(($,st)=>$+st,0)]).sort((L,$)=>L[1]-$[1])[0])==null?void 0:z[0];S&&(H=S);break}case"initialPlacement":H=s;break}if(i!==H)return{reset:{placement:H}}}return{}}}};function Bt(t){let e=j(...t.map(r=>r.left)),n=j(...t.map(r=>r.top)),u=w(...t.map(r=>r.right)),i=w(...t.map(r=>r.bottom));return{x:e,y:n,width:u-e,height:i-n}}function re(t){let e=t.slice().sort((i,r)=>i.y-r.y),n=[],u=null;for(let i=0;i<e.length;i++){let r=e[i];!u||r.y-u.y>u.height/2?n.push([r]):n[n.length-1].push(r),u=r}return n.map(i=>P(Bt(i)))}var xt=function(t){return t===void 0&&(t={}),{name:"inline",options:t,async fn(e){let{placement:n,elements:u,rects:i,platform:r,strategy:o}=e,{padding:s=2,x:c,y:l}=Z(t,e),a=Array.from(await(r.getClientRects==null?void 0:r.getClientRects(u.reference))||[]),D=re(a),F=P(Bt(a)),f=ft(s);function m(){if(D.length===2&&D[0].left>D[1].right&&c!=null&&l!=null)return D.find(A=>c>A.left-f.left&&c<A.right+f.right&&l>A.top-f.top&&l<A.bottom+f.bottom)||F;if(D.length>=2){if(Q(n)==="y"){let x=D[0],z=D[D.length-1],b=T(n)==="top",I=x.top,H=z.bottom,S=b?x.left:z.left,L=b?x.right:z.right,$=L-S,st=H-I;return{top:I,bottom:H,left:S,right:L,width:$,height:st,x:S,y:I}}let A=T(n)==="left",g=w(...D.map(x=>x.right)),E=j(...D.map(x=>x.left)),p=D.filter(x=>A?x.left===E:x.right===g),B=p[0].top,C=p[p.length-1].bottom,N=E,_=g,U=_-N,et=C-B;return{top:B,bottom:C,left:N,right:_,width:U,height:et,x:N,y:B}}return F}let d=await r.getElementRects({reference:{getBoundingClientRect:m},floating:u.floating,strategy:o});return i.reference.x!==d.reference.x||i.reference.y!==d.reference.y||i.reference.width!==d.reference.width||i.reference.height!==d.reference.height?{reset:{rects:d}}:{}}}};var yt=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:n,y:u,placement:i}=e,{mainAxis:r=!0,crossAxis:o=!1,limiter:s={fn:A=>{let{x:g,y:E}=A;return{x:g,y:E}}},...c}=Z(t,e),l={x:n,y:u},a=await Ct(e,c),D=Q(T(i)),F=ct(D),f=l[F],m=l[D];if(r){let A=F==="y"?"top":"left",g=F==="y"?"bottom":"right",E=f+a[A],p=f-a[g];f=lt(E,f,p)}if(o){let A=D==="y"?"top":"left",g=D==="y"?"bottom":"right",E=m+a[A],p=m-a[g];m=lt(E,m,p)}let d=s.fn({...e,[F]:f,[D]:m});return{...d,data:{x:d.x-n,y:d.y-u}}}}};function M(t){return vt(t)?(t.nodeName||"").toLowerCase():"#document"}function h(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function W(t){var e;return(e=(vt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function vt(t){return t instanceof Node||t instanceof h(t).Node}function R(t){return t instanceof Element||t instanceof h(t).Element}function v(t){return t instanceof HTMLElement||t instanceof h(t).HTMLElement}function wt(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof h(t).ShadowRoot}function Y(t){let{overflow:e,overflowX:n,overflowY:u,display:i}=y(t);return/auto|scroll|overlay|hidden|clip/.test(e+u+n)&&!["inline","contents"].includes(i)}function bt(t){return["table","td","th"].includes(M(t))}function ot(t){let e=rt(),n=y(t);return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(u=>(n.willChange||"").includes(u))||["paint","layout","strict","content"].some(u=>(n.contain||"").includes(u))}function Ft(t){let e=V(t);for(;v(e)&&!G(e);){if(ot(e))return e;e=V(e)}return null}function rt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function G(t){return["html","body","#document"].includes(M(t))}function y(t){return h(t).getComputedStyle(t)}function J(t){return R(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function V(t){if(M(t)==="html")return t;let e=t.assignedSlot||t.parentNode||wt(t)&&t.host||W(t);return wt(e)?e.host:e}function St(t){let e=V(t);return G(e)?t.ownerDocument?t.ownerDocument.body:t.body:v(e)&&Y(e)?e:St(e)}function it(t,e,n){var u;e===void 0&&(e=[]),n===void 0&&(n=!0);let i=St(t),r=i===((u=t.ownerDocument)==null?void 0:u.body),o=h(i);return r?e.concat(o,o.visualViewport||[],Y(i)?i:[],o.frameElement&&n?it(o.frameElement):[]):e.concat(i,it(i,[],n))}function Ot(t){let e=y(t),n=parseFloat(e.width)||0,u=parseFloat(e.height)||0,i=v(t),r=i?t.offsetWidth:n,o=i?t.offsetHeight:u,s=K(n)!==r||K(u)!==o;return s&&(n=r,u=o),{width:n,height:u,$:s}}function Tt(t){return R(t)?t:t.contextElement}function X(t){let e=Tt(t);if(!v(e))return O(1);let n=e.getBoundingClientRect(),{width:u,height:i,$:r}=Ot(e),o=(r?K(n.width):n.width)/u,s=(r?K(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var se=O(0);function Pt(t){let e=h(t);return!rt()||!e.visualViewport?se:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function le(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==h(t)?!1:e}function tt(t,e,n,u){e===void 0&&(e=!1),n===void 0&&(n=!1);let i=t.getBoundingClientRect(),r=Tt(t),o=O(1);e&&(u?R(u)&&(o=X(u)):o=X(t));let s=le(r,n,u)?Pt(r):O(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,a=i.width/o.x,D=i.height/o.y;if(r){let F=h(r),f=u&&R(u)?h(u):u,m=F.frameElement;for(;m&&u&&f!==F;){let d=X(m),A=m.getBoundingClientRect(),g=y(m),E=A.left+(m.clientLeft+parseFloat(g.paddingLeft))*d.x,p=A.top+(m.clientTop+parseFloat(g.paddingTop))*d.y;c*=d.x,l*=d.y,a*=d.x,D*=d.y,c+=E,l+=p,m=h(m).frameElement}}return P({width:a,height:D,x:c,y:l})}var ce=[":popover-open",":modal"];function Mt(t){let e=!1,n=0,u=0;function i(r){try{e=e||t.matches(r)}catch{}}if(ce.forEach(r=>{i(r)}),e){let r=Ft(t);if(r){let o=r.getBoundingClientRect();n=o.x,u=o.y}}return[e,n,u]}function De(t){let{elements:e,rect:n,offsetParent:u,strategy:i}=t,r=W(u),[o]=e?Mt(e.floating):[!1];if(u===r||o)return n;let s={scrollLeft:0,scrollTop:0},c=O(1),l=O(0),a=v(u);if((a||!a&&i!=="fixed")&&((M(u)!=="body"||Y(r))&&(s=J(u)),v(u))){let D=tt(u);c=X(u),l.x=D.x+u.clientLeft,l.y=D.y+u.clientTop}return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-s.scrollLeft*c.x+l.x,y:n.y*c.y-s.scrollTop*c.y+l.y}}function ae(t){return Array.from(t.getClientRects())}function Wt(t){return tt(W(t)).left+J(t).scrollLeft}function fe(t){let e=W(t),n=J(t),u=t.ownerDocument.body,i=w(e.scrollWidth,e.clientWidth,u.scrollWidth,u.clientWidth),r=w(e.scrollHeight,e.clientHeight,u.scrollHeight,u.clientHeight),o=-n.scrollLeft+Wt(t),s=-n.scrollTop;return y(u).direction==="rtl"&&(o+=w(e.clientWidth,u.clientWidth)-i),{width:i,height:r,x:o,y:s}}function Fe(t,e){let n=h(t),u=W(t),i=n.visualViewport,r=u.clientWidth,o=u.clientHeight,s=0,c=0;if(i){r=i.width,o=i.height;let l=rt();(!l||l&&e==="fixed")&&(s=i.offsetLeft,c=i.offsetTop)}return{width:r,height:o,x:s,y:c}}function me(t,e){let n=tt(t,!0,e==="fixed"),u=n.top+t.clientTop,i=n.left+t.clientLeft,r=v(t)?X(t):O(1),o=t.clientWidth*r.x,s=t.clientHeight*r.y,c=i*r.x,l=u*r.y;return{width:o,height:s,x:c,y:l}}function Rt(t,e,n){let u;if(e==="viewport")u=Fe(t,n);else if(e==="document")u=fe(W(t));else if(R(e))u=me(e,n);else{let i=Pt(t);u={...e,x:e.x-i.x,y:e.y-i.y}}return P(u)}function Ht(t,e){let n=V(t);return n===e||!R(n)||G(n)?!1:y(n).position==="fixed"||Ht(n,e)}function de(t,e){let n=e.get(t);if(n)return n;let u=it(t,[],!1).filter(s=>R(s)&&M(s)!=="body"),i=null,r=y(t).position==="fixed",o=r?V(t):t;for(;R(o)&&!G(o);){let s=y(o),c=ot(o);!c&&s.position==="fixed"&&(i=null),(r?!c&&!i:!c&&s.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||Y(o)&&!c&&Ht(t,o))?u=u.filter(a=>a!==o):i=s,o=V(o)}return e.set(t,u),u}function Ae(t){let{element:e,boundary:n,rootBoundary:u,strategy:i}=t,o=[...n==="clippingAncestors"?de(e,this._c):[].concat(n),u],s=o[0],c=o.reduce((l,a)=>{let D=Rt(e,a,i);return l.top=w(D.top,l.top),l.right=j(D.right,l.right),l.bottom=j(D.bottom,l.bottom),l.left=w(D.left,l.left),l},Rt(e,s,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function ge(t){let{width:e,height:n}=Ot(t);return{width:e,height:n}}function pe(t,e,n,u){let i=v(e),r=W(e),o=n==="fixed",s=tt(t,!0,o,e),c={scrollLeft:0,scrollTop:0},l=O(0);if(i||!i&&!o)if((M(e)!=="body"||Y(r))&&(c=J(e)),i){let d=tt(e,!0,o,e);l.x=d.x+e.clientLeft,l.y=d.y+e.clientTop}else r&&(l.x=Wt(r));let a=s.left+c.scrollLeft-l.x,D=s.top+c.scrollTop-l.y,[F,f,m]=Mt(u);return F&&(a+=f,D+=m,i&&(a+=e.clientLeft,D+=e.clientTop)),{x:a,y:D,width:s.width,height:s.height}}function Lt(t,e){return!v(t)||y(t).position==="fixed"?null:e?e(t):t.offsetParent}function jt(t,e){let n=h(t);if(!v(t))return n;let u=Lt(t,e);for(;u&&bt(u)&&y(u).position==="static";)u=Lt(u,e);return u&&(M(u)==="html"||M(u)==="body"&&y(u).position==="static"&&!ot(u))?n:u||Ft(t)||n}var Ee=async function(t){let e=this.getOffsetParent||jt,n=this.getDimensions;return{reference:pe(t.reference,await e(t.floating),t.strategy,t.floating),floating:{x:0,y:0,...await n(t.floating)}}};function Ce(t){return y(t).direction==="rtl"}var he={convertOffsetParentRelativeRectToViewportRelativeRect:De,getDocumentElement:W,getClippingRect:Ae,getOffsetParent:jt,getElementRects:Ee,getClientRects:ae,getDimensions:ge,getScale:X,isElement:R,isRTL:Ce};var Nt=yt,_t=ht;var Ut=xt;var $t=(t,e,n)=>{let u=new Map,i={platform:he,...n},r={...i.platform,_c:u};return Et(t,e,{...i,platform:r})};var Xe=Object.hasOwnProperty;var Yt=ee(zt(),1),Qe=(0,Yt.default)();var It=(t,e,n)=>{let u=new URL(t.getAttribute(e),n);t.setAttribute(e,u.pathname+u.hash)};function Xt(t,e){t.querySelectorAll(\'[href^="./"], [href^="../"]\').forEach(n=>It(n,"href",e)),t.querySelectorAll(\'[src^="./"], [src^="../"]\').forEach(n=>It(n,"src",e))}var ye=new DOMParser;async function kt({clientX:t,clientY:e}){let n=this;if(n.dataset.noPopover==="true")return;async function u(f){let{x:m,y:d}=await $t(n,f,{middleware:[Ut({x:t,y:e}),Nt(),_t()]});Object.assign(f.style,{left:`${m}px`,top:`${d}px`})}let i=()=>[...n.children].some(f=>f.classList.contains("popover"));if(i())return u(n.lastChild);let r=new URL(document.location.href);r.hash="",r.search="";let o=new URL(n.href),s=o.hash;o.hash="",o.search="";let c=await fetch(`${o}`).then(f=>f.text()).catch(f=>{console.error(f)});if(i()||!c)return;let l=ye.parseFromString(c,"text/html");Xt(l,o);let a=[...l.getElementsByClassName("popover-hint")];if(a.length===0)return;let D=document.createElement("div");D.classList.add("popover");let F=document.createElement("div");if(F.classList.add("popover-inner"),D.appendChild(F),a.forEach(f=>F.appendChild(f)),u(D),n.appendChild(D),s!==""){let f=F.querySelector(s);f&&F.scroll({top:f.offsetTop-12,behavior:"instant"})}}document.addEventListener("nav",()=>{let t=[...document.getElementsByClassName("internal")];for(let e of t)e.addEventListener("mouseenter",kt),window.addCleanup(()=>e.removeEventListener("mouseenter",kt))});\n';var custom_default=`code[data-theme*=" "] {
  color: var(--shiki-light);
  background-color: var(--shiki-light-bg);
}

code[data-theme*=" "] span {
  color: var(--shiki-light);
}

[saved-theme=dark] code[data-theme*=" "] {
  color: var(--shiki-dark);
  background-color: var(--shiki-dark-bg);
}

[saved-theme=dark] code[data-theme*=" "] span {
  color: var(--shiki-dark);
}

.callout {
  border: 1px solid var(--border);
  background-color: var(--bg);
  border-radius: 5px;
  padding: 0 1rem;
  overflow-y: hidden;
  transition: max-height 0.3s ease;
  box-sizing: border-box;
  --callout-icon-note: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="2" x2="22" y2="6"></line><path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path></svg>');
  --callout-icon-abstract: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>');
  --callout-icon-info: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>');
  --callout-icon-todo: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>');
  --callout-icon-tip: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> ');
  --callout-icon-success: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ');
  --callout-icon-question: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> ');
  --callout-icon-warning: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>');
  --callout-icon-failure: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> ');
  --callout-icon-danger: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> ');
  --callout-icon-bug: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"></rect><path d="m19 7-3 2"></path><path d="m5 7 3 2"></path><path d="m19 19-3-2"></path><path d="m5 19 3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path><path d="m10 4 1 2"></path><path d="m14 4-1 2"></path></svg>');
  --callout-icon-example: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> ');
  --callout-icon-quote: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>');
  --callout-icon-fold: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolyline points="6 9 12 15 18 9"%3E%3C/polyline%3E%3C/svg%3E');
}
.callout > *:nth-child(2) {
  margin-top: 0;
}
.callout[data-callout] {
  --color: #448aff;
  --border: #448aff44;
  --bg: #448aff10;
  --callout-icon: var(--callout-icon-note);
}
.callout[data-callout=abstract] {
  --color: #00b0ff;
  --border: #00b0ff44;
  --bg: #00b0ff10;
  --callout-icon: var(--callout-icon-abstract);
}
.callout[data-callout=info], .callout[data-callout=todo] {
  --color: #00b8d4;
  --border: #00b8d444;
  --bg: #00b8d410;
  --callout-icon: var(--callout-icon-info);
}
.callout[data-callout=todo] {
  --callout-icon: var(--callout-icon-todo);
}
.callout[data-callout=tip] {
  --color: #00bfa5;
  --border: #00bfa544;
  --bg: #00bfa510;
  --callout-icon: var(--callout-icon-tip);
}
.callout[data-callout=success] {
  --color: #09ad7a;
  --border: #09ad7144;
  --bg: #09ad7110;
  --callout-icon: var(--callout-icon-success);
}
.callout[data-callout=question] {
  --color: #dba642;
  --border: #dba64244;
  --bg: #dba64210;
  --callout-icon: var(--callout-icon-question);
}
.callout[data-callout=warning] {
  --color: #db8942;
  --border: #db894244;
  --bg: #db894210;
  --callout-icon: var(--callout-icon-warning);
}
.callout[data-callout=failure], .callout[data-callout=danger], .callout[data-callout=bug] {
  --color: #db4242;
  --border: #db424244;
  --bg: #db424210;
  --callout-icon: var(--callout-icon-failure);
}
.callout[data-callout=bug] {
  --callout-icon: var(--callout-icon-bug);
}
.callout[data-callout=danger] {
  --callout-icon: var(--callout-icon-danger);
}
.callout[data-callout=example] {
  --color: #7a43b5;
  --border: #7a43b544;
  --bg: #7a43b510;
  --callout-icon: var(--callout-icon-example);
}
.callout[data-callout=quote] {
  --color: var(--secondary);
  --border: var(--lightgray);
  --callout-icon: var(--callout-icon-quote);
}
.callout.is-collapsed > .callout-title > .fold-callout-icon {
  transform: rotateZ(-90deg);
}

.callout-title {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  padding: 1rem 0;
  color: var(--color);
  --icon-size: 18px;
}
.callout-title .fold-callout-icon {
  transition: transform 0.15s ease;
  opacity: 0.8;
  cursor: pointer;
  --callout-icon: var(--callout-icon-fold);
}
.callout-title > .callout-title-inner > p {
  color: var(--color);
  margin: 0;
}
.callout-title .callout-icon, .callout-title .fold-callout-icon {
  width: var(--icon-size);
  height: var(--icon-size);
  flex: 0 0 var(--icon-size);
  background-size: var(--icon-size) var(--icon-size);
  background-position: center;
  background-color: var(--color);
  mask-image: var(--callout-icon);
  mask-size: var(--icon-size) var(--icon-size);
  mask-position: center;
  mask-repeat: no-repeat;
  padding: 0.2rem 0;
}
.callout-title .callout-title-inner {
  font-weight: 700;
}

html {
  scroll-behavior: smooth;
  text-size-adjust: none;
  overflow-x: hidden;
  width: 100vw;
}

body,
section {
  margin: 0;
  max-width: 100%;
  box-sizing: border-box;
  background-color: var(--light);
  font-family: var(--bodyFont);
  color: var(--darkgray);
}

.text-highlight {
  background-color: rgba(255, 242, 54, 0.5333333333);
  padding: 0 0.1rem;
  border-radius: 5px;
}

::selection {
  background: color-mix(in srgb, var(--tertiary) 60%, rgba(255, 255, 255, 0));
  color: var(--darkgray);
}

p,
ul,
text,
a,
tr,
td,
li,
ol,
ul,
.katex,
.math {
  color: var(--darkgray);
  fill: var(--darkgray);
  overflow-wrap: anywhere;
  hyphens: auto;
}

.math.math-display {
  text-align: center;
}

a {
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
  color: var(--secondary);
}
a:hover {
  color: var(--tertiary) !important;
}
a.internal {
  text-decoration: none;
  background-color: var(--highlight);
  padding: 0 0.1rem;
  border-radius: 5px;
  line-height: 1.4rem;
}
a.internal:has(> img) {
  background-color: none;
  border-radius: 0;
  padding: 0;
}
a.external .external-icon {
  height: 1ex;
  margin: 0 0.15em;
}
a.external .external-icon > path {
  fill: var(--dark);
}

.desktop-only {
  display: initial;
}
@media all and (max-width: 1510px) {
  .desktop-only {
    display: none;
  }
}

.mobile-only {
  display: none;
}
@media all and (max-width: 1510px) {
  .mobile-only {
    display: initial;
  }
}

@media all and (max-width: 1510px) {
  .page {
    margin: 0 auto;
    padding: 0 1rem;
    max-width: 750px;
  }
}
.page article > h1 {
  font-size: 2rem;
}
.page article li:has(> input[type=checkbox]) {
  list-style-type: none;
  padding-left: 0;
}
.page article li:has(> input[type=checkbox]:checked) {
  text-decoration: line-through;
  text-decoration-color: var(--gray);
  color: var(--gray);
}
.page article li > * {
  margin-top: 0;
  margin-bottom: 0;
}
.page article p > strong {
  color: var(--dark);
}
.page > #quartz-body {
  width: 100%;
  display: flex;
}
@media all and (max-width: 1510px) {
  .page > #quartz-body {
    flex-direction: column;
  }
}
.page > #quartz-body .sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  top: 0;
  width: 380px;
  margin-top: 6rem;
  box-sizing: border-box;
  padding: 0 4rem;
  position: fixed;
}
@media all and (max-width: 1510px) {
  .page > #quartz-body .sidebar {
    position: initial;
    flex-direction: row;
    padding: 0;
    width: initial;
    margin-top: 2rem;
  }
}
.page > #quartz-body .sidebar.left {
  left: calc((100vw - 750px) / 2 - 380px);
}
@media all and (max-width: 1510px) {
  .page > #quartz-body .sidebar.left {
    gap: 0;
    align-items: center;
  }
}
.page > #quartz-body .sidebar.right {
  right: calc((100vw - 750px) / 2 - 380px);
  flex-wrap: wrap;
}
@media all and (max-width: 1510px) {
  .page > #quartz-body .sidebar.right > * {
    flex: 1;
    min-width: 140px;
  }
}
.page .page-header {
  width: 750px;
  margin: 6rem auto 0 auto;
}
@media all and (max-width: 1510px) {
  .page .page-header {
    width: initial;
    margin-top: 2rem;
  }
}
.page .center, .page footer {
  margin-left: auto;
  margin-right: auto;
  width: 750px;
}
@media all and (max-width: 1510px) {
  .page .center, .page footer {
    width: initial;
    margin-left: 0;
    margin-right: 0;
  }
}

.footnotes {
  margin-top: 2rem;
  border-top: 1px solid var(--lightgray);
}

input[type=checkbox] {
  transform: translateY(2px);
  color: var(--secondary);
  border: 1px solid var(--lightgray);
  border-radius: 3px;
  background-color: var(--light);
  position: relative;
  margin-inline-end: 0.2rem;
  margin-inline-start: -1.4rem;
  appearance: none;
  width: 16px;
  height: 16px;
}
input[type=checkbox]:checked {
  border-color: var(--secondary);
  background-color: var(--secondary);
}
input[type=checkbox]:checked::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  display: block;
  border: solid var(--light);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

blockquote {
  margin: 1rem 0;
  border-left: 3px solid var(--secondary);
  padding-left: 1rem;
  transition: border-color 0.2s ease;
}

h1,
h2,
h3,
h4,
h5,
h6,
thead {
  font-family: var(--headerFont);
  color: var(--dark);
  font-weight: revert;
  margin-bottom: 0;
}
article > h1 > a,
article > h2 > a,
article > h3 > a,
article > h4 > a,
article > h5 > a,
article > h6 > a,
article > thead > a {
  color: var(--dark);
}
article > h1 > a.internal,
article > h2 > a.internal,
article > h3 > a.internal,
article > h4 > a.internal,
article > h5 > a.internal,
article > h6 > a.internal,
article > thead > a.internal {
  background-color: transparent;
}

h1[id] > a[href^="#"],
h2[id] > a[href^="#"],
h3[id] > a[href^="#"],
h4[id] > a[href^="#"],
h5[id] > a[href^="#"],
h6[id] > a[href^="#"] {
  margin: 0 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  transform: translateY(-0.1rem);
  font-family: var(--codeFont);
  user-select: none;
}
h1[id]:hover > a,
h2[id]:hover > a,
h3[id]:hover > a,
h4[id]:hover > a,
h5[id]:hover > a,
h6[id]:hover > a {
  opacity: 1;
}

h1 {
  font-size: 1.75rem;
  margin-top: 2.25rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.4rem;
  margin-top: 1.9rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.12rem;
  margin-top: 1.62rem;
  margin-bottom: 1rem;
}

h4,
h5,
h6 {
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

figure[data-rehype-pretty-code-figure] {
  margin: 0;
  position: relative;
  line-height: 1.6rem;
  position: relative;
}
figure[data-rehype-pretty-code-figure] > [data-rehype-pretty-code-title] {
  font-family: var(--codeFont);
  font-size: 0.9rem;
  padding: 0.1rem 0.5rem;
  border: 1px solid var(--lightgray);
  width: max-content;
  border-radius: 5px;
  margin-bottom: -0.5rem;
  color: var(--darkgray);
}
figure[data-rehype-pretty-code-figure] > pre {
  padding: 0;
}

pre {
  font-family: var(--codeFont);
  padding: 0 0.5rem;
  border-radius: 5px;
  overflow-x: auto;
  border: 1px solid var(--lightgray);
  position: relative;
}
pre:has(> code.mermaid) {
  border: none;
}
pre > code {
  background: none;
  padding: 0;
  font-size: 0.85rem;
  counter-reset: line;
  counter-increment: line 0;
  display: grid;
  padding: 0.5rem 0;
  overflow-x: scroll;
}
pre > code [data-highlighted-chars] {
  background-color: var(--highlight);
  border-radius: 5px;
}
pre > code > [data-line] {
  padding: 0 0.25rem;
  box-sizing: border-box;
  border-left: 3px solid transparent;
}
pre > code > [data-line][data-highlighted-line] {
  background-color: var(--highlight);
  border-left: 3px solid var(--secondary);
}
pre > code > [data-line]::before {
  content: counter(line);
  counter-increment: line;
  width: 1rem;
  margin-right: 1rem;
  display: inline-block;
  text-align: right;
  color: rgba(115, 138, 148, 0.6);
}
pre > code[data-line-numbers-max-digits="2"] > [data-line]::before {
  width: 2rem;
}
pre > code[data-line-numbers-max-digits="3"] > [data-line]::before {
  width: 3rem;
}

code {
  font-size: 0.9em;
  color: var(--dark);
  font-family: var(--codeFont);
  border-radius: 5px;
  padding: 0.1rem 0.2rem;
  background: var(--lightgray);
}

tbody,
li,
p {
  line-height: 1.6rem;
}

.table-container {
  overflow-x: auto;
}
.table-container > table {
  margin: 1rem;
  padding: 1.5rem;
  border-collapse: collapse;
}
.table-container > table th,
.table-container > table td {
  min-width: 75px;
}
.table-container > table > * {
  line-height: 2rem;
}

th {
  text-align: left;
  padding: 0.4rem 0.7rem;
  border-bottom: 2px solid var(--gray);
}

td {
  padding: 0.2rem 0.7rem;
}

tr {
  border-bottom: 1px solid var(--lightgray);
}
tr:last-child {
  border-bottom: none;
}

img {
  max-width: 100%;
  border-radius: 5px;
  margin: 1rem 0;
}

p > img + em {
  display: block;
  transform: translateY(-1rem);
}

hr {
  width: 100%;
  margin: 2rem auto;
  height: 1px;
  border: none;
  background-color: var(--lightgray);
}

audio,
video {
  width: 100%;
  border-radius: 5px;
}

.spacer {
  flex: 1 1 auto;
}

ul.overflow,
ol.overflow {
  max-height: 400;
  overflow-y: auto;
  content: "";
  clear: both;
}
ul.overflow > li:last-of-type,
ol.overflow > li:last-of-type {
  margin-bottom: 30px;
}
ul.overflow:after,
ol.overflow:after {
  pointer-events: none;
  content: "";
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 1;
  transition: opacity 0.3s ease;
  background: linear-gradient(transparent 0px, var(--light));
}

.transclude ul {
  padding-left: 1rem;
}

body[data-slug=index] img {
  filter: invert(0%);
  opacity: 0.85;
}

body[data-slug=index] #quartz-body > div.center > div > div > ul {
  display: none;
}

body[data-slug=index] #quartz-body > div.center > div > div > .content-meta {
  display: none;
}

[saved-theme=dark] body[data-slug=index] img[src="./banner.svg"] {
  filter: invert(100%);
}

.left {
  display: grid !important;
  gap: 1.5rem !important;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content min-content min-content;
  align-items: center;
}
.left .page-title {
  grid-area: 1/1/2/3;
}
.left .search {
  grid-area: 2/1/3/2;
}
.left .darkmode {
  grid-area: 2/2/3/3;
}
.left .toc {
  grid-row: 3;
  grid-column: 1/3;
}
.left .recent-notes:nth-last-child(2) {
  grid-area: 3/1/3/3;
}
.left .recent-notes:nth-last-child(1) {
  grid-area: 4/1/4/3;
}
@media all and (max-width: 1510px) {
  .left {
    display: flex !important;
  }
}

hr {
  overflow: visible;
  padding: 0;
  margin: 4em auto;
  border: none;
  color: var(--gray);
  text-align: center;
  width: 40%;
  border-color: var(--gray);
}
hr:after {
  content: "* * *";
  display: inline-block;
  margin: -1em 0 0.5em;
  font-size: 1.5em;
  padding: 0.5em 1em;
  background: var(--light);
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9zdHlsZXMiLCJzb3VyY2VzIjpbInN5bnRheC5zY3NzIiwiY2FsbG91dHMuc2NzcyIsInZhcmlhYmxlcy5zY3NzIiwiYmFzZS5zY3NzIiwiY3VzdG9tLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFO0VBQ0E7OztBQUdGO0VBQ0U7OztBQ1pGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFNQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQWpCQTtFQUNFOztBQWtCRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFFRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFHRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOztBQUdGO0VBQ0U7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFFQTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUVFO0VBQ0E7RUFDQTtFQUdBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRSxhQ3pKUzs7O0FDRmI7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtFQUVFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtFQVdFO0VBQ0E7RUFDQTtFQUNBOzs7QUFJQTtFQUNFOzs7QUFJSjtFQUNFLGFEbERXO0VDbURYO0VBQ0E7RUFDQTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTs7QUFJSjtFQUNFO0VBQ0E7O0FBRUE7RUFDRTs7O0FBS047RUFDRTs7QUFDQTtFQUZGO0lBR0k7Ozs7QUFJSjtFQUNFOztBQUNBO0VBRkY7SUFHSTs7OztBQUtGO0VBREY7SUFFSTtJQUNBO0lBQ0EsV0QzR1E7OztBQytHUjtFQUNFOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTs7QUFJSjtFQUNFO0VBQ0E7O0FBQ0E7RUFIRjtJQUlJOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxPRGxKVztFQ21KWCxZRGxKTztFQ21KUDtFQUNBO0VBQ0E7O0FBQ0E7RUFYRjtJQVlJO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7OztBQUlKO0VBQ0U7O0FBQ0E7RUFGRjtJQUdJO0lBQ0E7OztBQUlKO0VBQ0U7RUFDQTs7QUFFRTtFQURGO0lBRUk7SUFDQTs7O0FBTVI7RUFDRSxPRHhMUTtFQ3lMUjs7QUFDQTtFQUhGO0lBSUk7SUFDQTs7O0FBSUo7RUFFRTtFQUNBO0VBQ0EsT0RwTVE7O0FDcU1SO0VBTEY7SUFNSTtJQUNBO0lBQ0E7Ozs7QUFLTjtFQUNFO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBS047RUFDRTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7RUFPRTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtFQUNFOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0VBQ0U7OztBQVdKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7RUFDRTs7O0FBS0o7RUFDRTtFQUNBO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0VBR0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBSUo7RUFDRTs7QUFHRjtFQUNFOzs7QUFLTjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0VBR0U7OztBQUdGO0VBQ0U7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7QUFBQTtFQUVFOztBQUdGO0VBQ0U7OztBQUtOO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFOztBQUNBO0VBQ0U7OztBQUlKO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtFQUVFO0VBQ0E7OztBQUdGO0VBQ0U7OztBQUdGO0FBQUE7RUFFRTtFQUNBO0VBR0E7RUFDQTs7QUFFQTtBQUFBO0VBQ0U7O0FBR0Y7QUFBQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7QUFLRjtFQUNFOzs7QUNuZko7RUFDRTtFQUNBOzs7QUFHRjtFQUNDOzs7QUFHRDtFQUNFOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFHRjtFQUNFOztBQUdGO0VBQ0U7O0FBR0Y7RUFDRTtFQUNBOztBQUdGO0VBQ0U7O0FBR0Y7RUFDRTs7QUFHRjtFQWhDRjtJQWlDSTs7OztBQUlKO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFDQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSIsInNvdXJjZXNDb250ZW50IjpbImNvZGVbZGF0YS10aGVtZSo9XCIgXCJdIHtcbiAgY29sb3I6IHZhcigtLXNoaWtpLWxpZ2h0KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpa2ktbGlnaHQtYmcpO1xufVxuXG5jb2RlW2RhdGEtdGhlbWUqPVwiIFwiXSBzcGFuIHtcbiAgY29sb3I6IHZhcigtLXNoaWtpLWxpZ2h0KTtcbn1cblxuW3NhdmVkLXRoZW1lPVwiZGFya1wiXSBjb2RlW2RhdGEtdGhlbWUqPVwiIFwiXSB7XG4gIGNvbG9yOiB2YXIoLS1zaGlraS1kYXJrKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpa2ktZGFyay1iZyk7XG59XG5cbltzYXZlZC10aGVtZT1cImRhcmtcIl0gY29kZVtkYXRhLXRoZW1lKj1cIiBcIl0gc3BhbiB7XG4gIGNvbG9yOiB2YXIoLS1zaGlraS1kYXJrKTtcbn1cbiIsIkB1c2UgXCIuL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcbkB1c2UgXCJzYXNzOmNvbG9yXCI7XG5cbi5jYWxsb3V0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmcpO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuM3MgZWFzZTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAmID4gKjpudGgtY2hpbGQoMikge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cblxuICAtLWNhbGxvdXQtaWNvbi1ub3RlOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCwgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48bGluZSB4MT1cIjE4XCIgeTE9XCIyXCIgeDI9XCIyMlwiIHkyPVwiNlwiPjwvbGluZT48cGF0aCBkPVwiTTcuNSAyMC41IDE5IDlsLTQtNEwzLjUgMTYuNSAyIDIyelwiPjwvcGF0aD48L3N2Zz4nKTtcbiAgLS1jYWxsb3V0LWljb24tYWJzdHJhY3Q6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LCA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxyZWN0IHg9XCI4XCIgeT1cIjJcIiB3aWR0aD1cIjhcIiBoZWlnaHQ9XCI0XCIgcng9XCIxXCIgcnk9XCIxXCI+PC9yZWN0PjxwYXRoIGQ9XCJNMTYgNGgyYTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0yaDJcIj48L3BhdGg+PHBhdGggZD1cIk0xMiAxMWg0XCI+PC9wYXRoPjxwYXRoIGQ9XCJNMTIgMTZoNFwiPjwvcGF0aD48cGF0aCBkPVwiTTggMTFoLjAxXCI+PC9wYXRoPjxwYXRoIGQ9XCJNOCAxNmguMDFcIj48L3BhdGg+PC9zdmc+Jyk7XG4gIC0tY2FsbG91dC1pY29uLWluZm86IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LCA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIj48L2NpcmNsZT48bGluZSB4MT1cIjEyXCIgeTE9XCIxNlwiIHgyPVwiMTJcIiB5Mj1cIjEyXCI+PC9saW5lPjxsaW5lIHgxPVwiMTJcIiB5MT1cIjhcIiB4Mj1cIjEyLjAxXCIgeTI9XCI4XCI+PC9saW5lPjwvc3ZnPicpO1xuICAtLWNhbGxvdXQtaWNvbi10b2RvOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCwgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBkPVwiTTEyIDIyYzUuNTIzIDAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTB6XCI+PC9wYXRoPjxwYXRoIGQ9XCJtOSAxMiAyIDIgNC00XCI+PC9wYXRoPjwvc3ZnPicpO1xuICAtLWNhbGxvdXQtaWNvbi10aXA6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggZD1cIk04LjUgMTQuNUEyLjUgMi41IDAgMCAwIDExIDEyYzAtMS4zOC0uNS0yLTEtMy0xLjA3Mi0yLjE0My0uMjI0LTQuMDU0IDItNiAuNSAyLjUgMiA0LjkgNCA2LjUgMiAxLjYgMyAzLjUgMyA1LjVhNyA3IDAgMSAxLTE0IDBjMC0xLjE1My40MzMtMi4yOTQgMS0zYTIuNSAyLjUgMCAwIDAgMi41IDIuNXpcIj48L3BhdGg+PC9zdmc+ICcpO1xuICAtLWNhbGxvdXQtaWNvbi1zdWNjZXNzOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCw8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwb2x5bGluZSBwb2ludHM9XCIyMCA2IDkgMTcgNCAxMlwiPjwvcG9seWxpbmU+PC9zdmc+ICcpO1xuICAtLWNhbGxvdXQtaWNvbi1xdWVzdGlvbjogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjEwXCI+PC9jaXJjbGU+PHBhdGggZD1cIk05LjA5IDlhMyAzIDAgMCAxIDUuODMgMWMwIDItMyAzLTMgM1wiPjwvcGF0aD48bGluZSB4MT1cIjEyXCIgeTE9XCIxN1wiIHgyPVwiMTIuMDFcIiB5Mj1cIjE3XCI+PC9saW5lPjwvc3ZnPiAnKTtcbiAgLS1jYWxsb3V0LWljb24td2FybmluZzogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggZD1cIm0yMS43MyAxOC04LTE0YTIgMiAwIDAgMC0zLjQ4IDBsLTggMTRBMiAyIDAgMCAwIDQgMjFoMTZhMiAyIDAgMCAwIDEuNzMtM1pcIj48L3BhdGg+PGxpbmUgeDE9XCIxMlwiIHkxPVwiOVwiIHgyPVwiMTJcIiB5Mj1cIjEzXCI+PC9saW5lPjxsaW5lIHgxPVwiMTJcIiB5MT1cIjE3XCIgeDI9XCIxMi4wMVwiIHkyPVwiMTdcIj48L2xpbmU+PC9zdmc+Jyk7XG4gIC0tY2FsbG91dC1pY29uLWZhaWx1cmU6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PGxpbmUgeDE9XCIxOFwiIHkxPVwiNlwiIHgyPVwiNlwiIHkyPVwiMThcIj48L2xpbmU+PGxpbmUgeDE9XCI2XCIgeTE9XCI2XCIgeDI9XCIxOFwiIHkyPVwiMThcIj48L2xpbmU+PC9zdmc+ICcpO1xuICAtLWNhbGxvdXQtaWNvbi1kYW5nZXI6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBvbHlnb24gcG9pbnRzPVwiMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDJcIj48L3BvbHlnb24+PC9zdmc+ICcpO1xuICAtLWNhbGxvdXQtaWNvbi1idWc6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LCA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxyZWN0IHdpZHRoPVwiOFwiIGhlaWdodD1cIjE0XCIgeD1cIjhcIiB5PVwiNlwiIHJ4PVwiNFwiPjwvcmVjdD48cGF0aCBkPVwibTE5IDctMyAyXCI+PC9wYXRoPjxwYXRoIGQ9XCJtNSA3IDMgMlwiPjwvcGF0aD48cGF0aCBkPVwibTE5IDE5LTMtMlwiPjwvcGF0aD48cGF0aCBkPVwibTUgMTkgMy0yXCI+PC9wYXRoPjxwYXRoIGQ9XCJNMjAgMTNoLTRcIj48L3BhdGg+PHBhdGggZD1cIk00IDEzaDRcIj48L3BhdGg+PHBhdGggZD1cIm0xMCA0IDEgMlwiPjwvcGF0aD48cGF0aCBkPVwibTE0IDQtMSAyXCI+PC9wYXRoPjwvc3ZnPicpO1xuICAtLWNhbGxvdXQtaWNvbi1leGFtcGxlOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCw8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxsaW5lIHgxPVwiOFwiIHkxPVwiNlwiIHgyPVwiMjFcIiB5Mj1cIjZcIj48L2xpbmU+PGxpbmUgeDE9XCI4XCIgeTE9XCIxMlwiIHgyPVwiMjFcIiB5Mj1cIjEyXCI+PC9saW5lPjxsaW5lIHgxPVwiOFwiIHkxPVwiMThcIiB4Mj1cIjIxXCIgeTI9XCIxOFwiPjwvbGluZT48bGluZSB4MT1cIjNcIiB5MT1cIjZcIiB4Mj1cIjMuMDFcIiB5Mj1cIjZcIj48L2xpbmU+PGxpbmUgeDE9XCIzXCIgeTE9XCIxMlwiIHgyPVwiMy4wMVwiIHkyPVwiMTJcIj48L2xpbmU+PGxpbmUgeDE9XCIzXCIgeTE9XCIxOFwiIHgyPVwiMy4wMVwiIHkyPVwiMThcIj48L2xpbmU+PC9zdmc+ICcpO1xuICAtLWNhbGxvdXQtaWNvbi1xdW90ZTogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggZD1cIk0zIDIxYzMgMCA3LTEgNy04VjVjMC0xLjI1LS43NTYtMi4wMTctMi0ySDRjLTEuMjUgMC0yIC43NS0yIDEuOTcyVjExYzAgMS4yNS43NSAyIDIgMiAxIDAgMSAwIDEgMXYxYzAgMS0xIDItMiAycy0xIC4wMDgtMSAxLjAzMVYyMGMwIDEgMCAxIDEgMXpcIj48L3BhdGg+PHBhdGggZD1cIk0xNSAyMWMzIDAgNy0xIDctOFY1YzAtMS4yNS0uNzU3LTIuMDE3LTItMmgtNGMtMS4yNSAwLTIgLjc1LTIgMS45NzJWMTFjMCAxLjI1Ljc1IDIgMiAyaC43NWMwIDIuMjUuMjUgNC0yLjc1IDR2M2MwIDEgMCAxIDEgMXpcIj48L3BhdGg+PC9zdmc+Jyk7XG4gIC0tY2FsbG91dC1pY29uLWZvbGQ6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiJTNFJTNDcG9seWxpbmUgcG9pbnRzPVwiNiA5IDEyIDE1IDE4IDlcIiUzRSUzQy9wb2x5bGluZSUzRSUzQy9zdmclM0UnKTtcblxuICAmW2RhdGEtY2FsbG91dF0ge1xuICAgIC0tY29sb3I6ICM0NDhhZmY7XG4gICAgLS1ib3JkZXI6ICM0NDhhZmY0NDtcbiAgICAtLWJnOiAjNDQ4YWZmMTA7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1ub3RlKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwiYWJzdHJhY3RcIl0ge1xuICAgIC0tY29sb3I6ICMwMGIwZmY7XG4gICAgLS1ib3JkZXI6ICMwMGIwZmY0NDtcbiAgICAtLWJnOiAjMDBiMGZmMTA7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1hYnN0cmFjdCk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cImluZm9cIl0sXG4gICZbZGF0YS1jYWxsb3V0PVwidG9kb1wiXSB7XG4gICAgLS1jb2xvcjogIzAwYjhkNDtcbiAgICAtLWJvcmRlcjogIzAwYjhkNDQ0O1xuICAgIC0tYmc6ICMwMGI4ZDQxMDtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLWluZm8pO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJ0b2RvXCJdIHtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLXRvZG8pO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJ0aXBcIl0ge1xuICAgIC0tY29sb3I6ICMwMGJmYTU7XG4gICAgLS1ib3JkZXI6ICMwMGJmYTU0NDtcbiAgICAtLWJnOiAjMDBiZmE1MTA7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi10aXApO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJzdWNjZXNzXCJdIHtcbiAgICAtLWNvbG9yOiAjMDlhZDdhO1xuICAgIC0tYm9yZGVyOiAjMDlhZDcxNDQ7XG4gICAgLS1iZzogIzA5YWQ3MTEwO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tc3VjY2Vzcyk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cInF1ZXN0aW9uXCJdIHtcbiAgICAtLWNvbG9yOiAjZGJhNjQyO1xuICAgIC0tYm9yZGVyOiAjZGJhNjQyNDQ7XG4gICAgLS1iZzogI2RiYTY0MjEwO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tcXVlc3Rpb24pO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJ3YXJuaW5nXCJdIHtcbiAgICAtLWNvbG9yOiAjZGI4OTQyO1xuICAgIC0tYm9yZGVyOiAjZGI4OTQyNDQ7XG4gICAgLS1iZzogI2RiODk0MjEwO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24td2FybmluZyk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cImZhaWx1cmVcIl0sXG4gICZbZGF0YS1jYWxsb3V0PVwiZGFuZ2VyXCJdLFxuICAmW2RhdGEtY2FsbG91dD1cImJ1Z1wiXSB7XG4gICAgLS1jb2xvcjogI2RiNDI0MjtcbiAgICAtLWJvcmRlcjogI2RiNDI0MjQ0O1xuICAgIC0tYmc6ICNkYjQyNDIxMDtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLWZhaWx1cmUpO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJidWdcIl0ge1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tYnVnKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwiZGFuZ2VyXCJdIHtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLWRhbmdlcik7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cImV4YW1wbGVcIl0ge1xuICAgIC0tY29sb3I6ICM3YTQzYjU7XG4gICAgLS1ib3JkZXI6ICM3YTQzYjU0NDtcbiAgICAtLWJnOiAjN2E0M2I1MTA7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1leGFtcGxlKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwicXVvdGVcIl0ge1xuICAgIC0tY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XG4gICAgLS1ib3JkZXI6IHZhcigtLWxpZ2h0Z3JheSk7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1xdW90ZSk7XG4gIH1cblxuICAmLmlzLWNvbGxhcHNlZCA+IC5jYWxsb3V0LXRpdGxlID4gLmZvbGQtY2FsbG91dC1pY29uIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVooLTkwZGVnKTtcbiAgfVxufVxuXG4uY2FsbG91dC10aXRsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDVweDtcbiAgcGFkZGluZzogMXJlbSAwO1xuICBjb2xvcjogdmFyKC0tY29sb3IpO1xuXG4gIC0taWNvbi1zaXplOiAxOHB4O1xuXG4gICYgLmZvbGQtY2FsbG91dC1pY29uIHtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xNXMgZWFzZTtcbiAgICBvcGFjaXR5OiAwLjg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tZm9sZCk7XG4gIH1cblxuICAmID4gLmNhbGxvdXQtdGl0bGUtaW5uZXIgPiBwIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3IpO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIC5jYWxsb3V0LWljb24sXG4gICYgLmZvbGQtY2FsbG91dC1pY29uIHtcbiAgICB3aWR0aDogdmFyKC0taWNvbi1zaXplKTtcbiAgICBoZWlnaHQ6IHZhcigtLWljb24tc2l6ZSk7XG4gICAgZmxleDogMCAwIHZhcigtLWljb24tc2l6ZSk7XG5cbiAgICAvLyBpY29uIHN1cHBvcnRcbiAgICBiYWNrZ3JvdW5kLXNpemU6IHZhcigtLWljb24tc2l6ZSkgdmFyKC0taWNvbi1zaXplKTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3IpO1xuICAgIG1hc2staW1hZ2U6IHZhcigtLWNhbGxvdXQtaWNvbik7XG4gICAgbWFzay1zaXplOiB2YXIoLS1pY29uLXNpemUpIHZhcigtLWljb24tc2l6ZSk7XG4gICAgbWFzay1wb3NpdGlvbjogY2VudGVyO1xuICAgIG1hc2stcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgcGFkZGluZzogMC4ycmVtIDA7XG4gIH1cblxuICAuY2FsbG91dC10aXRsZS1pbm5lciB7XG4gICAgZm9udC13ZWlnaHQ6ICRib2xkV2VpZ2h0O1xuICB9XG59XG4iLCIkcGFnZVdpZHRoOiA3NTBweDtcbiRtb2JpbGVCcmVha3BvaW50OiA2MDBweDtcbiR0YWJsZXRCcmVha3BvaW50OiAxMDAwcHg7XG4kc2lkZVBhbmVsV2lkdGg6IDM4MHB4O1xuJHRvcFNwYWNpbmc6IDZyZW07XG4kZnVsbFBhZ2VXaWR0aDogJHBhZ2VXaWR0aCArIDIgKiAkc2lkZVBhbmVsV2lkdGg7XG4kYm9sZFdlaWdodDogNzAwO1xuJG5vcm1hbFdlaWdodDogNDAwO1xuIiwiQHVzZSBcIi4vdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuQHVzZSBcIi4vc3ludGF4LnNjc3NcIjtcbkB1c2UgXCIuL2NhbGxvdXRzLnNjc3NcIjtcblxuaHRtbCB7XG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xuICB0ZXh0LXNpemUtYWRqdXN0OiBub25lO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIHdpZHRoOiAxMDB2dztcbn1cblxuYm9keSxcbnNlY3Rpb24ge1xuICBtYXJnaW46IDA7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xuICBmb250LWZhbWlseTogdmFyKC0tYm9keUZvbnQpO1xuICBjb2xvcjogdmFyKC0tZGFya2dyYXkpO1xufVxuXG4udGV4dC1oaWdobGlnaHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmMjM2ODg7XG4gIHBhZGRpbmc6IDAgMC4xcmVtO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbjo6c2VsZWN0aW9uIHtcbiAgYmFja2dyb3VuZDogY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLXRlcnRpYXJ5KSA2MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCkpO1xuICBjb2xvcjogdmFyKC0tZGFya2dyYXkpO1xufVxuXG5wLFxudWwsXG50ZXh0LFxuYSxcbnRyLFxudGQsXG5saSxcbm9sLFxudWwsXG4ua2F0ZXgsXG4ubWF0aCB7XG4gIGNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XG4gIGZpbGw6IHZhcigtLWRhcmtncmF5KTtcbiAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG4gIGh5cGhlbnM6IGF1dG87XG59XG5cbi5tYXRoIHtcbiAgJi5tYXRoLWRpc3BsYXkge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxufVxuXG5hIHtcbiAgZm9udC13ZWlnaHQ6ICRib2xkV2VpZ2h0O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZTtcbiAgY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRlcnRpYXJ5KSAhaW1wb3J0YW50O1xuICB9XG5cbiAgJi5pbnRlcm5hbCB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpZ2hsaWdodCk7XG4gICAgcGFkZGluZzogMCAwLjFyZW07XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjRyZW07XG5cbiAgICAmOmhhcyg+IGltZykge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbiAgfVxuXG4gICYuZXh0ZXJuYWwgLmV4dGVybmFsLWljb24ge1xuICAgIGhlaWdodDogMWV4O1xuICAgIG1hcmdpbjogMCAwLjE1ZW07XG5cbiAgICA+IHBhdGgge1xuICAgICAgZmlsbDogdmFyKC0tZGFyayk7XG4gICAgfVxuICB9XG59XG5cbi5kZXNrdG9wLW9ubHkge1xuICBkaXNwbGF5OiBpbml0aWFsO1xuICBAbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiAkZnVsbFBhZ2VXaWR0aCkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuLm1vYmlsZS1vbmx5IHtcbiAgZGlzcGxheTogbm9uZTtcbiAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICBkaXNwbGF5OiBpbml0aWFsO1xuICB9XG59XG5cbi5wYWdlIHtcbiAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgbWF4LXdpZHRoOiAkcGFnZVdpZHRoO1xuICB9XG5cbiAgJiBhcnRpY2xlIHtcbiAgICAmID4gaDEge1xuICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgIH1cblxuICAgICYgbGk6aGFzKD4gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdKSB7XG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgfVxuXG4gICAgJiBsaTpoYXMoPiBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCkge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XG4gICAgICB0ZXh0LWRlY29yYXRpb24tY29sb3I6IHZhcigtLWdyYXkpO1xuICAgICAgY29sb3I6IHZhcigtLWdyYXkpO1xuICAgIH1cblxuICAgICYgbGkgPiAqIHtcbiAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cblxuICAgIHAgPiBzdHJvbmcge1xuICAgICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgIH1cbiAgfVxuXG4gICYgPiAjcXVhcnR6LWJvZHkge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfVxuXG4gICAgJiAuc2lkZWJhciB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBnYXA6IDJyZW07XG4gICAgICB0b3A6IDA7XG4gICAgICB3aWR0aDogJHNpZGVQYW5lbFdpZHRoO1xuICAgICAgbWFyZ2luLXRvcDogJHRvcFNwYWNpbmc7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgcGFkZGluZzogMCA0cmVtO1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgICAgcG9zaXRpb246IGluaXRpYWw7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIHdpZHRoOiBpbml0aWFsO1xuICAgICAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgICAgfVxuICAgIH1cblxuICAgICYgLnNpZGViYXIubGVmdCB7XG4gICAgICBsZWZ0OiBjYWxjKGNhbGMoMTAwdncgLSAkcGFnZVdpZHRoKSAvIDIgLSAkc2lkZVBhbmVsV2lkdGgpO1xuICAgICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgICAgZ2FwOiAwO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuICAgIH1cblxuICAgICYgLnNpZGViYXIucmlnaHQge1xuICAgICAgcmlnaHQ6IGNhbGMoY2FsYygxMDB2dyAtICRwYWdlV2lkdGgpIC8gMiAtICRzaWRlUGFuZWxXaWR0aCk7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAmID4gKiB7XG4gICAgICAgIEBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6ICRmdWxsUGFnZVdpZHRoKSB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICBtaW4td2lkdGg6IDE0MHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJiAucGFnZS1oZWFkZXIge1xuICAgIHdpZHRoOiAkcGFnZVdpZHRoO1xuICAgIG1hcmdpbjogJHRvcFNwYWNpbmcgYXV0byAwIGF1dG87XG4gICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgIHdpZHRoOiBpbml0aWFsO1xuICAgICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICB9XG4gIH1cblxuICAmIC5jZW50ZXIsXG4gICYgZm9vdGVyIHtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgd2lkdGg6ICRwYWdlV2lkdGg7XG4gICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgIHdpZHRoOiBpbml0aWFsO1xuICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgfVxuICB9XG59XG5cbi5mb290bm90ZXMge1xuICBtYXJnaW4tdG9wOiAycmVtO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbn1cblxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDJweCk7XG4gIGNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4taW5saW5lLWVuZDogMC4ycmVtO1xuICBtYXJnaW4taW5saW5lLXN0YXJ0OiAtMS40cmVtO1xuICBhcHBlYXJhbmNlOiBub25lO1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuXG4gICY6Y2hlY2tlZCB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XG5cbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogNHB4O1xuICAgICAgdG9wOiAxcHg7XG4gICAgICB3aWR0aDogNHB4O1xuICAgICAgaGVpZ2h0OiA4cHg7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGJvcmRlcjogc29saWQgdmFyKC0tbGlnaHQpO1xuICAgICAgYm9yZGVyLXdpZHRoOiAwIDJweCAycHggMDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICB9XG4gIH1cbn1cblxuYmxvY2txdW90ZSB7XG4gIG1hcmdpbjogMXJlbSAwO1xuICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHZhcigtLXNlY29uZGFyeSk7XG4gIHBhZGRpbmctbGVmdDogMXJlbTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnMgZWFzZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2LFxudGhlYWQge1xuICBmb250LWZhbWlseTogdmFyKC0taGVhZGVyRm9udCk7XG4gIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgZm9udC13ZWlnaHQ6IHJldmVydDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcblxuICBhcnRpY2xlID4gJiA+IGEge1xuICAgIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgICAmLmludGVybmFsIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgfVxufVxuXG5oMSxcbmgyLFxuaDMsXG5oNCxcbmg1LFxuaDYge1xuICAmW2lkXSA+IGFbaHJlZl49XCIjXCJdIHtcbiAgICBtYXJnaW46IDAgMC41cmVtO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjFyZW0pO1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1jb2RlRm9udCk7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIH1cblxuICAmW2lkXTpob3ZlciA+IGEge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuLy8gdHlwb2dyYXBoeSBpbXByb3ZlbWVudHNcbmgxIHtcbiAgZm9udC1zaXplOiAxLjc1cmVtO1xuICBtYXJnaW4tdG9wOiAyLjI1cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG5oMiB7XG4gIGZvbnQtc2l6ZTogMS40cmVtO1xuICBtYXJnaW4tdG9wOiAxLjlyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbmgzIHtcbiAgZm9udC1zaXplOiAxLjEycmVtO1xuICBtYXJnaW4tdG9wOiAxLjYycmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG5oNCxcbmg1LFxuaDYge1xuICBmb250LXNpemU6IDFyZW07XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuZmlndXJlW2RhdGEtcmVoeXBlLXByZXR0eS1jb2RlLWZpZ3VyZV0ge1xuICBtYXJnaW46IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGluZS1oZWlnaHQ6IDEuNnJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICYgPiBbZGF0YS1yZWh5cGUtcHJldHR5LWNvZGUtdGl0bGVdIHtcbiAgICBmb250LWZhbWlseTogdmFyKC0tY29kZUZvbnQpO1xuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIHBhZGRpbmc6IDAuMXJlbSAwLjVyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgICB3aWR0aDogbWF4LWNvbnRlbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IC0wLjVyZW07XG4gICAgY29sb3I6IHZhcigtLWRhcmtncmF5KTtcbiAgfVxuXG4gICYgPiBwcmUge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbn1cblxucHJlIHtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWNvZGVGb250KTtcbiAgcGFkZGluZzogMCAwLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgb3ZlcmZsb3cteDogYXV0bztcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6aGFzKD4gY29kZS5tZXJtYWlkKSB7XG4gICAgYm9yZGVyOiBub25lO1xuICB9XG5cbiAgJiA+IGNvZGUge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgY291bnRlci1yZXNldDogbGluZTtcbiAgICBjb3VudGVyLWluY3JlbWVudDogbGluZSAwO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgcGFkZGluZzogMC41cmVtIDA7XG4gICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuXG4gICAgJiBbZGF0YS1oaWdobGlnaHRlZC1jaGFyc10ge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGlnaGxpZ2h0KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICB9XG5cbiAgICAmID4gW2RhdGEtbGluZV0ge1xuICAgICAgcGFkZGluZzogMCAwLjI1cmVtO1xuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgdHJhbnNwYXJlbnQ7XG5cbiAgICAgICZbZGF0YS1oaWdobGlnaHRlZC1saW5lXSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpZ2hsaWdodCk7XG4gICAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgdmFyKC0tc2Vjb25kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogY291bnRlcihsaW5lKTtcbiAgICAgICAgY291bnRlci1pbmNyZW1lbnQ6IGxpbmU7XG4gICAgICAgIHdpZHRoOiAxcmVtO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIGNvbG9yOiByZ2JhKDExNSwgMTM4LCAxNDgsIDAuNik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJltkYXRhLWxpbmUtbnVtYmVycy1tYXgtZGlnaXRzPVwiMlwiXSA+IFtkYXRhLWxpbmVdOjpiZWZvcmUge1xuICAgICAgd2lkdGg6IDJyZW07XG4gICAgfVxuXG4gICAgJltkYXRhLWxpbmUtbnVtYmVycy1tYXgtZGlnaXRzPVwiM1wiXSA+IFtkYXRhLWxpbmVdOjpiZWZvcmUge1xuICAgICAgd2lkdGg6IDNyZW07XG4gICAgfVxuICB9XG59XG5cbmNvZGUge1xuICBmb250LXNpemU6IDAuOWVtO1xuICBjb2xvcjogdmFyKC0tZGFyayk7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1jb2RlRm9udCk7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMC4xcmVtIDAuMnJlbTtcbiAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHRncmF5KTtcbn1cblxudGJvZHksXG5saSxcbnAge1xuICBsaW5lLWhlaWdodDogMS42cmVtO1xufVxuXG4udGFibGUtY29udGFpbmVyIHtcbiAgb3ZlcmZsb3cteDogYXV0bztcblxuICAmID4gdGFibGUge1xuICAgIG1hcmdpbjogMXJlbTtcbiAgICBwYWRkaW5nOiAxLjVyZW07XG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcblxuICAgIHRoLFxuICAgIHRkIHtcbiAgICAgIG1pbi13aWR0aDogNzVweDtcbiAgICB9XG5cbiAgICAmID4gKiB7XG4gICAgICBsaW5lLWhlaWdodDogMnJlbTtcbiAgICB9XG4gIH1cbn1cblxudGgge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBwYWRkaW5nOiAwLjRyZW0gMC43cmVtO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgdmFyKC0tZ3JheSk7XG59XG5cbnRkIHtcbiAgcGFkZGluZzogMC4ycmVtIDAuN3JlbTtcbn1cblxudHIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xuICB9XG59XG5cbmltZyB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBtYXJnaW46IDFyZW0gMDtcbn1cblxucCA+IGltZyArIGVtIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXJlbSk7XG59XG5cbmhyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMnJlbSBhdXRvO1xuICBoZWlnaHQ6IDFweDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodGdyYXkpO1xufVxuXG5hdWRpbyxcbnZpZGVvIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLnNwYWNlciB7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG51bC5vdmVyZmxvdyxcbm9sLm92ZXJmbG93IHtcbiAgbWF4LWhlaWdodDogNDAwO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuXG4gIC8vIGNsZWFyZml4XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGNsZWFyOiBib3RoO1xuXG4gICYgPiBsaTpsYXN0LW9mLXR5cGUge1xuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gIH1cblxuICAmOmFmdGVyIHtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNTBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDA7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodHJhbnNwYXJlbnQgMHB4LCB2YXIoLS1saWdodCkpO1xuICB9XG59XG5cbi50cmFuc2NsdWRlIHtcbiAgdWwge1xuICAgIHBhZGRpbmctbGVmdDogMXJlbTtcbiAgfVxufVxuIiwiQHVzZSBcIi4vYmFzZS5zY3NzXCI7XG5cbi8vIHB1dCB5b3VyIGN1c3RvbSBDU1MgaGVyZSFcbkB1c2UgXCIuL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcblxuXG5ib2R5W2RhdGEtc2x1Zz1cImluZGV4XCJdIGltZyB7XG4gIGZpbHRlcjogaW52ZXJ0KDAlKTtcbiAgb3BhY2l0eTogMC44NTtcbn1cblxuYm9keVtkYXRhLXNsdWc9XCJpbmRleFwiXSAgI3F1YXJ0ei1ib2R5ID4gZGl2LmNlbnRlciA+IGRpdiA+IGRpdiA+IHVsIHtcbiBkaXNwbGF5OiBub25lO1xufVxuXG5ib2R5W2RhdGEtc2x1Zz1cImluZGV4XCJdICNxdWFydHotYm9keSA+IGRpdi5jZW50ZXIgPiBkaXYgPiBkaXYgPiAuY29udGVudC1tZXRhIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuW3NhdmVkLXRoZW1lPVwiZGFya1wiXSBib2R5W2RhdGEtc2x1Zz1cImluZGV4XCJdIGltZ1tzcmM9XCIuL2Jhbm5lci5zdmdcIl0ge1xuICBmaWx0ZXI6IGludmVydCgxMDAlKTtcbn1cblxuLmxlZnQge1xuICBkaXNwbGF5OiBncmlkICFpbXBvcnRhbnQ7XG4gIGdhcDogMS41cmVtICFpbXBvcnRhbnQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IG1pbi1jb250ZW50IG1pbi1jb250ZW50IG1pbi1jb250ZW50O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gIC5wYWdlLXRpdGxlIHtcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDM7XG4gIH1cblxuICAuc2VhcmNoIHtcbiAgICBncmlkLWFyZWE6IDIgLyAxIC8gMyAvIDI7XG4gIH1cblxuICAuZGFya21vZGUge1xuICAgIGdyaWQtYXJlYTogMiAvIDIgLyAzIC8gMztcbiAgfVxuXG4gIC50b2Mge1xuICAgIGdyaWQtcm93OiAzO1xuICAgIGdyaWQtY29sdW1uOiAxIC8gMztcbiAgfVxuXG4gIC5yZWNlbnQtbm90ZXM6bnRoLWxhc3QtY2hpbGQoMikge1xuICAgIGdyaWQtYXJlYTogMyAvIDEgLyAzIC8gMztcbiAgfVxuXG4gIC5yZWNlbnQtbm90ZXM6bnRoLWxhc3QtY2hpbGQoMSkge1xuICAgIGdyaWQtYXJlYTogNCAvIDEgLyA0IC8gMztcbiAgfVxuXG4gIEBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6ICRmdWxsUGFnZVdpZHRoKSB7XG4gICAgZGlzcGxheTogZmxleCAhaW1wb3J0YW50O1xuICB9XG59XG5cbmhyIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogNGVtIGF1dG87XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHZhcigtLWdyYXkpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA0MCU7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZ3JheSk7XG4gICY6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiKiAqICpcIjtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luOiAtMWVtIDAgMC41ZW07XG4gICAgZm9udC1zaXplOiAxLjVlbTtcbiAgICBwYWRkaW5nOiAwLjVlbSAxZW07XG4gICAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHQpO1xuICB9XG59XG5cbiJdfQ== */`;var popover_default=`@keyframes dropin {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  1% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}
.popover {
  z-index: 999;
  position: absolute;
  overflow: visible;
  padding: 1rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.popover > .popover-inner {
  position: relative;
  width: 30rem;
  max-height: 20rem;
  padding: 0 1rem 1rem 1rem;
  font-weight: initial;
  font-style: initial;
  line-height: normal;
  font-size: initial;
  font-family: var(--bodyFont);
  border: 1px solid var(--lightgray);
  background-color: var(--light);
  border-radius: 5px;
  box-shadow: 6px 6px 36px 0 rgba(0, 0, 0, 0.25);
  overflow: auto;
  white-space: normal;
}
.popover h1 {
  font-size: 1.5rem;
}
@media all and (max-width: 600px) {
  .popover {
    display: none !important;
  }
}

a:hover .popover,
.popover:hover {
  animation: dropin 0.3s ease;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvaW5kcmEvcXVhcnR6L3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsicG9wb3Zlci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0U7SUFDRTtJQUNBOztFQUVGO0lBQ0U7O0VBRUY7SUFDRTtJQUNBOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBd0JBO0VBQ0E7RUFDQSxZQUNFOztBQXpCRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOztBQVNGO0VBbENGO0lBbUNJOzs7O0FBSUo7QUFBQTtFQUVFO0VBQ0E7RUFDQSIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuXG5Aa2V5ZnJhbWVzIGRyb3BpbiB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgfVxuICAxJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbn1cblxuLnBvcG92ZXIge1xuICB6LWluZGV4OiA5OTk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIHBhZGRpbmc6IDFyZW07XG5cbiAgJiA+IC5wb3BvdmVyLWlubmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDMwcmVtO1xuICAgIG1heC1oZWlnaHQ6IDIwcmVtO1xuICAgIHBhZGRpbmc6IDAgMXJlbSAxcmVtIDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IGluaXRpYWw7XG4gICAgZm9udC1zdHlsZTogaW5pdGlhbDtcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgIGZvbnQtc2l6ZTogaW5pdGlhbDtcbiAgICBmb250LWZhbWlseTogdmFyKC0tYm9keUZvbnQpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWxpZ2h0Z3JheSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBib3gtc2hhZG93OiA2cHggNnB4IDM2cHggMCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gIH1cblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gIH1cblxuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246XG4gICAgb3BhY2l0eSAwLjNzIGVhc2UsXG4gICAgdmlzaWJpbGl0eSAwLjNzIGVhc2U7XG5cbiAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJG1vYmlsZUJyZWFrcG9pbnQpIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuYTpob3ZlciAucG9wb3Zlcixcbi5wb3BvdmVyOmhvdmVyIHtcbiAgYW5pbWF0aW9uOiBkcm9waW4gMC4zcyBlYXNlO1xuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xufVxuIl19 */`;var DEFAULT_SANS_SERIF='-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',DEFAULT_MONO="ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace";function googleFontHref(theme){let{code,header,body}=theme.typography;return`https://fonts.googleapis.com/css2?family=${code}&family=${header}:wght@400;700&family=${body}:ital,wght@0,400;0,600;1,400;1,600&display=swap`}__name(googleFontHref,"googleFontHref");function joinStyles(theme,...stylesheet){return`
${stylesheet.join(`

`)}

:root {
  --light: ${theme.colors.lightMode.light};
  --lightgray: ${theme.colors.lightMode.lightgray};
  --gray: ${theme.colors.lightMode.gray};
  --darkgray: ${theme.colors.lightMode.darkgray};
  --dark: ${theme.colors.lightMode.dark};
  --secondary: ${theme.colors.lightMode.secondary};
  --tertiary: ${theme.colors.lightMode.tertiary};
  --highlight: ${theme.colors.lightMode.highlight};

  --headerFont: "${theme.typography.header}", ${DEFAULT_SANS_SERIF};
  --bodyFont: "${theme.typography.body}", ${DEFAULT_SANS_SERIF};
  --codeFont: "${theme.typography.code}", ${DEFAULT_MONO};
}

:root[saved-theme="dark"] {
  --light: ${theme.colors.darkMode.light};
  --lightgray: ${theme.colors.darkMode.lightgray};
  --gray: ${theme.colors.darkMode.gray};
  --darkgray: ${theme.colors.darkMode.darkgray};
  --dark: ${theme.colors.darkMode.dark};
  --secondary: ${theme.colors.darkMode.secondary};
  --tertiary: ${theme.colors.darkMode.tertiary};
  --highlight: ${theme.colors.darkMode.highlight};
}
`}__name(joinStyles,"joinStyles");import{Features,transform}from"lightningcss";import{transform as transpile}from"esbuild";function getComponentResources(ctx){let allComponents=new Set;for(let emitter of ctx.cfg.plugins.emitters){let components=emitter.getQuartzComponents(ctx);for(let component of components)allComponents.add(component)}let componentResources={css:new Set,beforeDOMLoaded:new Set,afterDOMLoaded:new Set};for(let component of allComponents){let{css,beforeDOMLoaded,afterDOMLoaded}=component;css&&componentResources.css.add(css),beforeDOMLoaded&&componentResources.beforeDOMLoaded.add(beforeDOMLoaded),afterDOMLoaded&&componentResources.afterDOMLoaded.add(afterDOMLoaded)}return{css:[...componentResources.css],beforeDOMLoaded:[...componentResources.beforeDOMLoaded],afterDOMLoaded:[...componentResources.afterDOMLoaded]}}__name(getComponentResources,"getComponentResources");async function joinScripts(scripts){let script=scripts.map(script2=>`(function () {${script2}})();`).join(`
`);return(await transpile(script,{minify:!0})).code}__name(joinScripts,"joinScripts");function addGlobalPageResources(ctx,staticResources,componentResources){let cfg=ctx.cfg.configuration,reloadScript=ctx.argv.serve;if(cfg.enablePopovers&&(componentResources.afterDOMLoaded.push(popover_inline_default),componentResources.css.push(popover_default)),cfg.analytics?.provider==="google"){let tagId=cfg.analytics.tagId;staticResources.js.push({src:`https://www.googletagmanager.com/gtag/js?id=${tagId}`,contentType:"external",loadTime:"afterDOMReady"}),componentResources.afterDOMLoaded.push(`
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "${tagId}", { send_page_view: false });

      document.addEventListener("nav", () => {
        gtag("event", "page_view", {
          page_title: document.title,
          page_location: location.href,
        });
      });`)}else if(cfg.analytics?.provider==="plausible"){let plausibleHost=cfg.analytics.host??"https://plausible.io";componentResources.afterDOMLoaded.push(`
      const plausibleScript = document.createElement("script")
      plausibleScript.src = "${plausibleHost}/js/script.manual.js"
      plausibleScript.setAttribute("data-domain", location.hostname)
      plausibleScript.defer = true
      document.head.appendChild(plausibleScript)

      window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }

      document.addEventListener("nav", () => {
        plausible("pageview")
      })
    `)}else cfg.analytics?.provider==="umami"&&componentResources.afterDOMLoaded.push(`
      const umamiScript = document.createElement("script")
      umamiScript.src = cfg.analytics.host ?? "https://analytics.umami.is/script.js"
      umamiScript.setAttribute("data-website-id", "${cfg.analytics.websiteId}")
      umamiScript.async = true

      document.head.appendChild(umamiScript)
    `);cfg.enableSPA?componentResources.afterDOMLoaded.push(spa_inline_default):componentResources.afterDOMLoaded.push(`
      window.spaNavigate = (url, _) => window.location.assign(url)
      window.addCleanup = () => {}
      const event = new CustomEvent("nav", { detail: { url: document.body.dataset.slug } })
      document.dispatchEvent(event)
    `);let wsUrl=`ws://localhost:${ctx.argv.wsPort}`;ctx.argv.remoteDevHost&&(wsUrl=`wss://${ctx.argv.remoteDevHost}:${ctx.argv.wsPort}`),reloadScript&&staticResources.js.push({loadTime:"afterDOMReady",contentType:"inline",script:`
        const socket = new WebSocket('${wsUrl}')
        socket.addEventListener('message', () => document.location.reload())
      `})}__name(addGlobalPageResources,"addGlobalPageResources");var defaultOptions15={fontOrigin:"googleFonts"},ComponentResources=__name(opts=>{let{fontOrigin}={...defaultOptions15,...opts};return{name:"ComponentResources",getQuartzComponents(){return[]},async emit(ctx,_content,resources){let componentResources=getComponentResources(ctx);fontOrigin==="googleFonts"&&resources.css.push(googleFontHref(ctx.cfg.configuration.theme)),addGlobalPageResources(ctx,resources,componentResources);let stylesheet=joinStyles(ctx.cfg.configuration.theme,...componentResources.css,custom_default),[prescript,postscript]=await Promise.all([joinScripts(componentResources.beforeDOMLoaded),joinScripts(componentResources.afterDOMLoaded)]);return await Promise.all([write({ctx,slug:"index",ext:".css",content:transform({filename:"index.css",code:Buffer.from(stylesheet),minify:!0,targets:{safari:984576,ios_saf:984576,edge:7536640,firefox:6684672,chrome:7143424},include:Features.MediaQueries}).code.toString()}),write({ctx,slug:"prescript",ext:".js",content:prescript}),write({ctx,slug:"postscript",ext:".js",content:postscript})])}}},"ComponentResources");var NotFoundPage=__name(()=>{let opts={...sharedPageComponents,pageBody:__default(),beforeBody:[],left:[],right:[]},{head:Head,pageBody,footer:Footer}=opts,Body2=Body_default();return{name:"404Page",getQuartzComponents(){return[Head,Body2,pageBody,Footer]},async emit(ctx,_content,resources){let cfg=ctx.cfg.configuration,slug="404",path12=new URL(`https://${cfg.baseUrl??"example.com"}`).pathname,externalResources=pageResources(path12,resources),[tree,vfile]=defaultProcessedContent({slug,text:"Not Found",description:"Not Found",frontmatter:{title:"Not Found",tags:[]}}),componentData={fileData:vfile.data,externalResources,cfg,children:[],tree,allFiles:[]};return[await write({ctx,content:renderPage(slug,componentData,opts,externalResources),slug,ext:".html"})]}}},"NotFoundPage");import chalk5 from"chalk";function getStaticResourcesFromPlugins(ctx){let staticResources={css:[],js:[]};for(let transformer of ctx.cfg.plugins.transformers){let res=transformer.externalResources?transformer.externalResources(ctx):{};res?.js&&staticResources.js.push(...res.js),res?.css&&staticResources.css.push(...res.css)}return staticResources}__name(getStaticResourcesFromPlugins,"getStaticResourcesFromPlugins");async function emitContent(ctx,content){let{argv,cfg}=ctx,perf=new PerfTimer,log=new QuartzLogger(ctx.argv.verbose);log.start("Emitting output files");let emittedFiles=0,staticResources=getStaticResourcesFromPlugins(ctx);for(let emitter of cfg.plugins.emitters)try{let emitted=await emitter.emit(ctx,content,staticResources);if(emittedFiles+=emitted.length,ctx.argv.verbose)for(let file of emitted)console.log(`[emit:${emitter.name}] ${file}`)}catch(err){trace(`Failed to emit from plugin \`${emitter.name}\``,err)}log.end(`Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince()}`)}__name(emitContent,"emitContent");var config={configuration:{pageTitle:"Cyber-Samadhi",enableSPA:!0,enablePopovers:!0,analytics:{provider:"google",tagId:"G-HE3XZZJECH"},baseUrl:"indravajra.github.io/cyber-samadhi/",ignorePatterns:["**/private","**/templates",".obsidian","**/bin","**/journals","**/projects","**/inbox","**/canvas","**/meta","**/unsorted","**/excerpts","**/fortunes","**/phrases","**/sayings","**/highlights","**/articles"],defaultDateType:"created",theme:{typography:{header:"Bricolage Grotesque",body:"Barlow",code:"IBM Plex Mono"},colors:{lightMode:{light:"#f4f1e9",lightgray:"#c9c2b2",gray:"#9b9486",darkgray:"#625d52",dark:"#3e5740",secondary:"#49684c",tertiary:"#618665",highlight:"#aec7b0"},darkMode:{light:"#161618",lightgray:"#393639",gray:"#646464",darkgray:"#ebebec",dark:"#F7EDE2",secondary:"#e0073d",tertiary:"#ff004d",highlight:"#1e040d"}}}},plugins:{transformers:[FrontMatter(),TableOfContents(),CreatedModifiedDate({priority:["frontmatter","filesystem"]}),SyntaxHighlighting(),ObsidianFlavoredMarkdown({enableInHtmlEmbed:!1}),GitHubFlavoredMarkdown(),CrawlLinks({markdownLinkResolution:"shortest"}),Latex({renderEngine:"katex"}),Description()],filters:[RemoveDrafts()],emitters:[AliasRedirects(),ComponentResources({fontOrigin:"googleFonts"}),ContentPage(),FolderPage(),TagPage(),ContentIndex({enableSiteMap:!0,enableRSS:!0}),Assets(),Static(),NotFoundPage()]}},quartz_config_default=config;import chokidar from"chokidar";import fs5 from"fs";import{fileURLToPath}from"url";var options={retrieveSourceMap(source){if(source.includes(".quartz-cache")){let realSource=fileURLToPath(source.split("?",2)[0]+".map");return{map:fs5.readFileSync(realSource,"utf8")}}else return null}};sourceMapSupport.install(options);async function buildQuartz(argv,mut,clientRefresh){let ctx={argv,cfg:quartz_config_default,allSlugs:[]},perf=new PerfTimer,output=argv.output,pluginCount=Object.values(quartz_config_default.plugins).flat().length,pluginNames=__name(key=>quartz_config_default.plugins[key].map(plugin=>plugin.name),"pluginNames");argv.verbose&&(console.log(`Loaded ${pluginCount} plugins`),console.log(`  Transformers: ${pluginNames("transformers").join(", ")}`),console.log(`  Filters: ${pluginNames("filters").join(", ")}`),console.log(`  Emitters: ${pluginNames("emitters").join(", ")}`));let release=await mut.acquire();perf.addEvent("clean"),await rimraf(output),console.log(`Cleaned output directory \`${output}\` in ${perf.timeSince("clean")}`),perf.addEvent("glob");let allFiles=await glob("**/*.*",argv.directory,quartz_config_default.configuration.ignorePatterns),fps=allFiles.filter(fp=>fp.endsWith(".md")).sort();console.log(`Found ${fps.length} input files from \`${argv.directory}\` in ${perf.timeSince("glob")}`);let filePaths=fps.map(fp=>joinSegments(argv.directory,fp));ctx.allSlugs=allFiles.map(fp=>slugifyFilePath(fp));let parsedFiles=await parseMarkdown(ctx,filePaths),filteredContent=filterContent(ctx,parsedFiles);if(await emitContent(ctx,filteredContent),console.log(chalk6.green(`Done processing ${fps.length} files in ${perf.timeSince()}`)),release(),argv.serve)return startServing(ctx,mut,parsedFiles,clientRefresh)}__name(buildQuartz,"buildQuartz");async function startServing(ctx,mut,initialContent,clientRefresh){let{argv}=ctx,contentMap=new Map;for(let content of initialContent){let[_tree,vfile]=content;contentMap.set(vfile.data.filePath,content)}let buildData={ctx,mut,contentMap,ignored:await isGitIgnored(),initialSlugs:ctx.allSlugs,toRebuild:new Set,toRemove:new Set,trackedAssets:new Set,lastBuildMs:0},watcher=chokidar.watch(".",{persistent:!0,cwd:argv.directory,ignoreInitial:!0});return watcher.on("add",fp=>rebuildFromEntrypoint(fp,"add",clientRefresh,buildData)).on("change",fp=>rebuildFromEntrypoint(fp,"change",clientRefresh,buildData)).on("unlink",fp=>rebuildFromEntrypoint(fp,"delete",clientRefresh,buildData)),async()=>{await watcher.close()}}__name(startServing,"startServing");async function rebuildFromEntrypoint(fp,action,clientRefresh,buildData){let{ctx,ignored,mut,initialSlugs,contentMap,toRebuild,toRemove,trackedAssets}=buildData,{argv}=ctx;if(ignored(fp))return;fp=toPosixPath(fp);let filePath=joinSegments(argv.directory,fp);if(path11.extname(fp)!==".md"){action==="add"||action==="change"?trackedAssets.add(filePath):action==="delete"&&trackedAssets.delete(filePath),clientRefresh();return}action==="add"||action==="change"?toRebuild.add(filePath):action==="delete"&&toRemove.add(filePath);let buildStart=new Date().getTime();buildData.lastBuildMs=buildStart;let release=await mut.acquire();if(buildData.lastBuildMs>buildStart){release();return}let perf=new PerfTimer;console.log(chalk6.yellow("Detected change, rebuilding..."));try{let filesToRebuild=[...toRebuild].filter(fp2=>!toRemove.has(fp2)),trackedSlugs=[...new Set([...contentMap.keys(),...toRebuild,...trackedAssets])].filter(fp2=>!toRemove.has(fp2)).map(fp2=>slugifyFilePath(path11.posix.relative(argv.directory,fp2)));ctx.allSlugs=[...new Set([...initialSlugs,...trackedSlugs])];let parsedContent=await parseMarkdown(ctx,filesToRebuild);for(let content of parsedContent){let[_tree,vfile]=content;contentMap.set(vfile.data.filePath,content)}for(let fp2 of toRemove)contentMap.delete(fp2);let parsedFiles=[...contentMap.values()],filteredContent=filterContent(ctx,parsedFiles);await rimraf(argv.output),await emitContent(ctx,filteredContent),console.log(chalk6.green(`Done rebuilding in ${perf.timeSince()}`))}catch(err){console.log(chalk6.yellow("Rebuild failed. Waiting on a change to fix the error...")),argv.verbose&&console.log(chalk6.red(err))}release(),clientRefresh(),toRebuild.clear(),toRemove.clear()}__name(rebuildFromEntrypoint,"rebuildFromEntrypoint");var build_default=__name(async(argv,mut,clientRefresh)=>{try{return await buildQuartz(argv,mut,clientRefresh)}catch(err){trace(`
Exiting Quartz due to a fatal error`,err)}},"default");export{build_default as default};
//# sourceMappingURL=transpiled-build.mjs.map
