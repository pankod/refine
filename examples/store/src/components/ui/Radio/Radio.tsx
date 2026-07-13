import cn from "clsx";

interface RadioProps {
  checked: boolean;
}

export const Radio: React.FC<RadioProps> = ({ checked }) => {
  return (
    <div
      className={cn(
        "border-accent-2 flex h-3 w-3 items-center justify-center rounded-full border",
        {
          "border-primary": checked,
        },
      )}
    >
      {checked && <div className="bg-secondary h-2 w-2 rounded-full" />}
    </div>
  );
};
