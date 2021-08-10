var express=require('express');
var mongoose=require('mongoose');
var app=express();
var bodyparser=require('body-parser');
//mongodb+srv://Admin:admin123@cluster0.cokcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

var i1=[];

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/todolistDB',{useNewUrlParser:true, useUnifiedTopology:true})
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema)
// const item=new Item({
//     name:"done",
// });
// d=[item];

// Item.insertMany(d,function(err){
//     if(err){console.log(err);}
//     else{console.log("success!")}
// })
app.get("/",function(req,res){
    Item.find({},function(err,f){
        res.render("list",{newListItems:f});

    })    
    // res.send("")
})
app.post('/',function(req,res){
    const itemName=req.body.n;
    const item =new Item({
        name:itemName
    })
    // res.render('list',{newListItem:i})
    item.save();          
    res.redirect('/');

});

app.post("/delete/:id",function(req,res){
    // console.log(req.body.checkbox);
    // const check=req.body.checkbox;
    id=req.params.id;
    console.log("got req...."+id);
    Item.findByIdAndRemove(id,function(err,docs){
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully deleted")
            res.redirect("/");
        }

    })
});

app.listen(4000,function(){
    console.log(`Listning on Port:4000`);
});