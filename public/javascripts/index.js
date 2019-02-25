(function () {
    var $randomButton = $('#random-generate');
    var $manualButton = $('#manual-generate');
    
    $randomButton.click(function () {
        startLoadingButton($randomButton);
        $.get('/generator').then(function (result) {
            $('#result').attr('src', result);
            $('#result').show();

            stopLoadingButton($randomButton);
        })
    });
    
    $manualButton.click(function () {
        var data = {};
        $('input[type="radio"]:checked').each(function (index, val) { 
            data[val.name] = val.value; 
        }).get();

        startLoadingButton($manualButton);

        $.get('/generator', data).then(function (result) {
            $('#result').attr('src', result);
            $('#result').show();
            
            stopLoadingButton($manualButton);
        })
    });

    function startLoadingButton(button) {
        var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Carregando...';
        if(button.html() !== loadingText) {
            button.data('original-text', button.html());
            button.html(loadingText);
        }
    }

    function stopLoadingButton(button) {
        button.html(button.data('original-text'));
    }


})(jQuery);