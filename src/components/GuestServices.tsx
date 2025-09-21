import { useLanguage } from "@/contexts/LanguageContext";

export const GuestServices = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('services.title')}</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {t('services.description')}
        </p>
        
        <div className="space-y-2 max-w-md mx-auto">
          <p className="text-lg font-semibold flex items-center justify-center" dir="ltr">
            <span className="mr-2">📞</span>
            <span>{t('services.phone')}</span>
          </p>
          <p className="text-lg font-semibold flex items-center justify-center" dir="ltr">
            <span className="mr-2">✉️</span>
            <span>{t('services.email')}</span>
          </p>
        </div>
      </div>
    </div>
  );
}; 