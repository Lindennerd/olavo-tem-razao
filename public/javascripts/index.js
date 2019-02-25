(function () {
    $('#random-generate').click(function () {
        $.get('/generator').then(function (result) {
            $('#result').attr('src', result);
            $('#result').show();
        })
    });

    $('#manual-generate').click(function () {
        var data = {};
        $('input[type="radio"]:checked').each(function (index, val) { 
            data[val.name] = val.value; 
        }).get();

        $.get('/generator', data).then(function (result) {
            $('#result').attr('src', result);
            $('#result').show();
        })
    })


})(jQuery);