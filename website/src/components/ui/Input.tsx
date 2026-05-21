import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, className, id, ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-body text-label-caps text-muted-text uppercase tracking-widest"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full bg-transparent border-0 border-b border-border-taupe px-0 py-3 text-body-md font-body text-primary focus:outline-none focus:border-primary transition-colors duration-300",
          error && "border-error",
          className
        )}
        {...rest}
      />
      {error && (
        <span className="text-xs text-error font-body">{error}</span>
      )}
    </div>
  );
});
