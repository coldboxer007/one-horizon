"use client";

import type { BrandKey } from "@/lib/projects";

export const brandMeta: Record<BrandKey, { label: string; href?: string }> = {
  google: { label: "Google Cloud", href: "https://cloud.google.com" },
  gemini: { label: "Gemini", href: "https://deepmind.google/technologies/gemini/" },
  deepmind: { label: "Google DeepMind", href: "https://deepmind.google" },
  aws: { label: "AWS · Bedrock", href: "https://aws.amazon.com/bedrock/" },
  anthropic: { label: "Anthropic", href: "https://www.anthropic.com" },
  huggingface: { label: "Hugging Face", href: "https://huggingface.co" },
  kaggle: { label: "Kaggle", href: "https://www.kaggle.com" },
  devpost: { label: "Devpost", href: "https://devpost.com" },
  nmims: { label: "NMIMS" },
};

export function BrandIcon({
  brand,
  size = 16,
  className,
}: {
  brand: BrandKey;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  } as const;

  switch (brand) {
    case "google":
      return (
        <svg {...common} className={className}>
          <path
            fill="#4285F4"
            d="M12.17 12.19v3.58h5.01c-.2 1.29-1.46 3.78-5.01 3.78-3.01 0-5.47-2.49-5.47-5.55s2.46-5.55 5.47-5.55c1.71 0 2.86.73 3.52 1.36l2.4-2.31C16.53 6.03 14.53 5 12.17 5c-4.36 0-7.9 3.54-7.9 7.9s3.54 7.9 7.9 7.9c4.56 0 7.58-3.2 7.58-7.71 0-.52-.06-.91-.13-1.3l-7.45-.01Z"
          />
        </svg>
      );
    case "gemini":
      return (
        <svg {...common} className={className}>
          <defs>
            <linearGradient id="gem-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4285f4" />
              <stop offset="50%" stopColor="#9168ff" />
              <stop offset="100%" stopColor="#ff6e6e" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gem-g)"
            d="M12 2c.35 4.2 3.8 7.65 8 8-4.2.35-7.65 3.8-8 8-.35-4.2-3.8-7.65-8-8 4.2-.35 7.65-3.8 8-8Z"
          />
        </svg>
      );
    case "deepmind":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 250 250"
          fill="none"
          aria-hidden
          className={className}
        >
          <defs>
            <linearGradient
              id="dm-l1"
              x1="1"
              y1="131"
              x2="207.76"
              y2="131"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#2694d2" />
              <stop offset="0.31" stopColor="#1b87c8" />
              <stop offset="0.73" stopColor="#0c7bbe" />
              <stop offset="1" stopColor="#0377bb" />
            </linearGradient>
            <linearGradient
              id="dm-l2"
              x1="42.24"
              y1="119"
              x2="249"
              y2="119"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#6cb0e1" />
              <stop offset="1" stopColor="#add6f2" />
            </linearGradient>
          </defs>
          <path
            fill="url(#dm-l1)"
            d="M37.3,37.3C14.6,60.1 1.7,90.4 1,122.5L1,127.2C1.6,159.5 14.5,189.8 37.3,212.5C60.1,235.3 90.4,248.2 122.5,248.8L127.3,248.8C128.3,248.8 130.2,248.6 133.1,248.4C135,248.2 145.9,246.8 163.9,239.1C181.5,228.5 192.7,216.3 199.8,201.1C205,190.1 207.6,178.3 207.6,166C207.6,152 204.1,138.3 197.4,126.1L197.1,125.6C188.7,110.6 175.5,98.3 159.9,91C159.2,90.7 158.1,90.2 156.3,89.4C165.7,97.8 171.8,109.8 172.2,123.3L172.2,126C171.5,151.1 151.3,171.3 126.3,172L123.6,172C110.9,171.8 98.7,169 87.4,163.7C70.5,155.8 56.3,142.4 47.3,126.1L47,125.4C40.1,112.6 36.4,98.1 36.4,83.4C36.4,70.3 39.2,57.6 44.7,45.8C45.9,43.4 47.4,40.6 49.5,37C51,34.7 54,30.3 58,25.4C58.9,24.3 60.4,22.7 63.2,19.9C65,18.2 66.9,16.5 69.4,14.4C70.8,13.3 71.5,12.8 71.5,12.8C59,19.1 47.4,27.2 37.3,37.3Z"
          />
          <path
            fill="url(#dm-l2)"
            d="M122.7,1C118.8,1.2 114,1.7 108.3,2.6C104.6,3.4 99.1,5 92,7.7C82.5,11.8 73.8,17.7 66.5,25C65.2,26.3 58.7,33.4 50,48.6C44.8,59.6 42.2,71.4 42.2,83.7C42.2,97.6 45.7,111.4 52.4,123.5L52.7,124C61.1,139 74.3,151.3 89.9,158.6C91.1,159.2 93.6,160.2 93.6,160.2C84.2,151.8 78.1,139.7 77.7,126.2L77.7,123.5C78.4,98.4 98.6,78.3 123.6,77.6L128.1,77.6C131.7,77.8 135.7,78.2 140.3,78.9C143,79.4 146.1,80 149.4,80.9C151.9,81.4 155.7,82.5 161,85.3C179.1,93.7 193.3,107 202.3,123.4L202.7,124.1C209.6,136.9 213.3,151.4 213.3,166.1C213.3,179.2 210.5,191.9 205,203.7C202.9,207.8 200.9,211.3 198.5,215.2C196.4,218.3 193.4,222.1 190.5,225.5C188.2,228 185.3,230.9 182.6,233.3C179.1,236.2 178.1,236.9 178.1,236.9C190.6,230.9 202.2,222.7 212.3,212.7C235.1,189.9 248,159.7 248.6,127.5L248.6,122.7C248,90.4 235.1,60.1 212.3,37.4C190,14.7 160,1.8 128,1.1L126,1L122.7,1Z"
          />
        </svg>
      );
    case "aws":
      return (
        <svg {...common} className={className}>
          <path
            fill="#FF9900"
            d="M7.57 10.19c0 .33.04.6.1.79.07.2.17.42.3.66a.4.4 0 0 1 .07.21c0 .09-.06.19-.18.28l-.6.4a.46.46 0 0 1-.25.09c-.1 0-.19-.05-.28-.14a2.97 2.97 0 0 1-.34-.45 7.1 7.1 0 0 1-.29-.57c-.73.86-1.64 1.29-2.73 1.29-.78 0-1.4-.22-1.86-.67-.46-.45-.7-1.04-.7-1.78 0-.78.28-1.41.84-1.89.56-.48 1.31-.72 2.25-.72.31 0 .63.03.96.08.33.05.67.13 1.03.22v-.65c0-.7-.15-1.19-.43-1.47-.29-.28-.79-.42-1.5-.42-.32 0-.65.04-.99.12-.34.08-.67.18-1 .3a2.65 2.65 0 0 1-.32.12.56.56 0 0 1-.15.03c-.13 0-.2-.09-.2-.29v-.46c0-.15.02-.26.06-.33.05-.07.13-.13.25-.2.33-.16.72-.3 1.18-.42a5.66 5.66 0 0 1 1.46-.18c1.11 0 1.93.25 2.45.75.52.5.78 1.27.78 2.3v3.02Zm-3.77 1.41c.3 0 .6-.05.92-.16.32-.11.6-.3.84-.57.14-.17.25-.35.31-.56.06-.2.1-.44.1-.73v-.35a7.5 7.5 0 0 0-.83-.15 6.87 6.87 0 0 0-.85-.06c-.6 0-1.05.12-1.34.36-.29.24-.43.58-.43 1.02 0 .42.11.73.33.94.23.21.54.32.95.32Zm7.45 1c-.17 0-.29-.03-.37-.1-.08-.06-.14-.2-.2-.38l-2.15-7.08c-.07-.2-.1-.32-.1-.39 0-.15.07-.24.22-.24h.93c.18 0 .31.03.38.1.08.06.13.2.19.38l1.53 6.05 1.43-6.05c.05-.19.1-.32.18-.38.08-.07.22-.1.39-.1h.76c.17 0 .3.03.38.1.08.06.14.2.18.38l1.44 6.13 1.58-6.13c.06-.19.12-.32.2-.38.07-.07.2-.1.37-.1h.88c.15 0 .23.08.23.24 0 .05 0 .1-.02.16a1.44 1.44 0 0 1-.08.25l-2.2 7.08c-.06.19-.13.32-.2.38-.09.07-.21.1-.38.1h-.82c-.17 0-.3-.03-.38-.1-.08-.07-.14-.2-.18-.39l-1.42-5.9-1.42 5.9c-.05.19-.1.32-.19.39-.07.07-.21.1-.38.1h-.82Z"
          />
        </svg>
      );
    case "anthropic":
      return (
        <svg {...common} className={className}>
          <path
            fill="#D97757"
            d="M13.8 4.5h3l5.2 15h-3l-1.18-3.5h-5.5L10.9 19.5h-3l5.9-15Zm-3.2 0L4.7 19.5H1.6L7.5 4.5h3.1Zm-1.1 4.27L7.58 13.7h3.85L9.5 8.77Z"
          />
        </svg>
      );
    case "huggingface":
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="12" r="9" fill="#FFD21E" />
          <circle cx="8.6" cy="11" r="1.2" fill="#1f1f1f" />
          <circle cx="15.4" cy="11" r="1.2" fill="#1f1f1f" />
          <path
            d="M8 14.5c1 1.3 2.4 2.1 4 2.1s3-.8 4-2.1"
            stroke="#1f1f1f"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M6.5 9.5c.4-.6 1-.9 1.6-.9M17.5 9.5c-.4-.6-1-.9-1.6-.9" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "kaggle":
      return (
        <svg {...common} className={className}>
          <path
            fill="#20BEFF"
            d="M6.5 3.5h2.1v9.12l4.76-5.13h2.57l-4.92 5.17 5.14 7.84H13.7L9.84 14.2 8.6 15.48v4.02H6.5V3.5Z"
          />
        </svg>
      );
    case "devpost":
      return (
        <svg {...common} className={className}>
          <path
            fill="#003E54"
            d="M6 4h5.3c2.86 0 5.2 1.88 5.2 5v5.9c0 3.13-2.34 5-5.2 5H6V4Zm2.6 2.5v11.9h2.4c1.9 0 3.3-1.13 3.3-3.3V9.8c0-2.17-1.4-3.3-3.3-3.3H8.6Z"
          />
          <path fill="#003E54" d="m2 8 3.4 4L2 16h2.2L7 12 4.2 8H2Z" />
        </svg>
      );
    case "nmims":
      return (
        <svg {...common} className={className}>
          <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="#7ab0ff" strokeWidth="1.4" />
          <path
            d="M7 16V8l3 5 3-5v8M15 16v-8M18 16v-8"
            stroke="#7ab0ff"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
  }
}

export function BrandRow({
  brands,
  className,
}: {
  brands: BrandKey[];
  className?: string;
}) {
  return (
    <div className={className}>
      {brands.map((b) => {
        const meta = brandMeta[b];
        return (
          <span
            key={b}
            title={meta.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[10.5px] text-white/65 font-[family-name:var(--font-mono)] tracking-wide"
          >
            <BrandIcon brand={b} size={13} />
            <span>{meta.label}</span>
          </span>
        );
      })}
    </div>
  );
}
