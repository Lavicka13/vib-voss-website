import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  error?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { label, error, className, id, ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="flex items-start gap-3 cursor-pointer group"
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn(
            "mt-1 w-5 h-5 shrink-0 appearance-none border border-border-taupe rounded-sm bg-transparent checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-colors duration-200 relative",
            error && "border-error",
            className
          )}
          {...rest}
        />
        {label && (
          <span className="font-body text-body-md text-muted-text group-hover:text-primary transition-colors">
            {label}
          </span>
        )}
      </label>
      {error && (
        <span className="text-xs text-error font-body ml-8">{error}</span>
      )}
    </div>
  );
});
