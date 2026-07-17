'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../hooks/useCart';
import { useLanguage } from '../hooks/useLanguage';
import CartDrawer from '../features/cart/CartDrawer';
import LocationPickerModal from './LocationPickerModal';
import { LocationIcon } from './Icons';

export default function Header() {
  const { cartItems, deliveryAddress, deliveryCoords, setDeliveryLocation } = useCart();
  const { toggleLanguage, language } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return <>
    <div className="delivery-strip">
      <span>⚡ {language === 'BN' ? 'রংপুর সিটিতে দ্রুত ডেলিভারি' : 'Fast delivery across Rangpur City'}</span>
      <span>{language === 'BN' ? 'আসল পণ্য · সেরা দাম · সহজ রিটার্ন' : 'Original products · Best price · Easy returns'}</span>
    </div>
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-lockup" aria-label="BazaarBee home">
          <Image src="/mascot.jpg" alt="" width={42} height={42} className="brand-logo" style={{ borderRadius: '50%', objectFit: 'cover' }} />
          <span>Bazaar<span>Bee</span></span>
        </Link>

        {/* Foodpanda-style clickable location pill */}
        <button className="location-pill" onClick={() => setIsLocOpen(true)} type="button">
          <span className="lp-icon"><LocationIcon size={16} /></span>
          <span className="lp-text">
            <span className="lp-label">{language === 'BN' ? 'ডেলিভারি করুন' : 'Deliver to'}</span>
            <span className="lp-address">{deliveryAddress || 'Rangpur'}</span>
          </span>
          <span className="lp-chevron">▾</span>
        </button>

        <Link href="/search" className="header-search">
          {language === 'BN' ? 'গ্রোসারি, ব্র্যান্ড খুঁজুন...' : 'Search for groceries, brands...'} <b>⌕</b>
        </Link>

        <nav className="header-actions" aria-label="Quick links">
          <Link href="/orders">◫ <span>{language === 'BN' ? 'অর্ডার' : 'Orders'}</span></Link>
          <button onClick={toggleLanguage}>A/অ <span>{language === 'BN' ? 'EN' : 'বাংলা'}</span></button>
          <button onClick={() => setIsCartOpen(true)} className="cart-trigger">
            🛒 <span>{language === 'BN' ? 'ঝুড়ি' : 'Cart'}</span>{totalItems > 0 && <i>{totalItems}</i>}
          </button>
        </nav>
      </div>
    </header>

    <nav className="mobile-nav" aria-label="Mobile navigation">
      <Link href="/">⌂<span>Home</span></Link>
      <Link href="#categories-section">▦<span>Categories</span></Link>
      <Link href="/search">⌕<span>Search</span></Link>
      <button onClick={() => setIsCartOpen(true)}>🛒<span>Cart</span>{totalItems > 0 && <i>{totalItems}</i>}</button>
      <Link href="/orders">♙<span>Account</span></Link>
    </nav>

    {/* Cart Drawer */}
    {isCartOpen && (
      <div className="cart-overlay" role="dialog" aria-modal="true">
        <div onClick={() => setIsCartOpen(false)} />
        <div className="cart-panel"><CartDrawer onClose={() => setIsCartOpen(false)} /></div>
      </div>
    )}

    {/* Location Picker Modal */}
    <LocationPickerModal
      isOpen={isLocOpen}
      onClose={() => setIsLocOpen(false)}
      initialCoords={deliveryCoords}
      onConfirm={(loc) => setDeliveryLocation(loc)}
    />
  </>;
}
