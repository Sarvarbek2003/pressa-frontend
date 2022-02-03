const REN = (req, res,next) => {
    try{
        const { postId } = req.params
        req.postId = postId
        res.render('single')
        next()
    }catch(error){
        res.json({message: error.message})
    }
}


module.exports = {
    REN,
}