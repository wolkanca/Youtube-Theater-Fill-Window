const tiyatro = function () {
    'use strict';
    let w = window,
        d = document,
        vid = false, // ?v=
        wide1 = false, // wide=1/0
        scrollmu, // scroll 0/1
        varCounter = 0, // count run,
        masthead,
        html = d.getElementsByTagName('html')[0],
        body = d.body,
        t = 'tiyatro',
        v = 'v',
        st = 'scrolltop';

    setInterval(() => {
        if (w.location.search) {
            vid = true;
        } else {
            vid = false;
        }
        if (document.cookie.indexOf('wide=1') != -1) {
            wide1 = true;
            masthead = d.getElementById('masthead-container');
        } else {
            masthead = d.getElementById('copyright');
            wide1 = false;
        }
    }, 1);

    setTimeout(() => {
        if (varCounter <= 1) {
            varCounter++;
            if (vid) {
                html.classList.add(v);
            } else {
                html.classList.remove(v), html.classList.remove(t);
            }
            if (wide1) {
                html.classList.add(t);
            } else {
                html.classList.remove(v), html.classList.remove(t);
            }
            if (vid && wide1) {
                html.classList.add(t);
            } else {
                html.classList.remove(t);
            }
            clearInterval();
        }
    }, 10);

    cookieStore.addEventListener('change', ({ changed }) => {
        for (let { name, value } of changed) {
            if (value === '1') {
                html.classList.add(v),
                    html.classList.add(t),
                    body.classList.add(st);
            } else if (value === '0') {
                html.classList.remove(v),
                    html.classList.remove(t),
                    body.classList.remove(st);
            }
        }
    });
    w.addEventListener('scroll', function () {
        //console.log(vid + ' -  ' + wide1);
        if (vid && wide1) {
            if (w.scrollY == 0) {
                scrollmu = 0;
                body.classList.add(st);
            } else {
                scrollmu = 1;
                body.classList.remove(st);
            }
        }
    });

    const mouse = function (element, delay, callback) {
        // Counter Object
        element.ms = {};

        // Counter Value
        element.ms.x = 0;

        // Counter Function
        element.ms.y = function () {
            // Callback Trigger
            if (++element.ms.x == delay)
                element.ms.callback(element, element.ms);
        };

        // Counter Callback
        element.ms.callback = callback;

        // Function Toggle
        element.ms.toggle = function (state) {
            // Stop Loop
            if ([0, 'off'][state]) clearInterval(element.ms.z);

            // Create Loop
            if ([1, 'on'][state]) element.ms.z = setInterval(element.ms.y, 1);
        };

        // Function Disable
        element.ms.remove = function () {
            // Delete Counter Object
            element.ms = null;
            return delete element.ms;
        };

        // Function Trigger
        element.onmousemove = function () {
            // Reset Counter Value
            element.ms.x = -1;
        };

        // Return
        return element.ms;
    };

    setTimeout(() => {
        if (vid && wide1) {
            let x = mouse(w, 1000, function (a) {
                masthead.style.display = 'none';
            });
            x.toggle(1);
            addEventListener('mousemove', function () {
                masthead.style.display = 'block';
            });
        }
    }, 1000);
};
window.addEventListener('yt-navigate-finish', tiyatro);
