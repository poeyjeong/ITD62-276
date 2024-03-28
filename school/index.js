var lastestID;
// var rightList;
// var options;

// google.charts.load("current", {
//   packages: ["corechart", "bar"],
// });
// google.charts.setOnLoadCallback(loadTable);

// function loadTable() {
//   $.ajax({
//     url : "http://localhost:3000", 
//     type : 'GET', 
//     success : function(objects){
//       var trHTML = '';
//       var num = 1;
//       for (let object of objects) {
//         trHTML += "<tr>";
//         trHTML += "<td>" + num + "</td>";
//         trHTML += "<td>" + object["register_id"] + "</td>";
//         trHTML += "<td>" + object["quantity"] + "</td>";
//         trHTML += "<td>" + object["pizza_category"] + "</td>";
//         trHTML += "<td>" + object["pizza_name"] + "</td>";
//         trHTML += "<td>" + object["pizza_ingredients"] + "</td>";
//         trHTML += "<td>" + object["pizza_size"] + "</td>";
//         trHTML += "<td>" + object["unit_price"] + "</td>";
//         trHTML += "<td>" + object["total_price"] + "</td>";
//         trHTML += "<td>" + object["register_datetime"] + "</td>";
//         trHTML += "<td>";
//         trHTML +='<a type="button" class="btn btn-outline-secondary" onclick="showregisterUpdateBox(\'' +object["_id"] +'\')"><i class="fas fa-edit"></i></a>';
//         trHTML +='<a type="button" class="btn btn-outline-danger" onclick="showregisterDeleteBox(\'' +object["_id"] +'\')"><i class="fas fa-trash"></i></a>';
//         trHTML += "<tr>";

//         num++;
//       }

//       document.getElementById("mytable").innerHTML = trHTML;
//       loadGraph();
//     }
//   });
// }


//////////////////////////////////// Load Table ///////////////////////////////////
function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/register");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      var num = 1;
      const objects = JSON.parse(this.responseText);
      // var objects = JSON.parse(this.responseText);
      // console.log(objects);

      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object['ID'] + "</td>";
        trHTML += "<td>" + object['First Name'] + "</td>";
        trHTML += "<td>" + object['Last Name'] + "</td>";
        trHTML += "<td>" + object['Mid-term exam'] + "</td>";
        trHTML += "<td>" + object['Final exam'] + "</td>";
        trHTML += "<td>" + object['CW 1'] + "</td>";
        trHTML += "<td>" + object['CW 2'] + "</td>";
        trHTML += "<td>" + object['Total Points'] + "</td>";
        trHTML += "<td>" + object['Student Average'] + "</td>";
        trHTML += "<td>" + object['Grade'] + "</td>";
        trHTML += '<td><i class ="btn text-primary bi bi-pencil-square" onclick = "showEditbox(' + object["_id"] + ')"></i>';
        trHTML += '<i class = "btn text-danger bi bi-trash3-fill" onclick = "studentDelete(' + object["_id"] + ')"></i></td>';
        trHTML += "</tr>";

        num++;
        lastestID = object["ID"];
      }
      document.getElementById("mytable").innerHTML = trHTML;
    } else {
      var trHTML = "";
      trHTML += "<tr><td> 404 Server not found </td></tr>";
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}
// loadGraph();
loadTable();
//////////////////////////////////// Load Table ///////////////////////////////////


//////////////////////////////////// SEARCH ///////////////////////////////////
function studentSearch() {
  const searchText = document.getElementById("KeywordSearch").value;
  console.log(searchText)
  if (searchText == "") {
    loadTable();
  } else {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/register/" + searchText);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        const response = JSON.parse(this.responseText); // Parse the response
        if (response.status === "ok") {
          const object = response.data;
          var trHTML = "";
          trHTML += "<tr>";
          trHTML += "<td>" + object['ID'] + "</td>";
          trHTML += "<td>" + object['First Name'] + "</td>";
          trHTML += "<td>" + object['Last Name'] + "</td>";
          trHTML += "<td>" + object['Mid-term exam'] + "</td>";
          trHTML += "<td>" + object['Final exam'] + "</td>";
          trHTML += "<td>" + object['CW 1'] + "</td>";
          trHTML += "<td>" + object['CW 2'] + "</td>";
          trHTML += "<td>" + object['Total Points'] + "</td>";
          trHTML += "<td>" + object['Student Average'] + "</td>";
          trHTML += "<td>" + object['Grade'] + "</td>";
          trHTML += '<td><i class ="btn text-primary bi bi-pencil-square" onclick = "showEditbox(\'' + object["ID"] + '\')"></i>';
          trHTML += '<i class = "btn text-danger bi bi-trash3-fill" onclick = "studentDelete(\'' + object["ID"] + '\')"></i></td>';
          trHTML += "</tr>";

          document.getElementById("mytable").innerHTML = trHTML;
        } else {
          var trHTML = "";
          trHTML += "<tr><td> Data not found </td></tr>";

          document.getElementById("mytable").innerHTML = trHTML;
        }
      }
    };
    xhttp.send();
  }
}
//////////////////////////////////// SEARCH ///////////////////////////////////

