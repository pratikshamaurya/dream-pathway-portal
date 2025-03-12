
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 bg-gradient-to-b from-transparent to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                DreamPathway
              </span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Helping students discover their perfect career path through personalized assessment and guidance.
            </p>
          </div>

          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/success-stories" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/test" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    Career Test
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    Career Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {currentYear} DreamPathway. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <span className="sr-only">Privacy Policy</span>
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <span className="sr-only">Terms of Service</span>
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <span className="sr-only">Contact</span>
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
