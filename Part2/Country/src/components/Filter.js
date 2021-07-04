import React from 'react';

const Filter = ({newFilter,onChange}) => {
    return (
        <div>
            Search for country: <input value={newFilter} 
                onChange={onChange} 
            />
        </div>
    );
};

export default Filter;