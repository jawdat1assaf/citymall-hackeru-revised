
// const { address } = require('ip');

import { address } from 'ip'
const path = require('path');



const getPath = (restPath: string) => {
    if(process.env.NODE_ENV == "production") {
        return path.join("https://e-mobile-jawdat.herokuapp.com", restPath);
    }
    return 'http://' + path.join(`0.0.0.0:${process.env.PORT}`, restPath);
}



export { getPath };