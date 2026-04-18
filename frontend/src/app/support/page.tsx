'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Translate from '@/components/Translate';
import styles from './support.module.css';

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className={`container ${styles.supportPage}`}>
        <h1 className={styles.title}><Translate k="helpCenter">Help Center</Translate></h1>
        <p className={styles.subtitle}><Translate>How can we assist you today?</Translate></p>

        <div className={styles.grid}>
          {/* FAQ Section */}
          <section className={styles.section}>
            <h2><Translate k="faq">FAQ</Translate></h2>
            
            <div className={styles.faqItem}>
              <h3><Translate>What is your return policy?</Translate></h3>
              <p><Translate>We offer a 14-day return policy for unused items in their original packaging.</Translate></p>
            </div>

            <div className={styles.faqItem}>
              <h3><Translate>Do you ship internationally?</Translate></h3>
              <p><Translate>Yes, we ship to most countries worldwide. Shipping costs vary by location.</Translate></p>
            </div>

            <div className={styles.faqItem}>
              <h3><Translate>How do I find my size?</Translate></h3>
              <p><Translate>Check our Size Guide for detailed measurements and fit recommendations.</Translate></p>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className={styles.section}>
            <h2><Translate k="contactUs">Contact Us</Translate></h2>
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label><Translate k="fullName">Full Name</Translate></label>
                <input type="text" className={styles.inputField} placeholder="Jane Doe" required />
              </div>

              <div className={styles.inputGroup}>
                <label><Translate>Email</Translate></label>
                <input type="email" className={styles.inputField} placeholder="jane@example.com" required />
              </div>

              <div className={styles.inputGroup}>
                <label><Translate>Subject</Translate></label>
                <input type="text" className={styles.inputField} placeholder="Order Inquiry" required />
              </div>

              <div className={styles.inputGroup}>
                <label><Translate>Message</Translate></label>
                <textarea className={`${styles.inputField} styles.textarea`} placeholder="How can we help?" required></textarea>
              </div>

              <button type="submit" className="btn-primary">
                <Translate k="submit">Submit</Translate>
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
