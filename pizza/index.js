google.charts.load("current", {
  packages: ["corechart", "bar"],
});
google.charts.setOnLoadCallback(loadTable);

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
//         trHTML += "<td>" + object["order_id"] + "</td>";
//         trHTML += "<td>" + object["quantity"] + "</td>";
//         trHTML += "<td>" + object["pizza_category"] + "</td>";
//         trHTML += "<td>" + object["pizza_name"] + "</td>";
//         trHTML += "<td>" + object["pizza_ingredients"] + "</td>";
//         trHTML += "<td>" + object["pizza_size"] + "</td>";
//         trHTML += "<td>" + object["unit_price"] + "</td>";
//         trHTML += "<td>" + object["total_price"] + "</td>";
//         trHTML += "<td>" + object["order_datetime"] + "</td>";
//         trHTML += "<td>";
//         trHTML +='<a type="button" class="btn btn-outline-secondary" onclick="showOrderUpdateBox(\'' +object["_id"] +'\')"><i class="fas fa-edit"></i></a>';
//         trHTML +='<a type="button" class="btn btn-outline-danger" onclick="showOrderDeleteBox(\'' +object["_id"] +'\')"><i class="fas fa-trash"></i></a>';
//         trHTML += "<tr>";

//         num++;
//       }

//       document.getElementById("mytable").innerHTML = trHTML;
//       loadGraph();
//     }
//   });
// }


function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/order");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      var num = 1;
      var objects = JSON.parse(this.responseText);
      console.log(objects);

      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object["order_id"] + "</td>";
        trHTML += "<td>" + object["quantity"] + "</td>";
        trHTML += "<td>" + object["pizza_category"] + "</td>";
        trHTML += "<td>" + object["pizza_name"] + "</td>";
        trHTML += "<td>" + object["pizza_ingredients"] + "</td>";
        trHTML += "<td>" + object["pizza_size"] + "</td>";
        trHTML += "<td>" + object["unit_price"] + "</td>";
        trHTML += "<td>" + object["total_price"] + "</td>";
        trHTML += "<td>" + object["order_datetime"] + "</td>";
        trHTML += "<td>";
        trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showOrderUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
        trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showOrderDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
        trHTML += "<tr>";

        num++;
      }
      document.getElementById("mytable").innerHTML = trHTML;

      loadGraph();
    }
  };
}

function loadQueryTable() {
  document.getElementById("mytable").innerHTML = "<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>";
  const searchText = document.getElementById('searchTextBox').value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/order/search/" + searchText);

  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = '';
      var num = 1;
      const objects = JSON.parse(this.responseText).Complaint;
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object["order_id"] + "</td>";
        trHTML += "<td>" + object["quantity"] + "</td>";
        trHTML += "<td>" + object["pizza_category"] + "</td>";
        trHTML += "<td>" + object["pizza_name"] + "</td>";
        trHTML += "<td>" + object["pizza_ingredients"] + "</td>";
        trHTML += "<td>" + object["pizza_size"] + "</td>";
        trHTML += "<td>" + object["unit_price"] + "</td>";
        trHTML += "<td>" + object["total_price"] + "</td>";
        trHTML += "<td>" + object["order_datetime"] + "</td>";
        trHTML += "<td>";
        trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showOrderUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
        trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showOrderDeleteBox(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
        trHTML += "<tr>";
        num++;

      }
      console.log(trHTML);
      document.getElementById("mytable").innerHTML = trHTML;

    }
  };
}


