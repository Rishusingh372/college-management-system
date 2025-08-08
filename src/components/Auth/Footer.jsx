import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className={`bg-gray-800 text-white ${user ? 'ml-64' : ''}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* College Info */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">College Management System</h3>
            <p className="text-gray-400">Empowering education through technology</p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                {user ? (
                  <li>
                    <Link 
                      to={user.role === 'student' ? '/dashboard/student' : '/dashboard/staff'} 
                      className="text-gray-400 hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <>
                    <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                    <li><Link to="/signup" className="text-gray-400 hover:text-white">Sign Up</Link></li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Academic Calendar</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Campus Map</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} College Management System. All rights reserved.</p>
          <p className="mt-1">Developed with ❤️ for educational institutions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;