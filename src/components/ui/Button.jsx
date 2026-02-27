import { classNames } from '../../utils/classNames';

const VARIANT_CLASSES = {
  primary:
    'border border-emerald-600 bg-linear-to-r from-emerald-600 via-green-600 to-lime-500 text-white shadow-md shadow-emerald-300/40 hover:from-emerald-500 hover:via-green-500 hover:to-lime-400 focus-visible:ring-emerald-300',
  secondary:
    'border border-emerald-200 bg-white/90 text-emerald-800 hover:bg-emerald-50 focus-visible:ring-emerald-200',
  danger:
    'border border-rose-500 bg-linear-to-r from-rose-600 to-orange-500 text-white hover:from-rose-500 hover:to-orange-400 focus-visible:ring-rose-300',
  ghost:
    'border border-transparent text-emerald-900 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:ring-emerald-200',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm sm:text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingLabel = 'Loading...',
  type = 'button',
  disabled = false,
  className,
  children,
  ...rest
}) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={classNames(
        'inline-flex items-center justify-center rounded-xl font-semibold transition duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      disabled={isDisabled}
      {...rest}
    >
      {isLoading ? loadingLabel : children}
    </button>
  );
}
