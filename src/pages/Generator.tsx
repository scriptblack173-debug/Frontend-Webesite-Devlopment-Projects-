import { useState, useCallback, useEffect } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Settings, Hash, Lock } from 'lucide-react';

export default function Generator() {
  const [generatedString, setGeneratedString] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generateRandomString = useCallback(() => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      charset = 'abcdefghijklmnopqrstuvwxyz';
    }

    let result = '';
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      result += charset[randomIndex];
    }

    setGeneratedString(result);
    setHistory((prev) => [result, ...prev].slice(0, 10));
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  const handleCopy = async () => {
    if (generatedString) {
      await navigator.clipboard.writeText(generatedString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrengthInfo = () => {
    let strength = 0;
    let color = 'text-red-400';
    let label = 'Weak';

    if (includeUppercase) strength++;
    if (includeLowercase) strength++;
    if (includeNumbers) strength++;
    if (includeSymbols) strength++;

    if (length >= 20) strength++;
    if (length >= 30) strength++;

    if (strength <= 2) {
      color = 'text-red-400';
      label = 'Weak';
    } else if (strength <= 4) {
      color = 'text-yellow-400';
      label = 'Medium';
    } else {
      color = 'text-green-400';
      label = 'Strong';
    }

    return { strength, color, label, maxStrength: 6 };
  };

  const strengthInfo = getStrengthInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

        <div className="absolute top-1/3 left-1/4">
          <div className="animate-float">
            <Sparkles className="w-20 h-20 text-purple-400/10" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/3">
          <div className="animate-float" style={{ animationDelay: '1.5s' }}>
            <Hash className="w-24 h-24 text-pink-400/10" />
          </div>
        </div>
        <div className="absolute top-1/2 right-1/4">
          <div className="animate-float" style={{ animationDelay: '3s' }}>
            <Lock className="w-16 h-16 text-purple-400/10" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full px-6 py-2 mb-6">
            <Hash className="w-4 h-4 text-pink-400" />
            <span className="text-pink-400 text-sm font-medium">Secure & Random</span>
          </div>

          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Random String Generator
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Generate cryptographically secure random strings for passwords, tokens, and more
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 shadow-2xl mb-8">
          <div className="mb-8">
            <label className="text-sm font-semibold text-slate-300 mb-3 block flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Generated String</span>
            </label>
            <div className="relative">
              <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6 font-mono text-lg text-cyan-400 break-all">
                {generatedString || 'Click generate to create a random string'}
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={handleCopy}
                  className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all transform hover:scale-105"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
                <button
                  onClick={generateRandomString}
                  className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all transform hover:scale-105"
                  title="Generate new string"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-300">
                String Length: {length}
              </label>
              <span className={`text-sm font-semibold ${strengthInfo.color}`}>
                Strength: {strengthInfo.label}
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>4</span>
              <span>64</span>
            </div>

            <div className="mt-4 bg-slate-900/50 rounded-lg p-3">
              <div className="flex space-x-2">
                {Array.from({ length: strengthInfo.maxStrength }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      index < strengthInfo.strength
                        ? strengthInfo.color.replace('text-', 'bg-')
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <label className="text-sm font-semibold text-slate-300 flex items-center space-x-2 mb-3">
              <Settings className="w-4 h-4" />
              <span>Character Options</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: 'Uppercase (A-Z)',
                  checked: includeUppercase,
                  onChange: setIncludeUppercase,
                },
                {
                  label: 'Lowercase (a-z)',
                  checked: includeLowercase,
                  onChange: setIncludeLowercase,
                },
                {
                  label: 'Numbers (0-9)',
                  checked: includeNumbers,
                  onChange: setIncludeNumbers,
                },
                {
                  label: 'Symbols (!@#$%...)',
                  checked: includeSymbols,
                  onChange: setIncludeSymbols,
                },
              ].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 bg-slate-900/50 border border-slate-700 rounded-xl p-4 cursor-pointer hover:border-purple-500/50 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={(e) => option.onChange(e.target.checked)}
                    className="w-5 h-5 accent-purple-600 cursor-pointer"
                  />
                  <span className="text-slate-300 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={generateRandomString}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate New String</span>
          </button>
        </div>

        {history.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <RefreshCw className="w-6 h-6 text-purple-400" />
              <span>Generation History</span>
            </h2>
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-900/50 border border-slate-700 rounded-xl p-4 hover:border-purple-500/50 transition-all"
                >
                  <span className="font-mono text-slate-300 flex-1 truncate">{item}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item);
                    }}
                    className="ml-4 p-2 text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
