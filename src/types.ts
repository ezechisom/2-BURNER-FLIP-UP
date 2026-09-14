export type CookerModel = '2-burner' | '5-burner' | 'combo';

export interface ProductImageItem {
  id: string;
  title: string;
  caption: string;
  url: string;
  isPlaceholder?: boolean;
}

export interface ReviewItem {
  id: string;
  rating: number;
  content: string;
  author: string;
  location: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LandingPageConfig {
  PRODUCT_NAME: string;
  NORMAL_PRICE: number;
  PRICE_FOR_2: number;
  PRICE_FOR_3_PLUS: number;
  COUNTDOWN_HOURS: number;
  COUNTDOWN_END_DATE?: string;
  FORMSPREE_ENDPOINT?: string;
  META_PIXEL_ID?: string;
  WHATSAPP_NUMBER: string;
  PHONE_NUMBER: string;
  DELIVERY_INFORMATION: string;
  PAYMENT_INFORMATION: string;
  RETURN_POLICY: string;
  WARRANTY_INFORMATION: string;
  PRODUCT_IMAGES: ProductImageItem[];
  REVIEWS: ReviewItem[];
  FAQS: FAQItem[];
}

export interface OrderFormData {
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  deliveryAddress: string;
  city: string;
  state: string;
  email?: string;
  quantity: number;
  productModel?: CookerModel;
  qty2Burner?: number;
  qty5Burner?: number;
}

