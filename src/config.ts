import { LandingPageConfig } from './types';

export const INITIAL_CONFIG: LandingPageConfig = {
  PRODUCT_NAME: "2-FLIP-UP DOUBLE GAS BURNER WITH TIMER",
  NORMAL_PRICE: 170000,
  PRICE_FOR_2: 165000,
  PRICE_FOR_3_PLUS: 160000,
  COUNTDOWN_HOURS: 24, // Persistent rolling 24h or fixed end date
  COUNTDOWN_END_DATE: "", // Can be set to ISO date string e.g. "2026-10-15T23:59:59"
  FORMSPREE_ENDPOINT: "https://formspree.io/f/xljevqpk", // Formspree notification endpoint for orders
  META_PIXEL_ID: "947636671276929", // Official Meta Pixel ID for tracking
  WHATSAPP_NUMBER: "09136827730", // Configurable seller WhatsApp
  PHONE_NUMBER: "09136827730",    // Configurable seller Phone
  DELIVERY_INFORMATION: "Nationwide delivery available across all 36 states and FCT Abuja. Delivery typically takes 1 to 3 business days depending on your location. Our dispatch team contacts you prior to delivery.",
  PAYMENT_INFORMATION: "Payment terms and options are confirmed directly with our sales team upon order dispatch. Multiple secure verification methods available for your peace of mind.",
  RETURN_POLICY: "Every unit undergoes physical inspection prior to dispatch. If you notice any transit defect upon unboxing, contact our customer support team immediately for prompt resolution.",
  WARRANTY_INFORMATION: "Manufacturer warranty coverage applies as specified per production batch. Please retain your order confirmation slip for customer support verification.",
  PRODUCT_IMAGES: [
    {
      id: "img-main-cooker",
      title: "Premium Double Burner Tempered Glass Gas Cooktop with Built-in Timer",
      caption: "Sleek bevelled black tempered glass surface with dual 8-nozzle windproof burners, rotary control knobs with MAX/MIN indicators, illuminated digital timer, and tabletop non-slip base.",
      url: "/images/cooker_active_blue_flames.jpg",
      isPlaceholder: false
    },
    {
      id: "img-flip-hinge",
      title: "Windproof Wok Support & 8-Nozzle Precision Burner Crown",
      caption: "High-grade cast iron pan support bowl with 8 precision flame nozzles encircling the center, ceramic pulse ignition pin, and safety thermocouple on high-gloss tempered glass.",
      url: "/images/burner_flip_hinge.jpg",
      isPlaceholder: false
    },
    {
      id: "img-blue-flames",
      title: "Smart Digital Timer & Dual Flame Control Knobs",
      caption: "Intuitive digital LED display with touch timer buttons (+/-), battery level monitor, and dual rotary knobs with precision MAX/MIN flame calibration markings.",
      url: "/images/cooker_blue_flames.jpg",
      isPlaceholder: false
    },
    {
      id: "img-burner-head",
      title: "Flip-Up Under-Hinge & Brass Damper Valves",
      caption: "Precision 90-degree folding hinge mechanism with dual brass air-intake dampers and internal pulse wiring against the black tempered glass.",
      url: "/images/burner_head_top.jpg",
      isPlaceholder: false
    },
    {
      id: "img-bottom-chassis",
      title: "Sturdy Bottom Base & Gas Inlet",
      caption: "Reinforced galvanized underside chassis with 4 non-slip rubber tabletop feet, brass copper gas intake elbow, and battery pulse box.",
      url: "/images/cooker_bottom_base.jpg",
      isPlaceholder: false
    },
    {
      id: "img-pure-blue-flame",
      title: "Big Fire: Pure Blue Flame & Fierce Stir-Frying",
      caption: "A combination of strength and softness: the big fire is fierce enough for high-heat stir-frying, and the small simmer fire is completely stable.",
      url: "/images/pure_blue_flame.jpg",
      isPlaceholder: false
    }
  ],
  REVIEWS: [
    {
      id: "rev-1",
      rating: 5,
      content:
        "Honestly, this flip-up burner is the best purchase I have made for my kitchen this year. Cleaning around traditional gas burners used to give me a massive headache whenever soup or oil spilled, but now I just lift the burner heads and wipe the glass top in less than 30 seconds! The built-in timer is another lifesaver—I set it whenever I'm boiling meat or yam so nothing burns while I attend to the children. Delivery to Ikeja took just 24 hours. Highly recommended!",
      author: "Mrs. Adewale",
      location: "Ikeja, Lagos"
    },
    {
      id: "rev-2",
      rating: 5,
      content:
        "I ordered two units—one for our home here in Abuja and another for my mother in Kaduna. The flame intensity is top-notch; it's a pure, fierce blue fire that boils water and cooks food very fast without staining our stainless pots with black soot. The heavy-duty pan support easily balances large pots without wobbling. Delivery to Abuja was smooth and on time, and customer service called to verify everything before dispatch. Truly worth the money.",
      author: "Mr. Mohamed",
      location: "Gwarinpa, Abuja"
    },
    {
      id: "rev-3",
      rating: 5,
      content:
        "I was initially hesitant about ordering a glass cooker online because of transit handling to Port Harcourt, but it arrived solidly packaged with zero damage. The tempered glass looks so elegant on my granite counter! What impressed me most is the windproof burner design—even with the kitchen window open, the flames stay steady without going off. The automatic pulse ignition is instant, and cooking two meals simultaneously saves me so much evening time. 10/10 purchase!",
      author: "Mrs. Desmond",
      location: "GRA, Port Harcourt"
    }
  ],
  FAQS: [
    {
      id: "faq-1",
      question: "1. What is the 2-flip-up burner?",
      answer: "The 2-flip-up burner is a modern double-burner gas cooker featuring foldable flip-up burner heads on a sleek glass-top surface, designed to provide flexible cooking space and easier surface cleaning."
    },
    {
      id: "faq-2",
      question: "2. How many burners does it have?",
      answer: "It is equipped with 2 dedicated cooking zones, allowing you to prepare two dishes simultaneously."
    },
    {
      id: "faq-3",
      question: "3. Does it have a built-in timer?",
      answer: "Yes, it features an integrated cooking timer that allows you to monitor and keep track of your cooking time conveniently."
    },
    {
      id: "faq-4",
      question: "4. How does the flip-up design work?",
      answer: "The burner heads are mounted on sturdy hinges that allow them to be flipped up vertically, giving you complete and unobstructed access to wipe clean the glass-top surface underneath."
    },
    {
      id: "faq-5",
      question: "5. What is the panel size and dimensions of the 2-Burner Cooker?",
      answer: "The 2-Burner Cooker top panel measures 75 by 45 cm (75 × 45 cm / 750 × 450 mm). It is compact yet spacious enough to accommodate two large family pots or pans simultaneously. It can be used directly on any countertop with its non-slip rubber feet or installed into a 680 × 380 mm cutout."
    },
    {
      id: "faq-6",
      question: "6. How much is one burner?",
      answer: "A single unit is priced at ₦170,000 under our promotional offer."
    },
    {
      id: "faq-7",
      question: "7. How much do I pay when I buy two?",
      answer: "When you buy 2 units, you pay ₦165,000 each (Total: ₦330,000), saving you ₦10,000 compared to buying individually."
    },
    {
      id: "faq-8",
      question: "8. How much do I pay when I buy three or more?",
      answer: "For 3 or more units, you enjoy our best wholesale tier at ₦160,000 each (Total: ₦480,000 for 3 units), saving you ₦30,000 or more."
    },
    {
      id: "faq-9",
      question: "9. Do you deliver nationwide?",
      answer: "Yes, delivery is arranged across all 36 Nigerian states and the Federal Capital Territory (Abuja)."
    },
    {
      id: "faq-10",
      question: "10. How do I place an order?",
      answer: "Simply scroll down to our Order Form, choose your desired product (2-Burner, 5-Burner, or Both together), enter your delivery contact details, and submit. You can also order directly via WhatsApp."
    },
    {
      id: "faq-11",
      question: "11. How long does delivery take?",
      answer: "Delivery typically takes between 1 to 3 business days depending on your delivery city and state. Our customer service representative will contact you with exact dispatch updates."
    },
    {
      id: "faq-12",
      question: "12. What is your return or warranty policy?",
      answer: "Every order is thoroughly inspected before dispatch. In the rare event of transit issues, our customer care line is available to assist you with quick resolution according to our store terms."
    },
    {
      id: "faq-13",
      question: "13. What are the specifications of the 5-Burner Gas + Electric Hybrid Cooktop?",
      answer: "The 5-Burner Hybrid Cooktop is an executive 900mm wide built-in cooktop featuring 4 high-heat gas burners + 1 central 2000W instant radiant ceramic electric zone, digital countdown timer, 1-touch emergency power cutoff key, and 90° flip-up hinged burners for 10-second cleanups."
    },
    {
      id: "faq-14",
      question: "14. What are the dimensions and countertop cutout size for the 5-Burner cooktop?",
      answer: "Top Panel Dimensions: 900 × 510 mm (90 × 51 cm). Countertop Cutout Requirement: 870 × 480 mm. Package Dimensions: 970 × 570 × 250 mm. It drops cleanly into standard kitchen cabinet openings."
    },
    {
      id: "faq-15",
      question: "15. How does the hybrid feature help if gas finishes or there is no light?",
      answer: "With dual-fuel engineering, you never get stranded. If NEPA takes light, use the 4 gas burners. If your gas cylinder finishes unexpectedly while cooking, simply power the 2000W central electric ceramic zone with electricity or generator to complete your meal smoothly."
    },
    {
      id: "faq-16",
      question: "16. Can I order both the 2-Burner and the 5-Burner cooktops at the same time?",
      answer: "Yes! In Step 1 of the Order Form, select 'ORDER BOTH (2-Burner + 5-Burner Combo)'. You can adjust the quantity for each model and enjoy an automatic extra combo bundle discount of ₦20,000 off your combined order, delivered together anywhere in Nigeria."
    }
  ]
};

