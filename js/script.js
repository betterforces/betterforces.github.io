$(document).ready(function() {


  var accessNameFirst       = $("#access-name-first");
  var accessNameLast        = $("#access-name-last");
  var accessEmail           = $("#access-email");
  var accessSite            = $("#access-site");
  var accessCountry         = $("#access-country");
  var accessDivision        = $("#access-division");

  var submitBtn           = $("#send-form");

  function mailChimp() {

    $(submitBtn).attr("disabled", true);

    var mchimp = "//michaelsheedy.us5.list-manage.com/subscribe/post-json?";
    var formid = "cbe2295cfa70a855f0194cb63";
    var listid = "b54fa99cb2";

    var firstName = $(accessNameFirst).val();
    var lastName = $(accessNameLast).val();
    var email = $(accessEmail).val();
    // var site = $(accessSite).val();
    var country = $(accessCountry).val();
    var division = $(accessDivision).val();

    var data = {
      FNAME: $(accessNameFirst).val(),
      LNAME: $(accessNameLast).val(),
      EMAIL: $(accessEmail).val(),
      // MMERGE3: $(accessSite).val(),
      MMERGE6: $(accessCountry).val(),
      double_optin: false
    };

    if ($('input[name="group[17229][1]"]').is(":checked")) {
      data['group[17229][1]'] = $('input[name="group[17229][1]"]').val();
    }
    if ($('input[name="group[17229][2]"]').is(":checked")) {
      data['group[17229][2]'] = $('input[name="group[17229][2]"]').val();
    }
    if ($('input[name="group[17229][4]"]').is(":checked")) {
      data['group[17229][4]'] = $('input[name="group[17229][4]"]').val();
    }
    if ($('input[name="group[17229][8]"]').is(":checked")) {
      data['group[17229][8]'] = $('input[name="group[17229][8]"]').val();
    }

    var url = mchimp + "u=" + formid + "&id=" + listid;

    $.ajax({
        url: url.concat('&c=?'),
        data: data,
        type: "GET",
        cache: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        error: function(err) {
          console.log("There was an ajax error :(");
        },
        success: function(data) {
            if (data.result != "success") {
              console.log(JSON.stringify(data));
              // var code = data.msg.charAt(0);
              // errorCodes(code);
              var str = data.msg;
              var patt = new RegExp("already subscribed");
              var res = patt.test(str);
              if (res) {
                console.log("looks like you've already applied with this email address.");
              } else {
                console.log("Hmmm, looks like you didn't fill in the form properly or entered a dodgy email address.");
              };

              $(submitBtn).attr("disabled", false);
              return false;
            } else {
              $(".application-form").html("<h2>Thank you</h2><p>Your request has been received.</p>");
              $(submitBtn).attr("disabled", false);
              console.log("success");
              return true;
            }
        }
    });

    // Mailchimp Responses
    // 0: 'We have sent you a confirmation email'
    // 1: 'Please enter a value'
    // 2: 'An email address must contain a single @'
    // 3: 'The domain portion of the email address is invalid (the portion after the @: )'
    // 4: 'The username portion of the email address is invalid (the portion before the @: )'
    // 5: 'This email address looks fake or invalid. Please enter a real email address'

  }

  $("#send-form").click(function(e) {
    e.preventDefault();
    mailChimp();
  });

});