// function loadQueryTable() {
//   document.getElementById("mytable").innerHTML = "<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>";
//   const searchText = document.getElementById('searchTextBox').value;

//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "http://localhost:3000/register/search/" + searchText);

//   xhttp.send();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var trHTML = '';
//       var num = 1;
//       const objects = JSON.parse(this.responseText).Complaint;
//       for (let object of objects) {
//         trHTML += "<tr>";
//         trHTML += "<td>" + num + "</td>";
//         trHTML += "<td>" + object["register_id"] + "</td>";
//         trHTML += "<td>" + object["quantity"] + "</td>";
//         trHTML += "<td>" + object["pizza_category"] + "</td>";
//         trHTML += "<td>" + object["pizza_name"] + "</td>";
//         trHTML += "<td>" + object["pizza_ingredients"] + "</td>";
//         trHTML += "<td>" + object["pizza_size"] + "</td>";
//         trHTML += "<td>" + object["unit_price"] + "</td>";
//         trHTML += "<td>" + object["total_price"] + "</td>";
//         trHTML += "<td>" + object["register_datetime"] + "</td>";
//         trHTML += "<td>";
//         trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showregisterUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
//         trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showregisterDeleteBox(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
//         trHTML += "<tr>";
//         num++;

//       }
//       console.log(trHTML);
//       document.getElementById("mytable").innerHTML = trHTML;

//     }
//   };
// }


// function loadGraph() {
//   var mlCount = 0;
//   var fullsCount = 0;
//   var sysCount = 0;
//   var netwCount = 0;

//   var mrCount = 0;
//   var missCount = 0;
//   var drCount = 0;
//   var pfCount = 0;

//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "http://localhost:3000/register");
//   xhttp.send();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       const objects = JSON.parse(this.responseText);
//       for (let object of objects) {
//         switch (object["Project"]) {
//           case "Machine Learning":
//             mlCount = mlCount + 1;
//             break;
//           case "Fullstack":
//             fullsCount = fullsCount + 1;
//             break;

//           case "System Design":
//             sysCount = sysCount + 1;
//             break;

//           case "Networks":
//             netwCount = netwCount + 1;
//             break;
//         }

//         switch (object["Title"]) {
//           case "นาย":
//             mrCount = mrCount + 1;
//             break;
//           case "นางสาว":
//             missCount = missCount + 1;
//             break;

//           case "ดร.":
//             drCount = drCount + 1;
//             break;

//           case "ศ.ดร":
//             pfCount = pfCount + 1;
//             break;
//         }
//       }

//       var TimelyResponseData = google.visualization.arrayToDataTable([
//         ["Project", "Field"],
//         ["Machine Learning", mlCount],
//         ["Fullstack", fullsCount],
//         ["System Design", sysCount],
//         ["Networks", netwCount],
//       ]);

//       var optionsTimelyResponse = { Titil: "Overall Project Fields" };
//       var chartTimelyResponse = new google.visualization.PieChart(document.getElementById("piechartTimelyResponse"));
//       chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

//       var dataSubmitted = google.visualization.arrayToDataTable([
//         [
//           "Student Titile",
//           "Number",
//           {
//             role: "style",
//           },
//           {
//             role: "annotation",
//           },
//         ],
//         ["นาย", mrCount, "gold", "นาย"],
//         ["นางสาว", missCount, "color: #F65A83", "นางสาว"],
//         ["ดร.", drCount, "color: #F9F5EB", "ดร."],
//         ["ศ.ดร", pfCount, "color: #607EAA", "ศ.ดร"]
//       ]);

