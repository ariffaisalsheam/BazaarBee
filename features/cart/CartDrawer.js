import { useCart } from '../../hooks/useCart';
import { useLanguage } from '../../hooks/useLanguage';
import Link from 'next/link';
import Image from 'next/image';
import { getOptimizedImageUrl } from '../../lib/appwrite';

export default function CartDrawer({ onClose }) {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    subtotal,
    savings,
    deliveryCharge,
    total
  } = useCart();

  const { language, t } = useLanguage();

  const isCartEmpty = cartItems.length === 0;

  return (
    <div style={{
      background: 'var(--clean-white)',
      border: '1px solid var(--border-grey)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-grey)', paddingBottom: '12px' }}>
        <h2 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🛒</span> {t('cartHeader')} ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} {language === 'BN' ? 'টি' : 'items'})
        </h2>
        {onClose && (
          <button onClick={onClose} style={{ fontSize: '20px', color: '#9CA3AF' }} className="pulse-on-hover">
            ✖
          </button>
        )}
      </div>

      {isCartEmpty ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '10px' }}>🐝</span>
          <p style={{ fontWeight: 600, color: '#9CA3AF' }}>{t('cartEmpty')}</p>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '5px' }}>{t('cartEmptyDesc')}</p>
        </div>
      ) : (
        <>
          {/* Scrollable Items List */}
          <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '20px', paddingRight: '5px' }}>
            {cartItems.map((item) => {
              const itemTitle = language === 'BN' && item.banglaName ? item.banglaName : item.productName;
              return (
                <div key={item.sku} style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px dashed var(--border-grey)',
                  alignItems: 'center'
                }}>
                  {/* Product Image */}
                  <div style={{
                    position: 'relative',
                    width: '45px',
                    height: '45px',
                    backgroundColor: '#F3F4F6',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <Image
                      src={getOptimizedImageUrl('products', item.imageFileId)}
                      alt={itemTitle}
                      fill
                      style={{ objectFit: 'contain', padding: '2px' }}
                    />
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--charcoal-grey)' }}>
                      {itemTitle}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>
                      {item.variantName} ({item.weight} {item.unit})
                    </span>

                    {/* Price info */}
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--charcoal-grey)' }}>
                        ৳{item.price}
                      </span>
                      {item.mrp > item.price && (
                        <span style={{ fontSize: '11px', textDecoration: 'line-through', color: '#9CA3AF' }}>
                          ৳{item.mrp}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <div style={{ display: 'flex', border: '1px solid var(--border-grey)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                        style={{ padding: '2px 8px', background: '#F9FAFB', fontWeight: 700 }}
                      >
                        -
                      </button>
                      <span style={{ padding: '2px 10px', fontSize: '13px', fontWeight: 600, backgroundColor: 'var(--clean-white)' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                        style={{ padding: '2px 8px', background: '#F9FAFB', fontWeight: 700 }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.sku)}
                      style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600 }}
                    >
                      {t('removeBtn')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Calculations */}
          <div style={{
            backgroundColor: 'var(--cream-honey)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '20px',
            border: '1px solid var(--border-grey)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
              <span>{t('subtotal')}</span>
              <span style={{ fontWeight: 600 }}>৳{subtotal}</span>
            </div>

            {savings > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: 'var(--fresh-mint)' }}>
                <span>{t('totalSavings')}</span>
                <span style={{ fontWeight: 700 }}>-৳{savings}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
              <span>{t('deliveryCharge')}</span>
              <span style={{ fontWeight: 600 }}>
                {deliveryCharge === 0 ? <strong className="text-mint">{t('free')}</strong> : `৳${deliveryCharge}`}
              </span>
            </div>

            {deliveryCharge > 0 && (
              <div style={{ fontSize: '11px', color: 'var(--honey-amber)', marginTop: '-4px', marginBottom: '8px', fontWeight: 600 }}>
                {t('deliveryHint').replace('{rest}', 1000 - subtotal)}
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '16px',
              fontWeight: 700,
              borderTop: '1px solid var(--border-grey)',
              paddingTop: '8px',
              marginTop: '4px',
              color: 'var(--charcoal-grey)'
            }}>
              <span>{t('total')}</span>
              <span style={{ fontSize: '18px', color: 'var(--honey-amber)' }}>৳{total}</span>
            </div>
          </div>

          <Link href="/checkout" onClick={onClose} className="btn btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            {t('checkoutBtn')}
          </Link>
        </>
      )}
    </div>
  );
}
