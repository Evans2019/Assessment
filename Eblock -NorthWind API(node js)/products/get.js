module.exports = function (app) {
     /* get Products */
     app.get('/northwind/Getproducts', async (req, res) => {

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