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

var tasks = localStorage.getItem("tasks");

var taskList = tasks ? JSON.parse(tasks) : [];

GenerateCards();

function OpenModal(data_column) {
    $modal.style.display = "flex"

        $creationModeTitle.style.display = "flex";

        $editModeTitle.style.display = "none";

        $btnCadastro.style.display = "flex";

        $btnEdit.style.display = "none";
        
        $columnInput.value = data_column;

    }

function OpenModalToEdit(id) {
    $modal.style.display = "flex"

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
        $columnInput.value = task.column;
};

function CloseModal() {
    $modal.style.display = "none";

    $idInput.valeu = "";
    $descrptionInput.value = "";
    $priorityInput.value = "";
    $columnInput.value = "";
    $deadlineInput.value = "";

}


function resertColumns() {
    document.querySelector(`[data-column ="1"] .body .cards_list`).innerHTML = '';
    document.querySelector(`[data-column ="2"] .body .cards_list`).innerHTML = '';
    document.querySelector(`[data-column ="3"] .body .cards_list`).innerHTML = '';
    document.querySelector(`[data-column ="4"] .body .cards_list`).innerHTML = '';
}



function GenerateCards() {


    resertColumns();


    taskList.forEach(function (task) {
        

        const columnBody = document.querySelector(`[data-column ="${task.column}"] .body .cards_list`);




        const card = `
      <div id="${task.id}" class="card" ondblclick="OpenModalToEdit(${task.id})" draggable="true" ondragstart="dragstart_handler(event);">
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

    localStorage.setItem("tasks", JSON.stringify(taskList));

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

    localStorage.setItem("tasks", JSON.stringify(taskList));

    CloseModal();
    GenerateCards();
}


function changeColumn(task_id, column_id) {
    if (task_id && column_id) {
      taskList = taskList.map((task) => {
        if (task_id != task.id) return task;
    
        return {
          ...task,
          column: column_id,
        };
      });
    }

    localStorage.setItem("tasks", JSON.stringify(taskList));
   
    GenerateCards();
  }
  
  function dragstart_handler(ev) {
    console.log(ev);
  
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("my_custom_data", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
  }
  
  function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }
  
  function drop_handler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const task_id = ev.dataTransfer.getData("my_custom_data");
    const column_id = ev.target.dataset.column;
    
    changeColumn(task_id, column_id);
  }
  