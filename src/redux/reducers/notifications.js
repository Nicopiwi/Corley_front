const initialState = {
    mode:'light',
    notificationsList:[]
};

export default function notifications(state=initialState, action){
    switch(action.type){
        case 'REMOVE_NOTIFICATION':
            return {...state, ...state.notificationsList.filter(notification=>notification.id!==action.payload.id)}
        default:
            return state
    }
}