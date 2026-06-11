'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import GoldDivider from './GoldDivider';

/**
 * Renders Navbar / GoldDivider / Footer for all routes EXCEPT /admin/*.
 * Admin pages get their own isolated layout via src/app/admin/layout.tsx.
 * Server-Component children are safely passed through as props.
 */
export default function ConditionalSiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? '';
  const isAdmin  = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      {/* key on pathname re-mounts the wrapper on navigation, replaying the fade */}
      <main key={pathname} className="page-fade-in">{children}</main>
      {!isAdmin && (
        <>
          <GoldDivider />
          <Footer />
        </>
      )}
    </>
  );
}
