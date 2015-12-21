$(document).ready(function () {


// registration

    var errorBorder = {border: "1.5px solid #FF0000"};
    var normalBorder = {border: "1px solid #e6e6e6"};

    $(".submit").click(function (event) {
        event.preventDefault();

        var $form = $("#registration");
        var name = $form.find('input[name="name"]');
        var mail = $form.find('input[name="email"]');

        name.css(normalBorder);
        mail.css(normalBorder);

        if (!mail.val() || !(/[^\s@]+@[^\s@]+\.[^\s@]+/).test(mail.val())) {
            mail.css(errorBorder);
            return;
        }

        var register = {
            name: name.val(),
            mail: mail.val()
        };

        $.ajax({
            type: 'POST',
            url: '/mail/register',
            contentType: 'application/json',
            data: JSON.stringify(register),
            success: registrationSuccess,
            error: registrationError,
            processData: false
        });
    });

    function registrationSuccess() {
        $("#registration").fadeOut(function () {
            $(".success").fadeIn("thanks");
        });

    }

    function registrationError(resp) {
        var err = (resp.status === 409 ? 'conflict' : 'generic');

        $("#registration").fadeOut(function () {
            $(".error").addClass(err);
        });

        setTimeout(function () {
            $(".error").removeClass(err).fadeOut(function () {
                $("#registration").fadeIn();
            });

        }, 2000)

    }
});