import { classNames } from '../../utils/classNames';

export default function TextInput({ className, ...rest }) {
  return (
    <input
      className={classNames(
        'rounded-xl border border-emerald-200/90 bg-white/95 px-3 py-2.5 text-sm text-slate-800 shadow-sm shadow-emerald-100/50 transition placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-100',
        className,
      )}
      {...rest}
    />
  );
}
