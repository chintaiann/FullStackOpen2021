import React from 'react';

// Component for filtering the phonebook by the searched name

const Filter = ({newFilter,setNewFilter}) => {
    return (
        <div>
            Search for name: <input value={newFilter} 
                onChange={event => setNewFilter(event.target.value)}
            />
        </div>
    );
};

export default Filter;