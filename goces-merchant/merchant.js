// =====================================
// KONFIGURASI AWAL
// =====================================

let currentPage = 'home';
let pageHistory = [];

history.replaceState(
    { page: 'home' },
    '',
    '#home'
);

// =====================================
// AKTIFKAN NAVBAR
// =====================================

function activateNav(pageName) {

    document
        .querySelectorAll('.nav-item')
        .forEach(nav => {

            nav.classList.remove('active');

            if (
                nav.dataset.page === pageName
            ) {
                nav.classList.add('active');
            }

        });

}

// =====================================
// TAMPILKAN HALAMAN
// =====================================

function showPage(page) {

    if (currentPage === page) {
        return;
    }

    pageHistory.push(currentPage);

    history.pushState(
        { page: page },
        '',
        '#' + page
    );

    document
        .querySelectorAll('.page')
        .forEach(p => {
            p.classList.remove('active');
        });

    const targetPage =
        document.getElementById(
            'page-' + page
        );

    if (targetPage) {
        targetPage.classList.add('active');
    }

    activateNav(page);

    currentPage = page;

    console.log(
        'Current Page:',
        currentPage
    );

}

// =====================================
// TOMBOL KEMBALI MANUAL
// =====================================

function goBack() {

    if (
        pageHistory.length === 0
    ) {
        return;
    }

    const previousPage =
        pageHistory.pop();

    document
        .querySelectorAll('.page')
        .forEach(p => {
            p.classList.remove('active');
        });

    const targetPage =
        document.getElementById(
            'page-' + previousPage
        );

    if (targetPage) {
        targetPage.classList.add('active');
    }

    activateNav(previousPage);

    currentPage =
        previousPage;

}

// =====================================
// BACK ANDROID
// =====================================

window.addEventListener(
    'popstate',
    function () {

        if (
            pageHistory.length === 0
        ) {
            return;
        }

        const previousPage =
            pageHistory.pop();

        document
            .querySelectorAll('.page')
            .forEach(p => {
                p.classList.remove('active');
            });

        const targetPage =
            document.getElementById(
                'page-' + previousPage
            );

        if (targetPage) {
            targetPage.classList.add('active');
        }

        activateNav(previousPage);

        currentPage =
            previousPage;

        console.log(
            'Back:',
            currentPage
        );

    }
);

// =====================================
// ORDERS TAB
// =====================================

document
    .querySelectorAll('.orders-tab')
    .forEach(tab => {

        tab.addEventListener(
            'click',
            function () {

                document
                    .querySelectorAll(
                        '.orders-tab'
                    )
                    .forEach(t => {
                        t.classList.remove(
                            'active'
                        );
                    });

                this.classList.add(
                    'active'
                );

            }
        );

    });

//SCRIPT HALAMAN POP UP
function showPopup(message) {
    const popup = document.getElementById("popupMessage");
    popup.querySelector(".popup-text").innerText = message;
    popup.classList.add("show");
    clearTimeout(window.popupTimer);
    window.popupTimer = setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);

}

//SCRIPT HALAMAN BENNER HOME
function checkPromoBanner() {
    const now = new Date().getTime();
    let activeBanner = 0;

    document
        .querySelectorAll('.promo-banner')
        .forEach(banner => {

            const start =
                new Date(
                    banner.dataset.start
                ).getTime();

            const end =
                new Date(
                    banner.dataset.end
                ).getTime();

            if (
                now >= start &&
                now <= end
            ) {

                banner.style.display = "block";
                activeBanner++;

            } else {

                banner.style.display = "none";

            }

        });

    const section =
        document.getElementById(
            'promoSection'
        );

    if (activeBanner > 0) {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}

checkPromoBanner();

setInterval(
    checkPromoBanner,
    60000
);

//SCRIPT ORDER ATAU IKLAN
function adsproShowTab(page, element) {

    document
        .querySelectorAll('.adspro_content')
        .forEach(el => {
            el.classList.remove(
                'adspro_content_active'
            );
        });

    document
        .querySelectorAll('.adspro_tab')
        .forEach(el => {
            el.classList.remove(
                'adspro_tab_active'
            );
        });

    document
        .getElementById(
            'adspro-' + page
        )
        .classList.add(
            'adspro_content_active'
        );

    element.classList.add(
        'adspro_tab_active'
    );
}
