import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Calculator, Crown } from "lucide-react";
import barbieHero from "@/assets/barbie-math-hero.png";
import barbieCalc1 from "@/assets/barbie-calculator-1.png";
import barbieCalc2 from "@/assets/barbie-calculator-2.png";
import barbieCalc3 from "@/assets/barbie-calculator-3.png";

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
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left text-white">
              <div className="flex justify-center md:justify-start mb-6">
                <Crown className="w-16 h-16 animate-float" />
              </div>
              <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                Reino Matemático da Princesa
              </h1>
              <p className="text-xl md:text-2xl mb-6 font-light">
                Onde a Matemática Encontra a Magia ✨
              </p>
              <p className="text-lg max-w-2xl opacity-90">
                Resolva problemas numéricos complexos com elegância real usando nossas calculadoras encantadas
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <img src={barbieHero} alt="Barbie Princesa" className="w-80 h-80 object-contain animate-float drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </header>

      {/* Methods Section */}
      <main className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">
            Escolha Seu Método Mágico
          </h2>
          <p className="text-muted-foreground text-lg">
            Selecione um método numérico para começar sua jornada matemática
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Bisection Method */}
          <Card className="group hover:shadow-princess transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 overflow-hidden">
            <div className="bg-gradient-princess p-1">
              <div className="bg-card p-6">
                <div className="flex justify-center mb-4">
                  <img src={barbieCalc1} alt="Barbie Matemática" className="w-40 h-40 object-contain group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-center mb-3 text-foreground">
                  Método da Bisseção
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  Encontre raízes dividindo intervalos com precisão real
                </p>
                <Link to="/bisection" className="block">
                  <Button className="w-full bg-gradient-princess hover:opacity-90 text-white font-medium shadow-princess">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Começar a Calcular
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
                  <img src={barbieCalc2} alt="Barbie Princesa" className="w-40 h-40 object-contain group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-center mb-3 text-foreground">
                  Método da Secante
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  Descubra raízes através de aproximações lineares elegantes
                </p>
                <Link to="/secant" className="block">
                  <Button className="w-full bg-gradient-royal hover:opacity-90 text-white font-medium shadow-royal">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Começar a Calcular
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
                  <img src={barbieCalc3} alt="Barbie Calculadora" className="w-40 h-40 object-contain group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-center mb-3 text-foreground">
                  Eliminação Gaussiana
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  Resolva sistemas lineares com eficiência principesca
                </p>
                <Link to="/gaussian" className="block">
                  <Button className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white font-medium shadow-princess">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Começar a Calcular
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
              Sobre Nosso Reino
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Bem-vindo ao Reino Matemático da Princesa, onde a matemática computacional encontra a elegância real. 
              Nossas calculadoras encantadas usam métodos numéricos comprovados para resolver problemas matemáticos 
              complexos com precisão e graça. Seja encontrando raízes ou resolvendo sistemas de equações, 
              cada cálculo é realizado com o cuidado e atenção dignos da realeza.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-princess py-8 mt-20">
        <div className="container mx-auto text-center text-white">
          <p className="font-light">
            Feito com 💖 no Reino Matemático da Princesa
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
