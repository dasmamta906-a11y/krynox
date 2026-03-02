import React, { useState } from 'react';
import { Calculator as CalcIcon, X, ArrowLeft } from 'lucide-react';

export default function Calculator({ onClose }) {
  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevious(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);
    if (previous === null) {
      setPrevious(String(inputValue));
    } else if (operator) {
      const currentValue = parseFloat(previous);
      let result: number;
      switch (operator) {
        case '+': result = currentValue + inputValue; break;
        case '-': result = currentValue - inputValue; break;
        case '×': result = currentValue * inputValue; break;
        case '÷': result = currentValue / inputValue; break;
        case '%': result = currentValue % inputValue; break;
        case '^': result = Math.pow(currentValue, inputValue); break;
        default: result = inputValue;
      }
      setPrevious(String(result));
      setDisplay(String(result));
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (!operator || previous === null) return;
    performOperation('=');
    setOperator(null);
  };

  const backspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const buttons = [
    [{ label: 'C', action: clear, color: 'bg-red-600' }, { label: '±', action: toggleSign, color: 'bg-gray-600' }, { label: '%', action: () => performOperation('%'), color: 'bg-gray-600' }, { label: '÷', action: () => performOperation('÷'), color: 'bg-orange-600' }],
    [{ label: '7', action: () => inputDigit('7'), color: 'bg-gray-700' }, { label: '8', action: () => inputDigit('8'), color: 'bg-gray-700' }, { label: '9', action: () => inputDigit('9'), color: 'bg-gray-700' }, { label: '×', action: () => performOperation('×'), color: 'bg-orange-600' }],
    [{ label: '4', action: () => inputDigit('4'), color: 'bg-gray-700' }, { label: '5', action: () => inputDigit('5'), color: 'bg-gray-700' }, { label: '6', action: () => inputDigit('6'), color: 'bg-gray-700' }, { label: '-', action: () => performOperation('-'), color: 'bg-orange-600' }],
    [{ label: '1', action: () => inputDigit('1'), color: 'bg-gray-700' }, { label: '2', action: () => inputDigit('2'), color: 'bg-gray-700' }, { label: '3', action: () => inputDigit('3'), color: 'bg-gray-700' }, { label: '+', action: () => performOperation('+'), color: 'bg-orange-600' }],
    [{ label: '0', action: () => inputDigit('0'), color: 'bg-gray-700 col-span-2' }, { label: '.', action: inputDecimal, color: 'bg-gray-700' }, { label: '=', action: calculate, color: 'bg-green-600' }],
  ];

  const scientificButtons = [
    [{ label: 'sin', action: () => setDisplay(String(Math.sin(parseFloat(display) * Math.PI / 180))), color: 'bg-purple-700' }, { label: 'cos', action: () => setDisplay(String(Math.cos(parseFloat(display) * Math.PI / 180))), color: 'bg-purple-700' }, { label: 'tan', action: () => setDisplay(String(Math.tan(parseFloat(display) * Math.PI / 180))), color: 'bg-purple-700' }, { label: '√', action: () => setDisplay(String(Math.sqrt(parseFloat(display)))), color: 'bg-purple-700' }],
    [{ label: 'log', action: () => setDisplay(String(Math.log10(parseFloat(display)))), color: 'bg-purple-700' }, { label: 'ln', action: () => setDisplay(String(Math.log(parseFloat(display)))), color: 'bg-purple-700' }, { label: 'x²', action: () => setDisplay(String(Math.pow(parseFloat(display), 2))), color: 'bg-purple-700' }, { label: '^', action: () => performOperation('^'), color: 'bg-purple-700' }],
    [{ label: 'π', action: () => setDisplay(String(Math.PI)), color: 'bg-purple-700' }, { label: 'e', action: () => setDisplay(String(Math.E)), color: 'bg-purple-700' }, { label: '(', action: () => setDisplay(display + '('), color: 'bg-purple-700' }, { label: ')', action: () => setDisplay(display + ')'), color: 'bg-purple-700' }],
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-orange-500/20 w-[350px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-orange-500/20">
        <div className="flex items-center gap-2">
          <CalcIcon className="w-5 h-5 text-orange-500" />
          <span className="text-white font-semibold">Calculator</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1">
        {/* Display */}
        <div className="bg-gray-900 p-4 text-right mb-1 rounded">
          <div className="text-gray-400 text-xs h-4">{previous} {operator || ''}</div>
          <div className="text-3xl font-mono text-white truncate">{display}</div>
        </div>
        {/* Scientific Row */}
        {scientificButtons.map((row, i) => (
          <div key={i} className="flex gap-1">
            {row.map((btn, j) => (
              <button key={j} onClick={btn.action} className={`flex-1 py-2 rounded text-white text-sm font-medium ${btn.color}`}>{btn.label}</button>
            ))}
          </div>
        ))}
        {/* Backspace */}
        <div className="flex gap-1 mb-1">
          <button onClick={backspace} className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></button>
        </div>
        {/* Main Buttons */}
        {buttons.map((row, i) => (
          <div key={i} className="flex gap-1">
            {row.map((btn, j) => (
              <button key={j} onClick={btn.action} className={`flex-1 py-3 rounded text-white font-medium text-lg ${btn.color} ${btn.label === '0' ? 'col-span-2' : ''}`}>{btn.label}</button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
