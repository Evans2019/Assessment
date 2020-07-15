module.exports = function (app) {
    const PostModel = require("./model/post");
     /* get Catergories */
     app.get('/northwind/Getcatergories', async (req, res) => {
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