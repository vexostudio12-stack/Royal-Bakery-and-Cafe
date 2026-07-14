'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const floatingItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Title animation
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      });
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        delay: 0.2,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      });
    }

    // Buttons animation
    if (buttonsRef.current) {
      gsap.from(buttonsRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        delay: 0.4,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      });
    }

    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 12,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Floating elements animation
    if (floatingItemsRef.current) {
      const items = floatingItemsRef.current.querySelectorAll('.floating-item');
      items.forEach((item, index) => {
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = Math.random() * 200 - 100;
        const duration = 8 + Math.random() * 4;

        gsap.to(item, {
          x: randomX,
          y: randomY,
          duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1410] via-[#2d2419] to-[#3d3428]"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full max-w-4xl max-h-4xl bg-gradient-radial from-[#ffd700]/20 to-transparent rounded-full blur-3xl opacity-40 -top-1/2 -right-1/4" />
        <div className="absolute bottom-0 left-0 w-full h-full max-w-4xl max-h-4xl bg-gradient-radial from-[#ff69b4]/15 to-transparent rounded-full blur-3xl opacity-30 -bottom-1/2 -left-1/4" />
      </div>

      {/* Floating bakery elements */}
      <div ref={floatingItemsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-item absolute w-12 h-12 rounded-full backdrop-blur-md"
            style={{
              left: `${(i / 8) * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: [
                'rgba(255, 215, 0, 0.05)',
                'rgba(255, 105, 180, 0.05)',
                'rgba(255, 250, 205, 0.05)',
              ][i % 3],
              border: '1px solid rgba(255, 215, 0, 0.1)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-4xl">
          {/* Main headline */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-light tracking-tight text-white leading-tight"
          >
            Baked Fresh.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ff69b4]">
              Served with Love.
            </span>
          </h1>

          {/* Subheading */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-[#d4a574] font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
          >
            Freshly baked cakes, artisan breads, premium coffee, and unforgettable moments
            crafted with passion in every bite.
          </p>

          {/* Call-to-action buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              href="#menu"
              className="group px-8 py-4 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a1410] font-semibold rounded-full hover:shadow-lg hover:shadow-[#ffd700]/30 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative"
            >
              <span className="relative z-10">Order Now</span>
              <svg
                className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffed4e] to-[#ffd700] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
            </Link>

            <Link
              href="#signature-products"
              className="group px-8 py-4 border-2 border-[#ffd700] text-[#ffd700] font-semibold rounded-full hover:bg-[#ffd700]/5 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>Explore Menu</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[#d4a574] tracking-widest uppercase">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-[#ffd700] rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-[#ffd700] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffd700_1px,transparent_1px),linear-gradient(-45deg,#ffd700_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
    </div>
  );
};