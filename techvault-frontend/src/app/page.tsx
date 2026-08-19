'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedDeals from '@/components/home/FeaturedDeals';
import TrendingTabs from '@/components/home/TrendingTabs';
import BrandShowcase from '@/components/home/BrandShowcase';
import CustomerReviews from '@/components/home/CustomerReviews';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-sky-600 selection:text-white">
      <Navbar />

      <main className="flex-1 w-full px-3 sm:px-8 lg:px-12 py-4 sm:py-8 space-y-8 sm:space-y-16 pb-24 sm:pb-8">
        {/* Flagship Hero Carousel */}
        <HeroBanner />

        {/* 26 Electronics Category Grid */}
        <CategoryGrid />

        {/* Live Flash Deals of the Day with Real-time Countdown */}
        <FeaturedDeals />

        {/* Curated Hardware Tabs (Trending, Best Sellers, New Releases) */}
        <TrendingTabs />

        {/* Official Brand Stores */}
        <BrandShowcase />

        {/* Verified Customer Feedback */}
        <CustomerReviews />
      </main>

      <Footer />
    </div>
  );
}
