"use client";

import { ImagePlus, SquarePen, X } from "lucide-react";
import Image from "next/image";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import type { IUserInfo, IUserProfile } from "@/app/lib/types";
import SubmitButton from "../../ui/buttons/submit-button";
import LargeField from "../../ui/field/large-field";

interface IProps {
  profileData: IUserInfo | null;
  // updateProfileData: (formData: IFormData) => void;
}

export interface IFormData {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

export const ChangeProfileForm = ({ profileData }: IProps) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<IFormData>({
    first_name: profileData?.first_name ?? "",
    last_name: profileData?.last_name ?? "",
    avatar_url: profileData?.avatar_url ?? null,
  });
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
  const [hasPendingChanges, setHasPendingChanges] = useState<boolean>(false);
  const [updatingUserData, setUpdatingUserData] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /* TODO: Сделать загрузку при запросах на сервер */

  useEffect(() => {
    setError("");
  }, [isEditModeActive]);

  const handleAvatarSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    // const avatarImage = e.target.files?.[0];
    // if (!avatarImage) return;
    // if (!avatarImage.type.startsWith("image/")) {
    //   setError("Пожалуйста выберите подходящий файл изображения");
    //   return;
    // }
    // if (avatarImage.size > 5 * 1024 * 1024) {
    //   setError("Размер файла не должен превышать 5 МБ");
    //   return;
    // }
    // setError("");
    // setUpdatingUserData(true);
    // try {
    //   const result = await uploadProfileAvatar(avatarImage);
    //   if (result.success && result.url) {
    //     setFormData((prevState) => ({
    //       ...prevState,
    //       avatar_url: result.url,
    //     }));
    //     setHasPendingChanges(true);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setError("Не удалось загрузить фото");
    // } finally {
    //   setUpdatingUserData(false);
    // }
  };

  const handleUpdateProfileData = async (e: FormEvent) => {
    e.preventDefault();

    // setUpdatingUserData(true);
    // setHasPendingChanges(false);
    // setError("");

    // try {
    //   const result = await updateUserProfile(formData);

    //   if (result.success) {
    //     setIsEditModeActive(false);
    //     // updateProfileData(formData);
    //   } else {
    //     setError(result.error ?? "Не удалось обновить профиль");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setError("Не удалось обновить данные профиля");
    // } finally {
    //   setUpdatingUserData(false);
    // }
  };

  const handleTextFieldChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputName: string,
  ) => {
    const { value, id } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (value.length < 3) {
      setError(`Поле ${inputName} должно содержать не менее 3 символов`);
      return;
    }

    if (value !== profileData![id as keyof IUserInfo]) {
      setHasPendingChanges(true);
      return;
    }

    setHasPendingChanges(false);
  };

  return (
    <form
      onSubmit={(e) => {
        handleUpdateProfileData(e);
      }}
      className="flex flex-col items-center gap-6"
    >
      <input
        onChange={(e) => handleAvatarSelect(e)}
        hidden
        type="file"
        ref={avatarInputRef}
        disabled={updatingUserData}
      />
      <button
        className="relative"
        type="button"
        onClick={() => avatarInputRef.current?.click()}
      >
        {!updatingUserData && (
          <div className="flex absolute rounded-[50%] bg-black w-full h-full opacity-0 border duration-300 transition-opacity hover:opacity-80 cursor-pointer place-content-center">
            <ImagePlus className="self-center" size={32} />
          </div>
        )}
        <Image
          className="rounded-[50%] aspect-square object-cover"
          src={formData.avatar_url ?? "./userAvatar.svg"}
          width={210}
          height={210}
          alt="Аватар пользователя"
          priority
        />
      </button>
      {!isEditModeActive ? (
        <div className="flex justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold text-(--icon-color-active)">
            {`${profileData?.first_name} ${profileData?.last_name}`}
          </h2>
          <SquarePen
            onClick={() => setIsEditModeActive(true)}
            size={20}
            className="cursor-pointer text-(--icon-color) hover:text-(--icon-color-active) duration-300 transition"
          />
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <LargeField
            maxWidth={120}
            isRequired
            type="text"
            id={"first_name"}
            value={formData.first_name}
            onChangeHandler={handleTextFieldChange}
            fieldName="Имя"
          />
          <LargeField
            maxWidth={120}
            isRequired
            type="text"
            id={"last_name"}
            value={formData.last_name}
            onChangeHandler={handleTextFieldChange}
            fieldName="Фамилия"
          />
          <X
            onClick={() => {
              setIsEditModeActive(false);
              setFormData((prevState) => ({
                ...prevState,
                first_name: profileData?.first_name ?? "",
                last_name: profileData?.last_name ?? "",
              }));

              if (formData.avatar_url === profileData?.avatar_url || null) {
                setHasPendingChanges(false);
              }
            }}
            size={25}
            className="cursor-pointer text-(--icon-color) hover:text-(--icon-color-active) duration-300 transition"
          />
        </div>
      )}
      {error && <div className="text-red-500 text-sm -m-3">{error}</div>}
      <SubmitButton
        text={updatingUserData ? "Загрузка..." : "Сохранить изменения"}
        isActive={hasPendingChanges && !error && !updatingUserData}
      />
    </form>
  );
};
