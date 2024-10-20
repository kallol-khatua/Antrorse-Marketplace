import React from "react";

function AuthorizeSellerSkeleton() {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] animate-pulse`}
    >
      <div className="p-5">
        <div className="w-full h-2 mt-4 bg-slate-300 rounded-lg" />
        <div className="w-full h-2 mt-4 bg-slate-300 rounded-lg" />
        <div className="w-full h-2 mt-4 bg-slate-300 rounded-lg" />
        <div className="w-full h-2 mt-4 bg-slate-300 rounded-lg" />
        <div className="w-full h-2 mt-4 bg-slate-300 rounded-lg" />
      </div>
    </div>
  );
}

export default AuthorizeSellerSkeleton;
