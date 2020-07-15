module.exports = function (app) {
   
     /* Create Product */
     app.post('/northwind/product', async (req, res) => {
        const PostModel = require("./model/post");
        /* Getting data from front end */
        const post = new PostModel({
          Productname: req.body.Productname,
          Supplierid: req.body.Supplierid,
          CatergoryId: req.body.CatergoryId,
          QuantityPerUnit: req.body.QuantityPerUnit,
          UnitPrice: req.body.UnitPrice,
          UnitsInStock: req.body.UnitsInStock, 
          UnitsOnOrder: req.body.UnitsOnOrder,
          ReorderLevel: req.body.ReorderLevel,
          Discountinued :req.body.Discountinued
        });

        /* Save data */
        try{
          const savedpost = await post.save();
          res.json({
              'message':'Product is added successfully',
              'status': true,
              'Data': savedpost
          });
        } catch(err){
          res.json({
              'message':'Failed to insert Product, Please call system administrator for help',
              'status': false 
          });
      }
    })
}