import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Auth from '../../../hoc/auth';
import Comment from '../CommentPage/Comment';
import { useSelector } from 'react-redux';
import SingleComment from '../SingleComment/SingleComment';


function LandingPage() {
    
    const user = useSelector(state => state.user)

    
    const [Comments, setComments] = useState([]);
    const [Yeil, setYeil] = useState(false)
    const onYeil = () => {
        setYeil(!Yeil)
    }

    useEffect(()=>{
        axios.post('/api/comment/getComment')
        .then(response => {
            if(response.data.success){
                setComments(response.data.items)
                console.log(response.data)

            } else {
                alert('error')
            }
        })
    }, []);    

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }


   
  if (user.userData && !user.userData.isAuth) {
    return (

        <div>
               <div style={{ flexDirection:'column', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'30px' }}> 로그인 부탁드릴게요 우측상단에 있어요 😊
               <button onClick={onYeil} style={{fontSize:'10px', color:'gray'}}>예일이는 클릭해</button>
               {Yeil && 
               <p style={{fontSize:'10px', color:'gray'}}> 예일이 Sign in은 로그인이고 Sign up 은 회원가입이다 </p>
               }
               
               </div>

      </div>
        

    )
  } else {
    return (
        <div style={{height:'100vh'}}> 

            {Comments && Comments.map((item, index) => (
                <SingleComment key={index} comment={item}/>
            ))}

            <br /><br /><br /><br /><br /><br /><br />
            <hr />
            <Comment refreshFunction={refreshFunction} />


     </div>
    )
  }
}


export default Auth(LandingPage, null);