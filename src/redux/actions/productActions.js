export const saveList = (listToSave) => (dispatch) => {
    console.log('hay lista')
    dispatch({
        type: "NEW_LIST",
        payload: listToSave,
    });
};