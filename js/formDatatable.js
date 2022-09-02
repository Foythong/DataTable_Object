// var prg = "php/formDatatable.php";


$(function(e){
    $("#myTable").DataTable({
      ajax: "http://1.179.146.155/p643/64309030006/dataTable/php/formObject.php",
      columns: [
        {data: "id"},
        {data: "Fname"},
        {data: "Lname"},
        {data: "memEmail"},
        {data: "memJob"},
        {data: function(data){
          return " <a href='#'><button type='button' onclick=showEdit("+data.id+") data-bs-toggle='modal' data-bs-target='#formModal' style='background:orange;color:black;padding:10px 15px;border:none;border-radius: 10px;'>แก้ไข</button></a>" +
          " <a href='#'><button onclick=DelId("+data.id+") style='background:#C70039 ;color:white;padding:10px 15px;border:none;border-radius: 10px;'>ลบ</button></a>"
        }}
      ],
      "oLanguage": {
          sSearch: "ค้นหา",
          sLengthMenu: "แสดง _MENU_ แถว",
          sInfo: "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
          oPaginate: {
            sFirst: "หน้าแรก",
            sPrevious: "ก่อนหน้า",
            sNext: "ถัดไป",
            sLast: "หน้าสุดท้าย"
          }
        }
    });
  })

  function getId(id){
    $.ajax(prg,{act: "get",id:id},function(data,status){
      console.log(JSON.parse(data));
    })
  }

  function addRow(){

    var html = '<tr><td>#</td>';
        html += '<td id="Fname" contenteditable></td>'
        html += '<td id="Lname" contenteditable></td>';
        html += '<td id="memEmail" contenteditable></td>';
        html += '<td id="memJob" contenteditable></td>';
        html += '<td><button onclick="insert()" style="background:#169F27;color:white;padding:10px 10px;border:none;border-radius: 10px;">เพิ่ม</button>' + "  " +'<button id="canCle" onclick="cancle()" style="background:#C70039 ;color:white;padding:10px 10px;border:none;border-radius: 10px;">ยกเลิก</button></td></tr>'
        
      $('#myTable').prepend(html);

  }

  function cancle(){
    $('#canCle').parents('tr').remove();
  }

  function insert(){
    var Fname = $('#Fname').text();
    var Lname = $('#Lname').text();
    var memEmail = $('#memEmail').text();
    var memJob = $('#memJob').text();

    if(Fname != '' && Lname != '' && memEmail != '' && memJob != ''){
      $.ajax({
        url: "http://1.179.146.155/p643/64309030006/dataTable/php/formDatatable.php",
        method: 'POST',
        data: {
            act:"add",
            Fname:Fname,
            Lname:Lname,
            memEmail:memEmail,
            memJob:memJob
        },success:function(data){   
            console.log(data); 
            row = JSON.parse(data);
//             console.log(row);
            if(row.status == 1){
              Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500
              }),  
                refresh();
            }
        }
    })
    }else{
        alert('กรุณากรอกข้อมูลให้ครบ');
    }
    
}


function DelId(id) {
    Swal.fire({
        title: 'คุณต้องการลบข้อมูล?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        setTimeout: 2000,
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'ลบข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          }),
            $.ajax({
                url: prg,
                method: "POST",
                data: { act: "delete", id: id },
                success: function () {
                  refresh();
                }
            })
        }
    })
}


function showEdit(id) {
  // alert(id);
  var modalTitle = formModal.querySelector('.modal-title')
  modalTitle.textContent = 'แก้ไขข้อมูลไอดี: ' + id
  $('#mem_id').val(id);

  $.ajax({
      url: "http://1.179.146.155/p643/64309030006/dataTable/php/formDatatable.php",
      method: "POST",
      data: { act: "select", id: id },
      success: function (data) {
          var row = JSON.parse(data);
          $("#Fname_modal").val(row[0].Fname);
          $("#Lname_modal").val(row[0].Lname);
          $("#memEmail_modal").val(row[0].memEmail);
          $("#memJob_modal").val(row[0].memJob);
      }
  })
}

$(function () {
  $("form#form_Modal").submit(function (e) {
      e.preventDefault();

      var formdata = new FormData(this);
      formdata.append("act", "edit_mem");
      formdata.append("id", $('#mem_id').val());
      formdata.append("Fname", $('#Fname_modal').val());
      formdata.append("Lname", $('#Lname_modal').val());
      formdata.append("memEmail", $('#memEmail_modal').val());
      formdata.append("memJob", $('#memJob_modal').val());

      $.ajax({
          url: "http://1.179.146.155/p643/64309030006/dataTable/php/formDatatable.php",
          type: 'POST',
          data: formdata,
          success: function (res) {
              console.log(res);
              data = JSON.parse(res);
              if (data.status == 1){
                Swal.fire({
                  // position: 'top-end',
                  icon: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                }),          
                  $("#formModal").modal('toggle');
                  refresh();
              }
          },
          cache: false,
          contentType: false,
          processData: false,
      })
      // return false;
  })
})


function refresh() {
  setTimeout(function () {
      location.reload()
  }, 1000);
}
