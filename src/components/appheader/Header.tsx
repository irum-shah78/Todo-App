// import React from 'react';
// import Image from 'next/image';
// import logo from "../../../public/assets/icons/logo.svg";
// import tuneNav from "../../../public/assets/icons/Tune-Nav.svg";

// const Header = () => {
//   return (
//     <header className="bg-navBlack w-full h-14 dotted-nav flex items-center justify-between fixed top-0">
//       <Image src={logo} alt="icon" className="ms-6 h-8 w-8 cursor-pointer " />
//       <Image src={tuneNav} alt="icon" className="mr-6 h-8 w-8" />
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../public/assets/icons/logo.svg";
import tuneNav from "../../../public/assets/icons/Tune-Nav.svg";

const Header = () => {
  return (
    <header className="bg-navBlack w-full h-14 dotted-nav flex items-center justify-between fixed top-0">
      <Image src={logo} alt="icon" className="ms-6 h-8 w-8 cursor-pointer " />
      <Link href="/profile">
        <Image src={tuneNav} alt="icon" className="mr-6 h-8 w-8 cursor-pointer" />
      </Link>
    </header>
  );
};

export default Header;

