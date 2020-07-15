module.exports = function (app) {
    
      /* Create Catergory */
      app.post('/northwind/catergory', async (req, res) => {

        const PostModel = require("./model/post");
          /* Getting data from front end */
          const post = new PostModel({
            CatergoryName: req.body.CatergoryName,
            Description: req.body.Description,
            Picture: req.body.Picture
          });

          /* Save data */
          try{
            const savedpost = await post.save();
            res.json({
                'message':'Category is added successfully',
                'status': true,
                'Data': savedpost
            });
          } catch(err){
            res.json({
                'message':'Failed to insert Category, Please call system administrator for help',
                'status': false 
            });
        }
    })
}