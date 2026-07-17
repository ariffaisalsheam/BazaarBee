'use client';

import Link from 'next/link';
import HomeHero from '../features/home/HomeHero';
import CategoryMenu from '../features/categories/CategoryMenu';
import ProductCard from '../features/products/ProductCard';

const products = [
  ['ACI Pure Soyabean Oil', 'ACI', 'oil', 'aci_oil', '1 Litre Bottle', 175, 185],
  ['Teer Refined Sugar', 'Teer', 'sugar', 'teer_sugar', '1 Kg Pack', 135, 140],
  ['Rashid Miniket Rice', 'Rashid', 'rice', 'miniket_rice', '5 Kg Bag', 360, 380],
  ['Radhuni Premium Lentils', 'Radhuni', 'lentils', 'radhuni_lentils', '1 Kg Pack', 155, 165],
  ['Fresh Maida', 'Fresh', 'flour', 'fresh_flour', '1 Kg Pack', 70, 75],
  ['Ispahani Mirzapore Tea', 'Ispahani', 'tea', 'mirzapore_tea', '200g Pack', 105, 110],
].map(([name, brandName, categorySlug, imageFileId, variantName, sellingPrice, mrp], index) => ({ $id: `product-${index}`, name, brandName, categorySlug, imageFileId, variants: [{ name: variantName, sku: `SKU-${index}`, sellingPrice, mrp, stock: 30, weight: variantName.includes('5') ? 5 : 1, unit: 'Kg' }] }));

export default function Home() {
  return <div className="storefront"><div className="container">
    <HomeHero />
    <section className="benefit-row"><div><b>✺</b><span><strong>Best Price</strong>Market-er theke kom dame</span></div><div><b>✓</b><span><strong>100% Original</strong>Authentic products guaranteed</span></div><div><b>🛵</b><span><strong>On-time Delivery</strong>Choose a convenient slot</span></div><div><b>◉</b><span><strong>Customer Support</strong>We are here to help</span></div></section>
    <div id="categories-section"><CategoryMenu /></div>
    <section id="products-list" className="product-section"><div className="section-heading"><div><p className="section-kicker">HANDPICKED FOR YOU</p><h2>Best Sellers</h2></div><Link href="/search">See all →</Link></div><div className="grid-cols-3">{products.map(product => <ProductCard key={product.$id} product={product} />)}</div></section>
    <section className="promotions"><div className="delivery-promo"><div><p>FREE DELIVERY</p><strong>On orders above ৳1,500</strong><span>Same-day slots available</span></div><b>🛵</b></div><div className="offer-promo"><p>OFFERS FOR YOU</p><h2>Up to <em>10% OFF</em></h2><span>On selected everyday essentials</span><button className="btn btn-dark">Shop offer →</button></div></section>
    <section className="delivery-slots"><div className="section-heading"><div><p className="section-kicker">FLEXIBLE & SIMPLE</p><h2>How our delivery works</h2></div></div><div><article><b>☀</b><strong>11:00 AM – 2:00 PM</strong><span>Order before 10:00 AM</span></article><article><b>🌤</b><strong>2:00 PM – 5:00 PM</strong><span>Order before 1:00 PM</span></article><article><b>🌇</b><strong>5:00 PM – 8:00 PM</strong><span>Order before 4:00 PM</span></article></div></section>
  </div></div>;
}
