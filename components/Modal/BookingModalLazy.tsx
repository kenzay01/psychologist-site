"use client";

import dynamic from "next/dynamic";

export const BookingModal = dynamic(() => import("./Modal"), {
  ssr: false,
  loading: () => null,
});

export default BookingModal;
