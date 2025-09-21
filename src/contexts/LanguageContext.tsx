import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  getCityName: (cityName: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Header
    'header.title': 'SimpleStaySyria',
    'header.subtitle': 'Discover Syria',
    
    // Hero Section
    'hero.title': 'Discover Syria',
    'hero.subtitle': 'Experience the rich history, warm hospitality, and breathtaking landscapes of Syria. Find hotels, book rides, and create unforgettable memories.',
    
    // Search Form
    'search.destination': 'Where are you going?',
    'search.checkin': 'Check-in',
    'search.checkout': 'Check-out',
    'search.guests': 'Guests',
    'search.button': 'Search Hotels',
    
    // Home Page
    'home.hero.title': 'Discover the Beauty of Syria',
    'home.hero.subtitle': 'Book your perfect stay in Syria\'s most beautiful cities',
    'home.featured.title': 'Featured Hotels',
    'home.destinations.title': 'Popular Destinations',
    'home.destinations.hotels': 'hotels',
    
    // Hotel Card
    'hotel.rating': 'Rating',
    'hotel.reviews': 'reviews',
    'hotel.per_night': 'per night',
    'hotel.view_details': 'View Details',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.search': 'Search',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    
    // Guest Services
    'services.title': 'Guest Services',
    'services.description': '24/7 customer support to help you with bookings, special requests, and local recommendations.',
    'services.phone': '+4915772062066',
    'services.email': 'simplestaysyria@gmail.com',
    
    // Search Results
    'search.hotels_in': 'Hotels in',
    'search.searching': 'Searching...',
    'search.properties_found': 'properties found',
    'search.filters': 'Filters',
    'search.sort_by': 'Sort by',
    'search.price_low_high': 'Price: Low to High',
    'search.price_high_low': 'Price: High to Low',
    'search.rating': 'Rating',
    'search.distance': 'Distance',
    
    // Cities
    'city.syria': 'Syria',
    'city.damascus': 'Damascus',
    'city.aleppo': 'Aleppo',
    'city.lattakia': 'Lattakia',
    'city.homs': 'Homs',
    'city.hama': 'Hama',
    'city.tartus': 'Tartus',
    'city.deir_ezzor': 'Deir ez-Zor',
    'city.raqqa': 'Raqqa',
    'city.idlib': 'Idlib',
  },
  ar: {
    // Header
    'header.title': 'سيمبل ستي سوريا',
    'header.subtitle': 'اكتشف سوريا',
    
    // Hero Section
    'hero.title': 'اكتشف سوريا',
    'hero.subtitle': 'استمتع بالتاريخ الغني والضيافة الدافئة والمناظر الطبيعية الخلابة في سوريا. اعثر على الفنادق واحجز الرحلات واصنع ذكريات لا تُنسى.',
    
    // Search Form
    'search.destination': 'إلى أين تذهب؟',
    'search.checkin': 'تاريخ الوصول',
    'search.checkout': 'تاريخ المغادرة',
    'search.guests': 'الضيوف',
    'search.button': 'البحث عن الفنادق',
    
    // Home Page
    'home.hero.title': 'اكتشف جمال سوريا',
    'home.hero.subtitle': 'احجز إقامتك المثالية في أجمل مدن سوريا',
    'home.featured.title': 'الفنادق المميزة',
    'home.destinations.title': 'الوجهات الشائعة',
    'home.destinations.hotels': 'فندق',
    
    // Hotel Card
    'hotel.rating': 'التقييم',
    'hotel.reviews': 'تقييم',
    'hotel.per_night': 'في الليلة',
    'hotel.view_details': 'عرض التفاصيل',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ ما',
    'common.search': 'بحث',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    
    // Guest Services
    'services.title': 'خدمات الضيوف',
    'services.description': 'دعم العملاء على مدار الساعة لمساعدتك في الحجوزات والطلبات الخاصة والتوصيات المحلية.',
    'services.phone': '+4915772062066',
    'services.email': 'simplestaysyria@gmail.com',
    
    // Search Results
    'search.hotels_in': 'فنادق في',
    'search.searching': 'جاري البحث...',
    'search.properties_found': 'عقار موجود',
    'search.filters': 'المرشحات',
    'search.sort_by': 'ترتيب حسب',
    'search.price_low_high': 'السعر: من الأقل للأعلى',
    'search.price_high_low': 'السعر: من الأعلى للأقل',
    'search.rating': 'التقييم',
    'search.distance': 'المسافة',
    
    // Cities
    'city.syria': 'سوريا',
    'city.damascus': 'دمشق',
    'city.aleppo': 'حلب',
    'city.lattakia': 'اللاذقية',
    'city.homs': 'حمص',
    'city.hama': 'حماة',
    'city.tartus': 'طرطوس',
    'city.deir_ezzor': 'دير الزور',
    'city.raqqa': 'الرقة',
    'city.idlib': 'إدلب',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Helper function to get city name in current language
  const getCityName = (cityName: string): string => {
    const cityKey = cityName.toLowerCase().replace(/\s+/g, '_');
    const translationKey = `city.${cityKey}`;
    const translated = t(translationKey);
    
    // If translation exists, return it, otherwise return original
    return translated !== translationKey ? translated : cityName;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, getCityName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 