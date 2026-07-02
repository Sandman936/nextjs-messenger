'use client'

import { ChangeProfileForm } from "@/app/components/profile/change-profile-form/change-profile-form";
import { ChangeProfileFormSkeleton } from "@/app/components/profile/change-profile-form/change-profile-form-skeleton";
import { useAuth } from "@/app/contexts/auth-context";

export default function ProfilePage() {
  const {user, isLoading} = useAuth();

  return (
    <div className="bg-(--primary-purple) border-r-2 border-(--primary-purple) flex flex-col gap-6 h-full p-4 items-center">
      {isLoading 
        ? <ChangeProfileFormSkeleton />
        : <ChangeProfileForm profileData={user} />
      }
    </div>
  );
}
