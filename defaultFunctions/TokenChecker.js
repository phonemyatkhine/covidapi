var jwt = require("jsonwebtoken");

function TokenCheck(req,res,next) 
{
    console.log("Checker Operation");
    
    var token = null;
    if(req.cookies.token != null)
    {
        token = req.cookies.token;
    }
    else
    {
        // res.redirect("http://localhost:3000/static/coviddashB/html/login.html");
        res.json({ code: 403, body: "Login required" });
    }
    if(token)
    {
        jwt.verify(token, process.env.KEY, (err, _nil) => {
			if (err) {
                // res.redirect("http://localhost:3000/static/coviddashB/html/login.html");
                res.json({ code: 403, body: "Login required" });
			}
        });
        next();
    }
}

module.exports = TokenCheck;