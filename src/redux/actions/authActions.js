export const saveTemporaryRegister = (data) => (dispatch) => {
    dispatch({
        type: "SAVE_TEMP_REGISTER",
        payload: data,
    });
};