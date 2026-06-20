const voucherConfig = {

    title: "Voucher Spesial Untukmu 🎉",

    containerId: "item-voucher",

    items: [

        {

            title: "DISKON FOOD 20%",
            desc: "Potongan harga makanan favorit",
            code: "FOOD20",
            icon: "🍔",
            badge: "HOT",
            color: "food",
            start: "2026-06-20 00:00:00",
            end: "2026-07-20 23:59:59"

        },

        {

            title: "GRATIS ONGKIR",
            desc: "Nikmati pengiriman lebih hemat",
            code: "ONGKIRFREE",
            icon: "🚚",
            badge: "BARU",
            color: "ongkir",
            start: "2026-06-20 00:00:00",
            end: "2026-07-31 23:59:59"

        },

        {

            title: "PROMO PENGGUNA BARU",
            desc: "Diskon khusus pengguna baru",
            code: "WELCOME10",
            icon: "🎉",
            badge: "",
            color: "new",
            start: "2026-06-20 00:00:00",
            end: "2026-08-31 23:59:59"

        }

    ]

};

module.exports = voucherConfig;