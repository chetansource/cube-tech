"use client";

import { useEffect, useState } from "react";

interface SvgImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SvgImage({ src, alt, className }: SvgImageProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        console.log("Fetching SVG from:", src);
        const response = await fetch(encodeURI(src));
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        console.log("SVG content length:", text.length);
        console.log("SVG content preview:", text.substring(0, 100));
        setSvgContent(text);
      } catch (err) {
        console.error("Error loading SVG:", err);
        setError(err instanceof Error ? err.message : "Failed to load SVG");
      }
    };

    if (src) {
      fetchSvg();
    }
  }, [src]);

  if (error) {
    return (
      <div className={className}>
        <p className="text-red-500">Error loading image: {error}</p>
      </div>
    );
  }

  if (!svgContent) {
    return (
      <div className={className}>
        <div className="animate-pulse bg-gray-200 w-full h-full" />
      </div>
    );
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
