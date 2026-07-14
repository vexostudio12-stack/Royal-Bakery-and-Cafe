'use client';

import { useState, useEffect } from 'react';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { HeroSection } from '@/components/HeroSection';
import { SignatureProducts } from '@/components/SignatureProducts';
import Head from 'next/head';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling during loading
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
      <Head>
        <title>Royal Bakery & Cafe - Premium Baked Goods & Coffee</title>
        <meta name="description" content="Experience luxury baking at Royal Bakery & Cafe. Fresh cakes, pastries, artisan bread, and premium coffee. Open 24/7." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Royal Bakery & Cafe - Premium Baked Goods" />
        <meta property="og:description" content="Experience luxury baking with fresh cakes, pastries, and premium coffee." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {isLoading && (
        <LoadingAnimation onComplete={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        <main className="w-full">
          <HeroSection />
          <SignatureProducts />
          {/* More sections to be added */}
        </main>
      )}
    </>
  );
}