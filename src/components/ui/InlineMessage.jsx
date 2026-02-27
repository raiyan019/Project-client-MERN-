import { classNames } from '../../utils/classNames';

const TONE_CLASSES = {
  error: 'text-rose-600',
  muted: 'text-slate-500',
  info: 'text-emerald-700',
};

export default function InlineMessage({
  tone = 'muted',
  className,
  children,
  ...rest
}) {
  return (
    <p
      className={classNames(TONE_CLASSES[tone] || TONE_CLASSES.muted, className)}
      {...rest}
    >
      {children}
    </p>
  );
}
