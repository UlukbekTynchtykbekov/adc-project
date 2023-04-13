import React, {useMemo} from 'react';
import PropTypes from "prop-types";

const ProjectRating = ({count, rating, color, }) => {

    const ratingStr = rating.toString()
    const getColor = index => {
        if( ratingStr >= index){
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
                        style={{ color: getColor(idx) }}
                    >

                    </ion-icon>
                </span>
            ))
    },[count, rating]);

    return (
        <>
            {starRating}
        </>
    );
};

ProjectRating.propTypes = {
    count: PropTypes.number,
    ratingStr: PropTypes.number,
    onChange: PropTypes.func,
    color: PropTypes.shape({
        filled: PropTypes.string,
        unfilled: PropTypes.string
    }),
}

ProjectRating.defaultProps = {
    count: 5,
    ratingStr: 0,
    color: {
        filled: "coral",
        unfilled: "#DCDCDC"
    }
}

export default ProjectRating;