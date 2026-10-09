"use client";

import { useEffect, useState } from "react";

type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

export function FileInput({ file, onChange, error }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div>
      <label
        htmlFor="profileImage"
        className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed p-4 transition ${
          error
            ? "border-rose-300 bg-rose-50/50 hover:bg-rose-50"
            : "border-slate-300 bg-slate-50 hover:bg-slate-100"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Aperçu"
            className="size-16 shrink-0 rounded-full object-cover ring-2 ring-white"
          />
        ) : (
          <div className="grid size-16 shrink-0 place-items-center rounded-full bg-slate-200 text-slate-500">
            <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden="true">
              <path
                d="M12 16V8m0 0-3 3m3-3 3 3M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900">
            {file ? file.name : "Choisir une photo de profil"}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">JPG, PNG ou WEBP · Max 2 Mo</p>
        </div>
      </label>

      <input
        id="profileImage"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}