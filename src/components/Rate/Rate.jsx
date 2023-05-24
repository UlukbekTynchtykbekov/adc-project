import React, {useMemo, useState} from 'react';
import PropTypes from "prop-types"
const Rate = ({ count, rating, color, onRating }) => {

    const [hoverRating, setHoverRating] = useState(0);
    const getColor = index => {
        if (hoverRating >= index){
            return color.filled;
        }else if(!hoverRating && rating >= index){
            return color.filled;
        }
        return color.unfilled;
    }

    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map(idx => (
                <span className="star" key={idx}>
                    <ion-icon
                        name="star"
                        className="star__item"
                        key={idx}
                        onClick={() => onRating(idx)}
                        style={{ color: getColor(idx) }}
                        onMouseEnter={() => setHoverRating(idx)}
                        onMouseLeave={() => setHoverRating(0)}
                    >

                    </ion-icon>
                </span>
            ))
    },[count, rating, hoverRating]);

    return (
        <>
            {starRating}
        </>
    );
};

Rate.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onChange: PropTypes.func,
    color: PropTypes.shape({
        filled: PropTypes.string,
        unfilled: PropTypes.string
    }),
}

Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "coral",
        unfilled: "#DCDCDC"
    }
}

export default Rate;