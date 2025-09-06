import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  category: string;
  image?: string;
  condition?: string;
  seller: string;
  onClick?: () => void;
}

const ProductCard = ({ 
  id, 
  title, 
  price, 
  category, 
  image, 
  condition = "Good", 
  seller, 
  onClick 
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    // Simulate API call
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1 bg-card"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square bg-muted rounded-t-lg overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-eco text-white">
              <span className="text-sm font-medium">No Image</span>
            </div>
          )}
          
          {/* Like Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background backdrop-blur-sm"
            onClick={handleLike}
          >
            <Heart 
              className={`h-4 w-4 ${isLiked ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} 
            />
          </Button>

          {/* Condition Badge */}
          <Badge className="absolute top-2 left-2 bg-success text-success-foreground">
            {condition}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">by {seller}</p>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <span className="text-lg font-bold text-primary">${price}</span>
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="accent"
            size="sm"
            className="w-full"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;