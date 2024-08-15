import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../public/assets/icons/logo.svg";
import tuneNav from "../../../public/assets/icons/Tune-Nav.svg";

interface HeaderProps {
  theme: {
    primary: string;
    background: string;
    accent: string;
  };
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  return (
    <header
      style={{ backgroundColor: theme.background }}
      className="w-full h-14 dotted-nav flex items-center justify-between fixed top-0"
    >
      <Image src={logo} alt="icon" className="ms-6 h-8 w-8 cursor-pointer" />
      <Link href="/settings">
        <Image
          src={tuneNav}
          alt="icon"
          className={`mr-6 h-8 w-8 cursor-pointer fill-[${theme.accent}]`}
        /> 

      </Link>
    </header>
  );
};

export default Header;

// import React from 'react';
// import Link from 'next/link';
// import logo from "../../../public/assets/icons/logo.svg";
// import tuneNav from "../../../public/assets/icons/Tune-Nav.svg";
// import Image from 'next/image';

// interface HeaderProps {
//   theme: {
//     primary: string;
//     background: string;
//     accent: string;
//   };
// }

// const Header: React.FC<HeaderProps> = ({ theme }) => {
//   return (
//     <header
//       style={{ backgroundColor: theme.background }}
//       className="w-full h-14 dotted-nav flex items-center justify-between fixed top-0"
//     >
//       <Image src={logo} alt="icon" className="ms-6 h-8 w-8 cursor-pointer" />
//       <Link href="/settings">
//         <div 
//           className="mr-6 h-6 w-6 cursor-pointer"  // Adjusted size to make the icon smaller
//           style={{
//             backgroundImage: `url(${tuneNav.src})`,
//             backgroundSize: 'contain', // Ensure the image is fully contained within the div
//             WebkitMask: `url(${tuneNav.src}) no-repeat center`,
//             mask: `url(${tuneNav.src}) no-repeat center`,
//             WebkitMaskSize: 'contain', // Ensure the mask fits within the div
//             maskSize: 'contain', // Ensure the mask fits within the div
//             backgroundColor: theme.primary,
//           }}
//         />
//       </Link>
//     </header>
//   );
// };

// export default Header;
