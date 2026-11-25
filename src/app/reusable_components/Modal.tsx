"use client";

import { ReactNode } from "react";

export default function Modal({
  children,
  onClose,
  variant = "paper",
}: {
  children: ReactNode;
  onClose: () => void;
  variant?: "paper" | "metal" | "chess";
}) {
  return (
    <div
      className="br-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={variant === "paper" ? "br-panel" : `br-panel br-${variant}`}
      >
        {children}
        <button className="br-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