//       var optionSubmitted = {
//         title: "Staff' Title",
//         legend: { position: "none" },
//       };

//       var chartSubmitted = new google.visualization.BarChart(document.getElementById("barchartSubmitted"));
//       chartSubmitted.draw(dataSubmitted, optionSubmitted);
//     }
//   };
// }


/////////////////////////////////// INSERT NEW INFO //////////////////////////////////
function showStudentCreateBox() {
  // const options = getRightOptionsHTML();
  let latestID = "WU";
  const num = parseInt(lastestID.replaceAll("WU", "")) + 1;
  latestID += num;

  Swal.fire({
    title: 'เพิ่มข้อมูลนักเรียน',
    html:
      '<div class="mb-3"><label for="id" class="form-label float-start">รหัสนักเรียน</label>' +
      '<input class="form-control" id="id" placeholder="รหัสนักเรียน" value="' + "WU" + (parseInt(lastestID.replaceAll("WU", "")) + 1) + '" disabled></div>' +

      '<div class="mb-3"><label for="first_name" class="form-label float-start">ชื่อจริง</label>' +
      '<input class="form-control" id="first_name" placeholder="ชื่อจริง (ไม่ต้องใส่คำนำหน้า)"></div>' +

      '<div class="mb-3"><label for="last_name" class="form-label float-start">นามสกุล</label>' +
      '<input class="form-control" id="last_name" placeholder="นามสกุล"></div>' +

      '<div class="mb-3"><label for="mid_term_exams" class="form-label float-start">กลางภาค</label>' +
      '<input class="form-control" id="mid_term_exams" placeholder="คะแนนกลางภาค (ตอบเป็นเปอร์เซ็นต์)"></div>' +

      '<div class="mb-3"><label for="final_exam" class="form-label float-start">ปลายภาค</label>' +
      '<input class="form-control" id="final_exam" placeholder="คะแนนปลายภาค (ตอบเป็นเปอร์เซ็นต์)"></div>' +

      '<div class="mb-3"><label for="coursework_1" class="form-label float-start">งานที่ 1</label>' +
      '<input class="form-control" id="coursework_1" placeholder="คะแนนงานที่ 1 (ตอบเป็นเปอร์เซ็นต์)"></div>' +

      '<div class="mb-3"><label for="coursework_2" class="form-label float-start">งานที่ 2</label>' +
      '<input class="form-control" id="coursework_2" placeholder="คะแนนงานที่ 2 (ตอบเป็นเปอร์เซ็นต์)"></div>' +

      '<div class="mb-3"><label for="total_points" class="form-label float-start">คะแนนรวม</label>' +
      '<input class="form-control" id="total_points" placeholder="คะแนนรวมของนักเรียน"></div>' +

      '<div class="mb-3"><label for="student_average" class="form-label float-start">คะแนนเฉลี่ย</label>' +
      '<input class="form-control" id="student_average" placeholder="คะแนนเฉลี่ยของนักเรียน"></div>' +

      '<div class="mb-3"><label for="grade" class="form-label float-start">เกรด</label>' +
      '<input class="form-control" id="grade" placeholder="เกรดของนักเรียน"></div>',

    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: 'ยกเลิก',
    confirmButtonText: 'บันทึก',
    preConfirm: () => {
      createNewStudent();
    }
  });
}

function createNewStudent() {
  const id = document.getElementById('id').value;
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const mid_term_exams = document.getElementById('mid_term_exams').value;
  const final_exam = document.getElementById('final_exam').value;
  const coursework_1 = document.getElementById('coursework_1').value;
  const coursework_2 = document.getElementById('coursework_2').value;
  const total_points = document.getElementById('total_points').value;
  const student_average = document.getElementById('student_average').value;
  const grade = document.getElementById('grade').value;

  console.log(JSON.stringify({
    'id': id,
    'first_name': first_name,
    'last_name': last_name,
    'mid_term_exams': mid_term_exams,
    'final_exam': final_exam,
    'coursework_1': coursework_1,
    'coursework_2': coursework_2,
    'total_points': total_points,
    'student_average': student_average,
    'grade': grade,
  }));

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/register/create");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    'id': id,
    'first_name': first_name,
    'last_name': last_name,
    'mid_term_exams': mid_term_exams,
    'final_exam': final_exam,
    'coursework_1': coursework_1,
    'coursework_2': coursework_2,
    'total_points': total_points,
    'student_average': student_average,
    'grade': grade,
  }));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // const objects = JSON.parse(this.responseText);
      Swal.fire('Good job!', 'Create Student Information Successfully!', 'success');
      loadTable();
    }
    else {
      Swal.fire('Failed!', 'เพิ่มข้อมูลผู้ป่วยไม่สำเร็จ', 'error');
      loadTable();
    }
  };
}
/////////////////////////////////// INSERT NEW INFO //////////////////////////////////

