const tiyatro = function () {
    'use strict';
    let w = window,
        d = document,
        vid = false, // ?v=
        wide1 = false, // wide=1/0
        scrollmu, // scroll 0/1
        varCounter = 0, // count run,
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
        } else {
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
        console.log(vid + ' -  ' + wide1);
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
};
window.addEventListener('yt-navigate-finish', tiyatro);
