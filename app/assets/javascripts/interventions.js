jQuery(function() {

    if (jQuery("select#customer").val() == "") {
     jQuery("select#building option").remove();
     jQuery("select#battery option").remove();
     jQuery("select#column option").remove();
     jQuery("select#elevator option").remove();
     var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
     jQuery(row).appendTo("select#elevator");
     var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
     jQuery(row).appendTo("select#column");
     var row = "<option value=\"" + "" + "\">" + "Battery" + "</option>";
     jQuery(row).appendTo("select#battery");
     var row = "<option value=\"" + "" + "\">" + "Building" + "</option>";
     jQuery(row).appendTo("select#building");
     jQuery("select#building").hide();
     jQuery("select#battery").hide();
     jQuery("select#column").hide();
     jQuery("select#elevator").hide();

    }
    jQuery("select#customer").change(function() {
     var id_value_string = jQuery(this).val();
     if (id_value_string == "") {
      jQuery("select#building option").remove();
      jQuery("select#battery option").remove();
      jQuery("select#column option").remove();
      jQuery("select#elevator option").remove();
      var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
      jQuery(row).appendTo("select#elevator");
      var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
      jQuery(row).appendTo("select#column");
      var row = "<option value=\"" + "" + "\">" + "Battery" + "</option>";
      jQuery(row).appendTo("select#battery");
      var row = "<option value=\"" + "" + "\">" + "Building" + "</option>";
      jQuery(row).appendTo("select#building");
      jQuery("select#building").hide();
      jQuery("select#battery").hide();
      jQuery("select#column").hide();
      jQuery("select#elevator").hide();
     } else {
      // Send the request and update course dropdown
      jQuery.ajax({
       dataType: "json",
       cache: false,
       url: '/get_buildings_by_customer/' + id_value_string,
       timeout: 5000,
       error: function(XMLHttpRequest, errorTextStatus, error) {
        alert("Failed to submit : " + errorTextStatus + " ;" + error);
       },
       success: function(data) {
        // Clear all options from course select
        jQuery("select#building option").remove();
        //put in a empty default line
        var row = "<option value=\"" + "" + "\">" + "Building" + "</option>";
        jQuery(row).appendTo("select#building");
        // Fill course select
        jQuery.each(data, function(i, j) {
         row = "<option value=\"" + j.id + "\">" + j.building_administrator_name + "</option>";
         jQuery(row).appendTo("select#building");
        });
        jQuery("select#building").show();
        jQuery("select#battery").hide();
        jQuery("select#column").hide();
        jQuery("select#elevator").hide();
       }
      });
     }
    });
    jQuery("select#building").change(function() {
        var id_value_string = jQuery(this).val();
        if (id_value_string == "") {
         jQuery("select#battery option").remove();
         jQuery("select#column option").remove();
         jQuery("select#elevator option").remove();
         var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
         jQuery(row).appendTo("select#elevator");
         var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
         jQuery(row).appendTo("select#column");
         jQuery("select#elevator").hide();
         var row = "<option value=\"" + "" + "\">" + "Battery" + "</option>";
         jQuery(row).appendTo("select#battery");
         jQuery("select#battery").hide();
         jQuery("select#column").hide();
         jQuery("select#elevator").hide();
        } else {
         // Send the request and update course dropdown
         jQuery.ajax({
          dataType: "json",
          cache: false,
          url: '/get_batteries_by_building/' + id_value_string,
          timeout: 5000,
          error: function(XMLHttpRequest, errorTextStatus, error) {
           alert("Failed to submit : " + errorTextStatus + " ;" + error);
          },
          success: function(data) {
           // Clear all options from course select
           jQuery("select#elevator option").remove();
           var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
           jQuery(row).appendTo("select#elevator");
           jQuery("select#column option").remove();
           var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
           jQuery(row).appendTo("select#column");
           jQuery("select#battery option").remove();
           //put in a empty default line
           var row = "<option value=\"" + "" + "\">" + "Battery" + "</option>";
           jQuery(row).appendTo("select#battery");
           // Fill course select
           jQuery.each(data, function(i, j) {
            row = "<option value=\"" + j.id + "\">" + j.id + " - " + j.status + "</option>";
            jQuery(row).appendTo("select#battery");
           });
           jQuery("select#battery").show();
           jQuery("select#column").hide();
           jQuery("select#elevator").hide();
          }
         });
        }
       });
       jQuery("select#battery").change(function() {
        var id_value_string = jQuery(this).val();
        if (id_value_string == "") {
         jQuery("select#column option").remove();
         jQuery("select#elevator option").remove();
         var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
         jQuery(row).appendTo("select#elevator");
         var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
         jQuery(row).appendTo("select#column");
         jQuery("select#column").hide();
         jQuery("select#elevator").hide();
        } else {
         // Send the request and update course dropdown
         jQuery.ajax({
          dataType: "json",
          cache: false,
          url: '/get_columns_by_battery/' + id_value_string,
          timeout: 5000,
          error: function(XMLHttpRequest, errorTextStatus, error) {
           alert("Failed to submit : " + errorTextStatus + " ;" + error);
          },
          success: function(data) {
           // Clear all options from course select
           jQuery("select#elevator option").remove();
           var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
           jQuery(row).appendTo("select#elevator");
           jQuery("select#column option").remove();
           //put in a empty default line
           var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
           jQuery(row).appendTo("select#column");
           // Fill course select
           jQuery.each(data, function(i, j) {
            row = "<option value=\"" + j.id + "\">" + j.id + " - " + j.status + "</option>";
            jQuery(row).appendTo("select#column");
           });
           jQuery("select#column").show();
           jQuery("select#elevator").hide();
          }
         });
        }
       });
       jQuery("select#column").change(function() {
        var id_value_string = jQuery(this).val();
        if (id_value_string == "") {
         jQuery("select#elevator option").remove();
         var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
         jQuery(row).appendTo("select#elevator");
         jQuery("select#elevator").hide();
        } else {
         // Send the request and update course dropdown
         jQuery.ajax({
          dataType: "json",
          cache: false,
          url: '/get_elevators_by_column/' + id_value_string,
          timeout: 5000,
          error: function(XMLHttpRequest, errorTextStatus, error) {
           alert("Failed to submit : " + errorTextStatus + " ;" + error);
          },
          success: function(data) {
           // Clear all options from course select
           jQuery("select#elevator option").remove();
           //put in a empty default line
           var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
           jQuery(row).appendTo("select#elevator");
           // Fill course select
           jQuery.each(data, function(i, j) {
            row = "<option value=\"" + j.id + "\">" + j.id + " - " + j.status + "</option>";
            jQuery(row).appendTo("select#elevator");
           });
           jQuery("select#elevator").show();
          }
         });
        }
       });
   });