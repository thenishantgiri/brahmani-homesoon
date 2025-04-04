"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  function getTimeRemaining(date: Date) {
    const now = new Date().getTime();
    const distance = date.getTime() - now;

    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("email_signups").insert({ email });

    if (error) {
      console.error("Supabase error:", error);
      setStatus("error");
    } else {
      setStatus("success");
      setEmail("");
    }
  };

  const launchDate = new Date("2025-05-01T00:00:00Z");
  const { days, hours, minutes, seconds } = useCountdown(launchDate);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f6f0] text-[#2c2c2c] p-6 font-sans overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-48 h-48 mb-6 drop-shadow-lg"
      >
        <Image
          src="/brahmani_logo.png"
          alt="Brahmani Home Logo"
          width={192}
          height={192}
          className="object-contain rounded-full"
          priority
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-5xl font-bold mb-3 text-center tracking-wide font-serif"
      >
        Brahmani Home
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg mb-4 text-center max-w-xl font-sans text-neutral-600"
      >
        Exquisite handmade furniture crafted by skilled Rajasthani artisans.
        Sign up to be notified when we launch!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-xl font-medium mb-6 text-center"
      >
        <span className="inline-block px-5 py-2  text-[#7a5c3e] font-semibold">
          Launching in {days}d {hours}h {minutes}m {seconds}s
        </span>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md  p-4 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/80 rounded-xl border border-[#d2c2a9] focus:ring-[#7a5c3e]"
        />
        <Button
          type="submit"
          className="cursor-pointer w-full sm:w-auto bg-[#7a5c3e] hover:bg-[#a07952] text-white font-semibold rounded-xl"
        >
          Notify Me
        </Button>
      </motion.form>

      {status === "success" && (
        <motion.p
          className="text-green-600 mt-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Thanks! You&apos;ll be notified when we launch.
        </motion.p>
      )}
      {status === "error" && (
        <motion.p
          className="text-red-600 mt-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          There was an issue. Please try again.
        </motion.p>
      )}
    </div>
  );
}
