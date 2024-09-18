import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const totalStars = 5;

  const ratingRemainder = rating % 2 > 0 ? true : false;
  const ratingWholeNumber = Math.trunc(rating);
  const filledStars = Array(ratingWholeNumber).fill(1);
  const emptyStars = Array(
    totalStars - ratingWholeNumber - (ratingRemainder ? 1 : 0)
  ).fill(1);

  return (
    <div className="flex">
      {filledStars.map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}

      {ratingRemainder ? <FaStarHalfAlt className="text-yellow-500" /> : null}

      {emptyStars.map((_, index) => (
        <FaRegStar key={index} className="text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
