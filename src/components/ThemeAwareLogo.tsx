"use client";

import React from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

interface ThemeAwareLogoProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ThemeAwareLogo({
  lightSrc,
  darkSrc,
  alt,
  width = 40,
  height = 40,
  className = "",
}: ThemeAwareLogoProps) {
  const { resolvedTheme } = useTheme();
  
  const logoSrc = resolvedTheme === 'dark' ? darkSrc : lightSrc;

  return (
    <Image
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}; 