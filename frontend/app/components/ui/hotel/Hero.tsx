import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryCta?: { label: string; href: string };
}

export function Hero({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
  tertiaryCta
}: HeroProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundImage}')`,
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-gray-200 sm:text-xl">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {primaryCta && (
              <Link href={primaryCta.href}>
                <Button size="lg" className="w-full sm:w-auto">
                  {primaryCta.label}
                </Button>
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
                  {secondaryCta.label}
                </Button>
              </Link>
            )}
            {tertiaryCta && (
              <Link href={tertiaryCta.href}>
                <Button size="lg" variant="ghost" className="w-full text-white hover:bg-white/20 sm:w-auto">
                  {tertiaryCta.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
