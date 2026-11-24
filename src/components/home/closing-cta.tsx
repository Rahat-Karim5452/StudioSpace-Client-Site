import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ClosingCta() {
  return (
    <section className="w-full bg-[#0a0a0a] px-6 py-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d120b] px-8 py-16 sm:px-12 sm:py-20 lg:px-14 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(201,236,74,0.10),transparent_42%),linear-gradient(110deg,#0c110a_0%,#121810_42%,#202a18_72%,#2f3a22_100%)]" />

        <div className="relative max-w-3xl">
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/55 uppercase">
            <span className="size-1.5 rounded-full bg-[#c9ec4a]" />
            Ready when you are
          </p>

          <h2 className="mt-4 max-w-2xl font-heading text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-white">
            Your next production is one booking away.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55">
            Browse 525+ verified rooms, or turn the space you already own into a
            working studio business.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/studios"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#c9ec4a] px-6 text-sm font-semibold text-[#15170f] shadow-[0_0_36px_rgba(201,236,74,0.30)] transition-colors hover:bg-[#d8f766]"
            >
              Explore Studios
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/register"
              className="inline-flex h-12 items-center rounded-full border border-white/20 bg-black/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Create free account
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
