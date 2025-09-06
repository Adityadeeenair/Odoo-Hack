import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Edit2, 
  Save, 
  X, 
  Package, 
  ShoppingCart, 
  Heart,
  Star,
  MapPin,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Leaf
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
  avatar?: string;
}

interface UserStats {
  itemsSold: number;
  itemsBought: number;
  rating: number;
  totalReviews: number;
  ecoImpact: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "user123",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate about sustainable living and finding unique pre-loved items. Love vintage fashion and eco-friendly home decor!",
    joinDate: "January 2024",
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  const userStats: UserStats = {
    itemsSold: 23,
    itemsBought: 47,
    rating: 4.8,
    totalReviews: 89,
    ecoImpact: 145, // kg CO2 saved
  };

  // Mock data for user's listings and purchases
  const myListings = [
    { id: "1", title: "Vintage Leather Jacket", price: 85, status: "Active", views: 156 },
    { id: "2", title: "Designer Handbag", price: 200, status: "Sold", views: 89 },
    { id: "3", title: "Wooden Coffee Table", price: 120, status: "Active", views: 234 },
  ];

  const recentPurchases = [
    { id: "1", title: "iPhone 12 Pro Max", price: 650, date: "2024-01-15", seller: "Alex K." },
    { id: "2", title: "Gaming Laptop", price: 800, date: "2024-01-10", seller: "John P." },
  ];

  const favorites = [
    { id: "1", title: "Vintage Vinyl Records", price: 45, seller: "Lisa T." },
    { id: "2", title: "Designer Sneakers", price: 150, seller: "Chris B." },
  ];

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <Avatar className="w-24 h-24">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{userProfile.name}</h1>
                  <Button
                    variant={isEditing ? "coral" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                  </Button>
                </div>

                <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{userStats.rating}</span>
                    <span>({userStats.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {userProfile.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{userProfile.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{userProfile.bio}</p>

                {/* User Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{userStats.itemsSold}</div>
                    <div className="text-sm text-muted-foreground">Items Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userStats.itemsBought}</div>
                    <div className="text-sm text-muted-foreground">Items Bought</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{userStats.rating}</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-2xl font-bold text-success">{userStats.ecoImpact}</span>
                      <Leaf className="h-5 w-5 text-success" />
                    </div>
                    <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Listed "Vintage Leather Jacket"</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Purchased "Gaming Laptop"</p>
                      <p className="text-sm text-muted-foreground">1 week ago</p>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Sold "Designer Handbag"</p>
                      <p className="text-sm text-muted-foreground">2 weeks ago</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">Sold</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Favorites */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Favorites</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {favorites.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">by {item.seller}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${item.price}</p>
                        <Button size="sm" variant="outline" onClick={() => navigate(`/product/${item.id}`)}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Listings Tab */}
          <TabsContent value="listings">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>My Listings ({myListings.length})</span>
                </CardTitle>
                <Button variant="accent" onClick={() => navigate("/sell")}>
                  Add New Listing
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myListings.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Photo</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.views} views</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-bold">${item.price}</p>
                          <Badge variant={item.status === "Active" ? "secondary" : "outline"}>
                            {item.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Purchase History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPurchases.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Photo</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">from {item.seller}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${item.price}</p>
                        <Button size="sm" variant="outline">
                          Rate & Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editedProfile.location}
                          onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={3}
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveProfile} variant="accent">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-muted-foreground">Full Name</Label>
                        <p className="font-medium">{userProfile.name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{userProfile.email}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Phone</Label>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{userProfile.phone}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Location</Label>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{userProfile.location}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Bio</Label>
                      <p className="font-medium">{userProfile.bio}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;