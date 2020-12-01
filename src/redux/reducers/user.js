const initialState = {
    url:"",
    email:"",
    first_name:"",
    last_name:"",
    date_of_birth:null,
    address:null,
    country:null,
    city:"",
    sex:null,
    postal_code:null,
    department:null,
    phone_number:"",
    userImage:""
};

export default function userData(state=initialState, action){
    switch(action.type){
        case 'LOGIN':{
            const p = action.payload
            return {...state, ...{
                url:p.url,
                email:p.email,
                first_name:p.first_name,
                last_name:p.last_name,
            }}
        }
        case 'GET_DATA_USER':{
            const p = action.payload
            return {...state, ...{
                url:p.url,
                email:p.email,
                first_name:p.first_name,
                last_name:p.last_name,
                city:p.profile.city,
                phone_number:p.profile.phone_number
            }}
        }
        case 'USER_IMAGE':{
            return {...state, userImage:action.payload}
        }
        case 'RESET':
            return {...state, ...{
                url:"",
                email:"",
                first_name:"",
                last_name:"",
                date_of_birth:null,
                address:null,
                country:null,
                city:"",
                sex:null,
                postal_code:null,
                department:null,
                phone_number:"",
                userImage:""
            }}
        default:
            return state
    }
}