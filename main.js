const content = document.getElementById('content');
const createTaskControl = document.getElementById('createTask__control');
const createTaskaddBtn = document.getElementById('createTask__addBtn');
const deleteAllBtn = document.getElementById('createTask__deleteAllBtn');

// traemos todos los datos del localstorage
// nos devuelve un objeto el cual convertimos en arreglo
const tasks = Object.keys({ ...localStorage});

const createTask = (title) => {

    const task = document.createElement('article');
    const taskTitle = document.createElement('textarea');
    const taskUpdateBtn = document.createElement('button');
    const taskDeleteBtn = document.createElement('button');
    const iconUpdate = document.createElement('i');
    const iconDelete = document.createElement('i');

    task.setAttribute('class', 'task');
    taskTitle.setAttribute('class', 'task__title');
    taskTitle.setAttribute('spellcheck', 'false');
    taskUpdateBtn.setAttribute('class', 'task__updateBtn');
    taskDeleteBtn.setAttribute('class', 'task__deleteBtn');

    task.setAttribute('id', `task${title}`);
    taskUpdateBtn.setAttribute('id', title);
    taskDeleteBtn.setAttribute('id', title);

    iconUpdate.setAttribute('class', 'fa-regular fa-floppy-disk');
    iconDelete.setAttribute('class', 'fa-regular fa-trash-can');

    taskUpdateBtn.appendChild(iconUpdate);
    taskDeleteBtn.appendChild(iconDelete);

    taskTitle.value = localStorage.getItem(title);
    task.append(taskTitle, taskUpdateBtn, taskDeleteBtn);
    content.appendChild(task);

    // escala el textarea de acuerdo al contenido
    const textAreaHeight = ()=> {
        taskTitle.style.height = '5px';
        let height = taskTitle.scrollHeight;
        taskTitle.style.height = `${height}px`;
    }
    textAreaHeight();

    // cuando se escriba mas contenido también se escala de acuerdo a este
    taskTitle.addEventListener('keyup', e => {
        textAreaHeight();
    });

    // eliminar tareas
    taskDeleteBtn.addEventListener('click', ()=> {
        localStorage.removeItem(taskDeleteBtn.id);
        content.removeChild(document.getElementById(`task${taskDeleteBtn.id}`));
    });

    // actualizar tareas
    taskUpdateBtn.addEventListener('click', ()=> {
        if (taskTitle.value.length > 0) {
            localStorage.removeItem(taskUpdateBtn.id)
            localStorage.setItem(taskTitle.value, taskTitle.value);

            task.setAttribute('id', `task${taskTitle.value}`);
            taskUpdateBtn.setAttribute('id', taskTitle.value);
            taskDeleteBtn.setAttribute('id', taskTitle.value);
        }
    });

}

// se cargan las tareas al entrar o actualizar la página
tasks.forEach(element => {
    createTask(element);
});

// añadimos tareas
createTaskaddBtn.addEventListener('click', ()=> {
    // solo se almacenan datos en el localstorage si hay texto en el input
    // y también si la tarea NO está almacenada o no ha sido creada
    if (createTaskControl.value.length > 0 && !(createTaskControl.value in localStorage)) {
            localStorage.setItem(createTaskControl.value, createTaskControl.value);
            createTask(createTaskControl.value);
            // borramos el texto del input
            createTaskControl.value = "";
    }
});

// borramos todas las tareas
deleteAllBtn.addEventListener('click', ()=> {
    localStorage.clear();
    content.innerHTML = "";
})