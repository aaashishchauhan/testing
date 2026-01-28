
export type SpecimenType = 'Blood' | 'Urine' | 'Stool' | 'Sputum' | 'Swab' | 'Other';
export type TubeType = 'EDTA' | 'SST' | 'Fluoride' | 'Sodium Citrate' | 'Heparin';

export interface Patient {
  id: string;
  name: string;
}

export interface Test {
  id: string;
  name: string;
}

export interface Sample {
  id: string;
  specimenType: SpecimenType;
  tubeType: TubeType | null;
  barcode: string;
  isNba: boolean;
  proofOfCollection: string | null; // Data URL of the image
}

export interface Lab {
  id: string;
  name: string;
  tests: Test[];
  samples: Sample[];
}

export const TUBE_COLORS: Record<TubeType, string> = {
    'EDTA': 'bg-purple-500 border-purple-700',
    'SST': 'bg-yellow-400 border-yellow-600',
    'Fluoride': 'bg-gray-400 border-gray-600',
    'Sodium Citrate': 'bg-blue-400 border-blue-600',
    'Heparin': 'bg-green-500 border-green-700'
};

export const TUBE_CAP_GRADIENTS: Record<TubeType, string> = {
    'EDTA': 'from-purple-400 to-purple-600',
    'SST': 'from-yellow-300 to-yellow-500',
    'Fluoride': 'from-gray-300 to-gray-500',
    'Sodium Citrate': 'from-blue-300 to-blue-500',
    'Heparin': 'from-green-400 to-green-600'
};

export const TUBE_BODY_COLORS: Record<TubeType, string> = {
    'EDTA': 'bg-purple-100/50 border-purple-300',
    'SST': 'bg-yellow-100/50 border-yellow-300',
    'Fluoride': 'bg-gray-100/50 border-gray-300',
    'Sodium Citrate': 'bg-blue-100/50 border-blue-300',
    'Heparin': 'bg-green-100/50 border-green-300'
};

export const SPECIMEN_TYPES: SpecimenType[] = ['Blood', 'Urine', 'Stool', 'Sputum', 'Swab', 'Other'];
export const TUBE_TYPES: TubeType[] = ['EDTA', 'SST', 'Fluoride', 'Sodium Citrate', 'Heparin'];
