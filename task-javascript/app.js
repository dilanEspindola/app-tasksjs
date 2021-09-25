document.querySelector('#formTask').addEventListener('submit', saveTask);

function saveTask(event) { 
    
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    
    const task = {
        title, // title: title
        description // description: description
    };
    
    if(localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }    

    setTimeout(() => {
        getTasks();
    }, 1000);    

    document.querySelector('#formTask').reset(); //resetea el formulario

    event.preventDefault();
}

function getTasks () {
    let storage = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.querySelector('#task');

    tasksView.innerHTML = ''; // se deja limpio
    
    for(let i = 0; i < storage.length; i++) {
        let title = storage[i].title;
        let desciption = storage[i].description;
        tasksView.innerHTML += `<div class="card mb-3">
            <div class="body-card p-3">
                <p>${title} - ${desciption}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">Borrar</a>
            </div>
        </div>`;
    }   
}
getTasks();

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].title == title) {
            tasks.splice(i, 1); //indice a borrar y elementos a borrar            
        }
    }
    let msg = document.querySelector('#task');
            msg.innerHTML = `<p>Tarea borrada con exito</p>`;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    getTasks();
}