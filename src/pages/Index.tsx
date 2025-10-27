import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Calculator, Crown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-princess py-20 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-4 h-4 bg-accent rounded-full animate-sparkle" />
          <div className="absolute top-20 right-20 w-3 h-3 bg-accent rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-10 left-1/4 w-5 h-5 bg-accent rounded-full animate-sparkle" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-accent rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <Crown className="w-16 h-16 animate-float" />
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
              Princess Math Kingdom
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Where Mathematics Meets Magic ✨
            </p>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Solve complex numerical problems with royal elegance using our enchanted calculators
            </p>
          </div>
        </div>
      </header>

      {/* Methods Section */}
      <main className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">
            Choose Your Magical Method
          </h2>
          <p className="text-muted-foreground text-lg">
            Select a numerical method to begin your mathematical journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Bisection Method */}
          <Card className="group hover:shadow-princess transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 overflow-hidden">
            <div className="bg-gradient-princess p-1">
              <div className="bg-card p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calculator className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-center mb-3 text-foreground">
                  Bisection Method
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  Find roots by dividing intervals with royal precision
                </p>
                <Link to="/bisection" className="block">
                  <Button className="w-full bg-gradient-princess hover:opacity-90 text-white font-medium shadow-princess">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Calculating
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Secant Method */}
          <Card className="group hover:shadow-royal transition-all duration-300 hover:-translate-y-2 border-2 border-secondary/20 overflow-hidden">
            <div className="bg-gradient-royal p-1">
              <div className="bg-card p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calculator className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-center mb-3 text-foreground">
                  Secant Method
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  Discover roots through elegant linear approximations
                </p>
                <Link to="/secant" className="block">
                  <Button className="w-full bg-gradient-royal hover:opacity-90 text-white font-medium shadow-royal">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Calculating
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Gaussian Elimination */}
          <Card className="group hover:shadow-princess transition-all duration-300 hover:-translate-y-2 border-2 border-accent/20 overflow-hidden">
            <div className="bg-gradient-to-br from-accent to-primary p-1">
              <div className="bg-card p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calculator className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-center mb-3 text-foreground">
                  Gaussian Elimination
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  Solve linear systems with princely efficiency
                </p>
                <Link to="/gaussian" className="block">
                  <Button className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white font-medium shadow-princess">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Calculating
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* About Section */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 shadow-princess">
            <Crown className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-playfair text-3xl font-bold mb-4 text-foreground">
              About Our Kingdom
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to the Princess Math Kingdom, where computational mathematics meets royal elegance. 
              Our enchanted calculators use proven numerical methods to solve complex mathematical problems 
              with precision and grace. Whether you're finding roots or solving systems of equations, 
              each calculation is performed with the care and attention worthy of royalty.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-princess py-8 mt-20">
        <div className="container mx-auto text-center text-white">
          <p className="font-light">
            Made with 💖 in the Princess Math Kingdom
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
