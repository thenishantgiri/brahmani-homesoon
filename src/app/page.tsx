"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5f2ec] to-[#e2d9cd] text-[#2c2c2c] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-48 h-48 mb-6"
      >
        <Image
          src="/brahmani_logo.png"
          alt="Brahmani Home Logo"
          width={192}
          height={192}
          className="object-contain"
          priority
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl font-bold mb-2 text-center tracking-wide font-serif"
      >
        Brahmani Home
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg mb-6 text-center max-w-xl font-sans"
      >
        Exquisite handmade furniture crafted by skilled Rajasthani artisans.
        Sign up to be notified when we launch!
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <Button
          type="submit"
          className="w-full sm:w-auto bg-[#8d6748] hover:bg-[#a47d59] text-white font-semibold"
        >
          Notify Me
        </Button>
      </motion.form>

      {status === "success" && (
        <motion.p
          className="text-green-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Thanks! You&apos;ll be notified when we launch.
        </motion.p>
      )}
      {status === "error" && (
        <motion.p
          className="text-red-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          There was an issue. Please try again.
        </motion.p>
      )}
    </div>
  );
}