////////////////////////////////// DELETE /////////////////////////////////
function studentDelete(id) {
  console.log("Delete: ", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/register/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "_id": id }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // const objects = JSON.parse(this.responseText);
      Swal.fire('Good job!', 'ลบข้อมูลนักเรียนสำเร็จ!', 'success');
      loadTable();
    } else {
      Swal.fire("Failed!", "ลบข้อมูลนักเรียนไม่สำเร็จ", "error");
      loadTable();
    }
  };
}
////////////////////////////////// DELETE /////////////////////////////////


////////////////////////////////// EDIT /////////////////////////////////
function showEditbox(id) {
  // console.log("edit", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/editstudent/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText);
      console.log("showEditbox", object);

      Swal.fire({
        title: 'แก้ไขข้อมูลนักเรียน',
        html:

          // '<input id="id" class="swal2-input" placeholder="OID" type="hidden" value="' + object['_id'] + '"><br>' +

          '<div class="mb-3"><label for="first_name" class="form-label float-start">ชื่อจริง</label>' +
          '<input class="form-control" id="first_name" placeholder="ชื่อจริง (ไม่ต้องใส่คำนำหน้า)"></div>' +

          '<div class="mb-3"><label for="last_name" class="form-label float-start">นามสกุล</label>' +
          '<input class="form-control" id="last_name" placeholder="นามสกุล"></div>' +

          '<div class="mb-3"><label for="mid_term_exams" class="form-label float-start">กลางภาค</label>' +
          '<input class="form-control" id="mid_term_exams" placeholder="คะแนนกลางภาค (ตอบเป็นเปอร์เซ็นต์)"></div>' +

          '<div class="mb-3"><label for="final_exam" class="form-label float-start">ปลายภาค</label>' +
          '<input class="form-control" id="final_exam" placeholder="คะแนนปลายภาค (ตอบเป็นเปอร์เซ็นต์)"></div>' +

          '<div class="mb-3"><label for="coursework_1" class="form-label float-start">งานที่ 1</label>' +
          '<input class="form-control" id="coursework_1" placeholder="คะแนนงานที่ 1 (ตอบเป็นเปอร์เซ็นต์)"></div>' +

          '<div class="mb-3"><label for="coursework_2" class="form-label float-start">งานที่ 2</label>' +
          '<input class="form-control" id="coursework_2" placeholder="คะแนนงานที่ 2 (ตอบเป็นเปอร์เซ็นต์)"></div>' +

          '<div class="mb-3"><label for="total_points" class="form-label float-start">คะแนนรวม</label>' +
          '<input class="form-control" id="total_points" placeholder="คะแนนรวมของนักเรียน"></div>' +

          '<div class="mb-3"><label for="student_average" class="form-label float-start">คะแนนเฉลี่ย</label>' +
          '<input class="form-control" id="student_average" placeholder="คะแนนเฉลี่ยของนักเรียน"></div>' +

          '<div class="mb-3"><label for="grade" class="form-label float-start">เกรด</label>' +
          '<input class="form-control" id="grade" placeholder="เกรดของนักเรียน"></div>',

        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'บันทึก',
        preConfirm: () => {
          const first_name = document.getElementById('first_name').value;
          const last_name = document.getElementById('last_name').value;
          const mid_term_exams = document.getElementById('mid_term_exams').value;
          const final_exam = document.getElementById('final_exam').value;
          const coursework_1 = document.getElementById('coursework_1').value;
          const coursework_2 = document.getElementById('coursework_2').value;
          const total_points = document.getElementById('total_points').value;
          const student_average = document.getElementById('student_average').value;
          const grade = document.getElementById('grade').value;

          const xhttpUpdate = new XMLHttpRequest();
          xhttpUpdate.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              Swal.fire("Success!", "แก้ไขข้อมูลผู้ป่วยสำเร็จ", "success");
              loadTable();
            } else {
              Swal.fire("Failed!", "แก้ไขข้อมูลผู้ป่วยไม่สำเร็จ", "error");
              loadTable();
            }

          };
          xhttpUpdate.open("PUT", `http://localhost:3000/register/update/` + id);
          xhttpUpdate.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhttpUpdate.send(JSON.stringify({
            '_id': id,
            'id': id,
            'first_name': first_name,
            'last_name': last_name,
            'mid_term_exams': mid_term_exams,
            'final_exam': final_exam,
            'coursework_1': coursework_1,
            'coursework_2': coursework_2,
            'total_points': total_points,
            'student_average': student_average,
            'grade': grade,
            // studentUpdate();
          }));
        }
      });
    }
  };
}
////////////////////////////////// EDIT /////////////////////////////////


