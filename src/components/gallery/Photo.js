import React from 'react';

const Photo = (props) => {
  // console.log(props)
  return (
    <div>
      <div className="center">{props.photo.data().desc}</div>
      <img src={props.photo.data().url} alt={props.photo.data().desc} className="responsive-img"/>
    </div>
  )
}

export default Photo;
