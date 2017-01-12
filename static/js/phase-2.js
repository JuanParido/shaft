$(function(){
  //Create report button action
  $('#create-report').click(function(){
    $('.create-modal').show("slow");
  })
  //Modal close button
  $('#close').click(function(){
    $('.create-modal').hide("slow");
  })
   $('#get-claro-data').click(function(){
    $('.alert-panel').hide();
    $('.report-panel').show();
  })
});