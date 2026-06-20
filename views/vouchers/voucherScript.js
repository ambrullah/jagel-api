const voucherScript = `

function copyVoucher(id){

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
            "voucher_toast"
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


// ======================
// CEK ADA VOUCHER ATAU TIDAK
// ======================

window.addEventListener(
    "load",
    ()=>{

        const totalVoucher =
            document.querySelectorAll(
                ".voucher-card"
            ).length;

        if(totalVoucher===0){

            window.parent.postMessage(
            {
                type:"emptyVoucher"
            },
            "*");

        }
        else{

            window.parent.postMessage(
            {
                type:"voucherLoaded"
            },
            "*");

        }

    }
);

`;

module.exports = voucherScript;