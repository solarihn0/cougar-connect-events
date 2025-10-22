import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Ticket } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, this would validate credentials
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="bg-secondary text-secondary-foreground p-4 rounded-2xl shadow-[var(--shadow-gold)]">
              <Ticket className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground">CougarTickets</h1>
          <p className="text-primary-foreground/80">Your Gateway to Events</p>
        </div>

        {/* Auth Card */}
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-11"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="h-11"
                />
              </div>
            )}

            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
              >
                {isLogin ? "Log In" : "Create Account"}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create New Account" : "Back to Login"}
              </Button>
            </div>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Forgot password?
              </button>
            </div>
          )}
        </Card>

        {/* Partnership Badge */}
        <p className="text-center text-sm text-primary-foreground/60">
          In partnership with Charleston Athletics
        </p>
      </div>
    </div>
  );
};

export default Auth;
