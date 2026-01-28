
import React from 'react';
import { TubeType, TUBE_COLORS, TUBE_CAP_GRADIENTS, TUBE_BODY_COLORS } from '../types';

interface RealisticTubeProps {
  tubeType: TubeType | null;
}

const RealisticTube: React.FC<RealisticTubeProps> = ({ tubeType }) => {
  if (!tubeType) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[12rem] bg-slate-100 rounded-2xl text-slate-500 p-4 shadow-inner">
          <p className="text-center text-sm">Select a tube type to see a preview</p>
        </div>
    );
  }

  const [capBgClass] = TUBE_COLORS[tubeType].split(' ');
  const [tubeBodyBgClass, tubeBodyBorderClass] = TUBE_BODY_COLORS[tubeType].split(' ');

  return (
    <div className="w-full h-full p-4 bg-slate-100/80 rounded-2xl shadow-inner flex items-center justify-center">
      <div className="relative w-20 h-48 flex flex-col items-center">
        {/* Cap */}
        <div className={`w-16 h-6 ${capBgClass} rounded-t-md z-10 shadow-lg`}></div>

        {/* Tube Body */}
        <div className={`w-16 flex-grow bg-white border-2 ${tubeBodyBorderClass} rounded-b-2xl overflow-hidden relative shadow-inner`}>
          {/* Liquid inside */}
          <div className={`absolute bottom-0 left-0 right-0 h-2/5 ${tubeBodyBgClass} opacity-80`}></div>
          
          {/* Label */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-12 bg-white/95 border border-gray-200 px-1 py-1 flex flex-col justify-between items-center shadow-sm">
              <div className={`h-0.5 w-full ${capBgClass}`}></div>
              <p className="text-center font-bold text-slate-800 text-base tracking-wide">{tubeType}</p>
              <div className={`h-px w-full bg-gray-300`}></div>
          </div>
          
          {/* Glass shine effect */}
          <div className="absolute top-0 left-1 w-3 h-full bg-white/40 rounded-full blur-sm opacity-80"></div>
        </div>
      </div>
    </div>
  );
};

export default RealisticTube;
