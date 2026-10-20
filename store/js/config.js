/* CONFIG — edit everything here. */
const CONFIG = {
  brand: "Lumnara",
  whatsapp: "923001234567",
  phone: "+92 300 1234567",
  social: {
    instagram: "https://instagram.com/lumnara",
    facebook: "https://facebook.com/lumnara",
    tiktok: "https://tiktok.com/@lumnara",
    youtube: "https://youtube.com/@lumnara",
  },
  leadEmail: "you@example.com" /* backend only, never shown in UI */,
  currencies: {
    PKR: 1,
    AED: 0.013,
    SAR: 0.0133,
    QAR: 0.0129,
    KWD: 0.0011,
    USD: 0.0036,
    GBP: 0.0027,
  } /* per 1 PKR — update rates */,
  freeShipOver: 15000,
  shipFlat: 350,
  /* shipping zones (PKR) + free-shipping thresholds */
  shipZone: { PK: 350, GCC: 3500, INTL: 6500 },
  freeOver: { PK: 15000, GCC: 40000, INTL: 60000 },
  countries: {
    PK: { zone: "PK", days: [2, 4] },
    AE: { zone: "GCC", days: [3, 6] },
    SA: { zone: "GCC", days: [4, 7] },
    QA: { zone: "GCC", days: [4, 7] },
    KW: { zone: "GCC", days: [4, 7] },
    BH: { zone: "GCC", days: [4, 7] },
    OM: { zone: "GCC", days: [4, 7] },
    GB: { zone: "INTL", days: [7, 12] },
    US: { zone: "INTL", days: [7, 12] },
  },
  /* bank transfer details (dummy: replace) */
  bank: {
    name: "Meezan Bank",
    title: "Lumnara Modest Wear",
    iban: "PK36 MEZN 0001 2345 6789 0123",
  },
  /* payment provider endpoints/keys: fill when you connect each API (see js/payments.js) */
  payments: {
    card: { endpoint: "" },
    jazzcash: { endpoint: "" },
    easypaisa: { endpoint: "" },
    applepay: { merchantId: "" },
    mada: { endpoint: "" },
    tabby: { publicKey: "" },
    tamara: { publicKey: "" },
  },
  promos: { WELCOME10: 0.1, EID15: 0.15 },
  eid: {
    start: "2027-02-01",
    end: "2027-03-12",
  } /* Ramadan/Eid window shows a banner */,
};
