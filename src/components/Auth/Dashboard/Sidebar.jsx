import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = ({ role }) => {
  const { logout } = useAuth();

  const studentLinks = [
    { name: 'Profile', path: '/dashboard/student/profile' },
    { name: 'Courses', path: '/dashboard/student/courses' }
  ];

  const staffLinks = [
    { name: 'Courses', path: '/dashboard/staff/courses' },
    { name: 'Gradebook', path: '/dashboard/staff/gradebook' },
    { name: 'Attendance', path: '/dashboard/staff/attendance' },
    { name: 'Library', path: '/dashboard/staff/library' }
  ];

  const links = role === 'student' ? studentLinks : staffLinks;

  return (
    <div className="w-64 bg-indigo-800 text-white flex flex-col h-full">
      <div className="p-4 text-xl font-bold">College Management</div>
      <nav className="flex-1 mt-6">
        <ul>
          {links.map((link) => (
            <li key={link.path} className="mb-1">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-indigo-700 ${isActive ? 'bg-indigo-900' : ''}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={logout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;