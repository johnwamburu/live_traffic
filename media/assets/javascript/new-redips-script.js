/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

// define init and show methods
var redipsInit,
	showContent,
	saveContent,
	getContent;

// redips initialization
redipsInit = function () {
	var num = 0,			// number of successfully placed elements
		rd = REDIPS.drag;	// reference to the REDIPS.drag lib
	// initialization
	rd.init();
	// set hover color
	rd.hover.colorTd = '#9BB3DA';
	// single element per cell
	rd.dropMode = 'single';
	// call initially showContent
	showContent();
	// on each drop refresh content
	rd.event.dropped = function () {
		showContent();
	};
	// call showContent() after DIV element is deleted
	rd.event.deleted = function () {
		showContent();
	};
};


// show TD content
showContent = function () {
	// get content of TD cells in right table
	var english = getContent('td21'),
		mathematics = getContent('td22'),
		kiswahili = getContent('td23'),
		physics = getContent('td24'),
		chemistry = getContent('td25'),
		biology = getContent('td31'),
		agriculture = getContent('td32'),
		business = getContent('td33'),
		history = getContent('td34'),
		geography = getContent('td35'),
		cre = getContent('td41'),
		computer_studies = getContent('td42'),
		french = getContent('td43'),
		german = getContent('td44'),
		art_and_design = getContent('td45');
};

// save
saveContent = function () {
	// get content of TD cells in right table
	var english = getContent('td21'),
	 mathematics = getContent('td22'),
	 kiswahili = getContent('td23'),
	 physics = getContent('td24'),
	 chemistry = getContent('td25'),
	 biology = getContent('td31'),
	 agriculture = getContent('td32'),
	 business = getContent('td33'),
	 history = getContent('td34'),
	 geography = getContent('td35'),
	 cre = getContent('td41'),
	 computer_studies = getContent('td42'),
	 french = getContent('td43'),
	 german = getContent('td44'),
	 art_and_design = getContent('td45');

    var content = '';

    if (english){
        content += '101:' + english;
        content += '_';
    }
    else{
        content += '101:' + '0';
        content += '_';
    }

    if (mathematics){
        content += '121:' + mathematics;
        content += '_';
    }
    else{
        content += '121:' + '0';
        content += '_';
    }

    if (kiswahili){
        content += '102:' + kiswahili;
        content += '_';
    }
    else{
        content += '102:' + '0';
        content += '_';
    }

    if (physics){
        content += '232:' + physics;
        content += '_';
    }
    else{
        content += '232:' + '0';
        content += '_';
    }

    if (chemistry){
        content += '233:' + chemistry;
        content += '_';
    }
    else{
        content += '233:' + '0';
        content += '_';
    }

    if (biology){
        content += '231:' + biology;
        content += '_';
    }
    else{
        content += '231:' + '0';
        content += '_';
    }

    if (agriculture){
        content += '443:' + agriculture;
        content += '_';
    }
    else{
        content += '443:' + '0';
        content += '_';
    }

    if (business){
        content += '565:' + business;
        content += '_';
    }
    else{
        content += '565:' + '0';
        content += '_';
    }

    if (history){
        content += '311:' + history;
        content += '_';
    }
    else{
        content += '311:' + '0';
        content += '_';
    }

    if (geography){
        content += '312:' + geography;
        content += '_';
    }
    else{
        content += '312:' + '0';
        content += '_';
    }

    if (cre){
        content += '313:' + cre;
        content += '_';
    }
    else{
        content += '313:' + '0';
        content += '_';
    }

    if (computer_studies){
        content += '451:' + computer_studies;
        content += '_';
    }
    else{
        content += '451:' + '0';
        content += '_';
    }

    if (french){
        content += '501:' + french;
        content += '_';
    }
    else{
        content += '501:' + '0';
        content += '_';
    }

    if (german){
        content += '502:' + german;
        content += '_';
    }
    else{
        content += '502:' + '0';
        content += '_';
    }

    if (art_and_design){
        content += '442:' + art_and_design;
        content += '_';
    }
    else{
        content += '442:' + '0';
        content += '_';
    }

    var class_id = document.getElementById("hidden-class");
	var term_id = document.getElementById("hidden-term");

    $.ajax({
        url: "/exams/ajax_assign_teachers_to_subjects",
        type: "POST",
        dataType: "html",
        data: {
            class_id : class_id.value,
		    term_id : term_id.value,
            content : content,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
        success: function (html) {
            window.location.reload();
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.status + ": " + xhr.responseText);
        }
    });
};

// get content (DIV elements in TD)
getContent = function (id) {
	var td = document.getElementById(id),
		content = '',
		cn, i;
	// TD can contain many DIV elements
	for (i = 0; i < td.childNodes.length; i++) {
		// set reference to the child node
		cn = td.childNodes[i];
		// childNode should be DIV with containing "drag" class name
		if (cn.nodeName === 'DIV' && cn.className.indexOf('drag') > -1) { // and yes, it should be uppercase
			// append DIV id to the result string
			content += cn.id + '_';
		}
	}
	// cut last '_' from string
	content = content.substring(0, content.length - 1);
	// return result
	return content;
};


// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}
