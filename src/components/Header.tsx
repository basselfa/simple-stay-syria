import { Button } from "@/components/ui/button";
import { MapPin, User, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-secondary rounded-lg p-2">
              {/* <MapPin className="h-6 w-6 text-primary-foreground" /> */}
              <img 
                src="/favicon.ico" 
                alt="StaySyria Logo" 
                className="h-6 w-6"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SimpleStaySyria</h1>
              <p className="text-xs text-muted-foreground">Discover Syria</p>
            </div>
          </Link>

          {/* Navigation
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/hotels" className="text-foreground hover:text-primary transition-colors">
              Hotels
            </Link>
            <Link to="/rides" className="text-foreground hover:text-primary transition-colors">
              Rides
            </Link>
            <Link to="/destinations" className="text-foreground hover:text-primary transition-colors">
              Destinations
            </Link>
          </nav> */}

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              {/* <Globe className="h-4 w-4 mr-2" /> */}
              EN
            </Button>
            <Button variant="ghost" size="sm">
              AR
            </Button>
            {/* <Link to="/auth">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};