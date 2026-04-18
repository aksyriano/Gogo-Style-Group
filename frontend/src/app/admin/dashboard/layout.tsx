'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './layout.module.css';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className={styles.adminContainer} dir="rtl" style={{ fontFamily: 'var(--font-body)' }}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h2>مجموعة جوجو ستايل</h2>
          <span>لوحة التحكم</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin/dashboard" className={styles.navLink}>
            📊 لوحة القيادة
          </Link>
          <Link href="/admin/dashboard/products" className={styles.navLink}>
            📦 المنتجات
          </Link>
          <Link href="/admin/dashboard/add-product" className={styles.navLink}>
            ➕ إضافة منتج
          </Link>
          <Link href="/admin/dashboard/orders" className={styles.navLink}>
            🧾 الطلبات
          </Link>
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          تسجيل الخروج
        </button>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
