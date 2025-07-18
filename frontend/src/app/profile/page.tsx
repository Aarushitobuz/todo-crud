import ChangePasswordForm from '@/components/changePasswordForm';

export default function ProfilePage() {
    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-950">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* <div className="flex items-center gap-4"> */}
                    {/* <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                        U
                    </div> */}
          <div>
            <h1 className="text-2xl font-bold flex justify-center dark:text-white">My Profile</h1><br></br>
            {/* <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your profile and settings</p> */}
          </div>
        </div>

        <ChangePasswordForm />
      </div>
    // </div>
  );
}
