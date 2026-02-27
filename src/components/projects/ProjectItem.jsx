import Button from '../ui/Button';
import ProjectEditFields from './ProjectEditFields';

function ProjectDetails({ project }) {
  return (
    <>
      <div className="font-semibold text-emerald-950">{project.name}</div>
      <div className="mt-1 text-sm text-slate-600">{project.description}</div>
      <div className="mt-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
        Status: {project.status}
      </div>
    </>
  );
}

export default function ProjectItem({
  project,
  isEditing,
  editValues,
  onEditNameChange,
  onEditDescriptionChange,
  onEditStatusChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  isSaving,
  isSaveDisabled,
  canManage,
  errorMessage,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-emerald-100/90 bg-white/88 p-4 shadow-sm shadow-emerald-100/60 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex-1">
        {isEditing ? (
          <ProjectEditFields
            name={editValues.name}
            description={editValues.description}
            status={editValues.status}
            onNameChange={onEditNameChange}
            onDescriptionChange={onEditDescriptionChange}
            onStatusChange={onEditStatusChange}
            errorMessage={errorMessage}
          />
        ) : (
          <ProjectDetails project={project} />
        )}
      </div>

      {canManage && (
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          {isEditing ? (
            <>
              <Button
                size="sm"
                disabled={isSaveDisabled}
                isLoading={isSaving}
                loadingLabel="Saving..."
                onClick={() => onSaveEdit(project)}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={isSaving}
                onClick={onCancelEdit}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onStartEdit(project)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(project)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
