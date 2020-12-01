//Este es un JSON con la informacion necesaria para consumir las
//APIs que va a consumir nuestra aplicacion

import { Platform } from 'react-native'
import { Base64 } from 'js-base64';

const REST_DOMAIN_NAME = 'echitosto.pythonanywhere.com'
const REST_PROTOCOL = 'https'
const APIs = {
    expo:{
        push:'https://exp.host/--/api/v2/push/send'
    },
    android_client_id: '201323927438-ufrojt4ld9n4fh2b6opuuave0klqv0ve.apps.googleusercontent.com',
    ios_client_id : '201323927438-2dl8ever06l890kmkge048irg3olv1c2.apps.googleusercontent.com',
    rest:{
        baseUrl:'localhost:8000/api/',
        users:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/users/`,
        orders:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/orders/`,
        products:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/products/`,
        login:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/auth/login/`,
        logout:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/auth/logout/`,
        userrating:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/userrating/`,
        productrating:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/productrating/`,
        productimages:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/productimages/`,
        userimages:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/userimages/`,
        categories: `${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/categories/`,
        productcomments: `${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/productcomments/`,
        pushnotifications: `${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/pushnotifications/token/`,
        notifications:`${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/pushnotifications/`,
        ordertokengen: `${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/ordertokengen/`,
        chat: `${REST_PROTOCOL}://${REST_DOMAIN_NAME}/api/chat/`,
        superUser:{
            auth: `Basic ${Base64.encode('tostoezequiel1@gmail.com:43815344')}`
        },

        default:{

        }
    }
}
export default APIs;