// clear all errors in form
function clear_errors($form) {
    $form.find('.errorlist').remove();
}

function show_message(message) {
    if (message != '' && message != null) {
        var html = '<div class="alert alert-success" >';
        html += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        html += message;
        html += '</div>';
        $(".django-messages .msg-container").html(html);
    } else {
        $(".django-messages .msg-container").html('');
    }
}


// show full loading and block the page
function show_loading() {
    $("#loading").removeClass('hide');
}

// hide full loading and unblock the page
function hide_loading() {
    $("#loading").removeClass('hide');
    $("#loading").addClass('hide');
}

// show form error from django backend
function show_error_form($form, success, message, errors) {
    clear_errors($form);
    if (success) {
        //show_message(message);
    } else {
        $.each(errors, function (key, values) {
            var field_selector = '';
            if (key == '__all__') {
                field_selector = '.' + key;
            } else {
                field_selector = '[name=' + key + ']';
            }
            var field_errors = values;
            var html = '<ul class="errorlist">';

            for (var j = 0; j < field_errors.length; j++) {
                html += '<li>' + field_errors[j] + '</li>';
            }
            html += '</ul>';
            $form.find(field_selector).after(html);
        });
    }
}

function hide_django_messsages() {
    if ($(".django-messages .msg-container").has("div").length) {
        setTimeout(function () {
            $('.django-messages .msg-container .alert').fadeOut('slow');
        }, 500000);
    }
}


function show_description_notification_hq(notification_id) {
    $.getJSON(URL_JSON_NOTIFICATION, {notification_id: notification_id}, function (data) {
        $('#notification-verb').html(data.verb);
        $('#notification-description').html(data.description);
        $('#notification-level').addClass('bg-' + data.level);
        $('#notification-modal').modal('show');
    });
}

function format_bytes(bytes, decimals) {
    if (bytes == 0) return '0 Byte';
    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function filter_field($datatable, column, selector_field) {
    $(selector_field).on('change', function () {
        var value = $(this).val();
        $datatable.fnFilter(value, column);
    });
}

$(document).ready(function () {

    /******************************************************************************
     focus username on login page (on load)
     *******************************************************************************/
    $("#id_username").focus().select();


    /******************************************************************************
     Hide django msgs after a while
     *******************************************************************************/
    //hide_django_messsages();


    /******************************************************************************
     Accordion icons event
     *******************************************************************************/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).parent().find(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
    }).on('hidden.bs.collapse', function () {
        $(this).parent().find(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");
    });

    $("input.all").on("change", function (e) {
        $('input[type="checkbox"]').prop("checked", $(this).is(":checked"))
    });

    /******************************************************************************
     File input
     *******************************************************************************/
    // initialize input file js plugin with defaults
    $(".input-file").fileinput({
        maxFileSize: 4000,
        showPreview: false,
        showUpload: false,
        uploadAsync: true,
        allowedFileExtensions: ["xls", "xlsx", "csv"],
        browseClass: "btn btn-primary",
        removeClass: "btn btn-danger",
        uploadClass: "btn btn-success",
        language: LANGUAGE_CODE
    });

    $(".input-file-evidence").fileinput({
        maxFileSize: 4000,
        showPreview: false,
        showUpload: false,
        showRemove: false,
        uploadAsync: true,
        allowedFileExtensions: ["pdf"],
        browseClass: "btn btn-primary",
        removeClass: "btn btn-danger",
        uploadClass: "btn btn-success",
        language: LANGUAGE_CODE
    });

    $(".input-file-xlsx").fileinput({
        maxFileSize: 4000,
        showPreview: false,
        showUpload: false,
        showRemove: false,
        uploadAsync: true,
        allowedFileExtensions: ["xlsx"],
        browseClass: "btn btn-primary",
        removeClass: "btn btn-danger",
        uploadClass: "btn btn-success",
        language: LANGUAGE_CODE
    });
    /******************************************************************************
     Show description notification hq
     *******************************************************************************/

    $('.notification-hq').click(function () {
        show_description_notification_hq($(this).data('notification-id'));
    });

    /******************************************************************************
     Datatables
     *******************************************************************************/

    $('.table-datatable').DataTable({
        "autoWidth": false,
        "order": [[0, 'desc']],
        "language": {
            "url": "/static/js/datatable-" + LANGUAGE_CODE + ".json"
        }
    });

    $('.table-datatable-5').DataTable({
        autoWidth: false,
        pagingType: 'simple',
        "iDisplayLength": 8,
        language: {
            "url": "/static/js/datatable-" + LANGUAGE_CODE + ".json"
        }
    });


    $("#main_menu.nav.navbar-nav li").each(function () {
        href = $(this).children().attr('href');
        if (window.location.pathname.indexOf(href) != -1) {
            $("#main_menu.nav.navbar-nav li").removeClass('active');
            $(this).addClass('active');
            return;
        }

    });

    /******************************************************************************
     Two col select
     *******************************************************************************/
    $('#select-2-cols-states').multiSelect({
        selectableHeader: "<div class='custom-header'><div>Available states</div><div class='input-group'><span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span><input class='form-control search-input' autocomplete='off' type='text' placeholder='Type text to search'</div></div>",
        selectionHeader: "<div class='custom-header'><div>Chosen states</div><div class='input-group'><span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span><input class='form-control search-input' autocomplete='off' type='text' placeholder='Type text to search'</div></div>",
        selectableFooter: "<div class='custom-footer'><a href='#' id='select-all-states'><i class='fa fa-check-square-o'></i> Click here to select all</a></div>",
        selectionFooter: "<div class='custom-footer'><a href='#' id='deselect-all-states'><i class='fa fa-square-o'></i> Click here to deselect all</a></div>",
    });
    //Select and Deselect all items on the list
    $('#select-all-states').click(function () {
        $('#select-2-cols-states').multiSelect('select_all');
        return false;
    });
    $('#deselect-all-states').click(function () {
        $('#select-2-cols-states').multiSelect('deselect_all');
        return false;
    });
});

