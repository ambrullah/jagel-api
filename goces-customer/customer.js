// =========================
// script navigasi button bawah
// =========================

// =========================
// STATE
// =========================

let pageHistory = [];
let currentPage = 'home';

history.replaceState(
    { page: 'home' },
    '',
    '#home'
);

// =========================
// AKTIFKAN NAVBAR
// =========================

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

// =========================
// TAMPILKAN HALAMAN
// =========================

function showPage(name, btn = null) {

    if (currentPage === name) {
        return;
    }

    pageHistory.push(currentPage);

    history.pushState(
        { page: name },
        '',
        '#' + name
    );

    document
        .querySelectorAll('.page')
        .forEach(page => {
            page.classList.remove('active');
        });

    const targetPage =
        document.getElementById(
            'page-' + name
        );

    if (targetPage) {
        targetPage.classList.add('active');
    }

    activateNav(name);

    currentPage = name;

    console.log(
        'Current Page:',
        currentPage
    );

    console.log(
        'History:',
        pageHistory
    );

}

// =========================
// TOMBOL KEMBALI MANUAL
// =========================

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
        .forEach(page => {
            page.classList.remove('active');
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

// =========================
// BACK ANDROID
// =========================

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
            .forEach(page => {
                page.classList.remove('active');
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
);

// =========================
// ORDERS TAB
// =========================

document
    .querySelectorAll('.orders-tab')
    .forEach(tab => {

        tab.addEventListener(
            'click',
            function () {

                document
                    .querySelectorAll('.orders-tab')
                    .forEach(t => {
                        t.classList.remove('active');
                    });

                this.classList.add('active');

            }
        );

    });


// =========================
// script benner slide
// =========================
window.addEventListener(
    "message",
    function (event) {

        const element =
            document.getElementById(
                event.data.containerId
            );

        if (!element) {
            return;
        }

        if (
            event.data.type === "emptyBanner"
        ) {

            element.style.display =
                "none";

        }

        if (
            event.data.type === "bannerLoaded"
        ) {

            element.style.display =
                "block";

        }

    }
);

// =========================
// script lupa nama
// =========================
window.addEventListener("message", function (event) {

    if (event.data.type === "emptyCategory") {

        const frame = event.source.frameElement;

        if (frame) {

            const container = frame.parentElement;

            if (container) {

                container.style.display = "none";

            }

        }

    }

});

// =========================
// script benner promo atau halaman promo
// =========================
// =============================
// KONFIGURASI
// =============================
let gprCurrentCategory = null;
const gprKategoriVoucher = [
    "populer",
    "terbaru",
    "eksklusif",
    "cashback",
    "terbatas"
];

// =============================
// KATEGORI
// =============================
function gprOpenCategory(event, category) {

    const buttons =
        document.querySelectorAll(
            ".gpr-category button"
        );

    const sections =
        document.querySelectorAll(
            ".gpr-content"
        );

    if (
        gprCurrentCategory === category
    ) {

        document
            .getElementById(category)
            .style.display = "none";

        event.currentTarget
            .classList.remove("active");

        gprCurrentCategory = null;

        return;

    }

    sections.forEach(section => {
        section.style.display = "none";
    });

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    document
        .getElementById(category)
        .style.display = "block";

    event.currentTarget
        .classList.add("active");

    gprCurrentCategory = category;

}

// =============================
// BUKA SEMUA
// =============================
function gprOpenAllVoucher() {

    document
        .querySelectorAll(".gpr-content")
        .forEach(section => {

            section.style.display = "none";

        });

    document
        .querySelectorAll(".gpr-category button")
        .forEach(button => {

            button.classList.remove("active");

        });

    document
        .getElementById("semua")
        .style.display = "block";

    document
        .getElementById("gprBtnSemua")
        .classList.add("active");

    gprCurrentCategory = "semua";

}

// =============================
// STATUS VOUCHER
// =============================
function gprIsVoucherActive(voucher) {

    const now =
        new Date();

    const start =
        new Date(
            voucher.dataset.start
        );

    const end =
        new Date(
            voucher.dataset.end
        );

    return (

        now >= start &&

        now <= end

    );

}

// =============================
// UPDATE STATUS VOUCHER
// =============================
function gprUpdateVoucherStatus() {

    gprKategoriVoucher.forEach(id => {

        document
            .querySelectorAll(
                "#" + id + " .gpr-voucher-card"
            )
            .forEach(voucher => {

                if (
                    gprIsVoucherActive(voucher)
                ) {

                    voucher.classList
                        .remove("hide");

                } else {

                    voucher.classList
                        .add("hide");

                }

            });

    });

    gprUpdateSemuaVoucher();

    gprUpdateVoucherCount();

}

// =============================
// HALAMAN SEMUA
// =============================
function gprUpdateSemuaVoucher() {

    const semua =
        document.getElementById(
            "semua"
        );

    semua.innerHTML = "";

    gprKategoriVoucher.forEach(id => {

        document
            .querySelectorAll(
                "#" + id +
                " .gpr-voucher-card"
            )
            .forEach(voucher => {

                // hanya tampilkan voucher aktif
                if (
                    !voucher.classList.contains(
                        "hide"
                    )
                ) {

                    semua.innerHTML +=
                        voucher.outerHTML;

                }

            });

    });

}

// =============================
// JUMLAH VOUCHER AKTIF
// =============================
function gprUpdateVoucherCount() {

    let total = 0;

    gprKategoriVoucher.forEach(id => {

        document
            .querySelectorAll(
                "#" + id +
                " .gpr-voucher-card"
            )
            .forEach(voucher => {

                if (
                    !voucher.classList.contains(
                        "hide"
                    )
                ) {

                    total++;

                }

            });

    });

    document
        .getElementById(
            "gprActiveVoucherCount"
        )
        .innerHTML =

        total + " Voucher Aktif";

}

// =============================
// SALIN VOUCHER
// =============================
function gprCopyVoucher(button) {

    const voucher =
        button.closest(
            ".gpr-voucher-card"
        );

    const code =
        voucher.dataset.code;

    const input =
        document.createElement(
            "input"
        );

    input.value = code;

    document.body
        .appendChild(input);

    input.select();

    document.execCommand(
        "copy"
    );

    document.body
        .removeChild(input);

    button.innerHTML =
        "Tersalin ✓";

    setTimeout(function () {

        button.innerHTML =
            "Salin";

    }, 2000);

    gprShowToast(

        "Kode voucher " +
        code +
        " berhasil disalin"
    );

}

// =============================
// TOAST
// =============================
function gprShowToast(message) {

    const toast =
        document.getElementById(
            "gprToast"
        );

    toast.innerHTML =
        message;

    toast.style.display =
        "block";

    clearTimeout(
        window.gprToastTimer
    );

    window.gprToastTimer =
        setTimeout(function () {

            toast.style.display =
                "none";

        }, 2000);

}

// =============================
// COUNTDOWN
// =============================
function gprUpdateCountdown() {

    document
        .querySelectorAll(
            ".gpr-voucher-card"
        )
        .forEach(voucher => {

            const box =
                voucher.querySelector(
                    ".gpr-countdown"
                );

            if (!box) return;

            const end =
                new Date(
                    voucher.dataset.end
                );

            const now =
                new Date();

            let diff =
                end - now;

            if (diff <= 0) {

                box.innerHTML = "";

                return;

            }

            const day =
                Math.floor(
                    diff / 86400000
                );

            diff %= 86400000;

            const hour =
                Math.floor(
                    diff / 3600000
                );

            diff %= 3600000;

            const minute =
                Math.floor(
                    diff / 60000
                );

            box.innerHTML =

                "⏳ Berakhir dalam " +
                day + "h " +
                hour + "j " +
                minute + "m";

        });

}

// =============================
// POPUP VOUCHER
// =============================
function gprOpenVoucherModal(voucher) {

    const title =
        voucher.dataset.title;

    const desc =
        voucher.dataset.desc;

    const code =
        voucher.dataset.code;

    const period =
        "Berlaku " +
        voucher.dataset.period;

    const minOrder =
        Number(
            voucher.dataset.minOrder
        ).toLocaleString("id-ID");

    const maxDiscount =
        Number(
            voucher.dataset.maxDiscount
        ).toLocaleString("id-ID");

    const terms =
        voucher.dataset.terms
            .split("|")
            .map(item =>
                `<li>${item}</li>`
            )
            .join("");


    document.getElementById(
        "gprVoucherModalBody"
    ).innerHTML = `

        <div class="gpr-modal-section">

            <h2>
                ${title}
            </h2>

            <p class="gpr-voucher-desc">
                ${desc}
            </p>

        </div>

        <div class="gpr-modal-section">

            <div class="gpr-modal-section-title">
                Kode Voucher
            </div>

            <div class="gpr-modal-code">
                ${code}
            </div>

        </div>

        <div class="gpr-modal-section">

            <div class="gpr-modal-section-title">
                Minimum Pembelian
            </div>

            <div>
                Rp${minOrder}
            </div>

        </div>

        <div class="gpr-modal-section">

            <div class="gpr-modal-section-title">
                Maksimum Diskon
            </div>

            <div>
                Rp${maxDiscount}
            </div>

        </div>

        <div class="gpr-modal-section">

            <div class="gpr-modal-section-title">
                Periode Promo
            </div>

            <div>
                ${period}
            </div>

        </div>

        <div class="gpr-modal-section">

            <div class="gpr-modal-section-title">
                Syarat & Ketentuan
            </div>

            <ul class="gpr-modal-terms">

                ${terms}

            </ul>

        </div>

        <button
            class="gpr-modal-copy-btn"
            onclick="gprCopyVoucherCode('${code}')">

            Salin Kode Voucher

        </button>

    `;

    document
        .getElementById(
            "gprVoucherModal"
        )
        .classList
        .add("show");

}

// =============================
// TUTUP POPUP
// =============================
function gprCloseVoucherModal() {

    document
        .getElementById(
            "gprVoucherModal"
        )
        .classList
        .remove("show");

}

// =============================
// SALIN DARI POPUP
// =============================
function gprCopyVoucherCode(code) {

    const input =
        document.createElement(
            "input"
        );

    input.value = code;

    document.body.appendChild(
        input
    );

    input.select();

    document.execCommand(
        "copy"
    );

    document.body.removeChild(
        input
    );

    const btn =
        document.querySelector(
            ".gpr-modal-copy-btn"
        );

    if (btn) {

        btn.innerHTML =
            "Tersalin ✓";

        setTimeout(function () {

            btn.innerHTML =
                "Salin Kode Voucher";

        }, 2000);

    }

    gprShowToast(

        "Kode voucher " +

        code +

        " berhasil disalin"

    );

}

// =============================
// RENDER DATA VOUCHER
// =============================
function gprRenderVoucherData() {

    document
        .querySelectorAll(
            ".gpr-voucher-card"
        )

        .forEach(voucher => {

            voucher.style.background =
                voucher.dataset.cardColor;

            voucher
                .querySelector(
                    ".gpr-voucher-img"
                )
                .src =
                voucher.dataset.image;

            voucher
                .querySelector(
                    ".gpr-voucher-title"
                )
                .innerHTML =
                voucher.dataset.title;

            voucher
                .querySelector(
                    ".gpr-voucher-desc"
                )
                .innerHTML =
                voucher.dataset.desc;

            voucher
                .querySelector(
                    ".gpr-voucher-period"
                )
                .innerHTML =
                "Berlaku " +
                voucher.dataset.period;

        });

}

// =============================
// INISIALISASI
// =============================
gprRenderVoucherData();

gprUpdateVoucherStatus();

gprUpdateCountdown();

// periksa setiap 1 menit
setInterval(function () {

    gprUpdateVoucherStatus();

    gprUpdateCountdown();

}, 60000);

// =========================
// script pop up goces ai 
// =========================
function openGocesAI() {
    document.getElementById(
        "cyberPopupOverlay"
    ).style.display = "flex";
}

function closeGocesAI() {

    document.getElementById(
        "cyberPopupOverlay"
    ).style.display = "none";
}


// =========================
// script halaman shop
// =========================
let gcsFlashEnd = new Date("2026-06-27 23:59:59").getTime();

let gcsFlashInterval = setInterval(function () {

    let now = new Date().getTime();
    let distance = gcsFlashEnd - now;

    if (distance <= 0) {

        clearInterval(gcsFlashInterval);

        document.getElementById("gcsFlashSale").style.display = "none";

        return;
    }

    let jam = Math.floor(distance / (1000 * 60 * 60));
    let menit = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let detik = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("gcsFlashTimer").innerHTML =
        jam.toString().padStart(2, "0") + ":" +
        menit.toString().padStart(2, "0") + ":" +
        detik.toString().padStart(2, "0");

}, 1000);


// =========================
// script halaman profile beranda
// =========================
(function () {

    const KEY = "theme";

    // =========================
    // SAFE STORAGE (WebView proof)
    // =========================
    function getTheme() {
        try {
            return localStorage.getItem(KEY) || "light";
        } catch (e) {
            return "light";
        }
    }

    function setThemeStorage(theme) {
        try {
            localStorage.setItem(KEY, theme);
        } catch (e) { }
    }

    // =========================
    // APPLY THEME (CORE ENGINE)
    // =========================
    function applyTheme(theme) {

        document.documentElement.setAttribute("data-theme", theme);

        document.body.classList.toggle(
            "kpz-dark-mode",
            theme === "dark"
        );

        syncToggle(theme);
    }

    // =========================
    // SYNC TOGGLE UI
    // =========================
    function syncToggle(theme) {
        const toggle = document.getElementById("darkToggle");
        if (toggle) {
            toggle.checked = (theme === "dark");
        }
    }

    // =========================
    // PUBLIC SETTER
    // =========================
    function setTheme(theme) {
        setThemeStorage(theme);
        applyTheme(theme);
    }

    // =========================
    // SAFE INIT (ANTI ANDROID BUG)
    // =========================
    function initTheme() {

        const theme = getTheme();
        applyTheme(theme);

        const toggle = document.getElementById("darkToggle");

        if (toggle && !toggle.__bound) {

            toggle.__bound = true;

            toggle.addEventListener("change", function () {
                setTheme(this.checked ? "dark" : "light");
            });

        }
    }

    // =========================
    // MULTI-TRIGGER SYSTEM
    // =========================

    // 1. normal load
    document.addEventListener("DOMContentLoaded", initTheme);

    // 2. fallback kalau DOM telat / SPA
    window.addEventListener("load", initTheme);

    // 3. extra safety (WebView / iframe injection)
    setTimeout(initTheme, 300);
    setTimeout(initTheme, 1000);

    // expose global (biar bisa dipanggil dari page lain)
    window.setTheme = setTheme;

})();

// =========================
// script halaman orders
// =========================
function gakShowPage(page) {

    // sembunyikan semua isi tab
    document.querySelectorAll(".gak_page").forEach(item => {
        item.classList.remove("active");
    });

    // nonaktifkan semua tombol
    document.querySelectorAll(".gak_tab").forEach(item => {
        item.classList.remove("active");
    });

    // tampilkan halaman yang dipilih
    document
        .getElementById("page_" + page)
        .classList.add("active");

    // aktifkan tombol yang dipilih
    document
        .getElementById("btn_" + page)
        .classList.add("active");

}



// =========================
// script halaman home
// =========================
window.addEventListener(
    "message",
    function (event) {

        if (
            event.data.type === "emptyVoucher"
        ) {

            document.getElementById(
                "item-voucher"
            ).style.display = "none";

        }


        if (
            event.data.type === "voucherLoaded"
        ) {

            document.getElementById(
                "item-voucher"
            ).style.display = "block";

        }

    }
);


// =========================
// script halaman transfer yang ada di home
// =========================
$(document).ready(function () {
    // Konfigurasi
    const biayaadmin = 500;
    const apiasal = "ZyhskJMRRFVgfKqTKqsNadYtTQ3AK9QK1itUfSxtCra6bzKiCH";
    const apitujuan = "ZyhskJMRRFVgfKqTKqsNadYtTQ3AK9QK1itUfSxtCra6bzKiCH";
    const useragen = "{username}";
    const namaagen = "{nama}";

    const phoneInput = document.getElementById("phone");
    const amountInput = document.getElementById("amount");
    const noteInput = document.getElementById("note");
    const receiverName = document.getElementById("receiverName");
    const myBalanceText = document.getElementById("myBalance");
    const totalPayText = document.getElementById("totalPay");
    const transferBtn = document.getElementById("transferBtn");

    // Helper
    function rupiah(n) { return "Rp " + Intl.NumberFormat('id-ID').format(n); }
    function onlyNumber(text) { return text.replace(/\D/g, ""); }

    // 1. CEK SALDO AWAL
    function checkInitialBalance() {
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: "https://api.jagel.id/v1/balance/check?type=username&value=" + useragen + "&apikey=" + apiasal,
            success: function (data) {
                myBalanceText.innerHTML = rupiah(data.data.balance);
            },
            error: function () {
                myBalanceText.innerHTML = "Rp 0";
            }
        });
    }
    checkInitialBalance();

    // Validasi Berlapis
    function validateForm() {
        const phoneVal = phoneInput.value.trim();
        const amountVal = parseInt(onlyNumber(amountInput.value)) || 0;

        const isPhoneValid = phoneVal.length >= 10 && phoneVal.length <= 14;
        const isUserFound = receiverName.innerHTML !== "-" &&
            receiverName.innerHTML !== "Mencari..." &&
            receiverName.innerHTML !== "Tidak ditemukan!" &&
            receiverName.innerHTML !== "Anda tidak dapat melakukan transfer ke akun sendiri.";
        const isAmountValid = amountVal >= 10000;

        transferBtn.disabled = !(isPhoneValid && isUserFound && isAmountValid);
    }

    // Input Event Phone
    $(phoneInput).on("input", function () {
        let aa = $(this).val();
        if (aa.length > 14) { $(this).val(aa.slice(0, 14)); }

        if (aa.length < 10) { receiverName.innerHTML = "-"; validateForm(); return; }

        receiverName.innerHTML = "Mencari...";
        $.ajax({
            type: 'get',
            url: "https://api.jagel.id/v1/user?type=phone&value=" + aa + "&apikey=" + apitujuan,
            success: function (data) {
                if (data.data.username === useragen) {
                    receiverName.innerHTML = "Anda tidak dapat melakukan transfer ke akun sendiri.";
                } else {
                    receiverName.innerHTML = data.data.username;
                }
                validateForm();
            },
            error: function () {
                receiverName.innerHTML = "Tidak ditemukan!";
                validateForm();
            }
        });
    });

    // Input Event Amount
    $(amountInput).on("keyup", function () {
        let angka = onlyNumber(this.value);
        if (angka === "") { this.value = ""; totalPayText.innerHTML = rupiah(0); validateForm(); return; }
        this.value = Intl.NumberFormat('id-ID').format(Number(angka));
        totalPayText.innerHTML = rupiah(parseInt(angka) + biayaadmin);
        validateForm();
    });

    // 2. PROSES TRANSFER (Click)
    $(transferBtn).on("click", function () {
        var jumlah = parseInt(onlyNumber(amountInput.value));
        var totalPembayaran = jumlah + biayaadmin;
        var nohp = phoneInput.value;
        var catatan = noteInput.value;

        // Double check validation before processing
        if (jumlah < 10000) {
            swal("Gagal!", "Minimal transfer adalah Rp10.000.", "error");
            return;
        }

        // UI Block (Double Click Protection)
        transferBtn.disabled = true;

        swal({ title: "Konfirmasi", text: "Yakin ingin transfer?", icon: "warning", buttons: ["Batal", "Ya, Transfer"] }).then((will) => {
            if (will) {
                $("#loadingBox").css("display", "flex");

                // CEK SALDO REAL-TIME
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: "https://api.jagel.id/v1/balance/check?type=username&value=" + useragen + "&apikey=" + apiasal,
                    success: function (data) {
                        var liveBalance = data.data.balance;

                        if (liveBalance < totalPembayaran) {
                            $("#loadingBox").hide();
                            transferBtn.disabled = false; // Re-enable on error
                            swal("Gagal!", "Saldo tidak mencukupi.", "error");
                            return;
                        }

                        // CHAIN TRANSFER
                        $.ajax({
                            url: 'https://api.jagel.id/v1/balance/adjust',
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify({ type: 'phone', value: nohp, apikey: apitujuan, amount: jumlah, note: "Transfer dari " + namaagen + (catatan ? ": " + catatan : "") }),
                            success: function () {
                                $.ajax({ url: 'https://api.jagel.id/v1/message/send', type: "POST", contentType: "application/json", data: JSON.stringify({ type: 'phone', value: nohp, apikey: apitujuan, content: "Saldo diterima dari " + namaagen }) });

                                $.ajax({
                                    url: 'https://api.jagel.id/v1/balance/adjust', type: "POST", contentType: "application/json",
                                    data: JSON.stringify({ type: 'username', value: useragen, apikey: apiasal, amount: -totalPembayaran, note: "Transfer ke " + nohp }),
                                    success: function () {
                                        $("#loadingBox").hide();

                                        // Waktu Realtime
                                        const now = new Date();
                                        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                                        const dateString = now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();
                                        const timeString = now.toLocaleTimeString('id-ID', { hour12: false }) + " WIB";

                                        // Update struk
                                        document.getElementById("rNama").innerHTML = receiverName.innerHTML;
                                        document.getElementById("rPhone").innerHTML = nohp;
                                        document.getElementById("rAmount").innerHTML = rupiah(jumlah);
                                        document.getElementById("rTotal").innerHTML = rupiah(totalPembayaran);
                                        document.getElementById("rDate").innerHTML = dateString + "<br>" + timeString;

                                        // Handle Catatan
                                        if (catatan && catatan.trim() !== "") {
                                            document.getElementById("rNote").innerHTML = catatan;
                                            document.getElementById("rNoteRow").style.display = "flex";
                                        } else {
                                            document.getElementById("rNoteRow").style.display = "none";
                                        }

                                        $("#successModal").css("display", "flex");
                                    },
                                    error: function () {
                                        $("#loadingBox").hide();
                                        transferBtn.disabled = false;
                                        swal("Error", "Gagal menyelesaikan transaksi.", "error");
                                    }
                                });
                            },
                            error: function () {
                                $("#loadingBox").hide();
                                transferBtn.disabled = false;
                                swal("Error", "Gagal menghubungi server.", "error");
                            }
                        });
                    },
                    error: function () {
                        $("#loadingBox").hide();
                        transferBtn.disabled = false;
                        swal("Error", "Gagal mengecek saldo terbaru.", "error");
                    }
                });
            } else {
                // User cancelled
                transferBtn.disabled = false;
            }
        });
    });

    // Selesai
    $("#doneBtn").on("click", function () {
        $("#successModal").css("display", "none");

        // Reset Form
        phoneInput.value = "";
        amountInput.value = "";
        noteInput.value = "";
        receiverName.innerHTML = "-";
        totalPayText.innerHTML = rupiah(0);

        // Refresh saldo & Validasi
        checkInitialBalance();
        validateForm();

        // Re-enable button
        transferBtn.disabled = true;
    });
});


