import RoleSelect from './RoleSelect';
import { getUserId } from '../../utils/ids';

export default function UserRow({
  user,
  onRoleChange,
  onStatusToggle,
  currentUserId,
  isAdmin,
}) {
  const isActive = user.status === 'ACTIVE';
  const userId = getUserId(user);
  // Prevent admins from deactivating their own account.
  const isSelfRestricted =
    isAdmin && currentUserId && userId && currentUserId === userId;
  const statusButtonClasses = isActive
    ? 'border-emerald-300 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 active:bg-emerald-300'
    : 'border-amber-300 bg-amber-100 text-amber-800 hover:bg-amber-200 active:bg-amber-300';

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-emerald-100/90 bg-white/88 p-4 shadow-sm shadow-emerald-100/50 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="font-semibold text-emerald-950">
          {user.name}{' '}
          <span className="text-xs text-slate-500">({user.email})</span>
        </div>
        <div className="mt-1 text-xs text-slate-500">
          Role: {user.role} | Status: {user.status}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <RoleSelect
          className="min-w-[8.5rem]"
          value={user.role}
          onChange={(role) => onRoleChange?.(userId, role)}
        />

        <button
          className={`rounded-xl border px-3 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${statusButtonClasses}`}
          onClick={() =>
            onStatusToggle?.(userId, isActive ? 'INACTIVE' : 'ACTIVE')
          }
          disabled={isSelfRestricted}
        >
          {isActive ? 'Deactivate' : 'Activate'}
        </button>

        {isSelfRestricted && (
          <span className="self-center text-xs text-slate-500">
            You can&apos;t deactivate your own account.
          </span>
        )}
      </div>
    </div>
  );
}
