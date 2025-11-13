"use client";

import { useState } from "react";
import TherapyGroupModal from "./TherapyGroupModal";

type TherapyGroupModalButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
};

const VARIANT_CLASSES: Record<
  NonNullable<TherapyGroupModalButtonProps["variant"]>,
  string
> = {
  primary:
    "inline-flex items-center justify-center rounded-2xl bg-red-500 px-8 py-4 text-lg font-bold uppercase tracking-wide text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-200",
  secondary:
    "inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-lg font-bold uppercase tracking-wide text-red-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
};

export default function TherapyGroupModalButton({
  label,
  variant = "primary",
}: TherapyGroupModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={VARIANT_CLASSES[variant]}
      >
        {label}
      </button>
      <TherapyGroupModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

