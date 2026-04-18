'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
      <Navbar />
      <main className={`container ${styles.cartMain}`}>
        <h1 className={styles.title}>Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p>Your cart is empty.</p>
            <Link href="/collection" className="btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.cartItems}>
              {cart.map((item, idx) => (
                <div key={`${item.product}-${idx}`} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>
                       <Link href={`/product/${item.product}`}>{item.name}</Link>
                    </h3>
                    {item.size && <p className={styles.itemProps}>Size: {item.size}</p>}
                    {item.color && (
                      <p className={styles.itemProps} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        Color: <span style={{width:'15px', height:'15px', borderRadius:'50%', backgroundColor:item.color, display:'inline-block', border:'1px solid #ccc'}}></span>
                      </p>
                    )}
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.qtyControl}>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.product, item.quantity - 1, item.size, item.color)}
                      >-</button>
                      <span>{item.quantity}</span>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.product, item.quantity + 1, item.size, item.color)}
                      >+</button>
                    </div>
                    <button 
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.product, item.size, item.color)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Estimated Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Link href="/checkout" className={`btn-primary ${styles.checkoutBtn}`}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
