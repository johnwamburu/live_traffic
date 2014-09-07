
// this first - loads all required
$(document).ready(function () {
    //force searchbar css
	$("#id_q").css('height','30px');

	$('#ajax_loader_image').hide();
    $("#id_second_field").change(function () {
	    var e1 = document.getElementById("id_first_field");
	    var form = e1.options[e1.selectedIndex].value;
	    var e2 = document.getElementById("id_second_field");
	    var stream = e2.options[e2.selectedIndex].value;
	    if (stream == ""){$('#list_table').html(''); $('#t_container').show();return;}
	    else{
	        var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
	        $('#ajax_loader_image').show();
            $.ajax({
                url: "/students/ajax_lists",
                type: "POST",
                dataType: "html",
                data: {
                    id : stream,
                    csrfmiddlewaretoken: csrf
                },
                success: function (data) {
                    $('#students_span').html(data.split('___')[1]);
                    $('#list_table').html(data.split('___')[0]);
		            $('#t_container').hide();
		            $('#ajax_loader_image').hide();
                },
                error: function (xhr, errmsg, err) {
		            alert(xhr.status + ": " + xhr.responseText);alert(errmsg);
                }
            });}
        return false;
    });

	//assign subjects
	$("#id_stream").change(function () {
	    var e1 = document.getElementById("id_form");
	    var form = e1.options[e1.selectedIndex].value;
	    var e2 = document.getElementById("id_stream");
	    var stream = e2.options[e2.selectedIndex].value;
	    if (stream == ""){$('#list_table').html(''); $('#t_container').show();return;}
	    else{
	        var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
	        $('#ajax_loader_image').show();
            $.ajax({
                url: "/exams/ajax_subject_lists",
                type: "POST",
                dataType: "html",
                data: {
                    id : stream,
                    csrfmiddlewaretoken: csrf
                },
                success: function (data) {
                    $('#list_table').html(data);
		            $('#t_container').hide();
		            $('#ajax_loader_image').hide();
                },
                error: function (xhr, errmsg, err) {
		            alert(xhr.status + ": " + xhr.responseText);alert(errmsg);
                }
            });}
        return false;
    });

    // function go back - finally!!
    $(".global-back").click(function () {window.history.back();});
});

//get classes form in assigning subjects
function get_classes() {
    alert('john');
}

//get students in assigning subjects
function get_subject_lists() {
    alert('john');
}

