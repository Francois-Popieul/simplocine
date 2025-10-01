import "./Button.css";
import clsx from "clsx";

interface ButtonProps {
  name: string;
  variant: "primary" | "secondary";
  width: "default" | "very_small" | "small" | "medium" | "large";
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={clsx(
        "button",
        `button_${props.variant}`,
        `button_${props.width}`
      )}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};
