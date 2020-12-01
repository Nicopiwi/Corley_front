const Users = (state=[], action)=>{
    switch(action.type){
        case 'REMOVE_NOTIFICATION':
            return state.filter(notification=>notification.id!==action.payload.id);
    }
}