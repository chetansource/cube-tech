import React from "react";

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="absolute flex bottom-0 bg-white " aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 p-4">
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <li>
              <a
                href={item.href}
                className={`text-sm ${
                  index === items.length - 1
                    ? "text-black/60 font-semibold"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {item.label}
              </a>
            </li>
            {index < items.length - 1 && (
              <li className="text-black">
                <span>/</span>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
