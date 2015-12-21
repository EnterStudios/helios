$(document).ready(function () {

    var options = {
        color: 'white',
        strokeWidth: 5,
        duration: 2000,
        easing: 'bounce'
    };

    var circle = new ProgressBar.Circle('#design', options);

    circle.animate(0.7);

    var circle = new ProgressBar.Circle('#usertests', options);

    circle.animate(0.4);

    var circle = new ProgressBar.Circle('#development', options);

    circle.animate(0.2);

    var circle = new ProgressBar.Circle('#marketing', options);

    circle.animate(0.2);


// registration

    var errorBorder = {'border-bottom': "1.5px solid #FF0000"};
    var normalBorder = {'border-bottom': "1px solid #404040"};

    $(".submit").click(function (event) {
        event.preventDefault();

        var $form = $("#registration");
        var mail = $form.find('input[name="email"]');

        mail.css(normalBorder);

        if (!mail.val() || !(/[^\s@]+@[^\s@]+\.[^\s@]+/).test(mail.val())) {
            mail.css(errorBorder);
            return;
        }

        var register = {
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

        }, 4000)

    }
});