export const SkeletonOrderConfirmedHeader: React.FC = () => {
  return (
    <div className="flex animate-pulse flex-col gap-y-2 pb-10">
      <div className="h-4 w-2/5 bg-gray-100" />
      <div className="h-6 w-3/6 bg-gray-100" />
      <div className="flex gap-x-4">
        <div className="h-4 w-16 bg-gray-100" />
        <div className="h-4 w-12 bg-gray-100" />
      </div>
    </div>
  );
};
