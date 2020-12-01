const initialState = {
    data:{
        savedPhoto:'',
        savedPhone:'',
        savedLocation:''
    }
};

export default function auth(state=initialState, action){
    switch(action.type){
        case 'SAVE_TEMP_REGISTER':{
            return {...state, data:action.payload}
        }
        default: return state
    }
}