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

import { CATEGORIES } from './constants';

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
