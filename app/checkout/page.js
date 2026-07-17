'use client';

import Image from 'next/image';
import CheckoutForm from '../../features/checkout/CheckoutForm';

export default function CheckoutPage() {
  return <div className="container checkout-page" style={{ marginBottom: '60px' }}>
    <section className="checkout-intro"><div><p className="section-kicker">ONE MORE STEP TO YOUR BAZAAR</p><h1>Let&apos;s get your goodies home, safely.</h1><p>Buzz will keep your order fresh, packed, and right on time.</p></div><Image src="/buzz-shopping.png" alt="Buzz carrying a shopping basket" width={135} height={135} className="checkout-buzz" priority /></section>
    <ol className="checkout-steps" aria-label="Checkout progress"><li className="is-complete"><b>✓</b><span>Cart</span></li><li className="is-active"><b>2</b><span>Delivery details</span></li><li><b>3</b><span>Confirm</span></li></ol>
    <CheckoutForm />
  </div>;
}
