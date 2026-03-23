import React, { useRef, useState, useEffect } from "react";
import { Eraser, Pencil, RotateCcw } from "lucide-react";

export default function DrawingCanvas({ letter }: { letter?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setHasDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [letter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width);
      canvas.height = Math.round(rect.height);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const evt = "touches" in e ? e.touches[0] : e;
    return { x: (evt.clientX - rect.left) * scaleX, y: (evt.clientY - rect.top) * scaleY };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    lastPosRef.current = getPos(e);
    setIsDrawing(true);
    setHasDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !lastPosRef.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "hsl(var(--foreground))";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPosRef.current = pos;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasDrawing(false);
  };

  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Pencil className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Vizato Shkronjën</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Vizato shkronjën <strong>"{letter || "?"}"</strong> brenda kutisë!
      </p>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-52 border-2 border-dashed border-primary/20 rounded-xl bg-card cursor-crosshair touch-none block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.08]">
            <span className="font-bold text-foreground" style={{ fontSize: "8rem" }}>{letter || "?"}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <button onClick={clearCanvas} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-foreground/70 text-sm hover:bg-secondary/80 transition-colors">
          <Eraser className="w-3.5 h-3.5" /> Fshi
        </button>
        <button onClick={clearCanvas} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-foreground/70 text-sm hover:bg-secondary/80 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> Rifillo
        </button>
      </div>
    </div>
  );
}
