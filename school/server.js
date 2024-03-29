const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb')
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

////////////////////// MongoDB Connect //////////////////////
const { MongoClient } = require('mongodb');
const uri = "mongodb://adminSchool:passSchool@127.0.0.1:27017/?authSource=SchoolDB&authMechanism=DEFAULT";

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
////////////////////// MongoDB Connect //////////////////////


////////////////////// Read All API //////////////////////
app.get('/register', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const object = await client.db('SchoolDB').collection('studentRecord').find({}).sort({ "_id": 1 }).toArray();
    // const users = await client.db('SchoolDB').collection('studentRecord').find({}).sort({ "_id": 1 }).limit(100).toArray();
    await client.close();
    res.status(200).send(users);
})
////////////////////// Read All API //////////////////////


////////////////////// Insert //////////////////////
app.post('/register/:create', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('SchoolDB').collection('studentRecord').insertOne({
        'id': object['ID'],
        'first_name': object['First Name'],
        'last_name': object['Last Name'],
        'mid_term_exams': object['Mid-term exam'],
        'final_exam': object['Final exam'],
        'coursework_1': object['CW 1'],
        'coursework_2': object['CW 2'],
        'total_points': object['Total Points'],
        'student_average': object['Student Average'],
        'grade': object["grade"]
    });
    await client.close();
    res.status(200).send({
        'status': 'ok',
        'message': 'Object is created',
        'object': object
    });
})
////////////////////// Insert //////////////////////


////////////////////// Update //////////////////////
app.put('/register/update/:id', async (req, res) => {
    const id = req.params.id;
    const object = req.body;

    try {
        await client.connect();
        const database = client.db('SchoolDB');
        const collection = database.collection('register');

        const result = await collection.updateOne({ _id: id }, { $set: object });

        if (result.modifiedCount === 1) {
            console.log(id, " is updated.");
            res.status(200).send('Student updated successfully');
        } else {
            console.log("Student not found");
            res.status(404).send('Student not found');
        }
    } catch (err) {
        console.log('Database connection error:', err);
        res.status(500).send('Database error');
    } finally {
        await client.close();
    }
});

app.get('/editstudent/:id', async (req, res) => {
    const id = req.params.id;
    // const object = req.body;
    // const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    try {
        // ค้นหาข้อมูลนักเรียนจาก MongoDB
        const student = await db.collection('register').findOne({ id: id });
        
        if (!student) {
            console.log('Student not found');
            res.status(404).send('Student not found');
            return;
        }

        console.log('Student found:', student);
        res.status(200).send(student);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});
////////////////////// Update //////////////////////


////////////////////// Delete //////////////////////
app.delete('/register/delete/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    // const studentID = studentRecord.ID;
    try {
        await client.connect();
        const studentRecord = await client.db('SchoolDB').collection('studentRecord').findOne({ '_id': ObjectId(id) });
        // await client.db('SchoolDB').collection('studentRecord').deleteOne({ 'studentID': ObjectId(id) });
        if (!studentRecord) {
            return res.status(404).send({
                "status": "error",
                "message": 'Object with ID = ' + id + ' not found'
            });
        }
        await client.db('SchoolDB').collection('studentRecord').deleteOne({ '_id': ObjectId(id) });
        res.status(200).send({
            "status": "ok",
            "message": 'Object with ID = ' + id + ' is deleted'
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error');
    } finally {
        await client.close();
    }
});
////////////////////// Delete //////////////////////


////////////////////// Search //////////////////////
app.get('/register/:searchText', async (req, res) => {
    const searchText = req.params.searchText;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const user = await client.db('SchoolDB').collection('studentRecord').findOne({ 'First Name': searchText });
        if (user) {
            res.status(200).send({
                "status": "ok",
                "message": "Record with First Name = " + searchText + " is retrieved",
                "data": user
            });
        } else {
            res.status(404).send({
                "status": "error",
                "message": "Record with First Name = " + searchText + " not found"
            });
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send({
            "status": "error",
            "message": "Internal server error"
        });
    } finally {
        await client.close();
    }
})
////////////////////// Search //////////////////////


////////////////////// Find //////////////////////
app.get('/register/First_Name_text/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = parseInt(params.searchText);
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('SchoolDB').collection('studentRecord').find({ register_id: { $eq: searchText } }).toArray();
    const objects = await client.db('SchoolDB').collection('studentRecord').find({ $text: { $search: searchText } }).sort({ 'Date received': -1 }).limit(10).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
})
////////////////////// Find //////////////////////


//////////////////////////////////// Login ////////////////////////////////////
app.post('/login/', async (req, res) => {
    const params = req.body;
    const username = params.user;
    const password = params.pass;

    // var loginSQL = "SELECT * FROM users WHERE username='" + username + "' and password='" + password + "';"

    try {
        const client = new MongoClient(uri);
        await client.connect();

        const users = await client.db('SchoolDB').collection('users').findOne({ username: username, password: password });
        if (users) {
            res.status(200).send(users);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
        await client.close();
    } catch (err) {
        console.log('Database connection error!', err);
        res.status(500).send({ message: 'Database connection error' });
    }
});
//////////////////////////////////// Login ////////////////////////////////////
