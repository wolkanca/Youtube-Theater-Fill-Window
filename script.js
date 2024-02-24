/*
Youtube Theater Fill Window
A script to make the theater mode in youtube videos better and big enough to cover the window. - Youtube videolarında tiyatro modunu daha iyi ve pencereyi kaplayacak şekilde büyük hale getirmek için bir script
https://github.com/wolkanca/Youtube-Theater-Fill-Window
Volkan Yılmaz - wolkanca.com
*/

const tiyatro = function () {
    'use strict';
    const w = window;
    const d = document;
    const search = new URLSearchParams(w.location.search);
    const vid = search.get('v');
    const roothtml = d.getElementsByTagName('html')[0];
    const body = d.body;
    const t = 'tiyatro';
    const wtoggle = function (e) {
        roothtml.classList.toggle(t);
    };
    if (vid) {
        roothtml.classList.add('vid');
        body.classList.add('scrolltop');
        cookieStore.addEventListener('change', ({ changed }) => {
            for (const { name, value } of changed) {
                //console.log(`${name} was set to ${value}`);
                if (name === 'wide') {
                    if (value === '1') {
                        console.log('wide 1');
                        roothtml.classList.add(t);
                    } else {
                        console.log('wide 0');
                        roothtml.classList.remove(t);
                    }
                }
            }
        });
        setTimeout(() => {
            function getCookie(name) {
                const value = `; ${d.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            }
            const wide = getCookie('wide');
            if (wide === '1') {
                roothtml.classList.add(t);
                //console.log(wide);
                body.classList.add('scrolltop');
                w.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 900);
        w.addEventListener('scroll', function () {
            if (w.scrollY == 0) {
                body.classList.add('scrolltop');
            } else {
                body.classList.remove('scrolltop');
            }
        });
    } else {
        roothtml.classList.remove('vid');
        roothtml.classList.remove(t);
        body.classList.remove('scrolltop');
    }
};
window.addEventListener('yt-navigate-finish', tiyatro);
tiyatro();
