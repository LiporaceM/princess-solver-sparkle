import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface IterationResult {
  iteration: number;
  x0: number;
  x1: number;
  fx0: number;
  fx1: number;
  x2: number;
  error: number;
}

const Secant = () => {
  const [funcStr, setFuncStr] = useState("x^3 - x - 2");
  const [x0, setX0] = useState("1");
  const [x1, setX1] = useState("2");
  const [tolerance, setTolerance] = useState("0.0001");
  const [results, setResults] = useState<IterationResult[]>([]);
  const [finalRoot, setFinalRoot] = useState<number | null>(null);

  const evaluateFunction = (x: number, func: string): number => {
    try {
      const sanitized = func
        .replace(/\^/g, "**")
        .replace(/([0-9])([x])/g, "$1*$2")
        .replace(/\)([x0-9])/g, ")*$1")
        .replace(/([x0-9])\(/g, "$1*(")
        .replace(/x/g, `(${x})`);
      
      return eval(sanitized);
    } catch (error) {
      throw new Error("Invalid function expression");
    }
  };

  const calculateSecant = () => {
    try {
      const x0Num = parseFloat(x0);
      const x1Num = parseFloat(x1);
      const tol = parseFloat(tolerance);
      const maxIterations = 100;
      
      let x0Val = x0Num;
      let x1Val = x1Num;
      const iterations: IterationResult[] = [];
      
      for (let i = 0; i < maxIterations; i++) {
        const fx0 = evaluateFunction(x0Val, funcStr);
        const fx1 = evaluateFunction(x1Val, funcStr);
        
        if (Math.abs(fx1 - fx0) < 1e-10) {
          toast.error("Division by zero detected. Try different initial values.");
          return;
        }
        
        const x2 = x1Val - (fx1 * (x1Val - x0Val)) / (fx1 - fx0);
        const error = Math.abs(x2 - x1Val);
        
        iterations.push({
          iteration: i + 1,
          x0: x0Val,
          x1: x1Val,
          fx0: fx0,
          fx1: fx1,
          x2: x2,
          error: error
        });
        
        if (error < tol) {
          setFinalRoot(x2);
          setResults(iterations);
          toast.success("Root found successfully! ✨");
          return;
        }
        
        x0Val = x1Val;
        x1Val = x2;
      }
      
      toast.warning("Maximum iterations reached");
      setResults(iterations);
    } catch (error) {
      toast.error("Error in calculation. Please check your inputs.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Kingdom
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Secant Method
          </h1>
          <p className="text-muted-foreground">
            Discover roots through elegant linear approximations
          </p>
        </div>

        <Card className="p-8 border-2 border-secondary/20 shadow-royal mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="function" className="text-base font-medium">
                Function f(x)
              </Label>
              <Input
                id="function"
                value={funcStr}
                onChange={(e) => setFuncStr(e.target.value)}
                placeholder="e.g., x^3 - x - 2"
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Use ^ for powers (e.g., x^2), * for multiplication
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="x0" className="text-base font-medium">
                  Initial Point x₀
                </Label>
                <Input
                  id="x0"
                  type="number"
                  step="any"
                  value={x0}
                  onChange={(e) => setX0(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="x1" className="text-base font-medium">
                  Second Point x₁
                </Label>
                <Input
                  id="x1"
                  type="number"
                  step="any"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="tolerance" className="text-base font-medium">
                  Tolerance
                </Label>
                <Input
                  id="tolerance"
                  type="number"
                  step="any"
                  value={tolerance}
                  onChange={(e) => setTolerance(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <Button
              onClick={calculateSecant}
              className="w-full bg-gradient-royal hover:opacity-90 text-white font-medium shadow-royal"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Calculate Root
            </Button>
          </div>
        </Card>

        {finalRoot !== null && (
          <Card className="p-6 bg-gradient-royal text-white mb-8 border-0">
            <h3 className="font-playfair text-2xl font-bold mb-2">Final Result</h3>
            <p className="text-lg">
              Root found: <span className="font-bold">{finalRoot.toFixed(6)}</span>
            </p>
            <p className="text-sm opacity-90 mt-1">
              Converged in {results.length} iterations
            </p>
          </Card>
        )}

        {results.length > 0 && (
          <Card className="p-6 border-2 border-secondary/20">
            <h3 className="font-playfair text-2xl font-bold mb-4 text-foreground">
              Iteration Steps
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-secondary/20">
                    <th className="text-left py-3 px-2 font-semibold">Iteration</th>
                    <th className="text-right py-3 px-2 font-semibold">x₀</th>
                    <th className="text-right py-3 px-2 font-semibold">x₁</th>
                    <th className="text-right py-3 px-2 font-semibold">f(x₀)</th>
                    <th className="text-right py-3 px-2 font-semibold">f(x₁)</th>
                    <th className="text-right py-3 px-2 font-semibold">x₂</th>
                    <th className="text-right py-3 px-2 font-semibold">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.iteration} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-2">{result.iteration}</td>
                      <td className="text-right py-3 px-2">{result.x0.toFixed(6)}</td>
                      <td className="text-right py-3 px-2">{result.x1.toFixed(6)}</td>
                      <td className="text-right py-3 px-2">{result.fx0.toFixed(6)}</td>
                      <td className="text-right py-3 px-2">{result.fx1.toFixed(6)}</td>
                      <td className="text-right py-3 px-2">{result.x2.toFixed(6)}</td>
                      <td className="text-right py-3 px-2">{result.error.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Secant;
