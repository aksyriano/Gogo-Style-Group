'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

export default function Collection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CollectionContent />
    </Suspense>
  );
}

function CollectionContent() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFiltered(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(p => 
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      result = result.filter(p => p.category?.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Sort by price
    if (sortOrder === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  }, [categoryFilter, sortOrder, products, searchQuery]);

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  return (
    <>
      <Navbar />
      <main className={`container ${styles.collectionMain}`}>
        <h1 className={styles.title}>The Collection</h1>
        
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <h3>Category</h3>
              <label className={styles.filterLabel}>
                <input 
                  type="radio" 
                  name="category" 
                  checked={categoryFilter === ''}
                  onChange={() => setCategoryFilter('')} 
                />
                All
              </label>
              {categories.map((cat: any) => (
                <label key={cat} className={styles.filterLabel}>
                  <input 
                    type="radio" 
                    name="category" 
                    checked={categoryFilter === cat}
                    onChange={() => setCategoryFilter(cat)} 
                  />
                  {cat}
                </label>
              ))}
            </div>
          </aside>

          {/* Grid */}
          <div className={styles.grid}>
            <div className={styles.headerRow}>
              <p>{filtered.length} products found</p>
              <select className={styles.sortSelect} value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                <option value="">Default Sorting</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {loading ? (
              <p>Loading collection...</p>
            ) : (
              <div className={styles.productGrid}>
                {filtered.map(product => (
                  <ProductCard key={product._id} id={product._id || product.id} {...product} />
                ))}
              </div>
            )}
            {!loading && filtered.length === 0 && <p>No products match your filters.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}