import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/get-dictionary";
import AnimatedText from "./AnimatedText";
import FadeIn from "./FadeIn";

export default function HeroSection({
	locale,
	dict,
}: {
	locale: Locale;
	dict: Dictionary;
}) {
	return (
		<section className="relative min-h-dvh overflow-hidden bg-primary">
			<div className="absolute inset-0 overflow-hidden opacity-[0.07]">
				<div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-accent" />
				<div className="absolute -bottom-48 -left-48 h-[700px] w-[700px] rounded-full bg-secondary" />
			</div>

			<div className="relative mx-auto flex min-h-dvh max-w-7xl flex-col justify-center px-6 pt-16 pb-20 sm:px-10 lg:px-16">
				<div className="max-w-3xl">
					<AnimatedText
						text={dict.hero.title}
						as="h1"
						splitBy="line"
						className="font-serif text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
						delayMs={500}
						staggerMs={400}
					/>

					<AnimatedText
						text={dict.hero.subtitle}
						as="p"
						splitBy="line"
						className="mt-8 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg sm:leading-8"
						delayMs={1800}
						staggerMs={1000}
					/>

					<FadeIn
						delayMs={2300}
						duration={1200}
						className="mt-12 flex items-center gap-10"
					>
						<Link
							href={`/${locale}/about`}
							className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-cream transition-colors duration-300 hover:text-accent-light sm:text-base"
						>
							<span className="accent-underline pb-px">{dict.hero.cta}</span>
							<svg
								className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M5 12h14m0 0l-5-5m5 5l-5 5"
								/>
							</svg>
						</Link>
						<Link
							href={`/${locale}/contact`}
							className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-cream/60 transition-colors duration-300 hover:text-cream sm:text-base"
						>
							<span className="accent-underline pb-px">
								{dict.hero.ctaSecondary}
							</span>
						</Link>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}
