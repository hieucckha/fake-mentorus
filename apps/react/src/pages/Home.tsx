import { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';

import NavBarLogin from '../partials/NavBarLogin';

/**
 * Home page.
 */
const Home: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='bg-slate-50 flex flex-col min-h-screen overflow-hidden'>
      <NavBarLogin/>

      <div className='container mx-auto mt-10'>
        <div className='grid grid-cols-4 gap-4'>
          <div className="card card-bordered w-96 glass shadow-lg">
            <figure><img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==" alt="car!"/></figure>
            <div className="card-body h-64">
              <h2 className="card-title">Advance web programming</h2>
              <p>Crafting the future, one line of code at a time!</p>
              <div className='card-actions justify-end'>
                <button className="btn btn-primary" onClick={() => setIsOpen(!isOpen)}>Go to class</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog as="div" open={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <h1>Hello world!</h1>
      </Dialog>

    </div>
  );
};

export default Home;
