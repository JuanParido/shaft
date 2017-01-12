/*
 This controller will translate the dropdown selection into the select hidden of the
 form of searching. Also will copy all the searchbox in the keyword input in the hidden form.
 for make searching.

 THIS SHOULD BE CHANGED AFTER A BETTER SOLUTION.
 */

$(function () {
    (function () {
        var _actual_name = 'Select filter';
        var _default = 'Select filter';
        $('.search_option').click(function (evt) {
            evt.preventDefault();

            // Delete all selected to set a new selected option in the hidden form
            var options = $('#content_type').children('option');

            for (var i = 0; i < options.length; i++) {
                $(options[i]).prop('selected', false);
            }

            // Set memory name on the dropdown

            var name = $(this).children('a:first').data('name');
            if (name.trim() != '') {
                _actual_name = name;
            } else {
                _actual_name = _default;
            }


            // Set the properly selected in the option of the search form hidden
            var value = $(this).children('a:first').data('value');
            $('option[value="' + value + '"]').prop('selected', true);

            $('#dropdown_select').html(_actual_name + ' <span class="caret"></span>')
        });

        // If some searcher is selected by default
        var _if_selected = $('a[data-selected="true"]');
        if (_if_selected.length > 0) {
            _actual_name = _if_selected.data('name');
            $('#dropdown_select').html(_actual_name + ' <span class="caret"></span>')
        }


        // Set event on button search. Also enter will submit on enter in input.
        $('#bs_search_button').click(function(evt){
            evt.preventDefault();
            if(_actual_name == 'Select filter'){
                $('#bs_search_button')
                    .removeClass('btn-default')
                    .addClass('btn-danger')
                    .data('toggle','tooltip')
                    .attr('title','Please select a filter first...')
                    .tooltip()
                    .mouseenter()

            }else{
                $("#search_form").submit();
            }
        })

    })();
});
