$('#progress').bind('input propertychange', function(){
  var pro = $(this).val();
  if (pro>100||pro<0) {
    alert("数值为0-100");
    $(this).val('100');
    pro = 100;
  }
  // $('#thisprogress').attr('aria-valuenow') = ""+pro;
  //style="width: 60%;min-width: 2em;"
  $('#thisprogress').css("width", pro+"%");
  $('#thisprogress').html(pro+"%");
})
$().ready(function() {
    $("#commentForm").validate();
});