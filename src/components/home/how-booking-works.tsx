import Link from "next/link"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discover spaces",
    description:
      "Filter by category, city, capacity and rate. Every listing is inspected and host-verified before it goes live.",
  },
  {
    number: "02",
    title: "Select shoot hours",
    description:
      "Pick a date and a time window. The calendar checks live availability so you never double-book a stage.",
  },
  {
    number: "03",
    title: "Book instantly",
    description:
      "Reserve in under a minute. Transparent hourly pricing, deposit shown upfront, no agency commission.",
  },
  {
    number: "04",
    title: "Create & produce",
    description:
      "Arrive to a prepped room, a host on call and a downloadable invoice for your production budget.",
  },
]

export function HowBookingWorks() {
  return (
    <section className="w-full bg-[#0a0a0a] p-2 sm:p-3">
      <div className="rounded-[1.75rem] border border-white/10 bg-[#121310] p-6 sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
          {/* Intro */}
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/70 uppercase">
              <span className="size-1.5 rounded-full bg-[#ff5c35]" />
              How booking works
            </p>

            <h2 className="mt-5 max-w-[34rem] font-heading text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-white">
              From scroll to{" "}
              <span className="font-serif font-normal tracking-[-0.02em] text-[#ff5c35] italic">
                set-ready
              </span>{" "}
              in four moves.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              No agents, no phone tag, no surprise line items. StudioSpace puts
              availability, pricing and the reservation itself in one flow.
            </p>

            <Link
              href="/how-it-works"
              className="group mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-[#f4f1e8] px-6 text-sm font-semibold text-[#15170f] transition-colors hover:bg-white"
            >
              Read the full walkthrough
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Steps */}
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#171914] p-6"
              >
                <span className="font-heading text-2xl font-semibold text-[#ff5c35]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
