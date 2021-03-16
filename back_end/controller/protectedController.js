exports.getPersonalInfo = (req, res, next) =>{
    return res.json({
        success: true,
        data: req.user
    })
}