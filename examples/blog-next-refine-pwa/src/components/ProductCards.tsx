import * as React from "react";

export interface Props {
  price: number;
  category: string;
  title: string;
  description: string;
  cardImage: string;
}

const ProductCards: React.FC<Props> = ({
  price,
  title,
  category,
  description,
  cardImage,
}) => {
  return (
    <div className="relative max-w-xs pb-2 outline outline-[#042940]">
      <div className="relative flex items-center justify-center bg-[#fff] py-4">
        <img
          src={cardImage}
          alt={`${title}`}
          className="z-30 h-56 max-w-xs transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        />
      </div>
      <div className="px-4">
        <p className="mb-1 text-lg font-semibold text-black">{title}</p>
        <div className="flex justify-between">
          <p className="mb-2 mt-2 w-fit rounded bg-[#042940] p-1 text-white outline outline-offset-2 outline-[#D6D58E]">
            ${price}
          </p>
          <button className="mb-2 mt-2 w-fit rounded bg-[#042940] p-1 text-white outline outline-offset-2 outline-[#D6D58E]">
            Add to cart
          </button>
        </div>
        <p>{`${(description || []).slice(0, 100)}`}...</p>
        <p className=" py mt-2 w-fit rounded-3xl bg-[#D6D58E] px-2 py-0.5 text-sm text-gray-600">
          {category}
        </p>
      </div>
    </div>
  );
};

export default ProductCards;
