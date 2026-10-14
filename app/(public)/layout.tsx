"use client";
import Navbar from "@/components/Navbar";

export function PublicLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default PublicLayout;
