module.exports = function (app) {
    /* Create Supplier */
    app.post('/northwind/supplier', async (req, res) => {

        const PostModel = require("./model/post");
        /* Getting data from front end */
        const post = new PostModel({
            CompanyName: req.body.CompanyName,
            ContactName: req.body.ContactName,
            ContactTitle:  req.body.ContactTitle,
            Address:  req.body.Address,
            Country:  req.body.Country, 
            Fax:  req.body.Fax,
            Phone:    req.body.Phone,
            City:     req.body.City, 
            Region:   req.body.Region,
            PostalCode:    req.body.PostalCode
        });

        /* Save data */
        try{
          const savedpost = await post.save();
          res.json({
              'message':'Supplier is added successfully',
              'status': true,
              'Data': savedpost
          });
        } catch(err){
          res.json({
              'message':'Failed to insert Supplier, Please call system administrator for help',
              'status': false 
          });
      }
    })
}