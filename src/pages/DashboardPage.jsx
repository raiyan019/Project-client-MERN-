import {useAuth} from '../auth/authContext';
import Card from '../components/ui/Card';

export default function DashboardPage() {
  const {user} = useAuth();

  return (
    <div className="space-y-5">
      <Card className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-300/35 blur-2xl"
        />

        <h1 className="text-2xl font-bold text-emerald-950">Dashboard</h1>
        <p className="mt-2 text-slate-700">
          Welcome,{' '}
          <span className="font-semibold text-emerald-700">{user?.name}</span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold sm:text-sm">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
            Role: {user?.role}
          </span>
          <span className="rounded-full bg-lime-100 px-3 py-1 text-lime-700">
            Status: {user?.status}
          </span>
        </div>
      </Card>
    </div>
  );
}
