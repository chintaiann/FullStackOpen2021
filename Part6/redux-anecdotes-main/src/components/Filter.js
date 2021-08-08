import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = (props) => {
    //const dispatch = useDispatch()

    // return (
    //     <div>
    //     Filter : 
    //         <div><input  type='text' onChange={event => dispatch(changeFilter(event.target.value))} name="filter"/></div>
    //     </div>
    // )

    return ( 
        <div>
            Filter : 
                <div>
                    <input type='text' 
                    onChange = {event => props.changeFilter(event.target.value)} 
                    name='filter' />
                </div>
        </div>
    )

}

//export default Filter



const mapDispatchToProps = {
    changeFilter
}

export default connect (
    null,
    mapDispatchToProps)(Filter)
