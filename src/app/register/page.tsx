"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Asterisk, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { GoogleLoginButton } from "@/components/google-login-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { authInputClass, authLabelClass } from "@/lib/auth-form"

// returns an error message, or "" when the password is fine
const validatePassword = (password: string) => {
  if (password.length < 6) return "Password must be at least 6 characters"
  if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter"
  if (!/[a-z]/.test(password)) return "Password must have a lowercase letter"
  return ""
}

export default function RegisterPage() {
  const router = useRouter()
  const [passwordError, setPasswordError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmailSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as {
      name: string
      image: string
      email: string
      password: string
    }

    const invalid = validatePassword(user.password)
    setPasswordError(invalid)
    if (invalid) {
      toast.error(invalid)
      return
    }

    setLoading(true)
    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image || undefined,
    })

    if (error || !data) {
      setLoading(false)
      toast.error(error?.message || "Registration failed")
      return
    }

    // the button stays busy until the login page opens
    toast.success("Account created. Please login.")
    router.push("/login")
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#0a0a0a] px-4 py-10 sm:px-6 sm:py-14">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d110b] p-6 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(201,236,74,0.07),transparent_38%),linear-gradient(120deg,#0d110b_0%,#10150e_55%,#161b11_100%)]" />

        <div className="relative">
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase">
            <Asterisk className="size-4 text-[#ff5c35]" />
            Join the network
          </p>

          <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.5rem,4.5vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-white">
            Build your studio{" "}
            <span className="font-serif font-normal tracking-[-0.02em] text-[#ff5c35] italic">
              shortlist.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            Create a free StudioSpace account to reserve rooms, save favourites
            and publish your own space to the network.
          </p>

          <form onSubmit={handleEmailSignUp} className="mt-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className={authLabelClass}>
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Ava Bennett"
                  autoComplete="name"
                  className={authInputClass}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className={authLabelClass}>
                  Email
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
                <label htmlFor="password" className={authLabelClass}>
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={passwordError ? true : undefined}
                  className={authInputClass}
                  required
                />
                {passwordError ? (
                  <p role="alert" className="text-sm text-[#ff7a5c]">
                    {passwordError}
                  </p>
                ) : (
                  <p className="text-xs text-white/40">
                    At least 6 characters with an uppercase and a lowercase
                    letter.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className={authLabelClass}>
                  Photo URL <span className="normal-case">(optional)</span>
                </label>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="https://example.com/photo.jpg"
                  autoComplete="url"
                  className={authInputClass}
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="mt-6 h-12 w-full rounded-full bg-[#c9ec4a] text-sm font-semibold text-[#15170f] hover:bg-[#d8f766]"
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight className="size-4" />}
            </Button>

            <div className="my-6 flex items-center gap-4 text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
              <span className="h-px flex-1 bg-white/10" />
              Or continue with
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <GoogleLoginButton className="h-12 w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10" />

            <p className="mt-6 text-center text-sm text-white/45">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#c9ec4a] hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
