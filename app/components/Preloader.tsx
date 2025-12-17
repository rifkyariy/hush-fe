"use client";

import { useEffect, useRef, useState } from "react";

const Preloader = ({ onComplete, videoSrc }: { onComplete: () => void; videoSrc: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isFaded, setIsFaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const PRELOAD_MS = 100; // Show preloader for only 100ms
    const FADE_MS = 100; // Fade duration for opacity transitions

    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleCanPlay = () => {
      // Video is ready to play, fade in will happen automatically
      console.log('Video can play');
    };

    const handlePlay = () => {
      console.log('Video started playing');
    };

    const handleVideoEnded = () => {
      // Video has finished playing, start fade out
      console.log('Video ended, starting fade out');
      setIsFaded(true);

      // Complete preloader after fade out transition
      // Ensure we clear any minDisplayTimer and fade quickly
      if (minDisplayTimeout) clearTimeout(minDisplayTimeout);
      setIsFaded(true);
      fadeTimeout = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, FADE_MS);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      // If video fails, quickly fade out (keep the UI snappy) after preloader ms
      if (minDisplayTimeout) clearTimeout(minDisplayTimeout);
      setIsFaded(true);
      fadeTimeout = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, FADE_MS);
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleVideoEnded);
    video.addEventListener('error', handleError);

    // Trigger video load and also ensure preloader is only visible for the short window
    video.load();

    const minDisplayTimeout = setTimeout(() => {
      setIsFaded(true);
      fadeTimeout = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, FADE_MS);
    }, PRELOAD_MS);

    return () => {
      if (minDisplayTimeout) clearTimeout(minDisplayTimeout);
      if (fadeTimeout) clearTimeout(fadeTimeout);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleVideoEnded);
      video.removeEventListener('error', handleError);
    };
  }, [onComplete, videoSrc]);

  // Fade in: starts at opacity-0, transitions to opacity-100
  // After video ends: transitions back to opacity-0
  const opacityClass = isVisible
    ? (isFaded ? 'opacity-0' : 'opacity-100')
    : 'opacity-0';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-100 ${opacityClass}`}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div className="text-center w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          className="w-[700px] object-cover"
        />
      </div>
    </div>
  );
};

export default Preloader;