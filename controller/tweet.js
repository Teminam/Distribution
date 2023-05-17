import * as tweetRepositroy from '../data/tweet.js'
import { getSocketIO } from '../connection/socket.js'

export async function getTweets(req, res) {
    const username = req.query.username
    const data = await (username 
    ? tweetRepositroy.getAllByUsername(username)
    : tweetRepositroy.getAll())
    res.status(200).json(data)
}     

export async function getTweet(req, res, next) {
    const id = req.params.id
    const tweet = await tweetRepositroy.getById(id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
    res.status(404).json({message: `Tweet id(${id}) not found`})
    }
}

export async function createTweet(req, res, next) {
    const {text} = req.body
    const tweet = await tweetRepositroy.create(text, req.userId)
    res.status(201).json(tweet)
    getSocketIO().emit('tweets', tweet)
}

export async function updateTweet(req, res, next){
    const id = req.params.id
    const text = req.body.text
    const tweet = await tweetRepositroy.getById(id)
    if(!tweet){
        res.status(404).json({message: `Tweet id(${id}) not found`})        
    }
    if(tweet.userId !== req.userId){
        return res.sendStatus(403)
    }
    const updated = await tweetRepositroy.update(id, text)
    res.status(200).json(updated)
}

export async function DeleteTweet(req, res, next){
    const id = req.params.id
    const tweet = await tweetRepositroy.getById(id)
    if(!tweet){
        res.status(404).json({message: `Tweet id(${id}) not found`}) 
    }
    if(tweet.userId !== req.userId){
        return res.sendStatus(403)
    }
    await tweetRepositroy.remove(id)
    res.sendStatus(204)
}