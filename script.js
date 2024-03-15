var lastestHN;
var rightList;
var options;

//////////////////////////////////// show right options ///////////////////////////////////
const xhttp = new XMLHttpRequest();
xhttp.open("GET", "http://localhost:3000/rights/");
xhttp.send();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        rightList = JSON.parse(this.responseText);
        showUserCreateBox();
    }
}

function getRightOptionsHTML(selectedOption) {
    let optionsHTML = "<option disabled value> -- เลือกตัวเลือก -- </option>";
    for (let i = 0; i < rightList.length; i++) {
        if (rightList[i].Patient_Rights === selectedOption) { // Access data using key
            optionsHTML += `<option value="${rightList[i].Patient_Rights}" selected>${rightList[i].Patient_Rights}</option>`;
        } else {
            optionsHTML += `<option value="${rightList[i].Patient_Rights}">${rightList[i].Patient_Rights}</option>`;
        }
    }
    return optionsHTML;
}
//////////////////////////////////// show right options ///////////////////////////////////

//////////////////////////////////// Load Table ///////////////////////////////////
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/patients/");
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
                trHTML += "<td>" + object["HN"] + "</td>";
                trHTML += "<td>" + object["Name"] + "</td>";
                trHTML += "<td>" + object["Patient_Rights_1"] + "</td>";
                trHTML += "<td>" + object["Patient_Rights_2"] + "</td>";
                trHTML += "<td>" + object["Patient_Rights_3"] + "</td>";
                trHTML += "<td>" + object["Chronic_Disease"] + "</td>";
                trHTML += "<td>" + object["Address"] + "</td>";
                trHTML += "<td>" + object["Phone"] + "</td>";
                trHTML += '<td><i class ="btn text-primary bi bi-pencil-square" onclick = "showEditbox(' + object["ID"] + ')"></i>';
                trHTML += '<i class = "btn text-danger bi bi-trash3-fill" onclick = "patientDelete(' + object["ID"] + ')"></i></td>';
                trHTML += "</tr>";

                num++;
                lastestHN = object["HN"];
            }

            document.getElementById("patientTable").innerHTML = trHTML;
        } else {
            var trHTML = "";
            trHTML += "<tr><td> 404 Server not found </td></tr>";
            document.getElementById("patientTable").innerHTML = trHTML;
        }
    };
}
loadTable();

//////////////////////////////////// Load Table ///////////////////////////////////

//////////////////////////////////// SEARCH ///////////////////////////////////

function patientSearch() {
    let searchText = document.getElementById("KeywordSearch").value;
    console.log(searchText)
    if (searchText == "") {
        loadTable()
    } else {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:3000/patients/" + searchText);
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
                    trHTML += "<td>" + object["HN"] + "</td>";
                    trHTML += "<td>" + object["Name"] + "</td>";
                    trHTML += "<td>" + object["Patient_Rights_1"] + "</td>";
                    trHTML += "<td>" + object["Patient_Rights_2"] + "</td>";
                    trHTML += "<td>" + object["Patient_Rights_3"] + "</td>";
                    trHTML += "<td>" + object["Chronic_Disease"] + "</td>";
                    trHTML += "<td>" + object["Address"] + "</td>";
                    trHTML += "<td>" + object["Phone"] + "</td>";
                    trHTML += '<td><i class ="btn text-primary bi bi-pencil-square" onclick = "showEditbox(' + object["ID"] + ')"></i>';
                    trHTML += '<i class = "btn text-danger bi bi-trash3-fill" onclick = "patientDelete(' + object["ID"] + ')"></i></td>';
                    trHTML += "</tr>";

                    num++;
                    lastestHN = object["HN"];
                }

                document.getElementById("patientTable").innerHTML = trHTML;

            } else {
                var trHTML = "";
                trHTML += "<tr><td> Data not found </td></tr>";

                document.getElementById("patientTable").innerHTML = trHTML;
            }
        };
        xhttp.send();
    }
}

//////////////////////////////////// SEARCH ///////////////////////////////////

////////////////////////////////// DELETE /////////////////////////////////

function patientDelete(id) {
    console.log("Delete: ", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/patients/delete/" + id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ //JSON.stringify() = converts a JavaScript object or value to a JSON string
        "patientID": id  // Corrected from patientID to id
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Swal.fire("Good job!", "ลบข้อมูลผู้ป่วยสำเร็จ", "success");
            loadTable();
        } else {
            Swal.fire("Failed!", "ลบข้อมูลผู้ป่วยไม่สำเร็จ", "error");
            loadTable();
        }
    };
}

////////////////////////////////// DELETE /////////////////////////////////

////////////////////////////////// EDIT /////////////////////////////////