export const TWO_BURNER_CONFIG = {
  id: "cooktop-2burner-flipup",
  name: "2-Flip-Up Double Gas Burner with Timer",
  shortName: "2-Flip-Up Double Burner",
  panelDimensions: "75 × 45 cm (750 × 450 mm)",
  panelSizeText: "75 by 45 cm",
  cutoutDimensions: "680 × 380 mm (or Desktop / Tabletop with Non-Slip Feet)",
  specs: {
    panelDimensions: "75 by 45 cm (750 × 450 mm)",
    cutoutDimensions: "680 × 380 mm (Tabletop or Recessed)",
    surfaceMaterial: "Executive Bevelled Black Tempered Glass",
    burnerMechanism: "90° Flip-Up Articulated Hinged Burner Heads",
    timer: "Integrated Digital Countdown LED Timer",
    ignitionType: "Instant Ceramic Pulse Electronic Ignition",
    zones: "2 Dedicated Gas Cooking Zones"
  }
};

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function calculatePricing(
  quantity: number,
  config: Pick<LandingPageConfig, "NORMAL_PRICE" | "PRICE_FOR_2" | "PRICE_FOR_3_PLUS">
) {
  const qty = Math.max(1, quantity);
  let pricePerUnit = config.NORMAL_PRICE;

  if (qty === 1) {
    pricePerUnit = config.NORMAL_PRICE;
  } else if (qty === 2) {
    pricePerUnit = config.PRICE_FOR_2;
  } else {
    pricePerUnit = config.PRICE_FOR_3_PLUS;
  }

  const total = qty * pricePerUnit;
  const regularTotal = qty * config.NORMAL_PRICE;
  const savings = regularTotal - total;

  return {
    quantity: qty,
    pricePerUnit,
    total,
    regularTotal,
    savings
  };
}

