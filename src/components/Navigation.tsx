import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <Link href="/">Home</Link>
      <Link href="/anions">Lab</Link>
    </nav>
  );
};

export default Navigation;
