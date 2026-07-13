interface SkeletonCartTotalsProps {
  header?: boolean;
}

export const SkeletonCartTotals: React.FC<SkeletonCartTotalsProps> = ({
  header = true,
}) => {
  return (
    <div className="flex flex-col">
      {header && <div className="mb-4 h-4 w-32 bg-gray-100" />}
      <div className="flex items-center justify-between">
        <div className="h-3 w-32 bg-gray-100" />
        <div className="h-3 w-32 bg-gray-100" />
      </div>

      <div className="my-4 flex items-center justify-between">
        <div className="h-3 w-24 bg-gray-100" />
        <div className="h-3 w-24 bg-gray-100" />
      </div>

      <div className="flex items-center justify-between">
        <div className="h-3 w-28 bg-gray-100 " />
        <div className="h-3 w-20 bg-gray-100" />
      </div>

      <div className="my-4 w-full border-b border-dashed border-gray-200" />

      <div className="flex items-center justify-between">
        <div className="mb-4 h-6 w-32 bg-gray-100" />
        <div className="mb-4 h-6 w-24 bg-gray-100" />
      </div>
    </div>
  );
};
