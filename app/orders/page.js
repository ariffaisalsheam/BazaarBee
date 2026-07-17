'use client';

import { useSearchParams } from 'next/navigation';
import OrderList from '../../features/orders/OrderList';
import Link from 'next/link';
import { Suspense } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

function OrdersContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const success = searchParams.get('success');
  const { t } = useLanguage();

  return (
    <>
      {success && (
        <div style={{
          backgroundColor: '#ECFDF5',
          border: '1px solid #A7F3D0',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          marginBottom: '30px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '10px' }}>🎉</span>
          <h1 className="text-title" style={{ color: 'var(--fresh-mint)', fontSize: '26px' }}>
            {t('successHeader')}
          </h1>
          <p style={{ fontSize: '15px', color: '#047857', marginTop: '6px', fontWeight: 500 }}>
            {t('successDesc')}
          </p>
        </div>
      )}

      <div style={{
        backgroundColor: 'var(--clean-white)',
        borderRadius: 'var(--radius-lg)',
        padding: '30px',
        border: '1px solid var(--border-grey)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h2 style={{ fontSize: '22px' }}>{t('ordersTitle')}</h2>
          <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '2px' }}>
            {t('ordersDesc')}
          </p>
        </div>
        <Link href="/" className="btn btn-secondary">
          {t('continueBtn')}
        </Link>
      </div>

      <OrderList orderId={orderId} />
    </>
  );
}

export default function OrdersPage() {
  return (
    <div className="container" style={{ marginBottom: '60px' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px 0' }}>Loading...</div>}>
        <OrdersContent />
      </Suspense>
    </div>
  );
}
