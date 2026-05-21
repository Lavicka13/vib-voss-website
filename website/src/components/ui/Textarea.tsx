import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { label, error, className, id, rows = 4, ...rest },
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
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={cn(
          "w-full bg-transparent border border-border-taupe rounded px-4 py-3 text-body-md font-body text-primary focus:outline-none focus:border-primary transition-colors duration-300 resize-y",
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
