"use client";

import { useState } from "react";
import { FieldWrapper } from "./FieldWrapper";
import { FileInput } from "./FileInput";
import { Toast } from "./Toast";
import { COUNTRIES, ROLES } from "@/lib/countries";
import { validateField, validateFile, type FormValues } from "@/lib/validation";

const INITIAL: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  country: "",
  role: "",
  bio: "",
};

export function RegistrationForm() {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (name: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: keyof FormValues) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) }));
  };

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    setFileError(validateFile(newFile));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) newErrors[key] = error;
    });
    const newFileError = validateFile(file);

    setErrors(newErrors);
    setFileError(newFileError);
    setTouched({
      firstName: true, lastName: true, email: true, phone: true,
      birthDate: true, country: true, role: true, bio: true,
    });

    if (Object.keys(newErrors).length > 0 || newFileError) {
      setToast({ type: "error", message: "Veuillez corriger les erreurs du formulaire." });
      return;
    }

    setIsSubmitting(true);
    try {
      // 🎭 Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setToast({ type: "success", message: "Votre compte a bien été créé !" });
      setValues(INITIAL);
      setFile(null);
      setTouched({});
      setErrors({});
      setFileError("");
    } catch {
      setToast({ type: "error", message: "Une erreur est survenue. Réessayez." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (fieldName: keyof FormValues) =>
    `h-11 w-full rounded-xl border bg-white px-3.5 text-sm shadow-sm outline-none transition focus:ring-2 ${
      touched[fieldName] && errors[fieldName]
        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
    }`;

  return (
    <>
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Prénom + Nom */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Prénom" htmlFor="firstName" required error={touched.firstName ? errors.firstName : ""}>
            <input
              id="firstName" type="text" value={values.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              onBlur={() => handleBlur("firstName")}
              placeholder="Jean" className={inputClass("firstName")}
            />
          </FieldWrapper>

          <FieldWrapper label="Nom" htmlFor="lastName" required error={touched.lastName ? errors.lastName : ""}>
            <input
              id="lastName" type="text" value={values.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              onBlur={() => handleBlur("lastName")}
              placeholder="Dupont" className={inputClass("lastName")}
            />
          </FieldWrapper>
        </div>

        {/* Email + Téléphone */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Email" htmlFor="email" required error={touched.email ? errors.email : ""}>
            <input
              id="email" type="email" value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="jean.dupont@email.com" className={inputClass("email")}
            />
          </FieldWrapper>

          <FieldWrapper label="Téléphone" htmlFor="phone" required error={touched.phone ? errors.phone : ""}>
            <input
              id="phone" type="tel" value={values.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              placeholder="06 12 34 56 78" className={inputClass("phone")}
            />
          </FieldWrapper>
        </div>

        {/* Date + Pays */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Date de naissance" htmlFor="birthDate" required error={touched.birthDate ? errors.birthDate : ""}>
            <input
              id="birthDate" type="date" value={values.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              onBlur={() => handleBlur("birthDate")}
              className={inputClass("birthDate")}
            />
          </FieldWrapper>

          <FieldWrapper label="Pays" htmlFor="country" required error={touched.country ? errors.country : ""}>
            <select
              id="country" value={values.country}
              onChange={(e) => handleChange("country", e.target.value)}
              onBlur={() => handleBlur("country")}
              className={inputClass("country")}
            >
              <option value="">Sélectionnez un pays</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </FieldWrapper>
        </div>

        {/* Rôle */}
        <FieldWrapper label="Rôle" htmlFor="role" required error={touched.role ? errors.role : ""}>
          <select
            id="role" value={values.role}
            onChange={(e) => handleChange("role", e.target.value)}
            onBlur={() => handleBlur("role")}
            className={inputClass("role")}
          >
            <option value="">Sélectionnez un rôle</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </FieldWrapper>

        {/* Photo */}
        <FieldWrapper label="Photo de profil" htmlFor="profileImage" required error={fileError}>
          <FileInput file={file} onChange={handleFileChange} error={fileError} />
        </FieldWrapper>

        {/* Bio */}
        <FieldWrapper label="Bio" htmlFor="bio" error={touched.bio ? errors.bio : ""}>
          <textarea
            id="bio" value={values.bio} rows={4}
            onChange={(e) => handleChange("bio", e.target.value)}
            onBlur={() => handleBlur("bio")}
            placeholder="Parlez-nous un peu de vous... (500 caractères max)"
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <p className="mt-1 text-right text-xs text-slate-400">
            {values.bio.length} / 500
          </p>
        </FieldWrapper>

        {/* Submit */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Les champs marqués d'un <span className="text-rose-500">*</span> sont obligatoires.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Envoi en cours...
              </>
            ) : (
              "Créer mon compte"
            )}
          </button>
        </div>
      </form>
    </>
  );
}