'use client';

import { useState, useEffect } from 'react';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { HeroSection } from '@/components/HeroSection';
import { SignatureProducts } from '@/components/SignatureProducts';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingAnimation onComplete={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        <main className="w-full">
          <HeroSection />
          <SignatureProducts />
          <Footer />
        </main>
      )}
    </>
  );
}
