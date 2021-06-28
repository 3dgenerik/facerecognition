import React from 'react';

const Rank = ({name, rank}) => {
    return(
        <div className = 'white'>
            <div className = 'f3'>{`${name}, you currenty rank is...`}</div>
            <div className = 'f1'>{`#${rank}`}</div>
        </div>
    )
}

export default Rank;