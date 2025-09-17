import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchForm, SearchData } from "@/components/SearchForm";
import { HotelCard, Hotel } from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Car, MapPin, Users, Star } from "lucide-react";
import syriaHero from "@/assets/syria-hero.jpg";
import damascusHotel from "@/assets/damascus-hotel.jpg";
import aleppoHotel from "@/assets/aleppo-hotel.jpg";
import lattakiaResort from "@/assets/lattakia-resort.jpg";

const Index = () => {
  const navigate = useNavigate();
  
  const handleSearch = (data: SearchData) => {
    console.log("Search data:", data);
    // Navigate to search results
    navigate(`/search?destination=${data.destination}&type=${data.type}`);
  };

  const handleHotelClick = (hotel: Hotel) => {
    navigate(`/hotel/${hotel.id}`);
  };

  // Sample hotels data
  const featuredHotels: Hotel[] = [
    {
      id: "1",
      name: "Damascus Palace Hotel",
      location: "Old City, Damascus",
      rating: 4.5,
      reviewCount: 234,
      price: 85,
      currency: "USD",
      image: damascusHotel,
      amenities: ["wifi", "parking", "breakfast"],
      distance: "0.5 km from center"
    },
    {
      id: "2", 
      name: "Aleppo Heritage Suites",
      location: "Historic Quarter, Aleppo",
      rating: 4.3,
      reviewCount: 189,
      price: 65,
      currency: "USD",
      image: aleppoHotel,
      amenities: ["wifi", "breakfast"],
      distance: "0.8 km from center"
    },
    {
      id: "3",
      name: "Lattakia Seaside Resort",
      location: "Mediterranean Coast, Lattakia",
      rating: 4.7,
      reviewCount: 312,
      price: 120,
      currency: "USD", 
      image: lattakiaResort,
      amenities: ["wifi", "parking", "breakfast"],
      distance: "Beachfront"
    }
  ];

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
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${syriaHero})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 damascus-pattern opacity-10" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Discover Syria
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the rich history, warm hospitality, and breathtaking landscapes of Syria. 
            Find hotels, book rides, and create unforgettable memories.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
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
      </section>

      {/* Featured Hotels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Hotels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of exceptional accommodations across Syria
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard 
                key={hotel.id} 
                hotel={hotel} 
                onClick={handleHotelClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-muted/30">
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
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground">
              Everything you need for your journey in Syria
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 border border-border/20">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Hotel Booking</h3>
              <p className="text-muted-foreground mb-4">
                Find and book the perfect accommodation from budget-friendly options to luxury hotels across Syria.
              </p>
              <Button variant="outline">Explore Hotels</Button>
            </div>
            
            <div className="bg-card rounded-xl p-8 border border-border/20">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Transportation</h3>
              <p className="text-muted-foreground mb-4">
                Book reliable taxis, private drivers, and transportation services to get around safely and comfortably.
              </p>
              <Button variant="outline">Book Rides</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
