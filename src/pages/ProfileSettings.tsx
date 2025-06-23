
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { User, MapPin, Bell, Shield, Globe, Save, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProfileSettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { toast } = useToast();

  const [accountData, setAccountData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [locationData, setLocationData] = useState({
    primaryLocation: 'San Francisco, CA',
    additionalLocations: ['Oakland, CA', 'Berkeley, CA']
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    factCheckUpdates: true,
    weeklyDigest: false,
    frequency: 'daily'
  });

  const categories = [
    { id: 'politics', name: 'Politics', enabled: true },
    { id: 'business', name: 'Business', enabled: true },
    { id: 'environment', name: 'Environment', enabled: false },
    { id: 'education', name: 'Education', enabled: true },
    { id: 'sports', name: 'Sports', enabled: false },
    { id: 'technology', name: 'Technology', enabled: true }
  ];

  const handleSaveAccount = () => {
    console.log('Saving account data:', accountData);
    toast({
      title: "Account Updated",
      description: "Your account information has been saved successfully.",
    });
  };

  const handleSaveLocation = () => {
    console.log('Saving location data:', locationData);
    toast({
      title: "Location Preferences Updated",
      description: "Your location preferences have been saved.",
    });
  };

  const handleSaveNotifications = () => {
    console.log('Saving notification settings:', notificationSettings);
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link to="/dashboard" className="hover:text-blue-800">Dashboard</Link>
              <span>/</span>
              <span>Settings</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600 font-['Open_Sans']">
              Manage your account preferences and notification settings
            </p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger value="location" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Location</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal information and password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        value={accountData.fullName}
                        onChange={(e) => setAccountData({...accountData, fullName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={accountData.email}
                        onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            value={accountData.currentPassword}
                            onChange={(e) => setAccountData({...accountData, currentPassword: e.target.value})}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              value={accountData.newPassword}
                              onChange={(e) => setAccountData({...accountData, newPassword: e.target.value})}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <Input
                            type="password"
                            value={accountData.confirmPassword}
                            onChange={(e) => setAccountData({...accountData, confirmPassword: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveAccount} className="w-full md:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location">
              <Card>
                <CardHeader>
                  <CardTitle>Location Preferences</CardTitle>
                  <CardDescription>
                    Set your preferred locations for local news coverage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Location
                    </label>
                    <Input
                      type="text"
                      value={locationData.primaryLocation}
                      onChange={(e) => setLocationData({...locationData, primaryLocation: e.target.value})}
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Locations
                    </label>
                    <div className="space-y-2">
                      {locationData.additionalLocations.map((location, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            type="text"
                            value={location}
                            onChange={(e) => {
                              const newLocations = [...locationData.additionalLocations];
                              newLocations[index] = e.target.value;
                              setLocationData({...locationData, additionalLocations: newLocations});
                            }}
                            placeholder="City, State"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newLocations = locationData.additionalLocations.filter((_, i) => i !== index);
                              setLocationData({...locationData, additionalLocations: newLocations});
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          setLocationData({
                            ...locationData,
                            additionalLocations: [...locationData.additionalLocations, '']
                          });
                        }}
                      >
                        Add Location
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleSaveLocation} className="w-full md:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Save Location Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Preferences</CardTitle>
                  <CardDescription>
                    Choose which categories and topics you'd like to follow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={category.enabled}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{category.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Language</h3>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  <Button className="w-full md:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Save Content Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Alerts</h4>
                        <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailAlerts}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          emailAlerts: e.target.checked
                        })}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-gray-600">Receive browser notifications</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          pushNotifications: e.target.checked
                        })}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Fact-Check Updates</h4>
                        <p className="text-sm text-gray-600">Get notified when articles you've saved are fact-checked</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.factCheckUpdates}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          factCheckUpdates: e.target.checked
                        })}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Weekly Digest</h4>
                        <p className="text-sm text-gray-600">Receive a weekly summary of top stories</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyDigest}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          weeklyDigest: e.target.checked
                        })}
                        className="rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Frequency</h3>
                    <select 
                      value={notificationSettings.frequency}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        frequency: e.target.value
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Digest</option>
                    </select>
                  </div>

                  <Button onClick={handleSaveNotifications} className="w-full md:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSettings;
