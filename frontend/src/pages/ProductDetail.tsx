import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, ShoppingCart, Star, Shield, MessageCircle, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: "1",
    title: "Vintage Leather Jacket",
    price: 85,
    originalPrice: 250,
    category: "Fashion",
    condition: "Excellent",
    description: "Beautiful vintage leather jacket in excellent condition. Worn only a few times. Perfect for anyone looking to add a classic piece to their wardrobe. The jacket features genuine leather construction with a comfortable lining.",
    images: ["/placeholder-image-1.jpg", "/placeholder-image-2.jpg"],
    seller: {
      name: "Sarah M.",
      avatar: "SM",
      rating: 4.8,
      reviews: 23,
      joinedDate: "2022",
      location: "San Francisco, CA"
    },
    specifications: {
      brand: "Classic Leather Co.",
      size: "Medium",
      material: "Genuine Leather",
      color: "Brown"
    },
    shipping: {
      cost: "Free",
      time: "3-5 business days",
      returns: "14-day return policy"
    }
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      toast({
        title: "Added to cart!",
        description: `${product.title} has been added to your cart.`,
      });
    }, 1000);
  };

  const handleContactSeller = () => {
    toast({
      title: "Message sent!",
      description: "Your message has been sent to the seller.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-eco text-white">
                <span className="text-lg font-medium">Product Image</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-md overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground text-xs">
                    {i}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <Badge className="bg-success/20 text-success border-success/30">
                  {product.condition}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                <Badge variant="accent" className="text-xs">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </Badge>
              </div>

              <Badge variant="secondary">{product.category}</Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="hero" 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleContactSeller}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Seller
              </Button>
            </div>

            {/* Seller Info */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Seller Information</h3>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {product.seller.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{product.seller.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          {product.seller.rating} ({product.seller.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Member since {product.seller.joinedDate} • {product.seller.location}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-success">
                      <Shield className="h-4 w-4" />
                      <span>Verified Seller</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Shipping & Returns</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-medium text-success">{product.shipping.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery:</span>
                    <span>{product.shipping.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Returns:</span>
                    <span>{product.shipping.returns}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Description */}
          <Card className="border-0 shadow-card">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="border-0 shadow-card">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;