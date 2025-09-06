import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Users, 
  Recycle, 
  Shield, 
  Heart, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle,
  Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "Every transaction on EcoFinds extends product lifecycles and reduces environmental impact."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We foster a trusted community of conscious buyers and sellers making responsible choices."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Advanced verification systems and secure payments ensure a safe marketplace experience."
    },
    {
      icon: Heart,
      title: "Quality Focused",
      description: "Every item is carefully reviewed and condition-rated to ensure you get exactly what you expect."
    }
  ];

  const stats = [
    { icon: Recycle, value: "200K+", label: "Items Given New Life" },
    { icon: Globe, value: "500T+", label: "CO2 Emissions Prevented" },
    { icon: Users, value: "50K+", label: "Happy Community Members" },
    { icon: TrendingUp, value: "95%", label: "Customer Satisfaction" }
  ];

  const features = [
    "Verified seller profiles and ratings",
    "Quality-checked product listings",
    "Secure payment protection",
    "Carbon footprint tracking",
    "Local pickup and delivery options",
    "Mobile-first responsive design",
    "Advanced search and filtering",
    "AI-powered recommendations"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            <Leaf className="h-4 w-4 mr-1" />
            About EcoFinds
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Empowering Sustainable
            <span className="text-accent block">Consumption</span>
          </h1>
          
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
            EcoFinds is more than just a marketplace – we're a movement towards sustainable living. 
            Our platform connects conscious consumers with quality pre-loved items, creating a 
            circular economy that benefits everyone and our planet.
          </p>

          <Button 
            variant="accent" 
            size="lg" 
            onClick={() => navigate("/browse")}
            className="group"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              To create a vibrant and trusted platform that revolutionizes how people buy and sell 
              pre-owned goods. We're fostering a culture of sustainability by extending product lifecycles, 
              reducing waste, and providing an accessible alternative to purchasing new items. EcoFinds 
              envisions becoming the go-to destination for conscious consumers seeking unique finds 
              and responsible consumption.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by these core principles that drive our commitment to sustainability and community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-card border-0 hover:shadow-hover transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-eco text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Together, our community has made a significant positive impact on the environment
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-card border-0">
                <CardContent className="p-6">
                  <stat.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">How EcoFinds Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes sustainable shopping simple and secure for everyone
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">For Buyers</h3>
              <div className="space-y-4">
                {[
                  "Browse thousands of verified pre-loved items",
                  "Filter by category, price, condition, and location", 
                  "View detailed photos and seller ratings",
                  "Secure messaging with sellers",
                  "Protected payments and buyer guarantee",
                  "Track your environmental impact"
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">For Sellers</h3>
              <div className="space-y-4">
                {[
                  "Create listings in minutes with our easy tools",
                  "Professional photo guidelines and tips",
                  "Set competitive prices with market insights",
                  "Communicate directly with interested buyers",
                  "Secure payment processing and seller protection",
                  "Build your seller reputation and following"
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Platform Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology to provide the best sustainable shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-card p-3 rounded-lg shadow-card">
                <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Join the Sustainable Revolution
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Be part of a community that's making conscious choices for a better tomorrow. 
              Every item you buy or sell on EcoFinds contributes to a more sustainable world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="accent"
                onClick={() => navigate("/signup")}
              >
                Get Started Today
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/browse")}
              >
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;