export const ALTERNATIVE_PRODUCT_CONFIG = {
  id: "cooktop-5burner-hybrid",
  name: "5-Burner Built-In Gas + Electric Cooktop",
  shortName: "5-Burner Hybrid Cooktop",
  fullName: "5-Burner Built-In Gas + Electric Cooktop (with Digital Timer & Auto-Off)",
  tagline: "4 High-Power Gas Burners + 1 Central 2000W Radiant Electric Zone",
  description:
    "Executive 5-zone hybrid cooktop combining 4 gas burners with a heavy-duty 2000W central electric ceramic plate, integrated digital timer with automatic shutoff, and 90° flip-up hinged burners for 1-wipe cleanups.",
  NORMAL_PRICE: 280000,
  PRICE_FOR_2: 275000,
  PRICE_FOR_3: 270000,
  PRICE_FOR_4_PLUS: 265000,
  REGULAR_PRICE: 350000,
  specs: {
    panelDimensions: "900 × 510 mm",
    cutoutDimensions: "870 × 480 mm",
    packageDimensions: "970 × 570 × 250 mm",
    zones: "5 Zones (4 Gas Burners + 1 Central 2000W Radiant Ceramic Electric Plate)",
    electricZonePower: "2000W Instant Radiant Ceramic with Digital LED Display & Touch (+/-)",
    surfaceMaterial: "Executive Heavy-Duty Black Tempered Glass with Polished Bevelled Edges",
    burnerMechanism: "90° Flip-Up Articulated Hinged Burners (Lift Up to Clean Spills in 10s)",
    ignitionType: "Automatic Electronic Pulse Ignition + Micro-Touch Sensor",
    safetyFeatures: [
      "1-Touch Automatic Off Key for Emergency Power Cutoff",
      "Digital Countdown Timer with Auto-Shutoff to Prevent Burnt Food",
      "Thermocouple Flame Failure Protection on Gas Burners",
      "High-Temp Residual Heat Indicator on Electric Ceramic Plate"
    ]
  },
  images: [
    {
      id: "img-5b-diagram",
      title: "5-Zone Hybrid Cooktop (Layout Blueprint)",
      caption: "4 Gas Burners + 1 Central Radiant Ceramic Electric Burner with Digital Timer & Touch Controls on Deep Black Glass.",
      url: "/images/alternative_5burner/cooktop_main_diagram.png",
      isPlaceholder: false
    },
    {
      id: "img-5b-showroom",
      title: "Physical Showroom Unit (2000W Active Ceramic Zone)",
      caption: "Authentic physical unit featuring central glowing radiant zone, 2000W digital display, and robust rotary control knobs.",
      url: "/images/alternative_5burner/cooktop_showroom_active.jpg",
      isPlaceholder: false
    },
    {
      id: "img-5b-hinge",
      title: "Innovative 90° Flip-Up Hinged Burners",
      caption: "Heavy-duty dual-hinge design allows burners to tilt upward for effortless 1-wipe cleaning of soup/oil spills underneath without dismantling parts.",
      url: "/images/alternative_5burner/cooktop_hinged_burners.png",
      isPlaceholder: false
    },
    {
      id: "img-5b-dimensions",
      title: "Official Dimension Blueprint & Countertop Cutout Specs",
      caption: "Panel: 900 × 510mm • Cutout: 870 × 480mm • Package: 970 × 570 × 250mm. Fits standard modern kitchen cabinetry seamlessly.",
      url: "/images/alternative_5burner/cooktop_dimensions_spec.jpg",
      isPlaceholder: false
    },
    {
      id: "img-5b-installed",
      title: "Real Kitchen Countertop Installation",
      caption: "Flush built-in recessed installation on white quartz countertop matching contemporary luxury kitchen cabinetry.",
      url: "/images/alternative_5burner/cooktop_kitchen_installed.jpeg",
      isPlaceholder: false
    }
  ],
  keyBenefits: [
    {
      title: "Never Get Stranded: Dual-Fuel Cooking",
      desc: "Cook with gas when there's no electricity; cook with the 2000W electric ceramic zone when your gas cylinder finishes unexpectedly.",
      badge: "Dual Fuel"
    },
    {
      title: "90° Flip-Up Burners (1-Wipe Clean)",
      desc: "No more baked-on grease or rust. Simply lift the hinged burner heads and wipe the flat tempered glass in seconds.",
      badge: "Easy Clean"
    },
    {
      title: "Smart Digital Timer & Automatic Off Key",
      desc: "Set exact cooking countdowns. Walk away with peace of mind—the cooker automatically cuts off so food never burns.",
      badge: "Safety Auto-Off"
    },
    {
      title: "Executive 90cm 5-Pan Capacity",
      desc: "Cook multiple family dishes at once without pots bumping into each other. Features cast iron trivets for maximum stability.",
      badge: "Spacious 900mm"
    }
  ]
};

