const agendamentos = [];

const horariosDisponiveis = [
    "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00"
];

let hoje = new Date().toISOString().split("T")[0];
document.getElementById("data").min = hoje;

function atualizarHorarios() {
    const dataSelecionada = document.getElementById("data").value;
    const select = document.getElementById("horario");

    select.innerHTML = '<option value="" selected disabled>Selecione um horário</option>';

    if (!dataSelecionada) return;


    let hoje = new Date().toISOString().split("T")[0];
    let horaAtual = new Date().getHours();

    const horariosOcupados = agendamentos
        .filter(ag => ag.data === dataSelecionada)
        .map(ag => ag.horario);

    horariosDisponiveis.forEach(horario => {

        
        if (horariosOcupados.includes(horario)) {
            return;
        }

        
        if (dataSelecionada === hoje) {
            let horaDoHorario = Number(horario.split(":")[0]);

            if (horaDoHorario <= horaAtual) {
                return;
            }
        }

    
        const option = document.createElement("option");
        option.value = horario;
        option.textContent = horario;

        select.appendChild(option);
    });

    select.selectedIndex = 0;
}

function agendar() {
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    let hoje = new Date().toISOString().split("T")[0];

    
    if (data < hoje) {
        alert("Escolha uma data válida!");
        return;
    }

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

    let dataFormatada = new Date(data).toLocaleDateString("pt-BR");

    item.textContent = `${nome} - ${dataFormatada} às ${horario}`;
    lista.appendChild(item);

    atualizarHorarios();
    limparCampos();

    alert(`Agendamento confirmado para ${dataFormatada} às ${horario}`);
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("horario").selectedIndex = 0;
}

