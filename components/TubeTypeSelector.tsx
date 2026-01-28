
import React from 'react';
import { TubeType, TUBE_COLORS, TUBE_TYPES } from '../types';
import { CheckCircleIcon } from './icons';

interface TubeTypeSelectorProps {
  selectedValue: TubeType | null;
  onChange: (value: TubeType) => void;
}

const TubeTypeSelector: React.FC<TubeTypeSelectorProps> = ({ selectedValue, onChange }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {TUBE_TYPES.map(tubeType => {
        const isSelected = selectedValue === tubeType;
        const [capBgClass] = TUBE_COLORS[tubeType].split(' ');

        return (
          <button
            key={tubeType}
            onClick={() => onChange(tubeType)}
            className={`relative flex flex-col items-center justify-center space-y-1.5 p-3 rounded-xl border-2 transition-all duration-200 ${
              isSelected ? 'border-red-500 bg-red-50/50' : 'border-slate-200 bg-white hover:border-red-300'
            }`}
          >
            {isSelected && (
              <CheckCircleIcon className="absolute -top-1.5 -right-1.5 w-6 h-6 text-red-500 bg-white rounded-full" />
            )}
            <div className="w-6 h-10 flex flex-col items-center">
              <div className={`w-5 h-2 ${capBgClass} rounded-t-sm`}></div>
              <div className="w-3 h-8 border-x border-b border-gray-300 bg-gray-100/50 rounded-b-md"></div>
            </div>
            <span className={`text-xs text-center font-bold ${isSelected ? 'text-red-600' : 'text-slate-700'}`}>
              {tubeType}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TubeTypeSelector;
