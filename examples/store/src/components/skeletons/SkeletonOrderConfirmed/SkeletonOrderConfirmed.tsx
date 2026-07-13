import {
  SkeletonOrderItems,
  SkeletonOrderConfirmedHeader,
  SkeletonOrderInformation,
} from "@components";

export const SkeletonOrderConfirmed: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] animate-pulse bg-gray-50 py-6">
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-8">
        <div className="h-full w-full max-w-4xl bg-white p-10">
          <SkeletonOrderConfirmedHeader />

          <SkeletonOrderItems />

          <SkeletonOrderInformation />
        </div>
      </div>
    </div>
  );
};
