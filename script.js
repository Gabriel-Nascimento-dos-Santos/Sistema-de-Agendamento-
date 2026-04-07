const agendamentos = [];

const HORARIOS_DISPONIVEIS = [
    "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00"
];

function obterDataHoje() {
    return new Date().toISOString().split("T")[0];
}

function obterHoraAtual() {
    return new Date().getHours();
}

function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR");
}

function obterHorariosOcupados(dataSelecionada) {
    return agendamentos
        .filter(ag => ag.data === dataSelecionada)
        .map(ag => ag.horario);
}

function horarioJaPassou(dataSelecionada, horario) {
    const hoje = obterDataHoje();

    if (dataSelecionada !== hoje) return false;

    const horaAtual = obterHoraAtual();
    const horaDoHorario = Number(horario.split(":")[0]);

    return horaDoHorario <= horaAtual;
}

function podeAgendar({ nome, data, horario }) {
    const hoje = obterDataHoje();

    if (!nome || !data || !horario) {
        return { valido: false, mensagem: "Preencha todos os campos!" };
    }

    if (data < hoje) {
        return { valido: false, mensagem: "Escolha uma data válida!" };
    }

    const jaExiste = agendamentos.some(ag =>
        ag.data === data && ag.horario === horario
    );

    if (jaExiste) {
        return { valido: false, mensagem: "Horário já ocupado!" };
    }

    return { valido: true };
}

function atualizarHorarios() {
    const dataSelecionada = document.getElementById("data").value;
    const select = document.getElementById("horario");

    select.innerHTML = '<option value="" selected disabled>Selecione um horário</option>';

    if (!dataSelecionada) return;

    const horariosOcupados = obterHorariosOcupados(dataSelecionada);

    HORARIOS_DISPONIVEIS.forEach(horario => {
        if (horariosOcupados.includes(horario)) return;
        if (horarioJaPassou(dataSelecionada, horario)) return;

        const option = document.createElement("option");
        option.value = horario;
        option.textContent = horario;

        select.appendChild(option);
    });

    select.selectedIndex = 0;
}

function renderizarAgendamento({ nome, data, horario }) {
    const lista = document.getElementById("listaDeAgendamento");
    const item = document.createElement("li");

    item.textContent = `${nome} - ${formatarData(data)} às ${horario}`;
    lista.appendChild(item);
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("horario").selectedIndex = 0;
}

function agendar() {
    try {
        const nome = document.getElementById("nome").value.trim();
        const data = document.getElementById("data").value;
        const horario = document.getElementById("horario").value;

        const validacao = podeAgendar({ nome, data, horario });

        if (!validacao.valido) {
            alert(validacao.mensagem);
            return;
        }

        const novoAgendamento = { nome, data, horario };

        agendamentos.push(novoAgendamento);

        renderizarAgendamento(novoAgendamento);
        atualizarHorarios();
        limparCampos();

        alert(`Agendamento confirmado para ${formatarData(data)} às ${horario}`);
    } catch (erro) {
        console.error("Erro ao agendar:", erro);
        alert("Erro interno ao realizar agendamento.");
    }
}

document.getElementById("data").min = obterDataHoje();