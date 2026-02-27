import Button from '../ui/Button';

export default function PaginationControls({ page, onPrev, onNext }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        disabled={page === 1}
        onClick={onPrev}
      >
        Prev
      </Button>
      <Button variant="secondary" size="sm" onClick={onNext}>
        Next
      </Button>
      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
        Page {page}
      </span>
    </div>
  );
}
