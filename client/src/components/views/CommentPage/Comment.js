import React,{ useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';


function Comment(props) {

    const user = useSelector(state => state.user)



    const [RootComment, setRootComment] = useState("");

    const onChange=(e)=>{
        setRootComment(e.currentTarget.value)
    }

    const onSubmit=(e)=>{
        e.preventDefault();

        

        const variables = {
            content: RootComment,
            writer: user.userData._id
        }
        axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                setRootComment("")
                props.refreshFunction(response.data.result)
                        
            } else if(response.data.no){
                console.log(response.data.success)
                alert('입력해줘요')
            } else {
                alert('댓글 저장에 실패하였습니다.')
            }
        })
    }


  return (
    <div>

             

        <form style={{display:'flex', justifyContent:'center', position:'relative', bottom:'0'}} onSubmit={onSubmit}>
            <input type="text" placeholder="좋은 글귀 남겨주세요 ^^ 회원가입시 작성한 이름으로 표시됩니다." onChange={onChange} value={RootComment}
                style={{marginRight:'15px', borderRadius:'10px', width:'45rem', height:'4rem', border:'1px solid gray'}}></input>
            <button type="submit" style={{borderRadius:'5px', width:'6rem', height: '4rem'}}>Submit</button>
        </form>
    

    </div>
  )
}

export default Comment