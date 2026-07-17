'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../hooks/useCart';
import { useLanguage } from '../../hooks/useLanguage';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const variants = product.variants || [];

  // Default to first active variant
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);

  const handleVariantChange = (e) => {
    const sku = e.target.value;
    const variant = variants.find(v => v.sku === sku);
    setSelectedVariant(variant);
  };

  if (!selectedVariant) {
    return null;
  }

  const savings = selectedVariant.mrp - selectedVariant.sellingPrice;
  const discountPercent = selectedVariant.mrp > 0
    ? Math.round((savings / selectedVariant.mrp) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.$id,
      productName: product.name,
      banglaName: product.banglaName,
      brandName: product.brandName || 'Brand',
      variantId: selectedVariant.sku, // using SKU as ID for mock
      variantName: selectedVariant.name,
      sku: selectedVariant.sku,
      price: selectedVariant.sellingPrice,
      mrp: selectedVariant.mrp,
      imageFileId: selectedVariant.imageFileId || product.imageFileId,
      unit: selectedVariant.unit,
      weight: selectedVariant.weight
    });
  };

  const isOutOfStock = selectedVariant.stock <= 0;

  // Decide title based on active language
  const productTitle = language === 'BN' && product.banglaName
    ? product.banglaName
    : product.name;

  return (
    <div className="product-card card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Discount Badge */}
      {savings > 0 && (
        <div style={{ alignSelf: 'flex-start' }} className="bg-mint-badge">
          -{discountPercent}% {t('discountBadge')} ({t('saveLabel')} ৳{savings})
        </div>
      )}

      {/* Product Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '140px',
        margin: '10px 0',
        backgroundColor: '#f9f9f9',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden'
      }}>
        <Image
          src="/mockup.png"
          alt={productTitle}
          fill
          style={{ objectFit: 'contain', padding: '10px' }}
        />
      </div>

      {/* Brand & Name */}
      <div style={{ flexGrow: 1 }}>
        <span style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          color: '#9CA3AF',
          fontWeight: 700,
          letterSpacing: '0.5px'
        }}>
          {product.brandName || 'BazaarBee'}
        </span>
        <h3 style={{ fontSize: '15px', color: 'var(--charcoal-grey)', margin: '2px 0 6px 0', height: '40px', overflow: 'hidden' }}>
          {productTitle}
        </h3>
      </div>

      {/* Variant Selector Dropdown */}
      {variants.length > 1 ? (
        <select
          value={selectedVariant.sku}
          onChange={handleVariantChange}
          style={{
            width: '100%',
            padding: '6px 10px',
            border: '1px solid var(--border-grey)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            marginBottom: '10px',
            backgroundColor: 'var(--clean-white)'
          }}
        >
          {variants.map(v => (
            <option key={v.sku} value={v.sku}>
              {v.name} ({v.weight} {v.unit})
            </option>
          ))}
        </select>
      ) : (
        <div style={{
          fontSize: '13px',
          color: '#6B7280',
          padding: '6px 0',
          marginBottom: '10px',
          fontWeight: 500
        }}>
          {t('quantityLabel')}: {selectedVariant.name}
        </div>
      )}

      {/* Price & Add button */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--charcoal-grey)' }}>
            ৳{selectedVariant.sellingPrice}
          </span>
          {savings > 0 && (
            <span style={{ fontSize: '13px', textDecoration: 'line-through', color: '#9CA3AF' }}>
              ৳{selectedVariant.mrp}
            </span>
          )}
        </div>

        {/* Stock status indicator */}
        <div style={{ fontSize: '12px', margin: '4px 0', color: isOutOfStock ? '#EF4444' : '#10B981', fontWeight: 600 }}>
          {isOutOfStock
            ? t('outStock')
            : `${t('inStock')}: ${selectedVariant.stock} ${language === 'BN' ? 'টি' : 'items'}`}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: 'var(--radius-sm)',
            opacity: isOutOfStock ? 0.6 : 1,
            cursor: isOutOfStock ? 'not-allowed' : 'pointer'
          }}
        >
          {t('addCartBtn')}
        </button>
      </div>
    </div>
  );
}
