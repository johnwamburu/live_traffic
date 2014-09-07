<!--
	$(document).ready(function () {
	$('#ajax_loader_image').hide();
        $("#select_class_button").click(function () {
	 var e = document.getElementById("class_selection");
	 var input_string = e.options[e.selectedIndex].value;
	$('#ajax_loader_image').show();
        $.ajax({
            url: "/ajax_lists",
            type: "POST",
            dataType: "json",
            data: {
                client_response: input_string,
                csrfmiddlewaretoken: '{{ csrf_token }}'
            },

                 success: function (json) {
                var jsonResponse = eval(json);
		$("#list_table tr").remove();
		$('#list_table').append('<tr><th>Count</th><th>Student Name</th><th>Adm No.</th><th>Class</th><th>Profile</th></tr>');
                $.each(jsonResponse, function(index, element){
                        //alert(JSON.stringify(jsonResponse));
                     $('#list_table').append(
			'<tr><td>'+jsonResponse[index]["pk"]+
			'</td><td class="tdl">'+jsonResponse[index]["fields"]["first_name"]+
			' '+jsonResponse[index]["fields"]["middle_name"]+
			' '+jsonResponse[index]["fields"]["surname"]+
			'</td><td>'+jsonResponse[index]["fields"]["admission_number"]+
			'</td><td>'+jsonResponse[index]["fields"]["admission_class"]+
			'</td><td>'+'<a href="{{ object.get_absolute_url }}">View Profile</a>'+
			'</td></tr>');
		$('#ajax_loader_image').hide();
            }); ;
                 },
             error: function (xhr, errmsg, err) {
                alert(xhr.status + ": " + xhr.responseText);
                }
           });
            return false;
        });
    });
-->
