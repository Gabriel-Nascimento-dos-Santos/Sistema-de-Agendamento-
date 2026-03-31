const agendamentos = [];

const horariosDisponiveis = [
    "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00","18:00"
];

function atualizarHorarios() {
    const dataSelecionada = document.getElementById("data").value;
    const select = document.getElementById("horario");

    select.innerHTML = '<option value="">Selecione um horário</option>';

    if (!dataSelecionada) return;

    const horariosOcupados = agendamentos
        .filter(ag => ag.data === dataSelecionada)
        .map(ag => ag.horario);

    horariosDisponiveis.forEach(horario => {
        const option = document.createElement("option");
        option.value = horario;
        option.textContent = horario;

        if (horariosOcupados.includes(horario)) {
            option.disabled = true;
            option.textContent += " (ocupado)";
        }

        select.appendChild(option);
    });
    select.value ="";
}

function agendar() {
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    if (!nome || !data || !horario) {
        alert("Preencha tudo!");
        return;
    }

    const jaExiste = agendamentos.some(ag =>
        ag.data === data && ag.horario === horario
    );

    if (jaExiste) {
        alert("Horário já ocupado!");
        return;
    }

    agendamentos.push({ nome, data, horario });


    const lista = document.getElementById("listaDeAgendamento");
    const item = document.createElement("li");
    item.textContent = `${nome} - ${data} às ${horario}`;
    lista.appendChild(item);


    atualizarHorarios();

    limparCampos();
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("horario").value = "";
}