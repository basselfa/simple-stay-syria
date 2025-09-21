import { Button } from "@/components/ui/button";
import { MapPin, User, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage);
  };

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Always on the left */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-secondary rounded-lg p-2">
              <img 
                src="/favicon.ico" 
                alt="StaySyria Logo" 
                className="h-6 w-6"
              />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl font-bold text-foreground">{t('header.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('header.subtitle')}</p>
            </div>
          </Link>

          {/* Language Switcher - Always on the right */}
          <div className="flex items-center space-x-2">
            <Button 
              variant={language === 'en' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </Button>
            <Button 
              variant={language === 'ar' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => handleLanguageChange('ar')}
            >
              العربية
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};