function loadGraph() {
  var mlCount = 0;
  var fullsCount = 0;
  var sysCount = 0;
  var netwCount = 0;

  var mrCount = 0;
  var missCount = 0;
  var drCount = 0;
  var pfCount = 0;

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/slist");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        switch (object["Project"]) {
          case "Machine Learning":
            mlCount = mlCount + 1;
            break;
          case "Fullstack":
            fullsCount = fullsCount + 1;
            break;

          case "System Design":
            sysCount = sysCount + 1;
            break;

          case "Networks":
            netwCount = netwCount + 1;
            break;
        }

        switch (object["Title"]) {
          case "นาย":
            mrCount = mrCount + 1;
            break;
          case "นางสาว":
            missCount = missCount + 1;
            break;

          case "ดร.":
            drCount = drCount + 1;
            break;

          case "ศ.ดร":
            pfCount = pfCount + 1;
            break;
        }
      }

      var TimelyResponseData = google.visualization.arrayToDataTable([
        ["Project", "Field"],
        ["Machine Learning", mlCount],
        ["Fullstack", fullsCount],
        ["System Design", sysCount],
        ["Networks", netwCount],
      ]);

      var optionsTimelyResponse = { Titil: "Overall Project Fields" };
      var chartTimelyResponse = new google.visualization.PieChart(document.getElementById("piechartTimelyResponse"));
      chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

      var dataSubmitted = google.visualization.arrayToDataTable([
        [
          "Student Titile",
          "Number",
          {
            role: "style",
          },
          {
            role: "annotation",
          },
        ],
        ["นาย", mrCount, "gold", "นาย"],
        ["นางสาว", missCount, "color: #F65A83", "นางสาว"],
        ["ดร.", drCount, "color: #F9F5EB", "ดร."],
        ["ศ.ดร", pfCount, "color: #607EAA", "ศ.ดร"]
      ]);

      var optionSubmitted = {
        title: "Staff' Title",
        legend: { position: "none" },
      };

      var chartSubmitted = new google.visualization.BarChart(document.getElementById("barchartSubmitted"));
      chartSubmitted.draw(dataSubmitted, optionSubmitted);
    }
  };
}


function showStudentCreateBox() {
  var d = new Date();
  const date = d.toISOString().split('T')[0];

  Swal.fire({
    title: 'Create Student Transaction',
    html: '<div class="mb-3"><label for="Created_Date" class="form-label">Created Date</label>' +
      '<input id="Created_Date" class="swal2-input" placeholder="Created_Date" type="hidden" value="' + date + '">' +

      '<div class="mb-3"><label for="StudentID" class="form-label">Student ID</label>' +
      '<input class="form-control" id="StudentID" placeholder="StudentID"></div>' +

      '<div class="mb-3"><label for="Title" class="form-label">Title</label>' +
      '<input class="form-control" id="Title" placeholder="Title"></div>' +

      '<div class="mb-3"><label for="Name" class="form-label">Name</label>' +
      '<input class="form-control" id="Name" placeholder="Name"></div>' +

      '<div class="mb-3"><label for="Surname" class="form-label">Surname</label>' +
      '<input class="form-control" id="Surname" placeholder="Surname"></div>' +

      '<div class="mb-3"><label for="Field" class="form-label">Field</label>' +
      '<input class="form-control" id="Field" placeholder="Field"></div>' +

      '<div class="mb-3"><label for="Project" class="form-label">Project</label>' +
      '<input class="form-control" id="Project" placeholder="Project"></div>' +

      '<div class="mb-3"><label for="Savings" class="form-label">Savings</label>' +
      '<input class="form-control" id="Savings" placeholder="Savings"></div>' +

      '<div class="mb-3"><label for="GPA" class="form-label">GPA</label>' +
      '<input class="form-control" id="GPA" placeholder="GPA"></div>' +

      '<div class="mb-3"><label for="Salary" class="form-label">Salary</label>' +
      '<input class="form-control" id="Salary" placeholder="Salary"></div>',

    focusConfirm: false,
    preConfirm: () => {
      slistCreate();
    }
  });
}

function slistCreate() {
  const order_id = document.getElementById('order_id').value;
  const quantity = document.getElementById('quantity').value;
  const pizza_category = document.getElementById('pizza_category').value;
  const pizza_name = document.getElementById('pizza_name').value;
  const pizza_ingredients = document.getElementById('pizza_ingredients').value;
  const pizza_size = document.getElementById('pizza_size').value;
  const unit_price = document.getElementById('unit_price').value;
  const total_price = document.getElementById('total_price').value;
  const order_datetime = document.getElementById('order_datetime').value;

  console.log(JSON.stringify({
    order_id: order_id,
    quantity: quantity,
    pizza_category: pizza_category,
    pizza_name: pizza_name,
    pizza_ingredients: pizza_ingredients,
    pizza_size: pizza_size,
    unit_price: unit_price,
    total_price: total_price,
    order_datetime: order_datetime,
  }));

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/slist/create");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    Created_Date: Created_Date,
    StudentID: StudentID,
    Title: Title,
    Name: Name,
    Surname: Surname,
    Field: Field,
    Project: Project,
    Savings: Savings,
    GPA: GPA,
    Salary: Salary,
  }));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        'Good job!',
        'Create Student Information Successfully!',
        'success'
      );
      loadTable();
    }
  };
}

