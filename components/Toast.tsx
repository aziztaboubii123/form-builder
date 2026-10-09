"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";

type ToastProps = {
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      className={`fixed right-4 top-4 z-50 flex max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : "border-rose-200 bg-rose-50 text-rose-900"
      }`}
    >
      <div
        className={`grid size-8 shrink-0 place-items-center rounded-full ${
          isSuccess ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
        }`}
      >
        {isSuccess ? <Check className="size-4" /> : <X className="size-4" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{isSuccess ? "Succès" : "Erreur"}</p>
        <p className="mt-0.5 text-sm">{message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la notification"
        className="grid size-6 shrink-0 place-items-center rounded-full transition hover:bg-black/5"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}