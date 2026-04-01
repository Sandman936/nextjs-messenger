"use client";

import { type SyntheticEvent, useState } from "react";
import SubmitButton from "@/app/components/ui/buttons/submit-button";
import Field from "@/app/components/ui/field/field";
import { signInWithName } from "@/app/lib/actions/auth";

export default function LoginPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const first_name = formData.get("first_name") as string;
      const last_name = formData.get("last_name") as string;

      const { error } = await signInWithName({
        firstName: first_name,
        lastName: last_name,
      });
      setError(error);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
