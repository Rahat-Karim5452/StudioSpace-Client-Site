"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Asterisk, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { GoogleLoginButton } from "@/components/google-login-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { authInputClass, authLabelClass } from "@/lib/auth-form"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  // the page the user wanted before we sent them here (must be inside our site)
  const redirectParam = searchParams.get("redirect") ?? "/"
  const redirectTo =
    redirectParam.startsWith("/") && !redirectParam.startsWith("//")
      ? redirectParam
      : "/"

  const handleEmailLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as {
      email: string
      password: string
    }

    setLoading(true)
    const { data, error } = await authClient.signIn.email({
      ...user,
    })

    if (error || !data) {
      setLoading(false)
      toast.error(error?.message || "Invalid email or password")
      return
    }

    // the button stays busy until the next page opens
    toast.success("Logged in successfully")
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="relative">
      <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase">
        <Asterisk className="size-4 text-[#ff5c35]" />
        Welcome back
      </p>

      <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.5rem,4.5vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-white">
        Sign in and get back on{" "}
        <span className="font-serif font-normal tracking-[-0.02em] text-[#ff5c35] italic">
          set.
        </span>
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
        Your bookings, listings, saved spaces and invoices live in one place.
        Use your StudioSpace credentials or continue with Google.
      </p>

      <form onSubmit={handleEmailLogin} className="mt-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="email" className={authLabelClass}>
              Email address
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="you@studio.com"
              autoComplete="email"
              className={authInputClass}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="password" className={authLabelClass}>
                Password
              </label>
              <button
                type="button"
                onClick={() =>
                  toast.info("Password reset is not available right now.")
                }
                className="text-xs font-medium text-white/45 transition-colors hover:text-white"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className={authInputClass}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="mt-6 h-12 w-full rounded-full bg-[#c9ec4a] text-sm font-semibold text-[#15170f] hover:bg-[#d8f766]"
        >
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <ArrowRight className="size-4" />}
        </Button>

        <div className="my-6 flex items-center gap-4 text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
          <span className="h-px flex-1 bg-white/10" />
          Or continue with
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <GoogleLoginButton
          callbackURL={redirectTo}
          className="h-12 w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
        />

        <p className="mt-6 text-center text-sm text-white/45">
          New to StudioSpace?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#c9ec4a] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#0a0a0a] px-4 py-10 sm:px-6 sm:py-14">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d110b] p-6 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(201,236,74,0.07),transparent_38%),linear-gradient(120deg,#0d110b_0%,#10150e_55%,#161b11_100%)]" />

        {/* useSearchParams needs a Suspense boundary */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}
