const $modal = document.getElementById('modal');
const $description = document.getElementById('description');
const $priority = document.getElementById('priority');
const $deadline = document.getElementById('deadline');
const $idInput = document.getElementById('idInput');
const $fazerBody = document.querySelector('#fazer .body');

const $creationModeTitle = document.getElementById ('creationModeTitle');
const $editModeTitle = document.getElementById ('editModeTitle');

const $btnCadastro = document.getElementById('btnCadastro');
const $btnEdit =document.getElementById('btnEdit');

var todoList = [];

function OpenModal(id) {
    $modal.style.display = "flex"

    if (id) {
        $creationModeTitle.style.display = "none";

        $editModeTitle.style.display = "flex";

        $btnCadastro.style.display = "none";

        $btnEdit.style.display = "flex";

        const index = todoList.findIndex(function(task) {
            return task.id = id;
        });

        const task = todoList[index];

        $idInput.value = task.id;
        $description.value = task.description;
        $priority.value = task.priority;
        $deadline.value = task.deadline;

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
    $description.value = "";
    $priority.value = "";
    $deadline.value = "";

}

function GenerateCards() {
 const todoListHtml = todoList.map( function(task) {
     return `
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
 });

 $fazerBody.innerHTML = todoListHtml.join('');

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
        description: $description.value,
        priority: $priority.value,
        deadline: $deadline.value
    }

    todoList.push(newTask);

    CloseModal();
    GenerateCards();
}



function UpdateTask() {
    const task = {
        id: $idInput.value,
        description: $description.value,
        priority: $priority.value,
        deadline: $deadline.value
    }

    const index = todoList.findIndex(function(task) {
        return task.id = $idInput.value;
    });

    todoList[index] = task;

    CloseModal();
    GenerateCards();
}

