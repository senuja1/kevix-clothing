/**
 * 100% Data-Driven Looks and Archive Products Configuration File
 * Exclusively powered by authentic KevixClothing collection assets.
 */

export const BRAND_INFO = {
  name: "KevixClothing",
  wordmark: "KevixClothing",
  fullName: "KevixClothing",
  collection: "FW26 RUNWAY ARCHIVE",
  currency: "LKR",
  currencySymbol: "LKR",
  bundleDiscountPercent: 10,
  freeShippingThreshold: 10000,
  promoCodes: {
    "CATWALK": 15,
    "KEVIX10": 10
  }
};

export const CURRENCY = "LKR";
export const formatPrice = (price) => `LKR ${Number(price).toLocaleString()}`;

export const LOOKS_DATA = [
  {
    id: "look-01",
    number: "01",
    title: "Indigo Sculpt",
    subtitle: "Sculpted washed indigo denim corset crop top with brass zipper.",
    modelImage: "/models/model_01_crop_front.jpg",
    category: "Crop Tops",
    pieces: [
      {
        id: "p-101",
        pinNumber: 1,
        brand: "KevixClothing",
        name: "Zip up corset top",
        price: 3500,
        thumbnail: "/products/crop_top_denim.jpg",
        hotspot: { x: 50, y: 32 },
        canCustomize: true,
        sizes: [
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true },
          { label: "Custom", inStock: true }
        ],
        details: "Sculpted washed denim corset top featuring a heavy brass front zipper and contrast gold topstitching. Custom sizing available."
      }
    ]
  },
  {
    id: "look-02",
    number: "02",
    title: "Wide-Leg Selvedge",
    subtitle: "Cropped black Tee paired with True waist baggy jean (Unisex).",
    modelImage: "/models/model_02_denim_blacktee.jpg",
    category: "Denims",
    pieces: [
      {
        id: "p-201",
        pinNumber: 1,
        brand: "KevixClothing",
        name: "Cropped black Tee",
        price: 2300,
        thumbnail: "/products/kvx_classic_tee.jpg",
        hotspot: { x: 50, y: 38 },
        canCustomize: false,
        sizes: [
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true }
        ],
        details: "Heavyweight 280gsm organic jersey with crisp white chest embroidery and cropped boxy cut."
      },
      {
        id: "p-202",
        pinNumber: 2,
        brand: "KevixClothing",
        name: "True waist baggy jean (Unisex)",
        price: 5600,
        thumbnail: "/products/kvx_wide_denim.jpg",
        hotspot: { x: 48, y: 68 },
        canCustomize: true,
        sizes: [
          { label: "28", inStock: true },
          { label: "30", inStock: true },
          { label: "32", inStock: true },
          { label: "Custom", inStock: true }
        ],
        details: "True waist baggy unisex fit in washed indigo selvedge denim with tobacco contrast stitching. Custom sizing available."
      }
    ]
  },
  {
    id: "look-03",
    number: "03",
    title: "Studio Essential",
    subtitle: "Cropped white Tee paired with True waist baggy jean (Unisex).",
    modelImage: "/models/model_03_denim_whitetee.jpg",
    category: "Shirts",
    pieces: [
      {
        id: "p-301",
        pinNumber: 1,
        brand: "KevixClothing",
        name: "Cropped white Tee",
        price: 2300,
        thumbnail: "/products/kvx_white_tee.jpg",
        hotspot: { x: 50, y: 34 },
        canCustomize: false,
        sizes: [
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true }
        ],
        details: "260gsm combed cotton crewneck with clean cropped boxy drape and subtle chest branding."
      },
      {
        id: "p-302",
        pinNumber: 2,
        brand: "KevixClothing",
        name: "True waist baggy jean (Unisex)",
        price: 5600,
        thumbnail: "/products/selvedge_loose_denim.jpg",
        hotspot: { x: 50, y: 66 },
        canCustomize: true,
        sizes: [
          { label: "28", inStock: true },
          { label: "30", inStock: true },
          { label: "32", inStock: true },
          { label: "Custom", inStock: true }
        ],
        details: "Authentic mid-blue washed true waist baggy unisex denim with reinforced double-needle seams. Custom sizing available."
      }
    ]
  },
  {
    id: "look-04",
    number: "04",
    title: "Tailored Flared",
    subtitle: "Sculpted washed denim corset top with high-neck collar and contour paneling.",
    modelImage: "/models/model_04_crop_side.jpg",
    category: "Crop Tops",
    pieces: [
      {
        id: "p-401",
        pinNumber: 1,
        brand: "KevixClothing",
        name: "Zip up corset top",
        price: 3500,
        thumbnail: "/products/crop_corset_denim.jpg",
        hotspot: { x: 48, y: 33 },
        canCustomize: true,
        sizes: [
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true },
          { label: "Custom", inStock: true }
        ],
        details: "High-neck collar with front zip closure and ergonomic curved corset paneling for a contoured fit. Custom sizing available."
      }
    ]
  },
  {
    id: "look-05",
    number: "05",
    title: "Washed Waist Selvedge",
    subtitle: "True waist baggy jean in washed dark indigo selvedge denim.",
    modelImage: "/models/model_05_baggy_raw.jpg",
    category: "Denims",
    pieces: [
      {
        id: "p-501",
        pinNumber: 1,
        brand: "KevixClothing",
        name: "True waist baggy jean (Unisex)",
        price: 5600,
        thumbnail: "/products/raw_waist_baggy.jpg",
        hotspot: { x: 50, y: 70 },
        canCustomize: true,
        sizes: [
          { label: "28", inStock: true },
          { label: "30", inStock: true },
          { label: "32", inStock: true },
          { label: "Custom", inStock: true }
        ],
        details: "Authentic true waist baggy unisex fit with heavy gold topstitching, washed dark indigo, and custom brass hardware. Custom sizing available."
      }
    ]
  }
];

