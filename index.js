const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const http=require("https")
app.use(express.urlencoded({extended:true}));
app.use(express.static("static"));
app.get("/",function(req,res)
{
   res.sendFile(__dirname+"/index.html");
})
app.post("/",function(request,reponse)
{
    console.log("request received")
    const fname=request.body.fname;
    const lname=request.body.lname;
    const ename=request.body.eaddress;
    console.log(fname+" "+lname+" "+ename)
    const url="https://us21.api.mailchimp.com/3.0/lists/1884b398f8"
    const data={
    members:[
        {
           email_address:ename,
           status:"subscribed",
           merge_fields:{
            FNAME : fname,
            LNAME :lname
           },
           update_existing:true
        }
    ]
    };
    const option={
        method:"POST",
        auth:"anyone@gmail.com:4f5444cc5c95b8152f58a0ba139a9d16-us21"
    }
    //well actually its a response
    const rep=http.request(url,option,function(response)
    {
        response.on("data",function(data){
        console.log(JSON.parse(data));
        })
    })
    console.log(rep)
    console.log()
    rep.write(JSON.stringify(data));
    rep.end();
    

})
app.listen(3000,function()
{
    console.log("server has been started on port 3000");
})












// e586a696d79be28a4790ba9712351ed7-us21
//1884b398f8