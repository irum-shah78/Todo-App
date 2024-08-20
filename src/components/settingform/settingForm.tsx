'use client';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import editIcon from "../../../public/assets/icons/Edit.svg";
import Loader from '@/components/loader/Loader';
import { useProfileSettings } from './useSettingForm';

const ProfileSettingsForm: React.FC = () => {
  const { name, setName, email, setEmail, image, loading, status, handleSubmit, handleImageChange, handleChangePassword } = useProfileSettings();
  if (status === 'loading') return <Loader />;

  return (
    <div className="flex-grow flex items-center justify-center bg-center">
      <div className="w-96">
        <h1 className="text-8xl text-customText font-footerText text-center">
          Settings<span className="text-customOrange">.</span>
        </h1>
        <div className="relative flex flex-col items-center">
          <div className="relative w-24 h-24">
            {image ? (
              <Image src={image} alt="Profile" fill style={{ objectFit: 'cover' }} className="rounded-full bg-customText" />
            ) : (
              <div className="w-full h-full bg-customText rounded-full flex items-center justify-center"></div>
            )}
            <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} className="hidden" />
            <label htmlFor="fileInput"
              className="absolute bottom-0 right-0 cursor-pointer p-1 bg-customOrange rounded-full"
            >
              <Image src={editIcon} alt="Edit Icon" className="rounded-full" />
            </label>
          </div>
          <p className=' text-customText text-xl text-center'>Profile Photo</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-customText text-xl ml-6">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" placeholder='Updated name' />
          </div>
          <div className="space-y-2 mt-2">
            <label htmlFor="email" className="block text-customText text-xl ml-6">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" />
          </div>
          <div className="flex justify-center items-center h-full mt-3">
            <button type="button" onClick={handleChangePassword}
              className="px-6 py-1 mt-4 text-customOrange font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl">
              Change Password
            </button>
          </div>
          <div className="flex justify-center items-center h-full mt-3">
            <button type="submit" className="px-8 py-1 mt-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl" disabled={loading}>
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default ProfileSettingsForm;
