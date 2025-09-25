import "./Button.css";
import clsx from "clsx";

interface ButtonProps {
  name: string;
  variant: "primary" | "secondary";
  width: "default" | "medium" | "large";
}

export const Button = (props: ButtonProps) => {
  return (
    <button className={clsx("button", `button_${props.variant}`, `button_${props.width}`)}>
      {props.name}
    </button>
  );
};