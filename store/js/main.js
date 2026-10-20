/* Store logic: state, i18n, currency, router, views, cart, leads. */
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const ls = {
  get(k, d) {
    try {
      const v = JSON.parse(localStorage.getItem(k));
      return v ?? d;
    } catch {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
};
const S = {
  lang: ls.get("lang", "en"),
  cur: ls.get("cur", "PKR"),
  cart: ls.get("cart", []),
};
if (!I18N[S.lang]) S.lang = "en";
if (!CONFIG.currencies[S.cur]) S.cur = "PKR";
if (!Array.isArray(S.cart)) S.cart = [];
/* t(key, {placeholders}) with English fallback */
const t = (k, v) => {
  let s = I18N[S.lang][k] ?? I18N.en[k] ?? k;
  if (v) for (const x in v) s = s.split("{" + x + "}").join(v[x]);
  return s;
};
const nm = (p) => t("p_" + p.id),
  cat_ = (k) => t("cat_" + k),
  fb = (f) => t("fab_" + f.toLowerCase()),
  oc = (o) => t("occ_" + o.toLowerCase()),
  cl = (c) => t("col_" + c),
  szl = (s) => (s === "One size" ? t("oneSize") : s),
  cnt = (n) => n + " " + t(n === 1 ? "piece" : "pieces");
const money = (pkr) => {
  const v = pkr * CONFIG.currencies[S.cur];
  return new Intl.NumberFormat(S.lang === "en" ? "en" : S.lang + "-u-nu-latn", {
    style: "currency",
    currency: S.cur,
    maximumFractionDigits: S.cur === "KWD" ? 3 : 0,
  }).format(v);
};
const find = (id) => PRODUCTS.find((p) => p.id === id);
const toast = (m) => {
  const e = $("#toast");
  e.textContent = m;
  e.classList.add("on");
  setTimeout(() => e.classList.remove("on"), 2200);
};
const track = (ev, d = {}) => {
  if (ls.get("consent", false))
    (window.dataLayer = window.dataLayer || []).push({ event: ev, ...d });
};
const inEid = () => {
  const n = Date.now();
  return n >= Date.parse(CONFIG.eid.start) && n <= Date.parse(CONFIG.eid.end);
};
const waLink = (txt) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`;
const cartTotal = () =>
  S.cart.reduce((a, l) => a + find(l.id).price * l.qty, 0);
const leadForm = (type, fields, btn) =>
  `<form class="f" data-lead="${type}" novalidate>${fields.map(([n, l, ty]) => (ty === "area" ? `<label>${t(l)}<textarea name="${n}" required></textarea></label>` : `<label>${t(l)}<input name="${n}" type="${ty || "text"}" required></label>`)).join("")}<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn">${t(btn)}</button></form>`;

/* ---- components ---- */
const card = (p) =>
  `<article class="card"><div class="card__m"><a class="card__img" href="#/product/${p.id}"><img src="${p.img}" alt="${esc(nm(p))}" loading="lazy" width="832" height="1040"></a>${p.occ === "Eid" ? `<span class="badge">${t("eidEdit")}</span>` : ""}<button class="card__add" data-quick="${p.id}">${t("add")}</button></div><div class="card__b"><span class="card__c">${fb(p.fabric)}</span><h3><a href="#/product/${p.id}">${esc(nm(p))}</a></h3><span class="price">${money(p.price)}</span><div class="dots">${p.colors.map((c) => `<i style="background:${COLORS[c]}" title="${cl(c)}"></i>`).join("")}</div></div></article>`;
const SH = { base: [], fabric: "", sort: "" };
const plpList = () => {
  let l = SH.base.filter((p) => !SH.fabric || p.fabric === SH.fabric);
  if (SH.sort === "lh") l = [...l].sort((x, y) => x.price - y.price);
  if (SH.sort === "hl") l = [...l].sort((x, y) => y.price - x.price);
  return l;
};
const plpHtml = () => {
  const l = plpList();
  if (!l.length) return `<p>${t("noRes")}</p>`;
  return l
    .map(
      (p, i) =>
        (i === 4 && l.length > 5
          ? `<a class="promo" href="#/contact"><h3>${t("promoH")}</h3><p>${t("promoP")}</p><span class="link">${t("stylist")}</span></a>`
          : "") + card(p),
    )
    .join("");
};
const CK = { cc: "PK", method: "", promo: null };
const hs = (s) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0),
  rating = (p) => ({
    r: (4.5 + (hs(p.id) % 5) / 10).toFixed(1),
    n: 40 + (hs(p.id) % 160),
  });
const cname = (cc) => {
  try {
    return new Intl.DisplayNames([S.lang], { type: "region" }).of(cc);
  } catch {
    return cc;
  }
};
const dfmt = (n) =>
  new Intl.DateTimeFormat(S.lang + "-u-nu-latn", {
    day: "numeric",
    month: "short",
  }).format(new Date(Date.now() + n * 864e5));
const delRange = (cc) => {
  const d = CONFIG.countries[cc].days;
  return dfmt(d[0]) + " – " + dfmt(d[1]);
};
const zone = (cc) => CONFIG.countries[cc].zone;
const totals = () => {
  const sub = cartTotal(),
    d = CK.promo ? Math.round(sub * CONFIG.promos[CK.promo]) : 0,
    sh =
      S.cart.length && sub - d < CONFIG.freeOver[zone(CK.cc)]
        ? CONFIG.shipZone[zone(CK.cc)]
        : 0;
  return { sub, d, sh, tot: sub - d + sh };
};
const cOpts = () =>
  Object.keys(CONFIG.countries)
    .map(
      (cc) =>
        `<option value="${cc}" ${cc === CK.cc ? "selected" : ""}>${esc(cname(cc))}</option>`,
    )
    .join("");
const payExtra = (m) =>
  m.id === "jazzcash" || m.id === "easypaisa"
    ? `<div class="pm__x"><label>${t("mobAcc")}<input name="mobile" type="tel" required dir="ltr" placeholder="03XX XXXXXXX"></label></div>`
    : m.id === "bank"
      ? `<div class="pm__x"><dl class="bank"><dt>${t("bankName")}</dt><dd>${esc(CONFIG.bank.name)}</dd><dt>${t("bankTitle")}</dt><dd>${esc(CONFIG.bank.title)}</dd><dt>IBAN</dt><dd dir="ltr">${esc(CONFIG.bank.iban)}</dd></dl><label>${t("receipt")}<input name="receipt" type="file" accept="image/*,application/pdf"></label></div>`
      : m.id === "card"
        ? `<div class="pm__x"><p>${t("cardNote")}</p></div>`
        : "";
const payUI = () => {
  const ms = payMethodsFor(CK.cc);
  if (!ms.find((x) => x.id === CK.method)) CK.method = ms[0].id;
  return ms
    .map(
      (x) =>
        `<label class="pm ${x.id === CK.method ? "on" : ""}"><input type="radio" name="pay" value="${x.id}" ${x.id === CK.method ? "checked" : ""}><span class="pm__t"><b>${t("pm_" + x.id)}</b><small>${t("pmd_" + x.id)}</small></span></label>${x.id === CK.method ? payExtra(x) : ""}`,
    )
    .join("");
};
const sumUI = () => {
  const T = totals();
  return `<h3>${t("summary")}</h3>${S.cart
    .map((l) => {
      const p = find(l.id);
      return `<div class="sumr"><div class="sumr__i"><img src="${p.img}" alt=""><b>${l.qty}</b></div><div><span>${esc(nm(p))}</span><small>${cl(l.color)} · ${szl(l.size)}</small></div><span>${money(p.price * l.qty)}</span></div>`;
    })
    .join(
      "",
    )}<div class="promoin"><input id="promoIn" placeholder="${t("promoCode")}" value="${esc(CK.promo || "")}" dir="ltr" aria-label="${t("promoCode")}"><button type="button" class="btn btn--ghost" data-promo>${t("apply")}</button></div><p id="promoMsg" class="note" role="status"></p><dl class="tot"><dt>${t("subtotal")}</dt><dd>${money(T.sub)}</dd>${T.d ? `<dt>${t("discount")}</dt><dd>−${money(T.d)}</dd>` : ""}<dt>${t("shipping")}</dt><dd>${T.sh ? money(T.sh) : t("free")}</dd><dt class="g">${t("total")}</dt><dd class="g">${money(T.tot)}</dd></dl>${S.cur !== "PKR" ? `<p class="note">${t("approxNote", { c: S.cur })}</p>` : ""}`;
};
const refreshCk = () => {
  if ($("#payBox")) $("#payBox").innerHTML = payUI();
  if ($("#sumBox")) $("#sumBox").innerHTML = sumUI();
  if ($("#btnTot")) $("#btnTot").textContent = money(totals().tot);
};
const waOrder = (o) =>
  waLink(
    `Order ${o.id}\n` +
      o.items
        .map((l) => `${l.name} (${l.color}, ${l.size}) x${l.qty}`)
        .join("\n") +
      `\nTotal: PKR ${o.totals.tot}\nPayment: ${o.method}\n${o.customer.name}, ${o.customer.city}`,
  );
const FAB = [
  ["nida", "black-nida-abaya", "sn_all"],
  ["crepe", "taupe-open-abaya", "sn_sa"],
  ["chiffon", "chiffon-hijab-sand", "sn_su"],
  ["linen", "linen-white-abaya", "sn_su"],
];

/* ---- views ---- */
const V = {
  home: () => {
    const cn = (k) => PRODUCTS.filter((p) => p.cat === k).length;
    return `
 <section class="hero"><img src="images/hero-1.webp" alt="" fetchpriority="high"><div class="wrap hero__w"><div class="hero__t"><span class="tag">${t("newSeason")}</span><h1>${t("hero")}</h1><p>${t("heroP")}</p><div class="row"><a class="btn" href="#/shop">${t("cta")}</a><a class="btn btn--ghost" href="#/contact">${t("stylist")}</a></div></div>
 <a class="hero__card" href="#/product/black-nida-abaya"><img src="images/black-nida-abaya.webp" alt="" width="120" height="150"><div><small>${t("featured")}</small><b>${esc(t("p_black-nida-abaya"))}</b><span>${money(14500)}</span></div></a></div>
 <div class="hero__bar"><div class="wrap"><span>${t("bar1")}</span><span>${t("bar2")}</span><span>${t("bar3")}</span><span>${t("bar4")}</span></div></div></section>
 <section><div class="wrap"><div class="sh"><h2>${t("cats")}</h2><a class="link" href="#/shop">${t("all")}</a></div><div class="mosaic">${[
   ["abayas", "a", "50% 12%"],
   ["hijabs", "b", "50% 20%"],
   ["coats", "c", "50% 15%"],
   ["sets", "d", "50% 15%"],
   ["prayer", "e", "50% 25%"],
   ["accessories", "f", "50% 30%"],
 ]
   .map(
     ([k, ar, pos]) =>
       `<a class="mo mo--${ar}" href="#/shop/${k}"><img src="${PRODUCTS.find((p) => p.cat === k).img}" alt="" loading="lazy" style="object-position:${pos}"><span class="mo__n">${cnt(cn(k))}</span><span class="mo__t">${cat_(k)}</span><span class="mo__go" aria-hidden="true">&#8594;</span></a>`,
   )
   .join("")}</div></div></section>
 <section class="feature"><img src="images/lookbook.webp" alt="" loading="lazy"><div class="feature__t"><h2>${t("featH")}</h2><p>${t("featP")}</p><a class="btn" href="#/product/black-nida-abaya">${t("shop")} — ${money(14500)}</a></div></section>
 <section class="bsx"><div class="wrap"><div class="sh"><h2>${t("best")}</h2><a class="link" href="#/shop">${t("all")}</a></div><div class="bs"><div class="bs__img">${PRODUCTS.slice(
   0,
   6,
 )
   .map(
     (p, i) =>
       `<img class="${i ? "" : "on"}" data-i="${i}" src="${p.img}" alt="${esc(nm(p))}" loading="lazy">`,
   )
   .join("")}</div><div class="bs__list">${PRODUCTS.slice(0, 6)
   .map(
     (p, i) =>
       `<div class="bs__row ${i ? "" : "on"}" data-bs="${i}"><span class="n">0${i + 1}</span><img class="th" src="${p.img}" alt="" width="72" height="90" loading="lazy"><a class="bs__name" href="#/product/${p.id}">${esc(nm(p))}<small>${fb(p.fabric)}<span class="pm"> · ${money(p.price)}</span></small></a><span class="price">${money(p.price)}</span><button data-quick="${p.id}" aria-label="${t("add")}">+</button></div>`,
   )
   .join("")}</div></div></div></section>
 <section class="band"><img src="images/eid.webp" alt="" loading="lazy"><div class="band__t"><h2>${t("eidH")}</h2><p>${t("eidP")}</p><a class="btn" href="#/shop/o-eid">${t("cta")}</a></div></section>
 <section class="fabx"><div class="wrap"><div class="sh"><h2>${t("fabH")}</h2><p class="sh__p">${t("fabP")}</p></div><div class="fpanels">${FAB.map((f, i) => `<article class="fp ${i ? "" : "on"}" tabindex="0"><img src="images/${f[1]}.webp" alt="" loading="lazy"><span class="fp__v">${t("fab_" + f[0])}</span><div class="fp__c"><small>${t(f[2])}</small><h3>${t("fab_" + f[0])}</h3><p>${t("ff_" + f[0])}</p><p>${t("fc_" + f[0])}</p><a class="link" href="#/shop/f-${f[0]}">${t("shopF", { f: t("fab_" + f[0]) })}</a></div></article>`).join("")}</div></div></section>
 <section class="duo"><img src="images/stylist.webp" alt="" loading="lazy"><div class="duo__t"><h2>${t("stylist")}</h2>${leadForm(
   "consultation",
   [
     ["name", "name"],
     ["phone", "phone", "tel"],
     ["city", "city"],
   ],
   "send",
 )}</div></section>`;
  },
  shop: (a) => {
    a = a || "";
    const cn = (k) => PRODUCTS.filter((p) => p.cat === k).length;
    let l = PRODUCTS,
      ti = t("all"),
      ds = t("allDesc");
    if (CATS[a]) {
      l = l.filter((p) => p.cat === a);
      ti = cat_(a);
      ds = t("cd_" + a);
    } else if (a.startsWith("f-")) {
      l = l.filter((p) => p.fabric.toLowerCase() === a.slice(2));
      ti = t("fab_" + a.slice(2));
      ds = t("fabDesc", { f: ti });
    } else if (a.startsWith("o-")) {
      l = l.filter((p) => p.occ.toLowerCase() === a.slice(2));
      ti = t("occ_" + a.slice(2));
      ds = t("occDesc", { o: ti });
    }
    SH.base = l;
    SH.fabric = "";
    SH.sort = "";
    const img = a ? (l[0] || PRODUCTS[0]).img : "images/lookbook.webp";
    return `<section class="shopx"><div class="shop__hd"><div class="wrap shop__hdin"><div><nav class="crumb" aria-label="Breadcrumb"><a href="#/">${t("home")}</a><span>/</span><a href="#/shop">${t("shop")}</a>${a ? `<span>/</span><b>${esc(ti)}</b>` : ""}</nav><h1>${esc(ti)}</h1><p>${esc(ds)}</p></div><div class="shop__img"><img src="${img}" alt="" width="640" height="800"></div></div></div>
  <div class="wrap"><nav class="tabs" aria-label="${t("catsH")}"><a class="${a ? "" : "on"}" href="#/shop">${t("all")}<sup>${PRODUCTS.length}</sup></a>${Object.keys(
    CATS,
  )
    .map(
      (k) =>
        `<a class="${a === k ? "on" : ""}" href="#/shop/${k}">${cat_(k)}<sup>${cn(k)}</sup></a>`,
    )
    .join("")}</nav>
  <div class="bar"><span id="plpn">${cnt(l.length)}</span><div class="bar__r"><label>${t("fabric")}<select class="js-fabric"><option value="">${t("allO")}</option>${[...new Set(l.map((p) => p.fabric))].map((f) => `<option value="${f}">${fb(f)}</option>`).join("")}</select></label><label>${t("sortL")}<select class="js-sort"><option value="">${t("featuredO")}</option><option value="lh">${t("lh")}</option><option value="hl">${t("hl")}</option></select></label></div></div>
  <div class="pgrid" id="plp">${plpHtml()}</div></div></section>`;
  },
  product: (id) => {
    const p = find(id);
    if (!p) return V.nf();
    track("view_item", { id });
    const R = rating(p),
      rel = [
        ...PRODUCTS.filter((x) => x.id !== p.id && x.cat === p.cat),
        ...PRODUCTS.filter((x) => x.cat !== p.cat),
      ].slice(0, 4);
    return `<div data-pid="${p.id}"><div class="wrap"><nav class="crumb pcrumb" aria-label="Breadcrumb"><a href="#/">${t("home")}</a><span>/</span><a href="#/shop">${t("shop")}</a><span>/</span><a href="#/shop/${p.cat}">${cat_(p.cat)}</a><span>/</span><b>${esc(nm(p))}</b></nav></div>
 <div class="wrap pdp"><div class="pimg"><img src="${p.img}" alt="${esc(nm(p))}" width="800" height="1000" fetchpriority="high">${p.occ === "Eid" ? `<span class="badge">${t("eidEdit")}</span>` : ""}</div><div class="pinfo"><span class="card__c">${fb(p.fabric)}</span><h1>${esc(nm(p))}</h1><div class="rate"><span class="stars" aria-hidden="true">★★★★★</span><span>${R.r} · ${t("reviewsN", { n: R.n })}</span></div><p class="price pprice">${money(p.price)}</p><p>${t("descT", { n: nm(p), f: fb(p.fabric) })}</p>
 <p class="lbl">${t("color")}</p><div class="chips" data-group="color">${p.colors.map((c, i) => `<button class="chip sw" data-v="${c}" aria-label="${cl(c)}" title="${cl(c)}" aria-pressed="${!i}" style="background:${COLORS[c]}"></button>`).join("")}</div>
 <p class="lbl">${t("size")} <a class="link" href="#/size-guide">${t("sizeH")}</a></p><div class="chips" data-group="size">${p.sizes.map((s, i) => `<button class="chip" data-v="${s}" aria-pressed="${!i}">${szl(s)}</button>`).join("")}</div>
 <p class="lbl">${t("qty")}</p><div class="qty"><button type="button" data-q="-1" aria-label="−">−</button><span data-qv>1</span><button type="button" data-q="1" aria-label="+">+</button></div>
 <div class="row pbtn"><button class="btn" data-add>${t("add")}</button><button class="btn btn--ghost" data-buy>${t("buyNow")}</button></div><a class="link ask" target="_blank" rel="noopener" href="${waLink(`Hi, I'd like help with: ${p.name}\n${location.href}`)}">${t("ask")}</a>
 <div class="deliv"><label>${t("delTo")}<select class="js-del">${cOpts()}</select></label><p><b>${t("delEst")}:</b> <span id="delRes">${delRange(CK.cc)}</span></p></div>
 <ul class="trust"><li>${t("trust1")}</li><li>${t("trust2")}</li><li>${t("trust3")}</li><li>${t("bar2")} (${cname("PK")})</li></ul>
 <div class="acc"><details open><summary>${t("detH")}</summary><p>${t("detP")}</p></details><details><summary>${t("careH")}</summary><p>${t("ff_" + p.fabric.toLowerCase())}</p><p>${t("fc_" + p.fabric.toLowerCase())}</p></details><details><summary>${t("sizeH")}</summary><table class="tbl"><tr><th>${t("size")}</th><th>${t("thLen")}</th><th>${t("thBust")}</th></tr>${[
   [52, 52, 38],
   [54, 54, 40],
   [56, 56, 42],
   [58, 58, 44],
 ]
   .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
   .join(
     "",
   )}</table></details><details><summary>${t("shipH")}</summary><p>${t("shipP1", { a: money(CONFIG.freeOver.PK), b: money(CONFIG.shipZone.PK) })}</p><p>${t("shipP2")}</p></details></div></div></div>
 <section class="revs"><div class="wrap"><h2>${t("reviewsH")}</h2><div class="revg">${[
   ["Ayesha K.", "r1", "fitTrue", "168 cm"],
   ["Sara M.", "r2", "fitTrue", "162 cm"],
   ["Maryam A.", "r3", "fitSmall", "172 cm"],
 ]
   .map(
     (r) =>
       `<div class="rev"><span class="stars" aria-hidden="true">★★★★★</span><p>${t(r[1])}</p><small><b>${r[0]}</b> · ${t("verified")}<br>${t("fitL")}: ${t(r[2])} · ${r[3]}</small></div>`,
   )
   .join("")}</div></div></section>
 <section class="tint"><div class="wrap"><div class="sh"><h2>${t("likeH")}</h2></div><div class="pgrid">${rel.map(card).join("")}</div></div></section>
 <div class="sticky"><div><b>${esc(nm(p))}</b><span class="price">${money(p.price)}</span></div><button class="btn" data-add>${t("add")}</button></div></div>`;
  },
  cart: () => {
    if (!S.cart.length)
      return `<section><div class="wrap"><h2>${t("bag")}</h2><p>${t("empty")}</p><br><a class="btn" href="#/shop">${t("continue")}</a></div></section>`;
    const T = totals();
    return `<section><div class="wrap narrow"><h2>${t("bag")}</h2>${S.cart
      .map((l, i) => {
        const p = find(l.id);
        return `<div class="line"><img src="${p.img}" alt=""><div><h3>${esc(nm(p))}</h3><small>${cl(l.color)} · ${szl(l.size)}</small><div class="qty qty--s"><button data-ql="${i}" data-d="-1" aria-label="−">−</button><span>${l.qty}</span><button data-ql="${i}" data-d="1" aria-label="+">+</button></div></div><span>${money(p.price * l.qty)}</span><button class="chip" data-rm="${i}" aria-label="${t("remove")}">×</button></div>`;
      })
      .join("")}
  <dl class="tot"><dt>${t("subtotal")}</dt><dd>${money(T.sub)}</dd><dt>${t("shipping")}</dt><dd>${T.sh ? money(T.sh) : t("free")}</dd><dt class="g">${t("total")}</dt><dd class="g">${money(T.tot)}</dd></dl><p class="note">${t("ship")} ${money(CONFIG.freeOver.PK)}</p><br><div class="row"><a class="btn" href="#/checkout">${t("checkoutH")}</a><a class="btn btn--ghost" href="#/shop">${t("continue")}</a></div></div></section>`;
  },
  checkout: () => {
    if (!S.cart.length) return V.cart();
    return `<section class="pagehd slim"><div class="wrap"><h1>${t("checkoutH")}</h1></div></section><section class="cko"><div class="wrap ckogrid"><form id="chk" class="ckof" novalidate>
 <fieldset><legend>${t("ckContact")}</legend><div class="g2"><label>${t("name")}<input name="name" required autocomplete="name"></label><label>${t("email")}<input name="email" type="email" required autocomplete="email" dir="ltr"></label></div><label>${t("phone")}<input name="phone" type="tel" required autocomplete="tel" dir="ltr" placeholder="+92 300 1234567"></label></fieldset>
 <fieldset><legend>${t("ckShip")}</legend><label>${t("country")}<select name="country" id="country">${cOpts()}</select></label><label>${t("addr")}<input name="address" required autocomplete="street-address"></label><div class="g2"><label>${t("city")}<input name="city" required autocomplete="address-level2"></label><label>${t("postal")}<input name="postal" autocomplete="postal-code" dir="ltr"></label></div></fieldset>
 <fieldset><legend>${t("payMethod")}</legend><div id="payBox">${payUI()}</div></fieldset><input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
 <button class="btn btn--lg" id="placeBtn">${t("order")} — <span id="btnTot">${money(totals().tot)}</span></button><p class="note">${t("secureNote")}</p></form><aside class="ckosum" id="sumBox">${sumUI()}</aside></div></section>`;
  },
  order: (id) => {
    const o = ls.get("orders", []).find((x) => x.id === id);
    if (!o) return V.nf();
    return `<section class="pagehd slim"><div class="wrap"><h1>${t("thanksH")}</h1><p>${t("orderNo")}: <b dir="ltr">${esc(o.id)}</b></p></div></section><section><div class="wrap narrow"><p class="stmsg">${t("st_" + o.status)}</p>${o.items.map((l) => `<div class="line"><img src="${find(l.id).img}" alt=""><div><h3>${esc(nm(find(l.id)))}</h3><small>${cl(l.color)} · ${szl(l.size)} · × ${l.qty}</small></div><span>${money(l.price * l.qty)}</span></div>`).join("")}<dl class="tot"><dt>${t("pm_" + o.method)}</dt><dd></dd><dt class="g">${t("total")}</dt><dd class="g">${money(o.totals.tot)}</dd></dl><br><div class="row"><a class="btn" target="_blank" rel="noopener" href="${waOrder(o)}">${t("sendWa")}</a><a class="btn btn--ghost" href="#/shop">${t("continue")}</a></div></div></section>`;
  },
  orders: () => {
    const l = ls.get("orders", []);
    return `<section><div class="wrap narrow"><h2>${t("ordersH")}</h2>${l.length ? l.map((o) => `<a class="line" href="#/order/${o.id}"><div><h3 dir="ltr">${esc(o.id)}</h3><small>${new Date(o.ts).toLocaleDateString(S.lang + "-u-nu-latn")} · ${t("pm_" + o.method)}</small></div><span>${money(o.totals.tot)}</span></a>`).join("") : `<p>${t("noOrders")}</p>`}</div></section>`;
  },
  contact:
    () => `<section class="pagehd"><div class="wrap"><h1>${t("contactH")}</h1><p>${t("contactP")}</p></div></section>
 <section class="cpage"><div class="wrap cwrap"><div class="cinfo">${[
   [t("chatWa"), "WhatsApp", waLink("Hello " + CONFIG.brand)],
   [t("callUs"), CONFIG.phone, "tel:" + CONFIG.phone.replace(/\s/g, "")],
   [t("hours"), t("hoursV"), ""],
   [t("studio"), t("studioV"), ""],
 ]
   .map(
     (r) =>
       `<div class="cinfo__r"><small>${esc(r[0])}</small>${r[2] ? `<a href="${esc(r[2])}" target="_blank" rel="noopener" dir="ltr">${esc(r[1])}</a>` : `<span>${esc(r[1])}</span>`}</div>`,
   )
   .join("")}</div><div class="cform"><h2>${t("writeUs")}</h2>${leadForm(
   "contact",
   [
     ["name", "name"],
     ["email", "email", "email"],
     ["message", "msg", "area"],
   ],
   "send",
 )}</div></div></section>`,
  about:
    () => `<section class="ab"><div class="wrap ab__in"><div><h1>${t("aboutH")}</h1><p>${t("aboutP1")}</p><p>${t("aboutP2")}</p><a class="btn" href="#/shop">${t("aboutCta")}</a></div><div class="ab__img"><img src="images/lookbook.webp" alt="" loading="lazy"></div></div></section>
 <section class="vals"><div class="wrap vals__in">${[1, 2, 3].map((i) => `<div><span class="n">0${i}</span><h3>${t("v" + i + "h")}</h3><p>${t("v" + i + "p")}</p></div>`).join("")}</div></section>
 <section class="band"><img src="images/work.webp" alt="" loading="lazy"><div class="band__t"><h2>${t("stylist")}</h2><p>${t("contactP")}</p><a class="btn" href="#/contact">${t("contact")}</a></div></section>`,
  faq: () =>
    `<section><div class="wrap narrow"><h2>${t("faq")}</h2>${[0, 1, 2, 3].map((i) => `<details><summary>${t("q" + i)}</summary><p>${t("a" + i)}</p></details>`).join("")}</div></section>`,
  "shipping-returns": () =>
    `<section><div class="wrap narrow"><h2>${t("shipH")}</h2><p>${t("shipP1", { a: money(CONFIG.freeShipOver), b: money(CONFIG.shipFlat) })}</p><p>${t("shipP2")}</p></div></section>`,
  "size-guide": () =>
    `<section><div class="wrap narrow"><h2>${t("sizeH")}</h2><table class="tbl"><tr><th>${t("size")}</th><th>${t("thLen")}</th><th>${t("thBust")}</th></tr>${[
      [52, 52, 38],
      [54, 54, 40],
      [56, 56, 42],
      [58, 58, 44],
    ]
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
      .join("")}</table><p>${t("sizeNote")}</p></div></section>`,
  nf: () =>
    `<section><div class="wrap"><h2>${t("notFound")}</h2><a class="btn" href="#/">${t("home")}</a></div></section>`,
};
function route() {
  const [, r, a] = (location.hash.slice(1) || "/").split("/");
  const v = !r
    ? V.home()
    : r === "shop"
      ? V.shop(a)
      : r === "product"
        ? V.product(a)
        : V[r] && r !== "nf" && r !== "home"
          ? V[r](a)
          : V.nf();
  document.body.classList.remove("menu-open");
  $("#sbar").hidden = true;
  $("#app").innerHTML = v;
  scrollTo(0, 0);
  $("#app").focus({ preventScroll: true });
  document.querySelectorAll("#ld").forEach((x) => x.remove());
  if (r === "product" && find(a)) {
    const p = find(a),
      R = rating(p),
      s = document.createElement("script");
    s.id = "ld";
    s.type = "application/ld+json";
    s.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      image: location.origin + location.pathname.replace(/[^/]*$/, "") + p.img,
      description: p.desc,
      offers: {
        "@type": "Offer",
        priceCurrency: "PKR",
        price: p.price,
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: R.r,
        reviewCount: R.n,
      },
    });
    document.head.appendChild(s);
  }
  document.title = `${CONFIG.brand} — ${r ? (t(r) !== r ? t(r) : r) : t("shop")}`;
}

/* ---- chrome (header, menus, footer) ---- */
function chrome() {
  const h = document.documentElement;
  h.lang = S.lang;
  h.dir = S.lang === "en" ? "ltr" : "rtl";
  const cats = Object.keys(CATS),
    fabs = ["nida", "crepe", "chiffon", "linen", "satin", "jersey"],
    occ = ["everyday", "work", "eid", "prayer"];
  const A = (href, x) => `<a href="${href}">${x}</a>`,
    opt = (a, v) =>
      a
        .map((x) => `<option ${x === v ? "selected" : ""}>${x}</option>`)
        .join("");
  const fl = fabs.map((f) => A("#/shop/f-" + f, t("fab_" + f))).join(""),
    cl_ = cats.map((k) => A("#/shop/" + k, cat_(k))).join("");
  $(".skip").textContent = t("skip");
  $("#q").placeholder = t("searchPh");
  $("#cartCount").parentNode.setAttribute("aria-label", t("bag"));
  $(".hdr__cart").firstChild.nodeValue = t("bag") + " ";
  $("#nav").innerHTML =
    `<div class="nav__i has-mega">${A("#/shop", t("shop"))}<div class="mega"><div class="wrap mega__in"><div><h4>${t("catsH")}</h4>${cl_}</div><div><h4>${t("fabric")}</h4>${fl}</div><div><h4>${t("occasion")}</h4>${occ.map((o) => A("#/shop/o-" + o, t("occ_" + o))).join("")}</div><a class="mega__img" href="#/shop/o-eid"><img src="images/eid.webp" alt="" loading="lazy"><span>${t("eidEdit")}</span></a></div></div></div>${cats
      .slice(0, 3)
      .map((k) => `<div class="nav__i">${A("#/shop/" + k, cat_(k))}</div>`)
      .join(
        "",
      )}<div class="nav__i">${A("#/about", t("about"))}</div><div class="nav__i">${A("#/contact", t("contact"))}</div>`;
  $("#mnav").innerHTML =
    `<details open><summary>${t("shop")}</summary>${cl_}</details><details><summary>${t("fabric")}</summary>${fl}</details>${A("#/about", t("about"))}${A("#/contact", t("contact"))}${A("#/faq", t("faq"))}<div class="mnav__t"><select class="js-lang" aria-label="Language"><option value="en">English</option><option value="ar">العربية</option><option value="ur">اردو</option></select><select class="js-cur" aria-label="Currency"></select></div>`;
  document
    .querySelectorAll(".js-cur")
    .forEach((s) => (s.innerHTML = opt(Object.keys(CONFIG.currencies), S.cur)));
  document.querySelectorAll(".js-lang").forEach((s) => (s.value = S.lang));
  $("#announce").innerHTML = inEid()
    ? t("eidSoon")
    : `${t("ship")} <bdi>${money(CONFIG.freeShipOver)}</bdi>`;
  $("#cartCount").textContent = S.cart.reduce((a, l) => a + l.qty, 0);
  $("#wa").href = waLink(t("waHi", { b: CONFIG.brand }));
  const so = CONFIG.social,
    svg = (p) =>
      `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ic = {
    instagram: svg(
      '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
    ),
    facebook: svg(
      '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
    ),
    tiktok: svg(
      '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.5 2 4 4.5 4.2"/>',
    ),
    youtube: svg(
      '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>',
    ),
    whatsapp: svg(
      '<path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.6L3 21z"/><path d="M9 8.5c.5 3 2.5 5 6 6.5l1.2-1.4-2-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-2z"/>',
    ),
  };
  const soc = Object.keys(ic)
    .map(
      (k) =>
        `<a href="${k === "whatsapp" ? waLink("Hello") : so[k]}" target="_blank" rel="noopener" aria-label="${k}">${ic[k]}</a>`,
    )
    .join("");
  $("#ftr").innerHTML =
    `<div class="news"><div class="wrap news__in"><div><h2>${t("newsH", { b: esc(CONFIG.brand) })}</h2><p>${t("newsP")}</p></div>${leadForm("newsletter", [["email", "email", "email"]], "send")}</div></div>
 <div class="wrap fcols"><div class="fbrand"><span class="logo" dir="ltr"><img src="images/logo.png" alt="${esc(CONFIG.brand)}" width="1536" height="1024" loading="lazy"></span><p>${t("brandP")}</p><div class="soc">${soc}</div></div>
 <div><h4>${t("shop")}</h4>${cats
   .slice(0, 5)
   .map((k) => A("#/shop/" + k, cat_(k)))
   .join(
     "",
   )}</div><div><h4>${t("help")}</h4>${A("#/faq", t("faq"))}${A("#/shipping-returns", t("shipH"))}${A("#/size-guide", t("sizeH"))}${A("#/contact", t("contact"))}${A("#/orders", t("ordersH"))}</div><div><h4>${t("company")}</h4>${A("#/about", t("about"))}${A("#/shop/o-eid", t("eidEdit"))}${A("#/contact", t("stylist"))}<a href="tel:${esc(CONFIG.phone.replace(/\s/g, ""))}" dir="ltr">${esc(CONFIG.phone)}</a></div></div>
 <div class="wrap fbar"><span>&copy; ${new Date().getFullYear()} ${esc(CONFIG.brand)}</span><span>${t("payLine")}</span></div>`;
}

