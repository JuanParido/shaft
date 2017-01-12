// DO NOT ALTER THIS FILE. THIS IS PART OF THE ZINA THEME AND IS NEED IT TO
// MAKE FRAMEWORK WORKS PROPERLY

$(document).ready(function () {


    /******************************************************************************
    Accordion icons event
    *******************************************************************************/
	$('.collapse').on('shown.bs.collapse', function(){
		$(this).parent().find(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
	}).on('hidden.bs.collapse', function(){
		$(this).parent().find(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");
	});

    /******************************************************************************
    Tooltips
    *******************************************************************************/
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    /******************************************************************************
    File input
    *******************************************************************************/
    // initialize input file js plugin with defaults
    // $(".input-file").fileinput({
    //     maxFileSize: 4000,
    //     showPreview: false,
    //     showUpload: false,
    //     showRemove: false,
    //     uploadAsync: true,
    //     browseClass: "btn btn-primary",
    //     removeClass: "btn btn-danger",
    //     uploadClass: "btn btn-success"
    // });

});

function load_button_checkbox(){
    $('.button-checkbox_option_group').each(function () {
        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $checkbox.prop('checked', false);
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');

            }
        }

        // Initialization
        function init() {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
}
