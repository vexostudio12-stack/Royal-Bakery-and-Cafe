'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
  color: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Birthday Cakes',
    description: 'Custom designed cakes for your special day',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814a69f?w=600&h=600&fit=crop',
    icon: '🎂',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 2,
    name: 'Chocolate Cakes',
    description: 'Rich, decadent chocolate flavors',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop',
    icon: '🍫',
    color: 'from-amber-600 to-amber-700',
  },
  {
    id: 3,
    name: 'Pastries',
    description: 'Butter-layered pastries baked fresh daily',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop',
    icon: '🥐',
    color: 'from-yellow-400 to-yellow-500',
  },
  {
    id: 4,
    name: 'Premium Coffee',
    description: 'Artisan coffee from around the world',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop',
    icon: '☕',
    color: 'from-amber-800 to-amber-900',
  },
];

export const SignatureProducts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Title animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        markers: false,
      },
      opacity: 0,
      y: 60,
    });

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
        },
        opacity: 0,
        y: 80,
        delay: index * 0.1,
      });
    });

    // Hover animation for cards
    cardsRef.current.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -20,
          boxShadow: '0 40px 80px rgba(255, 215, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        });

        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        });

        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="signature-products"
      className="relative w-full py-24 px-4 bg-gradient-to-b from-[#1a1410] to-[#2d2419]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-radial from-[#ffd700]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight"
          >
            Our Signature{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#ff69b4]">
              Products
            </span>
          </h2>
          <p className="text-[#d4a574] text-lg font-light">
            Handcrafted with passion and premium ingredients
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer glass-effect backdrop-blur-xl border border-white/10 hover:border-[#ffd700]/30 transition-all duration-300"
            >
              {/* Product image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                <div className="text-4xl">{product.icon}</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-light text-white">{product.name}</h3>
                  <p className="text-sm text-[#d4a574] font-light">{product.description}</p>
                </div>
              </div>

              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};