/* ---- leads: email lives only in CONFIG ---- */
async function sendLead(type, data) {
  if (data.website) return true;
  if (Date.now() - ls.get("sentTs", 0) < 5000) return false;
  ls.set("sentTs", Date.now());
  const log = ls.get("leads", []);
  log.push({ type, ...data, ts: Date.now() });
  ls.set("leads", log.slice(-30));
  try {
    await fetch("https://formsubmit.co/ajax/" + CONFIG.leadEmail, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _captcha: "false",
        _template: "table",
        _subject: "New " + type,
        type,
        ...data,
      }),
    });
  } catch {}
  track("generate_lead", { type });
  return true;
}

/* ---- events (delegated) ---- */
const addLine = (id, color, size, q = 1) => {
  const ex = S.cart.find(
    (l) => l.id === id && l.color === color && l.size === size,
  );
  ex ? (ex.qty += q) : S.cart.push({ id, color, size, qty: q });
  ls.set("cart", S.cart);
  chrome();
  toast(t("added"));
  track("add_to_cart", { id });
};
document.addEventListener("click", (e) => {
  const g = e.target.closest("[data-group] .chip");
  if (g) {
    g.parentNode
      .querySelectorAll(".chip")
      .forEach((c) => c.setAttribute("aria-pressed", c === g));
    return;
  }
  const qb = e.target.closest("[data-q]");
  if (qb) {
    const sp = qb.parentNode.querySelector("[data-qv]");
    sp.textContent = Math.min(10, Math.max(1, +sp.textContent + +qb.dataset.q));
    return;
  }
  const ql = e.target.closest("[data-ql]");
  if (ql) {
    const l = S.cart[+ql.dataset.ql];
    l.qty += +ql.dataset.d;
    if (l.qty < 1) S.cart.splice(+ql.dataset.ql, 1);
    ls.set("cart", S.cart);
    chrome();
    route();
    return;
  }
  const ad = e.target.closest("[data-add],[data-buy]");
  if (ad) {
    const root = ad.closest("[data-pid]"),
      val = (n) =>
        root.querySelector(`[data-group=${n}] [aria-pressed=true]`).dataset.v;
    addLine(
      root.dataset.pid,
      val("color"),
      val("size"),
      +root.querySelector("[data-qv]").textContent,
    );
    if (ad.matches("[data-buy]")) location.hash = "#/checkout";
    return;
  }
  if (e.target.closest("[data-promo]")) {
    const c = $("#promoIn").value.trim().toUpperCase();
    if (CONFIG.promos[c]) {
      CK.promo = c;
      refreshCk();
      $("#promoMsg").textContent = t("promoOk");
    } else {
      CK.promo = null;
      refreshCk();
      $("#promoMsg").textContent = t("promoBad");
    }
    return;
  }
  const q = e.target.closest("[data-quick]");
  if (q) {
    const p = find(q.dataset.quick);
    addLine(p.id, p.colors[0], p.sizes[0]);
    return;
  }
  const rm = e.target.closest("[data-rm]");
  if (rm) {
    S.cart.splice(+rm.dataset.rm, 1);
    ls.set("cart", S.cart);
    chrome();
    route();
    return;
  }
  if (e.target.closest("[data-menu]")) {
    const o = document.body.classList.toggle("menu-open");
    e.target.closest("[data-menu]").setAttribute("aria-expanded", o);
    return;
  }
  if (e.target.closest("[data-search]")) {
    const b = $("#sbar");
    b.hidden = !b.hidden;
    if (!b.hidden) $("#q").focus();
  }
});
document.addEventListener("submit", async (e) => {
  const f = e.target.closest("[data-lead]");
  if (!f) return;
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  if ([...f.querySelectorAll("[required]")].some((i) => !i.value.trim())) {
    toast(t("fill"));
    return;
  }
  if (f.dataset.lead === "order")
    d.items =
      S.cart.map((l) => `${l.id}/${l.color}/${l.size}x${l.qty}`).join(", ") +
      " | total PKR " +
      cartTotal();
  if (await sendLead(f.dataset.lead, d)) {
    toast(t("sent"));
    f.reset();
    if (f.dataset.lead === "order") {
      S.cart = [];
      ls.set("cart", []);
      chrome();
    }
  }
});
document.addEventListener("change", (e) => {
  const el = e.target;
  if (el.matches(".js-lang")) {
    S.lang = el.value;
    ls.set("lang", S.lang);
    chrome();
    route();
    track("language_change");
  } else if (el.matches(".js-cur")) {
    S.cur = el.value;
    ls.set("cur", S.cur);
    chrome();
    route();
    track("currency_change");
  } else if (el.matches(".js-fabric") || el.matches(".js-sort")) {
    if (el.matches(".js-fabric")) SH.fabric = el.value;
    else SH.sort = el.value;
    $("#plp").innerHTML = plpHtml();
    $("#plpn").textContent = cnt(plpList().length);
  }
});
document.addEventListener("input", (e) => {
  if (e.target.id !== "q") return;
  const v = e.target.value.trim().toLowerCase();
  const r = v
    ? PRODUCTS.filter((p) =>
        (nm(p) + " " + p.name + " " + fb(p.fabric) + " " + cat_(p.cat))
          .toLowerCase()
          .includes(v),
      ).slice(0, 6)
    : [];
  $("#sres").innerHTML = v
    ? r
        .map(
          (p) =>
            `<a href="#/product/${p.id}"><img src="${p.img}" alt="" width="48" height="60"><span>${esc(nm(p))}</span><b>${money(p.price)}</b></a>`,
        )
        .join("") || `<p>${t("noRes")}</p>`
    : "";
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $("#sbar").hidden = true;
    document.body.classList.remove("menu-open");
  }
});
["mouseover", "focusin", "click"].forEach((ev) =>
  document.addEventListener(ev, (e) => {
    const r = e.target.closest("[data-bs]");
    if (r) {
      const i = r.dataset.bs;
      document
        .querySelectorAll(".bs__img img,.bs__row")
        .forEach((x) =>
          x.classList.toggle("on", (x.dataset.i ?? x.dataset.bs) === i),
        );
    }
    const f = e.target.closest(".fp");
    if (f && !f.classList.contains("on"))
      document
        .querySelectorAll(".fp")
        .forEach((x) => x.classList.toggle("on", x === f));
  }),
);
addEventListener("hashchange", route);
chrome();
route();

