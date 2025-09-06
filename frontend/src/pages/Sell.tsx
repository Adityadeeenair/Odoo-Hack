import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  Camera,
  CheckCircle,
  DollarSign,
  Tag,
  Package
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductForm {
  title: string;
  description: string;
  category: string;
  condition: string;
  price: string;
  images: string[];
}

const Sell = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProductForm>({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Electronics",
    "Fashion",
    "Furniture",
    "Books",
    "Sports & Recreation",
    "Home & Garden",
    "Toys & Games",
    "Automotive",
    "Other"
  ];

  const conditions = [
    { value: "like-new", label: "Like New", description: "Barely used, no visible wear" },
    { value: "excellent", label: "Excellent", description: "Minor signs of use, works perfectly" },
    { value: "good", label: "Good", description: "Normal wear, fully functional" },
    { value: "fair", label: "Fair", description: "Noticeable wear, some imperfections" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.condition || !formData.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Listing Created!",
        description: "Your item has been successfully listed on EcoFinds",
      });
      navigate("/profile");
    }, 2000);
  };

  const addImagePlaceholder = () => {
    if (formData.images.length < 5) {
      setFormData({
        ...formData,
        images: [...formData.images, `placeholder-${formData.images.length + 1}`]
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            Sell Your Item
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span>Item Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title" className="text-foreground font-medium">
                        Item Title *
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., iPhone 12 Pro Max 256GB"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>

                    {/* Category & Condition */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-foreground font-medium">Category *</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => setFormData({...formData, category: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-foreground font-medium">Condition *</Label>
                        <Select 
                          value={formData.condition} 
                          onValueChange={(value) => setFormData({...formData, condition: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map((condition) => (
                              <SelectItem key={condition.value} value={condition.value}>
                                <div>
                                  <div className="font-medium">{condition.label}</div>
                                  <div className="text-sm text-muted-foreground">{condition.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="description" className="text-foreground font-medium">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your item's features, condition, and any flaws..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <Label htmlFor="price" className="text-foreground font-medium">
                        Price *
                      </Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Set a competitive price. Research similar items for the best results.
                      </p>
                    </div>

                    {/* Images */}
                    <div>
                      <Label className="text-foreground font-medium">Photos</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Add up to 5 photos. First photo will be the main image.
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                              <div className="text-center">
                                <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                <span className="text-sm text-muted-foreground">Photo {index + 1}</span>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        
                        {formData.images.length < 5 && (
                          <Button
                            type="button"
                            variant="outline"
                            className="aspect-square border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5"
                            onClick={addImagePlaceholder}
                          >
                            <div className="text-center">
                              <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
                              <span className="text-sm text-primary">Add Photo</span>
                            </div>
                          </Button>
                        )}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Listing..." : "List My Item"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview Card */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Listing Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {formData.title || "Item Title"}
                    </h3>
                    <p className="text-2xl font-bold text-primary">
                      ${formData.price || "0.00"}
                    </p>
                    {formData.condition && (
                      <Badge variant="secondary" className="mt-2">
                        {conditions.find(c => c.value === formData.condition)?.label}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tips Card */}
              <Card className="shadow-card bg-gradient-to-b from-success/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Selling Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    <p>Use clear, well-lit photos from multiple angles</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    <p>Be honest about condition and any flaws</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    <p>Research similar items to price competitively</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    <p>Respond quickly to buyer messages</p>
                  </div>
                </CardContent>
              </Card>

              {/* Fees Card */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Tag className="h-5 w-5 text-primary" />
                    <span>Selling Fees</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Listing Fee</span>
                    <span className="text-success font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Fee</span>
                    <span>5% when sold</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Processing</span>
                    <span>2.9% + $0.30</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground">
                      You'll receive {formData.price ? `$${(parseFloat(formData.price) * 0.921 - 0.30).toFixed(2)}` : '$0.00'} after fees
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;