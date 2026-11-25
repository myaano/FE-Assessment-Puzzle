"use client";

import { PointerEvent, ReactNode } from "react";

export default function Room({
  children,
  dim = false,
  flashlight = false,
  plain = false,
}: {
  children: ReactNode;
  dim?: boolean;
  flashlight?: boolean;
  plain?: boolean;
}) {
  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (!flashlight) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }
  const classes = ["br-room", dim && "br-dim", plain && "br-plain"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onPointerMove={handleMove}>
      <div className="br-ceiling" />
      <div className="br-wall" />
      <div className="br-carpet" />
      <div className="br-dark" />
      <div className="br-content">{children}</div>
      {flashlight && <div className="br-beam" />}
      <div className="br-vignette" />
    </div>
  );
}
