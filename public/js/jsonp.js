$('#userapi').blur(function(){
  var userapi = $(this);
  var stunumber = userapi.val();
  if(stunumber){
    $.ajax({
      url:'/userapi/' + stunumber,
      // cache: true,
      type: 'get',
      dataType: 'jsonp',
      // crossDamain: true,
      jsonp: 'callback',
      success:function(data){
        // alert(JSON.stringify(data));
        $('#inputCollege').val(data.college);
        $('#inputCclass').val(data.cclass);
        $('#inputName').val(data.name);
        $('#inputGender').val(data.gender);
        $('#inputAge').val(data.age);
        $('#inputTel').val(data.tel);
        $('#inputDescription').val(data.description);
      }
    })
  }
})