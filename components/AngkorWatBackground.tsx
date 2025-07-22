
import React from 'react';

const AngkorWatBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <style>{`
        @keyframes slow-pan-1 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-10%); }
        }
        @keyframes slow-pan-2 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-5%); }
        }
        @keyframes slow-pan-3 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-2%); }
        }
        @keyframes subtle-glow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }
      `}</style>

      {/* Farthest layer - subtle, dark, slowest */}
      <div
        className="absolute bottom-0 left-0 w-[220%] h-3/5 bg-repeat-x"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Cpath d='M0 200 L0 150 C50 140, 100 160, 150 150 C180 145, 200 120, 220 100 L230 80 L240 100 C260 120, 280 145, 310 150 C360 160, 410 140, 460 150 L500 155 L520 120 L530 80 L540 120 L560 155 L650 150 C700 160, 750 140, 800 150 L800 200 Z' fill='%231a1611'/%3E%3C/svg%3E")`,
          animation: 'slow-pan-3 240s linear infinite alternate',
          opacity: 0.5,
        }}
      />
      
      {/* Middle layer */}
      <div
        className="absolute bottom-0 left-0 w-[210%] h-4/5 bg-repeat-x"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 300'%3E%3Cpath d='M0 300 L0 220 C40 210, 80 230, 120 220 L130 215 L140 180 L145 150 L150 120 L155 150 L160 180 L170 215 L180 220 C220 230, 260 210, 300 220 L350 225 L360 190 L370 150 L380 110 L390 70 L400 30 L410 70 L420 110 L430 150 L440 190 L450 225 L500 220 C540 210, 580 230, 620 220 L650 210 L660 180 L670 210 L700 220 C740 230, 780 210, 800 220 L800 300 Z' fill='%23211d17'/%3E%3C/svg%3E")`,
          animation: 'slow-pan-2 180s linear infinite alternate',
          opacity: 0.7,
        }}
      />

      {/* Closest layer - most detail, fastest pan */}
      <div
        className="absolute bottom-0 left-0 w-[200%] h-full bg-repeat-x"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cpath d='M0 400 L0 310 C50 300, 100 320, 150 310 L160 305 L170 270 L175 240 L180 210 L185 240 L190 270 L200 305 L250 310 C300 320, 350 300, 400 310 L410 312 L420 270 L430 230 L440 190 L450 150 L460 110 L470 70 L480 30 L490 70 L500 110 L510 150 L520 190 L530 230 L540 270 L550 312 L600 310 C650 300, 700 320, 750 310 L800 300 L800 400 Z' fill='%232a2721'/%3E%3C/svg%3E")`,
          animation: 'slow-pan-1 120s linear infinite alternate',
        }}
      />
       {/* Sun/Moon Glow */}
       <div 
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400 rounded-full blur-3xl"
        style={{ animation: 'subtle-glow 20s ease-in-out infinite' }}
      ></div>
    </div>
  );
};

export default AngkorWatBackground;
