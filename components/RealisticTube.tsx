
import React from 'react';
import { TubeType, TUBE_COLORS, TUBE_CAP_GRADIENTS, TUBE_BODY_COLORS } from '../types';

interface RealisticTubeProps {
  tubeType: TubeType | null;
}

const RealisticTube: React.FC<RealisticTubeProps> = ({ tubeType }) => {
  if (!tubeType) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-80 bg-slate-100 rounded-lg text-slate-500 p-4">
          <p className="text-center">Select a tube type to see a preview</p>
        </div>
    );
  }

  const capGradient = TUBE_CAP_GRADIENTS[tubeType];
  const [capBgClass, capBorderClass] = TUBE_COLORS[tubeType].split(' ');
  const [tubeBodyBgClass, tubeBodyBorderClass] = TUBE_BODY_COLORS[tubeType].split(' ');

  // Create an array for the ribs for easier rendering
  const ribs = Array.from({ length: 12 });

  return (
    <div className="relative w-32 h-80 flex flex-col items-center" aria-label={`A realistic illustration of a ${tubeType} test tube.`}>
      {/* Cap */}
      <div className="w-28 h-20 relative z-10 flex flex-col items-center">
        {/* Top surface */}
        <div className={`w-24 h-4 rounded-t-md ${capBgClass} relative`}>
          <div className="absolute inset-x-2 top-1 h-2 bg-black/10 rounded-sm shadow-inner"></div>
        </div>
        {/* Main cap body */}
        <div className={`w-24 h-14 bg-gradient-to-r ${capGradient} relative overflow-hidden`}>
           {/* Ribs overlay */}
          <div className="absolute inset-0 flex justify-between px-px">
            {ribs.map((_, i) => (
              <div key={i} className="w-px h-full bg-black/10"></div>
            ))}
          </div>
        </div>
        {/* Cap lip */}
        <div className={`w-full h-3 ${capBgClass} rounded-b-sm`}></div>
      </div>

      {/* Tube Body */}
      <div className={`w-24 flex-grow bg-white border-x-2 border-b-2 ${tubeBodyBorderClass} rounded-b-3xl overflow-hidden relative shadow-inner`}>
        {/* Liquid inside */}
        <div className={`absolute bottom-0 left-0 right-0 h-2/5 ${tubeBodyBgClass} opacity-80`}></div>
        
        {/* Label */}
        <div className="absolute top-5 left-0 right-0 h-16 bg-white/95 border-y border-gray-200 px-2 py-1 flex flex-col justify-between items-center">
            <div className={`h-2 w-full ${capBgClass}`}></div>
            <p className="text-center font-bold text-slate-700 text-lg tracking-wider">{tubeType}</p>
            <div className="h-0.5 w-full bg-gray-300"></div>
        </div>
        
        {/* Glass shine effect */}
        <div className="absolute top-0 left-2 w-4 h-full bg-white/40 rounded-full blur-md opacity-80"></div>
      </div>
    </div>
  );
};

export default RealisticTube;
