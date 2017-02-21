$(document).ready(function(){


    // $('#logo').addClass('animated bounce infinite');
    // $('#merchantloadtext').addClass('animated pulse infinite');
    // document.getElementById("merchantblock").style.visibility = "hidden";
    // $('#logox').addClass('animated bounce infinite');
    //
    // setInterval(function(){
    //   document.getElementById("showmerchant").style.visibility = "hidden";
    //   document.getElementById("merchantblock").style.visibility = "visible";
    // },3000);
    //
    //



});




  $('#merchantloadtext').addClass('animated pulse infinite');
  document.getElementById("merchantblock").style.visibility = "hidden";
  $('#logo').addClass('animated bounce infinite');

  setInterval(function(){
    document.getElementById("showmerchant").style.visibility = "hidden";
    document.getElementById("merchantblock").style.visibility = "visible";
  },4000);



      //
      // $('#login-form').submit(function (e) {
      //    e.preventDefault();
      //   alert("Logging you in! Sit tight... check your connection if this takes longer than you expect. There should be an animation :D");
      //   Entry();
      //   return false;
      // });
      //
      // //Passes the users information to be logged in
      // function Entry(){
      //   var username=$("#username").val();
      //   var phone=$("#phone").val();
      //
      //
      //
      //   var theUrl="http://chipper.herokuapp.com/simple_auth";
      //   console.log('the url: ', theUrl);
      //   // debugger;
      //
      //   $.post(theUrl, { username: username, phone: phone }, function(response) {
      //     console.log("Data: ", response);
      //
      //     console.log(response.data.token);
      //     sessionStorage.token = response.data.token;
      //
      //
      //     console.log(response.data.user.username);
      //     sessionStorage.username = response.data.user.username;
      //
      //
      //     console.log(response.data.balance.amount);
      //     sessionStorage.balance = response.data.balance.amount;
      //
      //
      //     console.log(response.data.balance.currency);
      //     sessionStorage.currency = response.data.balance.currency;
      //
      //
      //     console.log(response.data.user.contacts[0].value);
      //     sessionStorage.number = response.data.user.contacts[0].value;
      //
      //     console.log(response.data.user.id);
      //     sessionStorage.id = response.data.user.id;
      //
      //
      //     window.location.href="dashboard.html";
      //
      //
      //
      //   });
      //
      //
      // }


      function Enter(){


    $('#logo').addClass('animated bounce infinite');






        $('#description').text("Logging you in...");

        var username=$("#username").val();
        var phone=$("#phone").val();



        var theUrl="http://chipper.herokuapp.com/simple_auth";
        console.log('the url: ', theUrl);
        // debugger;

        $.post(theUrl, { username: username, phone: phone }, function(response) {
          console.log("Data: ", response);



          console.log(response.data.token);
          sessionStorage.token = response.data.token;


          console.log(response.data.user.username);
          sessionStorage.username = response.data.user.username;


          console.log(response.data.balance.amount);
          sessionStorage.balance = response.data.balance.amount;
          sessionStorage.accountid = response.data.balance.account_id;


          console.log(response.data.balance.currency);
          sessionStorage.currency = response.data.balance.currency;


          console.log(response.data.user.contacts[0].value);
          sessionStorage.number = response.data.user.contacts[0].value;

          console.log(response.data.user.id);
          sessionStorage.id = response.data.user.id;


          window.location.href="dashboard.html";



        });


      }

      function Exiter(){


          value = "<br><br><center><div>"+"<p style ='color: #ffd800;'> <span style='color: #308014; font-weight: bold; font-size: 200%;'>"+sessionStorage.username+"'s wallet</span></p>"+"<p style ='color: #308014;'> Account Balance: <span style='color:black;font-size: 120%;'>"+sessionStorage.balance+"</p>"+"<p style ='color: #308014;'> Currency: <span style='color:black;font-size: 120%;'>"+sessionStorage.currency+"</p>"+"<p style ='color: #308014;'> Phone Number: <span style='color:black; font-size: 120%;'>"+sessionStorage.number+"</p>"+"</div>";

          // send = document.getElementById('sendbutton');
          document.getElementById('content').innerHTML = value;
          console.log(sessionStorage.accountid);
          updateBalance();
      }

      function ShowMyHistory()
      {
        var amount;
        var completedAt;
        var currency;
        var description;
        var note;
        var display;


        $.ajax({

                // async: false,
                url: "http://chipper.herokuapp.com/payments",
                // data: { 'phone': receiver, 'amount': amount, 'currency':'GHS', 'note': note, 'action': 'pay'},
                type: "GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.token);},
                success: function(response)
                {

                                  display = "<center><ul style='list-style-type:none'><br>";


                                  for(i=0; i< response.data.transactions.length; i++)
                                  {
                                   console.log('Success, ',  response);
                                  //  amount = response.data.transactions[0].actor.target;
                                  //  console.log(amount);
                                  //  completedAt = response.data.transactions[0].completedAt;
                                  //  console.log(completedAt);
                                  //  currency = response.data.transactions[0].currency;
                                  //  console.log(currency);
                                  //  description = response.data.transactions[0].description;
                                  //  console.log(description);
                                  //  note = response.data.transactions[0].note;
                                  //  console.log(note);
                                  if(response.data.transactions[i].isCredit){
                                    display = display + "<li style='color: green'>"+response.data.transactions[i].description+"</li><br>";
                                  } else {
                                    display = display + "<li style='color: red'>"+response.data.transactions[i].description+"</li><br>";
                                  }


                                }


                   display = display + "</ul></center>";
                   document.getElementById('transactioncontent').innerHTML = display;
                 },
                 error: function(response)
                 {
                   var obj = $.parseJSON(response.responseText);
                   alert(obj.error);

                 }
             });




      }

      function ShowMyTransactions()
      {
        var amount;
        var completedAt;
        var currency;
        var description;
        var note;

        // alert("fetching your transactions...");

        $.ajax({

                // async: false,
                url: "http://chipper.herokuapp.com/requests",
                // data: { 'phone': receiver, 'amount': amount, 'currency':'GHS', 'note': note, 'action': 'pay'},
                type: "GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.token);},
                success: function(response)
                {
                  console.log('response', response);
                  requestdisplay = "<center><ul style='list-style-type:none'><br>";

                                  let transactions = response.data.transactions.length;

                                  if(transactions == 0){
                                    requestdisplay = requestdisplay + "<li>No pending transactions</li>";
                                  }
                                  else
                                  {
                                    for(i=0; i< transactions; i++)
                                    {

                                      requestdisplay = requestdisplay + "<li id="+response.data.transactions[i].id+">"+response.data.transactions[i].description+
                                      " <div style='position:relative'> <a style='padding-left: 10px; display: inline;' id="+response.data.transactions[i].id+" href=# onclick='payme(this)'><img src='approve.png' height='40'></a><a style='padding-left: 10px;'href=# onclick='cancelme(this)' id="+response.data.transactions[i].id+"><img src='disapprove.png' height='40'></a> </li> </div> <br>";

                                    }
                                  }

                   requestdisplay = requestdisplay + "</ul></center>";
                   document.getElementById('pendingcontent').innerHTML = requestdisplay;
                 },
                 error: function(response)
                 {
                   var obj = $.parseJSON(response.responseText);
                   alert(obj.error);

                 }
             });




      }

      function payme(element){
        var value= element.id;
        console.log(value);
        alert(value);

        $.ajax({
                async: false,
                url: "http://chipper.herokuapp.com/payments/"+value,
                data: { 'action': "approve"},
                type: "PUT",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.token);},
                success: function(response)
                 {
                   console.log('Success, ',  response);
                   alert("Money has been sent successfully.");

                   window.location.href="mywallet.html";
                 },
                 error: function(response)
                 {
                   var obj = $.parseJSON(response.responseText);
                   alert(obj.error);

                 }
             });
             updateBalance();
      }


      function cancelme(element){
        var value= element.id;
        console.log(value);
        alert(value);

        $.ajax({
                async: false,
                url: "http://chipper.herokuapp.com/payments/"+value,
                data: { 'action': "decline"},
                type: "PUT",
                beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.token);},
                success: function(response)
                 {
                   console.log('Success, ',  response);
                   alert("Money has been declined.");

                    window.location.href="mywallet.html";
                 },
                 error: function(response)
                 {
                   var obj = $.parseJSON(response.responseText);
                   alert(obj.error);

                 }
             });
             updateBalance();
      }




          function Sender()
          {
            alert("Please wait while your transaction is processing.");

            var receiver=$("#receiver").val();
            var amount=$("#amount").val();
            var note=$("#note").val();

            $.ajax({
                    async: false,
                    url: "http://chipper.herokuapp.com/payments",
                    data: { 'phone': receiver, 'amount': amount, 'currency':'GHS', 'note': note, 'action': 'pay'},
                    type: "POST",
                    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.token);},
                    success: function(response)
                     {
                       console.log('Success, ',  response);
                       alert("Money has been sent successfully to: "+ receiver);
                     },
                     error: function(response)
                     {
                       var obj = $.parseJSON(response.responseText);
                       alert(obj.error);

                     }
                 });

                 $("#receiver").val("");
                 $("#amount").val("");
                 $("#note").val("");

                 updateBalance();
          }





              function Requester()
              {

                alert("Please wait while your transaction is processing.");

                var receiver=$("#Rreceiver").val();
                var amount=$("#Ramount").val();
                var note=$("#Rnote").val();

                $.ajax({
                        async: false,
                        url: "http://chipper.herokuapp.com/payments",
                        data: { 'phone': receiver, 'amount': amount, 'currency':'GHS', 'note': note, 'action': 'request'},
                        type: "POST",
                        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.token);},
                        success: function(response)
                         {
                           console.log('Success, ',  response);
                           alert("Money has been requested successfully to: "+ receiver);
                         },
                         error: function(response)
                         {
                           var obj = $.parseJSON(response.responseText);
                           alert(obj.error);

                         }
                     });


                     $("#Rreceiver").val("");
                     $("#Ramount").val("");
                     $("#Rnote").val("");

                     updateBalance();

              }


              function updateBalance(){
                $.ajax({
                        async: false,
                        url: "http://chipper.herokuapp.com/me",
                        // data: { signature: authHeader() },
                        type: "GET",
                        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.token);},
                        success: function(response)
                        {
                          console.log('Success, ',  response);




                          sessionStorage.username = response.data.user.username;
                          sessionStorage.balance = response.data.balance.amount;
                          sessionStorage.currency = response.data.balance.currency;
                          sessionStorage.number = response.data.user.contacts[0].value;

                          value = "<br><br><center><div>"+"<p style ='color: #ffd800;'> <span style='color: #308014; font-weight: bold; font-size: 200%;'>"+sessionStorage.username+"'s wallet</span></p>"+"<p style ='color: #308014;'> Account Balance: <span style='color:black;font-size: 120%;'>"+sessionStorage.balance+"</p>"+"<p style ='color: #308014;'> Currency: <span style='color:black;font-size: 120%;'>"+sessionStorage.currency+"</p>"+"<p style ='color: #308014;'> Phone Number: <span style='color:black; font-size: 120%;'>"+sessionStorage.number+"</p>"+"</div>";
                          document.getElementById('content').innerHTML = value;



                        },
                        error: function(response)
                        {
                          var obj = $.parseJSON(response.responseText);
                          alert(obj.error);

                        }
                     });

              }


              function editInfo()
              {
                var about=$("#about").val();
                var firstname=$("#firstname").val();
                var lastname=$("#lastname").val();
                var username=$("#username").val();

                $.ajax({
                        async: false,
                        url: "http://chipper.herokuapp.com/users/"+sessionStorage.id,
                        data: { 'about': about, 'firstName': firstname, 'lastName':lastname, 'username': username},
                        type: "PUT",
                        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.token);},
                        success: function(response) {
                          console.log('Success, ',  response);
                          sessionStorage.username = response.data.user.username;
                       },
                       error: function(response)
                       {
                         var obj = $.parseJSON(response.responseText);
                         alert(obj.error);

                       }
                     });

                window.location.href="user.html";

              }


              function getInfo()
              {

                var infodisplay;

                $.ajax({
                        async: false,
                        url: "http://chipper.herokuapp.com/users/"+sessionStorage.id,
                        type: "GET",
                        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.token);},
                        success: function(response) {
                          console.log('Success, ',  response);

                          var createdDate = response.data.user.createdAt;
                          var clength = 10;
                          var createdString = createdDate.substring(0, clength);

                          infodisplay = "<center><div style='color: #308014; font-weight: bold; font-size: 20px;'>"+response.data.user.displayName+"</div></center>";
                          infodisplay = infodisplay + "<center><div>";
                          infodisplay = infodisplay + "<p><img src="+response.data.user.avatar+" class=circle></p>";
                          infodisplay = infodisplay + "</div></center>";
                          infodisplay = infodisplay + "<div>";
                          // infodisplay = infodisplay + "<p>"+response.data.user.firstName+"</p>";
                          // infodisplay = infodisplay + "<p>"+response.data.user.lastName+"</p>";
                          infodisplay = infodisplay + "</div>";
                          infodisplay = infodisplay + "<div style='color: #308014; font-weight: normal; font-size: 10px; padding-left: 5%; padding-right:5%;'>Username: <span style='color: black; font-weight: normal; font-size: 15px;'>"+response.data.user.username+"</span></div><br>";
                          infodisplay = infodisplay + "<div style='color: #308014; font-weight: normal; font-size: 10px; padding-left: 5%; padding-right:5%;'>Account Creation Date: <span style='color: black; font-weight: normal; font-size: 15px;'>"+createdString+"</span></div><br>";
                          infodisplay = infodisplay + "<div style='color: #308014; font-weight: normal; font-size: 10px; padding-left: 5%; padding-right:5%;'>Account Description: <span style='color: black; font-weight: normal; font-size: 15px;'>"+response.data.user.about+"</span></div><br>";

                          infodisplay = infodisplay + "<div style='color: #308014; font-weight: normal; font-size: 10px; padding-left: 5%; padding-right:5%;'>Account ID: <span style='color: black; font-weight: normal; font-size: 15px;'>"+response.data.user.purse.accountId+"</span></div><br>";




                          document.getElementById('usercontent').innerHTML = infodisplay;

                       },
                       error: function(response)
                       {
                         var obj = $.parseJSON(response.responseText);
                         alert(obj.error);

                       }
                     });

                // window.location.href="";

              }
