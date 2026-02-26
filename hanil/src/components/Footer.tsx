import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/get-dictionary";
import { logoMap } from "@/lib/design-tokens";

export default function Footer({
	locale,
	dict,
}: {
	locale: Locale;
	dict: Dictionary;
}) {
	const quickLinks = [
		{ label: dict.nav.about, href: `/${locale}/about` },
		{ label: dict.nav.research, href: `/${locale}/research` },
		{ label: dict.nav.corporateTrends, href: `/${locale}/corporate-trends` },
		{ label: dict.nav.patentTrends, href: `/${locale}/patent-trends` },
		{ label: dict.nav.contact, href: `/${locale}/contact` },
	];

	return (
		<footer className="snap-section-footer bg-bg-dark text-cream/80">
			<div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
				<div className="grid gap-8 md:grid-cols-3 lg:gap-12">
					<div>
						<Link href={`/${locale}`} className="inline-block">
							<Image
								src={logoMap[locale].white}
								alt={dict.metadata.title}
								width={240}
								height={60}
								className="h-10 w-auto"
							/>
						</Link>
						<p className="mt-4 max-w-xs text-sm font-serif font-medium leading-relaxed text-cream/50">
							{dict.footer.description}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-extrabold uppercase tracking-wider text-accent">
							{dict.footer.quickLinks}
						</h3>
						<ul className="mt-4 space-y-3">
							{quickLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm font-medium text-cream/50 transition-colors hover:text-cream"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-bold uppercase tracking-wider text-accent">
							{dict.footer.contactInfo}
						</h3>
						<ul className="mt-4 space-y-3 text-sm font-medium text-cream/50">
							<li className="flex items-start gap-2">
								<svg
									className="mt-0.5 h-4 w-4 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
									/>
								</svg>
								{dict.footer.address}
							</li>
							<li className="flex items-center gap-2">
								<svg
									className="h-4 w-4 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
									/>
								</svg>
								<a
									href={`mailto:${dict.footer.email}`}
									className="transition-colors hover:text-cream"
								>
									{dict.footer.email}
								</a>
							</li>
							<li className="flex items-center gap-2">
								<svg
									className="h-4 w-4 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
									/>
								</svg>
								{dict.footer.phone}
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
					<p className="text-xs font-medium text-cream/30">
						{dict.footer.copyright}
					</p>
					<div className="flex gap-6 text-xs font-medium text-cream/30">
						<Link
							href={`/${locale}/privacy`}
							className="transition-colors hover:text-cream/50"
						>
							{dict.footer.privacy}
						</Link>
						<Link
							href={`/${locale}/terms`}
							className="transition-colors hover:text-cream/50"
						>
							{dict.footer.terms}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
