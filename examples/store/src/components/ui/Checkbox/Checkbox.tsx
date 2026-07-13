import cn from "clsx";

type CheckboxProps = {
  checked?: boolean;
  onChange?: () => void;
  label: string;
  className?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  className,
}) => {
  return (
    <button
      className={cn("text-accent-7 flex items-center gap-x-2", className)}
      role="checkbox"
      type="button"
      aria-checked={checked}
      onClick={onChange}
    >
      <div
        role="checkbox"
        aria-checked={checked}
        className="border-accent-2 flex h-5 w-5 rounded items-center justify-center border"
      >
        {checked ? "✓" : null}
      </div>
      <span>{label}</span>
    </button>
  );
};
