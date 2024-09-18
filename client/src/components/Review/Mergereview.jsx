import React from "react";
import FeedbackComponent from "./Feedback";
import ReviewsComponent from "./Review";

export default function Mergereview() {
  return (
    <div className="   shadow-lg rounded-lg  px-4 py-4 max-w-fit">
      <div className="flex flex-col gap-2">
        <ReviewsComponent />
        <FeedbackComponent />
      </div>
    </div>
  );
}
