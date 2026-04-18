import Link from 'next/link';
import Translate from '@/components/Translate';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        
        {/* Brand Section */}
        <div className={styles.brand}>
          <h2 className={styles.logo}>Gogo Style Group</h2>
          <p className={styles.description}>
            <Translate>Timeless elegance and luxury evening dresses for your most unforgettable moments.</Translate>
          </p>
        </div>

        {/* Circular Navigation Row */}
        <div className={styles.navRow}>
          <Link href="/support" className={styles.navItem}>
            <div className={styles.circle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon}>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9" />
                <path d="M3 12h18" />
                <path d="M12 3v18" />
                <path d="m14 7 3 3-5 5" />
              </svg>
            </div>
            <span className={styles.label}><Translate k="support">Support</Translate></span>
          </Link>

          <Link href="/tracking" className={styles.navItem}>
            <div className={styles.circle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon}>
                <path d="M10 17h4V5H2v12h3" />
                <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
                <path d="M14 17h1" />
                <circle cx="7.5" cy="17.5" r="2.5" />
                <circle cx="17.5" cy="17.5" r="2.5" />
              </svg>
            </div>
            <span className={styles.label}><Translate k="tracking">Tracking</Translate></span>
          </Link>

          <Link href="/reviews" className={styles.navItem}>
            <div className={styles.circle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className={styles.label}><Translate k="reviews">Reviews</Translate></span>
          </Link>

          <Link href="/collection" className={styles.navItem}>
            <div className={styles.circle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon}>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <span className={styles.label}><Translate k="shop">Shop</Translate></span>
          </Link>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletter}>
          <h3><Translate k="stayLoop">Stay in the loop</Translate></h3>
          <p><Translate>Subscribe for exclusive offers and new arrivals.</Translate></p>
          <form className={styles.formContainer} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="btn-primary">
              <Translate k="subscribe">Subscribe</Translate>
            </button>
          </form>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Gogo Style Group. <Translate k="rightsReserved">All rights reserved.</Translate></p>
      </div>
    </footer>
  );
}
