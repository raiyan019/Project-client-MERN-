import { classNames } from '../../utils/classNames';

export default function DataList({
  items = [],
  isLoading = false,
  isError = false,
  renderItem,
  loadingMessage = 'Loading...',
  errorMessage = 'Failed to load',
  emptyMessage,
  className,
}) {
  return (
    <>
      {isLoading && (
        <p className="text-sm font-medium text-emerald-700">{loadingMessage}</p>
      )}
      {isError && <p className="text-sm font-medium text-rose-600">{errorMessage}</p>}

      <div className={classNames('space-y-3', className)}>
        {items.map(renderItem)}

        {!isLoading && items.length === 0 && emptyMessage && (
          <p className="text-sm text-slate-500">{emptyMessage}</p>
        )}
      </div>
    </>
  );
}
