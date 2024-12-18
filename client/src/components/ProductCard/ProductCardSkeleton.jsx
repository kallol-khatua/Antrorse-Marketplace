import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div
      className={`relative rounded-lg w-full max-w-xs overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] animate-pulse`}
    >
      {/* image */}
      <div className="w-full aspect-video bg-slate-300" />
      {/* <div className="absolute top-1 left-1 m-1 w-24 h-4 bg-slate-400 rounded-lg border border-1 border-slate-400" /> */}
      <div className="p-5">
        {/* title */}
        <div className="w-56 h-3 mt-4 bg-slate-300 rounded-lg" />
        {/* caption */}
        <div className="w-24 h-3 mt-4 bg-slate-300 rounded-lg" />
        {/* <div className="flex justify-between flex-nowrap items-center mt-6 ">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-300" />
          <div className="w-24 h-2 bg-slate-300 rounded-lg" />
        </div> */}
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
