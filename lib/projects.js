// ALL PROJECTS. One { ... } block = one project page at /properties/<slug>.
// The slug is made from the name automatically (e.g. "Fior 1" -> /properties/fior-1).
// Brochures and floor plans are found automatically at /public/brochures/<slug>.pdf and /public/floorplans/<slug>.pdf.
// Optional fields: type ("Apartments", "Villas", ...), bedrooms, status, overview, amenities, lastVerified, priceNote.

export const rows = [
  // ==========================================
  // EMAAR PROPERTIES
  // ==========================================

  {
    developerSlug: "emaar",
    developer: "Emaar Properties",
    name: "Valia",
    location: "Dubai Creek Harbour",
    startingPrice: 1960000,
    bedrooms: "1, 2, 3 and 4-bedroom apartments",

    image: "/images/properties/valia/cover.png",

    gallery: [],

    amenities: [],

    brochure: "/brochures/valia-brochure.pdf",

    floorPlan: "/floor-plans/valia-floor-plan.pdf",

    mapUrl:
      "https://www.google.com/maps?q=Dubai+Creek+Harbour&output=embed",

    overview: "",

    paymentPlan: "10% booking / 70% construction / 20% handover",

    handover: "Q4 2030",
  },

  {
    developerSlug: "emaar",
    developer: "Emaar Properties",
    name: "Golf Fields",
    location: "Emaar South",
    startingPrice: 1260000,

    image: "/images/properties/golf-fields/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Emaar+South+Dubai&output=embed",

    overview: "",

    paymentPlan: "10% booking / 70% construction / 20% handover",

    handover: "Q3 2030",
  },

  {
    developerSlug: "emaar",
    developer: "Emaar Properties",
    name: "Fior 1",
    location: "Rashid Yachts & Marina",
    startingPrice: 2200000,

    image: "/images/properties/fior-1/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Rashid+Yachts+and+Marina+Dubai&output=embed",

    overview: "",

    paymentPlan: "10% booking / 70% construction / 20% handover",

    handover: "Q3 2030",
  },

  // ==========================================
  // DANUBE PROPERTIES
  // ==========================================

  {
    developerSlug: "danube",
    developer: "Danube Properties",
    name: "Shahrukhz Residences",
    location: "Dubai Maritime City",
    startingPrice: 1650000,

    image: "/images/properties/shahrukhz-residences/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Dubai+Maritime+City&output=embed",

    overview: "",

    paymentPlan: "10% booking / 60% construction / 30% handover",

    handover: "Q1 2030",
  },

  {
    developerSlug: "danube",
    developer: "Danube Properties",
    name: "Greenz by Danube",
    location: "Dubai Academic City",
    startingPrice: 3500000,

    image: "/images/properties/greenz-by-danube/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Dubai+Academic+City&output=embed",

    overview: "",

    paymentPlan: "10% booking / 60% construction / 30% handover",

    handover: "Q4 2029",
  },

  {
    developerSlug: "danube",
    developer: "Danube Properties",
    name: "Serenz by Danube",
    location: "Jumeirah Village Circle",
    startingPrice: 1100000,

    image: "/images/properties/serenz-by-danube/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Jumeirah+Village+Circle+Dubai&output=embed",

    overview: "",

    paymentPlan: "10% booking / 60% construction / 30% handover",

    handover: "Q4 2029",
  },

  // ==========================================
  // BINGHATTI PROPERTIES
  // ==========================================

  {
    developerSlug: "binghatti",
    developer: "Binghatti",
    name: "Binghatti Starfall",
    location: "Al Jaddaf",
    startingPrice: 759999,

    image: "/images/properties/binghatti-starfall/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Al+Jaddaf+Dubai&output=embed",

    overview: "",

    paymentPlan: "20% booking / 50% construction / 30% handover",

    handover: "Q3 2028",
  },

  {
    developerSlug: "binghatti",
    developer: "Binghatti",
    name: "Binghatti Spectre",
    location: "Al Jaddaf",
    startingPrice: 774999,

    image: "/images/properties/binghatti-spectre/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Al+Jaddaf+Dubai&output=embed",

    overview: "",

    paymentPlan: "10% booking / 40% construction / 50% handover",

    handover: "Q4 2028",
  },

  {
    developerSlug: "binghatti",
    developer: "Binghatti",
    name: "Binghatti Wraith",
    location: "Al Jaddaf",
    startingPrice: 799999,

    image: "/images/properties/binghatti-wraith/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Al+Jaddaf+Dubai&output=embed",

    overview: "",

    paymentPlan: "20% booking / 30% construction / 50% handover",

    handover: "Q4 2027",
  },

  // ==========================================
  // DAMAC PROPERTIES
  // ==========================================

  {
    developerSlug: "damac",
    developer: "DAMAC Properties",
    name: "DAMAC Islands 2",
    location: "Dubailand",
    startingPrice: 2994000,

    image: "/images/properties/damac-islands-2/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Dubailand+Dubai&output=embed",

    overview: "",

    paymentPlan: "20% booking / 55% construction / 25% handover",

    handover: "Q2–Q4 2030",
  },

  {
    developerSlug: "damac",
    developer: "DAMAC Properties",
    name: "DAMAC District",
    location: "DAMAC Hills",
    startingPrice: 1447000,

    image: "/images/properties/damac-district/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=DAMAC+Hills+Dubai&output=embed",

    overview: "",

    paymentPlan: "20% booking / 40% construction / 40% handover",

    handover: "Q3 2029",
  },

  {
    developerSlug: "damac",
    developer: "DAMAC Properties",
    name: "Chelsea Residences",
    location: "Dubai Maritime City",
    startingPrice: 2386000,

    image: "/images/properties/chelsea-residences/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Dubai+Maritime+City&output=embed",

    overview: "",

    paymentPlan: "5% booking / 55% construction / 40% handover",

    handover: "Q4 2029",
  },



  {
    developerSlug: "damac",
    developer: "DAMAC Properties",
    name: "Lilac",
    location: "Damac Hills 1",
    startingPrice: 724000,
    priceNote: "(Now Accepting EOIs)",

    image: "/images/properties/lilac/cover.jpeg",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

  
    mapUrl:
      "https://www.google.com/maps/dir//''/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x3e5f71c4b5467789:0xaf7c6e8fdfe8deaa!3e0?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF",

    overview: "",

    paymentPlan: " 50% construction / 50% handover",

    handover:"Q1 2030",
  },

  // ==========================================
  // IMTIAZ DEVELOPMENTS
  // ==========================================

  {
    developerSlug: "imtiaz",
    developer: "Imtiaz Developments",
    name: "KORE by Imtiaz",
    location: "Dubai Land Residence Complex",
    startingPrice: 679000,

    image: "/images/properties/kore-by-imtiaz/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Dubai+Land+Residence+Complex&output=embed",

    overview: "",

    paymentPlan: "20% booking / 30% construction / 50% handover",

    handover: "Q4 2028",
  },

  {
    developerSlug: "imtiaz",
    developer: "Imtiaz Developments",
    name: "The Archive by Imtiaz",
    location: "Dubai Land Residence Complex",
    startingPrice: 666000,

    image: "/images/properties/the-archive-by-imtiaz/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Dubai+Land+Residence+Complex&output=embed",

    overview: "",

    paymentPlan: "20% booking / 30% construction / 50% handover",

    handover: "Q3 2028",
  },

  {
    developerSlug: "imtiaz",
    developer: "Imtiaz Developments",
    name: "RAW District II",
    location: "Downtown Jebel Ali",
    startingPrice: 666000,

    image: "/images/properties/raw-district-ii/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Downtown+Jebel+Ali+Dubai&output=embed",

    overview: "",

    paymentPlan: "20% booking / 30% construction / 50% handover",

    handover: "Q4 2029",
  },

  // ==========================================
  // AZIZI DEVELOPMENTS
  // ==========================================

  {
    developerSlug: "azizi",
    developer: "Azizi Developments",
    name: "Azizi Lina",
    location: "Downtown Jebel Ali",
    startingPrice: 572000,

    image: "/images/properties/azizi-lina/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Downtown+Jebel+Ali+Dubai&output=embed",

    overview: "",

    paymentPlan: "10% booking / 40% construction / 50% handover",

    handover: "Q4 2027",
  },

  {
    developerSlug: "azizi",
    developer: "Azizi Developments",
    name: "Azizi Wares",
    location: "Downtown Jebel Ali",
    startingPrice: 555000,

    image: "/images/properties/azizi-wares/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Downtown+Jebel+Ali+Dubai&output=embed",

    overview: "",

    paymentPlan: "10% booking / 40% construction / 50% handover",

    handover: "Q1 2028",
  },

  {
    developerSlug: "azizi",
    developer: "Azizi Developments",
    name: "Azizi Creek Views IV",
    location: "Al Jaddaf / Dubai Healthcare City",
    startingPrice: null,

    image: "/images/properties/azizi-creek-views-iv/cover.png",

    gallery: [],

    amenities: [],

    brochure: null,

    floorPlan: null,

    mapUrl:
      "https://www.google.com/maps?q=Al+Jaddaf+Dubai&output=embed",

    overview: "",

    paymentPlan: "10% booking / 40% construction / 50% handover",

    handover: "Q4 2028",
  },
];
