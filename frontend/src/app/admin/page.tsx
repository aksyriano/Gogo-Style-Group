'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Translate from '@/components/Translate';

export default function AdminLogin() {
  const router = useRouter();

  useEffect(() => {
    // Directly go to dashboard as requested
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'var(--font-inter)' }}>
      <p><Translate k="redirectingAdmin">Redirecting to Admin Dashboard...</Translate></p>
    </div>
  );
}

