import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import barbiePrincess from "@/assets/barbie-princess.png";
import ScientificCalculator from "@/components/ScientificCalculator";

interface IterationResult {
  iteration: number;
  a: number;
  b: number;
  c: number;
  fc: number;
  error: number;
}

const Bisection = () => {
  const [funcStr, setFuncStr] = useState("x^3 - x - 2");
  const [a, setA] = useState("1");
  const [b, setB] = useState("2");
  const [tolerance, setTolerance] = useState("0.0001");
  const [results, setResults] = useState<IterationResult[]>([]);
  const [finalRoot, setFinalRoot] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCalculatorInsert = (value: string) => {
    const cursorPos = inputRef.current?.selectionStart || funcStr.length;
    const newValue = funcStr.slice(0, cursorPos) + value + funcStr.slice(cursorPos);
    setFuncStr(newValue);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(cursorPos + value.length, cursorPos + value.length);
      }
    }, 0);
  };

  const evaluateFunction = (x: number, func: string): number => {
    try {
      let sanitized = func
        .replace(/\^/g, "**")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/exp\(/g, "Math.exp(")
        .replace(/abs\(/g, "Math.abs(")
        .replace(/([0-9])([x])/g, "$1*$2")
        .replace(/\)([x0-9])/g, ")*$1")
        .replace(/([x0-9])\(/g, "$1*(")
        .replace(/x/g, `(${x})`);
      
      return eval(sanitized);
    } catch (error) {
      throw new Error("Expressão de função inválida");
    }
  };

  const calculateBisection = () => {
    try {
      const aNum = parseFloat(a);
      const bNum = parseFloat(b);
      const tol = parseFloat(tolerance);
      const maxIterations = 100;
      
      let aVal = aNum;
      let bVal = bNum;
      const iterations: IterationResult[] = [];
      
      let faVal = evaluateFunction(aVal, funcStr);
      let fbVal = evaluateFunction(bVal, funcStr);
      
      if (faVal * fbVal > 0) {
        toast.error("A função deve ter sinais diferentes em a e b");
        return;
      }
      
      for (let i = 0; i < maxIterations; i++) {
        const c = (aVal + bVal) / 2;
        const fc = evaluateFunction(c, funcStr);
        const error = Math.abs(bVal - aVal) / 2;
        
        iterations.push({
          iteration: i + 1,
          a: aVal,
          b: bVal,
          c: c,
          fc: fc,
          error: error
        });
        
        if (error < tol) {
          setFinalRoot(c);
          setResults(iterations);
          toast.success("Raiz encontrada com sucesso! ✨");
          return;
        }
        
        if (fc * faVal < 0) {
          bVal = c;
          fbVal = fc;
        } else {
          aVal = c;
          faVal = fc;
        }
      }
      
      toast.warning("Número máximo de iterações alcançado");
      setResults(iterations);
    } catch (error) {
      toast.error("Erro no cálculo. Por favor, verifique suas entradas.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Reino
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
              Método da Bisseção
            </h1>
            <p className="text-muted-foreground">
              Encontre raízes dividindo intervalos com precisão real
            </p>
          </div>
          <div className="flex-shrink-0">
            <img src={barbiePrincess} alt="Barbie Princesa" className="w-48 h-48 object-contain animate-float drop-shadow-xl" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-8 border-2 border-primary/20 shadow-princess">
            <div className="space-y-6">
              <div>
                <Label htmlFor="function" className="text-base font-medium">
                  Função f(x)
                </Label>
                <Input
                  ref={inputRef}
                  id="function"
                  value={funcStr}
                  onChange={(e) => setFuncStr(e.target.value)}
                  placeholder="ex: sin(x) + x^2 - 2"
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Use a calculadora científica ou digite diretamente
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="a" className="text-base font-medium">
                    Início do Intervalo (a)
                  </Label>
                  <Input
                    id="a"
                    type="number"
                    step="any"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="b" className="text-base font-medium">
                    Fim do Intervalo (b)
                  </Label>
                  <Input
                    id="b"
                    type="number"
                    step="any"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="tolerance" className="text-base font-medium">
                    Tolerância
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
                onClick={calculateBisection}
                className="w-full bg-gradient-princess hover:opacity-90 text-white font-medium shadow-princess"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Calcular Raiz
              </Button>
            </div>
          </Card>

          <ScientificCalculator onInsert={handleCalculatorInsert} />
        </div>

        {finalRoot !== null && (
          <Card className="p-6 bg-gradient-princess text-white mb-8 border-0">
            <h3 className="font-playfair text-2xl font-bold mb-2">Resultado Final</h3>
            <p className="text-lg">
              Raiz encontrada: <span className="font-bold">{finalRoot.toFixed(6)}</span>
            </p>
            <p className="text-sm opacity-90 mt-1">
              Convergiu em {results.length} iterações
            </p>
          </Card>
        )}

        {results.length > 0 && (
          <Card className="p-6 border-2 border-primary/20">
            <h3 className="font-playfair text-2xl font-bold mb-4 text-foreground">
              Passos da Iteração
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left py-3 px-2 font-semibold">Iteração</th>
                    <th className="text-right py-3 px-2 font-semibold">a</th>
                    <th className="text-right py-3 px-2 font-semibold">b</th>
                    <th className="text-right py-3 px-2 font-semibold">c</th>
                    <th className="text-right py-3 px-2 font-semibold">f(c)</th>
                    <th className="text-right py-3 px-2 font-semibold">Erro</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.iteration} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-2">{result.iteration}</td>
                      <td className="text-right py-3 px-2">{result.a.toFixed(6)}</td>
                      <td className="text-right py-3 px-2">{result.b.toFixed(6)}</td>
                      <td className="text-right py-3 px-2">{result.c.toFixed(6)}</td>
                      <td className="text-right py-3 px-2">{result.fc.toFixed(6)}</td>
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

export default Bisection;
