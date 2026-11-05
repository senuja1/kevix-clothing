/**
 * 100% Data-Driven Looks Configuration File
 * Exclusively powered by the 4 authentic collection models.
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
  }
];
