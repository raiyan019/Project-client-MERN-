import {createElement} from 'react';
import {classNames} from '../../utils/classNames';

export default function Card({
  as: Component = 'div',
  className,
  children,
  ...rest
}) {
  return createElement(
    Component,
    {
      className: classNames(
        'rounded-2xl border border-emerald-100/80 bg-white/82 p-5 shadow-xl shadow-emerald-200/35 backdrop-blur-lg sm:p-6',
        className,
      ),
      ...rest,
    },
    children,
  );
}
