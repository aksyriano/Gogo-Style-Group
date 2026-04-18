'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  category?: string;
  sizes?: string[];
  colors?: string[];
}

export default function ProductCard({ id, name, price, image, images, category, sizes, colors }: ProductCardProps) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Normalize image paths
  const allImages = (images && images.length > 0) ? images : (image ? [image] : ['/images/hero.png']);
  const normalizedImages = allImages.map(img => {
    let clean = img.replace(/["']/g, '').trim();
    if (clean.includes('public\\images\\')) clean = '/images/' + clean.split('public\\images\\').pop();
    else if (clean.includes('public/images/')) clean = '/images/' + clean.split('public/images/').pop();
    return clean.replace(/\\/g, '/');
  });

  const displayImage = normalizedImages[currentImageIndex];

  // automatic sequential image display when hovered
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && normalizedImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % normalizedImages.length);
      }, 1000); // Change image every second
    } else {
      setCurrentImageIndex(0); // Reset to first image when not hovering
    }
    return () => clearInterval(interval);
  }, [isHovered, normalizedImages.length]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      product: id,
      name,
      price,
      quantity: 1,
      image: normalizedImages[0],
      size: sizes?.[0], // default size
      color: colors?.[0] // default color
    });
  };

  return (
    <div className={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/product/${id}`}>
        <div className={styles.imageWrapper}>
          <img src={displayImage} alt={name} className={styles.image} />
          
          <div className={styles.overlay}>
             <button className={styles.quickViewBtn}>Quick View</button>
             <button className={styles.addToCartBtn} onClick={handleAddToCart}>
               Add to Cart
             </button>
          </div>
        </div>
      </Link>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>${price.toFixed(2)}</p>
        {colors && colors.length > 0 && (
          <div className={styles.colorSwatches}>
            {Array.from<string>(new Set(colors.flatMap(c => c.split(/[/,]+/).map(s => s.trim()).filter(Boolean)))).map((color, idx) => (
              <span 
                key={idx} 
                className={styles.swatch} 
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
