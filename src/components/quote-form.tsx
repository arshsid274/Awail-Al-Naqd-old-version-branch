"use client";

import { FormEvent, useState } from "react";

type QuoteFormValues = {
  name: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  purpose: string;
  message: string;
};

const initialValues: QuoteFormValues = {
  name: "",
  email: "",
  phoneCountryCode: "+218",
  phone: "",
  fromCurrency: "USD",
  toCurrency: "EUR",
  amount: "",
  purpose: "Personal Transfer",
  message: "",
};

const quoteRecipientEmail = "info@awail-alnaqd.com";

const phoneCountryCodeOptions = [
  { code: "+218", country: "Libya", flag: "\u{1F1F1}\u{1F1FE}" },
  { code: "+1", country: "United States / Canada", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "+44", country: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "+971", country: "United Arab Emirates", flag: "\u{1F1E6}\u{1F1EA}" },
  { code: "+91", country: "India", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "+81", country: "Japan", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "+61", country: "Australia", flag: "\u{1F1E6}\u{1F1FA}" },
];

const currencyOptions = [
  { code: "USD", country: "United States", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "EUR", country: "European Union", flag: "\u{1F1EA}\u{1F1FA}" },
  { code: "GBP", country: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "CAD", country: "Canada", flag: "\u{1F1E8}\u{1F1E6}" },
  { code: "AED", country: "United Arab Emirates", flag: "\u{1F1E6}\u{1F1EA}" },
  { code: "INR", country: "India", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "JPY", country: "Japan", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "AUD", country: "Australia", flag: "\u{1F1E6}\u{1F1FA}" },
];

const purposeOptions = [
  "Personal Transfer",
  "Medical Transfer",
  "Study Abroad",
  "Tourism",
  "Corporate Transfer",
];

const fieldClassName =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100";

export function QuoteForm() {
  const [values, setValues] = useState<QuoteFormValues>(initialValues);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateAmount = () => {
    const parsedAmount = Number(values.amount);
    return !Number.isNaN(parsedAmount) && parsedAmount > 0;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.name.trim() || !values.email.trim() || !values.phone.trim()) {
      setSubmitted(false);
      setError("Please enter your name, email, and phone number before sending.");
      return;
    }

    if (!validateAmount()) {
      setSubmitted(false);
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    const subject = `Quote Request: ${values.fromCurrency} to ${values.toCurrency}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phoneCountryCode} ${values.phone}`,
      `From Currency: ${values.fromCurrency}`,
      `To Currency: ${values.toCurrency}`,
      `Amount: ${values.amount}`,
      `Purpose: ${values.purpose}`,
      "",
      "Message:",
      values.message || "-",
    ].join("\n");

    const mailtoUrl =
      `mailto:${quoteRecipientEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setError("");
    setSubmitted(true);
    window.location.href = mailtoUrl;
  };

  return (
    <form onSubmit={onSubmit} className="surface-card p-5 sm:p-6 md:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Get a Quote</h2>
      <p className="mt-2 text-sm text-slate-600">
        Submit your transfer requirement and our team will respond with rates and compliance
        requirements.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            required
            type="text"
            autoComplete="name"
            className={fieldClassName}
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Full name"
          />
        </label>

        <label>
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            required
            type="email"
            autoComplete="email"
            className={fieldClassName}
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="you@company.com"
          />
        </label>

        <label className="sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Phone</span>
          <div className="mt-2 grid grid-cols-[11rem_minmax(0,1fr)] gap-2 sm:grid-cols-[13.5rem_minmax(0,1fr)]">
            <select
              required
              aria-label="Country code"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              value={values.phoneCountryCode}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, phoneCountryCode: event.target.value }))
              }
            >
              {phoneCountryCodeOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.flag} {option.code} ({option.country})
                </option>
              ))}
            </select>
            <input
              required
              type="tel"
              autoComplete="tel-national"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              value={values.phone}
              onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
              placeholder="94 202 0302"
            />
          </div>
        </label>

        <label>
          <span className="text-sm font-medium text-slate-700">From Currency</span>
          <select
            required
            className={fieldClassName}
            value={values.fromCurrency}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, fromCurrency: event.target.value }))
            }
          >
            {currencyOptions.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.country}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="text-sm font-medium text-slate-700">To Currency</span>
          <select
            required
            className={fieldClassName}
            value={values.toCurrency}
            onChange={(event) => setValues((prev) => ({ ...prev, toCurrency: event.target.value }))}
          >
            {currencyOptions.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.country}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="text-sm font-medium text-slate-700">Amount</span>
          <input
            required
            min="0"
            step="0.01"
            type="number"
            className={fieldClassName}
            value={values.amount}
            onChange={(event) => setValues((prev) => ({ ...prev, amount: event.target.value }))}
            placeholder="0.00"
          />
        </label>

        <label>
          <span className="text-sm font-medium text-slate-700">Purpose</span>
          <select
            required
            className={fieldClassName}
            value={values.purpose}
            onChange={(event) => setValues((prev) => ({ ...prev, purpose: event.target.value }))}
          >
            {purposeOptions.map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </label>

        <label className="sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Message</span>
          <textarea
            rows={4}
            className={fieldClassName}
            value={values.message}
            onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
            placeholder="Share transfer details, timeline, and beneficiary destination."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="primary-btn animate-pulse-soft w-full sm:w-auto">
          Submit Quote Request
        </button>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-rose-600">{error}</p> : null}
      {submitted ? (
        <p className="mt-4 text-sm font-medium text-emerald-700">
          Thank you. Your quote request has been captured successfully.
        </p>
      ) : null}
    </form>
  );
}
