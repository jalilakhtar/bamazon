//Welcome to Bamazon, use this application to find and purchase
//your favorite Bamazon items

var inquirer=require('inquirer');

//connects to the Bamazon_db database
var mysql=require('mysql');
var connection=mysql.createConnection({
	host:"localhost",
	port: 3306,
	user:"root", 
	password:"", 
	database:"Bamazon_db"})

//shows connection
connection.connect(function(err){
	if(err) throw err;
	console.log("connected as id "+connection.threadID);
	console.log();})

//Display Items for sale
connection.query('SELECT * FROM Bamazon_db.products;',function(err,res){
	for(var i=0;i<res.length;i++){
		console.log(res[i].ItemID+" | "+res[i].ProductName+" | "+res[i].Price+" | "+res[i].StockQuanitiy);
		}
	console.log("-------------------");
});

//Two messages: ID & quantity of the product someone would like to buy 
// If my store does not has enough quantity of the product to meet the customer's request, 
// it respond by: "Insufficient quantity" and prevents the order from fulfilling.

inquirer.prompt([{
   type: "list",
   name: "option",
   message: "What product would you like to buy?",
   choices: [
       "Black Purse",
        "Velvet",
            "The Catcher in the Rye",
                "Staples",
                    "i-Phone",
                        "Go Pro Camera",
                            "X-Box 360",
                        "Girl with the Dragon tattoo",
                    "Wooden spindle",
                "Dress",
            "Pants",
       "Pens",
   ]
}]).then(function(user) {
   console.log(user.option);

   if (user.option == 'Black Purse') {
       inquirer.prompt([{
           type: 'input',
           message: 'How many do you want to purchase?',
           name: 'numberItem'
       }]).then(function(item) {
           var post = { ProductName: item.Purse-blk, StockQuanitiy: item.numberItem }
           con.query('Select * from products * where ProductName set Purse-blk', post, function(err, result) {
               if (err) throw err;
           });
           con.query('SELECT * from products order by ItemID DESC limit 1', function(err, result) {
               if (err) throw err;
               console.log(result);
           });
       })
   } 
   else if (user.option == 'Velvet') {
       inquirer.prompt([{
           type: 'input',
           message: 'How many do you want to purchase?',
           name: 'numberItem'
       }]).then(function(item) {
           var post = { ProductName: item.Velvet, StockQuanitiy: item.numberItem }
           con.query('INSERT INTO products set ?', post, function(err, result) {
               if (err) throw err;
           });
           con.query('SELECT * from products order by ItemID DESC limit 1', function(err, result) {
               if (err) throw err;
               console.log(result);
           });
       })
   } 
   else if (user.option === 'Staples') {
       inquirer.prompt([{
           type: 'input',
           message: 'How many do you want to purchase?',
           name: 'numberItem'
       }]).then(function(item) {
           var post = { ProductName: item.Staples, StockQuanitiy: item.numberItem }
           con.query('INSERT INTO products set ?', post, function(err, result) {
               if (err) throw err;
           });
           con.query('SELECT * from products order by ItemID DESC limit 1', function(err, result) {
               if (err) throw err;
               console.log(result);
           });
       })
   } 
   else {
       con.query('select * from products', function(err, result) {
           if (err) throw err;
           console.log(result);
       });
   };

});
