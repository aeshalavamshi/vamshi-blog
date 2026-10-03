(function(){
  var d=document,root=d.documentElement;
  var $=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.remove('no-js');

  /* ---- Smooth scrolling (Lenis) ---- */
  var lenis=null;
  if(window.Lenis&&!reduce){
    lenis=new Lenis({duration:1.15,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},smoothWheel:true});
    (function raf(t){lenis.raf(t);requestAnimationFrame(raf)})(0);
  }
  function scrollToY(y){lenis?lenis.scrollTo(y,{duration:1.2}):scrollTo({top:y,behavior:reduce?'auto':'smooth'})}
  $$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){
    var id=a.getAttribute('href').slice(1),t=id&&d.getElementById(id);
    if(t){e.preventDefault();scrollToY(t.getBoundingClientRect().top+scrollY-100)}
  })});

  /* ---- Links to other sites open in a new tab ---- */
  $$('a[href]').forEach(function(a){
    var h=a.getAttribute('href');
    if(/^https?:\/\//i.test(h)&&a.hostname!==location.hostname){a.target='_blank';a.rel='noopener noreferrer'}
  });

  /* ---- Theme ---- */
  var tb=$('#theme');
  if(tb)tb.addEventListener('click',function(){
    var c=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    var n=c==='dark'?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}
  });

  /* ---- Toast, copy, share ---- */
  var toast=$('#toast');
  function say(m){if(!toast)return;toast.textContent=m;toast.classList.add('on');setTimeout(function(){toast.classList.remove('on')},1800)}
  $$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
    var u=b.getAttribute('data-copy')||location.href;
    if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){say('Link copied')},function(){say('Copy failed')})}else{say('Copy not supported')}
  })});
  $$('[data-share]').forEach(function(b){
    if(!navigator.share){b.hidden=true;return}
    b.addEventListener('click',function(){navigator.share({title:d.title,url:location.href}).catch(function(){})});
  });

  /* ---- Full-screen menu ---- */
  var menu=$('#menu'),openers=$$('[data-menu-open]'),closers=$$('[data-menu-close]'),lastFocus=null;
  function setMenu(o){
    if(!menu)return;menu.classList.toggle('open',o);menu.setAttribute('aria-hidden',!o);
    openers.forEach(function(b){b.setAttribute('aria-expanded',o)});
    if(lenis){o?lenis.stop():lenis.start()}else{d.body.style.overflow=o?'hidden':''}
    if(o){lastFocus=d.activeElement;setTimeout(function(){var c=$('[data-menu-close]',menu);c&&c.focus()},50)}else if(lastFocus){lastFocus.focus()}
  }
  openers.forEach(function(b){b.addEventListener('click',function(){setMenu(true)})});
  closers.forEach(function(b){b.addEventListener('click',function(){setMenu(false)})});
  if(menu)$$('a',menu).forEach(function(a){a.addEventListener('click',function(){if(a.getAttribute('href').charAt(0)==='#')setMenu(false)})});

  /* ---- Header hides on scroll down, returns on scroll up; progress; back-to-top ---- */
  var hdr=$('.site-header'),bar=$('#progress'),top=$('#top'),lastY=0;
  function onScroll(){
    var h=root,y=h.scrollTop||scrollY,max=h.scrollHeight-h.clientHeight;
    if(bar)bar.style.width=(max>0?y/max*100:0)+'%';
    if(top)top.classList.toggle('on',y>900);
    if(hdr){hdr.classList.toggle('hide',y>240&&y>lastY+4&&!(menu&&menu.classList.contains('open')));if(y<lastY-4||y<240)hdr.classList.remove('hide')}
    lastY=y;
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(top)top.addEventListener('click',function(){scrollToY(0)});

  /* ---- Esc closes menu / modal ---- */
  var modal=$('#fmodal');
  function setModal(o){if(!modal)return;modal.classList.toggle('open',o);modal.setAttribute('aria-hidden',!o);if(lenis){o?lenis.stop():lenis.start()}else{d.body.style.overflow=o?'hidden':''}}
  d.addEventListener('keydown',function(e){if(e.key==='Escape'){setMenu(false);setModal(false)}});

  /* ---- Table of contents ---- */
  var toc=$('#toc'),prose=$('.prose');
  if(toc&&prose){
    var hs=$$('h2',prose);
    if(hs.length>=3){
      var ol=d.createElement('ol');
      hs.forEach(function(h,i){
        if(!h.id)h.id='s'+(i+1);
        var li=d.createElement('li'),a=d.createElement('a');
        a.href='#'+h.id;a.textContent=h.textContent.replace(/\s+/g,' ').trim();
        a.addEventListener('click',function(e){e.preventDefault();scrollToY(h.getBoundingClientRect().top+scrollY-100)});
        li.appendChild(a);ol.appendChild(li);
      });
      toc.appendChild(ol);toc.hidden=false;
      var links=$$('a',ol);
      var io=new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting)links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)});
      })},{rootMargin:'-110px 0px -70% 0px'});
      hs.forEach(function(h){io.observe(h)});
    }
  }

  /* ---- Writing page: search, topic chips, tag + sort modal ---- */
  var grid=$('#posts');
  if(grid){
    var cards=$$('.card',grid),q=$('#q'),count=$('#count'),empty=$('#empty'),fcount=$('#fcount');
    var topic='all',tags={},sort='new';
    function apply(){
      var s=(q.value||'').trim().toLowerCase(),n=0,tk=Object.keys(tags).filter(function(k){return tags[k]});
      var vis=cards.slice().sort(function(a,b){return sort==='new'?b.dataset.date-a.dataset.date:a.dataset.date-b.dataset.date});
      vis.forEach(function(c){grid.appendChild(c)});
      cards.forEach(function(c){
        var ct=(c.dataset.tags||'').split('|');
        var ok=(topic==='all'||(c.dataset.cat||'')===topic)
          &&tk.every(function(t){return ct.indexOf(t)>-1})
          &&(!s||(c.dataset.text||'').indexOf(s)>-1);
        c.hidden=!ok;if(ok)n++;
      });
      count.textContent=n+(n===1?' essay':' essays');
      if(empty)empty.hidden=n>0;
      if(fcount)fcount.textContent=(tk.length+(sort==='old'?1:0))||'';
    }
    $$('[data-topic]').forEach(function(b){b.addEventListener('click',function(){
      topic=b.dataset.topic;$$('[data-topic]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
      try{history.replaceState(null,'',topic==='all'?location.pathname:'#'+topic)}catch(e){}apply();
    })});
    $$('[data-tag]').forEach(function(b){b.addEventListener('click',function(){
      var k=b.dataset.tag;tags[k]=!tags[k];b.setAttribute('aria-pressed',!!tags[k]);
    })});
    $$('[data-sort]').forEach(function(b){b.addEventListener('click',function(){
      sort=b.dataset.sort;$$('[data-sort]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    })});
    $$('[data-modal-open]').forEach(function(b){b.addEventListener('click',function(){setModal(true)})});
    $$('[data-modal-close]').forEach(function(b){b.addEventListener('click',function(){setModal(false)})});
    if(modal)modal.addEventListener('click',function(e){if(e.target===modal)setModal(false)});
    var upd=$('[data-update]');if(upd)upd.addEventListener('click',function(){apply();setModal(false)});
    var rst=$('[data-reset]');if(rst)rst.addEventListener('click',function(){
      tags={};sort='new';q.value='';
      $$('[data-tag]').forEach(function(x){x.setAttribute('aria-pressed','false')});
      $$('[data-sort]').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.sort==='new')});
      var all=$('[data-topic="all"]');if(all)all.click();else apply();
    });
    q.addEventListener('input',apply);
    var hh=decodeURIComponent(location.hash.slice(1));
    if(hh){var t=$('[data-topic="'+hh+'"]');if(t)t.click()}
    apply();
  }

  /* ---- Reveal on scroll ---- */
  if(!reduce&&'IntersectionObserver' in window){
    var sel='.card,.sec-head,.point,.dia,.link-card,.fold,.statement .wrap>*,.hello>*,.page-head>*,.post-hero>*,.box,.mdband .txt>*,.mdhero .txt>*,.credit,.bar2';
    var vh=innerHeight,io2=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target)}
    })},{rootMargin:'0px 0px -8% 0px',threshold:.05});
    $$(sel).forEach(function(el){
      if(el.getBoundingClientRect().top<vh*.92)return;
      var sib=Array.prototype.indexOf.call(el.parentNode.children,el);
      el.style.setProperty('--d',Math.min(sib%4,3)*.08+'s');
      el.classList.add('rv');io2.observe(el);
    });
  }
})();
