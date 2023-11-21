import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthServices from '../services/auth.service';
import LocalStorageService from '../services/localStorage.service';

/**
 * Sign-in page.
 */
const SignIn: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  // sent to backend to verify
  const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await AuthServices.login(email, password);
      LocalStorageService.setItem('auth', response.token);

      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>

      {/* Page content. */}
      <main className="grow h-screen">

        <section className="bg-gradient-to-b from-gray-100 to-white h-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back.</h1>
              </div>

              {/* Form */}

              <div className="max-w-sm mx-auto">
                <form onSubmit={handleFormSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input id="email" value={email} type="email" onChange={handleEmailChange} className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <Link to="reset-password" className="text-sm font-medium text-blue-600 hover:underline">Reset password</Link>
                      </div>
                      <input id="password" value={password} onChange={handlePasswordChange} type="password" className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className=" flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">Keep me signed in</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign in</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
        Don’t you have an account? <Link to="/sign-up" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
export default SignIn;
