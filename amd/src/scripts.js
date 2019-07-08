define(['jquery', 'jqueryui', 'block_elbp/scripts', 'block_gradetracker/grids'], function($, ui, elbp, grids) {

  var elbp = elbp.scripts;
  var config = {};

  config.init = function(data){

    // Bind elements
    config.bindings(data);

  }

  config.bindings = function(data){

    // Set student ID onto elbp object
    elbp.studentID = data.studentID;


    // Clone the PP content, Remove all moodle content, then insert PP content back in
    let content = $('#wrapper').clone();
    $('body > div').remove();
    $('#page-footer').remove();
    $('body').append(content);
    // $('#page-wrapper').show();


    $('.datePicker').datepicker({
        dateFormat: data.dateFormat,
        changeYear: true,
        changeMonth: true,
        yearRange: "-100:+0"
    });

    $('.datePicker').attr('placeholder', data.dateFormat);
    $('.tooltip').tooltip();

    // Change images on hover
    $('.pp_change_image').off('mouseover');
    $('.pp_change_image').on('mouseover', function(e){

      var img = $(this).attr('on');
      $(this).attr('src', 'pix/'+img);

    });

    $('.pp_change_image').off('mouseout');
    $('.pp_change_image').on('mouseout', function(e){

      var img = $(this).attr('off');
      $(this).attr('src', 'pix/'+img);

    });

    // Delete request
    $('.pp_delete_request').off('click');
    $('.pp_delete_request').on('click', function(e){

      var studentID = $(this).attr('student');
      var confirm = window.confirm("Are you sure you want to delete/cancel this request?");
      if (confirm === true){
          window.location = M.cfg.wwwroot + '/local/parentportal/index.php?action=deleterequest&sID='+studentID;
          return;
      }

      e.preventDefault();

    });

    // Timetable
    // If we loaded up from the full.php page, build it straight away
    if ( $('#elbp_tt_content').length ){
      elbp.Timetable.load_calendar('week');
    }

    // GT bindings
    grids.scripts.student_bindings();

    // Screw the rest of it, if i'm going to do a new PP anyway, just leave it in old functions. It works.




    $('.class').off('click');
    $('.class').on('click', function(e){



      e.preventDefault();

    });

  }




  var client = {};

  //-- Log something to console
  client.log = function(log){
      console.log('[PP] ' + new Date().toTimeString().split(' ')[0] + ': ' + log );
  }

  //-- Initialise the scripts
  client.init = function(data) {

    // Bindings
    config.init(data);

    client.log('Loaded scripts.js');

  }

  // Return client object
  return client;


});