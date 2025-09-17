
function gerarExcel() {
    const nome = document.getElementById("nome").value;
    if (!nome) {
        alert("Por favor, insira o nome.");
        return;
    }

    const form = document.getElementById("ueqForm");
    const respostas = [["Pergunta", "Resposta"]];

    for (let i = 1; i <= 26; i++) {
        const radios = form.querySelectorAll(`input[name="q${i}"]`);
        let valor = "";
        radios.forEach(r => { if (r.checked) valor = r.value; });
        respostas.push([`Q${i}`, valor || "Não respondido"]);
    }

    const ws = XLSX.utils.aoa_to_sheet([["Nome", nome], ...respostas]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UEQ");
    XLSX.writeFile(wb, `UEQ_${nome}.xlsx`);
}

function gerarImagem() {
    const nome = document.getElementById("nome").value;
    if (!nome) {
        alert("Por favor, insira o nome.");
        return;
    }

    const form = document.querySelector("#ueqForm");
    const clone = form.cloneNode(true);

    // Adiciona o nome no topo
    const tituloNome = document.createElement("h2");
    tituloNome.textContent = `Nome: ${nome}`;
    tituloNome.style.textAlign = "center";
    tituloNome.style.marginBottom = "20px";
    clone.prepend(tituloNome);

    // Adiciona o clone temporariamente ao body
    clone.style.position = "absolute";
    clone.style.left = "-9999px"; // fora da tela
    document.body.appendChild(clone);

    html2canvas(clone).then(canvas => {
        const link = document.createElement("a");
        link.download = `formulario_UEQ_${nome}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        // Remove o clone após gerar a imagem
        document.body.removeChild(clone);
    });
}

