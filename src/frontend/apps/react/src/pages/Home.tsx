import { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';

import NavBarLogin from '../partials/NavBarLogin';
import Sidebar from '../partials/Sidebar';

/**
 * Home page.
 */
const Home: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // <div className="flex flex-col h-screen">
    <>
      <NavBarLogin/>
      <Sidebar/>
    </>
  );
};

export default Home;
