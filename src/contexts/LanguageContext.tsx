import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  getCityName: (cityName: string) => string;
  formatDate: (date: Date) => string;
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
    'search.hotels_in': 'Hotels in',
    'search.searching': 'Searching...',
    'search.properties_found': 'properties found',
    'search.filters': 'Filters',
    'search.sort_by': 'Sort by',
    'search.price_low_high': 'Price: Low to High',
    'search.price_high_low': 'Price: High to Low',
    'search.rating': 'Rating',
    'search.distance': 'Distance',
    
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
    
    // Guest Services
    'services.title': 'Guest Services',
    'services.description': '24/7 customer support to help you with bookings, special requests, and local recommendations.',
    'services.phone': '+49 1577 2062066',
    'services.email': 'simplesstaysyria@gmail.com',
    
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
    'city.daraa': 'Daraa',
    'city.sweida': 'Sweida',
    'city.quneitra': 'Quneitra',
    'city.hasaka': 'Hasaka',
    'city.kobani': 'Kobani',
    
    // Date/Month translations
    'date.jan': 'Jan',
    'date.feb': 'Feb', 
    'date.mar': 'Mar',
    'date.apr': 'Apr',
    'date.may': 'May',
    'date.jun': 'Jun',
    'date.jul': 'Jul',
    'date.aug': 'Aug',
    'date.sep': 'Sep',
    'date.oct': 'Oct',
    'date.nov': 'Nov',
    'date.dec': 'Dec',
    
    // Calendar menu translations
    'calendar.january': 'January',
    'calendar.february': 'February',
    'calendar.march': 'March',
    'calendar.april': 'April',
    'calendar.may': 'May',
    'calendar.june': 'June',
    'calendar.july': 'July',
    'calendar.august': 'August',
    'calendar.september': 'September',
    'calendar.october': 'October',
    'calendar.november': 'November',
    'calendar.december': 'December',
    
    'calendar.sunday': 'Sunday',
    'calendar.monday': 'Monday',
    'calendar.tuesday': 'Tuesday',
    'calendar.wednesday': 'Wednesday',
    'calendar.thursday': 'Thursday',
    'calendar.friday': 'Friday',
    'calendar.saturday': 'Saturday',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.search': 'Search',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
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
    'search.hotels_in': 'فنادق في',
    'search.searching': 'جاري البحث...',
    'search.properties_found': 'عقار موجود',
    'search.filters': 'المرشحات',
    'search.sort_by': 'ترتيب حسب',
    'search.price_low_high': 'السعر: من الأقل للأعلى',
    'search.price_high_low': 'السعر: من الأعلى للأقل',
    'search.rating': 'التقييم',
    'search.distance': 'المسافة',
    
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
    
    // Guest Services
    'services.title': 'خدمات الضيوف',
    'services.description': 'دعم العملاء على مدار الساعة لمساعدتك في الحجوزات والطلبات الخاصة والتوصيات المحلية.',
    'services.phone': '+49 1577 2062066',
    'services.email': 'simplesstaysyria@gmail.com',
    
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
    'city.daraa': 'درعا',
    'city.sweida': 'السويداء',
    'city.quneitra': 'القنيطرة',
    'city.hasaka': 'الحسكة',
    'city.kobani': 'كوباني',
    
    // Date/Month translations
    'date.jan': 'يناير',
    'date.feb': 'فبراير',
    'date.mar': 'مارس',
    'date.apr': 'أبريل',
    'date.may': 'مايو',
    'date.jun': 'يونيو',
    'date.jul': 'يوليو',
    'date.aug': 'أغسطس',
    'date.sep': 'سبتمبر',
    'date.oct': 'أكتوبر',
    'date.nov': 'نوفمبر',
    'date.dec': 'ديسمبر',
    
    // Calendar menu translations
    'calendar.january': 'يناير',
    'calendar.february': 'فبراير',
    'calendar.march': 'مارس',
    'calendar.april': 'أبريل',
    'calendar.may': 'مايو',
    'calendar.june': 'يونيو',
    'calendar.july': 'يوليو',
    'calendar.august': 'أغسطس',
    'calendar.september': 'سبتمبر',
    'calendar.october': 'أكتوبر',
    'calendar.november': 'نوفمبر',
    'calendar.december': 'ديسمبر',
    
    'calendar.sunday': 'الأحد',
    'calendar.monday': 'الإثنين',
    'calendar.tuesday': 'الثلاثاء',
    'calendar.wednesday': 'الأربعاء',
    'calendar.thursday': 'الخميس',
    'calendar.friday': 'الجمعة',
    'calendar.saturday': 'السبت',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ ما',
    'common.search': 'بحث',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
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
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Arabic number conversion
  const toArabicNumbers = (num: number): string => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Helper function to get city name in current language
  const getCityName = (cityName: string): string => {
    const cityKey = cityName.toLowerCase().replace(/\s+/g, '_');
    const translationKey = `city.${cityKey}`;
    const translated = t(translationKey);
    return translated !== translationKey ? translated : cityName;
  };

  // Helper function to format date in current language
  const formatDate = (date: Date): string => {
    if (language === 'ar') {
      const month = date.getMonth();
      const day = date.getDate();
      const monthNames = [
        t('date.jan'), t('date.feb'), t('date.mar'), t('date.apr'),
        t('date.may'), t('date.jun'), t('date.jul'), t('date.aug'),
        t('date.sep'), t('date.oct'), t('date.nov'), t('date.dec')
      ];
      return `${monthNames[month]} ${toArabicNumbers(day)}`;
    } else {
      return format(date, "MMM dd");
    }
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, getCityName, formatDate }}>
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