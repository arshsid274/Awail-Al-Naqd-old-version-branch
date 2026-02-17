import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck,
  Globe,
  Lock,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "About Awail Al-Naqd",
  },
  description: "Learn about Awail Al-Naqd, a trusted currency exchange company in Benghazi, Libya.",
  openGraph: {
    title: "About Awail Al-Naqd",
    description:
      "Learn about Awail Al-Naqd, a trusted currency exchange company in Benghazi, Libya.",
    type: "website",
  },
};

interface ValueItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

const values: ValueItem[] = [
  {
    name: "Integrity",
    icon: Shield,
    description: "We operate with honesty and strong moral principles in every transaction.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Transparency",
    icon: Eye,
    description: "Clear communication and full disclosure of rates and service terms.",
    color: "from-cyan-500 to-teal-500",
  },
  {
    name: "Security",
    icon: Lock,
    description: "Bank-grade safeguards protect each transaction and client data flow.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    name: "Compliance",
    icon: FileCheck,
    description: "Strict adherence to applicable financial regulations and internal controls.",
    color: "from-emerald-500 to-green-500",
  },
  {
    name: "Customer Focus",
    icon: Users,
    description: "Dedicated support and personalized service for every client requirement.",
    color: "from-blue-500 to-indigo-500",
  },
];

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{label}</p>
      <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">{title}</h2>
      <p className="mt-4 text-sm text-gray-600 sm:text-base">{description}</p>
    </header>
  );
}

export default function AboutPage() {
  return (
    <main>
      <section className="section-shell opacity-0 animate-fadeIn">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <article>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              About Awail Al-Naqd
            </h1>
            <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
              Awail Al-Naqd is a professional currency exchange and international remittance company
              based in Benghazi, Libya. We provide secure and compliant foreign exchange services
              for individuals and businesses.
            </p>
          </article>
          <Image
            src="/images/about.png"
            alt="Awail Al-Naqd office in Benghazi"
            width={800}
            height={600}
            sizes="(max-width: 767px) 100vw, 50vw"
            className="aspect-[4/3] h-auto w-full rounded-xl object-cover shadow-md"
          />
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="section-shell">
          <SectionHeader
            label="Purpose"
            title="Mission and Vision"
            description="Our direction is grounded in secure operations and trusted service delivery."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-xl bg-white p-5 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl sm:p-6">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Mission</h2>
              <p className="mt-3 text-gray-600">
                To deliver safe, efficient, and transparent currency exchange and international
                transfers.
              </p>
            </article>
            <article className="rounded-xl bg-white p-5 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl sm:p-6">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Vision</h2>
              <p className="mt-3 text-gray-600">
                To be a trusted financial partner in Libya and the region.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="section-shell">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Core Values</p>
            <h2 className="font-benton text-3xl font-bold text-slate-900 md:text-4xl">How We Operate</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Every transaction is managed with professionalism and accountability.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.name} className="group relative">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.color} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-10`} />
                  <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${value.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-benton text-lg font-bold text-slate-900">{value.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

