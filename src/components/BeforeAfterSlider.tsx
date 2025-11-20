import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'Before', 
  afterLabel = 'After' 
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <div
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-amber-500 text-primary-foreground px-3 py-1 rounded text-sm">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Foreground with clip) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <ImageWithFallback
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-card px-3 py-1 rounded text-sm text-card-foreground">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-card cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center">
          <MoveHorizontal className="w-6 h-6 text-card-foreground" />
        </div>
      </div>
    </div>
  );
}
