import { useLanguage } from "@/contexts/LanguageContext";

export const GuestServices = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 py-12 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">{t('services.title')}</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {t('services.description')}
        </p>
        
        <div className="space-y-2">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto" dir="ltr">
             {t('services.phone')}
          </p>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto" dir="ltr">
            {t('services.email')}
          </p>
        </div>
      </div>
    </div>
  );
}; 