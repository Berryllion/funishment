if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),d={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Pm9PZpHmB2BpzW8BqgMef/_buildManifest.js",revision:"c2f67f286d935eae422dadca1915f955"},{url:"/_next/static/Pm9PZpHmB2BpzW8BqgMef/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/873-b9987b5350d271bc.js",revision:"b9987b5350d271bc"},{url:"/_next/static/chunks/framework-3b5a00d5d7e8d93b.js",revision:"3b5a00d5d7e8d93b"},{url:"/_next/static/chunks/main-2e3cdc73395007d9.js",revision:"2e3cdc73395007d9"},{url:"/_next/static/chunks/pages/_app-13fb9e3bf42491c9.js",revision:"13fb9e3bf42491c9"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/content-warning-29ef7304ed81e3a8.js",revision:"29ef7304ed81e3a8"},{url:"/_next/static/chunks/pages/extensions-09da80dcddaa892a.js",revision:"09da80dcddaa892a"},{url:"/_next/static/chunks/pages/index-b1dd6c88e3939550.js",revision:"b1dd6c88e3939550"},{url:"/_next/static/chunks/pages/items-9f91e3bee5a8fdcb.js",revision:"9f91e3bee5a8fdcb"},{url:"/_next/static/chunks/pages/play-4dc8862ae9dbaf36.js",revision:"4dc8862ae9dbaf36"},{url:"/_next/static/chunks/pages/play/discard-2b4a0f70960566cf.js",revision:"2b4a0f70960566cf"},{url:"/_next/static/chunks/pages/play/new-rules-8de78e8b1209a900.js",revision:"8de78e8b1209a900"},{url:"/_next/static/chunks/pages/play/soft-limits-8e612c37ec996204.js",revision:"8e612c37ec996204"},{url:"/_next/static/chunks/pages/play/stock-dd0eb9168a08d6e2.js",revision:"dd0eb9168a08d6e2"},{url:"/_next/static/chunks/pages/players-9992254532898d1e.js",revision:"9992254532898d1e"},{url:"/_next/static/chunks/pages/safewords-acf297ebb1efddd8.js",revision:"acf297ebb1efddd8"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-36d12a75f0098f30.js",revision:"36d12a75f0098f30"},{url:"/_next/static/css/6203c81aa5b558a6.css",revision:"6203c81aa5b558a6"},{url:"/fonts/Lato-Bold.ttf",revision:"24b516c266d7341c954cb2918f1c8f38"},{url:"/fonts/Lato-Regular.ttf",revision:"122dd68d69fe9587e062d20d9ff5de2a"},{url:"/fonts/LifeSavers-Bold.ttf",revision:"1000e3246bd21eab3ac064b107e19ae6"},{url:"/fonts/LifeSavers-ExtraBold.ttf",revision:"97fe9329d49535cdceee3484a3fb642a"},{url:"/icon-192x192.png",revision:"2ad3b10a9bc92adb48a2f050392502d3"},{url:"/icon-256x256.png",revision:"27ade919ff9f92047c8681eab3ad7833"},{url:"/icon-384x384.png",revision:"5c75528d34c3876099e054ff89c54483"},{url:"/icon-512x512.png",revision:"6642c3e7da614d7ceda5319b8f0f58bd"},{url:"/images/bondage.png",revision:"f1e359040104f4af58fa8a897c7db96c"},{url:"/images/cards.png",revision:"7e6182eca6deeb8b7a80fa6f60d3f1d2"},{url:"/images/home.png",revision:"7720542f41b7c5eda818ac628c8da82b"},{url:"/images/impact.png",revision:"a95840d84685b0bba8cda6e4e8539be8"},{url:"/images/sex-toys.png",revision:"105b7502e092b2f7b84a4e25f8735338"},{url:"/images/stack.png",revision:"91b7584cb398b502fd7f2b447cce6d8a"},{url:"/images/time.png",revision:"451112a95fe5a888fd7c009261a158ed"},{url:"/manifest.json",revision:"8aada7718a19c289c9640184e0ec60a7"},{url:"/styles/Home.module.css",revision:"2c66432fcc000155da524f6de1b67272"},{url:"/styles/fonts.css",revision:"11b5b60ffd70e225429eef7a6efc6a8d"},{url:"/styles/globals.css",revision:"dff8d88551841c114f216bbda4869cea"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
