import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Shield, MapPin, Globe, Trash2, Save, X } from "lucide-react";

const UserProfile = () => {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    language: "",
    location: ""
  });

  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
        email: user?.email || "",
        language: profile.language || "en",
        location: profile.location || ""
      });
    }
  }, [profile, user]);

  const handleSaveChanges = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await updateProfile({
        full_name: formData.fullName,
        language: formData.language,
        location: formData.location
      });

      toast({
        title: "Profile updated successfully",
        description: "Your changes have been saved.",
        className: "bg-news-success text-white"
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      toast({
        title: "Confirmation required",
        description: "Please type 'DELETE' to confirm account deletion.",
        variant: "destructive"
      });
      return;
    }

    // This would implement actual account deletion
    toast({
      title: "Account deletion requested",
      description: "Please contact support to complete account deletion.",
      variant: "destructive"
    });
  };

  const getUserRole = () => {
    // This would be fetched from user roles
    return "Reader";
  };

  const getInitials = () => {
    if (!formData.fullName) return "U";
    return formData.fullName
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Please sign in to view your profile.</p>
              <Button onClick={() => navigate("/signin")} className="mt-4">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-news-primary rounded-full flex items-center justify-center text-white text-xl font-semibold">
              {getInitials()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground font-heading">
                User Profile
              </h1>
              <p className="text-muted-foreground">
                Manage your account information and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Profile Section */}
            <Card className="shadow-news">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-news-primary">
                  <User className="w-5 h-5" />
                  Edit Profile
                </CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="rounded-lg bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language" className="font-medium">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Preferred Language
                    </Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="font-medium">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter your location"
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Account Role
                  </Label>
                  <div>
                    <Badge variant="secondary" className="text-sm">
                      {getUserRole()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your role determines your access level within the platform.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                    className="bg-news-primary hover:bg-news-primary/90 text-white rounded-lg"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="rounded-lg"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Delete Account Section */}
            <Card className="border-news-delete-border bg-news-delete-bg shadow-news">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-news-error">
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Permanently delete your account and all associated data. 
                  <strong className="text-news-error"> This action cannot be undone.</strong>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg border border-news-delete-border mb-4">
                  <h4 className="font-semibold text-news-error mb-2">
                    What will be deleted:
                  </h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Your profile information</li>
                    <li>All bookmarks and saved articles</li>
                    <li>Submission history</li>
                    <li>Account preferences and settings</li>
                  </ul>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="bg-news-error hover:bg-news-error/90 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete My Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-news-error">
                        Confirm Account Deletion
                      </AlertDialogTitle>
                      <AlertDialogDescription className="space-y-3">
                        <p>
                          This will permanently delete your account and all associated data.
                          This action cannot be undone.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="confirmDelete" className="font-medium">
                            Type "DELETE" to confirm:
                          </Label>
                          <Input
                            id="confirmDelete"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            placeholder="Type DELETE"
                            className="rounded-lg"
                          />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-lg">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-news-error hover:bg-news-error/90 rounded-lg"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-news">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-lg"
                  onClick={() => navigate("/bookmarks")}
                >
                  Bookmarks
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-lg"
                  onClick={() => navigate("/notifications")}
                >
                  Notifications
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-lg"
                  onClick={() => navigate("/user-submissions")}
                >
                  My Submissions
                </Button>
                <Separator />
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-lg"
                  onClick={() => navigate("/profile-settings")}
                >
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;