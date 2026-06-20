const promoStripStyle = `

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:transparent;
    font-family:Arial,sans-serif;
}

.promo-strip{
    margin-top:0;
    margin-right:16px;
    margin-bottom:0px;
    margin-left:16px;
    width:calc(100% - 32px);
    aspect-ratio:16 / 2;
    border-radius:18px;
    overflow:hidden;
    cursor:pointer;
    transition:opacity .15s;
}

.promo-strip img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
}

.promo-strip:active{
    opacity:.85;
}

`;

module.exports = promoStripStyle;