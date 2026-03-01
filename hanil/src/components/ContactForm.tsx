"use client";

import { useState, useRef, type FormEvent, type ChangeEvent } from "react";

interface CountryOption {
	code: string;
	name: string;
}

interface ContactFormDict {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	companyName: string;
	companyWebsite: string;
	stateRegion: string;
	country: string;
	message: string;
	messagePlaceholder: string;
	pleaseSelect: string;
	submit: string;
	sending: string;
	successTitle: string;
	successMessage: string;
	confirmTitle: string;
	confirmSubmit: string;
	confirmEdit: string;
}

interface ContactFormProps {
	dict: ContactFormDict;
	countries: {
		priority: CountryOption[];
		others: CountryOption[];
	};
}

interface FormFields {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	companyName: string;
	companyWebsite: string;
	stateRegion: string;
	country: string;
	message: string;
}

export default function ContactForm({ dict, countries }: ContactFormProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [step, setStep] = useState<
		"form" | "review" | "sending" | "success"
	>("form");
	const [formData, setFormData] = useState<FormFields>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		companyName: "",
		companyWebsite: "",
		stateRegion: "",
		country: "",
		message: "",
	});

	function handleChange(
		e: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	function handleFormSubmit(e: FormEvent) {
		e.preventDefault();
		setStep("review");
		setTimeout(
			() =>
				containerRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				}),
			50,
		);
	}

	async function handleConfirm() {
		setStep("sending");
		// TODO: Replace with server action
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setStep("success");
		setTimeout(
			() =>
				containerRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				}),
			50,
		);
	}

	function handleEdit() {
		setStep("form");
		setTimeout(
			() =>
				containerRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				}),
			50,
		);
	}

	const allCountries = [...countries.priority, ...countries.others];
	const countryName =
		allCountries.find((c) => c.code === formData.country)?.name ||
		formData.country;

	/* ── Success ── */
	if (step === "success") {
		return (
			<div
				ref={containerRef}
				className="flex flex-col items-center justify-center rounded-2xl border border-border bg-bg-alt px-8 py-16 text-center"
			>
				<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
					<svg
						className="h-8 w-8 text-green-600"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 12.75l6 6 9-13.5"
						/>
					</svg>
				</div>
				<h3 className="font-serif text-2xl font-bold text-text">
					{dict.successTitle}
				</h3>
				<p className="mt-3 max-w-md text-text-light">
					{dict.successMessage}
				</p>
			</div>
		);
	}

	/* ── Review / Confirmation ── */
	if (step === "review" || step === "sending") {
		const reviewFields = [
			{ label: dict.firstName, value: formData.firstName },
			{ label: dict.lastName, value: formData.lastName },
			{ label: dict.email, value: formData.email },
			{ label: dict.phone, value: formData.phone },
			{ label: dict.companyName, value: formData.companyName },
			{
				label: dict.companyWebsite,
				value: formData.companyWebsite || "—",
			},
			{ label: dict.stateRegion, value: formData.stateRegion },
			{ label: dict.country, value: countryName },
			{ label: dict.message, value: formData.message || "—" },
		];

		return (
			<div
				ref={containerRef}
				className="rounded-2xl border border-border bg-bg-alt p-6 sm:p-8"
			>
				<h3 className="font-serif text-xl font-bold text-text">
					{dict.confirmTitle}
				</h3>

				<dl className="mt-6 divide-y divide-border">
					{reviewFields.map((field) => (
						<div
							key={field.label}
							className="py-4 sm:grid sm:grid-cols-3 sm:gap-4"
						>
							<dt className="text-sm font-medium text-text-light">
								{field.label}
							</dt>
							<dd
								className={`mt-1 text-sm sm:col-span-2 sm:mt-0 ${
									field.value === "—"
										? "text-text-muted"
										: "text-text"
								}`}
							>
								{field.value}
							</dd>
						</div>
					))}
				</dl>

				<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
					<button
						type="button"
						onClick={handleEdit}
						disabled={step === "sending"}
						className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-alt disabled:cursor-not-allowed disabled:opacity-60"
					>
						{dict.confirmEdit}
					</button>
					<button
						type="button"
						onClick={handleConfirm}
						disabled={step === "sending"}
						className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
					>
						{step === "sending" ? dict.sending : dict.confirmSubmit}
						{step === "sending" && (
							<svg
								className="h-4 w-4 animate-spin"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>
		);
	}

	/* ── Form ── */
	const inputClass =
		"w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none";
	const labelClass = "mb-1.5 block text-sm font-medium text-text";

	return (
		<div ref={containerRef}>
		<form onSubmit={handleFormSubmit} className="space-y-6">
			{/* First Name / Last Name */}
			<div className="grid gap-6 sm:grid-cols-2">
				<div>
					<label htmlFor="firstName" className={labelClass}>
						{dict.firstName}{" "}
						<span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						required
						value={formData.firstName}
						onChange={handleChange}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="lastName" className={labelClass}>
						{dict.lastName}{" "}
						<span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						value={formData.lastName}
						onChange={handleChange}
						className={inputClass}
					/>
				</div>
			</div>

			{/* Email */}
			<div>
				<label htmlFor="email" className={labelClass}>
					{dict.email} <span className="text-red-500">*</span>
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					value={formData.email}
					onChange={handleChange}
					className={inputClass}
				/>
			</div>

			{/* Phone Number */}
			<div>
				<label htmlFor="phone" className={labelClass}>
					{dict.phone} <span className="text-red-500">*</span>
				</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					required
					value={formData.phone}
					onChange={handleChange}
					className={inputClass}
				/>
			</div>

			{/* Company Name / Company Website */}
			<div className="grid gap-6 sm:grid-cols-2">
				<div>
					<label htmlFor="companyName" className={labelClass}>
						{dict.companyName}{" "}
						<span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="companyName"
						name="companyName"
						required
						value={formData.companyName}
						onChange={handleChange}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="companyWebsite" className={labelClass}>
						{dict.companyWebsite}
					</label>
					<input
						type="url"
						id="companyWebsite"
						name="companyWebsite"
						placeholder="https://"
						value={formData.companyWebsite}
						onChange={handleChange}
						className={inputClass}
					/>
				</div>
			</div>

			{/* State/Province/Region */}
			<div>
				<label htmlFor="stateRegion" className={labelClass}>
					{dict.stateRegion}{" "}
					<span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="stateRegion"
					name="stateRegion"
					required
					value={formData.stateRegion}
					onChange={handleChange}
					className={inputClass}
				/>
			</div>

			{/* Country */}
			<div>
				<label htmlFor="country" className={labelClass}>
					{dict.country} <span className="text-red-500">*</span>
				</label>
				<select
					id="country"
					name="country"
					required
					value={formData.country}
					onChange={handleChange}
					className={inputClass}
				>
					<option value="" disabled>
						{dict.pleaseSelect}
					</option>
					{countries.priority.map((c) => (
						<option key={c.code} value={c.code}>
							{c.name}
						</option>
					))}
					<option disabled>──────────</option>
					{countries.others.map((c) => (
						<option key={c.code} value={c.code}>
							{c.name}
						</option>
					))}
				</select>
			</div>

			{/* Message (optional) */}
			<div>
				<label htmlFor="message" className={labelClass}>
					{dict.message}
				</label>
				<textarea
					id="message"
					name="message"
					rows={4}
					placeholder={dict.messagePlaceholder}
					value={formData.message}
					onChange={handleChange}
					className={inputClass}
				/>
			</div>

			{/* Submit */}
			<div className="pt-2">
				<button
					type="submit"
					className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
				>
					{dict.submit}
					<svg
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
						/>
					</svg>
				</button>
			</div>
		</form>
		</div>
	);
}
