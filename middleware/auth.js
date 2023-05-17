import jwt from 'jsonwebtoken'
import * as userRepository from '../data/auth.js'
import {config} from '../config.js'

const AUTH_ERROR = {message: '인증 에러!'}

export const isAuth = async(req, res, next) => {
    const authHeader = req.get('Authorization')
    if(!(authHeader && authHeader.startsWith('Bearer'))){
        return res.status(401).json(AUTH_ERROR)
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(
        token,                                                                        
        config.jwt.secretKey,
        async(error, decoded) => {
            if(error){
                console.log("11111");
                return res.status(401).json(AUTH_ERROR)
            }
            const user = await userRepository.findById(decoded.id)
            if(!user){
                console.log("22222");
                return res.status(401).json(AUTH_ERROR)
            }
            req.userId = user.id
            next()
        }
    )
}