// assign student to dorm
function assign_student_to_dorm() {
    var adm = $("#id_student").val();
	$('#ajax_loader_image').show();
    $.ajax({
        url: "/accomodation/ajax_confirm_assign",
        type: "POST",
        dataType: "html",
        data: {
            adm : adm,
		    dorm : 'dorm',
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
        success: function (html) {
	        myTitle =   "<h4 class='my-modal-title'>Confirm</h4>";
	        bootbox.dialog({
  	    	    message: html,
  	    	    title: myTitle,
  	    	    buttons: {
		            danger: {
      	    	    	label: "No",
      	    	    	className: "btn-danger",
      	    	    	callback: function() {
		    	            return;
      	    	    	}
    	    	    },
    	    	    success: {
      		    	    label: "Yes",
      		    	    className: "btn-success",
       		    	    callback: function() {
		     	            document.getElementById('myForm').submit();
      	    	    	}
    	    	    }
 	    	    }
	        });
	        $('#ajax_loader_image').hide();
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
    return false;
}

//allocate book confirm
function allocate_book_confirm() {
    var adm = $("#id_adm_number").val();
	var book_code = $("#id_book").val();
	$('#ajax_loader_image').show();
    $.ajax({
        url: "/library/ajax_allocate_book_confirm",
        type: "POST",
        dataType: "html",
        data: {
            adm : adm,
            b_code : book_code,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
        success: function (data) {
	        myTitle =   "<h4 class='my-modal-title'>Dialog confirm</h4>";
	        bootbox.dialog({
  	    	    message: data,
  	    	    title: myTitle,
  	    	    buttons: {
		            danger: {
      	    	    	label: "No",
      	    	    	className: "btn-danger",
      	    	    	callback: function() {
		    	            return;
      	    	    	}
    	    	    },
    	    	    success: {
      		    	    label: "Yes",
      		    	    className: "btn-success",
       		    	    callback: function() {
		     	            document.getElementById('myForm').submit();
      	    	    	}
    	    	    }
 	    	    }
	        });
	        $('#ajax_loader_image').hide();
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
    return false;
}

// return book confirm
function return_book_confirm() {
    var student_id = $("#id_student").val();
	var book_code = $("#id_book").val();
	$('#ajax_loader_image').show();
    $.ajax({
        url: "/library/ajax_return_book_confirm",
        type: "POST",
        dataType: "html",
        data: {
            adm : student_id,
            b_code : book_code,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
        },

        success: function (data) {
	        myTitle =   "<h4 class='my-modal-title'>Dialog confirm</h4>";
	        bootbox.dialog({
  	    	    message: data,
  	    	    title: myTitle,
  	    	    buttons: {
		            danger: {
      	    	    	label: "No",
      	    	    	className: "btn-danger",
      	    	    	callback: function() {
		    	            return;
      	    	    	}
    	    	    },
    	    	    success: {
      		    	    label: "Yes",
      		    	    className: "btn-success",
       		    	    callback: function() {
		     	            document.getElementById('myForm').submit();
      	    	    	}
    	    	    }
 	    	    }
	        });
	        $('#ajax_loader_image').hide();
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
    return false;
}

// remove book confirm
function remove_book_confirm() {
    var book_code = $("#id_book").val();
	$('#ajax_loader_image').show();
    $.ajax({
        url: "/library/ajax_remove_book_confirm",
        type: "POST",
        dataType: "html",
        data: {
            b_code : book_code,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
        success: function (data) {
	        myTitle =   "<h4 class='my-modal-title'>Are you sure?</h4>";
	        bootbox.dialog({
  	    	    message: data,
  	    	    title: myTitle,
  	    	    buttons: {
		            danger: {
      	    	    	label: "No",
      	    	    	className: "btn-danger",
      	    	    	callback: function() {
		    	            return;
      	    	    	}
    	    	    },
    	    	    success: {
      		    	    label: "Yes",
      		    	    className: "btn-success",
       		    	    callback: function() {
		     	            document.getElementById('myForm').submit();
      	    	    	}
    	    	    }
 	    	    }
	        });
	        $('#ajax_loader_image').hide();
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
    return false;
}

// filter books
function filter_books() {
	var q1 = $("#id_subject").val();
	var q2 = $("#id_status").val();
	$('#ajax_loader_image').show();
    $.ajax({
        url: "/library/ajax_filter_books",
        type: "POST",
        dataType: "html",
        data: {
            q1 : q1,
            q2 : q2,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
        success: function (data) {
		    $('#books_table').html(data);
		    $('#ajax_loader_image').hide();
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
    return false;
}

//calculate total value as inputs are changed finance pay fees
function calculate_total() {
    var elements = document.getElementsByClassName("receipt_fields");
    var total = 0;
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value.length != 0)
            total += parseInt(elements[i].value);
    }
    document.getElementById("total_amount_p").innerHTML = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// select all checkboxes
function toggle_selection(source) {
    var checkboxes = document.getElementsByName('student-check');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}


// get current assignments while assigning subject combinations
function get_combinations_confirm() {
    $('#ajax_loader_image').show();
    var adms = "";
    $('input[name=student-check]:checked').each(function() {
        adms += this.value + "__";
    });
    var e1 = document.getElementById("id_combination");
	var val = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById("id_term");
	var val1 = e2.options[e2.selectedIndex].value;
    if (val == ""){
        bootbox.dialog({
  	    	message: '<span>Subject combination is required. Please select.</span>',
  	    	title: "<h4 class='my-modal-title'>Assignment Analysis</h4>",
  	    	buttons: {
		    	success: {
      	    	    label: "Close",
      	    	    className: "btn-danger",
      	    	    callback: function() {
		    	    	return;
      	    	    }
    	    	}
 	    	}
	    });
        $('#ajax_loader_image').hide();
    }
    else if (val1 == ""){
        bootbox.dialog({
  	    	message: '<span>Term is required. Please select.</span>',
  	    	title: "<h4 class='my-modal-title'>Assignment Analysis</h4>",
  	    	buttons: {
		    	success: {
      	    	    label: "Close",
      	    	    className: "btn-danger",
      	    	    callback: function() {
		    	    	return;
      	    	    }
    	    	}
 	    	}
	    });
        $('#ajax_loader_image').hide();
    }
    else if (adms.length < 1){
        bootbox.dialog({
  	    	message: '<span>No students selected. Nothing to do.</span>',
  	    	title: "<h4 class='my-modal-title'>Assignment Analysis</h4>",
  	    	buttons: {
		    	success: {
      	    	    label: "Close",
      	    	    className: "btn-danger",
      	    	    callback: function() {
		    	    	return;
      	    	    }
    	    	}
 	    	}
	    });
        $('#ajax_loader_image').hide();
    }
    else {
        $.ajax({
            url: "/exams/ajax_combinations_assignment_confirm",
            type: "POST",
            dataType: "html",
            data: {
                adms : adms,
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
            },
            success: function (data) {
                bootbox.dialog({
  	    		    message: data,
  	    		    title: "<h4 class='my-modal-title'>Assignment Analysis</h4>",
  	    		    buttons: {
                        danger: {
      	    	    	    label: "Cancel",
      	    	    	    className: "btn-danger",
      	    	    	    callback: function() {
		    	                return;
      	    	    	    }
    	    	        },
		    		    success: {
      	    	    	    label: "Assign",
      	    	    	    className: "btn-success",
      	    	    	    callback: function() {
		    	    		    $("#mySubjectCombinationForm").submit();
      	    	    	    }
    	    	        }
 	    		    }
	    	    });
		        $('#ajax_loader_image').hide();
            },
            error: function (xhr, errmsg, err) {
                alert(xhr.status + ": " + xhr.responseText);
            }
        });
        return false;
    }
}

// validate expense payment values
function validate_expense_payment() {
    var ref = document.getElementById("id_reference_number").value;
	var notes = document.getElementById("id_notes").value;
	var amnt = document.getElementById("id_value").value;
	if (amnt.length < 1 || ref.length < 1 || notes.length < 1) {
		document.getElementById("error_report").innerHTML="Please fill all fields - Ref No, Notes, Amount";
		return;
	}
	else{ $("#pay_form").submit(); }
}


// fetch fee collection details
function get_fee_collection_details(source) {
    var my_id = source.id;
	$.ajax({
        url: "/finance/ajax_fee_collection_details",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			id : my_id
        },
        success: function (data) {
			bootbox.dialog({
  	    		message: data,
  	    		title: "<h4 class='my-modal-title'>Collection Details</h4>",
  	    		buttons: {
		    		success: {
      	    	    	label: "Close",
      	    	    	className: "btn-danger",
      	    	    	callback: function() {
		    	    		return;
      	    	    	}
    	    	    }
 	    		}
	    	});
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}

// ajax delete fee collection
function delete_fee_collection(source) {
	var my_id = source.id;
	bootbox.confirm("Are you sure?", function(result) {
		if(result){
		    $.ajax({
            	url: "/finance/ajax_delete_collection",
            	type: "POST",
            	dataType: "html",
            	data: {
                	csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
				    id : my_id
            	},
            	success: function (data) {
				    location.reload();
            	},
            	error: function (xhr, errmsg, err) {
                	alert(xhr.status + ": " + xhr.responseText);
                }
           	});
            return false;
		}
	});
}


// fetch fee details
function get_fee_details(source) {
    var my_id = source.id;
	$.ajax({
        url: "/finance/ajax_fee_details",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			id : my_id
        },
        success: function (data) {
			bootbox.dialog({
  	    		message: data,
  	    		title: "<h4 class='my-modal-title'>Fee Details</h4>",
  	    		buttons: {
		    		success: {
      	    	    	label: "Close",
      	    	    	className: "btn-danger",
      	    	    	callback: function() {
		    	    		return;
      	    	    	}
    	    	    }
 	    		}
	    	});
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}


// delete fee
function ajax_delete_fee(source) {
	var my_id = source.id;
	bootbox.confirm("Are you sure?", function(result) {
		if(result){
		    $.ajax({
            	url: "/finance/ajax_delete_fee",
            	type: "POST",
            	dataType: "html",
            	data: {
                	csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
				    id : my_id
            	},
            	success: function (data) {
				    location.reload();
            	},
            	error: function (xhr, errmsg, err) {
                	alert(xhr.status + ": " + xhr.responseText);
                }
           	});
            return false;
		}
	});
}


// load student f9
function student_f9(source) {
    var my_id = source.id;
	$.ajax({
        url: "/finance/ajax_student_f9",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			id : my_id
        },
        success: function (data) {
			bootbox.dialog({
  	    		message: data,
  	    		title: "<h4 class='my-modal-title'>Student Confirmation</h4>",
  	    		buttons: {
		    		success: {
      	    	    	label: "Close",
      	    	    	className: "btn-danger",
      	    	    	callback: function() {
		    	    		return;
      	    	    	}
    	    	    }
 	    		}
	    	});
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}


// fetch invoice details
function get_invoice_details(source) {
    var my_id = source.id;
	$.ajax({
        url: "/finance/ajax_details_invoice",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			id : my_id
        },
        success: function (data) {
			bootbox.dialog({
  	    		message: data,
  	    		title: "<h4 class='my-modal-title'>Invoice Details</h4>",
  	    		buttons: {
		    		success: {
      	    	    	label: "Close",
      	    	    	className: "btn-danger",
      	    	    	callback: function() {
		    	    		return;
      	    	    	}
    	    	    }
 	    		}
	    	});
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}

// fetch list of teachers to assign class teacher
function get_class_teachers_list(source) {
    var my_id = source.id;
	$.ajax({
        url: "/exams/ajax_assign_class_teacher_list",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			class_id : my_id
        },
        success: function (data) {
			bootbox.dialog({
  	    		message: data,
  	    		title: "<h4 class='my-modal-title'>Teachers List</h4>",
  	    		buttons: {
		    		success: {
      	    	    	label: "Close",
      	    	    	className: "btn-danger",
      	    	    	callback: function() {
		    	    		return;
      	    	    	}
    	    	    }
 	    		}
	    	});
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}


// assign fees confirm
function assign_fees_confirm() {
    $('#ajax_loader_image').show();
    var adms = "";
    $('input[name=student-check]:checked').each(function() {
        adms += this.value + "__";
    });
    var e1 = document.getElementById("id_col");
	var val = e1.options[e1.selectedIndex].value;
    if (val == ""){
        bootbox.dialog({
  	    	message: '<span>Fee collection is required. Please select.</span>',
  	    	title: "<h4 class='my-modal-title'>Fee Assignment Analysis</h4>",
  	    	buttons: {
		    	success: {
      	    	    label: "Close",
      	    	    className: "btn-danger",
      	    	    callback: function() {
		    	    	return;
      	    	    }
    	    	}
 	    	}
	    });
        $('#ajax_loader_image').hide();
    }
    else if (adms.length < 1){
        bootbox.dialog({
  	    	message: '<span>No students selected. Nothing to do.</span>',
  	    	title: "<h4 class='my-modal-title'>Fee Assignment Analysis</h4>",
  	    	buttons: {
		    	success: {
      	    	    label: "Close",
      	    	    className: "btn-danger",
      	    	    callback: function() {
		    	    	return;
      	    	    }
    	    	}
 	    	}
	    });
        $('#ajax_loader_image').hide();
    }
    else {
        $.ajax({
            url: "/finance/ajax_assign_fees_confirm",
            type: "POST",
            dataType: "html",
            data: {
                adms : adms,
                col_id : val,
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
            },
            success: function (data) {
                bootbox.dialog({
  	    		    message: data,
  	    		    title: "<h4 class='my-modal-title'>Assignment Analysis</h4>",
  	    		    buttons: {
                        danger: {
      	    	    	    label: "Cancel",
      	    	    	    className: "btn-danger",
      	    	    	    callback: function() {
		    	                return;
      	    	    	    }
    	    	        },
		    		    success: {
      	    	    	    label: "Assign",
      	    	    	    className: "btn-success",
      	    	    	    callback: function() {
		    	    		    $("#myFeeAssignmentForm").submit();
      	    	    	    }
    	    	        }
 	    		    }
	    	    });
		        $('#ajax_loader_image').hide();
            },
            error: function (xhr, errmsg, err) {
                alert(xhr.status + ": " + xhr.responseText);
            }
        });
        return false;
    }
}


// move classes confirm
function move_classes_confirm() {
    $('#ajax_loader_image').show();
    var adms = "";
    $('input[name=student-check]:checked').each(function() {
        adms += this.value + "__";
    });
    var e1 = document.getElementById("id_classroom");
	var val = e1.options[e1.selectedIndex].value;
    if (val == ""){
        bootbox.dialog({
  	    	message: '<span>Class to move students to is required. Please select.</span>',
  	    	title: "<h4 class='my-modal-title'>Alert</h4>",
  	    	buttons: {
		    	success: {
      	    	    label: "Close",
      	    	    className: "btn-danger",
      	    	    callback: function() {
		    	    	return;
      	    	    }
    	    	}
 	    	}
	    });
        $('#ajax_loader_image').hide();
    }
    else if (adms.length < 1){
        bootbox.dialog({
  	    	message: '<span>No students selected. Nothing to do.</span>',
  	    	title: "<h4 class='my-modal-title'>Alert</h4>",
  	    	buttons: {
		    	success: {
      	    	    label: "Close",
      	    	    className: "btn-danger",
      	    	    callback: function() {
		    	    	return;
      	    	    }
    	    	}
 	    	}
	    });
        $('#ajax_loader_image').hide();
    }
    else {
        $.ajax({
            url: "/students/ajax_move_classes_confirm",
            type: "POST",
            dataType: "html",
            data: {
                adms : adms,
                cls_id : val,
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
            },
            success: function (data) {
                bootbox.dialog({
  	    		    message: data,
  	    		    title: "<h4 class='my-modal-title'>Alert</h4>",
  	    		    buttons: {
                        danger: {
      	    	    	    label: "Cancel",
      	    	    	    className: "btn-danger",
      	    	    	    callback: function() {
		    	                return;
      	    	    	    }
    	    	        },
		    		    success: {
      	    	    	    label: "Move",
      	    	    	    className: "btn-success",
      	    	    	    callback: function() {
		    	    		    $("#myClassMovementForm").submit();
      	    	    	    }
    	    	        }
 	    		    }
	    	    });
		        $('#ajax_loader_image').hide();
            },
            error: function (xhr, errmsg, err) {
                alert(xhr.status + ": " + xhr.responseText);
            }
        });
        return false;
    }
}


// print class list
function print_class_list(source) {
    $('#link-here').html("");
    $('#ajax_loader_image').show();
    var my_id = source.id;
	$.ajax({
        url: "/reports/ajax_print_class_list",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			class_id : my_id
        },
        success: function (data) {
            setTimeout(function() {
            $('#ajax_loader_image').hide();
            $('#link-here').html(data); }, 2000);
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}


// print empty class register
function print_class_register(source) {
    $('#link-here').html("");
    $('#ajax_loader_image').show();
    var my_id = source.id;
	$.ajax({
        url: "/reports/ajax_print_class_register",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			class_id : my_id
        },
        success: function (data) {
            setTimeout(function() {
            $('#ajax_loader_image').hide();
            $('#link-here').html(data); }, 2000);
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}

// print student account fee statement
function print_fee_statement(source) {
    $('#link-here').html("");
    $('#ajax_loader_image').show();
    var my_id = source.id;
	$.ajax({
        url: "/reports/ajax_print_fee_statement",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			acc_id : my_id
        },
        success: function (data) {
            setTimeout(function() {
            $('#ajax_loader_image').hide();
            $('#link-here').html(data); }, 2000);
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}


// print outstanding balances list
function print_outstanding_balances_list(source) {
    $('#link-here').html("");
    $('#ajax_loader_image').show();
    var my_id = source.id;
	$.ajax({
        url: "/reports/ajax_print_outstanding_balances_list",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			class_id : my_id
        },
        success: function (data) {
            setTimeout(function() {
            $('#ajax_loader_image').hide();
            $('#link-here').html(data); }, 2000);
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}


// print list of invoices
function print_invoices_list(source) {
    $('#link-here').html("");
    $('#ajax_loader_image').show();
    var my_id = source.id;
	$.ajax({
        url: "/reports/ajax_print_invoices_list",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			term_id : my_id
        },
        success: function (data) {
            setTimeout(function() {
            $('#ajax_loader_image').hide();
            $('#link-here').html(data); }, 2000);
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}


// print pocket money accounts
function print_pocket_money_accounts(source) {
    $('#link-here').html("");
    $('#ajax_loader_image').show();
    var my_id = source.id;
	$.ajax({
        url: "/reports/ajax_print_pocket_money_accounts",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			class_id : my_id
        },
        success: function (data) {
            setTimeout(function() {
            $('#ajax_loader_image').hide();
            $('#link-here').html(data); }, 2000);
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}


// request approval for set fees
function request_approval_for_set_fees(source) {
    var my_id = source.id;
	$.ajax({
        url: "/finance/ajax_request_approval_for_set_fees",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			term_id : my_id
        },
        success: function (data) {
            window.location.reload();
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}

// calculate total percentage as exam percentage contributions are changed
function calculate_total_exam_percentage() {
    var elements = document.getElementsByClassName("in-p");
    var total = 0;
    for (var i = 0; i < elements.length; i++) {
        total += parseInt(elements[i].value);
    }
    var elements0 = document.getElementsByClassName("sch-acc-details");
    for (var x = 0; x < elements.length; x++) {
        elements0[x].innerHTML = 'Current Total : <strong>' + total + '%</strong>';
    }
}

/*
// SMS!
function send_sms() {
	var e1 = document.getElementById("id_recepients");
	var send_to = e1.options[e1.selectedIndex].value;
    var url = document.getElementById('vurl').value;
    var username = document.getElementById('vusername').value;
    var password = document.getElementById('vpassword').value;
    var message = document.getElementById('id_message').value;
    var x = overlay();
	$.ajax({
        url: "/sms/ajax_send_sms",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			username : username,
			password : password,
			send_to : send_to,
            message : message
        },
        success: function (data) {
            window.location = data;
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}
// overlay page on SMS send request
function overlay() {
    var url = document.getElementById('voverlayurl').value;
    // add the overlay with loading image to the page
    var over = '<div id="overlay">' +
            '<img id="loading" src="' + url + '">' +
            '</div>';
    $(over).appendTo('body');

    // click on the overlay to remove it
    $('#overlay').click(function() {
        $(this).remove();
    });
    
    // hit escape to close the overlay
    $(document).keyup(function(e) {
        if (e.which === 27) {
            $('#overlay').remove();
        }
    });
};
*/

// print report_forms
function print_report_forms(source) {
    $('#ajax_loader_image').show();
    var my_id = source.id;
    var term_id = document.getElementById('term_id').value;
	$.ajax({
        url: "/reports/ajax_print_multiple_report_forms",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			class_id : my_id,
            term_id : term_id
        },
        success: function (data) {
            setTimeout(function() {
            $('#ajax_loader_image').hide();
            $('#link-here').html(data); }, 10);
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
    var conversation = ["Request submitted, please wait...",
                        "Initializing...",
                        "Gathering the scrolls...",
                        "Traversing the models...",
                        "Fetching students' information...",
                        "Fetching teachers' information...",
                        "Getting the ink ready...",
                        "Calling the inscriber...",
                        "Write operation started...",
                        "Writing...please wait...",
                        "Still writing...please wait...",
                        "Verifying examination information...",
                        "Finishing up...",
                        "Calling the cleaners...",
                        "Running garbage collector...",
                        "Dusting the scrolls..."];
    $('#link-here').html("<a style='padding-right:10px'>" + conversation[0] + "</a>");

    var i = 0;
    for (var sentence in conversation) {
        setTimeout(function(sentence) {
            document.getElementById("link-here").innerHTML = "<a style='padding-right:10px'>" + conversation[sentence] + "</a>";
        }.bind(this, sentence), i++ * 1000);
    }
}


// print ranking by subject
function print_ranking_by_subject() {
    $('#link-here').html("");
    $('#ajax_loader_image').show();
	var e1 = document.getElementById("id_classroom");
	var class_id = e1.options[e1.selectedIndex].value;
	var e2 = document.getElementById("id_subject");
	var subject_code = e2.options[e2.selectedIndex].value;
    var term_id = document.getElementById('term_id').value;
	$.ajax({
        url: "/reports/ajax_print_ranking_by_subject",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			class_id : class_id,
            term_id : term_id,
            subject_code : subject_code
        },
        success: function (data) {
            setTimeout(function() {
            $('#ajax_loader_image').hide();
            $('#link-here').html(data); }, 200);
	        $("#link-here").css('font-weight','bold');
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}

// print overall ranking
function print_overall_ranking() {
    $('#link-here').html("");
    $('#ajax_loader_image').show();
	var e1 = document.getElementById("id_classroom");
	var class_id = e1.options[e1.selectedIndex].value;
    var term_id = document.getElementById('term_id').value;
	$.ajax({
        url: "/reports/ajax_print_overall_ranking",
        type: "POST",
        dataType: "html",
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			class_id : class_id,
            term_id : term_id
        },
        success: function (data) {
            setTimeout(function() {
            $('#ajax_loader_image').hide();
            $('#link-here').html(data); }, 200);
	        $("#link-here").css('font-weight','bold');
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
}

// update grade remark value
function update_grade_remark(source) {
    var my_attr = source.id;
    bootbox.prompt("New grade remark", function(result) {
        if (result === null) {
            return;
        } else {
            $.ajax({
                url :  "/exams/ajax_update_grade_remark",
                type : "POST",
                dataType: "html",
                data : {
		            attr : my_attr,
		            value : result,
                    csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
                },
                success : function(data) {
			        if (data == '')
				        location.reload();
			        else
				        window.location = data;
                },
                error : function(xhr,errmsg,err) {
                    alert(xhr.status + ": " + xhr.responseText);
                }
            });
        }
    });
}

// update class teacher's comment
function update_class_teachers_comment(source) {
    var my_attr = source.id;
    bootbox.prompt("New report form comment", function(result) {
        if (result === null) {
            return;
        } else {
            $.ajax({
                url :  "/exams/ajax_update_class_teachers_comment",
                type : "POST",
                dataType: "html",
                data : {
		            attr : my_attr,
		            value : result,
                    csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
                },
                success : function(data) {
			        if (data == '')
				        location.reload();
			        else
				        window.location = data;
                },
                error : function(xhr,errmsg,err) {
                    alert(xhr.status + ": " + xhr.responseText);
                }
            });
        }
    });
}
