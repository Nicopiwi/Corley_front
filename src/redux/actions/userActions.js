export const login = data => dispatch => {
    dispatch({
        type:'LOGIN',
        payload:data
    })
}

export const getDataUser = data => dispatch => {
    dispatch({
        type:'GET_DATA_USER',
        payload:data
    })
}

export const uploadUserImage = data => dispatch => {
    dispatch({
        type:'USER_IMAGE',
        payload:data
    })
}

export const resetUser = () => dispatch => {
    dispatch({
        type:'RESET',
        payload:null
    })
    
}