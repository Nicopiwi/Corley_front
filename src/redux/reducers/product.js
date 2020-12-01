const initialState = {
    selected:{
        title:'',
        description:'',
        rating:Math.floor(Math.random() * 5) + 1,
        publicador:'',
        pricePerHour:'',
        isOwner:'',
        ownerId:'',
        productId:'',
        stock:0,
        brand:'',
        category:'',
        imageSrc:{uri:'https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg'}
    },
    list:[]
};

export default function product(state=initialState, action){
    switch(action.type){
        case 'SELECT_PRODUCT':{
            return {...state, selected:action.payload}
        }
        case 'NEW_ELEMENTS':
            return {...state, list:[...state.list, ...action.payload]}
        case 'NEW_LIST':
            return {...state, list:action.payload}
        default:
            return state
    }
}