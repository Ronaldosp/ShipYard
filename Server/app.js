if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const { comparePasswrod } = require('./helpers/bcrypt');
const midtransClient = require("midtrans-client");
const {  User , Item , Order , OrderItem , Category } = require('./models');
const { signToken } = require('./helpers/jwt');
const { authentication } = require("./middlewares/authentication");

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log();

app.post('/register',async(req , res)=>{
  try {
    const {username, email , role, password} = req.body;
    const user = await User.create({ username, email, role, password });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
    console.log(error);
  }
});

app.post('/login', async(req , res)=>{
  try {
    const {email , password} = req.body;
    console.log(req.body);
    
    const user = await User.findOne({where : {email}});
    if(!user){
      throw { message : "UserNotFound" };
    }

    const passValid = comparePasswrod(password , user.password);
    if(!passValid){
      throw { message : "UserNotFound"};
    }
    const token = signToken({ id: user.id , email: user.email , role: user.role})
    res.status(200).json({ access_token: token });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.errors[0].message });
    } else if (error.message === "UserNotFound") {
      res.status(500).json({ message: "Invalid email/password" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

//Categories
app.get('/categories', async(req,res)=>{
  try {
    const category = await Category.findAll();
    
    res.status(200).json(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/categories/:id', async(req , res)=>{
  try {
    const {id} = req.params
    const {name , description , thumbnail} = req.body
    const category = await Category.update(
      {name , description , thumbnail},
      {where: {id:id}}
    )
    if(!category){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Category has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Category Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.delete('/categories/:id', async(req,res)=>{
  try {
      const {id} = req.params
      const category = await Category.findByPk(id)
      if(!category){
        return {message : 'NotFound'}
      }
      await Category.destroy({where:{id}})
      res.status(200).json({message : "Category Deleted"})
  } catch (error) {
      console.log(error); 
  }
});

app.post('/categories', async(req,res)=>{
  try {
    const {name, description , thumbnail} = req.body
    const category = Category.create({name, description , thumbnail})
    res.status(201).json(`Created New Category ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Items
app.get('/items', async(req,res)=>{
  try {
    const items = await Item.findAll({
      include: [
        {
          model: Category
        },
        {
          model: Order,
          through: {
            attributes: ['quantity', 'price']
          }
        }
      ]
    });
    res.status(200).json(items)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.get('/items/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const items = await Item.findByPk(id, {
      include: [Category,]
    });
    res.status(200).json(items)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/items', async(req,res)=>{
  try {
    const {name , description , thumbnail , category_id , price , stock} = req.body;

    const items = await Item.create({name , description , thumbnail , category_id , price, stock})
    res.status(201).json(`Created New Item ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put('/items/:id', async(req, res)=>{
  try {
    const id = req.params.id
    const {name , description , thumbnail , category_id , price , stock} = req.body
    const items = await Item.update(
      {name , description , thumbnail , category_id , price , stock},
      {where :{id:id}}
    )
    if(!items){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Item has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Item Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.delete('/items/:id' , async(req,res)=>{
  try {
    const {id} = req.params
    const items = await Item.findByPk(id)

    if(!items){
      return {message : 'NotFound'}
    }
    await Item.destroy({where : {id}})
    res.status(200).json({message : "Item Deleted"})
  } catch (error) {
    console.log(error);
  }
});

//Orders 

app.post('/orders', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      user_id,
      items, // [{ item_id, quantity }]
      paymentMethod,
      shippingAddress,
      phoneNumber
    } = req.body;

    const order = await Order.create({
      user_id,
      status: 'PENDING',
      paymentMethod,
      shippingAddress,
      phoneNumber,
      totalAmount: 0
    }, { transaction: t });

    let totalAmount = 0;

    for (const i of items) {
      const item = await Item.findByPk(i.item_id);

      if (!item || item.stock < i.quantity) {
        throw new Error('Stock not enough');
      }

      totalAmount += item.price * i.quantity;

      await OrderItem.create({
        order_id: order.id,
        item_id: item.id,
        quantity: i.quantity,
        price: item.price
      }, { transaction: t });

      await item.decrement('stock', {
        by: i.quantity,
        transaction: t
      });
    }

    await order.update({ totalAmount }, { transaction: t });

    await t.commit();
    res.status(201).json(order);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
});


app.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email']
        },
        {
          model: Item,
          through: {
            attributes: ['quantity', 'price']
          }
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order Not Found' });
    }
    console.log(order,"order");
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/orders", authentication, async (req, res) => {
  const orders = await Order.findAll({
    where: { user_id: req.user.id },
    include: [
      {
        model: Item,
        through: { attributes: ["quantity"] } // include quantity from OrderItem
      }
    ],
    order: [["createdAt", "DESC"]]
  });

  res.json(orders);
});

app.get("/ordersadmin", authentication, async (req, res) => {
  const orders = await Order.findAll({
    include: [
      {
        model: Item,
        through: { attributes: ["quantity"] } // include quantity from OrderItem
      }
    ],
    order: [["createdAt", "DESC"]]
  });

  res.json(orders);
});

app.patch("/orders/:id/cancel", authentication, async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status !== "PENDING") {
    return res.status(400).json({ message: "Only pending orders can be cancelled" });
  }

  await order.update({ status: "CANCELLED" });
  res.json({ message: "Order updated to CANCELLED" });
});

app.post('/orders', async(req,res)=>{
  try {
    const {user_id , totalAmount , status , paymentMethod , shippingAddress , phoneNumber} = req.body;

    const orders = await Order.create({user_id , totalAmount , status , paymentMethod , shippingAddress, phoneNumber})
    res.status(201).json(`Created New Order for user ${user_id}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put('/orders/:id', async(req, res)=>{
  try {
    const id = req.params.id
    const {user_id , totalAmount , status , paymentMethod , shippingAddress , phoneNumber} = req.body
    const orders = await Order.update(
      {user_id , totalAmount , status , paymentMethod , shippingAddress , phoneNumber},
      {where :{id:id}}
    )
    if(!orders){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Order has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Order Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.delete('/orders/:id' , async(req,res)=>{
  try {
    const {id} = req.params
    const orders = await Order.findByPk(id)

    if(!orders){
      return {message : 'NotFound'}
    }
    await Order.destroy({where : {id}})
    res.status(200).json({message : "Order Deleted"})
  } catch (error) {
    console.log(error);
  }
});

//midtrans
app.use(authentication);
app.post("/midtransToken", async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const items = req.body.items;

    let totalPrice = 0;

    if (!items || items.length === 0) {
      throw new Error("Items cannot be empty");
    }


    for (const i of items) {
      const item = await Item.findByPk(i.item_id);
      if (!item) throw new Error("Item not found");
      totalPrice += item.price * i.quantity;
    }
    console.log(totalPrice,"totalPrice");
    
    if (totalPrice <= 0) {
      throw new Error("Invalid total price");
    }

    const order = await Order.create({
      user_id: user.id,
      status: "PENDING",
      totalAmount: totalPrice,
    });

    for (const i of items) {
      const item = await Item.findByPk(i.item_id);

      await OrderItem.create({
        order_id: order.id,
        item_id: item.id,
        quantity: i.quantity,
        price: item.price,
      });
    }

    const orderId = `ORDER-${order.id}`;

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: `ORDER-${order.id}`,
        gross_amount: totalPrice
      },
      customer_details: {
        email: user.email,
      },
    };

    const midtrans = await snap.createTransaction(parameter);

    res.status(201).json({
      token: midtrans.token,
      orderId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/midtrans/webhook", async (req, res) => {
  try {
    const { order_id, transaction_status } = req.body;

    const orderId = order_id.replace("ORDER-", "");
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      transaction_status === "settlement" ||
      transaction_status === "capture"
    ) {
      await order.update({ status: "PAID" });
    } else if (transaction_status === "pending") {
      await order.update({ status: "PENDING" });
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "expire"
    ) {
      await order.update({ status: "CANCELLED" });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    res.sendStatus(500);
  }
});

app.patch("/orders/:id/paid", authentication, async (req, res) => {
  let orderId = req.params.id;

  // If format is ORDER-13 → extract 13
  if (orderId.includes("-")) {
    orderId = orderId.split("-")[1];
  }

  const order = await Order.findByPk(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  await order.update({ status: "PAID" });

  res.json({ message: "Order updated to PAID" });
});


