'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../hooks/useLanguage';

export default function OrderList({ orderId }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Simulated fetching from Appwrite database
    setTimeout(() => {
      setOrder({
        $id: orderId || 'order_mock_123',
        customerName: 'মুহাম্মদ হাসিব',
        phone: '01712345678',
        address: 'ধাপ চেকপোস্ট, রংপুর সিটি',
        deliverySlot: '11:00 AM – 2:00 PM',
        paymentMethod: 'COD',
        totalAmount: 1145,
        savings: 185,
        status: 'pending', // pending, processing, shipped, delivered
        createdAt: new Date().toLocaleDateString(),
        items: [
          { name: 'ACI Pure Soyabean Oil - 5 Litre Can', price: 870, mrp: 910, qty: 1 },
          { name: 'Teer Refined Sugar - 2 Litre Pack', price: 275, mrp: 300, qty: 1 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [orderId]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px 0', fontSize: '18px', fontWeight: 600 }}>{t('loadingOrder')}</div>;
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return t('step1');
      case 'processing': return t('step2');
      case 'shipped': return t('step3');
      case 'delivered': return t('step4');
      default: return language === 'BN' ? 'প্রক্রিয়াধীন' : 'Processing';
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const step = getStatusStep(order.status);

  return (
    <div style={{ margin: '30px 0' }} className="order-flow grid-cols-2">

      {/* Invoice Card */}
      <div className="card order-receipt" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-grey)', paddingBottom: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', color: '#6B7280' }}>{t('orderNo')} #{order.$id}</h3>
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{t('orderDate')} {order.createdAt}</span>
          </div>
          <span style={{
            alignSelf: 'center',
            backgroundColor: 'var(--cream-honey)',
            color: 'var(--honey-amber)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid var(--honey-gold)'
          }}>
            {getStatusText(order.status)}
          </span>
        </div>

        {/* Delivery Details */}
        <div style={{ marginBottom: '20px', fontSize: '14px' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--charcoal-grey)' }}>{t('deliveryAddressLabel')}</h4>
          <p style={{ color: '#4B5563', marginBottom: '4px' }}>{order.customerName}</p>
          <p style={{ color: '#4B5563', marginBottom: '4px' }}>{t('phoneLabel')} {order.phone}</p>
          <p style={{ color: '#4B5563' }}>{t('addressLabel')} {order.address}</p>
          <p style={{ color: '#4B5563', marginTop: '6px', fontWeight: 600 }}>{t('slotLabel')} {order.deliverySlot}</p>
        </div>

        {/* Items List */}
        <div style={{ borderTop: '1px solid var(--border-grey)', paddingTop: '15px', marginBottom: '20px' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '10px' }}>{t('itemsLabel')}</h4>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
              <span>{item.name} x {item.qty}</span>
              <span style={{ fontWeight: 600 }}>৳{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        {/* Billing Math */}
        <div style={{
          backgroundColor: '#F9FAFB',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>{t('methodLabel')}</span>
            <span style={{ fontWeight: 600 }}>{order.paymentMethod === 'COD' ? (language === 'BN' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery') : 'Online'}</span>
          </div>
          {order.savings > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--fresh-mint)' }}>
              <span>{t('savingsLabel')}</span>
              <span style={{ fontWeight: 700 }}>৳{order.savings}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700, borderTop: '1px solid var(--border-grey)', paddingTop: '8px', color: 'var(--charcoal-grey)' }}>
            <span>{t('amountLabel')}</span>
            <span style={{ color: 'var(--honey-amber)' }}>৳{order.totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Mascot Status Tracker widget */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Visual Progress Steps */}
        <div className="card order-tracker-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>{t('trackerHeader')}</h3>

          <div className="order-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative', paddingLeft: '20px' }}>
            {/* Vertical connector line */}
            <div style={{
              position: 'absolute',
              left: '4px',
              top: '10px',
              bottom: '10px',
              width: '2px',
              backgroundColor: 'var(--border-grey)',
              zIndex: 0
            }} />

            {/* Step 1 */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: step >= 1 ? 'var(--fresh-mint)' : 'var(--border-grey)',
                boxShadow: step >= 1 ? '0 0 0 4px rgba(16, 185, 129, 0.2)' : 'none'
              }} />
              <span style={{ fontSize: '14px', fontWeight: step === 1 ? 700 : 500, color: step >= 1 ? 'var(--charcoal-grey)' : '#9CA3AF' }}>
                {t('step1')}
              </span>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: step >= 2 ? 'var(--fresh-mint)' : 'var(--border-grey)',
                boxShadow: step >= 2 ? '0 0 0 4px rgba(16, 185, 129, 0.2)' : 'none'
              }} />
              <span style={{ fontSize: '14px', fontWeight: step === 2 ? 700 : 500, color: step >= 2 ? 'var(--charcoal-grey)' : '#9CA3AF' }}>
                {t('step2')}
              </span>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: step >= 3 ? 'var(--fresh-mint)' : 'var(--border-grey)',
                boxShadow: step >= 3 ? '0 0 0 4px rgba(16, 185, 129, 0.2)' : 'none'
              }} />
              <span style={{ fontSize: '14px', fontWeight: step === 3 ? 700 : 500, color: step >= 3 ? 'var(--charcoal-grey)' : '#9CA3AF' }}>
                {t('step3')}
              </span>
            </div>

            {/* Step 4 */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: step >= 4 ? 'var(--fresh-mint)' : 'var(--border-grey)',
                boxShadow: step >= 4 ? '0 0 0 4px rgba(16, 185, 129, 0.2)' : 'none'
              }} />
              <span style={{ fontSize: '14px', fontWeight: step === 4 ? 700 : 500, color: step >= 4 ? 'var(--charcoal-grey)' : '#9CA3AF' }}>
                {t('step4')}
              </span>
            </div>
          </div>
        </div>

        {/* Mascot bubble tailored for order tracking */}
        <div className="mascot-widget">
          <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
            <Image
              src="/buzz-shopping.png"
              alt="Buzz - Mascot"
              fill
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
          <div className="mascot-bubble">
            <strong style={{ display: 'block', color: 'var(--honey-amber)', fontSize: '13px' }}>{t('mascotName')}</strong>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>
              {step === 1 && t('buzzStep1')}
              {step === 2 && t('buzzStep2')}
              {step === 3 && t('buzzStep3')}
              {step === 4 && t('buzzStep4')}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
