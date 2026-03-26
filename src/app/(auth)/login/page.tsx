"use client";

import SubmitButton from "@/app/components/ui/buttons/submit-button";
import { createClient } from "@/app/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const handleSubmit = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="w-full flex flex-col bg-(--primary-purple) rounded-xl p-6 max-w-120 gap-4 border-2 border-(--light-purple)">
      <h2 className="text-center text-2xl">Добро пожаловать!</h2>
      <p className="text-center text-(--text-secondary-color)">
        Войдите в ваш аккаунт чтобы продолжить
      </p>
      <SubmitButton
        text={"Войти"}
        isActive={true}
        submitHandler={handleSubmit}
      />
    </div>
  );
}
