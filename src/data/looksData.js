/**
 * 100% Data-Driven Looks and Archive Products Configuration File
 * Exclusively powered by authentic KevixClothing collection assets.
 */

export const BRAND_INFO = {
  name: "KevixClothing",
  wordmark: "KevixClothing",
  fullName: "KevixClothing",
  collection: "FW26 RUNWAY ARCHIVE",
  bundleDiscountPercent: 10,
  freeShippingThreshold: 200,
  promoCodes: {
    "CATWALK": 15,
    "KEVIX10": 10
  }
};

export const LOOKS_DATA = [
  {
    id: "look-01",
    number: "01",
    title: "Indigo Sculpt",
    subtitle: "Sculpted raw indigo denim corset crop top with brass zipper.",
    modelImage: "/models/model_01_crop_front.jpg",
    category: "Crop Tops",
    pieces: [
      {
        id: "p-101",
        pinNumber: 1,
        brand: "KevixClothing",
        name: "Zip up corset top",
        price: 78.00,
        thumbnail: "/products/crop_top_denim.jpg",
        hotspot: { x: 50, y: 32 },
        sizes: [
          { label: "XS", inStock: true },
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true },
          { label: "XL", inStock: false }
        ],
        details: "Sculpted raw denim corset top featuring a heavy brass front zipper and contrast gold topstitching."
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
        price: 48.00,
        thumbnail: "/products/kvx_classic_tee.jpg",
        hotspot: { x: 50, y: 38 },
        sizes: [
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true },
          { label: "XL", inStock: true }
        ],
        details: "Heavyweight 280gsm organic jersey with crisp white chest embroidery and cropped boxy cut."
      },
      {
        id: "p-202",
        pinNumber: 2,
        brand: "KevixClothing",
        name: "True waist baggy jean (Unisex)",
        price: 98.00,
        thumbnail: "/products/kvx_wide_denim.jpg",
        hotspot: { x: 48, y: 68 },
        sizes: [
          { label: "28", inStock: true },
          { label: "30", inStock: true },
          { label: "32", inStock: true },
          { label: "34", inStock: true },
          { label: "36", inStock: false }
        ],
        details: "True waist baggy unisex fit in rigid indigo selvedge denim with tobacco contrast stitching."
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
        price: 48.00,
        thumbnail: "/products/kvx_white_tee.jpg",
        hotspot: { x: 50, y: 34 },
        sizes: [
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true },
          { label: "XL", inStock: false }
        ],
        details: "260gsm combed cotton crewneck with clean cropped boxy drape and subtle chest branding."
      },
      {
        id: "p-302",
        pinNumber: 2,
        brand: "KevixClothing",
        name: "True waist baggy jean (Unisex)",
        price: 98.00,
        thumbnail: "/products/selvedge_loose_denim.jpg",
        hotspot: { x: 50, y: 66 },
        sizes: [
          { label: "28", inStock: true },
          { label: "30", inStock: true },
          { label: "32", inStock: true },
          { label: "34", inStock: true }
        ],
        details: "Authentic mid-blue wash true waist baggy unisex denim with reinforced double-needle seams."
      }
    ]
  },
  {
    id: "look-04",
    number: "04",
    title: "Tailored Flared",
    subtitle: "Sculpted raw denim corset top with high-neck collar and contour paneling.",
    modelImage: "/models/model_04_crop_side.jpg",
    category: "Crop Tops",
    pieces: [
      {
        id: "p-401",
        pinNumber: 1,
        brand: "KevixClothing",
        name: "Zip up corset top",
        price: 78.00,
        thumbnail: "/products/crop_corset_denim.jpg",
        hotspot: { x: 48, y: 33 },
        sizes: [
          { label: "XS", inStock: true },
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true }
        ],
        details: "High-neck collar with front zip closure and ergonomic curved corset paneling for a contoured fit."
      }
    ]
  },
  {
    id: "look-05",
    number: "05",
    title: "Raw Waist Selvedge",
    subtitle: "True waist baggy jean in rigid dark indigo selvedge denim.",
    modelImage: "/models/model_05_baggy_raw.jpg",
    category: "Denims",
    pieces: [
      {
        id: "p-501",
        pinNumber: 1,
        brand: "KevixClothing",
        name: "True waist baggy jean (Unisex)",
        price: 98.00,
        thumbnail: "/products/raw_waist_baggy.jpg",
        hotspot: { x: 50, y: 70 },
        sizes: [
          { label: "28", inStock: true },
          { label: "30", inStock: true },
          { label: "32", inStock: true },
          { label: "34", inStock: true },
          { label: "36", inStock: true }
        ],
        details: "Authentic true waist baggy unisex fit with heavy gold topstitching, deep raw indigo wash, and custom brass hardware."
      }
    ]
  }
];

export const ARCHIVE_CATEGORIES = [
  "All",
  "Denims",
  "Tops & Corsets",
  "Essentials",
  "Footwear & Belts"
];

