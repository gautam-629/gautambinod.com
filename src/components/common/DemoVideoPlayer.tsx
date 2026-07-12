'use client';

import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';

interface DemoVideoPlayerProps {
  videoUrl: string;
}

export function DemoVideoPlayer({ videoUrl }: DemoVideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getYoutubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    
    // Check if it's already an embed URL
    if (url.includes("youtube.com/embed/")) {
      return url;
    }
    
    // Extract ID from watch?v= or youtu.be/ or embed/
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }

    return null;
  };

  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
      >
        <Play className="h-4 w-4" /> Watch Demo Video
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-4xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden z-10 scale-in duration-200 animate-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-muted/30">
              <h3 className="text-sm font-semibold text-foreground">Demo Video</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video Body */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title="Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full absolute inset-0"
                />
              ) : (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full max-h-[70vh]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
