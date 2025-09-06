import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ChatBot from "@/components/ChatBot";
import { Recycle, Leaf, Users, TrendingUp, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-marketplace.jpg";

const Home = () => {
  const navigate = useNavigate();

  // Mock featured products
  const featuredProducts = [
    { id: "1", title: "Vintage Leather Jacket", price: 85, category: "Fashion", condition: "Excellent", seller: "Sarah M." },
    { id: "2", title: "iPhone 12 Pro Max", price: 650, category: "Electronics", condition: "Good", seller: "Alex K." },
    { id: "3", title: "Wooden Coffee Table", price: 120, category: "Furniture", condition: "Very Good", seller: "Mike D." },
    { id: "4", title: "Designer Handbag", price: 200, category: "Fashion", condition: "Like New", seller: "Emma R." },
  ];

  const stats = [
    { icon: Recycle, label: "Items Saved", value: "200K+" },
    { icon: TrendingUp, label: "CO2 Reduced", value: "500T+" },
    { icon: Leaf, label: "Eco Impact", value: "95%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-success/10 text-success border-success/20">
                <Leaf className="h-4 w-4 mr-1" />
                Sustainable Living
              </Badge>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Find Your Next</span>
                  <span className="bg-gradient-eco bg-clip-text text-transparent block">Sustainable</span>
                  <span className="text-foreground">Treasure</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Join thousands discovering amazing pre-loved items while reducing waste and supporting a circular economy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="accent"
                  onClick={() => navigate("/browse")}
                  className="group"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/sell")}
                >
                  Sell Your Items
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Sustainable marketplace community"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-white shadow-card hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Finds
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover curated second-hand treasures from our community of conscious sellers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/browse")}
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              How EcoFinds Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to sustainable shopping
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse & Discover",
                description: "Explore thousands of pre-loved items from trusted sellers in your community"
              },
              {
                step: "2", 
                title: "Shop Safely",
                description: "Secure payments and buyer protection ensure a safe shopping experience"
              },
              {
                step: "3",
                title: "Make a Difference",
                description: "Every purchase helps reduce waste and supports sustainable living"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 bg-white shadow-card hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-eco text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-eco">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Ready to Start Your Sustainable Journey?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join our community of conscious consumers and sellers making a positive impact on the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate("/signup")}
              >
                Join EcoFinds Today
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Home;