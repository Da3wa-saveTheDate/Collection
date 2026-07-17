const fs = require('fs');

const file = 'public/new_prem4/js/index-CvER8GyV.js';
let content = fs.readFileSync(file, 'utf8');

const target1 =  = () => h.jsx("div", {
              className: "fixed pointer-events-none z-50",
              style: {
                  top: "50%",
                  left: "75%",
                  transform: "translate(-50%, -50%)"
              },
              children: h.jsxs("div", {
                  className: "relative flex items-center justify-center animate-[float_3s_ease-in-out_infinite]",
                  children: [h.jsx("div", {
                      className: "absolute w-72 h-72 rounded-full bg-white/60 blur-2xl"
                  }), h.jsx("img", {
                      src: M3,
                      alt: "",
                      className: "relative",
                      style: {
                          width: "840px"
                      }
                  })]
              })
          });
const targetMinified = content.match(/a=\(\)=>h\.jsx\("div",\{className:"fixed pointer-events-none z-50"[^\}]+\}\)/);

// I will just use regex to replace it
let replaced = content.replace(/a\s*=\s*\(\)\s*=>\s*h\.jsx\("div",\s*\{\s*className:\s*"fixed pointer-events-none z-50"[\s\S]*?width:\s*"840px"\s*\}\s*\)\s*\]\s*\}\)\s*\}\)\s*\}/, "a = () => null");

if (content !== replaced) {
    fs.writeFileSync(file, replaced);
    console.log("Successfully replaced in new_prem4");
} else {
    console.log("Failed to find the string to replace in new_prem4");
}
