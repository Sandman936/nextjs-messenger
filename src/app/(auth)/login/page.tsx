"use client";

import { useRouter } from "next/navigation";
import { type SyntheticEvent, useState } from "react";
import SubmitButton from "@/app/components/ui/buttons/submit-button";
import Field from "@/app/components/ui/field/field";
import { useAuth } from "@/app/contexts/auth-context";
import { createClient } from "@/app/lib/supabase/client";

export default function LoginPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    try {
      const { data, error: authError } = await supabase.auth.signInAnonymously({
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName?.trim() || null,
            has_set_name: true,
            created_at: new Date().toISOString(),
          },
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          first_name: firstName.trim() ?? "Неизвестный пользователь",
          last_name: lastName?.trim() || null,
          hasSetName: true,
          avatar_url: null,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at,
        });

        setLoading(false);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setError("Произошла ошибка входа");
      setLoading(false);
    }
    // try {
    //   const formData = new FormData(e.currentTarget);
    //   const first_name = formData.get("first_name") as string;
    //   const last_name = formData.get("last_name") as string;

    //   const { error } = await signInWithName({
    //     firstName: first_name,
    //     lastName: last_name,
    //   });
    //   refreshUser();
    //   setError(error);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="w-full flex flex-col bg-(--primary-purple) rounded-xl p-6 max-w-120 gap-4 border-2 border-(--light-purple)">
      <h2 className="text-center text-2xl">Добро пожаловать!</h2>
      <p className="text-center text-(--text-secondary-color)">
        Введите имя и фамилию, которые будут видны другим пользователям
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <Field
          desc="Введите Имя"
          isRequired
          autoCompleteType="given-name"
          id={"first_name"}
          value={firstName}
          setValue={setFirstName}
          placeHolder="Имя"
        />
        <Field
          desc="Введите Фамилию (Не обязательно)"
          autoCompleteType="family-name"
          id={"last_name"}
          value={lastName}
          setValue={setLastName}
          placeHolder="Фамилия"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <SubmitButton
          text={loading ? "Загрузка..." : "Войти"}
          isActive={!loading}
        />
      </form>
    </div>
  );
}
