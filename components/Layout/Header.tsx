import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import './Header.scss';

const Header = () => {
  const router = useRouter();
  const currentPath = router && router.route;

  return (
    <header className="Header">
      <h1 className="Header__title">
        <Link href="/">
          <a>
            <img alt="Logo: stylized letters 'BRN'" src="/images/logo.svg" />
          </a>
        </Link>
      </h1>
      <nav className="Header__nav">
        <ul className="Header__nav__items">
          <li
            className={`Header__nav__item ${
              currentPath === '/products' ? 'Header__nav__item--active' : ''
            }`}
          >
            <Link href="/products">
              <a>Products</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
