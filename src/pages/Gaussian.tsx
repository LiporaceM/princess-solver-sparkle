import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Gaussian = () => {
  const [size, setSize] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>([
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]
  ]);
  const [solution, setSolution] = useState<number[] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const handleSizeChange = (newSize: number) => {
    if (newSize < 2 || newSize > 10) return;
    
    const newMatrix: number[][] = [];
    for (let i = 0; i < newSize; i++) {
      newMatrix[i] = [];
      for (let j = 0; j <= newSize; j++) {
        newMatrix[i][j] = (matrix[i] && matrix[i][j]) || 0;
      }
    }
    setMatrix(newMatrix);
    setSize(newSize);
    setSolution(null);
    setSteps([]);
  };

  const handleMatrixChange = (i: number, j: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const gaussianElimination = () => {
    try {
      const steps: string[] = [];
      const n = size;
      const augmentedMatrix = matrix.map(row => [...row]);
      
      steps.push("Initial augmented matrix created");

      // Forward elimination
      for (let i = 0; i < n; i++) {
        // Partial pivoting
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
          if (Math.abs(augmentedMatrix[k][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
            maxRow = k;
          }
        }
        
        if (maxRow !== i) {
          [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];
          steps.push(`Swapped row ${i + 1} with row ${maxRow + 1} for better numerical stability`);
        }

        // Check for zero pivot
        if (Math.abs(augmentedMatrix[i][i]) < 1e-10) {
          toast.error("System has no unique solution (zero pivot detected)");
          return;
        }

        // Eliminate below
        for (let k = i + 1; k < n; k++) {
          const factor = augmentedMatrix[k][i] / augmentedMatrix[i][i];
          steps.push(`Row ${k + 1} = Row ${k + 1} - (${factor.toFixed(4)}) × Row ${i + 1}`);
          
          for (let j = i; j <= n; j++) {
            augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
          }
        }
      }

      // Back substitution
      const x: number[] = new Array(n);
      steps.push("Starting back substitution");
      
      for (let i = n - 1; i >= 0; i--) {
        x[i] = augmentedMatrix[i][n];
        for (let j = i + 1; j < n; j++) {
          x[i] -= augmentedMatrix[i][j] * x[j];
        }
        x[i] /= augmentedMatrix[i][i];
        steps.push(`x${i + 1} = ${x[i].toFixed(6)}`);
      }

      setSolution(x);
      setSteps(steps);
      toast.success("System solved successfully! ✨");
    } catch (error) {
      toast.error("Error solving the system. Please check your inputs.");
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
            Gaussian Elimination
          </h1>
          <p className="text-muted-foreground">
            Solve linear systems with princely efficiency
          </p>
        </div>

        <Card className="p-8 border-2 border-accent/20 shadow-princess mb-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Label className="text-base font-medium whitespace-nowrap">
                System Size:
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleSizeChange(size - 1)}
                  variant="outline"
                  size="icon"
                  disabled={size <= 2}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <span className="font-bold text-lg w-12 text-center">{size}×{size}</span>
                <Button
                  onClick={() => handleSizeChange(size + 1)}
                  variant="outline"
                  size="icon"
                  disabled={size >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">
                Augmented Matrix [A|b]
              </Label>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  {matrix.map((row, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      {row.map((val, j) => (
                        <div key={j} className="relative">
                          <Input
                            type="number"
                            step="any"
                            value={val}
                            onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                            className={`w-20 text-center ${j === size ? 'border-l-4 border-l-accent' : ''}`}
                          />
                          {j === size - 1 && (
                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-accent" />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Enter coefficients. The last column represents the constants (b).
              </p>
            </div>

            <Button
              onClick={gaussianElimination}
              className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white font-medium shadow-princess"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Solve System
            </Button>
          </div>
        </Card>

        {solution && (
          <Card className="p-6 bg-gradient-to-r from-accent to-primary text-white mb-8 border-0">
            <h3 className="font-playfair text-2xl font-bold mb-4">Solution</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {solution.map((val, i) => (
                <div key={i} className="bg-white/20 rounded-lg p-3 backdrop-blur">
                  <span className="font-semibold">x{i + 1} = </span>
                  <span className="font-bold">{val.toFixed(6)}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {steps.length > 0 && (
          <Card className="p-6 border-2 border-accent/20">
            <h3 className="font-playfair text-2xl font-bold mb-4 text-foreground">
              Solution Steps
            </h3>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-3 py-2 border-b border-border last:border-0">
                  <span className="font-semibold text-primary min-w-[2rem]">{i + 1}.</span>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Gaussian;
