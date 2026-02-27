import { classNames } from '../../utils/classNames';

export default function SelectInput({
  options = [],
  className,
  ...rest
}) {
  return (
    <select
      className={classNames(
        'rounded-xl border border-emerald-200/90 bg-white/95 px-3 py-2.5 text-sm text-slate-800 shadow-sm shadow-emerald-100/50 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-100',
        className,
      )}
      {...rest}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
