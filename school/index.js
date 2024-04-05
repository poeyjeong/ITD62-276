var lastestID;

//////////////////////////////////// Load Table ///////////////////////////////////
function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/register/");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      var num = 1;
      const objects = JSON.parse(this.responseText);

      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object['ID'] + "</td>";
        trHTML += "<td>" + object['First_Name'] + "</td>";
        trHTML += "<td>" + object['Last_Name'] + "</td>";
        trHTML += "<td>" + object['Midterm_exam'] + "</td>";
        trHTML += "<td>" + object['Final_exam'] + "</td>";
        trHTML += "<td>" + object['CW_1'] + "</td>";
        trHTML += "<td>" + object['CW_2'] + "</td>";
        trHTML += "<td>" + object['Total_Points'] + "</td>";
        trHTML += "<td>" + object['Student_Average'] + "</td>";
        trHTML += "<td>" + object['Grade'] + "</td>";
        trHTML += '<td><i class ="btn text-primary bi bi-pencil-square" onclick = "showEditbox(\'' + object["_id"] + '\')"></i>';
        trHTML += '<i class = "btn text-danger bi bi-trash3-fill" onclick = "studentDelete(\'' + object["_id"] + '\')"></i></td>';
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
        var trHTML = "";
        var num = 1;
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + num + "</td>";
          trHTML += "<td>" + object['ID'] + "</td>";
          trHTML += "<td>" + object['First_Name'] + "</td>";
          trHTML += "<td>" + object['Last_Name'] + "</td>";
          trHTML += "<td>" + object['Midterm_exam'] + "</td>";
          trHTML += "<td>" + object['Final_exam'] + "</td>";
          trHTML += "<td>" + object['CW_1'] + "</td>";
          trHTML += "<td>" + object['CW_2'] + "</td>";
          trHTML += "<td>" + object['Total_Points'] + "</td>";
          trHTML += "<td>" + object['Student_Average'] + "</td>";
          trHTML += "<td>" + object['Grade'] + "</td>";
          trHTML += '<td><i class ="btn text-primary bi bi-pencil-square" onclick = "showEditbox(\'' + object["ID"] + '\')"></i>';
          trHTML += '<i class = "btn text-danger bi bi-trash3-fill" onclick = "studentDelete(' + object["ID"] + ')"></i></td>';
          trHTML += "</tr>";

          num++;
          lastestHN = object["ID"];
        }

        document.getElementById("mytable").innerHTML = trHTML;

      } else {
        var trHTML = "";
        trHTML += "<tr><td> Data not found </td></tr>";

        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
    xhttp.send();
  }
}
//////////////////////////////////// SEARCH ///////////////////////////////////


/////////////////////////////////// INSERT NEW //////////////////////////////////
function showStudentCreateBox() {
  let latestID = "WU";
  const num = parseInt(lastestID.replaceAll("WU", "")) + 1;
  latestID += num;

  Swal.fire({
    title: 'เพิ่มข้อมูลนักเรียน',
    html:

      '<div class="mb-3"><label for="ID" class="form-label float-start">รหัสนักเรียน</label>' +
      '<input class="form-control" id="ID" placeholder="รหัสนักเรียน" value="' + "WU" + (parseInt(lastestID.replaceAll("WU", "")) + 1) + '" disabled></div>' +

      '<div class="mb-3"><label for="First_Name" class="form-label float-start">ชื่อจริง</label>' +
      '<input class="form-control" id="First_Name" placeholder="ชื่อจริง (ไม่ต้องใส่คำนำหน้า)"></div>' +

      '<div class="mb-3"><label for="Last_Name" class="form-label float-start">นามสกุล</label>' +
      '<input class="form-control" id="Last_Name" placeholder="นามสกุล"></div>' +

      '<div class="mb-3"><label for="Midterm_exam" class="form-label float-start">กลางภาค</label>' +
      '<input class="form-control" id="Midterm_exam" placeholder="คะแนนกลางภาค (ตอบเป็นเปอร์เซ็นต์)"></div>' +

      '<div class="mb-3"><label for="Final_exam" class="form-label float-start">ปลายภาค</label>' +
      '<input class="form-control" id="Final_exam" placeholder="คะแนนปลายภาค (ตอบเป็นเปอร์เซ็นต์)"></div>' +

      '<div class="mb-3"><label for="CW_1" class="form-label float-start">งานที่ 1</label>' +
      '<input class="form-control" id="CW_1" placeholder="คะแนนงานที่ 1 (ตอบเป็นเปอร์เซ็นต์)"></div>' +

      '<div class="mb-3"><label for="CW_2" class="form-label float-start">งานที่ 2</label>' +
      '<input class="form-control" id="CW_2" placeholder="คะแนนงานที่ 2 (ตอบเป็นเปอร์เซ็นต์)"></div>' +

      '<div class="mb-3"><label for="Total_Points" class="form-label float-start">คะแนนรวม</label>' +
      '<input class="form-control" id="Total_Points" placeholder="คะแนนรวมของนักเรียน"></div>' +

      '<div class="mb-3"><label for="Student_Average" class="form-label float-start">คะแนนเฉลี่ย</label>' +
      '<input class="form-control" id="Student_Average" placeholder="คะแนนเฉลี่ยของนักเรียน"></div>' +

      '<div class="mb-3"><label for="Grade" class="form-label float-start">เกรด</label>' +
      '<input class="form-control" id="Grade" placeholder="เกรดของนักเรียน"></div>',

    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: 'ยกเลิก',
    confirmButtonText: 'บันทึก',
    preConfirm: () => {
      const ID = document.getElementById('ID').value;
      const First_Name = document.getElementById('First_Name').value;
      const Last_Name = document.getElementById('Last_Name').value;
      const Midterm_exam = document.getElementById('Midterm_exam').value;
      const Final_exam = document.getElementById('Final_exam').value;
      const CW_1 = document.getElementById('CW_1').value;
      const CW_2 = document.getElementById('CW_2').value;
      const Total_Points = document.getElementById('Total_Points').value;
      const Student_Average = document.getElementById('Student_Average').value;
      const Grade = document.getElementById('Grade').value;

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

      xhttpUpdate.open("POST", `http://localhost:3000/register/create`);
      xhttpUpdate.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttpUpdate.send(JSON.stringify({
        'ID': ID,
        'First_Name': First_Name,
        'Last_Name': Last_Name,
        'Midterm_exam': Midterm_exam,
        'Final_exam': Final_exam,
        'CW_1': CW_1,
        'CW_2': CW_2,
        'Total_Points': Total_Points,
        'Student_Average': Student_Average,
        'Grade': Grade
      }));
    }
  });
}
/////////////////////////////////// INSERT NEW INFO //////////////////////////////////