export interface CombinedPricingResult {
  mode: '2-burner' | '5-burner' | 'combo';
  isCombo: boolean;
  qty2Burner: number;
  qty5Burner: number;
  totalQuantity: number;
  unitPrice2Burner: number;
  unitPrice5Burner: number;
  subtotal2Burner: number;
  subtotal5Burner: number;
  comboDiscount: number;
  total: number;
  regularTotal: number;
  savings: number;
  productName: string;
  shortName: string;
  itemsSummary: string;
}

export function calculateCombinedPricing(
  mode: '2-burner' | '5-burner' | 'combo',
  qty2Burner: number,
  qty5Burner: number,
  config: LandingPageConfig
): CombinedPricingResult {
  let q2 = Math.max(0, qty2Burner);
  let q5 = Math.max(0, qty5Burner);

  // Normalize quantities based on explicit mode if passed
  if (mode === '2-burner') {
    q2 = Math.max(1, q2);
    q5 = 0;
  } else if (mode === '5-burner') {
    q2 = 0;
    q5 = Math.max(1, q5);
  } else if (mode === 'combo') {
    q2 = Math.max(1, q2);
    q5 = Math.max(1, q5);
  }

  // 2-Burner unit tiered pricing
  let unitPrice2 = config.NORMAL_PRICE;
  if (q2 === 1) unitPrice2 = config.NORMAL_PRICE;
  else if (q2 === 2) unitPrice2 = config.PRICE_FOR_2;
  else if (q2 >= 3) unitPrice2 = config.PRICE_FOR_3_PLUS;

  // 5-Burner unit tiered pricing
  let unitPrice5 = ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE;
  if (q5 === 1) unitPrice5 = ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE;
  else if (q5 === 2) unitPrice5 = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_2;
  else if (q5 === 3) unitPrice5 = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_3;
  else if (q5 >= 4) unitPrice5 = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_4_PLUS;

  const subtotal2 = q2 * unitPrice2;
  const subtotal5 = q5 * unitPrice5;

  const isCombo = q2 > 0 && q5 > 0;
  // Special bonus incentive when ordering both simultaneously: ₦20,000 combo discount!
  const comboDiscount = isCombo ? 20000 : 0;

  const total = Math.max(0, subtotal2 + subtotal5 - comboDiscount);
  const regularTotal = (q2 * (config.NORMAL_PRICE + 30000)) + (q5 * ALTERNATIVE_PRODUCT_CONFIG.REGULAR_PRICE);
  const savings = Math.max(0, regularTotal - total);

  let productName = config.PRODUCT_NAME;
  let shortName = "2-Flip-Up Double Burner";
  let itemsSummary = "";

  if (isCombo) {
    shortName = "Combo (2-Burner + 5-Burner)";
    productName = `COMBO: ${q2}x 2-Flip-Up (75×45cm) + ${q5}x 5-Burner Hybrid (90×51cm)`;
    itemsSummary = `${q2}x 2-Flip-Up Double Burner (75 × 45cm) + ${q5}x 5-Burner Hybrid Cooktop (90 × 51cm)`;
  } else if (q5 > 0) {
    shortName = "5-Burner Hybrid Cooktop";
    productName = `${ALTERNATIVE_PRODUCT_CONFIG.name} (90 × 51 cm)`;
    itemsSummary = `${q5}x 5-Burner Hybrid Cooktop (90 × 51cm)`;
  } else {
    shortName = "2-Flip-Up Double Burner";
    productName = `${config.PRODUCT_NAME} (75 × 45 cm)`;
    itemsSummary = `${q2}x 2-Flip-Up Double Burner (75 × 45cm)`;
  }

  const effectiveMode: '2-burner' | '5-burner' | 'combo' = isCombo ? 'combo' : (q5 > 0 ? '5-burner' : '2-burner');

  return {
    mode: effectiveMode,
    isCombo,
    qty2Burner: q2,
    qty5Burner: q5,
    totalQuantity: q2 + q5,
    unitPrice2Burner: unitPrice2,
    unitPrice5Burner: unitPrice5,
    subtotal2Burner: subtotal2,
    subtotal5Burner: subtotal5,
    comboDiscount,
    total,
    regularTotal,
    savings,
    productName,
    shortName,
    itemsSummary
  };
}

