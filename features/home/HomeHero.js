'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomeHero() {
  return <section className="home-hero">
    <div className="hero-copy">
      <p className="eyebrow">MONTHLY BAZAAR, MADE EASY</p>
      <h1>Rangpur&apos;er <em>Monthly Bazaar</em><br />Now Easier!</h1>
      <p className="hero-description">Authentic groceries, everyday essentials, and a delivery time that works around you.</p>
      <div className="hero-buttons"><a className="btn btn-dark" href="#products-list">Shop now <b>→</b></a><Link href="/search" className="text-link">Browse all products</Link></div>
      <div className="hero-assurances"><span>✓ 100% Original</span><span>◉ Best Price</span><span>🛵 On-time Delivery</span></div>
    </div>
    <div className="hero-art"><div className="hero-sun"></div><Image src="/mascot.jpg" alt="BazaarBee mascot with groceries" fill priority sizes="(max-width: 700px) 90vw, 48vw" /></div>
  </section>;
}
