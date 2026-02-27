import {Link, NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useAuth} from '../auth/authContext';
import {classNames} from '../utils/classNames';

export default function Layout() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getNavClassName = ({isActive}) =>
    classNames(
      'rounded-full border border-transparent px-3 py-1.5 text-sm font-semibold transition',
      isActive
        ? 'border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-300/55'
        : 'text-emerald-900 hover:border-emerald-200 hover:bg-emerald-100/80 hover:text-emerald-700',
    );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-lime-300/25 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-emerald-100/80 bg-white/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <span className="text-lg font-black tracking-tight text-emerald-900">
              <Link to="/dashboard">RBAC-PM</Link>
            </span>

            <nav className="flex flex-wrap items-center gap-2">
              <NavLink className={getNavClassName} to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink className={getNavClassName} to="/projects">
                Projects
              </NavLink>
              {user?.role === 'ADMIN' && (
                <NavLink className={getNavClassName} to="/users">
                  Users
                </NavLink>
              )}
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 sm:text-sm">
              {user?.email} | {user?.role}
            </span>
            <button
              className="rounded-full bg-linear-to-r from-emerald-600 via-green-600 to-lime-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-emerald-300/45 transition hover:from-emerald-500 hover:via-green-500 hover:to-lime-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
