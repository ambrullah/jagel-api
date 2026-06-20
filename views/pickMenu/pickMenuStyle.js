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

`;



module.exports = pickMenuStyle;