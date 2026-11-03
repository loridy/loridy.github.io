(function(){
  const root=document.documentElement;
  const toggle=document.querySelector(".theme-toggle");
  if(!toggle)return;
  function sync(){
    const light=root.dataset.theme==="light";
    toggle.setAttribute("aria-label",light?"Switch to night mode":"Switch to day mode");
    toggle.setAttribute("aria-pressed",String(light));
    const icon=toggle.querySelector(".theme-icon"); if(icon)icon.textContent=light?"☾":"☀";
    const label=toggle.querySelector(".theme-text"); if(label)label.textContent=light?"Night":"Day";
  }
  toggle.addEventListener("click",function(){
    const next=root.dataset.theme==="light"?"dark":"light";
    root.dataset.theme=next;
    try{localStorage.setItem("loridy-theme",next)}catch(e){}
    sync();
  });
  sync();
})();
