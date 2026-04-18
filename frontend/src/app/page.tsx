'use client';

import { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import Translate from "@/components/Translate";
import styles from "./page.module.css";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Best sellers (first 10)
          setFeaturedProducts(data.slice(0, 10));
          // All products for the grid (take up to 12 more)
          setAllProducts(data.slice(0, 20));
        }
      })
      .catch(err => console.error('Failed fetching products:', err));
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);

    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = selectedCategory
    ? allProducts.filter(p => p.category === selectedCategory)
    : allProducts;

  const categories = [
    'Long Dresses',
    'Short Dresses',
    'New Arrivals',
    'Women\'s Summer Coat\'s',
    'Women\'s Winter Coat\'s'
  ];

  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroImageContainer}>
            <Image
              src="/images/hero.png"
              alt="Luxury Evening Model"
              fill
              className={styles.heroImage}
              priority
            />
            <div className={styles.heroOverlay}></div>
          </div>

          <div className={`container ${styles.heroContent} animate-fade-in`}>
            <h1 className={styles.heroTitle}>
              <Translate k="heroTitle">Gogo Style Group </Translate>
            </h1>
            <p className={styles.heroSubtitle}>
              <Translate k="heroSubtitle">New Collection</Translate>
            </p>
            <Link href="/collection" className="btn-primary">
              <Translate k="shopNow">Shop Now</Translate>
            </Link>
          </div>
        </section>

        {/* 2. Categories Section */}
        <section className={`container ${styles.categoriesSection}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <Translate k="shopByCategory">Shop by Category</Translate>
            </h2>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`${styles.categoryItem} ${selectedCategory === cat ? styles.activeCategory : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <div className={styles.categoryCircle}>
                  <p><Translate>{cat}</Translate></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Featured Products Carousel */}
        <section className={`container ${styles.featuredSection}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <Translate k="bestSellers">Best Sellers</Translate>
            </h2>
          </div>
          <ProductCarousel products={featuredProducts} />
        </section>

        {/* 4. Explore All Products Grid */}
        <section ref={gridRef} className={`container ${styles.featuredSection}`} style={{ paddingTop: 0 }}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <Translate k="exploreCollection">Explore Our Collection</Translate>
            </h2>
          </div>
          <div className={styles.productGrid}>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product._id || product.id || index}
                id={product._id || product.id}
                {...product}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>
              No products found in this category.
            </p>
          )}
        </section>

        {/* 5. Shop the Look */}
        <section className={styles.shopTheLook}>
          <div className={styles.parallaxContainer}>
            <Image
              src="/images/shop-look.png"
              alt="Shop the look model"
              fill
              className={styles.parallaxImage}
            />

          </div>
          <div className={styles.stlContent}>
            <h2><Translate k="Gogo Style Group designs and manufactures clothes and dresses on order">Gogo Style Group designs and manufactures clothes and dresses on order</Translate></h2>
            <Link href="https://wa.me/201020709726" target="_blank" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
              <Translate k="contactUs">Contact Us</Translate>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