function showEditbox(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/editpatient/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const patientData = JSON.parse(this.responseText)[0];
            console.log(patientData);

            Swal.fire({
                title: 'แก้ไขข้อมูลผู้ป่วย',
                html:
                    '<div class="mb-3"><label for="HN" class="form-label float-start">HN</label>' +
                    '<input class="form-control" id="HN" value="' + patientData["HN"] + '" disabled></div>' +

                    '<div class="mb-3"><label for="Name" class="form-label float-start">ชื่อ-สกุลผู้ป่วย</label>' +
                    '<input class="form-control" id="Name" value="' + patientData["Name"] + '"></div>' +

                    '<div class="mb-3"><label for="Right1" class="form-label float-start">สิทธิการรักษา 1</label>' +
                    '<select class="form-select form-select-sm" id="Right1">' + getRightOptionsHTML('Right1', patientData["Right1"]) + '</select></div>' +

                    '<div class="mb-3"><label for="Right2" class="form-label float-start">สิทธิการรักษา 2</label>' +
                    '<select class="form-select form-select-sm" id="Right2">' + getRightOptionsHTML('Right2', patientData["Right2"]) + '</select></div>' +

                    '<div class="mb-3"><label for="Right3" class="form-label float-start">สิทธิการรักษา 3</label>' +
                    '<select class="form-select form-select-sm" id="Right3">' + getRightOptionsHTML('Right3', patientData["Right3"]) + '</select></div>' +

                    '<div class="mb-3"><label for="Chronic" class="form-label float-start">โรคประจำตัว</label>' +
                    '<input class="form-control" id="Chronic" value="' + patientData["Chronic_Disease"] + '"></div>' +

                    '<div class="mb-3"><label for="Address" class="form-label float-start">ที่อยู่</label>' +
                    '<input class="form-control" id="Address" value="' + patientData["Address"] + '"></div>' +

                    '<div class="mb-3"><label for="Phone" class="form-label float-start">เบอร์ติดต่อ</label>' +
                    '<input class="form-control" id="Phone" value="' + patientData["Phone"] + '"></div>',

                focusConfirm: false,
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'บันทึก',
                preConfirm: () => {
                    const HN = document.getElementById('HN').value;
                    const Name = document.getElementById('Name').value;
                    const Right1 = document.getElementById('Right1').value;
                    const Right2 = document.getElementById('Right2').value;
                    const Right3 = document.getElementById('Right3').value;
                    const Chronic = document.getElementById('Chronic').value;
                    const Address = document.getElementById('Address').value;
                    const Phone = document.getElementById('Phone').value;

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

                    xhttpUpdate.open("PUT", `http://localhost:3000/patients/update/` + id);
                    xhttpUpdate.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhttpUpdate.send(JSON.stringify({
                        'HN': HN,
                        'Name': Name,
                        'Right1': Right1,
                        'Right2': Right2,
                        'Right3': Right3,
                        'Chronic': Chronic,
                        'Address': Address,
                        'Phone': Phone,
                    }));
                }
            });
        }
    };
}

////////////////////////////////// EDIT /////////////////////////////////

/////////////////////////////////// INSERT NEW INFO //////////////////////////////////

function showUserCreateBox() {
    const options = getRightOptionsHTML();
    let latestHN = "WU";
    const num = parseInt(lastestHN.replaceAll("WU", "")) + 1;
    latestHN += num;

    Swal.fire({
        title: 'เพิ่มข้อมูลผู้ป่วย',
        html:
            '<div class="mb-3"><label for="HN" class="form-label float-start">HN</label>' +
            '<input class="form-control" id="HN" placeholder="HN" value="' + "WU" + (parseInt(lastestHN.replaceAll("WU", "")) + 1) + '" disabled></div>' +

            '<div class="mb-3"><label for="Name" class="form-label float-start">ชื่อ-สกุลผู้ป่วย</label>' +
            '<input class="form-control" id="Name" placeholder="ชื่อ สกุล"></div>' +

            '<div class="mb-3"><label for="Right1" class="form-label float-start">สิทธิการรักษา 1</label>' +
            '<select class="form-select form-select-sm" id="Right1">' + options + '</select></div>' +

            '<div class="mb-3"><label for="Right2" class="form-label float-start">สิทธิการรักษา 2</label>' +
            '<select class="form-select form-select-sm" id="Right2">' + options + '</select></div>' +

            '<div class="mb-3"><label for="Right3" class="form-label float-start">สิทธิการรักษา 3</label>' +
            '<select class="form-select form-select-sm" id="Right3">' + options + '</select></div>' +

            '<div class="mb-3"><label for="Chronic" class="form-label float-start">โรคประจำตัว</label>' +
            '<input class="form-control" id="Chronic" placeholder="เช่น ความดันโลหิตสูง, ไขมัน, เบาหวาน"></div>' +

            '<div class="mb-3"><label for="Address" class="form-label float-start">ที่อยู่</label>' +
            '<input class="form-control" id="Address" placeholder="บ้านเลขที่ หมู่บ้าน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"></div>' +

            '<div class="mb-3"><label for="Phone" class="form-label float-start">เบอร์ติดต่อ</label>' +
            '<input class="form-control" id="Phone" placeholder="0XX XXX XXXX"></div>',

        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'บันทึก',
        preConfirm: () => {
            createNewPatient();
        }
    })
}

function createNewPatient() {
    const HN = document.getElementById("HN").value;
    const Name = document.getElementById("Name").value;
    const Right1 = document.getElementById("Right1").value;
    const Right2 = document.getElementById("Right2").value;
    const Right3 = document.getElementById("Right3").value;
    const Chronic = document.getElementById("Chronic").value;
    const Address = document.getElementById("Address").value;
    const Phone = document.getElementById("Phone").value;

    console.log(JSON.stringify({
        'HN': HN,
        'Name': Name,
        'Right1': Right1,
        'Right2': Right2,
        'Right3': Right3,
        'Chronic': Chronic,
        'Address': Address,
        'Phone': Phone,
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://localhost:3000/patients/create');
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        'HN': HN,
        'Name': Name,
        'Right1': Right1,
        'Right2': Right2,
        'Right3': Right3,
        'Chronic': Chronic,
        'Address': Address,
        'Phone': Phone,
    }));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Swal.fire(
                'Good job!',
                'เพิ่มข้อมูลผู้ป่วยสำเร็จ',
                'success'
            );
            loadTable();
        } else {
            Swal.fire(
                'Failed!',
                'เพิ่มข้อมูลผู้ป่วยไม่สำเร็จ',
                'error'
            );
            loadTable();
        }
    };
}

