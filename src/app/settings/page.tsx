import { Metadata } from 'next';
import React from 'react';
import ProfileSettingsForm from '../../components/settingform/settingForm';
import Header from '@/components/header/Header';

export const metadata: Metadata = {
  title: "Profile Settings | Todo App",
  description: "Manage your profile settings including name, email, and profile photo.",
  openGraph: {
    title: "Profile Settings | Todo App",
    description: "Update your profile settings on Todo App.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/settings-og.png`,
        alt: "Profile Settings",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/settings`,
    type: "website",
  },
};

const ProfileSettingsPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col font-paragraph bg-customBlack dotted-background overflow-hidden">
      <Header />
        <div className="flex-grow flex items-center justify-center bg-center">
          <div className="w-96">
            <ProfileSettingsForm />
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <p className="font-footerText text-customFooter text-4xl sm:text-6xl lg:text-7xl">
            settings<span className="text-customOrange text-4xl sm:text-6xl lg:text-7xl">.</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileSettingsPage;