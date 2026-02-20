"use client";

import { useState } from "react";

export default function LoginPage() {
  const [isSignUpPage, setIsSignUpPage] = useState<boolean>(false);
  //   const router = useRouter();
  //   const {user, loading: authLoading} = useAuth();
  //   const {loadProfile} = useProfile();

  return (
    <div className="w-full flex flex-col bg-(--primary-purple) rounded-xl p-6 max-w-180 gap-10 border-2 border-(--light-purple)">
      <h2 className="text-center text-2xl text-(--text-light-color)">
        {isSignUpPage ? "Зарегистрировать новый аккаунт" : "Войти в аккаунт"}
      </h2>
      {/* <AuthForm isSignUpForm={isSignUpPage} /> */}
      <button
	  	type="button"
        onClick={() => setIsSignUpPage(!isSignUpPage)}
        className="flex self-center max-w-3xs text-(--accent-light-color) cursor-pointer hover:underline underline-offset-2 active:text-white"
      >
        {isSignUpPage ? "У вас уже есть аккаунт?" : "У вас еще нет аккаунта?"}
      </button>
    </div>
  );
}
