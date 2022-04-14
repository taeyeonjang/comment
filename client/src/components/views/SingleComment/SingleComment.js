import React from 'react'
import { useSelector } from 'react-redux';
import { Comment } from 'antd';



function SingleComment(props) {

  return (
      <div>
          {props.comment && props.comment.content !== '' && 
          <Comment style={{marginLeft:'2rem'}}
                    author={props.comment.writer.name}
                    content={<p style={{fontSize:'25px'}}>{props.comment.content}</p>}
          />

          }


      </div>
    
  )
}

export default SingleComment