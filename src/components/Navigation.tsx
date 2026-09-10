import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Navigation.module.css";
import { trackEvent } from "@/utils/mixpanel";

const LINKS = [
  { href: "/", label: "Home", event: "Home" },
  { href: "/lab", label: "Lab", event: "Lab" },
  { href: "/how-to-do-salt-analysis", label: "Guide", event: "Guide" },
  { href: "/viva", label: "Viva", event: "Viva" },
];

const Navigation: React.FC = () => {
  const router = useRouter();

  const handleNavClick = (page: string) => {
    trackEvent("Navigation Clicked", {
      destination: page.toLowerCase(),
      source_path: window.location.pathname,
    });
  };

  const isActive = (href: string) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname === href || router.asPath.startsWith(href);
  };

  return (
    <>
      <nav className={styles.navigation} aria-label="Main navigation">
        <div className={styles.leftSection}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navItem} ${isActive(link.href) ? styles.active : ""}`}
              onClick={() => handleNavClick(link.event)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className={styles.builtByContainer}>
        <span>
          Built by{" "}
          <a
            href="https://twitter.com/0xBolt"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.boltLink}
            aria-label="Visit Aabis's Twitter profile"
          >
            Aabis
          </a>
        </span>
      </div>
    </>
  );
};

export default Navigation;
