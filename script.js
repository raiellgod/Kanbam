const $modal = document.getElementById('modal');
const $descrptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $columnInput = document.getElementById('column');
const $deadlineInput = document.getElementById('deadline');
const $idInput = document.getElementById('idInput');


const $creationModeTitle = document.getElementById('creationModeTitle');
const $editModeTitle = document.getElementById('editModeTitle');

const $btnCadastro = document.getElementById('btnCadastro');
const $btnEdit = document.getElementById('btnEdit');

var taskList = [];

function OpenModal(id) {
    $modal.style.display = "flex"

    if (id) {
        $creationModeTitle.style.display = "none";

        $editModeTitle.style.display = "flex";

        $btnCadastro.style.display = "none";

        $btnEdit.style.display = "flex";

        const index = taskList.findIndex(function (task) {
            return task.id = id;
        });

        const task = taskList[index];

        $idInput.value = task.id;
        $descrptionInput.value = task.description;
        $priorityInput.value = task.priority;
        $deadlineInput.value = task.deadline;

    } else {
        $creationModeTitle.style.display = "flex";

        $editModeTitle.style.display = "none"

        $btnCadastro.style.display = "flex";

        $btnEdit.style.display = "none";
    };
}

function CloseModal() {
    $modal.style.display = "none";

    $idInput.valeu = "";
    $descrptionInput.value = "";
    $priorityInput.value = "";
    $columnInput.value = "";
    $deadlineInput.value = "";

}


function resertColumns() {
    document.querySelector(`[data-column ="1"] .body`).innerHTML = '';
    document.querySelector(`[data-column ="2"] .body`).innerHTML = '';
    document.querySelector(`[data-column ="3"] .body`).innerHTML = '';
    document.querySelector(`[data-column ="4"] .body`).innerHTML = '';
}



function GenerateCards() {


    resertColumns();


    taskList.forEach(function (task) {

        const columnBody = document.querySelector(`[data-column ="${task.column}"] .body`);




        const card = `
      <div class="card" ondblclick="OpenModal(${task.id})">
        <div class="info" id="descricao">
            <b>Descrição:</b>
            <span>${task.description}</span>
        </div>

        <div class="info" id="prioridade">
            <b>Prioridade:</b>
            <span>${task.priority}</span>
        </div>

        <div class="info" id="data">
            <b>prazo:</b>
            <span>${task.deadline}</span>
        </div>
      </div>
     `;

        columnBody.innerHTML += card;
    });



    //  if(task.priority == Alta ) {
    //     card.style.background_color = "#D0312D"
    //  } else{
    //     if (task.priority == Média) {
    //         card.style.background_color = "#FCE205"
    //     } else {
    //         card.style.background_color = "#99FD99"
    //     }
    //  }

}


function CreateTask() {

    const newTask = {
        id: Math.floor(Math.random() * 999999999),
        description: $descrptionInput.value,
        priority: $priorityInput.value,
        column: $columnInput.value,
        deadline: $deadlineInput.value
    }

    taskList.push(newTask);

    console.log(column)

    CloseModal();
    GenerateCards();
}



function UpdateTask() {
    const task = {
        id: $idInput.value,
        description: $descrptionInput.value,
        priority: $priorityInput.value,
        column: $columnInput.value,
        deadline: $deadlineInput.value
    }

    const index = taskList.findIndex(function (task) {
        return task.id = $idInput.value;
    });

    taskList[index] = task;

    CloseModal();
    GenerateCards();
}

