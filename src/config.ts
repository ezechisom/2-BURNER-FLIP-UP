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
      question: "5. Is it suitable for small kitchens?",
      answer: "Yes, its space-saving and compact countertop design makes it a practical choice for kitchens and apartments where counter space is at a premium."
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
      answer: "Simply scroll down to our Order Form, choose your desired quantity, fill in your delivery contact details, and click 'COMPLETE MY ORDER'. You can also order directly via WhatsApp."
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
    }
  ]
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