/////////////////////////// AUTHENTICATION //////////////////////////////
var auth = { status: false, user: null }

checkAuth();

function checkAuth() {
  if (Boolean(localStorage.getItem("auth")) === true) {
    auth.status = true;
    auth.user = localStorage.getItem("user");

    document.getElementById("searchBar").style = "display: block";
    document.getElementById("user").innerHTML = "ยินดีต้อนรับ " + auth.user;
    document.getElementById("bodyContent").innerHTML =
      "<div class='table-responsive my-2'>" +
      "<table class='table shadow'>" +
      "<thead class='table-secondary'>" +
      "<tr>" +
      "<th scope='col'>#</th>" +
      "<th scope='col'>ID</th>" +
      "<th scope='col'>ชื่อจริง</th>" +
      "<th scope='col'>นามสกุล</th>" +
      "<th scope='col'>คะแนนกลางภาค</th>" +
      "<th scope='col'>คะแนนปลายภาค</th>" +
      "<th scope='col'>คะแนนงานที่ 1</th>" +
      "<th scope='col'>คะแนนงานที่ 2</th>" +
      "<th scope='col'>คะแนนรวม</th>" +
      "<th scope='col'>คะแนนเฉลี่ย</th>" +
      "<th scope='col'>เกรด</th>" +
      "<th scope='col'></th>" +
      "</tr>" +
      "</thead>" +
      "<tbody id='mytable'>" +
      "</tbody>" +
      "</table>"
    "</div>" +
      loadTable();

  } else {
    document.getElementById("searchBar").style = "display: none";;
    document.getElementById("bodyContent").innerHTML =
      "<div class='card align-middle m-3 mx-auto' style='width: 20rem;'>" +
      "<div class='card-header bg-secondary text-light m-3'>" +
      "<span class='d-inline'><i class='bi bi-person-square me-2'></i>" +
      "ลงชื่อเข้าใช้งาน</span>" +
      "</div>" +
      "<div class='card-body'>" +
      "<div class='mb-3'><label for='Username' class='form-label float-start'>Username:</label>" +
      "<input class='form-control' id='Username' placeholder='username'></div>" +
      "<div class='mb-3'><label for='Password' class='form-label float-start'>Password:</label>" +
      "<input class='form-control' id='Password' type='password' placeholder='password'></div>" +
      "<a onClick='Login()' class='btn btn-secondary float-end'>เข้าสู่ระบบ</a>" +
      "</div>" +
      "</div>"
  }
}

function Login() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/login/");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    'user': document.getElementById("Username").value,
    'pass': document.getElementById("Password").value,
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      if (objects) {
        Swal.fire('Good job!', 'ลงชื่อเข้าใช้สำเร็จ', 'success')
        localStorage.setItem("auth", true);
        localStorage.setItem("user", objects['username']);
        checkAuth();
      } else {
        Swal.fire('ลงชื่อเข้าใช้ไม่สำเร็จ', 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง', 'error')
      }
    }
  };
}

function Logout() {
  auth.status = false;
  auth.user = null;
  localStorage.removeItem('auth');
  localStorage.removeItem('user');
  checkAuth();
}
/////////////////////////// AUTHENTICATION //////////////////////////////
