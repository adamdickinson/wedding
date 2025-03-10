(function () {
    'use strict';

    $(window).on('load', function () {
        $('.loader').delay(600).fadeOut('slow');
        setTimeout(function () {
            $('.cover .display-tc').addClass('fade-in-up');
        }, 800);
    });

    document.addEventListener('DOMContentLoaded', function () {
        const navbar = document.getElementById('navbar');
        const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasNavbar');

        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                document.getElementById('navbar').classList.add('fixed-top');
            } else {
                document.getElementById('navbar').classList.remove('fixed-top');
            }
        });

        navbar.addEventListener('click', function (e) {
            if (e.target.classList.contains('nav-link')) {
                bsOffcanvas.hide();
            }
        });
    });

    // Form
    var contactForm = function () {
        document.querySelectorAll('.form-control').forEach((formControl) => {
            const label = formControl.nextElementSibling
            if (label) label.classList[formControl.value.length ? 'add' : 'remove']('filled');
        });

        var contactForm = document.querySelector('#contact-form');
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
                .then(() => {
                    contactForm.remove();
                    document.querySelector('#form-success').classList.remove('d-none');
                })
                .catch(error => {
                    contactForm.querySelector('.error-container').classList.remove('d-none');
                    contactForm.querySelector('.error-message').innerHTML = error.message;
                });
        });
    };

    // Content way point
    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(
            function (direction) {
                if (
                    direction === 'down' &&
                    !$(this.element).hasClass('animated-fast')
                ) {
                    i++;
                    $(this.element).addClass('item-animate');
                    setTimeout(function () {
                        $('body .animate-box.item-animate').each(function (k) {
                            var el = $(this);
                            setTimeout(
                                function () {
                                    var effect = el.data('animate-effect');
                                    if (effect === 'fade-in') {
                                        el.addClass('fade-in animated-fast');
                                    } else if (effect === 'fade-in-left') {
                                        el.addClass(
                                            'fade-in-left animated-fast'
                                        );
                                    } else if (effect === 'fade-in-right') {
                                        el.addClass(
                                            'fade-in-right animated-fast'
                                        );
                                    } else {
                                        el.addClass('fade-in-up animated-fast');
                                    }
                                    el.removeClass('item-animate');
                                },
                                k * 200,
                                'easeInOutExpo'
                            );
                        });
                    }, 100);
                }
            },
            { offset: '85%' }
        );
    };

    // Testimonials
    var testimonialCarousel = function () {
        var owl = $('.owl-carousel-fullwidth');
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            responsiveClass: true,
            nav: false,
            dots: true,
            smartSpeed: 800,
            autoHeight: true,
        });
    };

    // Counter
    var counter = function () {
        $('.js-counter').countTo({
            formatter: function (value, options) {
                return value.toFixed(options.decimals);
            },
        });
    };

    var counterWayPoint = function () {
        if ($('#counter').length > 0) {
            $('#counter').waypoint(
                function (direction) {
                    if (
                        direction === 'down' &&
                        !$(this.element).hasClass('animated')
                    ) {
                        setTimeout(counter, 400);
                        $(this.element).addClass('animated');
                    }
                },
                { offset: '90%' }
            );
        }
    };

    // Countdown
    var countdown = function () {
        var countdown = document.querySelector('.countdown');

        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                total: t,
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            };
        }

        function initializeClock(id, endtime) {
            var clock = document.getElementById(id);
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');
            var newChild;

            function updateClock() {
                var t = getTimeRemaining(endtime);
                var daysArr = String(t.days).split('');
                daysSpan.innerHTML = '';
                for (var i = 0; i < daysArr.length; i++) {
                    newChild = document.createElement('span');
                    newChild.innerHTML = daysArr[i];
                    daysSpan.appendChild(newChild);
                }
                var hoursArr = String(('0' + t.hours).slice(-2)).split('');
                hoursSpan.innerHTML = '';
                for (var i = 0; i < hoursArr.length; i++) {
                    newChild = document.createElement('span');
                    newChild.innerHTML = hoursArr[i];
                    hoursSpan.appendChild(newChild);
                }
                var minuteArr = String(('0' + t.minutes).slice(-2)).split('');
                minutesSpan.innerHTML = '';
                for (var i = 0; i < minuteArr.length; i++) {
                    newChild = document.createElement('span');
                    newChild.innerHTML = minuteArr[i];
                    minutesSpan.appendChild(newChild);
                }
                var secondArr = String(('0' + t.seconds).slice(-2)).split('');
                secondsSpan.innerHTML = '';
                for (var i = 0; i < secondArr.length; i++) {
                    newChild = document.createElement('span');
                    newChild.innerHTML = secondArr[i];
                    secondsSpan.appendChild(newChild);
                }
                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }
            }
            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }
        // set your wedding date here
        var deadline = 'February 21 2026 14:30:00 GMT+1000';
        if (countdown) {
            initializeClock('timer', deadline);
        }
    };

    function refreshGuests() {
        var guestForms = document.querySelectorAll('.add-guest-form');
        const showButton = guestForms.length > 1
        guestForms.forEach((guestForm, index) => {
            // var guestNumber = index + 1
            guestForm.querySelector('button').style.display = showButton ? 'block' : 'none';
            guestForm.querySelector('.form-field').className = `form-field col-sm-${showButton ? 4 : 7}`;
            // guestForm.querySelectorAll('label').forEach((label, labelIndex) => {
            //     if (labelIndex === 0) {
            //         label.innerHTML = `Guest ${guestNumber} name`;
            //         label.setAttribute('for', `guest-${guestNumber}-name`)
            //     }
            //     if (labelIndex === 1) {
            //         label.setAttribute('for', `guest-${guestNumber}-requirements`)
            //     }
            // })
            // guestForm.querySelectorAll('input').forEach((input, inputIndex) => {
            //     if (inputIndex === 0) input.name = `guest-${guestNumber}-name`
            //     if (inputIndex === 1) input.name = `guest-${guestNumber}-requirements`
            // })
        });
    };

    function removeGuest(event, guestForm) {
        event.preventDefault();
        guestForm.remove();
        refreshGuest();
    };

    function addGuest() {
        // Prepare template row
        var blankGuestForm = document.querySelector('.add-guest-form').cloneNode(true);
        blankGuestForm.querySelectorAll('input').forEach((input) => { input.value = ''; });

        var addGuestButton = document.querySelector('#add-guest')
        addGuestButton.addEventListener('click', (event) => {
            event.preventDefault();
            var lastGuestForm = [...document.querySelectorAll('.add-guest-form').values()].pop();
            let newGuestForm = blankGuestForm.cloneNode(true);
            lastGuestForm.insertAdjacentElement('afterend', newGuestForm);
            newGuestForm.querySelector('button').addEventListener('click', (event) => removeGuest(event, newGuestForm));

            newGuestForm.querySelectorAll('.form-control').forEach((formControl) => {
                const label = formControl.nextElementSibling
                if (label) {
                    label.classList[formControl.value.length ? 'add' : 'remove']('filled');
                    function checkLabel () {
                        var shouldFloat = formControl === document.activeElement || formControl.value.length;
                        label.classList[shouldFloat ? 'add' : 'remove']('filled');
                    };
                    formControl.addEventListener('change', checkLabel);
                    formControl.addEventListener('focus', checkLabel);
                    formControl.addEventListener('blur', checkLabel);
                }
            });

            refreshGuests();
        });

        var guestForms = document.querySelectorAll('.add-guest-form');
        guestForms.forEach((guestForm) => {
            guestForm.querySelector('button').addEventListener('click', (event) => removeGuest(event, guestForm))

        });

        document.querySelectorAll('.form-control').forEach((formControl) => {
            const label = formControl.nextElementSibling
            if (label) {
                label.classList[formControl.value.length ? 'add' : 'remove']('filled');
                function checkLabel () {
                    var shouldFloat = formControl === document.activeElement || formControl.value.length;
                    label.classList[shouldFloat ? 'add' : 'remove']('filled');
                };
                formControl.addEventListener('change', checkLabel);
                formControl.addEventListener('focus', checkLabel);
                formControl.addEventListener('blur', checkLabel);
            }
        });
    };

    var isotope = function () {
        var $container = $('.grid');

        $container.imagesLoaded(function () {
            $container.isotope({
                // options
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    // use element for option
                    columnWidth: '.grid-sizer',
                },
                getSortData: {
                    moments: '.moments', // text from querySelector
                    category: '[data-category]',
                    weight: function (itemElem) {
                        // function
                        var weight = $(itemElem).find('.weight').text();
                        return parseFloat(weight.replace(/[\(\)]/g, ''));
                    },
                },
            });
        });

        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function () {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) > 50;
            },
            // show if name ends with -ium
            ium: function () {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            },
        };
        // bind filter button click
        $('.filters-button-group').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $container.isotope({ filter: filterValue });
        });
        // change is-checked class on buttons
        $('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });
    };

    $(function () {
        contentWayPoint();
        testimonialCarousel();
        counter();
        counterWayPoint();
        countdown();
        addGuest();
        isotope();
        contactForm();
        refreshGuests();
    });
})();
