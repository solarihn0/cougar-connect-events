import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Bell, Shield, HelpCircle, LogOut } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Settings
            </CardTitle>
            <CardDescription>Manage your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Email Address
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Login & Security
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Age Verification
            </Button>
          </CardContent>
        </Card>

        {/* Event Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Event Preferences</CardTitle>
            <CardDescription>Customize your event discovery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Preferred Categories
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Default Location
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Price Range
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Accessibility Needs
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Control your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch id="push-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-updates">Email Updates</Label>
              <Switch id="email-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="event-reminders">Event Reminders</Label>
              <Switch id="event-reminders" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Terms of Service
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => navigate("/auth")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