export function calculateProductPricing(
  model: '2-burner' | '5-burner' | 'combo',
  quantity: number,
  config: LandingPageConfig
) {
  const qty = Math.max(1, quantity);
  if (model === '5-burner') {
    const res = calculateCombinedPricing('5-burner', 0, qty, config);
    return {
      productName: res.productName,
      shortName: res.shortName,
      quantity: res.qty5Burner,
      pricePerUnit: res.unitPrice5Burner,
      total: res.total,
      regularTotal: res.regularTotal,
      savings: res.savings
    };
  } else if (model === 'combo') {
    const res = calculateCombinedPricing('combo', 1, 1, config);
    return {
      productName: res.productName,
      shortName: res.shortName,
      quantity: res.totalQuantity,
      pricePerUnit: res.total,
      total: res.total,
      regularTotal: res.regularTotal,
      savings: res.savings
    };
  } else {
    const res = calculateCombinedPricing('2-burner', qty, 0, config);
    return {
      productName: res.productName,
      shortName: res.shortName,
      quantity: res.qty2Burner,
      pricePerUnit: res.unitPrice2Burner,
      total: res.total,
      regularTotal: res.regularTotal,
      savings: res.savings
    };
  }
}

export function formatWhatsAppNumber(phoneNumber: string): string {
  let clean = phoneNumber.replace(/[^0-9]/g, "");
  if (clean.startsWith("0") && clean.length === 11) {
    clean = "234" + clean.slice(1);
  } else if (!clean.startsWith("234") && clean.length === 10) {
    clean = "234" + clean;
  }
  return clean;
}

export function generateWhatsAppLink(
  phoneNumber: string,
  productName: string,
  quantity: number = 1
): string {
  const cleanNumber = formatWhatsAppNumber(phoneNumber);
  let message = `Hello, I'm interested in the ${productName}. I would like to place an order.`;
  if (quantity > 1) {
    message += ` I would like to order ${quantity} unit(s).`;
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];
