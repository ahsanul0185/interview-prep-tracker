"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

// Accessible dialog with smooth enter/exit animation.
// Manages its own mount/unmount timing so the exit transition can play before removal.
export function Modal({ open, onClose, title, children, className = "" }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Coordinate mount/unmount with the CSS transition duration.
  // useLayoutEffect is used so the initial hidden state is committed before the
  // browser paints, ensuring the enter transition plays reliably.
  // Animating a component in/out inherently requires state transitions in an
  // effect; this is intentional orchestration, not a data fetch.
  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    if (open) {
      setIsMounted(true);
      // Start the enter animation on the next frame so the browser sees the
      // initial opacity-0 / scale-95 state before transitioning to visible.
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsMounted(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useLayoutEffect(() => {
    if (!isMounted) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isMounted, onClose]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full max-w-lg transform rounded-xl bg-surface p-6 shadow-xl transition-all duration-200 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } ${className}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <span aria-hidden className="text-xl leading-none">
              &times;
            </span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