$(document).ready(function () {

    $(function () {
        $('.input-date').datetimepicker({
            format: 'YYYY/MM/DD'
        });
    });
    $('#multiselect').multiselect();

    $('#myTable').DataTable({
        "language": {
            "url": "/static/js/datatable-" + LANGUAGE_CODE + ".json"
        }
    });

    $('.select').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        buttonWidth: '100%'
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('.checkbox_protocol_invoices').click(function (e) {
            if (this.checked) {
                $("#table_invoice_list").find("tr:contains('N/A')").hide();
            } else {
                $("#table_invoice_list").find("tr:contains('N/A')").show();
            }
        }
    );

    $('.checkbox_protocol_invoices').click(function (e) {
            if (this.checked) {
                $("#table_invoice_list").find("tr:contains('N/A')").hide();
            } else {
                $("#table_invoice_list").find("tr:contains('N/A')").show();
            }
        }
    );

    $('.checkbox_panalpina_invoices').click(function (e) {
            if (this.checked) {
                $("#table_invoice_list").find("tr:contains('MOS')").hide();
            } else {
                $("#table_invoice_list").find("tr:contains('MOS')").show();
            }
        }
    );

    $('.checkbox_alert_invoices').click(function (e) {
            if (this.checked) {
                $("#table_invoice_list").find("tr:contains('Alert')").show();
                $("#table_invoice_list").find("tr:contains('MOS')").hide();
            } else {
                $("#table_invoice_list").find("tr:contains('Alert')").show();
            }
        }
    );

    $('.checkbox_alert_invoices').click(function (e) {
            if (this.checked) {
                $("#table_invoice_list").find("tr:contains('MOS')").hide();
                $("#table_invoice_list").find("tr:contains('Alert')").show();
            } else {
                $("#table_invoice_list").find("tr:contains('MOS')").show();
                $("#table_invoice_list").find("tr:contains('Alert')").show();
            }
        }
    );

    /******************************************************************************
     Allow active in dropdown navbar option
     *******************************************************************************/
    $('.active').closest('li.dropdown').addClass('active');
});