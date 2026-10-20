/* Payment adapters. Every adapter is: pay(order) -> Promise<{status, ref?}>
   status: 'cod' | 'pending' (provider will confirm) | 'awaiting_receipt' (bank transfer).
   TO CONNECT A REAL API: put your key/endpoint in CONFIG.payments.<id> and replace the body of pay().
   Typical flow: POST order to YOUR server -> server creates a session at the provider -> redirect: location.href = session.url.
   Never put secret keys in this front-end file. */
const GCC = ["AE", "SA", "QA", "KW", "BH", "OM"];
const stub = (id) => async (order) => {
  /* TODO: const r=await fetch(CONFIG.payments[id].endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(order)}); const s=await r.json(); location.href=s.url; */
  return { status: "pending", ref: id.toUpperCase() + "-" + order.id };
};
const PAYMENTS = {
  cod: { id: "cod", countries: ["PK"], pay: async () => ({ status: "cod" }) },
  card: {
    id: "card",
    countries: "*",
    pay: stub("card"),
  } /* Stripe / PayFast / HBL / Checkout.com */,
  jazzcash: {
    id: "jazzcash",
    countries: ["PK"],
    pay: stub("jazzcash"),
  } /* JazzCash mobile-wallet API (needs order.mobile) */,
  easypaisa: {
    id: "easypaisa",
    countries: ["PK"],
    pay: stub("easypaisa"),
  } /* Easypaisa / Telenor API (needs order.mobile) */,
  bank: {
    id: "bank",
    countries: "*",
    pay: async () => ({ status: "awaiting_receipt" }),
  } /* manual: customer sends receipt; upload field is UI only */,
  applepay: { id: "applepay", countries: GCC, pay: stub("applepay") },
  mada: { id: "mada", countries: ["SA"], pay: stub("mada") },
  tabby: {
    id: "tabby",
    countries: ["AE", "SA", "QA", "KW", "BH"],
    pay: stub("tabby"),
  },
  tamara: { id: "tamara", countries: ["AE", "SA", "KW"], pay: stub("tamara") },
};
const payMethodsFor = (cc) =>
  Object.values(PAYMENTS).filter(
    (m) => m.countries === "*" || m.countries.includes(cc),
  );
