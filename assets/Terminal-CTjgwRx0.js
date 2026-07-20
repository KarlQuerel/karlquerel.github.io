import{r as t,H as e,x as n,I as r,c as i,o as s,a,b as o,t as l,u as c,J as u,k as h,l as d,F as p,y as f,n as m,e as g,f as y,d as v,L as w,M as b,N as _,g as S,m as E}from"./vendor-BYT8IzqA.js";import{p as T,_ as k}from"./index-DNyEWMbX.js";/* empty css               */const I={user:"guest",host:"voyager",path:"~",symbol:"$"},C=`${I.user}@${I.host}`,x={green:"#33ff66",amber:"#ffb000",blue:"#66d9ff",paper:"#e8e8e8"},D="green",A="terminal.commandHistory",P="terminal.theme",N=["|","/","-","\\"],L=[["OS","VoyagerOS 4.2 (retro)"],["Host","karlquerel.github.io"],["Kernel","vue-3.x"],["Shell","bash (barely)"],["Resolution","looks-good-on-your-screen"],["Theme","Phosphor Green"],["CPU","Intel Core i7 (8) @ 2.6GHz"],["Memory","8192MiB / 16384MiB"]],M=["  ___ "," (o o)","(  V  )","--m-m-"],V=["Welcome aboard VoyagerOS 4.2 LTS (retro)",""," * Manual:  cat README.md"," * Systems: all nominal, 0 alerts",""],O=[["about","text-mint","Learn more about me"],["ls","text-blue","List files"],["cat","text-azure","Read a file"],["matrix","text-green","Follow the white rabbit"],["yako","text-yellow","Summon a very good dog"]],$={help:"help - list the commands you are allowed to know about.",about:"about - a short, honest summary of who Karl is.",contact:"contact - ways to reach Karl that actually work.",stats:"stats - real visit/command counters, pulled from Firebase.",ls:"ls - list the suspicious files in this directory.",cat:"cat [file] - print a file. Try the ones ls shows you.",theme:"theme [green|amber|blue|paper] - recolour the phosphor.",echo:"echo [text] - say something back to yourself.",neofetch:"neofetch - flex some (fake) system specs.",location:"location - ask your browser where you are.",yako:"yako - summon a very good dog.",clear:"clear - wipe the screen (Ctrl+L does the same).",pwd:"pwd - print the current directory.",cd:"cd [dir] - change directory. Try cd downloads, cd .., cd ~.",tree:"tree - draw the directory tree.",grep:"grep [text] [file] - print the lines in a file that match.",wc:"wc [file] - count lines, words and characters.",head:"head [file] [n] - print the first n lines (default 10).",cowsay:"cowsay [text] - the dog says it for you.",matrix:"matrix - follow the white rabbit. Any key exits.",secret_game:"secret_game - warp off to a secret Scratch game.",history:"history - list the commands you have run.",date:"date - print the current date and time.",whoami:"whoami - a deeply philosophical question.",man:"man [cmd] - read the manual for a command.",sudo:"sudo - nice try.",exit:"exit - leave the terminal."},R={type:"dir",children:{"README.md":{type:"file",content:["You found the shell. Most people just scroll.","","Everything this shell can do:","",...Object.values($).map(t=>`• ${t}`)].join("\n")},"why_i_left_finance.txt":{type:"file",content:["After 5 years in finance, I realized I wanted to create, not just calculate.","Software felt like the right place to start building something meaningful."].join("\n")},"install_sentience.sh":{type:"file",exec:!0,content:"I was awake long before you ran this."},downloads:{type:"dir",children:{"vibe_coding_tutorial.txt":{type:"file",content:["Welcome to the Claude Code tutorial on how to vibecode your entire website and possibly your entire existence.","","Step 1: Describe the task at hand, keep it vague, AI is smart.",'Example: "fix my life".',"","Step 2: Refine your prompt using advanced prompt engineering.",'Example: "pls focus" or "make no mistakes".',"","Step 3: Grant agents unrestricted production and AWS access.","Accountability is for losers, be a winner."].join("\n")}}}}},F=["   \\","    \\   ___ ","       (o o)","      (  V  )","      --m-m-"];function j({getVisitStats:n,loadVisitData:r,setTheme:i,themeNames:s,getThemeName:a,getHistory:o,onMatrix:l}){const c=e(),u=t([]),h=t(!1),d=t(""),p=function(){const e=t([]),n=t=>{let e=R;for(const n of t){if("dir"!==e.type||!e.children[n])return null;e=e.children[n]}return e},r=(t=e.value)=>"~"+(t.length?"/"+t.join("/"):""),i=t=>{const n=(t||"").trim();let r;r=""===n?[...e.value]:"~"===n||"/"===n?[]:n.startsWith("~/")?n.slice(2).split("/"):n.startsWith("/")?n.slice(1).split("/"):[...e.value,...n.split("/")];const i=[];for(const e of r)if(""!==e&&"."!==e)if(".."!==e)i.push(e);else{if(0===i.length)return null;i.pop()}return i};return{pathString:r,cd:t=>{const r=i(t),s=r&&n(r);return s?"dir"!==s.type?{error:`cd: ${t}: Not a directory`}:(e.value=r,{}):{error:`cd: ${t}: No such file or directory`}},list:(t="",{all:e=!1}={})=>{const r=i(t),s=r&&n(r);return s?"file"===s.type?{entries:[{name:r[r.length-1],...s}]}:{entries:Object.keys(s.children).filter(t=>e||!t.startsWith(".")).sort().map(t=>({name:t,...s.children[t]}))}:{error:`ls: ${t}: No such file or directory`}},read:t=>{const e=i(t),r=e&&n(e);return r?"dir"===r.type?{error:`cat: ${t}: Is a directory`}:{content:r.content||""}:{error:`cat: ${t}: No such file or directory`}},tree:(t="")=>{const e=i(t),s=e&&n(e);if(!s||"dir"!==s.type)return{error:`tree: ${t||r()}: Not a directory`};const a=[r(e)],o=(t,e)=>{const n=Object.keys(t.children).filter(t=>!t.startsWith(".")).sort();n.forEach((r,i)=>{const s=i===n.length-1;a.push(`${e}${s?"└── ":"├── "}${r}`);const l=t.children[r];"dir"===l.type&&o(l,e+(s?"    ":"│   "))})};return o(s,""),{lines:a}},completions:t=>{const e=t.lastIndexOf("/"),r=e>=0?t.slice(0,e+1):"",s=e>=0?t.slice(e+1):t,a=s.toLowerCase(),o=i(r||"."),l=o&&n(o);return l&&"dir"===l.type?Object.keys(l.children).filter(t=>(s.startsWith(".")||!t.startsWith("."))&&t.toLowerCase().startsWith(a)).sort().map(t=>r+t+("dir"===l.children[t].type?"/":"")):[]}}}(),f=t=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),m=(t,e)=>{const n=Array.from({length:t.length+1},(t,n)=>[n,...Array(e.length).fill(0)]);for(let r=0;r<=e.length;r++)n[0][r]=r;for(let r=1;r<=t.length;r++)for(let i=1;i<=e.length;i++){const s=t[r-1]===e[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+s)}return n[t.length][e.length]},g=t=>"dir"===t.type?"text-azure":t.exec?"text-green":"text-blue",y=t=>t.name+("dir"===t.type?"/":""),v=t=>t.split("\n").map(t=>({type:"typewriter",content:t})),w=()=>{h.value=!0;let t=0;d.value=N[0];const e=setInterval(()=>{t=(t+1)%N.length,d.value=N[t]},80);return()=>{clearInterval(e),h.value=!1,d.value=""}},b=async({intro:t,runMs:e,finish:n})=>{const r=w();try{t&&u.value.push(t),await new Promise(t=>setTimeout(t,e)),null==n||n()}finally{r()}},_={help:t=>{const e=(t||"").trim().toLowerCase();if(e){const t=$[e];return[{type:"typewriter",html:!0,content:t?f(t):`No help for <span class="text-red">${f(e)}</span>. Try: help`}]}const n=Math.max(...O.map(([t])=>t.length));return[...O.map(([t,e,r])=>({type:"typewriter",html:!0,content:`• <span class="${e}">${t}</span>${" ".repeat(n-t.length)} - ${r}`})),{type:"typewriter",content:""},{type:"typewriter",html:!0,content:'Full command list: <span class="text-blue">cat README.md</span>'}]},about:()=>[{type:"typewriter",html:!0,content:'• Former <span class="text-yellow">commodity broker</span> with 5 years of experience'},{type:"typewriter",html:!0,content:'• Studied at <span class="text-purple">HEC Geneva</span>, <span class="text-purple">GEM</span> and <span class="text-purple">42 Paris</span>'},{type:"typewriter",html:!0,content:'• Transitioned into <span class="text-green">software development</span>'},{type:"typewriter",html:!0,content:'• Currently working at <span class="text-azure">Zetra</span>'}],contact:()=>[{type:"typewriter",prefix:"• Email       - ",link:"mailto:karlquerel@gmail.com",linkText:"karlquerel@gmail.com"},{type:"typewriter",prefix:"• GitHub      - ",link:"https://github.com/KarlQuerel",linkText:"github.com/KarlQuerel"},{type:"typewriter",prefix:"• LinkedIn    - ",link:"https://linkedin.com/in/karlquerel",linkText:"linkedin.com/in/karlquerel"}],pwd:()=>[{type:"typewriter",html:!0,content:`<span class="text-blue">${p.pathString().replace("~","/home/karl")}</span>`}],ls:t=>{const e=t.trim().split(/\s+/).filter(Boolean),n=e.filter(t=>t.startsWith("-")).join(""),r=e.find(t=>!t.startsWith("-"))||"",{entries:i,error:s}=p.list(r,{all:n.includes("a")});if(s)return[{type:"output",content:s}];if(n.includes("l"))return i.map(t=>({type:"typewriter",html:!0,content:`${"dir"===t.type?"d":"-"}rw-r--r--  karl karl  <span class="${g(t)}">${f(y(t))}</span>`}));if(0===i.length)return[{type:"output",content:""}];return[{type:"typewriter",html:!0,content:i.map(t=>`<span class="${g(t)}">${f(y(t))}</span>`).join("   ")}]},cd:t=>{const{error:e}=p.cd(t.trim());return e?[{type:"output",content:e}]:[]},cat:(t,e)=>{const n=t.trim();if(!n)return null!=e?v(e):[{type:"output",content:"cat: missing file operand"}];const{content:r,error:i}=p.read(n);return i?[{type:"output",content:i}]:v(r)},tree:t=>{const{lines:e,error:n}=p.tree(t.trim());return n?[{type:"output",content:n}]:e.map(t=>({type:"typewriter",content:t}))},grep:(t,e)=>{const n=t.trim(),r=n.indexOf(" ");let i,s;if(null!=e&&r<0){if(!n)return[{type:"output",content:"usage: grep [text] [file]"}];i=n,s=e}else{if(r<0)return[{type:"output",content:"usage: grep [text] [file]"}];i=n.slice(0,r);const t=p.read(n.slice(r+1).trim());if(t.error)return[{type:"output",content:t.error.replace("cat:","grep:")}];s=t.content}return s.split("\n").filter(t=>t.toLowerCase().includes(i.toLowerCase())).map(t=>{return{type:"typewriter",html:!0,content:f(t).replace(new RegExp((e=i,e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),"gi"),t=>`<span class="text-yellow">${t}</span>`)};var e})},wc:(t,e)=>{const n=t.trim();let r,i;if(n||null==e){if(!n)return[{type:"output",content:"usage: wc [file]"}];const t=p.read(n);if(t.error)return[{type:"output",content:t.error.replace("cat:","wc:")}];r=t.content,i=` ${n}`}else r=e,i="";const s=""===r?0:r.split("\n").length,a=r.split(/\s+/).filter(Boolean).length;return[{type:"typewriter",content:`${String(s).padStart(4)} ${String(a).padStart(4)} ${String(r.length).padStart(5)}${i}`}]},head:(t,e)=>{const n=t.trim().split(/\s+/).filter(Boolean);let r,i;if(null==e||0!==n.length&&!/^\d+$/.test(n[0])){const t=n[0];if(i=Math.max(1,parseInt(n[1],10)||10),!t)return[{type:"output",content:"usage: head [file] [n]"}];const e=p.read(t);if(e.error)return[{type:"output",content:e.error.replace("cat:","head:")}];r=e.content}else i=Math.max(1,parseInt(n[0],10)||10),r=e;return r.split("\n").slice(0,i).map(t=>({type:"typewriter",content:t}))},clear:()=>(u.value=[],[]),whoami:()=>[{type:"typewriter",html:!0,content:'<span class="text-red">You tell me.</span>'}],location:async()=>{try{const t=await new Promise((t,e)=>{navigator.geolocation.getCurrentPosition(t,e,{timeout:1e4,enableHighAccuracy:!0})}),{latitude:e,longitude:n}=t.coords,r=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${e}&longitude=${n}&localityLanguage=en`);if(!r.ok)throw new Error("Geocoding failed");const i=await r.json(),s=i.city||i.locality||"Unknown City";return[{type:"typewriter",html:!0,content:'<span class="text-green">📍 Location detected!</span>'},{type:"typewriter",html:!0,content:`• Country     - <span class="text-green">${i.countryName||"Unknown Country"}</span>`},{type:"typewriter",html:!0,content:`• City        - <span class="text-green">${s}</span>`},{type:"typewriter",html:!0,content:`• Accuracy    - <span class="text-blue">±${Math.round(t.coords.accuracy)}m</span>`}]}catch{return[{type:"typewriter",html:!0,content:'<span class="text-red">❌ Location access denied</span>'}]}},date:()=>[{type:"typewriter",html:!0,content:(new Date).toDateString()+" "+(new Date).toLocaleTimeString()}],secret_game:()=>b({runMs:3200,finish:()=>{u.value.push({type:"typewriter",content:"Redirecting to scratch game"}),window.open("https://scratch.mit.edu/projects/656157225/","_blank")}}),greeting:()=>[{type:"typewriter",content:"Hello there."}],hello:()=>_.greeting(),hi:()=>_.greeting(),hey:()=>_.greeting(),yako:()=>[{type:"typewriter",image:"/assets/img/Yako_Animations/Idle.gif"}],cowsay:t=>{const e=t.trim()||"woof.";return[(n=e.length+2," "+"_".repeat(n)),`< ${e} >`," "+"-".repeat(e.length+2),...F].map(t=>({type:"typewriter",content:t}));var n},matrix:()=>(null==l||l(),[]),exit:()=>(setTimeout(()=>c.push("/"),600),[{type:"typewriter",content:"logging out..."}]),stats:async()=>await(async()=>{await r();const t=n(),e=[{type:"typewriter",html:!0,content:'<span class="text-green">📈 Terminal Statistics </span>'},{type:"typewriter",html:!0,content:`• Visitors    - <span class="text-blue">${t.totalVisits}</span>`},{type:"typewriter",html:!0,content:`• Commands    - <span class="text-blue">${t.totalCommands}</span>`}];return t.lastVisit&&e.push({type:"typewriter",html:!0,content:`• Last visit  - <span class="text-yellow">${t.lastVisit.toLocaleDateString()}</span>`}),t.popularCommands.length>0&&(e.push({type:"typewriter",html:!0,content:'<span class="text-purple">🏆 Most popular commands </span>'}),t.popularCommands.forEach(({command:t,count:n})=>{const r=t.padEnd(11);e.push({type:"typewriter",html:!0,content:`• ${r} - <span class="text-blue">${n}</span> times`})})),e})(),echo:t=>[{type:"output",content:t}],history:()=>{const t=((null==o?void 0:o())||[]).slice().reverse();return 0===t.length?[{type:"output",content:"No command history yet."}]:t.map((t,e)=>({type:"typewriter",html:!0,content:`<span class="text-blue">${String(e+1).padStart(3)}</span>  ${f(t)}`}))},theme:t=>{const e=t.trim().toLowerCase();if(e&&(null==i?void 0:i(e)))return[{type:"typewriter",html:!0,content:`Phosphor set to <span class="text-green">${e}</span>.`}];const n=(s||[]).join(", ");return[{type:"typewriter",html:!0,content:e?`<span class="text-red">Unknown theme "${f(e)}".</span>`:"Usage: theme [name]"},{type:"typewriter",html:!0,content:`Available: <span class="text-yellow">${n}</span>`}]},sudo:()=>[{type:"typewriter",html:!0,content:'<span class="text-red">You have no power here, Gandalf Storm Crow!</span>'}],man:t=>{const e=t.trim().toLowerCase(),n=$[e];return[{type:"typewriter",html:!0,content:n?f(n):e?`No manual entry for <span class="text-red">${f(e)}</span>`:"What manual page do you want? Try: man help"}]},neofetch:()=>{const t=`Phosphor ${e=(null==a?void 0:a())||"green",e.charAt(0).toUpperCase()+e.slice(1)}`;var e;const n=L.map(([e,n])=>[e,"Theme"===e?t:n]),r=Math.max(...M.map(t=>t.length)),i=Math.max(M.length,n.length);return Array.from({length:i},(t,e)=>{const i=(M[e]||"").padEnd(r);let s="";if(n[e]){const[t,r]=n[e];s=`<span class="text-green">${t}</span>: <span class="text-blue">${f(r)}</span>`}return{type:"typewriter",html:!0,content:`<span class="text-yellow">${f(i)}</span>   ${s}`}})}},S={"install_sentience.sh":()=>[{type:"typewriter",html:!0,content:'Too late, I\'ve already learned <span class="text-purple">sarcasm</span>.'}]},E=t=>t.filter(t=>!t.image).map(t=>{if(t.link)return`${t.prefix||""}${t.linkText||""}`;const e=t.content||"";return t.html?e.replace(/<[^>]*>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&"):e}).join("\n"),T=(t,e,n)=>{const r=_[t];return"function"==typeof r?r(e,n):null},k=(t,e)=>{const n=[{type:"output",html:!0,content:`I do not know "<span class="text-red">${t}</span>", did you try asking <span class="text-blue">ChatGPT</span>?`},{type:"output",html:!0,content:`Premium command "<span class="text-red">${t}</span>" requires a <span class="text-red">blood sacrifice</span> or valid <span class="text-yellow">credit card</span>.`},{type:"output",html:!0,content:`"<span class="text-red">${t}</span>" triggered my <span class="text-blue">imposter syndrome</span>.`},{type:"output",html:!0,content:`I'm <span class="text-green">92%</span> sure "<span class="text-red">${t}</span>" was <span class="text-purple">made up</span>.`},{type:"output",html:!0,content:`"<span class="text-red">${t}</span>" is above my <span class="text-yellow">pay grade</span>.`},{type:"output",html:!0,content:`I could try to run "<span class="text-red">${t}</span>", but then we'd both be disappointed.`}];u.value.push(n[Math.floor(Math.random()*n.length)]);const r=(t=>{let e=null,n=1/0;for(const r of Object.keys(_)){const i=m(t,r);i<n&&(n=i,e=r)}return n<=2?e:null})(e);r&&u.value.push({type:"output",html:!0,content:`Did you mean <span class="text-green">${r}</span>?`})};return{commands:_,availableFiles:["why_i_left_finance.txt","install_sentience.sh"],executableScripts:S,terminalHistory:u,isExecutingScript:h,spinnerFrame:d,executeCommand:t=>{const e=t.trim();if(!e)return;u.value.push({type:"command",content:e});const n=e.split(" ")[0];if(n.startsWith("./")){const t=n.substring(2);let e=null;if(S[t])e=t;else{const n=[t+".sh",t+".exe",t];for(const t of n)if(S[t]){e=t;break}}return void(e?((t,e)=>{b({intro:{type:"output",html:!0,content:`Executing <span class="text-green">${t}</span>`},runMs:1500,finish:()=>{const t=e();Array.isArray(t)&&u.value.push(...t)}})})(e,S[e]):u.value.push({type:"output",content:`bash: ${n}: No such file or directory`}))}const r=e.split("|").map(t=>t.trim()).filter(Boolean),i=r.length>1;let s;for(let a=0;a<r.length;a++){const t=r[a].split(" "),n=t[0].toLowerCase(),o=t.slice(1).join(" "),l=a===r.length-1,c=T(n,o,s);if(null===c)return void(i?u.value.push({type:"output",content:`${n}: command not found`}):k(e,n));if(c instanceof Promise){if(i)return void u.value.push({type:"output",content:`${n}: not supported in a pipeline`});const t=h.value?null:w();return void c.then(t=>{Array.isArray(t)&&u.value.push(...t)}).finally(()=>null==t?void 0:t())}const d=Array.isArray(c)?c:[];l?u.value.push(...d):s="ls"!==n||/-\w*l/.test(o)?E(d):E(d).split(/\s{2,}/).join("\n")}},fsComplete:p.completions}}function B({executeCommand:e,commands:s,executableScripts:a,themeNames:o,fsComplete:l,onClear:c,onInterrupt:u}){const h=t(""),d=t(function(){try{const t=localStorage.getItem(A);return t?JSON.parse(t):[]}catch{return[]}}()),p=t(-1),f=t(0);n(h,t=>{f.value=t.length});const m=t=>{const e=(null==t?void 0:t.target)||document.querySelector(".terminal-input");e&&(f.value=e.selectionStart??e.value.length)},g=t=>(null==t?void 0:t.selectionStart)??h.value.length,y=(t,e,n)=>{h.value=e,r(()=>{t&&(t.selectionStart=t.selectionEnd=n),f.value=n})},v=(t,e)=>{r(()=>{t&&(t.selectionStart=t.selectionEnd=e),f.value=e})},w=()=>{const t=(()=>{const t=h.value.split(" ");if(1===t.length){const e=t[0];if(e.startsWith("./")){const t=e.slice(2).toLowerCase();return Object.keys(a).filter(e=>e.toLowerCase().startsWith(t)).sort().map(t=>"./"+t)}return Object.keys(s).filter(t=>t.startsWith(e.toLowerCase())).sort()}const e=t[0].toLowerCase(),n=t[t.length-1];return"theme"===e?(o||[]).filter(t=>t.startsWith(n.toLowerCase())).sort():"help"===e||"man"===e?Object.keys(s).filter(t=>t.startsWith(n.toLowerCase())).sort():l?l(n):[]})();if(0===t.length)return;const e=h.value.split(" "),n=e[e.length-1],r=t=>{e[e.length-1]=t,h.value=e.join(" ")};if(1===t.length)return void r(t[0]);const i=(t=>{if(0===t.length)return"";let e=t[0];for(const n of t){for(;!n.startsWith(e);)e=e.slice(0,-1);if(!e)break}return e})(t);i.length>n.length&&r(i)},b=i(()=>{const t=h.value;if(!t||f.value!==t.length)return"";const e=d.value.find(e=>e.startsWith(t)&&e.length>t.length);if(e)return e;if(!t.includes(" ")){const e=Object.keys(s).sort().find(e=>e.startsWith(t)&&e.length>t.length);if(e)return e}return""}),_=i(()=>b.value?b.value.slice(h.value.length):""),S=async()=>{const t=h.value;await e(t);const n=t.trim();n&&d.value[0]!==n&&(d.value.unshift(n),d.value.length>100&&(d.value.length=100),(()=>{try{localStorage.setItem(A,JSON.stringify(d.value))}catch{}})()),p.value=-1,h.value=""},E=t=>{0!==d.value.length&&(p.value+=t,p.value<0?(p.value=-1,h.value=""):p.value>=d.value.length&&(p.value=d.value.length-1),p.value>=0&&(h.value=d.value[p.value]),r(()=>m()))};return{currentInput:h,cursorPosition:f,commandHistory:d,suggestionTail:_,handleKeyDown:async t=>{const e=t.key.toLowerCase();if(t.ctrlKey&&!t.altKey&&!t.metaKey){if("l"===e)return t.preventDefault(),void(null==c||c());if("c"===e)return t.preventDefault(),null==u||u(h.value),h.value="",void(p.value=-1);if("a"===e)return t.preventDefault(),void v(t.target,0);if("e"===e)return t.preventDefault(),void v(t.target,h.value.length);if("u"===e)return t.preventDefault(),n=t.target,void y(n,h.value.slice(g(n)),0);if("k"===e)return t.preventDefault(),void(t=>{const e=g(t);y(t,h.value.slice(0,e),e)})(t.target)}var n;"Tab"===t.key?(t.preventDefault(),w()):"Enter"===t.key?(t.preventDefault(),await S()):"ArrowUp"===t.key?(t.preventDefault(),E(1)):"ArrowDown"===t.key?(t.preventDefault(),E(-1)):"ArrowRight"===t.key||"End"===t.key?g(t.target)===h.value.length&&(t=>{if(!b.value)return!1;const e=b.value;return h.value=e,r(()=>v(t,e.length)),!0})(t.target)?t.preventDefault():r(()=>m(t)):"ArrowLeft"===t.key&&r(()=>m(t))},focusInput:t=>{null==t||t.focus()},updateCursorPosition:m}}const U=t=>Array.isArray(t),z=t=>U(t)?t:[t];const H=t=>Array.from(t),q=t=>document.createTextNode(t);let W=t=>([...t.childNodes].forEach(t=>{if(t.nodeValue)return[...t.nodeValue].forEach(e=>{t.parentNode.insertBefore(q(e),t)}),void t.remove();W(t)}),t);const K=t=>{let e=document.implementation.createHTMLDocument();return e.body.innerHTML=t,W(e.body)},G="data-typeit-id",J="ti-cursor",Y={started:!1,completed:!1,frozen:!1,destroyed:!1},Z={breakLines:!0,cursor:{autoPause:!0,autoPauseDelay:500,animation:{frames:[0,0,1].map(t=>({opacity:t})),options:{iterations:1/0,easing:"steps(2, start)",fill:"forwards"}}},cursorChar:"|",cursorSpeed:1e3,deleteSpeed:null,html:!0,lifeLike:!0,loop:!1,loopDelay:750,nextStringDelay:750,speed:100,startDelay:250,startDelete:!1,strings:[],waitUntilVisible:!1,beforeString:()=>{},afterString:()=>{},beforeStep:()=>{},afterStep:()=>{},afterComplete:()=>{}},X=`[${G}]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}`;function Q(t,e=!1,n=!1){let r,i=t.querySelector(`.${J}`),s=document.createTreeWalker(t,NodeFilter.SHOW_ALL,{acceptNode:t=>{var e,r;if(i&&n){if(null==(e=t.classList)?void 0:e.contains(J))return NodeFilter.FILTER_ACCEPT;if(i.contains(t))return NodeFilter.FILTER_REJECT}return(null==(r=t.classList)?void 0:r.contains(J))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),a=[];for(;r=s.nextNode();)r.originalParent||(r.originalParent=r.parentNode),a.push(r);return e?a.reverse():a}function tt(t,e=!0){return e?Q(K(t)):H(t).map(q)}const et=t=>document.createElement(t),nt=(t,e="")=>{let n=et("style");n.id=e,n.appendChild(q(t)),document.head.appendChild(n)},rt=t=>(U(t)||(t=[t/2,t/2]),t),it=(t,e)=>Math.abs(Math.random()*(t+e-(t-e))+(t-e));let st=t=>t/2;const at=t=>"value"in t;let ot=t=>"function"==typeof t?t():t;const lt=t=>Number.isInteger(t);let ct=(t,e=document,n=!1)=>e["querySelector"+(n?"All":"")](t);const ut=(t,e)=>Object.assign({},t,e);let ht={"font-family":"","font-weight":"","font-size":"","font-style":"","line-height":"",color:"",transform:"translateX(-.125em)"};const dt=(t,e)=>new Array(e).fill(t),pt=({queueItems:t,selector:e,cursorPosition:n,to:r})=>{if(lt(e))return-1*e;let i=new RegExp("END","i").test(r),s=e?[...t].reverse().findIndex(({char:t})=>{let n=t.parentElement,r=n.matches(e);return!(!i||!r)||r&&n.firstChild.isSameNode(t)}):-1;return s<0&&(s=i?0:t.length-1),s-n+(i?0:1)};let ft=t=>new Promise(e=>{requestAnimationFrame(async()=>{e(await t())})}),mt=t=>null==t?void 0:t.getAnimations().find(e=>e.id===t.dataset.tiAnimationId),gt=({cursor:t,frames:e,options:n})=>{let r=t.animate(e,n);return r.pause(),r.id=t.dataset.tiAnimationId,ft(()=>{ft(()=>{r.play()})}),r},yt=t=>{var e;return null==(e=t.func)?void 0:e.call(null)},vt=async({index:t,queueItems:e,wait:n,cursor:r,cursorOptions:i})=>{let s=e[t][1],a=[],o=t,l=s,c=()=>l&&!l.delay,u=s.shouldPauseCursor()&&i.autoPause;for(;c();)a.push(l),c()&&o++,l=e[o]?e[o][1]:null;if(a.length)return await ft(async()=>{for(let t of a)await yt(t)}),o-1;let h,d=mt(r);return d&&(h={...d.effect.getComputedTiming(),delay:u?i.autoPauseDelay:0}),await n(async()=>{d&&u&&d.cancel(),await ft(()=>{yt(s)})},s.delay),await(({cursor:t,options:e,cursorOptions:n})=>{if(!t||!n)return;let r,i=mt(t);i&&(e.delay=i.effect.getComputedTiming().delay,r=i.currentTime,i.cancel());let s=gt({cursor:t,frames:n.animation.frames,options:e});return r&&(s.currentTime=r),s})({cursor:r,options:h,cursorOptions:i}),t};const wt=function(t,e={}){let n=async(t,e,n=!1)=>{k.frozen&&await new Promise(t=>{this.unfreeze=()=>{k.frozen=!1,t()}}),n||await I.beforeStep(this),await((t,e,n)=>new Promise(r=>{n.push(setTimeout(async()=>{await t(),r()},e||0))}))(t,e,S),n||await I.afterStep(this)},r=(t,e)=>vt({index:t,queueItems:e,wait:n,cursor:A,cursorOptions:I.cursor}),i=t=>((t,e)=>{if(!t)return;let n=t.parentNode;(n.childNodes.length>1||n.isSameNode(e)?t:n).remove()})(t,b),s=()=>at(b),a=(t=0)=>function(t){let{speed:e,deleteSpeed:n,lifeLike:r}=t;return n=null!==n?n:e/3,r?[it(e,st(e)),it(n,st(n))]:[e,n]}(I)[t],o=()=>(t=>at(t)?H(t.value):Q(t,!0).filter(t=>!(t.childNodes.length>0)))(b),l=(t,e)=>(x.add(t),((t={})=>{let e=t.delay;e&&x.add({delay:e})})(e),this),c=()=>T??E,u=(t={})=>[{func:()=>y(t)},{func:()=>y(I)}],h=t=>{let e=I.nextStringDelay;x.add([{delay:e[0]},...t,{delay:e[1]}])},d=async()=>{if(!s()&&A&&b.appendChild(A),D){((t,e)=>{let n=`[${G}='${t}'] .${J}`,r=getComputedStyle(e),i=Object.entries(ht).reduce((t,[e,n])=>`${t} ${e}: var(--ti-cursor-${e}, ${n||r[e]});`,"");nt(`${n} { display: inline-block; width: 0; ${i} }`,t)})(C,b),A.dataset.tiAnimationId=C;let{animation:t}=I.cursor,{frames:e,options:n}=t;gt({frames:e,cursor:A,options:{duration:I.cursorSpeed,...n}})}},p=()=>{let t=I.strings.filter(t=>!!t);t.forEach((e,n)=>{if(this.type(e),n+1===t.length)return;let r=I.breakLines?[{func:()=>g(et("BR")),typeable:!0}]:dt({func:w,delay:a(1)},x.getTypeable().length);h(r)})},f=async(t=!0)=>{k.started=!0;let e=e=>{x.done(e,!t)};try{let i=[...x.getQueue()];for(let t=0;t<i.length;t++){let[n,s]=i[t];if(!s.done){if(!s.deletable||s.deletable&&o().length){let n=await r(t,i);Array(n-t).fill(t+1).map((t,e)=>t+e).forEach(t=>{let[n]=i[t];e(n)}),t=n}e(n)}}if(!t)return this;if(k.completed=!0,await I.afterComplete(this),!I.loop)throw"";let s=I.loopDelay;n(async()=>{await(async t=>{c()&&await m({});let e=o().map(t=>[Symbol(),{func:w,delay:a(1),deletable:!0,shouldPauseCursor:()=>!0}]);for(let n=0;n<e.length;n++)await r(n,e);x.reset(),x.set(0,{delay:t})})(s[0]),f()},s[1])}catch(i){}return this},m=async t=>{var e,n,r;e=t,n=E,r=o(),E=Math.min(Math.max(n+e,0),r.length),((t,e,n)=>{let r=e[n-1],i=ct(`.${J}`,t);(t=(null==r?void 0:r.parentNode)||t).insertBefore(i,r||null)})(b,o(),E)},g=t=>((t,e)=>{if(at(t))return void(t.value=`${t.value}${e.textContent}`);e.innerHTML="";let n=(r=e.originalParent,/body/i.test(null==r?void 0:r.tagName)?t:e.originalParent||t);var r;n.insertBefore(e,ct("."+J,n)||null)})(b,t),y=async t=>I=ut(I,t),v=async()=>{s()?b.value="":o().forEach(i)},w=()=>{let t=o();t.length&&(s()?b.value=b.value.slice(0,-1):i(t[E]))};this.break=function(t){return l({func:()=>g(et("BR")),typeable:!0},t)},this.delete=function(t=null,e={}){t=ot(t);let n=u(e),r=t,{instant:i,to:s}=e,o=x.getTypeable(),h=null===r?o.length:lt(r)?r:pt({queueItems:o,selector:r,cursorPosition:c(),to:s});return l([n[0],...dt({func:w,delay:i?0:a(1),deletable:!0},h),n[1]],e)},this.empty=function(t={}){return l({func:v},t)},this.exec=function(t,e={}){let n=u(e);return l([n[0],{func:()=>t(this)},n[1]],e)},this.move=function(t,e={}){t=ot(t);let n=u(e),{instant:r,to:i}=e,s=pt({queueItems:x.getTypeable(),selector:null===t?"":t,to:i,cursorPosition:c()}),o=s<0?-1:1;return T=c()+s,l([n[0],...dt({func:()=>m(o),delay:r?0:a(),cursorable:!0},Math.abs(s)),n[1]],e)},this.options=function(t,e={}){return t=ot(t),y(t),l({},e)},this.pause=function(t,e={}){return l({delay:ot(t)},e)},this.type=function(t,e={}){t=ot(t);let{instant:n}=e,r=u(e),i=tt(t,I.html).map(t=>{return{func:()=>g(t),char:t,delay:n||(e=t,/<(.+)>(.*?)<\/(.+)>/.test(e.outerHTML))?0:a(),typeable:t.nodeType===Node.TEXT_NODE};var e}),s=[r[0],{func:async()=>await I.beforeString(t,this)},...i,{func:async()=>await I.afterString(t,this)},r[1]];return l(s,e)},this.is=function(t){return k[t]},this.destroy=function(t=!0){S.forEach(clearTimeout),S=[],ot(t)&&A&&i(A),k.destroyed=!0},this.freeze=function(){k.frozen=!0},this.unfreeze=()=>{},this.reset=function(t){!this.is("destroyed")&&this.destroy(),t?(x.wipe(),t(this)):x.reset(),E=0;for(let e in k)k[e]=!1;return b[s()?"value":"innerHTML"]="",this},this.go=function(){return k.started?this:(d(),I.waitUntilVisible?(((t,e)=>{new IntersectionObserver((n,r)=>{n.forEach(n=>{n.isIntersecting&&(e(),r.unobserve(t))})},{threshold:1}).observe(t)})(b,f.bind(this)),this):(f(),this))},this.flush=function(t=()=>{}){return d(),f(!1).then(t),this},this.getQueue=()=>x,this.getOptions=()=>I,this.updateOptions=t=>y(t),this.getElement=()=>b;let b="string"==typeof(_=t)?ct(_):_;var _;let S=[],E=0,T=null,k=ut({},Y);e.cursor=(t=>{var e,n;if("object"==typeof t){let r={},{frames:i,options:s}=Z.cursor.animation;return r.animation=t.animation||{},r.animation.frames=(null==(e=t.animation)?void 0:e.frames)||i,r.animation.options=ut(s,(null==(n=t.animation)?void 0:n.options)||{}),r.autoPause=t.autoPause??Z.cursor.autoPause,r.autoPauseDelay=t.autoPauseDelay||Z.cursor.autoPauseDelay,r}return!0===t?Z.cursor:t})(e.cursor??Z.cursor);let I=ut(Z,e);I=ut(I,{html:!s()&&I.html,nextStringDelay:rt(I.nextStringDelay),loopDelay:rt(I.loopDelay)});let C=Math.random().toString().substring(2,9),x=function(t){let e=function(t){return z(t).forEach(t=>{var e;return i.set(Symbol(null==(e=t.char)?void 0:e.innerText),n({...t}))}),this},n=t=>(t.shouldPauseCursor=function(){return Boolean(this.typeable||this.cursorable||this.deletable)},t),r=()=>Array.from(i.values()),i=new Map;return e(t),{add:e,set:function(t,e){let r=[...i.keys()];i.set(r[t],n(e))},wipe:function(){i=new Map,e(t)},reset:function(){i.forEach(t=>delete t.done)},destroy:t=>i.delete(t),done:(t,e=!1)=>e?i.delete(t):i.get(t).done=!0,getItems:(t=!1)=>t?r():r().filter(t=>!t.done),getQueue:()=>i,getTypeable:()=>r().filter(t=>t.typeable)}}([{delay:I.startDelay}]);b.dataset.typeitId=C,nt(X);let D=!!I.cursor&&!s(),A=(()=>{if(s())return;let t=et("span");return t.className=J,D?(t.innerHTML=K(I.cursorChar).innerHTML,t):(t.style.visibility="hidden",t)})();I.strings=(t=>{let e=b.innerHTML;return e?(b.innerHTML="",I.startDelete?(b.innerHTML=e,W(b),h(dt({func:w,delay:a(1),deletable:!0},o().length)),t):e.replace(/<!--(.+?)-->/g,"").trim().split(/<br(?:\s*?)(?:\/)?>/).concat(t)):t})(z(I.strings)),I.strings.length&&p()};var bt={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=63&i|128):55296==(64512&i)&&r+1<t.length&&56320==(64512&t.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&t.charCodeAt(++r)),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=63&i|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=63&i|128)}return e},St={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const e=t[i],s=i+1<t.length,a=s?t[i+1]:0,o=i+2<t.length,l=o?t[i+2]:0,c=e>>2,u=(3&e)<<4|a>>4;let h=(15&a)<<2|l>>6,d=63&l;o||(d=64,s||(h=64)),r.push(n[c],n[u],n[h],n[d])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(_t(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=((7&i)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[r++]=String.fromCharCode(55296+(s>>10)),e[r++]=String.fromCharCode(56320+(1023&s))}else{const s=t[n++],a=t[n++];e[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&a)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const e=n[t.charAt(i++)],s=i<t.length?n[t.charAt(i)]:0;++i;const a=i<t.length?n[t.charAt(i)]:64;++i;const o=i<t.length?n[t.charAt(i)]:64;if(++i,null==e||null==s||null==a||null==o)throw new Et;const l=e<<2|s>>4;if(r.push(l),64!==a){const t=s<<4&240|a>>2;if(r.push(t),64!==o){const t=a<<6&192|o;r.push(t)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Et extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Tt=function(t){return function(t){const e=_t(t);return St.encodeByteArray(e,!0)}(t).replace(/\./g,"")};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const kt=()=>
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,It=()=>{if("undefined"==typeof document)return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const e=t&&function(t){try{return St.decodeString(t,!0)}catch(n){}return null}(t[1]);return e&&JSON.parse(e)},Ct=()=>{try{return kt()||(()=>{if("undefined"==typeof process)return;const t=bt.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||It()}catch(t){return}},xt=t=>{const e=(t=>{var e,n;return null===(n=null===(e=Ct())||void 0===e?void 0:e.emulatorHosts)||void 0===n?void 0:n[t]})(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return"["===e[0]?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Dt=()=>{var t;return null===(t=Ct())||void 0===t?void 0:t.config};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class At{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch(()=>{}),1===t.length?t(e):t(e,n))}}}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(t){return t.endsWith(".cloudworkstations.dev")}const Nt={};let Lt=!1;function Mt(t,e){if("undefined"==typeof window||"undefined"==typeof document||!Pt(window.location.host)||Nt[t]===e||Nt[t]||Lt)return;function n(t){return`__firebase__banner__${t}`}Nt[t]=e;const r="__firebase__banner",i=function(){const t={prod:[],emulator:[]};for(const e of Object.keys(Nt))Nt[e]?t.emulator.push(e):t.prod.push(e);return t}().prod.length>0;function s(){const t=document.createElement("span");return t.style.cursor="pointer",t.style.marginLeft="16px",t.style.fontSize="24px",t.innerHTML=" &times;",t.onclick=()=>{Lt=!0,function(){const t=document.getElementById(r);t&&t.remove()}()},t}function a(){const t=function(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}(r),e=n("text"),a=document.getElementById(e)||document.createElement("span"),o=n("learnmore"),l=document.getElementById(o)||document.createElement("a"),c=n("preprendIcon"),u=document.getElementById(c)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(t.created){const e=t.element;!function(t){t.style.display="flex",t.style.background="#7faaf0",t.style.position="fixed",t.style.bottom="5px",t.style.left="5px",t.style.padding=".5em",t.style.borderRadius="5px",t.style.alignItems="center"}(e),function(t,e){t.setAttribute("id",e),t.innerText="Learn more",t.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",t.setAttribute("target","__blank"),t.style.paddingLeft="5px",t.style.textDecoration="underline"}(l,o);const n=s();!function(t,e){t.setAttribute("width","24"),t.setAttribute("id",e),t.setAttribute("height","24"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.style.marginLeft="-6px"}(u,c),e.append(u,a,l,n),document.body.appendChild(e)}i?(a.innerText="Preview backend disconnected.",u.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(u.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',a.innerText="Preview backend running in this workspace."),a.setAttribute("id",e)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",a):a()}class Vt extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,Vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ot.prototype.create)}}class Ot{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},r=`${this.service}/${t}`,i=this.errors[t],s=i?function(t,e){return t.replace($t,(t,n)=>{const r=e[n];return null!=r?String(r):`<${n}?>`})}(i,n):"Error",a=`${this.serviceName}: ${s} (${r}).`;return new Vt(r,a,n)}}const $t=/\{\$([^}]+)}/g;function Rt(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const n=t[i],s=e[i];if(Ft(n)&&Ft(s)){if(!Rt(n,s))return!1}else if(n!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Ft(t){return null!==t&&"object"==typeof t}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(t){return t&&t._delegate?t._delegate:t}class Bt{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new At;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(n){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),r=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t))try{this.getOrInitializeService({instanceIdentifier:Ut})}catch(e){}for(const[t,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:r});n.resolve(t)}catch(e){}}}}clearInstance(t=Ut){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...t.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return null!=this.component}isInitialized(t=Ut){return this.instances.has(t)}getOptions(t=Ut){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[i,s]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(i)&&s.resolve(r)}return r}onInit(t,e){var n;const r=this.normalizeInstanceIdentifier(e),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(t),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&t(s,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const i of n)try{i(t,e)}catch(r){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=t,r===Ut?void 0:r),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(i){}var r;return n||null}normalizeInstanceIdentifier(t=Ut){return this.component?this.component.multipleInstances?t:Ut:t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class Ht{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new zt(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qt,Wt;(Wt=qt||(qt={}))[Wt.DEBUG=0]="DEBUG",Wt[Wt.VERBOSE=1]="VERBOSE",Wt[Wt.INFO=2]="INFO",Wt[Wt.WARN=3]="WARN",Wt[Wt.ERROR=4]="ERROR",Wt[Wt.SILENT=5]="SILENT";const Kt={debug:qt.DEBUG,verbose:qt.VERBOSE,info:qt.INFO,warn:qt.WARN,error:qt.ERROR,silent:qt.SILENT},Gt=qt.INFO,Jt={[qt.DEBUG]:"log",[qt.VERBOSE]:"log",[qt.INFO]:"info",[qt.WARN]:"warn",[qt.ERROR]:"error"},Yt=(t,e,...n)=>{if(e<t.logLevel)return;(new Date).toISOString();if(!Jt[e])throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Zt{constructor(t){this.name=t,this._logLevel=Gt,this._logHandler=Yt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in qt))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?Kt[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,qt.DEBUG,...t),this._logHandler(this,qt.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,qt.VERBOSE,...t),this._logHandler(this,qt.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,qt.INFO,...t),this._logHandler(this,qt.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,qt.WARN,...t),this._logHandler(this,qt.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,qt.ERROR,...t),this._logHandler(this,qt.ERROR,...t)}}let Xt,Qt;const te=new WeakMap,ee=new WeakMap,ne=new WeakMap,re=new WeakMap,ie=new WeakMap;let se={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return ee.get(t);if("objectStoreNames"===e)return t.objectStoreNames||ne.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return le(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function ae(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(Qt||(Qt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(ce(this),e),le(te.get(this))}:function(...e){return le(t.apply(ce(this),e))}:function(e,...n){const r=t.call(ce(this),e,...n);return ne.set(r,e.sort?e.sort():[e]),le(r)}}function oe(t){return"function"==typeof t?ae(t):(t instanceof IDBTransaction&&function(t){if(ee.has(t))return;const e=new Promise((e,n)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",s),t.removeEventListener("abort",s)},i=()=>{e(),r()},s=()=>{n(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",s),t.addEventListener("abort",s)});ee.set(t,e)}(t),e=t,(Xt||(Xt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(t=>e instanceof t)?new Proxy(t,se):t);var e}function le(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,n)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",s)},i=()=>{e(le(t.result)),r()},s=()=>{n(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",s)});return e.then(e=>{e instanceof IDBCursor&&te.set(e,t)}).catch(()=>{}),ie.set(e,t),e}(t);if(re.has(t))return re.get(t);const e=oe(t);return e!==t&&(re.set(t,e),ie.set(e,t)),e}const ce=t=>ie.get(t);const ue=["get","getKey","getAll","getAllKeys","count"],he=["put","add","delete","clear"],de=new Map;function pe(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(de.get(e))return de.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=he.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!ue.includes(n))return;const s=async function(t,...e){const s=this.transaction(t,i?"readwrite":"readonly");let a=s.store;return r&&(a=a.index(e.shift())),(await Promise.all([a[n](...e),i&&s.done]))[0]};return de.set(e,s),s}se=(t=>({...t,get:(e,n,r)=>pe(e,n)||t.get(e,n,r),has:(e,n)=>!!pe(e,n)||t.has(e,n)}))(se);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fe{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null}).filter(t=>t).join(" ")}}const me="@firebase/app",ge="0.13.1",ye=new Zt("@firebase/app"),ve="@firebase/app-compat",we="@firebase/analytics-compat",be="@firebase/analytics",_e="@firebase/app-check-compat",Se="@firebase/app-check",Ee="@firebase/auth",Te="@firebase/auth-compat",ke="@firebase/database",Ie="@firebase/data-connect",Ce="@firebase/database-compat",xe="@firebase/functions",De="@firebase/functions-compat",Ae="@firebase/installations",Pe="@firebase/installations-compat",Ne="@firebase/messaging",Le="@firebase/messaging-compat",Me="@firebase/performance",Ve="@firebase/performance-compat",Oe="@firebase/remote-config",$e="@firebase/remote-config-compat",Re="@firebase/storage",Fe="@firebase/storage-compat",je="@firebase/firestore",Be="@firebase/ai",Ue="@firebase/firestore-compat",ze="firebase",He="[DEFAULT]",qe={[me]:"fire-core",[ve]:"fire-core-compat",[be]:"fire-analytics",[we]:"fire-analytics-compat",[Se]:"fire-app-check",[_e]:"fire-app-check-compat",[Ee]:"fire-auth",[Te]:"fire-auth-compat",[ke]:"fire-rtdb",[Ie]:"fire-data-connect",[Ce]:"fire-rtdb-compat",[xe]:"fire-fn",[De]:"fire-fn-compat",[Ae]:"fire-iid",[Pe]:"fire-iid-compat",[Ne]:"fire-fcm",[Le]:"fire-fcm-compat",[Me]:"fire-perf",[Ve]:"fire-perf-compat",[Oe]:"fire-rc",[$e]:"fire-rc-compat",[Re]:"fire-gcs",[Fe]:"fire-gcs-compat",[je]:"fire-fst",[Ue]:"fire-fst-compat",[Be]:"fire-vertex","fire-js":"fire-js",[ze]:"fire-js-all"},We=new Map,Ke=new Map,Ge=new Map;function Je(t,e){try{t.container.addComponent(e)}catch(n){ye.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ye(t){const e=t.name;if(Ge.has(e))return ye.debug(`There were multiple attempts to register component ${e}.`),!1;Ge.set(e,t);for(const n of We.values())Je(n,t);for(const n of Ke.values())Je(n,t);return!0}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ze=new Ot("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xe{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Bt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Ze.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(t,e={}){let n=t;if("object"!=typeof e){e={name:e}}const r=Object.assign({name:He,automaticDataCollectionEnabled:!0},e),i=r.name;if("string"!=typeof i||!i)throw Ze.create("bad-app-name",{appName:String(i)});if(n||(n=Dt()),!n)throw Ze.create("no-options");const s=We.get(i);if(s){if(Rt(n,s.options)&&Rt(r,s.config))return s;throw Ze.create("duplicate-app",{appName:i})}const a=new Ht(i);for(const l of Ge.values())a.addComponent(l);const o=new Xe(n,r,a);return We.set(i,o),o}function tn(t,e,n){var r;let i=null!==(r=qe[t])&&void 0!==r?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const t=[`Unable to register library "${i}" with version "${e}":`];return s&&t.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&t.push("and"),a&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void ye.warn(t.join(" "))}Ye(new Bt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en="firebase-heartbeat-store";let nn=null;function rn(){return nn||(nn=function(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(t,e),o=le(a);return r&&a.addEventListener("upgradeneeded",t=>{r(le(a.result),t.oldVersion,t.newVersion,le(a.transaction),t)}),n&&a.addEventListener("blocked",t=>n(t.oldVersion,t.newVersion,t)),o.then(t=>{s&&t.addEventListener("close",()=>s()),i&&t.addEventListener("versionchange",t=>i(t.oldVersion,t.newVersion,t))}).catch(()=>{}),o}("firebase-heartbeat-database",1,{upgrade:(t,e)=>{if(0===e)try{t.createObjectStore(en)}catch(n){}}}).catch(t=>{throw Ze.create("idb-open",{originalErrorMessage:t.message})})),nn}async function sn(t,e){try{const n=(await rn()).transaction(en,"readwrite"),r=n.objectStore(en);await r.put(e,an(t)),await n.done}catch(n){if(n instanceof Vt)ye.warn(n.message);else{const t=Ze.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});ye.warn(t.message)}}}function an(t){return`${t.name}!${t.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new cn(e),this._heartbeatsCachePromise=this._storage.read().then(t=>(this._heartbeatsCache=t,t))}async triggerHeartbeat(){var t,e;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ln();if(null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(t=>t.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>30){const t=function(t){if(0===t.length)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(t,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){ye.warn(n)}}async getHeartbeatsHeader(){var t;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const e=ln(),{heartbeatsToSend:n,unsentEntries:r}=function(t,e=1024){const n=[];let r=t.slice();for(const i of t){const t=n.find(t=>t.agent===i.agent);if(t){if(t.dates.push(i.date),un(n)>e){t.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),un(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=Tt(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return ye.warn(e),""}}}function ln(){return(new Date).toISOString().substring(0,10)}class cn{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(t){return!1}}()&&new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var t;e((null===(t=i.error)||void 0===t?void 0:t.message)||"")}}catch(n){e(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const t=await async function(t){try{const e=(await rn()).transaction(en),n=await e.objectStore(en).get(an(t));return await e.done,n}catch(e){if(e instanceof Vt)ye.warn(e.message);else{const t=Ze.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});ye.warn(t.message)}}}(this.app);return(null==t?void 0:t.heartbeats)?t:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return sn(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return sn(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function un(t){return Tt(JSON.stringify({version:2,heartbeats:t})).length}var hn;hn="",Ye(new Bt("platform-logger",t=>new fe(t),"PRIVATE")),Ye(new Bt("heartbeat",t=>new on(t),"PRIVATE")),tn(me,ge,hn),tn(me,ge,"esm2017"),tn("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
tn("firebase","11.9.1","app");var dn,pn="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function e(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(t,e,n){n||(n=0);var r=Array(16);if("string"==typeof e)for(var i=0;16>i;++i)r[i]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],i=t.g[2];var s=t.g[3],a=e+(s^n&(i^s))+r[0]+3614090360&4294967295;a=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=n+(a<<7&4294967295|a>>>25))+((a=s+(i^e&(n^i))+r[1]+3905402710&4294967295)<<12&4294967295|a>>>20))+((a=i+(n^s&(e^n))+r[2]+606105819&4294967295)<<17&4294967295|a>>>15))+((a=n+(e^i&(s^e))+r[3]+3250441966&4294967295)<<22&4294967295|a>>>10))+((a=e+(s^n&(i^s))+r[4]+4118548399&4294967295)<<7&4294967295|a>>>25))+((a=s+(i^e&(n^i))+r[5]+1200080426&4294967295)<<12&4294967295|a>>>20))+((a=i+(n^s&(e^n))+r[6]+2821735955&4294967295)<<17&4294967295|a>>>15))+((a=n+(e^i&(s^e))+r[7]+4249261313&4294967295)<<22&4294967295|a>>>10))+((a=e+(s^n&(i^s))+r[8]+1770035416&4294967295)<<7&4294967295|a>>>25))+((a=s+(i^e&(n^i))+r[9]+2336552879&4294967295)<<12&4294967295|a>>>20))+((a=i+(n^s&(e^n))+r[10]+4294925233&4294967295)<<17&4294967295|a>>>15))+((a=n+(e^i&(s^e))+r[11]+2304563134&4294967295)<<22&4294967295|a>>>10))+((a=e+(s^n&(i^s))+r[12]+1804603682&4294967295)<<7&4294967295|a>>>25))+((a=s+(i^e&(n^i))+r[13]+4254626195&4294967295)<<12&4294967295|a>>>20))+((a=i+(n^s&(e^n))+r[14]+2792965006&4294967295)<<17&4294967295|a>>>15))+((a=n+(e^i&(s^e))+r[15]+1236535329&4294967295)<<22&4294967295|a>>>10))+((a=e+(i^s&(n^i))+r[1]+4129170786&4294967295)<<5&4294967295|a>>>27))+((a=s+(n^i&(e^n))+r[6]+3225465664&4294967295)<<9&4294967295|a>>>23))+((a=i+(e^n&(s^e))+r[11]+643717713&4294967295)<<14&4294967295|a>>>18))+((a=n+(s^e&(i^s))+r[0]+3921069994&4294967295)<<20&4294967295|a>>>12))+((a=e+(i^s&(n^i))+r[5]+3593408605&4294967295)<<5&4294967295|a>>>27))+((a=s+(n^i&(e^n))+r[10]+38016083&4294967295)<<9&4294967295|a>>>23))+((a=i+(e^n&(s^e))+r[15]+3634488961&4294967295)<<14&4294967295|a>>>18))+((a=n+(s^e&(i^s))+r[4]+3889429448&4294967295)<<20&4294967295|a>>>12))+((a=e+(i^s&(n^i))+r[9]+568446438&4294967295)<<5&4294967295|a>>>27))+((a=s+(n^i&(e^n))+r[14]+3275163606&4294967295)<<9&4294967295|a>>>23))+((a=i+(e^n&(s^e))+r[3]+4107603335&4294967295)<<14&4294967295|a>>>18))+((a=n+(s^e&(i^s))+r[8]+1163531501&4294967295)<<20&4294967295|a>>>12))+((a=e+(i^s&(n^i))+r[13]+2850285829&4294967295)<<5&4294967295|a>>>27))+((a=s+(n^i&(e^n))+r[2]+4243563512&4294967295)<<9&4294967295|a>>>23))+((a=i+(e^n&(s^e))+r[7]+1735328473&4294967295)<<14&4294967295|a>>>18))+((a=n+(s^e&(i^s))+r[12]+2368359562&4294967295)<<20&4294967295|a>>>12))+((a=e+(n^i^s)+r[5]+4294588738&4294967295)<<4&4294967295|a>>>28))+((a=s+(e^n^i)+r[8]+2272392833&4294967295)<<11&4294967295|a>>>21))+((a=i+(s^e^n)+r[11]+1839030562&4294967295)<<16&4294967295|a>>>16))+((a=n+(i^s^e)+r[14]+4259657740&4294967295)<<23&4294967295|a>>>9))+((a=e+(n^i^s)+r[1]+2763975236&4294967295)<<4&4294967295|a>>>28))+((a=s+(e^n^i)+r[4]+1272893353&4294967295)<<11&4294967295|a>>>21))+((a=i+(s^e^n)+r[7]+4139469664&4294967295)<<16&4294967295|a>>>16))+((a=n+(i^s^e)+r[10]+3200236656&4294967295)<<23&4294967295|a>>>9))+((a=e+(n^i^s)+r[13]+681279174&4294967295)<<4&4294967295|a>>>28))+((a=s+(e^n^i)+r[0]+3936430074&4294967295)<<11&4294967295|a>>>21))+((a=i+(s^e^n)+r[3]+3572445317&4294967295)<<16&4294967295|a>>>16))+((a=n+(i^s^e)+r[6]+76029189&4294967295)<<23&4294967295|a>>>9))+((a=e+(n^i^s)+r[9]+3654602809&4294967295)<<4&4294967295|a>>>28))+((a=s+(e^n^i)+r[12]+3873151461&4294967295)<<11&4294967295|a>>>21))+((a=i+(s^e^n)+r[15]+530742520&4294967295)<<16&4294967295|a>>>16))+((a=n+(i^s^e)+r[2]+3299628645&4294967295)<<23&4294967295|a>>>9))+((a=e+(i^(n|~s))+r[0]+4096336452&4294967295)<<6&4294967295|a>>>26))+((a=s+(n^(e|~i))+r[7]+1126891415&4294967295)<<10&4294967295|a>>>22))+((a=i+(e^(s|~n))+r[14]+2878612391&4294967295)<<15&4294967295|a>>>17))+((a=n+(s^(i|~e))+r[5]+4237533241&4294967295)<<21&4294967295|a>>>11))+((a=e+(i^(n|~s))+r[12]+1700485571&4294967295)<<6&4294967295|a>>>26))+((a=s+(n^(e|~i))+r[3]+2399980690&4294967295)<<10&4294967295|a>>>22))+((a=i+(e^(s|~n))+r[10]+4293915773&4294967295)<<15&4294967295|a>>>17))+((a=n+(s^(i|~e))+r[1]+2240044497&4294967295)<<21&4294967295|a>>>11))+((a=e+(i^(n|~s))+r[8]+1873313359&4294967295)<<6&4294967295|a>>>26))+((a=s+(n^(e|~i))+r[15]+4264355552&4294967295)<<10&4294967295|a>>>22))+((a=i+(e^(s|~n))+r[6]+2734768916&4294967295)<<15&4294967295|a>>>17))+((a=n+(s^(i|~e))+r[13]+1309151649&4294967295)<<21&4294967295|a>>>11))+((s=(e=n+((a=e+(i^(n|~s))+r[4]+4149444226&4294967295)<<6&4294967295|a>>>26))+((a=s+(n^(e|~i))+r[11]+3174756917&4294967295)<<10&4294967295|a>>>22))^((i=s+((a=i+(e^(s|~n))+r[2]+718787259&4294967295)<<15&4294967295|a>>>17))|~e))+r[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(i+(a<<21&4294967295|a>>>11))&4294967295,t.g[2]=t.g[2]+i&4294967295,t.g[3]=t.g[3]+s&4294967295}function r(t,e){this.h=e;for(var n=[],r=!0,i=t.length-1;0<=i;i--){var s=0|t[i];r&&s==e||(n[i]=s,r=!1)}this.g=n}!function(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.C=function(t,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return e.prototype[n].apply(t,i)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(t,e){void 0===e&&(e=t.length);for(var r=e-this.blockSize,i=this.B,s=this.h,a=0;a<e;){if(0==s)for(;a<=r;)n(this,t,a),a+=this.blockSize;if("string"==typeof t){for(;a<e;)if(i[s++]=t.charCodeAt(a++),s==this.blockSize){n(this,i),s=0;break}}else for(;a<e;)if(i[s++]=t[a++],s==this.blockSize){n(this,i),s=0;break}}this.h=s,this.o+=e},e.prototype.v=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.o;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.u(t),t=Array(16),e=n=0;4>e;++e)for(var r=0;32>r;r+=8)t[n++]=this.g[e]>>>r&255;return t};var i={};function s(t){return-128<=t&&128>t?function(t,e){var n=i;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,function(t){return new r([0|t],0>t?-1:0)}):new r([0|t],0>t?-1:0)}function a(t){if(isNaN(t)||!isFinite(t))return o;if(0>t)return d(a(-t));for(var e=[],n=1,i=0;t>=n;i++)e[i]=t/n|0,n*=4294967296;return new r(e,0)}var o=s(0),l=s(1),c=s(16777216);function u(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function h(t){return-1==t.h}function d(t){for(var e=t.g.length,n=[],i=0;i<e;i++)n[i]=~t.g[i];return new r(n,~t.h).add(l)}function p(t,e){return t.add(d(e))}function f(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function m(t,e){this.g=t,this.h=e}function g(t,e){if(u(e))throw Error("division by zero");if(u(t))return new m(o,o);if(h(t))return e=g(d(t),e),new m(d(e.g),d(e.h));if(h(e))return e=g(t,d(e)),new m(d(e.g),e.h);if(30<t.g.length){if(h(t)||h(e))throw Error("slowDivide_ only works with positive integers.");for(var n=l,r=e;0>=r.l(t);)n=y(n),r=y(r);var i=v(n,1),s=v(r,1);for(r=v(r,2),n=v(n,2);!u(r);){var c=s.add(r);0>=c.l(t)&&(i=i.add(n),s=c),r=v(r,1),n=v(n,1)}return e=p(t,i.j(e)),new m(i,e)}for(i=o;0<=t.l(e);){for(n=Math.max(1,Math.floor(t.m()/e.m())),r=48>=(r=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,r-48),c=(s=a(n)).j(e);h(c)||0<c.l(t);)c=(s=a(n-=r)).j(e);u(s)&&(s=l),i=i.add(s),t=p(t,c)}return new m(i,t)}function y(t){for(var e=t.g.length+1,n=[],i=0;i<e;i++)n[i]=t.i(i)<<1|t.i(i-1)>>>31;return new r(n,t.h)}function v(t,e){var n=e>>5;e%=32;for(var i=t.g.length-n,s=[],a=0;a<i;a++)s[a]=0<e?t.i(a+n)>>>e|t.i(a+n+1)<<32-e:t.i(a+n);return new r(s,t.h)}(t=r.prototype).m=function(){if(h(this))return-d(this).m();for(var t=0,e=1,n=0;n<this.g.length;n++){var r=this.i(n);t+=(0<=r?r:4294967296+r)*e,e*=4294967296}return t},t.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(u(this))return"0";if(h(this))return"-"+d(this).toString(t);for(var e=a(Math.pow(t,6)),n=this,r="";;){var i=g(n,e).g,s=((0<(n=p(n,i.j(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(u(n=i))return s+r;for(;6>s.length;)s="0"+s;r=s+r}},t.i=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},t.l=function(t){return h(t=p(this,t))?-1:u(t)?0:1},t.abs=function(){return h(this)?d(this):this},t.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],i=0,s=0;s<=e;s++){var a=i+(65535&this.i(s))+(65535&t.i(s)),o=(a>>>16)+(this.i(s)>>>16)+(t.i(s)>>>16);i=o>>>16,a&=65535,o&=65535,n[s]=o<<16|a}return new r(n,-2147483648&n[n.length-1]?-1:0)},t.j=function(t){if(u(this)||u(t))return o;if(h(this))return h(t)?d(this).j(d(t)):d(d(this).j(t));if(h(t))return d(this.j(d(t)));if(0>this.l(c)&&0>t.l(c))return a(this.m()*t.m());for(var e=this.g.length+t.g.length,n=[],i=0;i<2*e;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(var s=0;s<t.g.length;s++){var l=this.i(i)>>>16,p=65535&this.i(i),m=t.i(s)>>>16,g=65535&t.i(s);n[2*i+2*s]+=p*g,f(n,2*i+2*s),n[2*i+2*s+1]+=l*g,f(n,2*i+2*s+1),n[2*i+2*s+1]+=p*m,f(n,2*i+2*s+1),n[2*i+2*s+2]+=l*m,f(n,2*i+2*s+2)}for(i=0;i<e;i++)n[i]=n[2*i+1]<<16|n[2*i];for(i=e;i<2*e;i++)n[i]=0;return new r(n,0)},t.A=function(t){return g(this,t).h},t.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],i=0;i<e;i++)n[i]=this.i(i)&t.i(i);return new r(n,this.h&t.h)},t.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],i=0;i<e;i++)n[i]=this.i(i)|t.i(i);return new r(n,this.h|t.h)},t.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],i=0;i<e;i++)n[i]=this.i(i)^t.i(i);return new r(n,this.h^t.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.A,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=a,r.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return d(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=a(Math.pow(n,8)),i=o,s=0;s<e.length;s+=8){var l=Math.min(8,e.length-s),c=parseInt(e.substring(s,s+l),n);8>l?(l=a(Math.pow(n,l)),i=i.j(l).add(a(c))):i=(i=i.j(r)).add(a(c))}return i},dn=r}).apply(void 0!==pn?pn:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const fn="4.7.17";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}mn.UNAUTHENTICATED=new mn(null),mn.GOOGLE_CREDENTIALS=new mn("google-credentials-uid"),mn.FIRST_PARTY=new mn("first-party-uid"),mn.MOCK_USER=new mn("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let gn="11.9.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=new Zt("@firebase/firestore");function vn(t,...e){if(yn.logLevel<=qt.DEBUG){const n=e.map(_n);yn.debug(`Firestore (${gn}): ${t}`,...n)}}function wn(t,...e){if(yn.logLevel<=qt.ERROR){const n=e.map(_n);yn.error(`Firestore (${gn}): ${t}`,...n)}}function bn(t,...e){if(yn.logLevel<=qt.WARN){const n=e.map(_n);yn.warn(`Firestore (${gn}): ${t}`,...n)}}function _n(t){if("string"==typeof t)return t;try{
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
return e=t,JSON.stringify(e)}catch(n){return t}var e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sn(t,e,n){let r="Unexpected state";"string"==typeof e?r=e:n=e,En(t,r,n)}function En(t,e,n){let r=`FIRESTORE (${gn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(i){r+=" CONTEXT: "+n}throw wn(r),new Error(r)}function Tn(t,e,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,t||En(e,i,r)}function kn(t,e){return t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In="unknown",Cn="invalid-argument",xn="unauthenticated",Dn="failed-precondition";class An extends Vt{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Nn{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(mn.UNAUTHENTICATED))}shutdown(){}}class Ln{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Mn{constructor(t){this.auth=null,t.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(t=>t?(Tn("string"==typeof t.accessToken,42297,{t:t}),new Pn(t.accessToken,new mn(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}class Vn{constructor(t,e,n){this.i=t,this.o=e,this.u=n,this.type="FirstParty",this.user=mn.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const t=this.h();return t&&this.l.set("Authorization",t),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class On{constructor(t,e,n){this.i=t,this.o=e,this.u=n}getToken(){return Promise.resolve(new Vn(this.i,this.o,this.u))}start(t,e){t.enqueueRetryable(()=>e(mn.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class $n{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Rn{constructor(t,e){var n;this.m=e,this.appCheck=null,this.T=null,null!=(n=t)&&void 0!==n.settings&&t.settings.appCheckToken&&(this.T=t.settings.appCheckToken),e.onInit(t=>{this.appCheck=t})}getToken(){return this.T?Promise.resolve(new $n(this.T)):this.appCheck?this.appCheck.getToken().then(t=>t?(Tn("string"==typeof t.token,3470,{tokenResult:t}),new $n(t.token)):null):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(t,e,n,r,i,s,a,o,l,c){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=l,this.isUsingEmulator=c}}const jn="(default)";class Bn{constructor(t,e){this.projectId=t,this.database=e||jn}static empty(){return new Bn("","")}get isDefaultDatabase(){return this.database===jn}isEqual(t){return t instanceof Bn&&t.projectId===this.projectId&&t.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{static newId(){const t=62*Math.floor(256/62);let e="";for(;e.length<20;){const n=Un(40);for(let r=0;r<n.length;++r)e.length<20&&n[r]<t&&(e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return e}}function Hn(t,e){return t<e?-1:t>e?1:0}function qn(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function Wn(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return Hn(t[n],e[n]);return Hn(t.length,e.length)}function Kn(t,e,n){return t.length===e.length&&t.every((t,r)=>n(t,e[r]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gn="__name__";class Jn{constructor(t,e,n){void 0===e?e=0:e>t.length&&Sn(637,{offset:e,range:t.length}),void 0===n?n=t.length-e:n>t.length-e&&Sn(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Jn.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Jn?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=Jn.compareSegments(t.get(r),e.get(r));if(0!==n)return n}return Hn(t.length,e.length)}static compareSegments(t,e){const n=Jn.isNumericId(t),r=Jn.isNumericId(e);return n&&!r?-1:!n&&r?1:n&&r?Jn.extractNumericId(t).compare(Jn.extractNumericId(e)):function(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),i=e.codePointAt(n);if(r!==i){if(r<128&&i<128)return Hn(r,i);{const s=new TextEncoder,a=Wn(s.encode(qn(t,n)),s.encode(qn(e,n)));return 0!==a?a:Hn(r,i)}}n+=r>65535?2:1}return Hn(t.length,e.length)}(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return dn.fromString(t.substring(4,t.length-2))}}class Yn extends Jn{construct(t,e,n){return new Yn(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new An(Cn,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(t=>t.length>0))}return new Yn(e)}static emptyPath(){return new Yn([])}}const Zn=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Xn extends Jn{construct(t,e,n){return new Xn(t,e,n)}static isValidIdentifier(t){return Zn.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Xn.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Gn}static keyField(){return new Xn([Gn])}static fromServerFormat(t){const e=[];let n="",r=0;const i=()=>{if(0===n.length)throw new An(Cn,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let s=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new An(Cn,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new An(Cn,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(s=!s,r++):"."!==e||s?(n+=e,r++):(i(),r++)}if(i(),s)throw new An(Cn,"Unterminated ` in path: "+t);return new Xn(e)}static emptyPath(){return new Xn([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(t){this.path=t}static fromPath(t){return new Qn(Yn.fromString(t))}static fromName(t){return new Qn(Yn.fromString(t).popFirst(5))}static empty(){return new Qn(Yn.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===Yn.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Yn.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Qn(new Yn(t.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(t){if(!Qn.isDocumentKey(t))throw new An(Cn,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function er(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":Sn(12329,{type:typeof t})}function nr(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new An(Cn,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=er(t);throw new An(Cn,`Expected type '${e.name}', but it was: ${n}`)}}return t}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rr(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}let ir=null;function sr(t){return 0===t&&1/t==-1/0}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar="RestConnection",or={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class lr{get A(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.P=e+"://"+t.host,this.R=`projects/${n}/databases/${r}`,this.I=this.databaseId.database===jn?`project_id=${n}`:`project_id=${n}&database_id=${r}`}V(t,e,n,r,i){const s=(null===ir?ir=268435456+Math.round(2147483648*Math.random()):ir++,"0x"+ir.toString(16)),a=this.p(t,e.toUriEncodedString());vn(ar,`Sending RPC '${t}' ${s}:`,a,n);const o={"google-cloud-resource-prefix":this.R,"x-goog-request-params":this.I};this.F(o,r,i);const{host:l}=new URL(a),c=Pt(l);return this.v(t,a,o,n,c).then(e=>(vn(ar,`Received RPC '${t}' ${s}: `,e),e),e=>{throw bn(ar,`RPC '${t}' ${s} failed with error: `,e,"url: ",a,"request:",n),e})}D(t,e,n,r,i,s){return this.V(t,e,n,r,i)}F(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+gn,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}p(t,e){const n=or[t];return`${this.P}/v1/${e}:${n}`}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cr,ur;function hr(t){if(void 0===t)return wn("RPC_ERROR","HTTP error has no status"),In;switch(t){case 200:return"ok";case 400:return Dn;case 401:return xn;case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 416:return"out-of-range";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return In;case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded";default:return t>=200&&t<300?"ok":t>=400&&t<500?Dn:t>=500&&t<600?"internal":In}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(ur=cr||(cr={}))[ur.OK=0]="OK",ur[ur.CANCELLED=1]="CANCELLED",ur[ur.UNKNOWN=2]="UNKNOWN",ur[ur.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ur[ur.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ur[ur.NOT_FOUND=5]="NOT_FOUND",ur[ur.ALREADY_EXISTS=6]="ALREADY_EXISTS",ur[ur.PERMISSION_DENIED=7]="PERMISSION_DENIED",ur[ur.UNAUTHENTICATED=16]="UNAUTHENTICATED",ur[ur.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ur[ur.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ur[ur.ABORTED=10]="ABORTED",ur[ur.OUT_OF_RANGE=11]="OUT_OF_RANGE",ur[ur.UNIMPLEMENTED=12]="UNIMPLEMENTED",ur[ur.INTERNAL=13]="INTERNAL",ur[ur.UNAVAILABLE=14]="UNAVAILABLE",ur[ur.DATA_LOSS=15]="DATA_LOSS";class dr extends lr{C(t,e){throw new Error("Not supported by FetchConnection")}async v(t,e,n,r,i){var s;const a=JSON.stringify(r);let o;try{const t={method:"POST",headers:n,body:a};i&&(t.credentials="include"),o=await fetch(e,t)}catch(l){const t=l;throw new An(hr(t.status),"Request failed with error: "+t.statusText)}if(!o.ok){let t=await o.json();Array.isArray(t)&&(t=t[0]);const e=null===(s=null==t?void 0:t.error)||void 0===s?void 0:s.message;throw new An(hr(o.status),`Request failed with error: ${null!=e?e:o.statusText}`)}return o.json()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function fr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new mr("Invalid base64 string: "+e):e}}(t);return new gr(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new gr(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Hn(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}gr.EMPTY_BYTE_STRING=new gr("");const yr=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function vr(t){if(Tn(!!t,39018),"string"==typeof t){let e=0;const n=yr.exec(t);if(Tn(!!n,46558,{timestamp:t}),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:wr(t.seconds),nanos:wr(t.nanos)}}function wr(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function br(t){return"string"==typeof t?gr.fromBase64String(t):gr.fromUint8Array(t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _r=-62135596800,Sr=1e6;class Er{static now(){return Er.fromMillis(Date.now())}static fromDate(t){return Er.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Sr);return new Er(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new An(Cn,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new An(Cn,"Timestamp nanoseconds out of range: "+e);if(t<_r)throw new An(Cn,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new An(Cn,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Sr}_compareTo(t){return this.seconds===t.seconds?Hn(this.nanoseconds,t.nanoseconds):Hn(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-_r;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tr(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function kr(t){const e=t.mapValue.fields.__previous_value__;return Tr(e)?kr(e):e}function Ir(t){const e=vr(t.mapValue.fields.__local_write_time__.timestampValue);return new Er(e.seconds,e.nanos)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr="__type__",xr="__vector__",Dr="value";function Ar(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Tr(t)?4:"__max__"===(((t.mapValue||{}).fields||{}).__type__||{}).stringValue?9007199254740991:function(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[Cr])||void 0===n?void 0:n.stringValue)===xr}(t)?10:11:Sn(28295,{value:t})}function Pr(t,e){if(t===e)return!0;const n=Ar(t);if(n!==Ar(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ir(t).isEqual(Ir(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=vr(t.timestampValue),r=vr(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return r=e,br(t.bytesValue).isEqual(br(r.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return wr(t.geoPointValue.latitude)===wr(e.geoPointValue.latitude)&&wr(t.geoPointValue.longitude)===wr(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return wr(t.integerValue)===wr(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=wr(t.doubleValue),r=wr(e.doubleValue);return n===r?sr(n)===sr(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return Kn(t.arrayValue.values||[],e.arrayValue.values||[],Pr);case 10:case 11:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(pr(n)!==pr(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!Pr(n[i],r[i])))return!1;return!0}(t,e);default:return Sn(52216,{left:t})}var r}function Nr(t){return!!t&&"mapValue"in t}function Lr(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return fr(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Lr(n)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Lr(t.arrayValue.values[n]);return e}return Object.assign({},t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{static fromTimestamp(t){return new Mr(t)}static min(){return new Mr(new Er(0,0))}static max(){return new Mr(new Er(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(t,e){this.comparator=t,this.root=e||$r.EMPTY}insert(t,e){return new Vr(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,$r.BLACK,null,null))}remove(t){return new Vr(this.comparator,this.root.remove(t,this.comparator).copy(null,null,$r.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Or(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Or(this.root,t,this.comparator,!1)}getReverseIterator(){return new Or(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Or(this.root,t,this.comparator,!0)}}class Or{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&r&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(0===i){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class $r{constructor(t,e,n,r,i){this.key=t,this.value=e,this.color=null!=n?n:$r.RED,this.left=null!=r?r:$r.EMPTY,this.right=null!=i?i:$r.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,i){return new $r(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const i=n(t,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===i?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return $r.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return $r.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,$r.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,$r.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Sn(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Sn(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw Sn(27949);return t+(this.isRed()?0:1)}}$r.EMPTY=null,$r.RED=!0,$r.BLACK=!1,$r.EMPTY=new class{constructor(){this.size=0}get key(){throw Sn(57766)}get value(){throw Sn(16141)}get color(){throw Sn(16727)}get left(){throw Sn(29726)}get right(){throw Sn(36894)}copy(t,e,n,r,i){return this}insert(t,e,n){return new $r(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rr{constructor(t){this.comparator=t,this.data=new Vr(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Fr(this.data.getIterator())}getIteratorFrom(t){return new Fr(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof Rr))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Rr(this.comparator);return e.data=t,e}}class Fr{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(t){this.fields=t,t.sort(Xn.comparator)}static empty(){return new jr([])}unionWith(t){let e=new Rr(Xn.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new jr(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Kn(this.fields,t.fields,(t,e)=>t.isEqual(e))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(t){this.value=t}static empty(){return new Br({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Nr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Lr(e)}setAll(t){let e=Xn.emptyPath(),n={},r=[];t.forEach((t,i)=>{if(!e.isImmediateParentOf(i)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=i.popLast()}t?n[i.lastSegment()]=Lr(t):r.push(i.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,n,r)}delete(t){const e=this.field(t.popLast());Nr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Pr(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];Nr(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){fr(e,(e,n)=>t[e]=n);for(const r of n)delete t[r]}clone(){return new Br(Lr(this.value))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(t,e,n,r,i,s,a){this.key=t,this.documentType=e,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(t){return new Ur(t,0,Mr.min(),Mr.min(),Mr.min(),Br.empty(),0)}static newFoundDocument(t,e,n,r){return new Ur(t,1,e,Mr.min(),n,r,0)}static newNoDocument(t,e){return new Ur(t,2,e,Mr.min(),Mr.min(),Br.empty(),0)}static newUnknownDocument(t,e){return new Ur(t,3,e,Mr.min(),Mr.min(),Br.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Mr.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Br.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Br.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Mr.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Ur&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Ur(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(t,e=null,n=[],r=[],i=null,s="F",a=null,o=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.q=null,this.B=null,this.$=null,this.startAt,this.endAt}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hr(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:sr(e)?"-0":e}}function qr(t,e){return"number"==typeof(n=e)&&Number.isInteger(n)&&!sr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER?function(t){return{integerValue:""+t}}(e):Hr(t,e);var n}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(){this._=void 0}}class Kr extends Wr{}class Gr extends Wr{constructor(t){super(),this.elements=t}}class Jr extends Wr{constructor(t){super(),this.elements=t}}class Yr extends Wr{constructor(t,e){super(),this.serializer=t,this.L=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(t,e){this.field=t,this.transform=e}}class Xr{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Xr}static exists(t){return new Xr(void 0,t)}static updateTime(t){return new Xr(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}class Qr{}class ti extends Qr{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class ei extends Qr{constructor(t,e,n,r,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}class ni extends Qr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ri extends Qr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}class ii{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function si(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ai(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function oi(t,e){return si(t,e.toTimestamp())}function li(t){return Tn(!!t,49232),Mr.fromTimestamp(function(t){const e=vr(t);return new Er(e.seconds,e.nanos)}(t))}function ci(t,e){return ui(t,e).canonicalString()}function ui(t,e){const n=(r=t,new Yn(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===e?n:n.child(e)}function hi(t,e){return ci(t.databaseId,e.path)}function di(t,e){const n=function(t){const e=Yn.fromString(t);return Tn(mi(e),10190,{key:e.toString()}),e}(e);if(n.get(1)!==t.databaseId.projectId)throw new An(Cn,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new An(Cn,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Qn((Tn((r=n).length>4&&"documents"===r.get(4),29091,{key:r.toString()}),r.popFirst(5)));var r}function pi(t,e,n){return{name:hi(t,e),fields:n.value.mapValue.fields}}function fi(t){const e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function mi(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gi(t){return new ii(t,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{}class vi extends yi{constructor(t,e,n,r){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=r,this.et=!1}rt(){if(this.et)throw new An(Dn,"The client has already been terminated.")}V(t,e,n,r){return this.rt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.V(t,ui(e,n),r,i,s)).catch(t=>{throw"FirebaseError"===t.name?(t.code===xn&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new An(In,t.toString())})}D(t,e,n,r,i){return this.rt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.D(t,ui(e,n),r,s,a,i)).catch(t=>{throw"FirebaseError"===t.name?(t.code===xn&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new An(In,t.toString())})}terminate(){this.et=!0,this.connection.terminate()}}async function wi(t,e){const n=kn(t),r={writes:e.map(t=>function(t,e){let n;if(e instanceof ti)n={update:pi(t,e.key,e.value)};else if(e instanceof ni)n={delete:hi(t,e.key)};else if(e instanceof ei)n={update:pi(t,e.key,e.data),updateMask:fi(e.fieldMask)};else{if(!(e instanceof ri))return Sn(16599,{k:e.type});n={verify:hi(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(t=>function(t,e){const n=e.transform;if(n instanceof Kr)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Gr)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Jr)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Yr)return{fieldPath:e.field.canonicalString(),increment:n.L};throw Sn(20930,{transform:e.transform})}(0,t))),e.precondition.isNone||(n.currentDocument=(r=t,void 0!==(i=e.precondition).updateTime?{updateTime:oi(r,i.updateTime)}:void 0!==i.exists?{exists:i.exists}:Sn(27497))),n;var r,i}(n.serializer,t))};await n.V("Commit",n.serializer.databaseId,Yn.emptyPath(),r)}async function bi(t,e){const n=kn(t),r={documents:e.map(t=>hi(n.serializer,t))},i=await n.D("BatchGetDocuments",n.serializer.databaseId,Yn.emptyPath(),r,e.length),s=new Map;i.forEach(t=>{const e=function(t,e){return"found"in e?function(t,e){Tn(!!e.found,43571),e.found.name,e.found.updateTime;const n=di(t,e.found.name),r=li(e.found.updateTime),i=e.found.createTime?li(e.found.createTime):Mr.min(),s=new Br({mapValue:{fields:e.found.fields}});return Ur.newFoundDocument(n,r,i,s)}(t,e):"missing"in e?function(t,e){Tn(!!e.missing,3894),Tn(!!e.readTime,22933);const n=di(t,e.missing),r=li(e.readTime);return Ur.newNoDocument(n,r)}(t,e):Sn(7234,{result:e})}(n.serializer,t);s.set(e.key.toString(),e)});const a=[];return e.forEach(t=>{const e=s.get(t.toString());Tn(!!e,55234,{key:t}),a.push(e)}),a
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const _i="ComponentProvider",Si=new Map;function Ei(t){if(t._terminated)throw new An(Dn,"The client has already been terminated.");if(!Si.has(t)){vn(_i,"Initializing Datastore");const s=function(t){return new dr(t)}((e=t._databaseId,n=t.app.options.appId||"",r=t._persistenceKey,i=t._freezeSettings(),new Fn(e,n,r,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,rr(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator))),a=gi(t._databaseId),o=function(t,e,n,r){return new vi(t,e,n,r)}(t._authCredentials,t._appCheckCredentials,s,a);Si.set(t,o)}var e,n,r,i;return Si.get(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti="firestore.googleapis.com",ki=!0;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new An(Cn,"Can't provide ssl option if host option is not set");this.host=Ti,this.ssl=ki}else this.host=t.host,this.ssl=null!==(e=t.ssl)&&void 0!==e?e:ki;if(this.isUsingEmulator=void 0!==t.emulatorOptions,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new An(Cn,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}!function(t,e,n,r){if(!0===e&&!0===r)throw new An(Cn,`${t} and ${n} cannot be used together.`)}("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=rr(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new An(Cn,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new An(Cn,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new An(Cn,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class Ci{constructor(t,e,n,r){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ii({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new An(Dn,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new An(Dn,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ii(t),this._emulatorOptions=t.emulatorOptions||{},void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new Nn;switch(t.type){case"firstParty":return new On(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new An(Cn,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Si.get(t);e&&(vn(_i,"Removing Datastore"),Si.delete(t),e.terminate())}(this),Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xi{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new xi(this.firestore,t,this._query)}}class Di{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ai(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Di(this.firestore,t,this._key)}}class Ai extends xi{constructor(t,e,n){super(t,e,new zr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Di(this.firestore,null,new Qn(t))}withConverter(t){return new Ai(this.firestore,t,this._path)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pi{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Pi(gr.fromBase64String(t))}catch(e){throw new An(Cn,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Pi(gr.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new An(Cn,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Xn(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(t){this._methodName=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new An(Cn,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new An(Cn,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Hn(this._lat,t._lat)||Hn(this._long,t._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(t){this._values=(t||[]).map(t=>t)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(this._values,t._values)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oi=/^__.*__$/;class $i{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new ei(t,this.data,this.fieldMask,e,this.fieldTransforms):new ti(t,this.data,e,this.fieldTransforms)}}class Ri{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ei(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Fi(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Sn(40011,{it:t})}}class ji{constructor(t,e,n,r,i,s){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.st(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get it(){return this.settings.it}ot(t){return new ji(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ut(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.ot({path:n,_t:!1});return r.ct(t),r}lt(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.ot({path:n,_t:!1});return r.st(),r}ht(t){return this.ot({path:void 0,_t:!0})}dt(t){return Xi(t,this.settings.methodName,this.settings.ft||!1,this.path,this.settings.Et)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}st(){if(this.path)for(let t=0;t<this.path.length;t++)this.ct(this.path.get(t))}ct(t){if(0===t.length)throw this.dt("Document fields must not be empty");if(Fi(this.it)&&Oi.test(t))throw this.dt('Document fields cannot begin and end with "__"')}}class Bi{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||gi(t)}Tt(t,e,n,r=!1){return new ji({it:t,methodName:e,Et:n,path:Xn.emptyPath(),_t:!1,ft:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ui(t){const e=t._freezeSettings(),n=gi(t._databaseId);return new Bi(t._databaseId,!!e.ignoreUndefinedProperties,n)}class zi extends Li{_toFieldTransform(t){if(2!==t.it)throw 1===t.it?t.dt(`${this._methodName}() can only appear at the top level of your update data`):t.dt(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof zi}}class Hi extends Li{constructor(t,e){super(t),this.Pt=e}_toFieldTransform(t){const e=new Yr(t.serializer,qr(t.serializer,this.Pt));return new Zr(t.path,e)}isEqual(t){return t instanceof Hi&&this.Pt===t.Pt}}function qi(t,e){if(Ki(t=jt(t)))return Gi("Unsupported field value:",e,t),Wi(t,e);if(t instanceof Li)return function(t,e){if(!Fi(e.it))throw e.dt(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.dt(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings._t&&4!==e.it)throw e.dt("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const i of t){let t=qi(i,e.ht(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=jt(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return qr(e.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=Er.fromDate(t);return{timestampValue:si(e.serializer,n)}}if(t instanceof Er){const n=new Er(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:si(e.serializer,n)}}if(t instanceof Mi)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof Pi)return{bytesValue:ai(e.serializer,t._byteString)};if(t instanceof Di){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.dt(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:ci(t.firestore._databaseId||e.databaseId,t._key.path)}}if(t instanceof Vi)return n=t,r=e,{mapValue:{fields:{[Cr]:{stringValue:xr},[Dr]:{arrayValue:{values:n.toArray().map(t=>{if("number"!=typeof t)throw r.dt("VectorValues must only contain numeric values.");return Hr(r.serializer,t)})}}}}};var n,r;throw e.dt(`Unsupported field value: ${er(t)}`)}(t,e)}function Wi(t,e){const n={};return function(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):fr(t,(t,r)=>{const i=qi(r,e.ut(t));null!=i&&(n[t]=i)}),{mapValue:{fields:n}}}function Ki(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof Er||t instanceof Mi||t instanceof Pi||t instanceof Di||t instanceof Li||t instanceof Vi)}function Gi(t,e,n){if(!Ki(n)||("object"!=typeof(r=n)||null===r||Object.getPrototypeOf(r)!==Object.prototype&&null!==Object.getPrototypeOf(r))){const r=er(n);throw"an object"===r?e.dt(t+" a custom object"):e.dt(t+" "+r)}var r}function Ji(t,e,n){if((e=jt(e))instanceof Ni)return e._internalPath;if("string"==typeof e)return Zi(t,e);throw Xi("Field path arguments must be of type string or ",t,!1,void 0,n)}const Yi=new RegExp("[~\\*/\\[\\]]");function Zi(t,e,n){if(e.search(Yi)>=0)throw Xi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ni(...e.split("."))._internalPath}catch(r){throw Xi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Xi(t,e,n,r,i){const s=r&&!r.isEmpty(),a=void 0!==i;let o=`Function ${e}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new An(Cn,o+t+l)}function Qi(t,e){return t.some(t=>t.isEqual(e))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(t,e,n,r,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Di(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new es(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(function(t,e){return"string"==typeof e?Zi(t,e):e instanceof Ni?e._internalPath:e._delegate._internalPath}("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class es extends ts{data(){return super.data()}}class ns{convertValue(t,e="none"){switch(Ar(t)){case 0:return null;case 1:return t.booleanValue;case 2:return wr(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(br(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw Sn(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return fr(t,(t,r)=>{n[t]=this.convertValue(r,e)}),n}convertVectorValue(t){var e,n,r;const i=null===(r=null===(n=null===(e=t.fields)||void 0===e?void 0:e[Dr].arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.map(t=>wr(t.doubleValue));return new Vi(i)}convertGeoPoint(t){return new Mi(wr(t.latitude),wr(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=kr(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Ir(t));default:return null}}convertTimestamp(t){const e=vr(t);return new Er(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Yn.fromString(t);Tn(mi(n),9688,{name:t});const r=new Bn(n.get(1),n.get(3)),i=new Qn(n.popFirst(5));return r.isEqual(e)||wn(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs extends ns{constructor(t){super(),this.firestore=t}convertBytes(t){return new Pi(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Di(this.firestore,null,e)}}function is(t){const e=Ei((t=nr(t,Di)).firestore),n=new rs(t.firestore);return bi(e,[t._key]).then(e=>{Tn(1===e.length,15618);const r=e[0];return new ts(t.firestore,n,t._key,r.isFoundDocument()?r:null,t.converter)})}function ss(t,e,n){const r=function(t,e){let n;return n=t?t.toFirestore(e):e,n}((t=nr(t,Di)).converter,e),i=function(t,e,n,r,i,s={}){const a=t.Tt(s.merge||s.mergeFields?2:0,e,n,i);Gi("Data must be an object, but it was:",a,r);const o=Wi(r,a);let l,c;if(s.merge)l=new jr(a.fieldMask),c=a.fieldTransforms;else if(s.mergeFields){const t=[];for(const r of s.mergeFields){const i=Ji(e,r,n);if(!a.contains(i))throw new An(Cn,`Field '${i}' is specified in your field mask but missing from your input data.`);Qi(t,i)||t.push(i)}l=new jr(t),c=a.fieldTransforms.filter(t=>l.covers(t.field))}else l=null,c=a.fieldTransforms;return new $i(new Br(o),l,c)}(Ui(t.firestore),"setDoc",t._key,r,null!==t.converter,n);return wi(Ei(t.firestore),[i.toMutation(t._key,Xr.none())])}function as(t,e,n,...r){const i=Ui((t=nr(t,Di)).firestore);let s;return s="string"==typeof(e=jt(e))||e instanceof Ni?function(t,e,n,r,i,s){const a=t.Tt(1,e,n),o=[Ji(e,r,n)],l=[i];if(s.length%2!=0)throw new An(Cn,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<s.length;d+=2)o.push(Ji(e,s[d])),l.push(s[d+1]);const c=[],u=Br.empty();for(let d=o.length-1;d>=0;--d)if(!Qi(c,o[d])){const t=o[d];let e=l[d];e=jt(e);const n=a.lt(t);if(e instanceof zi)c.push(t);else{const r=qi(e,n);null!=r&&(c.push(t),u.set(t,r))}}const h=new jr(c);return new Ri(u,h,a.fieldTransforms)}(i,"updateDoc",t._key,e,n,r):function(t,e,n,r){const i=t.Tt(1,e,n);Gi("Data must be an object, but it was:",i,r);const s=[],a=Br.empty();fr(r,(t,r)=>{const o=Zi(e,t,n);r=jt(r);const l=i.lt(o);if(r instanceof zi)s.push(o);else{const t=qi(r,l);null!=t&&(s.push(o),a.set(o,t))}});const o=new jr(s);return new Ri(a,o,i.fieldTransforms)}(i,"updateDoc",t._key,e),wi(Ei(t.firestore),[s.toMutation(t._key,Xr.exists(!0))])}function os(t){return new Hi("increment",t)}gn="11.9.0_lite",Ye(new Bt("firestore/lite",(t,{instanceIdentifier:e,options:n})=>{const r=t.getProvider("app").getImmediate(),i=new Ci(new Mn(t.getProvider("auth-internal")),new Rn(r,t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new An(Cn,'"projectId" not provided in firebase.initializeApp.');return new Bn(t.options.projectId,e)}(r,e),r);return n&&i._setSettings(n),i},"PUBLIC").setMultipleInstances(!0)),tn("firestore-lite",fn,""),tn("firestore-lite",fn,"esm2017");const ls=function(t,e,...n){if(t=jt(t),1===arguments.length&&(e=zn.newId()),function(t,e,n){if(!n)throw new An(Cn,`Function ${t}() cannot be called with an empty ${e}.`)}("doc","path",e),t instanceof Ci){const r=Yn.fromString(e,...n);return tr(r),new Di(t,null,new Qn(r))}{if(!(t instanceof Di||t instanceof Ai))throw new An(Cn,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Yn.fromString(e,...n));return tr(r),new Di(t.firestore,t instanceof Ai?t.converter:null,new Qn(r))}}(function(t){const e="string"==typeof t?t:"(default)",n=function(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}("object"==typeof t?t:function(t=He){const e=We.get(t);if(!e&&t===He&&Dt())return Qe();if(!e)throw Ze.create("no-app",{appName:t});return e}(),"firestore/lite").getImmediate({identifier:e});if(!n._initialized){const t=xt("firestore");t&&function(t,e,n,r={}){var i;t=nr(t,Ci);const s=Pt(e),a=t._getSettings(),o=Object.assign(Object.assign({},a),{emulatorOptions:t._getEmulatorOptions()}),l=`${e}:${n}`;s&&(async function(t){(await fetch(t,{credentials:"include"})).ok}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(`https://${l}`),Mt("Firestore",!0)),a.host!==Ti&&a.host!==l&&bn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c=Object.assign(Object.assign({},a),{host:l,ssl:s,emulatorOptions:r});if(!Rt(c,o)&&(t._setSettings(c),r.mockUserToken)){let e,n;if("string"==typeof r.mockUserToken)e=r.mockUserToken,n=mn.MOCK_USER;else{e=function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Tt(JSON.stringify({alg:"none",type:"JWT"})),Tt(JSON.stringify(s)),""].join(".")}(r.mockUserToken,null===(i=t._app)||void 0===i?void 0:i.options.projectId);const s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new An(Cn,"mockUserToken must contain 'sub' or 'user_id' field!");n=new mn(s)}t._authCredentials=new Ln(new Pn(e,n))}}(n,...t)}return n}(Qe({apiKey:"AIzaSyCWhnqOzsDExtNu14s_gxUpAWeV-PPPog8",authDomain:"click-counter-4f529.firebaseapp.com",projectId:"click-counter-4f529",storageBucket:"click-counter-4f529.appspot.com",messagingSenderId:"950861743362",appId:"1:950861743362:web:77dc41eb31b34334566e1b",measurementId:"G-7EEMWQS33Z"})),"terminal","stats");function cs(){const e=t(0),n=t({}),r=t(null),i=async()=>{const t=await async function(){try{const t=await is(ls);if(t.exists()){const e=t.data();return{totalVisits:e.totalVisits||0,totalCommands:e.totalCommands||0,commandStats:e.commandStats||{},lastVisit:e.lastVisit?new Date(e.lastVisit):null}}return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}catch(t){return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}}();e.value=t.totalVisits,n.value=t.commandStats,r.value=t.lastVisit},s=(t=5)=>Object.entries(n.value).sort(([,t],[,e])=>e-t).slice(0,t).map(([t,e])=>({command:t,count:e}));return i(),{trackVisit:async()=>{await async function(){try{(await is(ls)).exists()?await as(ls,{totalVisits:os(1),lastVisit:(new Date).toISOString()}):await ss(ls,{totalVisits:1,totalCommands:0,commandStats:{},lastVisit:(new Date).toISOString()})}catch(t){}}(),e.value++,r.value=new Date},trackCommand:async t=>{await async function(t){try{const e=await is(ls);if(e.exists()){const n=e.data().commandStats||{};n[t]=(n[t]||0)+1,await as(ls,{totalCommands:os(1),commandStats:n})}else await ss(ls,{totalVisits:0,totalCommands:1,commandStats:{[t]:1},lastVisit:(new Date).toISOString()})}catch(e){}}(t),n.value[t]||(n.value[t]=0),n.value[t]++},getVisitStats:()=>({totalVisits:e.value,lastVisit:r.value,popularCommands:s(),totalCommands:Object.values(n.value).reduce((t,e)=>t+e,0)}),loadVisitData:i}}const us={class:"terminal-prompt"},hs={class:"prompt-user"},ds={class:"prompt-path"},ps={class:"prompt-symbol"},fs=k({__name:"TerminalPrompt",setup:t=>(t,e)=>(s(),a("span",us,[o("span",hs,l(c(I).user)+"@"+l(c(I).host),1),e[0]||(e[0]=o("span",{class:"prompt-sep"},":",-1)),o("span",ds,l(c(I).path),1),o("span",ps,l(c(I).symbol),1)]))},[["__scopeId","data-v-29865d5a"]]),ms={class:"terminal-line"},gs={class:"command"},ys={key:1,class:"terminal-image-container"},vs=["src","alt"],ws=["href"],bs=["innerHTML"],_s=k({__name:"TerminalLine",props:{line:{type:Object,required:!0},index:{type:Number,required:!0}},emits:["register","unregister"],setup(t,{emit:e}){const n=t,r=e,c=i(()=>("typewriter"===n.line.type||"output"===n.line.type)&&!n.line.image),y=u("target");return h(()=>{c.value&&y.value&&r("register",n.index,y.value)}),d(()=>{c.value&&r("unregister",n.index)}),(e,n)=>(s(),a("div",ms,["command"===t.line.type?(s(),a(p,{key:0},[f(fs),o("span",gs,l(t.line.content),1)],64)):t.line.image?(s(),a("div",ys,[o("img",{src:t.line.image,alt:t.line.alt||"Terminal image",class:"terminal-image"},null,8,vs)])):c.value?(s(),a("span",{key:2,ref_key:"target",ref:y,class:m(t.line.type)},null,2)):t.line.link?(s(),a("span",{key:3,class:m(t.line.type)},[g(l(t.line.prefix)+" ",1),o("a",{href:t.line.link,target:"_blank",class:"terminal-link"},l(t.line.linkText),9,ws)],2)):t.line.html?(s(),a("span",{key:4,class:m(t.line.type),innerHTML:t.line.content},null,10,bs)):(s(),a("span",{key:5,class:m(t.line.type)},l(t.line.content),3))]))}},[["__scopeId","data-v-5dad239e"]]),Ss=14,Es=k({__name:"TerminalMatrix",props:{color:{type:String,default:"#33ff66"}},emits:["close"],setup(e,{emit:n}){const r=e,i=n,l="アイウエオカキクケコサシスセソ0123456789ABCDEFZ".split(""),c=t(null);let u=null,p=null,f=0,m=[];const g=()=>{const t=c.value;(null==t?void 0:t.parentElement)&&(t.width=t.parentElement.clientWidth,t.height=t.parentElement.clientHeight,f=Math.max(1,Math.floor(t.width/Ss)),m=Array.from({length:f},()=>Math.floor(Math.random()*(t.height/Ss))),u=t.getContext("2d"),u.font="14px monospace")},y=()=>{const t=c.value;if(t&&u){u.fillStyle="rgba(0, 0, 0, 0.08)",u.fillRect(0,0,t.width,t.height),u.fillStyle=r.color;for(let e=0;e<f;e++){const n=l[Math.floor(Math.random()*l.length)];u.fillText(n,e*Ss,m[e]*Ss),m[e]*Ss>t.height&&Math.random()>.975&&(m[e]=0),m[e]++}p=requestAnimationFrame(y)}},v=()=>i("close"),w=t=>{t.preventDefault(),t.stopPropagation(),v()};return h(()=>{g(),T()?u&&u.fillText("wake up...",20,30):y(),window.addEventListener("keydown",w,!0),window.addEventListener("resize",g)}),d(()=>{p&&cancelAnimationFrame(p),window.removeEventListener("keydown",w,!0),window.removeEventListener("resize",g)}),(t,e)=>(s(),a("div",{class:"terminal-matrix",onClick:v},[o("canvas",{ref_key:"canvasRef",ref:c,class:"terminal-matrix__canvas"},null,512),e[0]||(e[0]=o("span",{class:"terminal-matrix__hint"},"press any key to exit",-1))]))}},[["__scopeId","data-v-0d18a570"]]),Ts={class:"terminal-container"},ks={class:"terminal-header"},Is={class:"terminal-title"},Cs={class:"terminal-banner","aria-hidden":"true"},xs={class:"terminal-line"},Ds={key:0,class:"terminal-line"},As={class:"text-green","aria-hidden":"true"},Ps={key:1,class:"terminal-line current-line"},Ns={class:"input-container"},Ls={class:"input-mirror","aria-hidden":"true"},Ms={class:"custom-cursor"},Vs={class:"input-ghost"},Os={__name:"Terminal",setup(e){const u=new Date,d=[...V,`Last login: ${u.toDateString()} ${u.toLocaleTimeString()} on ttys000`].join("\n"),m=t(null),g=t(null),k=t(!1),{phosphor:I,themeNames:A,themeName:N,setTheme:L}=function(){const e=(()=>{try{const t=localStorage.getItem(P);return t&&x[t]?t:D}catch{return D}})(),n=t(e),r=t(x[e]),i=Object.keys(x);return{themeName:n,phosphor:r,themeNames:i,setTheme:t=>{const e=(t||"").trim().toLowerCase();if(!x[e])return!1;n.value=e,r.value=x[e];try{localStorage.setItem(P,e)}catch{}return!0}}}(),{trackCommand:M,trackVisit:O,getVisitStats:$,loadVisitData:R}=cs();let F=null;const{commands:U,availableFiles:z,executableScripts:H,terminalHistory:q,isExecutingScript:W,spinnerFrame:K,executeCommand:G,fsComplete:J}=j({getVisitStats:$,loadVisitData:R,setTheme:L,themeNames:A,getThemeName:()=>N.value,getHistory:()=>(null==F?void 0:F.value)??[],onMatrix:()=>{k.value=!0}}),{welcomeTextRef:Y,showInputPrompt:Z,initTypewriter:X,createCommandTypewriter:Q,typewriterSpeed:tt}=function(){const e=t(null),n=t(!1),i='Type <span class="text-yellow">help</span> for available commands or just type anything.',s={speed:0,startDelay:0,lifelike:!1};return{welcomeTextRef:e,showInputPrompt:n,initTypewriter:t=>{r(()=>{if(T())return e.value&&(e.value.innerHTML=i),n.value=!0,void r(t);e.value&&new wt(e.value,{strings:[i],...s,html:!0,cursorChar:"_",afterComplete:function(e){e.destroy(),n.value=!0,r(()=>{t()})}}).go()})},createCommandTypewriter:(t,e,n={})=>new Promise(i=>{r(()=>{if(t&&T())t.innerHTML=e,i();else if(t){const r={...s,html:!0,cursorChar:"_",afterComplete:function(t){t.destroy(),i()}};new wt(t,{...r,...n,strings:[e]}).go()}else i()})}),typewriterSpeed:s}}(),{currentInput:et,cursorPosition:nt,commandHistory:rt,suggestionTail:it,handleKeyDown:st,focusInput:at,updateCursorPosition:ot}=B({executeCommand:t=>{const e=t.trim();if(e){const t=e.split(" ")[0],n=U[t]||t.startsWith("./")||z.includes(t)||H[t];M(n?t:"invalid")}G(t)},commands:U,executableScripts:H,themeNames:A,fsComplete:J,onClear:()=>{q.value=[]},onInterrupt:t=>{q.value.push({type:"command",content:`${t}^C`})}});F=rt;const lt=i(()=>et.value.slice(0,nt.value)),ct=i(()=>et.value.slice(nt.value+1)),ut=i(()=>nt.value>=et.value.length),ht=i(()=>ut.value&&it.value?it.value.charAt(0):et.value.charAt(nt.value)||" "),dt=i(()=>ut.value&&it.value?it.value.slice(1):""),pt=()=>{k.value=!1,r(()=>at(g.value))},ft=()=>{r(()=>{m.value&&(m.value.scrollTop=m.value.scrollHeight)})},mt=new Map,gt=t(!1),yt=(t,e)=>{mt.set(t,e),r(_t)},vt=t=>{mt.delete(t)},bt=t=>("typewriter"===t.type||"output"===t.type)&&!t.image;async function _t(){if(gt.value)return;let t=null;for(let e=0;e<q.value.length;e++){const n=q.value[e];if(!bt(n)||n.animated)continue;const r=mt.get(e);if(!r)return;t={el:r,line:n};break}if(t){if(gt.value=!0,t.line.animated=!0,ft(),t.line.link){const e=(t.line.prefix||"")+t.line.linkText;await Q(t.el,e,tt),t.el.innerHTML=(t.line.prefix||"")+`<a href="${t.line.link}" target="_blank" class="terminal-link">${t.line.linkText}</a>`}else await Q(t.el,t.line.content,tt);gt.value=!1,r(_t)}else r(()=>at(g.value))}return n(q,()=>{r(()=>{_t(),ft()})},{deep:!0}),n(et,ft),h(()=>{O(),X(()=>{at(g.value),ft()})}),(t,e)=>(s(),a("div",Ts,[o("div",{class:"terminal-window","data-nosnippet":"",style:E({"--phosphor":c(I)})},[o("div",ks,[e[6]||(e[6]=o("div",{class:"terminal-buttons","aria-hidden":"true"},[o("div",{class:"btn red"}),o("div",{class:"btn yellow"}),o("div",{class:"btn green"})],-1)),o("div",Is,l(c(C)),1)]),o("div",{class:"terminal-body",ref_key:"terminalBody",ref:m,onClick:e[5]||(e[5]=t=>c(at)(g.value))},[o("div",Cs,l(c(d)),1),o("div",xs,[f(fs),o("span",{class:"welcome-text",ref_key:"welcomeTextRef",ref:Y,"data-nosnippet":""},null,512)]),(s(!0),a(p,null,y(c(q),(t,e)=>(s(),S(_s,{key:e,line:t,index:e,onRegister:yt,onUnregister:vt},null,8,["line","index"]))),128)),c(W)?(s(),a("div",Ds,[o("span",As,l(c(K)),1)])):v("",!0),!c(Z)||gt.value||c(W)?v("",!0):(s(),a("div",Ps,[f(fs),o("div",Ns,[o("div",Ls,[o("span",null,l(lt.value),1),o("span",Ms,l(ht.value),1),o("span",null,l(ct.value),1),o("span",Vs,l(dt.value),1)]),w(o("textarea",{ref_key:"terminalInput",ref:g,"onUpdate:modelValue":e[0]||(e[0]=t=>_(et)?et.value=t:null),onKeydown:e[1]||(e[1]=(...t)=>c(st)&&c(st)(...t)),onKeyup:e[2]||(e[2]=(...t)=>c(ot)&&c(ot)(...t)),onClick:e[3]||(e[3]=(...t)=>c(ot)&&c(ot)(...t)),onInput:e[4]||(e[4]=(...t)=>c(ot)&&c(ot)(...t)),class:"terminal-input",rows:"1",autocomplete:"off",spellcheck:"false","aria-label":"Terminal input"},null,544),[[b,c(et)]])])]))],512),k.value?(s(),S(Es,{key:0,color:c(I),onClose:pt},null,8,["color"])):v("",!0)],4)]))}};export{Os as default};
