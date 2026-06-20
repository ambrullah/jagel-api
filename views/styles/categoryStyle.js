const categoryStyle = `
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:transparent;
    padding:8px;
    font-family:Arial,sans-serif;
}

.section_title{
    margin:0 8px 10px;
    color:#222;
    font-size:18px;
    font-weight:700;
}

.wrap{
    display:flex;
    gap:12px;
    overflow-x:auto;
    overflow-y:hidden;
    scrollbar-width:none;
}

.wrap::-webkit-scrollbar{
    display:none;
}

.item{
    width:140px;
    flex-shrink:0;
    background:#fff;
    border-radius:18px;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    box-shadow:0 2px 10px rgba(0,0,0,.06);
}

.item img{
    width:100%;
    aspect-ratio:1;
    object-fit:cover;
    display:block;
}

.item_name{
    padding:10px 10px 6px;
    font-size:11px;
    line-height:1.4;
    font-weight:500;
    color:#333;
    min-height:40px;
    overflow:hidden;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
}

.item_price{
    margin-top:auto;
    padding:0 10px 12px;
    color:#008cff;
    font-size:15px;
    font-weight:700;
}

a{
    text-decoration:none;
    color:inherit;
}
`;

module.exports = categoryStyle;