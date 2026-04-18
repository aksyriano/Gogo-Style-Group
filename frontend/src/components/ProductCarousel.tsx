'use client';

import { useRef } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductCarousel.module.css';

interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  category?: string;
  sizes?: string[];
  colors?: string[];
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <button 
        className={`${styles.navButton} ${styles.prevButton}`} 
        onClick={() => scroll('left')}
        aria-label="Previous products"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className={styles.scrollContainer} ref={scrollRef}>
        {products.map((product, index) => (
          <div key={product._id || product.id || index} className={styles.carouselItem}>
            <ProductCard
              id={product._id || product.id || ''}
              {...product}
            />
          </div>
        ))}
      </div>

      <button 
        className={`${styles.navButton} ${styles.nextButton}`} 
        onClick={() => scroll('right')}
        aria-label="Next products"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}
