
const Todo = require("../models/tasks");
const db = require("../config/mongoose");

module.exports.home = function(req, res){

    // return res.render('home',tasks);
    // return res.render('home');
    Todo.find({},function(error , result ){
        if(error){
            console.log("error in fetching document from database ");
            return res.send('<h1>error in finding records<h1>');
        }
        console.log(result);
        return res.render('home',{
            tasks : result 
        })
    });

};

const cat = ['','Personal','School','Office'];
// tasks = [ 
//     {
//         description: "h",
//         dueDate: "2020-06-02",
//         category: cat[1]
//     }
// ];

module.exports.createTodo = function(req,res){
    console.log("data posted");
    // console.log(req.body);
    obj = {
        category: cat[req.body.category],
        dueDate: req.body.dueDate,
        description: req.body.description
    };
    Todo.create(obj,function(error , newTask){
        if(error){
            console.log("cant create new task in db ");
            return res.send('<h1>error in creating object</h1>');
        }
        console.log("********",newTask);
        return res.send(newTask);
    });
};


module.exports.deleteTodo = function(req,res){
    console.log("delete method called ");
    console.log(req.body);
    let arr = req.body ;
    for (let [index, element] of arr.entries() ){
        Todo.findByIdAndDelete(element,function(error){
            if(error){
                arr.splice(index,1);
                return ;
            }
        });
    }
    return res.send({
        "array": arr
    });
}