////////////////////////////////// DELETE /////////////////////////////////
function studentDelete(id) {
  console.log("Delete: ", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/register/delete/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ studentID: id }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      Swal.fire('Good job!', 'ลบข้อมูลนักเรียนสำเร็จ!', 'success');
      loadTable();
    } else {
      Swal.fire("Failed!", "ลบข้อมูลนักเรียนไม่สำเร็จ", "error");
      loadTable();
    }
  };
  // xhttp.send();
}
////////////////////////////////// DELETE /////////////////////////////////


////////////////////////////////// EDIT /////////////////////////////////
function showEditbox(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/editstudent/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText);
      console.log(object);

      Swal.fire({
        title: 'แก้ไขข้อมูลนักเรียน',
        html:
          '<div class="mb-3"><label for="ID" class="form-label float-start">รหัสนักเรียน</label>' +
          '<input class="form-control" id="ID" value="' + object["ID"] + '" disabled></div>' +

          '<div class="mb-3"><label for="First_Name" class="form-label float-start">ชื่อจริง</label>' +
          '<input class="form-control" id="First_Name" value="' + object["First_Name"] + '"></div>' +

          '<div class="mb-3"><label for="Last_Name" class="form-label float-start">นามสกุล</label>' +
          '<input class="form-control" id="Last_Name" value="' + object["Last_Name"] + '"></div>' +

          '<div class="mb-3"><label for="Midterm_exam" class="form-label float-start">กลางภาค</label>' +
          '<input class="form-control" id="Midterm_exam" value="' + object["Midterm_exam"] + '"></div>' +

          '<div class="mb-3"><label for="Final_exam" class="form-label float-start">ปลายภาค</label>' +
          '<input class="form-control" id="Final_exam" value="' + object["Final_exam"] + '"></div>' +

          '<div class="mb-3"><label for="CW_1" class="form-label float-start">งานที่ 1</label>' +
          '<input class="form-control" id="CW_1" value="' + object["CW_1"] + '"></div>' +

          '<div class="mb-3"><label for="CW_2" class="form-label float-start">งานที่ 2</label>' +
          '<input class="form-control" id="CW_2" value="' + object["CW_2"] + '"></div>' +

          '<div class="mb-3"><label for="Total_Points" class="form-label float-start">คะแนนรวม</label>' +
          '<input class="form-control" id="Total_Points" value="' + object["Total_Points"] + '"></div>' +

          '<div class="mb-3"><label for="Student_Average" class="form-label float-start">คะแนนเฉลี่ย</label>' +
          '<input class="form-control" id="Student_Average" value="' + object["Student_Average"] + '"></div>' +

          '<div class="mb-3"><label for="Grade" class="form-label float-start">เกรด</label>' +
          '<input class="form-control" id="Grade" value="' + object["Grade"] + '"></div>',

        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'บันทึก',
        preConfirm: () => {
          const ID = document.getElementById('ID').value;
          const First_Name = document.getElementById('First_Name').value;
          const Last_Name = document.getElementById('Last_Name').value;
          const Midterm_exam = document.getElementById('Midterm_exam').value;
          const Final_exam = document.getElementById('Final_exam').value;
          const CW_1 = document.getElementById('CW_1').value;
          const CW_2 = document.getElementById('CW_2').value;
          const Total_Points = document.getElementById('Total_Points').value;
          const Student_Average = document.getElementById('Student_Average').value;
          const Grade = document.getElementById('Grade').value;

          const xhttpUpdate = new XMLHttpRequest();

          xhttpUpdate.open("PUT", `http://localhost:3000/register/update/` + id);
          xhttpUpdate.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhttpUpdate.send(JSON.stringify({
            '_id': id,
            'First_Name': First_Name,
            'Last_Name': Last_Name,
            'Midterm_exam': Midterm_exam,
            'Final_exam': Final_exam,
            'CW_1': CW_1,
            'CW_2': CW_2,
            'Total_Points': Total_Points,
            'Student_Average': Student_Average,
            'Grade': Grade
          }));

          xhttpUpdate.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              Swal.fire("Success!", "แก้ไขข้อมูลนักเรียนสำเร็จ", "success");
              loadTable();
            } else {
              Swal.fire("Failed!", "แก้ไขข้อมูลนักเรียนไม่สำเร็จ", "error");
              loadTable();
            }

          };

        }
      });
    }
  };
}
////////////////////////////////// EDIT /////////////////////////////////


/////////////////////////// AUTHENTICATION //////////////////////////////
var auth = { status: false, user: null }

window.onload = function(){
  checkAuth()
}

function checkAuth() {
  const get_auth = localStorage.getItem("auth")
  if (Boolean(get_auth) === true) {
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
