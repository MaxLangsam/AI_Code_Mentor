
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const StrawberryCounter: React.FC = () => {
  const [showResult, setShowResult] = useState(false);
  const [highlightedRs, setHighlightedRs] = useState<number[]>([]);

  const word = "strawberry";
  const letters = word.split("");

  const countRs = () => {
    const rPositions: number[] = [];
    letters.forEach((letter, index) => {
      if (letter.toLowerCase() === 'r') {
        rPositions.push(index);
      }
    });
    
    setHighlightedRs(rPositions);
    setShowResult(true);
  };

  const reset = () => {
    setShowResult(false);
    setHighlightedRs([]);
  };

  return (
    <Card className="p-6 max-w-md mx-auto text-center">
      <div className="text-6xl mb-4">🍓</div>
      
      <div className="text-2xl font-mono mb-6 tracking-wider">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`${
              highlightedRs.includes(index)
                ? 'bg-red-200 text-red-800 px-1 rounded'
                : ''
            }`}
          >
            {letter}
          </span>
        ))}
      </div>

      {!showResult ? (
        <Button onClick={countRs} className="bg-red-500 hover:bg-red-600 text-white">
          Count the Rs!
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="text-xl font-bold text-green-600">
            Found {highlightedRs.length} Rs in "strawberry"!
          </div>
          <div className="text-sm text-gray-600">
            The Rs are at positions: {highlightedRs.map(pos => pos + 1).join(', ')}
          </div>
          <Button onClick={reset} variant="outline">
            Try Again
          </Button>
        </div>
      )}
    </Card>
  );
};

export default StrawberryCounter;
