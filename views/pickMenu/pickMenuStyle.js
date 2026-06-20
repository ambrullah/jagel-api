const pickMenuStyle = `

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

.jgc_pick_section{
    padding:15px;
    overflow:hidden;
}


/* TITLE */

.jgc_pick_title{
    font-size:15px;
    font-weight:800;
    color:#111;
    margin-bottom:12px;
}


/* BUTTON AREA */

.jgc_pick_buttons{
    display:flex;
    gap:8px;
    align-items:center;
    overflow:hidden;
}


/* BUTTON */

.jgc_pick_btn{
    flex:none;
    border:none;
    background:#f3f4f6;
    padding:6px 10px;
    border-radius:20px;
    font-size:13px;
    font-weight:700;
    color:#111;
    display:flex;
    align-items:center;
    gap:5px;
    white-space:nowrap;
    box-shadow:0 3px 10px rgba(0,0,0,.06);
    transition:.2s;
}


/* ACTIVE */

.jgc_pick_btn.active{
    background:#2563eb;
    color:#fff;
}


/* CONTENT */

.jgc_pick_content{
    display:none;
    margin-top:12px;
    background:#f7f7f7;
    border-radius:10px;
    overflow:hidden;
    box-shadow:0 5px 15px rgba(0,0,0,.08);
}

/* ================= VOUCHER ================= */

.jgc_voucher_wrap{
    padding:3px;
    background:#fff;
}

.jgc_voucher_scroll{
    display:flex;
    gap:12px;
    overflow-x:auto;
    padding-bottom:6px;
}

.jgc_voucher_scroll::-webkit-scrollbar{
    display:none;
}

/* CARD */

.jgc_voucher_card{
    flex:none;
    width:240px;
    padding:14px;
    position:relative;
    background:linear-gradient(
        135deg,
        #1e3a8a,
        #2563eb
    );

    color:#fff;
    border-radius:16px;
    box-shadow:
        0 6px 18px
        rgba(0,0,0,.15);

}

/* EFEK TIKET */

.jgc_voucher_card::before,
.jgc_voucher_card::after{
    content:"";
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    width:18px;
    height:18px;
    background:#fff;
    border-radius:50%;
}

.jgc_voucher_card::before{
    left:-9px;
}

.jgc_voucher_card::after{
    right:-9px;
}

/* NAMA */

.jgc_voucher_name{
    font-size:14px;
    font-weight:900;
    margin-bottom:6px;
}

/* DESKRIPSI */

.jgc_voucher_desc{
    font-size:12px;
    opacity:.9;
    margin-bottom:12px;
}

/* KODE */

.jgc_voucher_code{
    display:flex;
    align-items:center;
    justify-content:space-between;
    background:
        rgba(255,255,255,.15);
    padding:8px 10px;
    border-radius:10px;
}

.jgc_voucher_code span{
    font-size:13px;
    font-weight:800;
    letter-spacing:1px;
}

.jgc_voucher_code button{
    border:none;
    background:#fff;
    color:#1e3a8a;
    padding:6px 10px;
    border-radius:8px;
    font-size:11px;
    font-weight:800;
}

/* ================= PRODUK TERDEKAT ================= */

.jgc_near_wrap{
    padding:16px;
    overflow:hidden;
}

.jgc_near_title{
    font-size:15px;
    font-weight:800;
    color:#111;
    margin-bottom:12px;
}

.jgc_near_scroll{
    display:flex;
    gap:12px;
    overflow-x:auto;
    scroll-behavior:smooth;
}

.jgc_near_scroll::-webkit-scrollbar{
    display:none;
}

/* CARD */

.jgc_near_card{
    flex:none;
    width:150px;
    background:#fff;
    border-radius:16px;
    padding:10px;
    box-shadow:0 4px 12px rgba(0,0,0,.08);
}

/* LINK */

.jgc_near_link{
    display:block;
    text-decoration:none;
    color:#111;
}

/* IMAGE */

.jgc_near_image{
    width:100%;
    height:110px;
    object-fit:cover;
    border-radius:12px;
    display:block;
    margin-bottom:8px;
}

/* NAMA */

.jgc_near_name{
    display:block;
    font-size:13px;
    font-weight:700;
    line-height:18px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}

/* JARAK */

.jgc_near_distance{
    display:block;
    font-size:11px;
    color:#777;
    margin-top:4px;
}

/* STATUS */

.jgc_near_status{
    margin-top:8px;
    font-size:11px;
}

.jgc_near_open{
    color:#16a34a;
    font-weight:700;
}

.jgc_near_status_note{
    color:#777;
}

/* ================= PRODUK BARU ================= */

.jgc_new_wrap{
    padding:16px;
    overflow:hidden;
}

#jgc_new{
    overflow-x:auto;
    scrollbar-width:none;
}

#jgc_new::-webkit-scrollbar{
    display:none;
}

#jgc_new #item-head{
    display:flex;
    gap:12px;
}

#jgc_new .item-row{
    width:150px !important;
    min-width:150px;
    display:block !important;
    margin:0 !important;
}

#jgc_new .item-link{
    display:block;
    background:#fff;
    border-radius:16px;
    overflow:hidden;
    text-decoration:none;
    color:#111;
    box-shadow:0 4px 12px rgba(0,0,0,.08);
}

#jgc_new .item-image{
    width:150px !important;
    height:110px;
    object-fit:cover;
    margin:0 !important;
    display:block;
}

#jgc_new .item-title{
    display:block;
    padding:8px 10px 3px;
    font-size:13px;
    font-weight:700;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}

#jgc_new .item-price{
    display:none;
}

#jgc_new .item-price-format{
    display:block;
    padding:0 10px 12px;
    font-size:12px;
    font-weight:700;
    color:#16a34a;
}

`;



module.exports = pickMenuStyle;