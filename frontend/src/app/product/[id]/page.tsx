'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  const normalizeImage = (img: string) => {
    if (!img) return '';
    const cleaned = img.replace(/["']/g, '').trim();
    if (cleaned.startsWith('http')) return cleaned;
    if (cleaned.includes('public\\images\\')) return '/images/' + cleaned.split('public\\images\\').pop();
    if (cleaned.includes('public/images/')) return '/images/' + cleaned.split('public/images/').pop();
    return cleaned.replace(/\\/g, '/');
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setMainImage(normalizeImage(data.images?.[0] || ''));
          setSelectedSize(data.sizes?.[0] || '');
          setSelectedColor('');
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);


  if (loading) return <div style={{padding:'5rem', textAlign:'center'}}>Loading...</div>;
  if (!product) return <div style={{padding:'5rem', textAlign:'center'}}>Product not found.</div>;

  const handleAddToCart = () => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Please select a color before adding to cart.');
      return;
    }
    
    addToCart({
      product: product._id || product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: mainImage,
      size: selectedSize,
      color: selectedColor
    });
    alert('Added to cart!');
  };

  return (
    <>
      <Navbar />
      <main className={`container ${styles.productMain}`}>
        <div className={styles.productLayout}>
          
          <div className={styles.imageGallery}>
            <img src={mainImage || undefined} alt={product.name} className={styles.mainImage} />
            <div className={styles.thumbnails}>
              {product.images?.map((img: string, idx: number) => {
                const src = normalizeImage(img);
                return (
                  <img
                    key={idx}
                    src={src || undefined}
                    alt={`${product.name} ${idx}`}
                    className={`${styles.thumbnail} ${mainImage === src ? styles.active : ''}`}
                    onClick={() => setMainImage(src)}
                  />
                );
              })}
            </div>
          </div>

          <div className={styles.productInfo}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <p className={styles.description}>{product.description}</p>
            
            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.optionsGroup}>
                <label>Size</label>
                <div className={styles.optionsList}>
                  {product.sizes.map((s: string) => (
                    <button 
                      key={s} 
                      className={`${styles.optionBtn} ${selectedSize === s ? styles.selected : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className={styles.optionsGroup}>
                <label>Color</label>
                <div className={styles.optionsList}>
                  {Array.from<string>(new Set(product.colors.flatMap((c: string) => c.split(/[/,]+/).map(s => s.trim()).filter(Boolean)))).map((c: string) => (
                    <div 
                      key={c} 
                      className={`${styles.colorOption} ${selectedColor === c ? styles.selected : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setSelectedColor(c)}
                      title={c}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.actions}>
              <input 
                type="number" 
                min="1" 
                max={product.stock > 0 ? product.stock : 10} 
                value={quantity} 
                onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                className={styles.qtyInput}
              />
              <button className={`btn-primary ${styles.addToCartBtn}`} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
            {product.stock <= 0 && <p style={{color:'red', marginTop:'1rem'}}>Out of stock</p>}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
