// src/types/finisher.d.ts
interface FinisherHeaderOptions {
  count: number;
  size: { min: number; max: number; pulse: number };
  speed: { x: { min: number; max: number }; y: { min: number; max: number } };
  colors: {
    background: string;
    particles: string[];
  };
  blending: string;
  opacity: number;
}

interface Window {
  FinisherHeader: new (options: FinisherHeaderOptions) => void;
}