import { combineReducers } from 'redux';
import user from './User_reducer'

const rootReducer = combineReducers({
    user //content // ~~~
})

export default rootReducer;

//combineReducer는 여러 reducer들을 하나로 모으는것 