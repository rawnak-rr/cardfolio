"use client";

import type { ReactNode } from "react";

type PanelProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Full-screen overlay shared by the work and contact views. Stays mounted so the
 * open/close fade is a pure CSS transition, and is made inert while hidden so its
 * links drop out of the tab order.
 */
export function Panel({ isOpen, onClose, children }: PanelProps) {
  return (
    <div
      inert={!isOpen}
      className={`z-50 fixed inset-0 flex items-center justify-center bg-black text-white transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex h-[min(78vh,36rem)] w-[min(92vw,34rem)] flex-col overflow-hidden px-5 py-5 sm:px-6 sm:py-6">
        {children}
        <div className="pt-5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer p-0 text-sm text-white/50"
          >
            {" "}
            ../
          </button>
        </div>
      </div>
    </div>
  );
}
