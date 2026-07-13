export const SkeletonOrderItems: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-4 border-y border-gray-200 py-10">
      <div className="grid grid-cols-[122px_1fr] gap-x-4">
        <div className="aspect-[29/34] w-full bg-gray-100" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="h-6 w-48 bg-gray-100" />
            <div className="h-4 w-24 bg-gray-100" />
            <div className="h-4 w-32 bg-gray-100" />
          </div>
          <div className="h-6 w-32 bg-gray-100" />
        </div>
      </div>

      <div className="grid grid-cols-[122px_1fr] gap-x-4">
        <div className="aspect-[29/34] w-full bg-gray-100" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="h-6 w-48 bg-gray-100" />
            <div className="h-4 w-24 bg-gray-100" />
            <div className="h-4 w-32 bg-gray-100" />
          </div>
          <div className="h-6 w-32 bg-gray-100" />
        </div>
      </div>

      <div className="grid grid-cols-[122px_1fr] gap-x-4">
        <div className="aspect-[29/34] w-full bg-gray-100" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="h-6 w-48 bg-gray-100" />
            <div className="h-4 w-24 bg-gray-100" />
            <div className="h-4 w-32 bg-gray-100" />
          </div>
          <div className="h-6 w-32 bg-gray-100" />
        </div>
      </div>
    </div>
  );
};
