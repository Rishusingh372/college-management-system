import { useAuth } from '../../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {user?.role === 'student' ? 'Student Dashboard' : 'Staff Dashboard'}
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user?.name}</span>
          <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;