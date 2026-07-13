import { PlusSquareIcon } from "@/components/icons";

export const ProductsTableSkeleton = () => {
  return (
    <table className="w-full">
      <tbody className="w-full">
        {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
          <tr key={index} className="border-b border-gray-100 w-full">
            <td className="p-4">
              <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                <div className="animate-pulse flex-shrink-0 w-32 h-32 bg-gray-200 rounded-full" />
                <div className="animate-pulse  flex-auto flex flex-col gap-1 w-full md:w-auto text-center">
                  <div className="h-7 bg-gray-200 w-full lg:w-1/6" />
                  <div className="h-6 bg-gray-200 w-full lg:w-1/2" />
                </div>
                <div className="w-16 h-6 shrink-0 flex items-center">
                  <div className="animate-pulse w-10 h-6 bg-gray-200" />
                </div>
                <div className="mb-[5px]">
                  <div className="ml-[124px]  bg-primary flex h-8 items-center gap-1 rounded-lg pl-2 pr-4 font-bold text-white">
                    <PlusSquareIcon className="h-6 w-6 text-white " />
                    Add to Card
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
