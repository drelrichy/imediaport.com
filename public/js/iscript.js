
$(document).ready(function(){
    $("#submitBtn").click(function(){        
        $("#myForm").submit(function(event) {
     event.preventDefault();
    $.ajax({
      url : "/comment",
      type : "POST",
      success : function(response){
        /*getAll();*/
        alert(response);
      }
    });
    return false;
});
});
  });
/*  $("form").submit(function(event) {
    event.preventDefault();
    alert("helo World");
    $.ajax({
      url : "/comment",
      type : "POST",
      success : function(response){
        getAll();
        alert(response);
      }
    });
    return false;

  });*/

        function doComment(form){
              $.ajax({
                  url : "/comment",
                  method : "POST",
                  data : { commentTxt : form.commentTxt.value } ,
                  success : function(response){
                    alert("Commented Successfully");
                  }
                });
                return false;
        }




$(document).ready(function(){
    $("#submitBtn").click(function(){        
    event.preventDefault();
    alert("Hello World");
    $.ajax({
      url : "/comment",
      method : "POST",
      data : { commentTxt : form.commentTxt.value } ,
      success : function(response){
        alert("Successfully Commented..");
      }
    });
    return false ;
});
});







$(document).ready(function(){
    $("#submitBtn").click(function(){  
    $("#myForm").submit(function(event) {
     event.preventDefault();      
    const commentst = $("#commentTxt").val();
    if ($.trim(commentst) != "") {
            $.ajax({
                  url : "/comment",
                  method : "POST",
                  data : { commentTxt : commentst } ,
                  success : function(response){
                    $("#commentTxt").val("");
                        $('#response').load("comente.ejs");
                              alert("Commented Successfully");
                  }
                });
            }
          });
        });

});
