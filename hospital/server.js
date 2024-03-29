
const mysql = require('mysql');
const config = require('./config');
const express = require('express'); //เราจะสร้างเป็น app ใหม่ที่ inherit(เลือกค.canมาบางอย่างที่เหมาะกับ backend ข.เรา)
const cors = require('cors');
const app = express(); //express มีค.canในก.กำหนดค.canข.database
const bodyParser = require('body-parser');

const port = config.express.port; /*จากที่เคย = 3000 เราจะทำให้มันปลอดภัยกว่าเดิม
โดยกำหนดที่ config.js แทน คนนอกเช่น3rd party จะไม่สามารถเห็นได้*/

const con = mysql.createConnection({ //connect DB ผ่าน protocol 'con'
    host: config.mysql.host,
    port: config.mysql.port,
    database: config.mysql.database, //เราจะไม่มาเขียนตรงๆที่นี่
    user: config.mysql.user,
    password: config.mysql.password //แต่จะเขียนใน config.js
});

app.use(cors()) //app ที่ประกาศเอาไว้คือ express
app.use(express.json()); //convert ทุกอย่างจาก DB เป็นภาษา json
app.use(bodyParser.json());

app.get('/', (req, res) => { //get = read
    res.send('Hello World! Let\'s Working with MySQL Databases')
}) //ถ้าuserร้องขอport3000 เราจะsendข้อมูลกลับไป

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const connectDB = async () => {
    try {
        await con.connect(function (err) {
            if (err) {
                console.log('database connection error!, ', err);
            } else {
                console.log('database connection successfully!');
            }
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDB(); //เชื่อมต่อ DB

//read ดิบๆจาก Db
app.get('/patients', async (req, res) => { //หลังทับมี path ใหม่ & มีก.กำหนด async เป็น defult
    var readSQL = "select * from hospital.patients"; //requestต้องไปดึงข้อมูลจาก database
    try { //เป็นการแสดงข้อมูลตามลำดับ
        await con.query(readSQL, function (err, results) { //ต้อง await ก่อน ไม่งั้นถ้ายังเชื่อมต่อDBไม่ได้จะโชว์อะไร
            if (err) {
                console.log('database connection error!, ', err);
            } else { //ถ้าไม่ err ก็ส่งค่ากลับไปให้ user ผ่าน web
                // console.log("Result: " + JSON.stringify(results));
                res.status(200).send(results); //200 = OK
            }
        });
    } catch (err) { //try catch คือ err ต้องวนกลับไปที่ web ใหม่ "ต้องลองใหม่นะ" userจะไม่รู้สึกerr ทั้งที่มันerr
        console.log(err);
        process.exit(1);
    }
});

//////////////////////////////////// Login ////////////////////////////////////
app.post('/login/', async (req, res) => {
    const params = req.body;
    const username = params.user;
    const password = params.pass;

    var loginSQL = "SELECT * FROM users WHERE username='" + username + "' and password='" + password + "';"

    try {
        await con.query(loginSQL, function (err, results) {
            if (err) {
                console.log('database connection error!, ', err);
            } else {
                res.status(200).send(results);
            }
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
});
//////////////////////////////////// Login ////////////////////////////////////

//////////////////////////////////// Search API ////////////////////////////////////
//readแบบsearch คำที่อยู่หลัง :(colon) = มาจากuser
app.get('/patients/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    var readSQL = "SELECT * FROM hospital.patients WHERE Patient_Rights_1 LIKE '%" + searchText + "%';";
    // var readSQL = "SELECT * FROM hospital.patients WHERE Patient_Rights_1 LIKE '%" + searchText + "%' OR Patient_Rights_2 LIKE '%" + searchText + "%' OR Patient_Rights_3 LIKE '%" + searchText + "%';";
    try {
        await con.query(readSQL, function (err, results) {
            if (err) {
                console.log('database connection error!, ', err);
                res.status(500).send('Database error');
            } else {
                console.log("Result: " + JSON.stringify(results));
                res.status(200).send(results);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
        process.exit(1);
    }
});
//////////////////////////////////// Search API ////////////////////////////////////

//post = สร้างข้อมูลใหม่
app.post('/patients/:create', async (req, res) => {
    const patient = req.body; //request จาก body ในหน้าเว็บ by user (ต้องก.insertข้อมูลเข้า)
    console.log("patient: ", patient)
    var insertSQL = "INSERT INTO hospital.patients (HN, Name, Patient_Rights_1, Patient_Rights_2, Patient_Rights_3, Chronic_Disease, Address, Phone) VALUES('" + patient.HN + "', '" + patient.Name + "', '" + patient.Right1 + "', '" + patient.Right2 + "', '" + patient.Right3 + "', '" + patient.Chronic + "', '" + patient.Address + "', '" + patient.Phone + "');";
    //ชื่อที่เราตั้งในนี้กับส่วนที่userส่งมา(body) ตั้งไม่เหมือนกัน ดูดีๆ
    try {
        await con.query(insertSQL, function (err, results) {
            if (err) {
                console.log('database connection error!, ', err);
            } else {
                console.log(patient.HN, patient.name, " is created.");
                res.status(200).send();
            }
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
});

//////////////////////////////////// Update API ////////////////////////////////////
app.put('/patients/update/:id', async (req, res) => {
    const patient = req.body;
    const patientID = req.params.id;
    var updateSQL = "UPDATE patients SET HN = '" + patient.HN + "', Name = '" + patient.Name + "', Patient_Rights_1 = '" + patient.Right1 + "', Patient_Rights_2 = '" + patient.Right2 + "', Patient_Rights_3 = '" + patient.Right3 + "', Chronic_Disease= '" + patient.Chronic + "', Address = '" + patient.Address + "', Phone = '" + patient.Phone + "' WHERE (id = '" + patientID + "'); "; try {
        await con.query(updateSQL, function (err) {
            if (err) {
                console.log('database connection error!, ', err);
                res.status(500).send('Database error');
            } else {
                console.log(patientID, " is updated.");
                res.status(200).send('Patient updated successfully');
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();
        process.exit(1);
    }
})

app.get('/editpatient/:id', async (req, res) => {
    const id = req.params.id;
    const searchSQL = "SELECT * FROM patients WHERE id = '" + id + "'";

    try {
        con.query(searchSQL, function (err, results) {
            if (err) {
                console.log('Database connection error:', err);
                res.status(500).send('Database error');
            } else {
                console.log("Result: " + JSON.stringify(results));
                res.status(200).send(results);
            }
        });
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('Server error');
    }
});
//////////////////////////////////// Update API ////////////////////////////////////

//////////////////////////////////// DELETE ////////////////////////////////////
app.delete('/patients/delete/:id', async (req, res) => {
    const patient = req.body;
    const patientID = patient.patientID;
    var deleteSQL = "DELETE FROM patients WHERE ID = '" + patientID + "'";
    try {
        await con.query(deleteSQL, function (err, results) { // await จนกว่าจะดึงข้อมูลได้สำเร็จ
            if (err) {
                console.log('database connection error!, ', err);
            } else {
                console.log("Patient ID ", patientID, " is deleted."); // ดึงข้อมูลมาจาก DB แล้วแปลงมาเป็น JSON ให้อ่านออก
                res.status(200).send(results);
            }
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})
//////////////////////////////////// DELETE ////////////////////////////////////

//////////////////////////////////// RIGHTS ////////////////////////////////////
// API endpoint เพื่อดึงข้อมูลสิทธิการรักษาทั้งหมด
app.get('/rights', async (req, res) => {
    var readSQL = "SELECT Patient_Rights FROM rights;";
    try {
        await con.query(readSQL, function (err, results) {
            if (err) {
                console.log('database connection error!, ', err);
                res.status(500).send();
            } else {
                res.status(200).send(results);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})
//////////////////////////////////// RIGHTS ////////////////////////////////////
