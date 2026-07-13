export const SkeletonCartSidebar: React.FC = () => {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="flex flex-col justify-between gap-4">
        {[1, 2, 3, 4].map((key) => (
          <div key={key} className="flex animate-pulse gap-4">
            <div className="h-[100px] w-[100px] bg-gray-200" />
            <div className="text-base-regular flex items-start justify-between">
              <div>
                <div className="flex flex-col gap-y-2">
                  <div className="h-3 w-[120px] bg-gray-200" />
                  <div className="h-3 w-[65px] bg-gray-200" />
                </div>
              </div>
              <div className="h-3 w-[65px] bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-col">
          <div className="my-4 w-full border-b border-dashed border-gray-200" />

          <div className="flex  justify-center">
            <div className="mb-4 h-12 w-64 bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};
