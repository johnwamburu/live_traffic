/* This is how I sort them exam items */

var $container = $('#container');
// init
$container.isotope({
  // options
  itemSelector: '.news-item',
  layoutMode: 'fitRows'
});

//$container.isotope({ filter: '.metal' });

// bind filter button click
  $('#filters').on( 'click', 'button', function() {alert('john');
    var filterValue = $( this ).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });

$(document).ready(function () {
var $container = $('#container');
// init
$container.isotope({
  // options
  //itemSelector: '.news-item',
  //layoutMode: 'fitRows'
});
alert('john');
});
