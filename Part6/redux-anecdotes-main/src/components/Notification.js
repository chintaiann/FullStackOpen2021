
import React from 'react'
import {connect} from 'react-redux'
import {useDispatch,useSelector} from 'react-redux'



const Notification = (props) => {

  //const notification = useSelector(state=>state.notification)


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.Notification}
      
    </div>
  )
} 
  const mapStateToProps=(state)=>{
    return {
      Notification : state.notification 
    }
  }


const ConnectedNotification =  connect(mapStateToProps,null)(Notification)
export default ConnectedNotification