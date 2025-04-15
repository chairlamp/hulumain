import { UserProfile } from "@/components/user-dashboard/user-profile"

export default function UserProfilePage() {
  return (
    <div className="flex flex-col w-full">
      <header className="border-b w-full">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <h1 className="text-lg font-semibold">My Profile</h1>
        </div>
      </header>
      <main className="flex-1 w-full p-4 sm:p-6">
        <UserProfile />
      </main>
    </div>
  )
}
