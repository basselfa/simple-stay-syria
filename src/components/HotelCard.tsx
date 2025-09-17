import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Car, Coffee } from "lucide-react";

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  image: string;
  amenities: string[];
  distance?: string;
}

interface HotelCardProps {
  hotel: Hotel;
  onClick: (hotel: Hotel) => void;
}

export const HotelCard = ({ hotel, onClick }: HotelCardProps) => {
  const amenityIcons: Record<string, JSX.Element> = {
    wifi: <Wifi className="h-4 w-4" />,
    parking: <Car className="h-4 w-4" />,
    breakfast: <Coffee className="h-4 w-4" />,
  };

  return (
    <Card 
      className="card-hover cursor-pointer overflow-hidden border border-border/20"
      onClick={() => onClick(hotel)}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">
              {hotel.name}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {hotel.location}
              {hotel.distance && <span className="ml-2">• {hotel.distance}</span>}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 ml-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm">{hotel.rating}</span>
            <span className="text-xs text-muted-foreground">({hotel.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenityIcons[amenity] || <span>{amenity}</span>}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-primary">
              {hotel.price} {hotel.currency}
            </span>
            <span className="text-sm text-muted-foreground ml-1">/ night</span>
          </div>
          
          <Button size="sm" className="bg-primary hover:bg-primary-hover">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};