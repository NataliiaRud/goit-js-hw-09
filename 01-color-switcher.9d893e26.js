const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.querySelector("body");let d=null;e.setAttribute("disabled",!0),t.addEventListener("click",(function(){t.setAttribute("disabled",!0),e.removeAttribute("disabled"),d=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){e.setAttribute("disabled",!0),t.removeAttribute("disabled"),clearInterval(d)}));
//# sourceMappingURL=01-color-switcher.9d893e26.js.map
