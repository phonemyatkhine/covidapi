var express = require('express');
var router = express.Router(); //express router to use the routing
var News = require('../models/news.model');

module.exports = router; //exporting router

router.get('/',async (req,res) => 
{
    try {
        var news = await News.find({});
        res.json(news);
      } catch (err) {
        res.status(500).json({
          message: err.message
        })
      }
});

router.post('/',CheckToken,async (req,res,next)=>{
    if(req.body.source && req.body.title && req.body.url && req.body.uploadBy&&req.body.date)
    {
        var ID = null;
        if(req.body.uploadBy == 'api')
        {
            ID = req.body.ID;
        }
        var news = new News({
            ID:ID,
            source:req.body.source,
            title:req.body.title,
            url:req.body.url,
            uploadBy:req.body.uploadBy,
            date:req.body.date
        });
        try
        {
            var newNews = await news.save();
            res.status(201).json(newNews);
        }
        catch(err)
        {
            res.status(400).json({
                message: err.message
              })
        }
    }
});

async function CheckToken(req,res,next)
{
    var token = null;
    if(req.cookies.token != null)
    {
        token = req.cookies.token;
    }
    if(token!=null)
    {
        jwt.verify(token,process.env.KEY,(err,ele)=>{
            if(err)
            {
                res.render('login');
            }
        });
        res = req;
        res.next();
    }
    else
    {
        res.render('login');
    }
}