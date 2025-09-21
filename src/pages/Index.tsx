import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchForm, SearchData } from "@/components/SearchForm";
import { HotelCard, Hotel } from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Car, MapPin, Users, Star } from "lucide-react";
import { useHotels } from "@/hooks/useHotels";
import { useLanguage } from "@/contexts/LanguageContext";
import syriaHero from "@/assets/syria-hero.jpg";
import { GuestServices } from "@/components/GuestServices";

const Index = () => {
  const navigate = useNavigate();
  const { hotels, loading } = useHotels();
  const { t, isRTL } = useLanguage();
  
  const handleSearch = (data: SearchData) => {
    const params = new URLSearchParams();
    if (data.destination) params.set('destination', data.destination);
    if (data.checkIn) params.set('checkIn', data.checkIn.toISOString());
    if (data.checkOut) params.set('checkOut', data.checkOut.toISOString());
    params.set('guests', data.guests.toString());
    
    navigate(`/search?${params.toString()}`);
  };

  const handleHotelClick = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  // Convert Supabase hotel format to component format
  const featuredHotels = hotels.slice(0, 3).map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    location: hotel.location,
    rating: hotel.rating || 0,
    reviewCount: 0, // This would come from a reviews table
    price: hotel.price_per_night,
    currency: "USD",
    image: hotel.image_url || "/placeholder.svg",
    amenities: hotel.amenities || [],
    distance: ""
  }));

  const popularDestinations = [
    { name: "Damascus", hotels: 234, image: "/placeholder.svg" },
    { name: "Aleppo", hotels: 156, image: "/placeholder.svg" },
    { name: "Lattakia", hotels: 89, image: "/placeholder.svg" },
    { name: "Homs", hotels: 67, image: "/placeholder.svg" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${syriaHero})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 damascus-pattern opacity-10" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Hotels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Guests</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Hotels */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Hotels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of exceptional accommodations across Syria
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="text-center py-8">Loading hotels...</div>
            ) : (
              featuredHotels.map((hotel) => (
                <HotelCard 
                  key={hotel.id} 
                  hotel={hotel} 
                  onClick={() => handleHotelClick(hotel.id)}
                />
              ))
            )}
          </div>
        </div>
      </section> */}

      {/* Popular Destinations */}
      {/* <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground">
              Explore Syria's most beloved cities and regions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <div 
                key={destination.name}
                className="relative rounded-xl overflow-hidden card-hover cursor-pointer group"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">{destination.name}</h3>
                  <p className="text-sm text-white/80">{destination.hotels} hotels</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Services */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Guest Services</h2>
          <p className="text-muted-foreground mb-6">
            24/7 customer support to help you with bookings, special requests, and local recommendations.
          </p>
          <div className="space-y-2 text-muted-foreground">
            <p>+49 1577 2062066</p>
            <p>simplesstaysyria@gmail.com</p>
          </div>
        </div>
      </section> */}

      {/* Simple Guest Services */}
      <GuestServices />


    </div>
  );
};

export default Index;
