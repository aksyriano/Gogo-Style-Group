'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Translate from '@/components/Translate';
import styles from './reviews.module.css';

export default function ReviewsPage() {
  const reviews = [
    { id: 1, author: "Sarah M.", rating: "★★★★★", text: "The evening dress I bought for the gala was absolutely stunning. Perfect fit and fast delivery!" },
    { id: 2, author: "Amira K.", rating: "★★★★★", text: "Quality is top-notch. I felt like a queen wearing Gogo Style." },
    { id: 3, author: "Laura G.", rating: "★★★★☆", text: "Beautiful collection. The customer service helped me choose the right size." },
  ];

  return (
    <>
      <Navbar />
      <main className={`container ${styles.reviewsPage}`}>
        <h1 className={styles.title}><Translate k="customerReviews">Customer Reviews</Translate></h1>
        <p className={styles.subtitle}><Translate>What our wonderful clients say about us.</Translate></p>

        <div className={styles.reviewsGrid}>
          {reviews.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.rating}>{review.rating}</div>
              <p className={styles.comment}>&quot;{review.text}&quot;</p>
              <div className={styles.author}>{review.author}</div>
            </div>
          ))}
        </div>

        <section className={styles.addReviewSection}>
          <h2><Translate k="writeReview">Write a Review</Translate></h2>
          <form className={styles.form}>
            <input type="text" className={styles.inputField} placeholder="Your Name" required />
            <textarea className={styles.inputField} placeholder="Your Experience" style={{ minHeight: '120px' }} required></textarea>
            <button type="submit" className="btn-primary">
              <Translate k="submit">Submit</Translate>
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
