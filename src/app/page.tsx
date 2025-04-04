"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function Home() {
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
      <div className="relative w-48 h-48 mb-6">
        <Image
          src="/brahmani_logo.png"
          alt="Brahmani Home Logo"
          width={192}
          height={192}
          className="object-contain"
          priority
        />
      </div>

      <h1 className="text-4xl font-bold mb-2 text-center tracking-wide">
        Brahmani Home
      </h1>
      <p className="text-lg mb-6 text-center max-w-xl">
        Exquisite handmade furniture crafted by skilled Rajasthani artisans.
        Sign up to be notified when we launch!
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
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
      </form>

      {status === "success" && (
        <p className="text-green-600 mt-4">
          Thanks! You&apos;ll be notified when we launch.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-4">
          There was an issue. Please try again.
        </p>
      )}
    </div>
  );
}
