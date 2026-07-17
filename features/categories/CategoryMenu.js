'use client';

import Link from 'next/link';
import { 
  RiceIcon, 
  PersonalCareIcon, 
  HomeCareIcon, 
  BabyCareIcon, 
  BeveragesIcon,
  OrderIcon
} from '../../components/Icons';

export const CATEGORIES = [
  { name: 'Grocery', slug: 'rice', icon: <RiceIcon size={24} /> },
  { name: 'Personal Care', slug: 'personal-care', icon: <PersonalCareIcon size={24} /> },
  { name: 'Home Care', slug: 'home-care', icon: <HomeCareIcon size={24} /> },
  { name: 'Baby Care', slug: 'baby-care', icon: <BabyCareIcon size={24} /> },
  { name: 'Snacks & Drinks', slug: 'beverages', icon: <BeveragesIcon size={24} /> },
  { name: 'More', slug: 'all', icon: <OrderIcon size={24} /> }
];

export default function CategoryMenu() {
  return (
    <section className="category-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">SHOP YOUR WAY</p>
          <h2>Shop by Category</h2>
        </div>
        <Link href="/search">See all →</Link>
      </div>
      <div className="category-rail">
        {CATEGORIES.map(cat => (
          <Link className="category-tile" key={cat.slug} href={cat.slug === 'all' ? '/search' : `/category/${cat.slug}`}>
            <span className="category-tile-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--honey-amber)', marginBottom: '8px' }}>
              {cat.icon}
            </span>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
