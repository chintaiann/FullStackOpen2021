import React from 'react'
const Content = ({persons, searchName,deleteName}) => {
    return (
        persons.length ?
        <ul style={{listStyle: 'none', padding: 0}}>
            {
                persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
                .map((person,i) => (
                    <li key={i}>
                        {person.name} {person.number} &nbsp;
                        <button onClick={()=>deleteName(person.id)}>Delete</button>
                    </li>
                ))
            }
        </ul>
        :
        <p>Loading contacts...</p>
    );
};

  export default Content