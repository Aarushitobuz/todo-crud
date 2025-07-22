'use client';

import React from 'react';
import ChangePasswordForm from '@/components/changePasswordForm';

const ChangePasswordPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
