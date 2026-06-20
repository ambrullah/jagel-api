const pickMenuScript = `

function jgcToggle(id, btn){

    let target =
        document.getElementById(id);

    // kalau sudah terbuka → tutup
    if(target.style.display==="block"){

        target.style.display = "none";

        if(btn){

            btn.classList.remove(
                "active"
            );

        }

        return;

    }

    // tutup semua content
    document
        .querySelectorAll(
            ".jgc_pick_content"
        )
        .forEach(item=>{

            item.style.display =
                "none";

        });


    // reset semua tombol
    document
        .querySelectorAll(
            ".jgc_pick_btn"
        )
        .forEach(button=>{

            button.classList.remove(
                "active"
            );

        });


    // buka menu yang dipilih
    target.style.display =
        "block";


    // aktifkan tombol
    if(btn){

        btn.classList.add(
            "active"
        );

    }

}


function jgcCopyVoucher(id){

    let kode =
        document.getElementById(id)
        .innerText;

    let textarea =
        document.createElement(
            "textarea"
        );

    textarea.value = kode;

    document.body.appendChild(
        textarea
    );

    textarea.select();

    document.execCommand(
        "copy"
    );

    document.body.removeChild(
        textarea
    );

    let toast =
        document.getElementById(
            "jgc_toast"
        );

    toast.innerText =
        "Voucher berhasil disalin";

    toast.style.display =
        "block";

    setTimeout(()=>{

        toast.style.display =
            "none";

    },2000);

}

`;

module.exports = pickMenuScript;