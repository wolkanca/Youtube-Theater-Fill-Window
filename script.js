/*
Youtube Theater Fill Window v2.3
A script to make the theater mode in youtube videos better and big enough to cover the window. - Youtube videolarında tiyatro modunu daha iyi ve pencereyi kaplayacak şekilde büyük hale getirmek için bir script. 
https://wolkanca.com/youtube-theater-mode-fix/
Volkan Yılmaz - wolkanca.com
*/

(function () {
    'use strict';
    let w = window,
        d = document,
        html = d.getElementsByTagName('html')[0],
        V = new URL(document.location).searchParams.get('v');

    const tiyatro = function () {
        let V = new URL(document.location).searchParams.get('v'),
            ytdapp = d.getElementsByTagName('ytd-app')[0],
            ytdwatchflexy = d.getElementsByTagName('ytd-watch-flexy')[0],
            wide = cookieStore.get('wide'),
            F,
            T,
            D,
            S,
            L;

        const toggle = function (e) {
            if (e == '1') {
                html.classList.add('tiyatro');
                d.body.classList.add('no-scroll');
                ytdapp.setAttribute('scrolling', ''),
                    ytdapp.setAttribute('masthead-hidden', ''),
                    ytdapp.setAttribute(
                        'style',
                        '--ytd-app-fullerscreen-scrollbar-width: 17px; --ytd-masthead-height: 0px; --ytd-network-status-banner-display: none;'
                    );
                localStorage.setItem('theater', '1');
                window.dispatchEvent(new Event('resize'));
                //console.log('tiyatro');
            } else {
                if (!F) {
                    html.classList.remove('tiyatro');
                    d.body.classList.remove('no-scroll');
                    ytdapp.removeAttribute('scrolling', ''),
                        ytdapp.removeAttribute('masthead-hidden'),
                        ytdapp.removeAttribute('style');
                }
                localStorage.removeItem('theater');
                //console.log('tiyatro değil');
            }
        };

        if (V) {
            if (ytdwatchflexy.hasAttribute('fullscreen')) {
                F = true;
                T = false;
                D = false;
            } else if (ytdwatchflexy.hasAttribute('theater')) {
                F = false;
                T = true;
                D = false;
            } else if (ytdwatchflexy.hasAttribute('default-layout')) {
                F = false;
                T = false;
                D = true;
            }

            if (ytdwatchflexy.hasAttribute('flexy-large-window_')) {
                L = true;
                S = false;
            } else if (ytdwatchflexy.hasAttribute('flexy-small-window_')) {
                L = false;
                S = true;
            }
        }

        if (T && !F) {
            toggle('1');

            if (L) {
                html.classList.add('l');
            } else if (S) {
                html.classList.add('s');
            }
        } else {
            toggle('0');
            T = false;
        }

        cookieStore.addEventListener('change', ({ changed }) => {
            if (wide) {
                for (let { name, value } of changed) {
                    if (value === '1') {
                        if (!F) {
                            toggle('1');
                        } else {
                            html.classList.remove('tiyatro');
                        }
                    } else if (value === '0') {
                        toggle('0');
                    }
                }
            }
        });

        w.addEventListener('fullscreenchange', function (e) {
            if (document.fullscreenElement) {
                localStorage.setItem('fullscreen', '1');
            } else {
                localStorage.removeItem('fullscreen');

                if (localStorage.getItem('theater')) {
                    toggle('1');
                } else {
                    toggle('0');
                }
            }
        });

        ytdapp.addEventListener('scroll', function () {
            if (ytdapp.scrollTop == 0) {
                ytdapp.setAttribute('masthead-hidden', '');
            } else {
                ytdapp.removeAttribute('masthead-hidden', '');
            }
        });
    };

    if (d.readyState === 'loading') {
        d.addEventListener('DOMContentLoaded', tiyatro);
    } else {
        [w, d, html].map((e) =>
            window.addEventListener('yt-navigate-finish', tiyatro)
        );
    }
})();
