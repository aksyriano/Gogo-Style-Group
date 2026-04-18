'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Translate from '@/components/Translate';
import styles from './tracking.module.css';

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Tracking feature coming soon! Your Order ID: ' + orderId);
  };

  return (
    <>
      <Navbar />
      <main className={`container ${styles.trackingPage}`}>
        <h1 className={styles.title}><Translate k="orderTracking">Order Tracking</Translate></h1>
        <p className={styles.subtitle}><Translate>Track your shipment in real-time.</Translate></p>

        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleTrack}>
            <div className={styles.inputGroup}>
              <label><Translate k="orderId">Order ID</Translate></label>
              <input 
                type="text" 
                className={styles.inputField} 
                placeholder="e.g. #GS12345" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required 
              />
            </div>

            <div className={styles.inputGroup}>
              <label><Translate>Email Address</Translate></label>
              <input 
                type="email" 
                className={styles.inputField} 
                placeholder="jane@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="btn-primary">
              <Translate k="trackNow">Track Now</Translate>
            </button>
          </form>
          
          <p className={styles.visualHint}>
            <Translate>Find your order ID in your confirmation email.</Translate>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
