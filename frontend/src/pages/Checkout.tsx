import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  MapPin,
  CheckCircle,
  Leaf
} from "lucide-react";

interface CheckoutItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  seller: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Mock cart items
  const cartItems: CheckoutItem[] = [
    { id: "1", title: "iPhone 12 Pro Max", price: 650, quantity: 1, seller: "Alex K." },
    { id: "2", title: "Gaming Laptop", price: 800, quantity: 1, seller: "John P." },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === "express" ? 15 : shippingMethod === "standard" ? 8 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const ecoSavings = Math.round(total * 0.4); // 40% savings vs new

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States"
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });

  const handleProcessOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-surface">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto shadow-card bg-gradient-to-br from-success/5 to-accent/5">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-success mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for choosing sustainable shopping with EcoFinds
              </p>
              
              <div className="bg-white/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-accent font-semibold">
                  <Leaf className="h-5 w-5" />
                  <span>You saved ${ecoSavings} and helped reduce waste!</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm text-muted-foreground">Order Number: #ECO{Date.now()}</p>
                <p className="text-sm text-muted-foreground">
                  Confirmation sent to {shippingInfo.email}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="accent" onClick={() => navigate("/profile")}>
                  View Order Details
                </Button>
                <Button variant="outline" onClick={() => navigate("/browse")}>
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/cart")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Cart</span>
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <Card className="shadow-card">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Shipping Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input 
                      id="zipCode" 
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card className="shadow-card">
              <CardHeader className="bg-gradient-to-r from-coral/5 to-warm-yellow/5">
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-coral" />
                  <span>Shipping Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <div>
                        <Label htmlFor="pickup" className="font-medium">Local Pickup</Label>
                        <p className="text-sm text-muted-foreground">Arrange pickup with seller</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label htmlFor="standard" className="font-medium">Standard Shipping</Label>
                        <p className="text-sm text-muted-foreground">5-7 business days</p>
                      </div>
                    </div>
                    <Badge>$8.00</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label htmlFor="express" className="font-medium">Express Shipping</Label>
                        <p className="text-sm text-muted-foreground">2-3 business days</p>
                      </div>
                    </div>
                    <Badge className="bg-coral text-coral-foreground">$15.00</Badge>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="shadow-card">
              <CardHeader className="bg-gradient-to-r from-accent/5 to-success/5">
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-accent" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input 
                        id="expiryDate" 
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input 
                        id="cvv" 
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input 
                        id="nameOnCard" 
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-card bg-gradient-to-b from-white to-muted/20">
              <CardHeader className="bg-gradient-warm text-warm-yellow-foreground">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">by {item.seller}</p>
                    </div>
                    <span className="font-medium">${item.price}</span>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-success/10 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-success text-sm font-medium">
                    <Leaf className="h-4 w-4" />
                    <span>Eco Savings: ${ecoSavings} vs buying new!</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Trust */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Your payment is secure</span>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Checkbox id="terms" checked disabled />
                    <label htmlFor="terms">Buyer Protection Guarantee</label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Checkbox id="returns" checked disabled />
                    <label htmlFor="returns">30-day return policy</label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Checkbox id="secure" checked disabled />
                    <label htmlFor="secure">SSL encrypted checkout</label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full" 
              size="lg"
              variant="accent"
              onClick={handleProcessOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Complete Order - $${total.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;