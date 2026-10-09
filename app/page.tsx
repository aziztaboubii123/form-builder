import { RegistrationForm } from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Formulaire d'inscription
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Créez votre compte
          </h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Remplissez le formulaire ci-dessous. Tous les champs marqués d'un{" "}
            <span className="text-rose-500">*</span> sont obligatoires.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}