$(document).ready(function () {
    // Konfigurasi
    const biayaadmin = 500;
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
            type: 'POST',
            url: "https://jagel-api.vercel.app/api/check-balance",
            contentType: "application/json",
            data: JSON.stringify({ username: useragen }),
            success: function (res) {
                if (res.success && res.data) {
                    myBalanceText.innerHTML = rupiah(Number(res.data.balance || 0));
                } else {
                    myBalanceText.innerHTML = "Rp 0";
                }
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
            type: 'POST',
            url: "https://jagel-api.vercel.app/api/check-user",
            contentType: "application/json",
            data: JSON.stringify({ phone: aa }),
            success: function (res) {
                if (res.success && res.data) {
                    if (res.data.username === useragen) {
                        receiverName.innerHTML = "Anda tidak dapat melakukan transfer ke akun sendiri.";
                    } else {
                        receiverName.innerHTML = res.data.username;
                    }
                } else {
                    receiverName.innerHTML = "Tidak ditemukan!";
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

                // PROSES TRANSFER KE BACKEND
                $.ajax({
                    url: "https://jagel-api.vercel.app/api/transfer",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        username: useragen,
                        phone: nohp,
                        amount: jumlah,
                        note: catatan || ""
                    }),
                    success: function (res) {
                        $("#loadingBox").hide();

                        if (res.success) {
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
                        } else {
                            swal("Gagal", res.message || "Transfer gagal", "error");
                            transferBtn.disabled = false;
                        }
                    },
                    error: function (err) {
                        $("#loadingBox").hide();
                        transferBtn.disabled = false;
                        swal("Error", err.responseJSON?.message || "Terjadi kesalahan pada server.", "error");
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