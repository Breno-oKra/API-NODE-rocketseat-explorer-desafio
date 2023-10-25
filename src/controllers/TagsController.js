class TagsController{
    create(req,res){
        const {id,id_user,id_note,name} = req.body

        res.json({
            id,
            id_user,
            id_note,
            name,
        })
    }
   
}


module.exports = TagsController