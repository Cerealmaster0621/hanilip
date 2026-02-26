import type { Locale } from "./i18n-config";

export const colors = {
	primary: "#0F2B5B",
	primaryLight: "#1A3D73",
	primaryDark: "#091D40",
	secondary: "#3A5A8C",
	secondaryLight: "#4D6F9F",
	accent: "#C4A265",
	accentLight: "#D4B87A",
	accentDark: "#A68B50",
	background: "#FFFFFF",
	backgroundAlt: "#F8F9FA",
	backgroundDark: "#0F172A",
	creamWhite: "#FDFBF7",
	text: "#1A1A2E",
	textLight: "#6B7280",
	textMuted: "#9CA3AF",
	border: "#E5E7EB",
	borderLight: "#F3F4F6",
} as const;

export const logoMap: Record<Locale, { default: string; white: string }> = {
	ko: { default: "/images/logo-ko.png", white: "/images/logo-ko-white.png" },
	ja: { default: "/images/logo-ja.png", white: "/images/logo-ja-white.png" },
	en: { default: "/images/logo-en.png", white: "/images/logo-en-white.png" },
};

export const localeTypography: Record<
	Locale,
	{ htmlClass: string; bodyClass: string }
> = {
	ko: { htmlClass: "break-keep", bodyClass: "locale-ko" },
	ja: { htmlClass: "", bodyClass: "locale-ja" },
	en: { htmlClass: "", bodyClass: "locale-en" },
};
