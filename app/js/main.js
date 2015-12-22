$(document).ready(function () {

    var options = {
        color: 'white',
        strokeWidth: 5,
        duration: 2000,
        easing: 'bounce'
    };

    var circle = new ProgressBar.Circle('#design', options);

    circle.animate(0.7);

    circle = new ProgressBar.Circle('#usertests', options);

    circle.animate(0.4);

    circle = new ProgressBar.Circle('#development', options);

    circle.animate(0.2);

    circle = new ProgressBar.Circle('#marketing', options);

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

        var fadoutPromise = jQuery.Deferred();
        
        $form.fadeOut(function () {
            $(".loading-spinner").fadeIn();

            setTimeout(function () {
                fadoutPromise.resolve();
            }, 2000)
        });

        var register = {
            mail: mail.val()
        };

        var requestPromise = $.ajax({
            type: 'POST',
            url: '/mail/register',
            contentType: 'application/json',
            data: JSON.stringify(register),
            success: registrationSuccess,
            error: registrationError,
            processData: false
        });

        $.when(requestPromise, fadoutPromise)
            .done(function () {
                registrationSuccess();
            })
            .fail(function (response) {
                // wait for fadout promise
                fadoutPromise
                    .then(function () {
                        registrationError(response.status);
                    })
                    .fail(function () {
                        registrationError(undefined);
                    })
            });
    });

    function registrationSuccess() {
        $(".loading-spinner").fadeOut(function () {
            $(".success").fadeIn("thanks");
        });

    }

    function registrationError(status) {
        var err = (status === 409 ? 'conflict' : 'generic');

        $(".loading-spinner").fadeOut(function () {
            $(".error").addClass(err).fadeIn();
        });

        setTimeout(function () {
            $(".error").removeClass(err).fadeOut(function () {
                $("#registration").fadeIn();
            });

        }, 4000)

    }
});