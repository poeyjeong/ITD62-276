const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! Let\'s Working with NoSQL Databases');
});

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});

const { MongoClient } = require('mongodb');
const uri = "mongodb://adminPizzaria:passPizzaria@127.0.0.1:27017/?authSource=PizzariaDB&authMechanism=DEFAULT";

const connectDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDB();

// Read All API for find() operation
app.get('/order', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    // const users = await client.db('PizzariaDB').collection('orderDetails').find({}).toArray();
    const users = await client.db('PizzariaDB').collection('orderDetails').aggregate([{ $sample: { size: 100 } }]).sort({ _id: 1 }).toArray();
    await client.close();
    res.status(200).send(users);
})

// Create API for insertOne() operation
app.post('/order/create', async(req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('PizzariaDB').collection('orderDetails').insertOne({
        'order_details_id': object.order_details_id,
        'order_id': object.order_id,
        'pizza_id': object.pizza_id,
        'quantity': object.quantity,
        'order_date': object.order_date,
        'order_time': object.order_time,
        'unit_price': object.unit_price,
        'total_price': object.total_price,
        'pizza_size': object.pizza_size,
        'pizza_category': object.pizza_category,
        'pizza_ingredients': object.pizza_ingredients,
        'pizza_name': object.pizza_name,
        'order_datetime': object.order_datetime
    });
    await client.close();
    res.status(200).send({
        'status': 'ok',
        'message': 'Object is created',
        'object': object
    });
})

// Update API for updateOne() operation
const { ObjectId } = require('mongodb')
app.put('/order/update', async(req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('PizzariaDB').collection('orderDetails').updateOne({'_id': ObjectId(id)}, {"$set": 
    {
        key: object.VALUE
    }});
    await client.close();
    res.status(200).send({
        'status': 'ok',
        'message': 'Object with ID = ' + id + ' is updated',
        'object': object
    });
})

// Delete API for deleteOne() operation
app.delete('/order/delete', async(req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('PizzariaDB').collection('orderDetails').deleteOne({'_id': ObjectId(id)});
    await client.close();
        res.status(200).send({
        "status": "ok",
        "message": 'Object with ID = ' + id + ' is deleted'
    });
})

// Read by id API for findOne() operation
app.get('/order/:id', async(req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('PizzariaDB').collection('orderDetails').findOne({'_id':ObjectId(id)});
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Complaint with ID = " + id + " is deleted"
    });
})

// Read by id API
// READ BY Textual Condition API for find() operation with search from text
app.get('/order/search/:searchText', async(req, res) => {
    const { params } = req;
    const searchText = parseInt(params.searchText);
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('PizzariaDB').collection('orderDetails').find({ order_id: { $eq: searchText } }).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
})
