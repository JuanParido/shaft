$(function () {
    $('#datetimepicker-start-date').datetimepicker({
        useCurrent: false, //Important! See issue #1075
        format: 'YYYY-MM-DD'
    });
    $('#datetimepicker-end-date').datetimepicker({
        useCurrent: false, //Important! See issue #1075
        format: 'YYYY-MM-DD'
    });

    $("#datetimepicker-start-date").on("dp.change", function (e) {
        $('#datetimepicker-end-date').data("DateTimePicker").minDate(e.date);
    });

    $("#datetimepicker-end-date").on("dp.change", function (e) {
        $('#datetimepicker-start-date').data("DateTimePicker").maxDate(e.date);
    });
});