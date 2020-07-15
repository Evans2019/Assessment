module.exports = function (app) {
    /* get Suppliers */
    app.get('/northwind/Getsuppliers',async (req, res) => {
        /* GEt all Suppliers */
        const PostModel = require("./model/post");
        try{
            const posts = await PostModel.find();
            res.json(posts);
         } catch(err){
            console.log(err);
            console.log('Data is not requested');
            res.json({'message':'Data is not requested'});
         }
    })
}