function showOrderDeleteBox(id) {
  console.log("Delete: ", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/slist/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({"_id": id}));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        'Good job!',
        'Delete Pizza Order Successfully!',
        'success'
      );
      loadTable();
    }
  };
}


function showOrderUpdateBox(id) {
  console.log("edit", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/slist/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText).Complaint;
      console.log("showOrderUpdateBox", object);
      Swal.fire({
        title: 'Update Pizza Order',
        html: '<input id="id" class="swal2-input" placeholder="OID" type="hidden" value="' + object['_id'] + '"><br>' +

          '<div class="mb-3"><label for="Created_Date" class="form-label">Created Date</label>' +
          '<input class="form-control" id="Created_Date" placeholder="Created_Date" value="' + object['Created_Date'] + '"></div>' +

          '<div class="mb-3"><label for="StudentID" class="form-label">Student ID</label>' +
          '<input class="form-control" id="StudentID" placeholder="StudentID" value="' + object['StudentID'] + '"></div>' +

          '<div class="mb-3"><label for="Title" class="form-label">Title</label>' +
          '<input class="form-control" id="Title" placeholder="Title" value="' + object['Title'] + '"></div>' +

          '<div class="mb-3"><label for="Name" class="form-label">Name</label>' +
          '<input class="form-control" id="Name" placeholder="Name" value="' + object['Name'] + '"></div>' +

          '<div class="mb-3"><label for="Surname" class="form-label">Surname</label>' +
          '<input class="form-control" id="Surname" placeholder="Surname" value="' + object['Surname'] + '"></div>' +

          '<div class="mb-3"><label for="Field" class="form-label">Field</label>' +
          '<input class="form-control" id="Field" placeholder="Field" value="' + object['Field'] + '"></div>' +

          '<div class="mb-3"><label for="Project" class="form-label">Project</label>' +
          '<input class="form-control" id="Project" placeholder="Project" value="' + object['Project'] + '"></div>' +

          '<div class="mb-3"><label for="Savings" class="form-label">Savings</label>' +
          '<input class="form-control" id="Savings" placeholder="Savings" value="' + object['Savings'] + '"></div>' +


          '<div class="mb-3"><label for="GPA" class="form-label">GPA</label>' +
          '<input class="form-control" id="GPA" placeholder="GPA" value="' + object['GPA'] + '"></div>' +

          '<div class="mb-3"><label for="Salary" class="form-label">Salary</label>' +
          '<input class="form-control" id="Salary" placeholder="Salary" value="' + object['Salary'] + '"></div>',

        focusConfirm: false,
        preConfirm: () => {
          studentUpdate();
        }
      });
    }
  };
}


function studentUpdate() {

  const id = document.getElementById("id").value;
  const Created_Date = document.getElementById('Created_Date').value;
  const StudentID = document.getElementById('StudentID').value;
  const Title = document.getElementById('Title').value;
  const Name = document.getElementById('Name').value;
  const Surname = document.getElementById('Surname').value;
  const Field = document.getElementById('Field').value;
  const Project = document.getElementById('Project').value;
  const Savings = document.getElementById('Savings').value;
  const GPA = document.getElementById('GPA').value;
  const Salary = document.getElementById('Salary').value;

  console.log(JSON.stringify({
    "_id": id,
    Created_Date: Created_Date,
    StudentID: StudentID,
    Title: Title,
    Name: Name,
    Surname: Surname,
    Field: Field,
    Project: Project,
    Savings: Savings,
    GPA: GPA,
    Salary: Salary,
  }));


  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/slist/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "_id": id,
    Created_Date: Created_Date,
    StudentID: StudentID,
    Title: Title,
    Name: Name,
    Surname: Surname,
    Field: Field,
    Project: Project,
    Savings: Savings,
    GPA: GPA,
    Salary: Salary,
  }));



  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        'Good job!',
        'Update Student Information Successfully!',
        'success'
      );
      loadTable();
    }
  };
}
