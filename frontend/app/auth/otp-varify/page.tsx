"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Layout } from "../../Layout/Layout";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement actual OTP verification
    setTimeout(() => {
      router.push("/onboarding/create-hotel");
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Verify Your Phone
            </h1>
            <p className="text-muted-foreground">
              Enter the OTP sent to your phone number
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <Label htmlFor="otp" className="mb-2 block">
                OTP (One-Time Password)
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                className="w-full text-center text-2xl tracking-widest"
              />
              <p className="text-xs text-muted-foreground mt-2">
                <Link
                  href="/auth/forgot-password"
                  className="text-primary hover:underline"
                >
                  Resend
                </Link>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              <Link 
                href="/auth/signup"
                className="text-primary font-semibold hover:underline"
              >
                Change number
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
