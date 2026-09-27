import { LandingPageConfig } from './types';

export const INITIAL_CONFIG: LandingPageConfig = {
  PRODUCT_NAME: "5-BURNER BUILT-IN GAS + ELECTRIC HYBRID COOKTOP (WITH DIGITAL TIMER & AUTO-OFF)",
  NORMAL_PRICE: 280000,
  PRICE_FOR_2: 275000,
  PRICE_FOR_3_PLUS: 270000,
  COUNTDOWN_HOURS: 168, // 7 Days (7 x 24h = 168h) countdown
  COUNTDOWN_END_DATE: "", // Can be set to ISO date string e.g. "2026-10-15T23:59:59"
  FORMSPREE_ENDPOINT: "https://formspree.io/f/xljevqpk", // Formspree notification endpoint for orders
  META_PIXEL_ID: "947636671276929", // Official Meta Pixel ID for tracking
  WHATSAPP_NUMBER: "09136827730", // Configurable seller WhatsApp
  PHONE_NUMBER: "09136827730",    // Configurable seller Phone
  DELIVERY_INFORMATION: "FREE NATIONWIDE DELIVERY across all 36 Nigerian states and FCT Abuja. Delivery typically takes 1 to 3 business days. Our dispatch rider contacts you prior to arrival.",
  PAYMENT_INFORMATION: "PAYMENT ON DELIVERY available nationwide. Inspect your cooker physically upon delivery before making payment via cash or instant bank transfer.",
  RETURN_POLICY: "Every unit undergoes physical inspection prior to dispatch. If you notice any transit defect upon unboxing, contact our customer support team immediately for prompt resolution.",
  WARRANTY_INFORMATION: "12 MONTHS OFFICIAL WARRANTY included. Complete coverage with free replacement and repair guarantee against all manufacturer defects.",
  PRODUCT_IMAGES: [
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
      caption: "Panel: 900 × 510 mm (90 × 51 cm) • Cutout: 870 × 480 mm • Package: 970 × 570 × 250 mm. Fits standard modern kitchen cabinetry seamlessly.",
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
  REVIEWS: [
    {
      id: "rev-1",
      rating: 5,
      content:
        "This 5-burner hybrid cooktop is by far the most reliable appliance in my kitchen! Last week our gas cylinder ran out right in the middle of boiling egusi soup for a family dinner. Instead of panicking, I simply turned on the 2000W central electric ceramic plate and finished cooking seamlessly. The 90° flip-up burners make cleaning effortless—just lift and wipe. Delivered to Lekki, Lagos in less than 24 hours!",
      author: "Chief Mrs. Adeniyi",
      location: "Lekki Phase 1, Lagos"
    },
    {
      id: "rev-2",
      rating: 5,
      content:
        "The 90cm wide layout is massive and gives total freedom. We regularly cook jollof rice, pepper soup, fried plantains, and boil water simultaneously without any pots bumping into each other. The digital timer auto-off function gives me complete peace of mind when busy. Package arrived Abuja securely with zero scratch. Absolutely worth every naira!",
      author: "Engr. Kabir M.",
      location: "Maitama, Abuja"
    },
    {
      id: "rev-3",
      rating: 5,
      content:
        "I was sceptical about ordering such a high-end tempered glass cooktop online, but the build quality exceeded my expectations. The black bevelled glass looks breathtaking on our black granite kitchen counter. The electric zone heats up instantly and works with all our stainless steel and enamel pots. Customer care in Nigeria was very professional and courteous.",
      author: "Mrs. Nkechi O.",
      location: "GRA Phase 2, Port Harcourt"
    }
  ],
  FAQS: [
    {
      id: "faq-1",
      question: "1. What is the 5-Burner Built-In Gas + Electric Hybrid Cooktop?",
      answer: "The 5-Burner Hybrid Cooktop is an executive 900mm wide built-in cooktop featuring 4 high-heat gas burners armed with Flame Failure Devices (FFD) + 1 central 2000W radiant ceramic electric zone with 1–99 min digital countdown timer & automatic power cutoff, and 90° flip-up hinged burners for 10-second cleanups."
    },
    {
      id: "faq-ffd",
      question: "2. What is the Flame Failure Device (FFD) and how does it protect my kitchen?",
      answer: "The Flame Failure Device (FFD) is an essential safety system built into every gas burner. Each burner has a sensitive thermocouple probe. If a flame is blown out by wind or overflowing soup, the thermocouple detects the flameout within seconds and instantly snaps the electromagnetic gas valve shut. This prevents silent gas leakage, gas poisoning, and catastrophic fire explosions in your home."
    },
    {
      id: "faq-timer",
      question: "3. How does the Digital Countdown Timer and Automatic Cutoff work?",
      answer: "The cooktop features an illuminated digital LED touch panel allowing you to set precise cooking times from 1 to 99 minutes. Once set, you can comfortably leave the kitchen. The second the countdown reaches 00 minutes, the cooktop sounds an alert and completely cuts off electrical power to the 2000W ceramic plate. Overheat thermal sensors also prevent dry-boiling and burnt cookware."
    },
    {
      id: "faq-2",
      question: "4. How does the hybrid feature help if gas finishes or there is no light?",
      answer: "With dual-fuel engineering, you never get stranded. If NEPA takes light, use the 4 gas burners. If your gas cylinder finishes unexpectedly while cooking, simply power the 2000W central electric ceramic zone with electricity or generator to complete your meal smoothly."
    },
    {
      id: "faq-3",
      question: "5. What are the dimensions and countertop cutout size for the 5-Burner cooktop?",
      answer: "Top Panel Dimensions: 900 × 510 mm (90 × 51 cm). Countertop Cutout Requirement: 870 × 480 mm. Package Dimensions: 970 × 570 × 250 mm. It drops cleanly into standard kitchen cabinet openings."
    },
    {
      id: "faq-4",
      question: "6. Does the central electric ceramic plate require special induction pots?",
      answer: "No! The central 2000W burner uses radiant infrared ceramic technology, which is compatible with all flat-bottom cookware—including stainless steel, cast iron, aluminium, non-stick, and ceramic pots."
    },
    {
      id: "faq-5",
      question: "7. How does the 90° flip-up burner mechanism work?",
      answer: "The burner heads are mounted on reinforced articulated hinges. When oil, soup, or sauce spills over during cooking, simply lift the burner heads upright to wipe down the flat tempered glass surface in 10 seconds without having to dismantle any burner caps or parts."
    },
    {
      id: "faq-6",
      question: "8. How much is the 5-Burner Hybrid Cooktop?",
      answer: "Under our current promotional offer: 1 unit is ₦280,000 (regular price ₦350,000). For 2 units, you pay ₦275,000 each (Total: ₦550,000). For 3 or more units, you enjoy our wholesale rate of ₦270,000 each."
    },
    {
      id: "faq-7",
      question: "9. Do you also have a smaller 2-burner model for smaller kitchens?",
      answer: "Yes! Our alternative model is the 2-Flip-Up Double Gas Burner (75 × 45 cm panel size) priced at ₦170,000. It features 2 dedicated gas zones with 90° flip-up heads and an integrated timer, ideal for compact countertops or apartments."
    },
    {
      id: "faq-8",
      question: "10. Can I order both the 5-Burner and the 2-Burner cooktops at the same time?",
      answer: "Yes! In Step 1 of the Order Form, select 'ORDER BOTH (Combo Pack)'. You can order both models together and receive an automatic combo discount of ₦20,000 off your combined order, delivered together anywhere in Nigeria."
    },
    {
      id: "faq-9",
      question: "11. Do you deliver nationwide across Nigeria?",
      answer: "Yes, delivery is arranged across all 36 Nigerian states and the Federal Capital Territory (Abuja). Our dispatch team contacts you prior to delivery."
    },
    {
      id: "faq-10",
      question: "12. How long does delivery take?",
      answer: "Delivery typically takes between 1 to 3 business days depending on your delivery city and state. Our customer service representative will contact you with exact dispatch updates."
    },
    {
      id: "faq-11",
      question: "13. How do I place an order?",
      answer: "Simply scroll down to our Order Form, choose your desired product (5-Burner, 2-Burner, or Both together), enter your delivery contact details, and submit. You can also order directly via WhatsApp."
    },
    {
      id: "faq-12",
      question: "14. What is your return or inspection policy?",
      answer: "Every order is thoroughly inspected before dispatch. If you notice any defect upon unboxing, contact our customer support line immediately for swift resolution according to our store terms."
    }
  ]
};

// Alternative product is now the 2-Burner Double Gas Burner (75 × 45 cm)
export const ALTERNATIVE_PRODUCT_CONFIG = {
  id: "cooktop-2burner-flipup",
  name: "2-Flip-Up Double Gas Burner with Timer",
  shortName: "2-Flip-Up Double Burner",
  fullName: "2-Flip-Up Double Gas Burner with Timer (75 × 45 cm)",
  tagline: "Compact 75 × 45 cm Tabletop or Built-In Double Gas Cooktop",
  description:
    "Space-conscious 2-burner gas cooker featuring 90° flip-up burner heads on sleek tempered glass, dual 8-nozzle windproof burners, and built-in cooking timer for everyday home cooking.",
  NORMAL_PRICE: 170000,
  PRICE_FOR_2: 165000,
  PRICE_FOR_3_PLUS: 160000,
  REGULAR_PRICE: 200000,
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
  },
  images: [
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
  keyBenefits: [
    {
      title: "Space-Conscious 75 × 45 cm Footprint",
      desc: "Ideal for compact kitchens, rental apartments, or countertop setups while easily fitting 2 family-size pots.",
      badge: "75 × 45 cm"
    },
    {
      title: "90° Flip-Up Burner Heads",
      desc: "Burners lift upright on heavy-duty hinges for quick 30-second glass surface wiping without taking parts apart.",
      badge: "Easy Clean"
    },
    {
      title: "Integrated Cooking Timer",
      desc: "Built-in countdown timer ensures dishes like boiled yam, rice, or stews never overcook or burn.",
      badge: "Built-in Timer"
    },
    {
      title: "Pure Blue High-Heat Flame",
      desc: "Dual 8-nozzle windproof brass burner crowns deliver high combustion efficiency without black soot on pots.",
      badge: "Pure Blue Fire"
    }
  ]
};

export const TWO_BURNER_CONFIG = ALTERNATIVE_PRODUCT_CONFIG;

export const FIVE_BURNER_CONFIG = {
  id: "cooktop-5burner-hybrid",
  name: "5-Burner Built-In Gas + Electric Cooktop",
  shortName: "5-Burner Hybrid Cooktop",
  fullName: "5-Burner Built-In Gas + Electric Cooktop (with Digital Timer & Auto-Off)",
  tagline: "4 High-Power Gas Burners + 1 Central 2000W Radiant Electric Zone",
  description:
    "Executive 5-zone hybrid cooktop combining 4 gas burners with a heavy-duty 2000W central electric ceramic plate, integrated digital timer with automatic shutoff, and 90° flip-up hinged burners for 1-wipe cleanups.",
  NORMAL_PRICE: 280000,
  PRICE_FOR_2: 275000,
  PRICE_FOR_3_PLUS: 270000,
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
  const regularTotal = qty * 350000;
  const savings = regularTotal - total;

  return {
    quantity: qty,
    pricePerUnit,
    total,
    regularTotal,
    savings
  };
}

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
  if (mode === '5-burner') {
    q5 = Math.max(1, q5);
    q2 = 0;
  } else if (mode === '2-burner') {
    q2 = Math.max(1, q2);
    q5 = 0;
  } else if (mode === 'combo') {
    q5 = Math.max(1, q5);
    q2 = Math.max(1, q2);
  }

  // 5-Burner (Main Flagship Product) tiered pricing
  let unitPrice5 = config.NORMAL_PRICE; // 280,000
  if (q5 === 1) unitPrice5 = config.NORMAL_PRICE;
  else if (q5 === 2) unitPrice5 = config.PRICE_FOR_2; // 275,000
  else if (q5 === 3) unitPrice5 = config.PRICE_FOR_3_PLUS; // 270,000
  else if (q5 >= 4) unitPrice5 = 265000; // Best tier

  // 2-Burner (Alternative Compact Product) tiered pricing
  let unitPrice2 = ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE; // 170,000
  if (q2 === 1) unitPrice2 = ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE;
  else if (q2 === 2) unitPrice2 = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_2; // 165,000
  else if (q2 >= 3) unitPrice2 = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_3_PLUS; // 160,000

  const subtotal5 = q5 * unitPrice5;
  const subtotal2 = q2 * unitPrice2;

  const isCombo = q5 > 0 && q2 > 0;
  // Special bonus incentive when ordering both simultaneously: ₦20,000 combo discount!
  const comboDiscount = isCombo ? 20000 : 0;

  const total = Math.max(0, subtotal5 + subtotal2 - comboDiscount);
  const regularTotal = (q5 * 350000) + (q2 * ALTERNATIVE_PRODUCT_CONFIG.REGULAR_PRICE);
  const savings = Math.max(0, regularTotal - total);

  let productName = config.PRODUCT_NAME;
  let shortName = "5-Burner Hybrid Cooktop";
  let itemsSummary = "";

  if (isCombo) {
    shortName = "Combo (5-Burner + 2-Burner)";
    productName = `COMBO: ${q5}x 5-Burner Hybrid (90×51cm) + ${q2}x 2-Flip-Up (75×45cm)`;
    itemsSummary = `${q5}x 5-Burner Hybrid Cooktop (90 × 51cm) + ${q2}x 2-Flip-Up Double Burner (75 × 45cm)`;
  } else if (q2 > 0 && q5 === 0) {
    shortName = "2-Flip-Up Double Burner";
    productName = `${ALTERNATIVE_PRODUCT_CONFIG.fullName}`;
    itemsSummary = `${q2}x 2-Flip-Up Double Burner (75 × 45cm)`;
  } else {
    shortName = "5-Burner Hybrid Cooktop";
    productName = `${config.PRODUCT_NAME} (90 × 51 cm)`;
    itemsSummary = `${q5}x 5-Burner Hybrid Cooktop (90 × 51cm)`;
  }

  const effectiveMode: '2-burner' | '5-burner' | 'combo' = isCombo ? 'combo' : (q2 > 0 && q5 === 0 ? '2-burner' : '5-burner');

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

export interface DeliveryTimelineInfo {
  days: string;
  badge: string;
  note: string;
}

export const STATE_DELIVERY_TIMELINES: Record<string, DeliveryTimelineInfo> = {
  "Lagos": {
    days: "Same Day or 24 Hours",
    badge: "⚡ Super-Fast Delivery",
    note: "Dispatched direct from central warehouse via express local courier."
  },
  "Ogun": {
    days: "1 - 2 Business Days",
    badge: "🚀 Express Delivery",
    note: "Direct interstate courier to Abeokuta, Sagamu, Ota, Ijebu-Ode and environs."
  },
  "Oyo": {
    days: "1 - 2 Business Days",
    badge: "🚀 Express Delivery",
    note: "Fast dispatch to Ibadan, Ogbomoso, Oyo town and surrounding locations."
  },
  "FCT - Abuja": {
    days: "1 - 2 Business Days",
    badge: "🚀 Express Delivery",
    note: "Priority interstate air/express dispatch to Central Area, Garki, Wuse, Maitama, Gwarinpa, Kubwa & environs."
  },
  "Rivers": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Dedicated doorstep delivery to Port Harcourt, Obio-Akpor, Eleme and environs."
  },
  "Delta": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Prompt dispatch to Warri, Asaba, Sapele, Ughelli and environs."
  },
  "Edo": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Doorstep delivery to Benin City, Ekpoma, Auchi and environs."
  },
  "Anambra": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Onitsha, Awka, Nnewi and all major commercial hubs."
  },
  "Enugu": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Doorstep delivery to Enugu Metropolis, Nsukka and environs."
  },
  "Imo": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Owerri, Orlu, Okigwe and surrounding areas."
  },
  "Abia": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Fast courier delivery to Aba, Umuahia and environs."
  },
  "Akwa Ibom": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Uyo, Eket, Ikot Ekpene and environs."
  },
  "Cross River": {
    days: "2 - 4 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Calabar, Ikom, Ogoja and environs."
  },
  "Bayelsa": {
    days: "2 - 4 Business Days",
    badge: "🚚 Standard Courier",
    note: "Courier dispatch to Yenagoa and surrounding towns."
  },
  "Ebonyi": {
    days: "2 - 4 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Abakaliki, Afikpo and environs."
  },
  "Osun": {
    days: "1 - 2 Business Days",
    badge: "🚀 Express Delivery",
    note: "Delivery to Osogbo, Ile-Ife, Ilesa, Ede and environs."
  },
  "Ondo": {
    days: "1 - 2 Business Days",
    badge: "🚀 Express Delivery",
    note: "Delivery to Akure, Ondo town, Owo and environs."
  },
  "Ekiti": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Ado-Ekiti, Ikere and environs."
  },
  "Kwara": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Ilorin, Offa and environs."
  },
  "Kogi": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Lokoja, Okene, Kabba and environs."
  },
  "Niger": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Minna, Suleja, Bida and environs."
  },
  "Plateau": {
    days: "2 - 4 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Jos, Bukuru and environs."
  },
  "Nasarawa": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Lafia, Karu, Keffi and environs."
  },
  "Benue": {
    days: "2 - 4 Business Days",
    badge: "🚚 Standard Courier",
    note: "Delivery to Makurdi, Otukpo, Gboko and environs."
  },
  "Kaduna": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Direct delivery to Kaduna City, Zaria, Kafanchan and environs."
  },
  "Kano": {
    days: "2 - 3 Business Days",
    badge: "🚚 Standard Courier",
    note: "Direct delivery to Kano Metropolis, Fagge, Nassarawa and environs."
  },
  "Katsina": {
    days: "3 - 4 Business Days",
    badge: "🚚 Standard Courier",
    note: "Courier delivery to Katsina, Daura, Funtua and environs."
  },
  "Sokoto": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Express interstate dispatch to Sokoto and environs."
  },
  "Kebbi": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Express interstate dispatch to Birnin Kebbi and environs."
  },
  "Zamfara": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Courier to Gusau and surrounding areas."
  },
  "Jigawa": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Courier to Dutse, Hadejia and environs."
  },
  "Bauchi": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Courier to Bauchi City, Azare and environs."
  },
  "Gombe": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Courier to Gombe City and environs."
  },
  "Adamawa": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Courier to Yola, Jimeta, Mubi and environs."
  },
  "Taraba": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Courier to Jalingo, Wukari and environs."
  },
  "Yobe": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Courier to Damaturu, Potiskum and environs."
  },
  "Borno": {
    days: "3 - 5 Business Days",
    badge: "📦 Nationwide Dispatch",
    note: "Courier to Maiduguri and accessible delivery points."
  }
};

export function getStateDeliveryTimeline(state: string): DeliveryTimelineInfo {
  return STATE_DELIVERY_TIMELINES[state] || {
    days: "2 - 4 Business Days",
    badge: "🚚 Standard Delivery",
    note: "Dispatched promptly via verified courier. Doorstep delivery with payment on delivery."
  };
}
