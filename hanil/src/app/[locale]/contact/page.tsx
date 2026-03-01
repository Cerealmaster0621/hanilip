import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { locales, type Locale } from "@/lib/i18n-config";
import ScrollProvider from "@/components/ScrollProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";

const COUNTRY_CODES = [
	"AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD",
	"BB","BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI",
	"CV","KH","CM","CA","CF","TD","CL","CN","CO","KM","CG","CD","CR","CI",
	"HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE",
	"SZ","ET","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN",
	"GW","GY","HT","HN","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM",
	"JO","KZ","KE","KI","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT",
	"LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD","MC",
	"MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","KP",
	"MK","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PL","PT","QA",
	"RO","RU","RW","KN","LC","VC","WS","SM","ST","SA","SN","RS","SC","SL",
	"SG","SK","SI","SB","SO","ZA","SS","ES","LK","SD","SR","SE","CH","SY",
	"TW","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV","UG","UA",
	"AE","GB","US","UY","UZ","VU","VE","VN","YE","ZM","ZW","HK","MO",
];

function buildCountryList(locale: Locale) {
	const displayNames = new Intl.DisplayNames([locale], { type: "region" });

	const priority = (["KR", "JP"] as const).map((code) => ({
		code,
		name: displayNames.of(code) || code,
	}));

	const others = COUNTRY_CODES.map((code) => ({
		code,
		name: displayNames.of(code) || code,
	})).sort((a, b) => a.name.localeCompare(b.name, locale));

	return { priority, others };
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const validLocale = locales.includes(locale as Locale)
		? (locale as Locale)
		: "ko";
	const dict = await getDictionary(validLocale);

	return {
		title: `${dict.contact.pageTitle} | ${dict.metadata.title}`,
		description: dict.contact.pageSubtitle,
		alternates: {
			canonical: `https://hanilip.com/${validLocale}/contact`,
			languages: Object.fromEntries(
				locales.map((l) => [l, `https://hanilip.com/${l}/contact`]),
			),
		},
	};
}

export default async function ContactPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const validLocale = locales.includes(locale as Locale)
		? (locale as Locale)
		: "ko";
	const dict = await getDictionary(validLocale);
	const countries = buildCountryList(validLocale);

	const navItems = [
		{ label: dict.nav.about, href: `/${validLocale}/about` },
		{ label: dict.nav.research, href: `/${validLocale}/research` },
		{
			label: dict.nav.corporateTrends,
			href: `/${validLocale}/corporate-trends`,
		},
		{
			label: dict.nav.patentTrends,
			href: `/${validLocale}/patent-trends`,
		},
		{ label: dict.nav.contact, href: `/${validLocale}/contact` },
	];

	return (
		<ScrollProvider>
			<Header
				locale={validLocale}
				title={dict.metadata.title}
				contactLabel={dict.banner.contactUs}
				navItems={navItems}
			/>

			<main>
				{/* Page Banner */}
				<section
					data-page-banner
					className="bg-primary pt-32 pb-16 sm:pt-36 sm:pb-20"
				>
					<div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
						<FadeIn>
							<h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
								{dict.contact.pageTitle}
							</h1>
							<p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/60">
								{dict.contact.pageSubtitle}
							</p>
						</FadeIn>
					</div>
				</section>

				{/* Form Section */}
				<section className="bg-white py-16 sm:py-20 lg:py-24">
					<div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
						<div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
							{/* Contact Form */}
							<div className="lg:col-span-2">
								<FadeIn>
									<ContactForm
										dict={dict.contact}
										countries={countries}
									/>
								</FadeIn>
							</div>

							{/* Sidebar — Office Info */}
							<div className="lg:col-span-1">
								<FadeIn delayMs={200}>
									<div className="sticky top-28 rounded-2xl border border-border-light bg-bg-alt p-8">
										<h3 className="font-serif text-lg font-bold text-text">
											{dict.contact.officeTitle}
										</h3>

										<ul className="mt-6 space-y-5">
											<li className="flex items-start gap-3">
												<svg
													className="mt-0.5 h-5 w-5 shrink-0 text-accent"
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
												<span className="text-sm text-text-light">
													{dict.footer.address}
												</span>
											</li>
											<li className="flex items-center gap-3">
												<svg
													className="h-5 w-5 shrink-0 text-accent"
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
													className="text-sm text-text-light transition-colors hover:text-accent"
												>
													{dict.footer.email}
												</a>
											</li>
											<li className="flex items-center gap-3">
												<svg
													className="h-5 w-5 shrink-0 text-accent"
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
												<span className="text-sm text-text-light">
													{dict.footer.phone}
												</span>
											</li>
										</ul>

										<div className="mt-8 border-t border-border pt-8">
											<h4 className="text-sm font-semibold text-text">
												{dict.footer.quickLinks}
											</h4>
											<ul className="mt-3 space-y-2">
												{[
													{
														label: dict.nav.about,
														href: `/${validLocale}/about`,
													},
													{
														label: dict.nav.research,
														href: `/${validLocale}/research`,
													},
												].map((link) => (
													<li key={link.href}>
														<Link
															href={link.href}
															className="text-sm text-text-light transition-colors hover:text-accent"
														>
															{link.label} →
														</Link>
													</li>
												))}
											</ul>
										</div>
									</div>
								</FadeIn>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer locale={validLocale} dict={dict} />
		</ScrollProvider>
	);
}
