/**
 * 
 * 
 * 
 * npx sequelize-cli db:create
 * 
 * npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,address:string,phoneNumber:string,role:string
 * npx sequelize-cli model:generate --name Category --attributes name:string,description:string,thumbnail:string
 * npx sequelize-cli model:generate --name Item --attributes name:string,description:string,thumbnail:string,category_id:integer,price:integer,stock:integer
 * npx sequelize-cli model:generate --name Order --attributes user_id:integer,totalAmount:integer,status:string,paymentMethod:string,shippingAddress:string,phoneNumber:string
 * npx sequelize-cli model:generate --name OrderItem --attributes order_id:integer,item_id:integer,quantity:integer,price:integer
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */