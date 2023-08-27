import React, { useState } from 'react';
import classNames from 'classnames';

interface StarRatingProps {
  value: number;
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
  const [hoverValue] = useState<number>(0);

//   const handleMouseOver = (newValue: number) => {
//     setHoverValue(newValue);
//   };

//   const handleMouseLeave = () => {
//     setHoverValue(0);
//   };


  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = (hoverValue || value) >= ratingValue;
        const isHalfFilled = (hoverValue || value) + 0.42 === ratingValue;

        return (
          <div
            key={index}
            className={classNames('cursor-pointer', {
              'text-yellow-400': isFilled || isHalfFilled,
              'text-gray-400': !isFilled && !isHalfFilled,
            })}
            // onMouseOver={() => handleMouseOver(ratingValue)}
            // onMouseLeave={handleMouseLeave}
          >
            {isFilled ? (
              <>&#9733;</>
            ) : isHalfFilled ? (
              <>&#9733;&#189;</>
            ) : (
              <>&#9734;</>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
