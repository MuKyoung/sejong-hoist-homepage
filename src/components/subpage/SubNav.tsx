"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./SubNav.module.css";

export type SubNavItem = {
  label: string;
  href: string;
  external?: boolean;
};

type Props = { items: SubNavItem[] };

export default function SubNav({ items }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === pathname) return true;
    if (href !== "/" && pathname?.startsWith(href) && href.split("/").length > 2) return true;
    return pathname === href;
  };

  return (
    <nav className={s.subNav} aria-label="페이지 하위 메뉴">
      <div className="container">
        <div className={s.inner}>
          {items.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.link} ${s.external}`}
              >
                {item.label} ↗
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`${s.link} ${isActive(item.href) ? s.linkActive : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}
