---
layout: default
title: Madhyastha Darshan
permalink: /madhyastha-darshan/
description: A plain-language introduction to Madhyastha Darshan (Coexistential Philosophy) by A. Nagraj, with key diagrams and links to read, watch and study.
image: /assets/img/madhyasth/cosmos-mind.webp
---
<div class="wrap">

<section class="md-hero">
  <div>
    <p class="eyebrow">The philosophy</p>
    <h1>Existence is coexistence.</h1>
    <p class="lede">Madhyastha Darshan is a philosophy of living in harmony with oneself, family, society and nature, presented by A. Nagraj (1920–2016).</p>
    <div class="btns">
      <a class="btn primary" href="https://app.madhyasth.org/read">{% include icon.html n='arrow' %} Read the books</a>
      <a class="btn" href="https://www.madhyasth.org/">Official website</a>
    </div>
  </div>
  <img src="{{ '/assets/img/madhyasth/cosmos-mind.webp' | relative_url }}" alt="Silhouette of a human head filled with a spiral galaxy">
</section>

<section class="sec" style="padding-top:8px">
  <div class="sec-head"><h2>In one minute</h2></div>
  <div class="three">
    <div class="point"><b>The idea</b><p>Material nature, conscious nature and space are in a constant relationship of <em>coexistence</em>. A human being is a conscious self (<em>jeevan</em>) together with a body.</p></div>
    <div class="point"><b>The problem</b><p>Personal strife, family conflict, social discord and ecological damage all grow from an incomplete understanding of who we are and how we relate to the world.</p></div>
    <div class="point"><b>The solution</b><p>Understanding, not belief. The philosophy asks to be studied and verified by reason and by living experience, one step at a time.</p></div>
  </div>
</section>

<section class="sec" style="padding-top:8px">
  <div class="sec-head"><h2>See it at a glance</h2></div>
  <div class="diagrams">
    <figure class="dia">
      <div class="frame">
        <svg viewBox="0 0 420 330" role="img" aria-label="Material nature and conscious nature coexist within space; the human being is jeevan plus body">
          <circle class="sp" cx="210" cy="165" r="150"/>
          <text x="210" y="40" text-anchor="middle" font-size="12" letter-spacing="2" class="sub">SPACE · THE ALL-PERVADING VOID</text>
          <line class="ln" x1="170" y1="150" x2="250" y2="150"/>
          <rect class="n1" x="40" y="115" width="130" height="70" rx="14" stroke-width="1.8"/>
          <text x="105" y="146" text-anchor="middle" font-size="16" font-weight="600">Material</text>
          <text x="105" y="167" text-anchor="middle" font-size="12" class="sub">nature · body</text>
          <rect class="n1" x="250" y="115" width="130" height="70" rx="14" stroke-width="1.8"/>
          <text x="315" y="146" text-anchor="middle" font-size="16" font-weight="600">Conscious</text>
          <text x="315" y="167" text-anchor="middle" font-size="12" class="sub">nature · jeevan</text>
          <rect class="n2" x="115" y="225" width="190" height="46" rx="23"/>
          <text x="210" y="253" text-anchor="middle" font-size="14" font-weight="600" class="n2t">Human = jeevan + body</text>
          <path class="ln" d="M105 185 Q105 248 115 248"/><path class="ln" d="M315 185 Q315 248 305 248"/>
        </svg>
      </div>
      <figcaption><b>Coexistence</b>Simplified schematic drawn for this blog. Not an official diagram.</figcaption>
    </figure>
    <figure class="dia">
      <div class="frame"><img src="{{ '/assets/img/madhyasth/tree-of-human-living.webp' | relative_url }}" alt="A tree whose branches are Reality and World, Mind and Consciousness, Values and Ethics, Life and Relationships, Education and Human Purpose, Happiness and Money, Society and Justice, Development and Ecology" loading="lazy"></div>
      <figcaption><b>One view of the whole of life</b>Diagram: madhyasth.org</figcaption>
    </figure>
    <figure class="dia">
      <div class="frame"><img src="{{ '/assets/img/madhyasth/practical-solutions.webp' | relative_url }}" alt="Personal Strife, Interpersonal Conflict, Societal Discord and Ecological Crisis around a central circle labelled Solution" loading="lazy"></div>
      <figcaption><b>Four problems, one solution</b>Diagram: madhyasth.org</figcaption>
    </figure>
  </div>
