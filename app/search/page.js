'use client';

import { useSearchParams } from 'next/navigation';
import ProductCard from '../../features/products/ProductCard';
import SearchBar from '../../features/search/SearchBar';
import CategoryMenu from '../../features/categories/CategoryMenu';
import { Suspense } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

// Full list of products for search indexing (simulation)
const ALL_PRODUCTS = [
  {
    $id: 'prod_aci_oil',
    name: 'ACI Pure Soyabean Oil',
    banglaName: 'এসিআই পিওর সয়াবিন তেল',
    brandName: 'ACI',
    categorySlug: 'oil',
    imageFileId: 'img_aci_oil',
    tags: ['oil', 'cooking', 'soyabean', 'সয়াবিন', 'তেল'],
    variants: [
      { name: '1 Litre Bottle', sku: 'ACI-OIL-1L', mrp: 185, sellingPrice: 175, stock: 50, weight: 1, unit: 'Litre' },
      { name: '2 Litre Bottle', sku: 'ACI-OIL-2L', mrp: 365, sellingPrice: 345, stock: 35, weight: 2, unit: 'Litre' },
      { name: '5 Litre Can', sku: 'ACI-OIL-5L', mrp: 910, sellingPrice: 870, stock: 20, weight: 5, unit: 'Litre' }
    ]
  },
  {
    $id: 'prod_teer_sugar',
    name: 'Teer Refined Sugar',
    banglaName: 'তীর রিফাইনড চিনি',
    brandName: 'Teer',
    categorySlug: 'sugar',
    imageFileId: 'img_teer_sugar',
    tags: ['sugar', 'sweetener', 'চিনি'],
    variants: [
      { name: '1 Kg Pack', sku: 'TEER-SUGAR-1KG', mrp: 140, sellingPrice: 135, stock: 100, weight: 1, unit: 'Kg' },
      { name: '2 Kg Pack', sku: 'TEER-SUGAR-2KG', mrp: 275, sellingPrice: 265, stock: 45, weight: 2, unit: 'Kg' }
    ]
  },
  {
    $id: 'prod_miniket_rice',
    name: 'Rashid Miniket Rice',
    banglaName: 'রশিদ মিনিকেট চাল (প্রিমিয়াম)',
    brandName: 'Rashid',
    categorySlug: 'rice',
    imageFileId: 'img_miniket_rice',
    tags: ['rice', 'chal', 'চাল'],
    variants: [
      { name: '5 Kg Bag', sku: 'RASHID-RICE-5KG', mrp: 380, sellingPrice: 360, stock: 80, weight: 5, unit: 'Kg' },
      { name: '10 Kg Bag', sku: 'RASHID-RICE-10KG', mrp: 750, sellingPrice: 710, stock: 40, weight: 10, unit: 'Kg' }
    ]
  },
  {
    $id: 'prod_radhuni_lentils',
    name: 'Radhuni Premium Lentils',
    banglaName: 'রাধুনী প্রিমিয়াম মসুর ডাল',
    brandName: 'Radhuni',
    categorySlug: 'lentils',
    imageFileId: 'img_radhuni_lentils',
    tags: ['lentils', 'dal', 'ডাল'],
    variants: [
      { name: '500g Pack', sku: 'RADHUNI-LENTILS-500G', mrp: 85, sellingPrice: 80, stock: 120, weight: 500, unit: 'g' },
      { name: '1 Kg Pack', sku: 'RADHUNI-LENTILS-1KG', mrp: 165, sellingPrice: 155, stock: 75, weight: 1, unit: 'Kg' }
    ]
  },
  {
    $id: 'prod_fresh_flour',
    name: 'Fresh Maida',
    banglaName: 'ফ্রেশ প্রিমিয়াম ময়দা',
    brandName: 'Fresh',
    categorySlug: 'flour',
    imageFileId: 'img_fresh_flour',
    tags: ['flour', 'maida', 'আটা', 'ময়দা'],
    variants: [
      { name: '1 Kg Pack', sku: 'FRESH-FLOUR-1KG', mrp: 75, sellingPrice: 70, stock: 150, weight: 1, unit: 'Kg' },
      { name: '2 Kg Pack', sku: 'FRESH-FLOUR-2KG', mrp: 145, sellingPrice: 135, stock: 60, weight: 2, unit: 'Kg' }
    ]
  },
  {
    $id: 'prod_ispahani_tea',
    name: 'Ispahani Mirzapore Tea',
    banglaName: 'ইস্পাহানি মির্জাপুর চা',
    brandName: 'Ispahani',
    categorySlug: 'tea',
    imageFileId: 'img_ispahani_tea',
    tags: ['tea', 'cha', 'চা'],
    variants: [
      { name: '200g Pack', sku: 'ISPAHANI-TEA-200G', mrp: 110, sellingPrice: 105, stock: 90, weight: 200, unit: 'g' }
    ]
  }
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { language, t } = useLanguage();

  const cleanQuery = query.toLowerCase().trim();

  // Search filter checking product details & variant info
  const results = ALL_PRODUCTS.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(cleanQuery);
    const banglaMatch = product.banglaName && product.banglaName.toLowerCase().includes(cleanQuery);
    const brandMatch = product.brandName.toLowerCase().includes(cleanQuery);
    const categoryMatch = product.categorySlug.toLowerCase().includes(cleanQuery);
    const tagsMatch = product.tags && product.tags.some(t => t.toLowerCase().includes(cleanQuery));

    return nameMatch || banglaMatch || brandMatch || categoryMatch || tagsMatch;
  });

  return (
    <>
      <SearchBar initialQuery={query} />
      
      <CategoryMenu />

      <section style={{ marginTop: '40px', marginBottom: '60px' }}>
        <h1 className="text-title" style={{ fontSize: '22px', marginBottom: '20px' }}>
          {t('searchResultsTitle')}: "{query}" ({results.length} {language === 'BN' ? 'টি পণ্য পাওয়া গেছে' : t('foundCount')})
        </h1>

        {results.length === 0 ? (
          <div className="card" style={{ padding: '60px 20px', textAlign: 'center', color: '#6B7280' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '15px' }}>🐝</span>
            <h3>{t('searchEmpty')}</h3>
            <p style={{ marginTop: '5px' }}>{t('searchEmptyDesc')}</p>
          </div>
        ) : (
          <div className="grid-cols-3">
            {results.map(product => (
              <ProductCard key={product.$id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="container">
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px 0' }}>খোঁজা হচ্ছে...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
