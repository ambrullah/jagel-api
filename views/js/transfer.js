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
