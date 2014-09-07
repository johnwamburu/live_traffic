/* sms */
$(document).ready(function () {
    $('#sms-loading').hide();
});

// compose single sms
function send_single_sms() {
    var to = document.getElementById('id_recepient').value;
    var message = document.getElementById('id_message').value;
    if (to.length < 10) {
		document.getElementById("sms-text").innerHTML="<span style='color:#ff0051'>Correct phone number is required.</span>";
		return;
	}
    else if (message.length < 1) {
		document.getElementById("sms-text").innerHTML="<span style='color:#ff0051'>Please fill message field.</span>";
		return;
	}
    else{
        document.getElementById('id_recepient').readOnly = true;
        document.getElementById('id_message').readOnly = true;
        $('#sms-loading').show();
        $('#sms-text').html("Sending...");
        var username = document.getElementById('vusername').value;
        var password = document.getElementById('vpassword').value;
	    $.ajax({
            url: "/sms/ajax_send_single_sms",
            type: "POST",
            dataType: "html",
            data: {
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			    to : to,
                message : message,
                username : username,
                password : password
            },
            success: function (data) {
                setTimeout(function() {
                    $('#sms-loading').hide();
                    $('#sms-text').html(data); }, 10);
            },
            error: function (xhr, errmsg, err) {
                alert(xhr.status + ": " + xhr.responseText);
            }
        });
    }
}

// send sms to multiple numbers
function send_multiple_sms() {
    var to = document.getElementById('id_recepients').value;
    var message = document.getElementById('id_message').value;
    if (to.length < 5) {
		document.getElementById("sms-text").innerHTML="<span style='color:#ff0051'>Group to send message to is required.</span>";
		return;
	}
    else if (message.length < 1) {
		document.getElementById("sms-text").innerHTML="<span style='color:#ff0051'>Please fill message field.</span>";
		return;
	}
    else{
        document.getElementById('id_recepients').readOnly = true;
        document.getElementById('id_message').readOnly = true;
        $('#sms-loading').show();
        $('#sms-text').html("Sending...");
        var username = document.getElementById('vusername').value;
        var password = document.getElementById('vpassword').value;
	    $.ajax({
            url: "/sms/ajax_send_multiple_sms",
            type: "POST",
            dataType: "html",
            data: {
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			    to : to,
                message : message,
                username : username,
                password : password
            },
            success: function (data) {
                setTimeout(function() {
                    $('#sms-loading').hide();
                    $('#sms-text').html(data); }, 10);
            },
            error: function (xhr, errmsg, err) {
                alert(xhr.status + ": " + xhr.responseText);
            }
        });
    }
}

// send sms to multiple numbers
function send_exam_results_by_sms() {
    var to = "";
    $('input[name=recepients]:checked').each(function() {
        to += this.value + "__";
    });
    var term = document.getElementById('id_term').value;
    if (to.length < 1) {
		document.getElementById("sms-text").innerHTML="<span style='color:#ff0051'>At least one class of students is required.</span>";
		return;
	}
    else{
        document.getElementById('id_recepients').readOnly = true;
        document.getElementById('id_term').readOnly = true;
        $('#sms-loading').show();
        $('#sms-text').html("Sending...");
        var username = document.getElementById('vusername').value;
        var password = document.getElementById('vpassword').value;
	    $.ajax({
            url: "/sms/ajax_send_results_sms",
            type: "POST",
            dataType: "html",
            data: {
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			    to : to,
                term : term,
                username : username,
                password : password
            },
            success: function (data) {
                setTimeout(function() {
                    $('#sms-loading').hide();
                    $('#sms-text').html(data); }, 10);
            },
            error: function (xhr, errmsg, err) {
                alert(xhr.status + ": " + xhr.responseText);
            }
        });
    }
}
