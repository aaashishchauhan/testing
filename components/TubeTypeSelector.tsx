
import React from 'react';
import { TubeType, TUBE_COLORS, TUBE_TYPES, TUBE_BODY_COLORS, TUBE_CAP_GRADIENTS } from '../types';

interface TubeTypeSelectorProps {
  selectedValue: TubeType | null;
  onChange: (value: TubeType) => void;
}

const TubeTypeSelector: React.FC<TubeTypeSelectorProps> = ({ selectedValue, onChange }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {TUBE_TYPES.map(tubeType => {
        const isSelected = selectedValue === tubeType;
        const [_, borderColor] = TUBE_COLORS[tubeType].split(' ');
        const tubeBodyClasses = TUBE_BODY_COLORS[tubeType];
        const capGradientClasses = TUBE_CAP_GRADIENTS[tubeType];

        return (
          <button
            key={tubeType}
            onClick={() => onChange(tubeType)}
            className={`flex flex-col items-center justify-center space-y-2 p-2 rounded-lg transition-all duration-200 ${
              isSelected ? 'bg-red-50 ring-2 ring-red-500' : 'bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="relative w-10 h-12 flex items-end justify-center">
              {/* More realistic cap with gradient, shadow, and highlight */}
              <div className={`absolute w-8 h-4 rounded-t-lg border-b-4 top-0 bg-gradient-to-b shadow-inner ${capGradientClasses} ${borderColor}`}>
                <div className="absolute top-[1px] left-[3px] right-[3px] h-[2px] bg-white/40 rounded-full opacity-50"></div>
              </div>
              <div className={`w-4 h-8 border rounded-b-md ${tubeBodyClasses}`}></div>
            </div>
            <span className={`text-xs font-semibold ${isSelected ? 'text-red-700' : 'text-slate-600'}`}>
              {tubeType}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TubeTypeSelector;
