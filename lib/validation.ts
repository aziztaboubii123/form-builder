export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  country: string;
  role: string;
  bio: string;
};

export function validateField(name: keyof FormValues, value: string): string {
  switch (name) {
    case "firstName":
      if (!value.trim()) return "Le prénom est requis.";
      if (value.trim().length < 2) return "Le prénom doit contenir au moins 2 caractères.";
      return "";

    case "lastName":
      if (!value.trim()) return "Le nom est requis.";
      if (value.trim().length < 2) return "Le nom doit contenir au moins 2 caractères.";
      return "";

    case "email":
      if (!value.trim()) return "L'email est requis.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'email invalide.";
      return "";

    case "phone":
      if (!value.trim()) return "Le téléphone est requis.";
      if (!/^(\+33|0)[1-9](\d{2}){4}$/.test(value.replace(/[\s.-]/g, "")))
        return "Format attendu : 06 12 34 56 78 ou +33612345678.";
      return "";

    case "birthDate":
      if (!value) return "La date de naissance est requise.";
      {
        const date = new Date(value);
        if (isNaN(date.getTime())) return "Date invalide.";
        const age = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        if (age < 18) return "Vous devez avoir au moins 18 ans.";
        if (age > 120) return "Date de naissance invalide.";
      }
      return "";

    case "country":
      if (!value) return "Veuillez sélectionner un pays.";
      return "";

    case "role":
      if (!value) return "Veuillez sélectionner un rôle.";
      return "";

    case "bio":
      if (value.length > 500) return "La bio ne doit pas dépasser 500 caractères.";
      return "";

    default:
      return "";
  }
}

export function validateFile(file: File | null): string {
  if (!file) return "Une photo de profil est requise.";
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return "Formats acceptés : JPG, PNG, WEBP.";
  if (file.size > 2 * 1024 * 1024) return "L'image ne doit pas dépasser 2 Mo.";
  return "";
}