const express = require('express'); //เราจะสร้างเป็น app ใหม่ที่ inherit(เลือกค.canมาบางอย่างที่เหมาะกับ backend ข.เรา)
const cors = require('cors');
const app = express(); //express มีค.canในก.กำหนดค.canข.database
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const port = 3000

app.use(cors()) //app ที่ประกาศเอาไว้คือ express
app.use(express.json()); //convert ทุกอย่างจาก DB เป็นภาษา json
app.use(bodyParser.json());

app.get('/', (req, res) => { //get = read
    res.send('Hello World! Let\'s Working with MySQL Databases')
}) //ถ้าuserร้องขอport3000 เราจะsendข้อมูลกลับไป

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

////////////////////// MongoDB Connect //////////////////////
const { MongoClient } = require("mongodb");
const uri = "mongodb://adminSchool:passSchool@127.0.0.1:27017/?authSource=SchoolDB&authMechanism=DEFAULT";

const connectDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log(`MongoDB connected successfully.`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDB();
////////////////////// MongoDB Connect //////////////////////


////////////////////// Read All API //////////////////////
app.get('/register', async (req, res) => { //หลังทับมี path ใหม่ & มีก.กำหนด async เป็น defult
    try { //เป็นการแสดงข้อมูลตามลำดับ
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("SchoolDB");
        const collection = database.collection("studentRecord");
        const students = await collection.find({}).skip(Number(skip)).limit(Number(limit)).sort({ _id: 1 }).toArray();
        res.status(200).json(students);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error');
    }
});
////////////////////// Read All API //////////////////////


//////////////////////////////////// Login ////////////////////////////////////
app.post('/login/', async (req, res) => {
    const params = req.body;
    const username = params.user;
    const password = params.pass;

    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("SchoolDB");
        const collection = database.collection("users");
        const user = await collection.findOne({ username: username, password: password });

        if (!user) {
            return res.status(401).send({ message: "Invalid username or password" });
        }

        res.status(200).send({ message: "Login successful", username: user.username });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error');
    }
});
//////////////////////////////////// Login ////////////////////////////////////

//////////////////////////////////// Search API ////////////////////////////////////
// readแบบsearch คำที่อยู่หลัง :(colon) = มาจากuser
app.get('/register/:searchText', async (req, res) => {
    const { searchText } = req.params;

    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("SchoolDB");
        const collection = database.collection("studentRecord");

        const results = await collection.find({ "First_Name": { $regex: searchText, $options: 'i' } }).toArray();

        if (results.length === 0) {
            return res.status(404).send({ message: "No records found" });
        }

        res.status(200).send(results);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error');
    }
});
//////////////////////////////////// Search API ////////////////////////////////////


//////////////////////////////////// Create ////////////////////////////////////
//post = สร้างข้อมูลใหม่
app.post('/register/:create', async (req, res) => {
    const student = req.body; //request จาก body ในหน้าเว็บ by user (ต้องก.insertข้อมูลเข้า)
    console.log("student: ", student)

    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("SchoolDB");
        const collection = database.collection("studentRecord");

        // Insert student data into MongoDB collection
        const result = await collection.insertOne({
            ID: student.ID,
            First_Name: student.First_Name,
            Last_Name: student.Last_Name,
            Midterm_exam: student.Midterm_exam,
            Final_exam: student.Final_exam,
            CW_1: student.CW_1,
            CW_2: student.CW_2,
            Total_Points: student.Total_Points,
            Student_Average: student.Student_Average,
            Grade: student.Grade
        });

        console.log(`Student ${student.First_Name} ${student.Last_Name} is created.`);
        console.log('Inserted document ID:', result.insertedId); //ดู ID ของเอกสารที่เพิ่มเข้าไปใน MongoDB
        res.status(200).send('Student created successfully.');
    } catch (err) {
        console.error('Error creating student:', err);
        res.status(500).send('Error creating student.');
    }
});
//////////////////////////////////// Create ////////////////////////////////////


//////////////////////////////////// Update API ////////////////////////////////////
app.put('/register/update/:id', async (req, res) => {
    const student = req.body;
    const studentID = student._id;

    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("SchoolDB");
        const collection = database.collection("studentRecord");

        const result = await collection.updateOne(
            { "_id": new ObjectId(studentID) }, // แปลง studentID เป็น ObjectId ที่ถูกต้อง
            {
                $set: {
                    "_id": new ObjectId(studentID),
                    "First_Name": student.First_Name,
                    "Last_Name": student.Last_Name,
                    "Midterm_exam": student.Midterm_exam,
                    "Final_exam": student.Final_exam,
                    "CW_1": student.CW_1,
                    "CW_2": student.CW_2,
                    "Total_Points": student.Total_Points,
                    "Student_Average": student.Student_Average,
                    "Grade": student.Grade
                }
            }
        );

        if (result.modifiedCount === 0) {
            console.log("No student found with ID:", studentID);
            return res.status(404).send('No student found');
        }

        console.log(studentID, " is updated.");
        res.status(200).send('Student updated successfully');
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Error updating student.');
    }
});

app.get('/editstudent/:id', async (req, res) => {
    const studentID = req.params.id;

    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("SchoolDB");
        const collection = database.collection("studentRecord");

        const student = await collection.findOne({ "_id": new ObjectId(studentID) }); // แปลง studentID เป็น ObjectId ที่ถูกต้อง

        if (!student) {
            console.log("No student found with ID:", studentID);
            return res.status(404).send('No student found');
        }

        console.log("Result: " + JSON.stringify(student));
        res.status(200).send(student);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error');
    }
});
//////////////////////////////////// Update API ////////////////////////////////////


//////////////////////////////////// DELETE ////////////////////////////////////
app.delete('/register/delete/:id', async (req, res) => {
    const studentID = req.params.id;

    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("SchoolDB");
        const collection = database.collection("studentRecord");

        const result = await collection.deleteOne({ "_id": new ObjectId(studentID) });

        if (result.deletedCount === 0) {
            console.log("No student found with ID:", studentID);
            return res.status(404).send('No student found');
        }

        console.log("Student ID ", studentID, " is deleted.");
        res.status(200).send('Student deleted successfully');
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).send('Error deleting student.');
    }
});
//////////////////////////////////// DELETE ////////////////////////////////////
