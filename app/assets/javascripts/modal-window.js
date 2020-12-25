$(document).ready(function(){
  $(".modal-window .close-btn").on("click", function(){
    $(".curtain").css("visibility", "hidden");
    $(".modal-window").css("display", "none");
    $(".modal-table").css("display", "none");

  });
});