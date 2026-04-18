'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import Translate from '@/components/Translate';

export default function Checkout() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const t = translations[lang] || translations['en'];
  const [success, setSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          products: cart.map(p => ({ 
            product: p.product, 
            quantity: p.quantity,
            size: p.size,
            color: p.color
          })),
          totalPrice: cartTotal
        })
      });
      if(res.ok) {
        setSuccess(true);
        clearCart();
        setTimeout(() => router.push('/'), 3000);
      }
    } catch(err) {
      console.error(err);
    }
  };

  if (!isClient) return null; // Hydration mismatch fix if rendering empty cart

  return (
    <>
      <Navbar />
      <main className={`container ${styles.checkoutMain}`}>
        <h1 className={styles.title}><Translate k="checkout">Secure Checkout</Translate></h1>
        {success ? (
          <div className={styles.successMessage}>
            <h2><Translate k="orderSuccess">Order Placed Successfully!</Translate></h2>
            <p><Translate k="orderSuccessMsg">Thank you for shopping with Gogo Style Group. Redirecting to home...</Translate></p>
          </div>
        ) : cart.length === 0 ? (
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <p><Translate k="cartEmpty">Your cart is empty.</Translate></p>
            <Link href="/collection" className="btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
              <Translate k="backToCollection">Back to Collection</Translate>
            </Link>
          </div>
        ) : (
          <div className={styles.checkoutGrid}>
            <div className={styles.formSection}>
              <h2><Translate k="guestInfo">Guest Information</Translate></h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                  type="text" placeholder={t.fullName} required 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                />
                <input 
                  type="tel" placeholder={t.phoneNumber} required 
                  minLength={10} pattern="[0-9]*"
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} 
                />
                <textarea 
                  placeholder={t.shippingAddress} required 
                  value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} 
                />
                <button type="submit" className="btn-primary" style={{marginTop:'1rem', width: '100%'}}>
                  <Translate k="placeOrder">Place Order</Translate>
                </button>
              </form>
            </div>
            
            <div className={styles.summarySection}>
              <h2><Translate k="orderSummary">Order Summary</Translate></h2>
              <div className={styles.cartItems}>
                {cart.map((p, idx) => (
                  <div key={idx} className={styles.cartItem}>
                    <div>
                      <p style={{fontWeight: 600}}>{p.name} (x{p.quantity})</p>
                      <p style={{fontSize: '0.85rem', color: '#666'}}>{p.size ? `Size: ${p.size}` : ''} {p.color ? `Color: ${p.color}` : ''}</p>
                    </div>
                    <span>${(p.price * p.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.totalRow} style={{marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)'}}>
                <strong><Translate k="total">Total</Translate></strong>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
