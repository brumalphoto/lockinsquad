// Minimal interactive bits; feel free to expand.
document.addEventListener('DOMContentLoaded',function(){
  // small 'glitch' animation for the header text
  const g = document.querySelector('.glitch');
  if(!g) return;
  setInterval(()=> {
    const rand = Math.random();
    g.style.opacity = (0.9 + Math.sin(Date.now()/250)*0.1).toString();
    g.style.transform = `skew(${(rand-0.5)*2}deg) translateX(${(rand-0.5)*6}px)`;
  }, 2500);
});
