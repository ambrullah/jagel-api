const voucherStyle = `

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:transparent;
    font-family:Arial,sans-serif;
}


/* SECTION */

.voucher-section{
    padding:15px;
}

.voucher-title{
    font-size:15px;
    font-weight:800;
    color:#111;
    margin-bottom:12px;
}


/* SCROLL */

.voucher-scroll{
    display:flex;
    gap:14px;
    overflow-x:auto;
    padding-bottom:5px;
}

.voucher-scroll::-webkit-scrollbar{
    display:none;
}


/* CARD */

.voucher-card{
    flex:none;
    width:240px;
    position:relative;
    overflow:hidden;
    border-radius:18px;
    color:#fff;
    box-shadow:
        0 8px 20px
        rgba(0,0,0,.10);
}


/* WARNA VOUCHER */

.voucher-food{

    background:
    linear-gradient(
        135deg,
        #ff9800,
        #ff5722
    );

}

.voucher-ongkir{

    background:
    linear-gradient(
        135deg,
        #1d4ed8,
        #2563eb
    );

}

.voucher-new{

    background:
    linear-gradient(
        135deg,
        #16a34a,
        #22c55e
    );

}


/* LUBANG KIRI */

.voucher-card::before{

    content:"";

    position:absolute;

    width:18px;

    height:18px;

    border-radius:50%;

    background:#fff;

    left:-9px;

    top:50%;

    transform:translateY(-50%);

}


/* LUBANG KANAN */

.voucher-card::after{

    content:"";

    position:absolute;

    width:18px;

    height:18px;

    border-radius:50%;

    background:#fff;

    right:-9px;

    top:50%;

    transform:translateY(-50%);

}


/* BAGIAN ATAS */

.voucher-top{

    padding:10px 14px 8px;

}


/* BADGE */

.voucher-badge{

    display:inline-block;

    padding:3px 8px;

    border-radius:20px;

    font-size:9px;

    font-weight:900;

    margin-bottom:6px;

}


/* HOT */

.hot{

    background:#ff5722;

    color:#fff;

}


/* BARU */

.baru{

    background:#16a34a;

    color:#fff;

}


/* NORMAL */

.normal{

    background:
        rgba(255,255,255,.18);

    color:#fff;

}


/* JUDUL */

.voucher-name{

    font-size:14px;

    font-weight:900;

    line-height:18px;

}


/* DESKRIPSI */

.voucher-desc{

    margin-top:3px;

    font-size:11px;

    opacity:.9;

}


/* GARIS PUTUS */

.voucher-divider{

    border-top:
        1px dashed
        rgba(255,255,255,.30);

}


/* BAGIAN BAWAH */

.voucher-bottom{

    padding:8px 14px;

}


/* KODE + TOMBOL */

.voucher-code-box{

    display:flex;

    justify-content:space-between;

    align-items:center;

    gap:10px;

}


/* KODE */

.voucher-code{

    font-size:13px;

    font-weight:900;

    letter-spacing:1px;

}


/* TOMBOL SALIN */

.voucher-copy{

    border:none;

    background:#fff;

    color:#2563eb;

    padding:5px 10px;

    border-radius:7px;

    font-size:10px;

    font-weight:800;

    transition:.15s;

}


.voucher-copy:active{

    transform:scale(.95);

}


/* MASA BERLAKU */

.voucher-expire{

    margin-top:6px;

    font-size:10px;

    opacity:.85;

}


/* TOAST */

#voucher_toast{

    position:fixed;

    bottom:20px;

    left:50%;

    transform:translateX(-50%);

    background:#111;

    color:#fff;

    padding:10px 16px;

    border-radius:10px;

    font-size:13px;

    display:none;

    z-index:9999;

}

`;

module.exports = voucherStyle;