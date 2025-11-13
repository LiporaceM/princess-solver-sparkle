import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface ScientificCalculatorProps {
  onInsert: (value: string) => void;
  className?: string;
}

const ScientificCalculator = ({ onInsert, className = "" }: ScientificCalculatorProps) => {
  const scientificButtons = [
    { label: "sin(", value: "sin(" },
    { label: "cos(", value: "cos(" },
    { label: "tan(", value: "tan(" },
    { label: "log(", value: "log(" },
    { label: "ln(", value: "ln(" },
    { label: "√", value: "sqrt(" },
    { label: "e^", value: "exp(" },
    { label: "π", value: "3.14159265359" },
    { label: "e", value: "2.71828182846" },
    { label: "x²", value: "^2" },
    { label: "x³", value: "^3" },
    { label: "x^", value: "^" },
    { label: "1/x", value: "1/" },
    { label: "|x|", value: "abs(" },
    { label: "(", value: "(" },
    { label: ")", value: ")" },
  ];

  const numberButtons = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "*",
    "0", ".", "x", "/",
  ];

  return (
    <Card className={`p-4 border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="font-playfair text-lg font-semibold text-foreground">
          Calculadora Científica
        </h3>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {scientificButtons.map((btn) => (
            <Button
              key={btn.label}
              onClick={() => onInsert(btn.value)}
              variant="outline"
              className="h-10 text-sm font-medium hover:bg-primary/10 hover:border-primary/40 transition-all"
            >
              {btn.label}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {numberButtons.map((btn) => (
            <Button
              key={btn}
              onClick={() => onInsert(btn)}
              variant={btn === "x" ? "default" : "outline"}
              className={btn === "x" 
                ? "h-12 text-base font-bold bg-gradient-princess text-white hover:opacity-90" 
                : "h-12 text-base font-semibold hover:bg-primary/10 hover:border-primary/40 transition-all"
              }
            >
              {btn}
            </Button>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Clique nos botões para inserir funções na expressão
      </p>
    </Card>
  );
};

export default ScientificCalculator;