document.addEventListener("change", (e) => {
  const el = e.target;
  if (el.id === "country") {
    CK.cc = el.value;
    CK.method = "";
    refreshCk();
  } else if (el.name === "pay") {
    CK.method = el.value;
    $("#payBox").innerHTML = payUI();
  } else if (el.matches(".js-del")) {
    CK.cc = el.value;
    $("#delRes").textContent = delRange(CK.cc);
  }
});
document.addEventListener("submit", async (e) => {
  const f = e.target.closest("#chk");
  if (!f) return;
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(f));
  if (fd.website) return;
  f.querySelectorAll("[aria-invalid]").forEach((i) =>
    i.removeAttribute("aria-invalid"),
  );
  const bad = [...f.querySelectorAll("[required]")].filter(
    (i) =>
      !i.value.trim() ||
      (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value)),
  );
  if (bad.length) {
    bad.forEach((i) => i.setAttribute("aria-invalid", "true"));
    bad[0].focus();
    toast(t("fill"));
    return;
  }
  const T = totals(),
    btn = $("#placeBtn");
  btn.disabled = true;
  const o = {
    id: "LM-" + Date.now().toString(36).toUpperCase(),
    ts: Date.now(),
    items: S.cart.map((l) => ({
      ...l,
      name: find(l.id).name,
      price: find(l.id).price,
    })),
    totals: T,
    currency: S.cur,
    customer: {
      name: fd.name,
      email: fd.email,
      phone: fd.phone,
      country: fd.country,
      city: fd.city,
      address: fd.address,
      postal: fd.postal || "",
    },
    method: CK.method,
    mobile: fd.mobile || "",
    receipt: (fd.receipt && fd.receipt.name) || "",
  };
  try {
    const r = await PAYMENTS[CK.method].pay(o);
    o.status = r.status;
    o.ref = r.ref || "";
  } catch {
    btn.disabled = false;
    toast(t("payFail"));
    return;
  }
  const log = ls.get("orders", []);
  log.unshift(o);
  ls.set("orders", log.slice(0, 30));
  sendLead("order", {
    order: o.id,
    name: fd.name,
    email: fd.email,
    phone: fd.phone,
    country: fd.country,
    city: fd.city,
    address: fd.address,
    payment: o.method,
    status: o.status,
    total: "PKR " + T.tot,
    items: o.items
      .map((l) => `${l.name} ${l.color}/${l.size} x${l.qty}`)
      .join("; "),
  });
  track("purchase", { id: o.id, value: T.tot });
  S.cart = [];
  ls.set("cart", []);
  CK.promo = null;
  chrome();
  location.hash = "#/order/" + o.id;
});