export const ARCHIVE_CATEGORIES = [
  "All",
  "Denims",
  "Tops & Corsets",
  "Tees"
];

export const ARCHIVE_PRODUCTS = [
  {
    id: "prod-baggy-unisex-dark",
    name: "True Waist Baggy Jean (Unisex)",
    brand: "KevixClothing",
    category: "Denims",
    price: 5600,
    primaryImage: "/products/kvx_wide_denim.jpg",
    secondaryImage: "/models/model_02_denim_blacktee.jpg",
    sizes: ["28", "30", "32", "Custom"],
    canCustomize: true,
    tag: "Bestseller · Custom Available",
    details: "Iconic true waist baggy unisex silhouette in washed indigo selvedge with tobacco stitching. Custom sizing available."
  },
  {
    id: "prod-corset-front",
    name: "Zip Up Corset Top",
    brand: "KevixClothing",
    category: "Tops & Corsets",
    price: 3500,
    primaryImage: "/products/crop_top_denim.jpg",
    secondaryImage: "/models/model_01_crop_front.jpg",
    sizes: ["S", "M", "L", "Custom"],
    canCustomize: true,
    tag: "Runway Piece · Custom Available",
    details: "Sculpted washed denim corset top with heavy antique brass front zipper and contrast gold topstitching. Custom sizing available."
  },
  {
    id: "prod-tee-black",
    name: "Cropped Black Boxy Tee",
    brand: "KevixClothing",
    category: "Tees",
    price: 2300,
    primaryImage: "/products/kvx_classic_tee.jpg",
    secondaryImage: "/models/model_02_denim_blacktee.jpg",
    sizes: ["S", "M", "L"],
    canCustomize: false,
    tag: "280gsm Heavyweight",
    details: "Heavyweight 280gsm organic jersey with crisp chest embroidery and structured cropped boxy cut."
  },
  {
    id: "prod-tee-white",
    name: "Cropped White Studio Tee",
    brand: "KevixClothing",
    category: "Tees",
    price: 2300,
    primaryImage: "/products/kvx_white_tee.jpg",
    secondaryImage: "/models/model_03_denim_whitetee.jpg",
    sizes: ["S", "M", "L"],
    canCustomize: false,
    tag: "Combed Cotton",
    details: "260gsm combed organic cotton crewneck with clean drape and minimal tonal chest signature."
  }
];
