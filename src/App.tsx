import React, { useState } from 'react';
import { Calculator, History, Equal, Delete, RotateCcw } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [prevNumber, setPrevNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    setOperation(op);
    setPrevNumber(display);
    setIsNewNumber(true);
  };

  const calculate = () => {
    if (!operation || !prevNumber) return;

    const prev = parseFloat(prevNumber);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
    }

    const calculation = `${prev} ${operation} ${current} = ${result}`;
    setHistory([...history, calculation]);
    setDisplay(result.toString());
    setPrevNumber('');
    setOperation('');
    setIsNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setPrevNumber('');
    setOperation('');
    setIsNewNumber(true);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteLastDigit = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Calculator</h1>
            </div>
            <button
              onClick={clearHistory}
              className="text-gray-400 hover:text-purple-400 transition-colors"
              title="Clear History"
            >
              <History className="w-5 h-5" />
            </button>
          </div>

          {/* History Display */}
          <div className="h-20 overflow-y-auto mb-4 text-right text-gray-400 text-sm">
            {history.map((calc, index) => (
              <div key={index} className="mb-1">{calc}</div>
            ))}
          </div>

          {/* Main Display */}
          <div className="bg-gray-900/50 rounded-2xl p-4 mb-6">
            <div className="text-right text-3xl font-light text-white break-all">
              {display}
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-3">
            {/* First Row */}
            <button
              onClick={clear}
              className="bg-red-500/20 text-red-400 rounded-xl p-4 text-xl font-semibold hover:bg-red-500/30 transition-colors"
            >
              C
            </button>
            <button
              onClick={deleteLastDigit}
              className="bg-gray-700/30 text-gray-300 rounded-xl p-4 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
            >
              <Delete className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleOperation('÷')}
              className="bg-purple-500/20 text-purple-400 rounded-xl p-4 text-xl hover:bg-purple-500/30 transition-colors"
            >
              ÷
            </button>
            <button
              onClick={() => handleOperation('×')}
              className="bg-purple-500/20 text-purple-400 rounded-xl p-4 text-xl hover:bg-purple-500/30 transition-colors"
            >
              ×
            </button>

            {/* Number Pad */}
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-gray-700/30 text-gray-100 rounded-xl p-4 text-xl hover:bg-gray-700/50 transition-colors"
              >
                {num}
              </button>
            ))}

            {/* Operations */}
            <button
              onClick={() => handleOperation('-')}
              className="bg-purple-500/20 text-purple-400 rounded-xl p-4 text-xl hover:bg-purple-500/30 transition-colors"
            >
              -
            </button>
            <button
              onClick={() => handleOperation('+')}
              className="bg-purple-500/20 text-purple-400 rounded-xl p-4 text-xl hover:bg-purple-500/30 transition-colors"
            >
              +
            </button>

            {/* Last Row */}
            <button
              onClick={() => handleNumber('0')}
              className="bg-gray-700/30 text-gray-100 rounded-xl p-4 text-xl col-span-2 hover:bg-gray-700/50 transition-colors"
            >
              0
            </button>
            <button
              onClick={() => handleNumber('.')}
              className="bg-gray-700/30 text-gray-100 rounded-xl p-4 text-xl hover:bg-gray-700/50 transition-colors"
            >
              .
            </button>
            <button
              onClick={calculate}
              className="bg-purple-500 text-white rounded-xl p-4 hover:bg-purple-600 transition-colors flex items-center justify-center"
            >
              <Equal className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;