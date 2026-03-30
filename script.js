function agendar(){
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    if (!nome || !data || !horario){
        alert("Preencha todos os campos!")
    return;
    }

    const lista = document.getElementById ("listaDeAgendamento")
    const item = document.createElement('li');
    item.textContent = `${nome} -- ${data} -- ${horario}`
    lista.appendChild(item);


}


