import { clsx } from "clsx";
import { type ReactNode, useImperativeHandle, useRef } from "react";
import { getBoundingBox } from "../../utils/index.ts";
import type {
  AnchorProps,
  ClassName,
  FocusProps,
  KeyboardProps,
  MouseProps,
} from "../types.ts";
import type { OptionListOption } from "./OptionList.types.ts";
import * as styles from "./OptionListButton.module.less";

export function OptionListButton({
  anchor,
  className,
  disabled,
  focused,
  open,
  option,
  tabIndex,
  title,
  onClick,
  ...props
}: {
  readonly className?: ClassName;
  readonly focused: boolean;
  readonly open: boolean;
  readonly option: OptionListOption;
  readonly title?: string;
} & FocusProps &
  MouseProps &
  KeyboardProps &
  AnchorProps): ReactNode {
  const element = useRef<HTMLSpanElement>(null);
  useImperativeHandle(anchor, () => ({
    getBoundingBox(position) {
      return getBoundingBox(element.current!, position);
    },
  }));
  return (
    <span
      {...props}
      ref={element}
      className={clsx(
        styles.root,
        focused && styles.focused,
        disabled && styles.disabled,
        className,
      )}
      tabIndex={disabled ? undefined : tabIndex ?? 0}
      title={title}
    >
      <span className={styles.placeholder} onClick={onClick}>
        <span className={styles.placeholderName}>{option.name}</span>
        <span className={styles.placeholderArrow}>
          {open ? "\u25BC" : "\u25BA"}
        </span>
      </span>
    </span>
  );
}