</section>

<section class="sec" style="padding-top:8px">
  <div class="sec-head"><h2>Read, watch, attend</h2></div>
  <div class="links">
    <a class="link-card" href="https://app.madhyasth.org/read"><span class="label">Read</span><b>Madhyasth Darshan Study App</b><span>The books, readable online.</span><em>Open the app →</em></a>
    <a class="link-card" href="https://www.youtube.com/channel/UCkg9tIpvZr6-A2RHyl5XcsQ"><span class="label">Watch</span><b>A. Nagaraj Originals</b><span>Talks and original recordings on YouTube.</span><em>Open the channel →</em></a>
    <a class="link-card" href="https://www.madhyasth.org/"><span class="label">Website</span><b>madhyasth.org</b><span>The official site: philosophy, books and community.</span><em>Visit the site →</em></a>
    <a class="link-card" href="https://www.madhyasth.org/jeevan-vidya-shivir-workshop"><span class="label">Attend</span><b>Jeevan Vidya workshop</b><span>The introductory workshop, with schedule and registration.</span><em>See the workshop →</em></a>
  </div>
</section>

{% assign mdposts = site.posts | where_exp: "p", "p.categories contains 'Madhyastha Darshan'" %}
<section class="sec" style="padding-top:8px">
  <div class="sec-head"><h2>My writing on Madhyastha Darshan</h2>{% if mdposts.size > 0 %}<a href="{{ '/writing/' | relative_url }}#madhyastha-darshan">See all →</a>{% endif %}</div>
  {% if mdposts.size > 0 %}
  <div class="grid">{% for post in mdposts %}{% include post-card.html post=post %}{% endfor %}</div>
  {% else %}
  <p style="color:var(--muted);max-width:40em">Essays applying Madhyastha Darshan to daily life will appear here. Tag a post with <code>categories: [Madhyastha Darshan]</code> and it shows up automatically.</p>
  {% endif %}
</section>

<section class="sec" style="padding-top:8px">
  <div class="sec-head"><h2>Go a little deeper</h2></div>
  <details class="fold"><summary>The literature: 12 books</summary><div class="inner">
    <p>The philosophy is set out in 12 books, written originally in Hindi. Four are the core <em>darshans</em>:</p>
    <ul><li><em>Manav Vyavahar Darshan</em>: human behaviour</li><li><em>Manav Karma Darshan</em>: human action</li><li><em>Manav Abhyas Darshan</em>: human practice</li><li><em>Manav Anubhav Darshan</em>: human realisation</li></ul>
  </div></details>
  <details class="fold"><summary>How it differs from materialism and spiritualism</summary><div class="inner">
    <p>It presents itself as an alternative to both. In place of conflict-centred materialism it proposes <em>resolution-centred</em> materialism. In place of mysticism-centred spiritualism it proposes <em>realisation-centred</em> spiritualism. It says it neither asks us to renounce the world nor to indulge in it.</p>
  </div></details>
  <details class="fold"><summary>About A. Nagraj</summary><div class="inner">
    <div class="person">
      <img src="{{ '/assets/img/madhyasth/background-scope-outcome.webp' | relative_url }}" alt="Black-and-white photograph of A. Nagraj" loading="lazy">
      <p>Shri A. Nagraj (1920–2016) was born in Hassan, Karnataka, and later lived in Amarkantak, Madhya Pradesh. After years of meditative research he presented Madhyastha Darshan, which he called a proposal for universal good, open for everyone to evaluate and verify. <small>Photo: madhyasth.org</small></p>
    </div>
  </div></details>
  <p class="credit">Summarised in my own words from <a href="https://www.madhyasth.org/">madhyasth.org</a>. Diagrams and photograph belong to their original publishers and are shown with credit. Please refer to the official site for authoritative material. Essays on this blog are my personal understanding.</p>
</section>

</div>
