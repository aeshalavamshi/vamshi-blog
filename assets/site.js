(function(){
  var d=document, $=function(s,r){return (r||d).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};

  // Theme toggle
  var tb=$('#theme');
  if(tb)tb.addEventListener('click',function(){
    var r=d.documentElement,c=r.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    var n=c==='dark'?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}
  });

  // Toast
  var toast=$('#toast');
  function say(m){if(!toast)return;toast.textContent=m;toast.classList.add('on');setTimeout(function(){toast.classList.remove('on')},1800)}

  // Copy link / native share
  $$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
    var u=b.getAttribute('data-copy')||location.href;
    if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){say('Link copied')},function(){say('Copy failed')})}else{say('Copy not supported')}
  })});
  $$('[data-share]').forEach(function(b){
    if(!navigator.share){b.hidden=true;return}
    b.addEventListener('click',function(){navigator.share({title:d.title,url:location.href}).catch(function(){})});
  });

  // Reading progress + back to top
  var bar=$('#progress'),top=$('#top');
  function onScroll(){
    var h=d.documentElement,max=h.scrollHeight-h.clientHeight,y=h.scrollTop;
    if(bar)bar.style.width=(max>0?y/max*100:0)+'%';
    if(top)top.classList.toggle('on',y>700);
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(top)top.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});

  // Table of contents from h2s
  var toc=$('#toc'),prose=$('.prose');
  if(toc&&prose){
    var hs=$$('h2',prose);
    if(hs.length>=3){
      var ol=d.createElement('ol');
      hs.forEach(function(h,i){
        if(!h.id)h.id='s'+(i+1);
        var li=d.createElement('li'),a=d.createElement('a');
        a.href='#'+h.id;a.textContent=h.textContent.replace(/\s+/g,' ').trim();li.appendChild(a);ol.appendChild(li);
      });
      toc.appendChild(ol);toc.hidden=false;
      var links=$$('a',ol);
      var io=new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}
      })},{rootMargin:'-80px 0px -70% 0px'});
      hs.forEach(function(h){io.observe(h)});
    }
  }

  // Writing page: topic chips + tag chips + search
  var grid=$('#posts');
  if(grid){
    var cards=$$('.card',grid),q=$('#q'),count=$('#count'),empty=$('#empty'),topic='all',tag='';
    function apply(){
      var s=(q.value||'').trim().toLowerCase(),n=0;
      cards.forEach(function(c){
        var ok=(topic==='all'||(c.dataset.cat||'').split('|').indexOf(topic)>-1)
          &&(!tag||(c.dataset.tags||'').split('|').indexOf(tag)>-1)
          &&(!s||(c.dataset.text||'').indexOf(s)>-1);
        c.hidden=!ok;if(ok)n++;
      });
      count.textContent=n+(n===1?' essay':' essays');
      if(empty)empty.hidden=n>0;
    }
    $$('[data-topic]').forEach(function(b){b.addEventListener('click',function(){
      topic=b.dataset.topic;$$('[data-topic]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
      try{history.replaceState(null,'',topic==='all'?location.pathname:'#'+topic)}catch(e){}apply();
    })});
    $$('[data-tag]').forEach(function(b){b.addEventListener('click',function(){
      var on=b.getAttribute('aria-pressed')==='true';tag=on?'':b.dataset.tag;
      $$('[data-tag]').forEach(function(x){x.setAttribute('aria-pressed',x===b&&!on)});apply();
    })});
    q.addEventListener('input',apply);
    var h=decodeURIComponent(location.hash.slice(1));
    if(h){var t=$('[data-topic="'+h+'"]');if(t)t.click()}
    apply();
  }
})();
