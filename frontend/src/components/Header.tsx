import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Leaf, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">EcoFinds</span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search for sustainable finds..."
                className="pl-10 bg-background/80"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/browse")}>
              Browse
            </Button>
            <Button variant="ghost" onClick={() => navigate("/sell")}>
              Sell
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/cart")}>
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
              <User className="h-5 w-5" />
            </Button>
            <Button variant="hero" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for sustainable finds..."
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start" onClick={() => navigate("/browse")}>
                  Browse
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => navigate("/sell")}>
                  Sell
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => navigate("/cart")}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => navigate("/profile")}>
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Button>
                <Button variant="hero" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;