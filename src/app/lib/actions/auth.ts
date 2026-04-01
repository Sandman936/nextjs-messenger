"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import type { IAuthFormData } from "../types";

export async function signInWithName(formData: IAuthFormData) {
  const supabase = await createClient();
  const first_name = formData.firstName;
  const last_name = formData.lastName ?? null;

  // Проверяем, что имя введено
  if (!first_name || first_name.trim().length === 0) {
    return { error: "Пожалуйста, введите ваше имя" };
  }

  // Вход с сохранением имени в metadata
  const { data, error } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        first_name: first_name.trim(),
        last_name: last_name ? last_name.trim() : null,
        has_set_name: true,
        created_at: new Date().toISOString(),
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  console.log(data);

  revalidatePath("/");
  redirect("/");
}

export async function checkUserHasName() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { hasName: false, isAuthenticated: false };
  }

  const hasName =
    user.user_metadata?.has_set_name === true && user.user_metadata?.first_name;

  return {
    hasName,
    isAuthenticated: true,
  };
}
