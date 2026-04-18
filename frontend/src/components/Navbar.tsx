import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Translate from '@/components/Translate';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { cartCount } = useCart();
  const { lang, toggleLanguage } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navInner}`}>
        {/* Left: Logo */}
        <div className={styles.logo}>
          <Link href="/">
            Gogo Style Group
          </Link>
        </div>

        {/* Center: Search / Menus */}
        <div className={styles.centerMenu}>
          <Link href="/" className={styles.navLink}>
            <Translate k="home">Home</Translate>
          </Link>
          <Link href="/dresses" className={styles.navLink}>
            <Translate k="dresses">Dresses</Translate>
          </Link>
          <Link href="/collection" className={styles.navLink}>
            <Translate k="collection">New Collection</Translate>
          </Link>
          <Link href="/best-sellers" className={styles.navLink}>
            <Translate k="bestSellers">Best Sellers</Translate>
          </Link>
          <Link href="/offers" className={styles.navLink}>
            <Translate k="offers">Offers</Translate>
          </Link>
        </div>

        {/* Right: Icons */}
        <div className={styles.rightIcons}>
          {/* Language Toggle */}
          <button
            className={styles.iconBtn}
            onClick={toggleLanguage}
            style={{ fontWeight: 'bold', fontSize: '14px', minWidth: '35px' }}
          >
            {lang === 'en' ? 'اللغة العربية' : 'English'}
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className={styles.searchContainer}>
            <div className={styles.searchIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder={lang === 'en' ? "Search..." : "بحث..."}
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <Link href="/cart" className={styles.iconBtn} aria-label="Cart" style={{ position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-5px', right: '-8px',
                backgroundColor: 'var(--accent)', color: 'white',
                fontSize: '10px', width: '16px', height: '16px',
                borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
