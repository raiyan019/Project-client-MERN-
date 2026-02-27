import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {inviteUserApi} from '../api/auth.api';
import {
  getUsersApi,
  updateUserRoleApi,
  updateUserStatusApi,
} from '../api/users.api';
import {queryClient} from '../app/queryClient';
import {useAuth} from '../auth/authContext';
import Card from '../components/ui/Card';
import InviteLinkPanel from '../components/users/InviteLinkPanel';
import InviteUserForm from '../components/users/InviteUserForm';
import PaginationControls from '../components/users/PaginationControls';
import UsersList from '../components/users/UsersList';
import {getUserId} from '../utils/ids';

const USERS_QUERY_KEY = ['users'];
const PAGE_SIZE = 10;

const buildInviteLink = (response) => {
  // API may return a full invite link or a token to build the registration URL.
  if (response?.inviteLink) {
    return `${window.location.origin}${response.inviteLink}`;
  }
  const token = response?.invite?.token || response?.token;
  return token ? `${window.location.origin}/register?token=${token}` : '';
};

export default function UsersPage() {
  const {user} = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('STAFF');
  const [inviteLink, setInviteLink] = useState('');
  const currentUserId = getUserId(user);
  const isAdmin = user?.role === 'ADMIN';

  const usersQuery = useQuery({
    queryKey: [...USERS_QUERY_KEY, currentPage],
    queryFn: () => getUsersApi(currentPage, PAGE_SIZE),
    keepPreviousData: true,
  });

  const inviteMutation = useMutation({
    mutationFn: inviteUserApi,
    onSuccess: (res) => {
      setInviteLink(buildInviteLink(res));
      setInviteEmail('');
      queryClient.invalidateQueries({queryKey: USERS_QUERY_KEY});
    },
  });

  const roleMutation = useMutation({
    mutationFn: ({id, role}) => updateUserRoleApi(id, role),
    onSuccess: () => queryClient.invalidateQueries({queryKey: USERS_QUERY_KEY}),
  });

  const statusMutation = useMutation({
    mutationFn: ({id, status}) => updateUserStatusApi(id, status),
    onSuccess: () => queryClient.invalidateQueries({queryKey: USERS_QUERY_KEY}),
  });

  const items = usersQuery.data?.items || [];
  const isInviting = inviteMutation.isPending;

  const handleInvite = () =>
    inviteMutation.mutate({email: inviteEmail, role: inviteRole});

  const handleRoleChange = (id, role) => roleMutation.mutate({id, role});

  const handleStatusToggle = (id, status) => {
    if (isAdmin && currentUserId && id === currentUserId) {
      return;
    }
    statusMutation.mutate({id, status});
  };

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-300/30 blur-2xl"
        />

        <h1 className="text-2xl font-bold text-emerald-950">User Management</h1>
        <p className="mt-2 text-sm text-slate-600">
          Invite teammates, adjust roles, and control account status from one place.
        </p>

        <InviteUserForm
          email={inviteEmail}
          role={inviteRole}
          onEmailChange={setInviteEmail}
          onRoleChange={setInviteRole}
          onSubmit={handleInvite}
          isSubmitting={isInviting}
        />

        <InviteLinkPanel link={inviteLink} />
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-emerald-950">Team Members</h2>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 sm:text-sm">
            {items.length} on page {currentPage}
          </span>
        </div>

        <UsersList
          users={items}
          isLoading={usersQuery.isLoading}
          isError={usersQuery.isError}
          onRoleChange={handleRoleChange}
          onStatusToggle={handleStatusToggle}
          currentUserId={currentUserId}
          isAdmin={isAdmin}
        />

        <PaginationControls
          page={currentPage}
          onPrev={() => setCurrentPage((p) => p - 1)}
          onNext={() => setCurrentPage((p) => p + 1)}
        />
      </Card>
    </div>
  );
}
