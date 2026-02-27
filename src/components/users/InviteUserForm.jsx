import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import RoleSelect from './RoleSelect';

export default function InviteUserForm({
  email,
  role,
  onEmailChange,
  onRoleChange,
  onSubmit,
  isSubmitting,
}) {
  return (
    <div className="mt-4 grid gap-3 lg:grid-cols-3">
      <TextInput
        placeholder="Invite email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />

      <RoleSelect
        className="w-full"
        value={role}
        onChange={onRoleChange}
      />

      <Button
        className="w-full lg:w-auto"
        onClick={onSubmit}
        disabled={isSubmitting}
        isLoading={isSubmitting}
        loadingLabel="Inviting..."
      >
        Send Invite
      </Button>
    </div>
  );
}
