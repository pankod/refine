import { ChevronUpIcon, ChevronDownIcon } from "@/components/icons";

type NumberInputProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onIncrement,
  onDecrement,
  onChange,
}) => {
  return (
    <div className="relative flex items-center overflow-hidden">
      <button
        className="h-full rounded-tl-md rounded-bl-md border p-2 transition-all hover:bg-gray-50 active:bg-gray-50"
        onClick={onDecrement}
      >
        <ChevronDownIcon className="text-primary h-4 w-4" />
      </button>
      <input
        className="focus:outline-primary focus:border-primary h-full w-8 border p-2 transition-colors"
        value={value}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
      />
      <button
        className="h-full rounded-tr-md rounded-br-md border p-2 transition-all hover:bg-gray-50 active:bg-gray-50"
        onClick={onIncrement}
      >
        <ChevronUpIcon className="text-primary h-4 w-4" />
      </button>
    </div>
  );
};