export const ARCHIVE_PRODUCTS = [
  {
    id: "prod-corset-front",
    name: "Zip Up Corset Top",
    brand: "KevixClothing",
    category: "Tops & Corsets",
    price: 78.00,
    primaryImage: "/products/crop_top_denim.jpg",
    secondaryImage: "/models/model_01_crop_front.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    tag: "Runway Piece",
    details: "Sculpted raw denim corset top with heavy antique brass front zipper and contrast gold topstitching."
  },
  {
    id: "prod-baggy-unisex-dark",
    name: "True Waist Baggy Jean (Unisex)",
    brand: "KevixClothing",
    category: "Denims",
    price: 98.00,
    primaryImage: "/products/kvx_wide_denim.jpg",
    secondaryImage: "/models/model_02_denim_blacktee.jpg",
    sizes: ["28", "30", "32", "34", "36"],
    tag: "Bestseller",
    details: "Iconic true waist baggy unisex silhouette in rigid raw indigo selvedge with tobacco stitching."
  },
  {
    id: "prod-tee-black",
    name: "Cropped Black Boxy Tee",
    brand: "KevixClothing",
    category: "Essentials",
    price: 48.00,
    primaryImage: "/products/kvx_classic_tee.jpg",
    secondaryImage: "/models/model_02_denim_blacktee.jpg",
    sizes: ["S", "M", "L", "XL"],
    tag: "280gsm Heavyweight",
    details: "Heavyweight 280gsm organic jersey with crisp chest embroidery and structured cropped boxy cut."
  },
  {
    id: "prod-tee-white",
    name: "Cropped White Studio Tee",
    brand: "KevixClothing",
    category: "Essentials",
    price: 48.00,
    primaryImage: "/products/kvx_white_tee.jpg",
    secondaryImage: "/models/model_03_denim_whitetee.jpg",
    sizes: ["S", "M", "L", "XL"],
    tag: "Combed Cotton",
    details: "260gsm combed organic cotton crewneck with clean drape and minimal tonal chest signature."
  },
  {
    id: "prod-baggy-raw-selvedge",
    name: "Raw Waist Selvedge Baggy Jean",
    brand: "KevixClothing",
    category: "Denims",
    price: 98.00,
    primaryImage: "/products/raw_waist_baggy.jpg",
    secondaryImage: "/models/model_05_baggy_raw.jpg",
    sizes: ["28", "30", "32", "34", "36"],
    tag: "Look 05 · Raw",
    details: "Deep unwashed dark indigo selvedge denim cut in an authentic low/true waist unisex drape."
  },
  {
    id: "prod-corset-contour",
    name: "Contoured High-Neck Corset",
    brand: "KevixClothing",
    category: "Tops & Corsets",
    price: 78.00,
    primaryImage: "/products/crop_corset_denim.jpg",
    secondaryImage: "/models/model_04_crop_side.jpg",
    sizes: ["XS", "S", "M", "L"],
    tag: "Contour Paneling",
    details: "High-neck collar with front zip closure and ergonomic curved corset seams for a tailored fit."
  },
  {
    id: "prod-selvedge-mid-blue",
    name: "Mid-Blue Loose Selvedge Jean",
    brand: "KevixClothing",
    category: "Denims",
    price: 98.00,
    primaryImage: "/products/selvedge_loose_denim.jpg",
    secondaryImage: "/models/model_03_denim_whitetee.jpg",
    sizes: ["28", "30", "32", "34"],
    tag: "Vintage Wash",
    details: "Stone-washed mid-blue selvedge denim with natural whiskering and heavy-duty reinforced seams."
  },
  {
    id: "prod-flared-denim",
    name: "Flared Indigo Denim Trouser",
    brand: "KevixClothing",
    category: "Denims",
    price: 105.00,
    primaryImage: "/products/flared_denim_pants.jpg",
    secondaryImage: "/products/wide_pooling_denim.jpg",
    sizes: ["28", "30", "32", "34"],
    tag: "Architectural Cut",
    details: "Precision flare with clean front creases and deep hem pooling for a dramatic silhouette."
  },
  {
    id: "prod-wide-pooling",
    name: "Wide Pooling Shuttle Selvedge",
    brand: "KevixClothing",
    category: "Denims",
    price: 110.00,
    primaryImage: "/products/wide_pooling_denim.jpg",
    secondaryImage: "/products/kvx_wide_denim.jpg",
    sizes: ["28", "30", "32", "34", "36"],
    tag: "14oz Shuttle Loom",
    details: "Woven on vintage shuttle looms in Okayama. Extreme leg width with tailored waistband."
  },
  {
    id: "prod-vintage-belt",
    name: "Vintage Brass Buckle Belt",
    brand: "KevixClothing",
    category: "Footwear & Belts",
    price: 42.00,
    primaryImage: "/products/vintage_buckle_belt.jpg",
    secondaryImage: "/products/belt_gold_buckle.jpg",
    sizes: ["S", "M", "L"],
    tag: "Solid Brass",
    details: "Full-grain Italian vegetable tanned leather strap with hand-cast solid vintage brass buckle."
  },
  {
    id: "prod-retro-runner",
    name: "Retro Runner Sneaker · Cream",
    brand: "KevixClothing",
    category: "Footwear & Belts",
    price: 120.00,
    primaryImage: "/products/retro_runner_cream.jpg",
    secondaryImage: "/products/court_platform_sneaker.jpg",
    sizes: ["40", "41", "42", "43", "44"],
    tag: "Studio Footwear",
    details: "Layered suede and breathable mesh running shoe with sculpted EVA midsole in tonal cream."
  },
  {
    id: "prod-black-stride",
    name: "Black Stride Runway Sneaker",
    brand: "KevixClothing",
    category: "Footwear & Belts",
    price: 125.00,
    primaryImage: "/products/black_stride_sneakers.jpg",
    secondaryImage: "/products/court_platform_sneaker.jpg",
    sizes: ["40", "41", "42", "43", "44"],
    tag: "Monochrome",
    details: "All-black low-top architectural sneaker with custom textured rubber outsole."
  }
];
