let tasksData = {}

let todo = document.querySelector('#todo');
let progress = document.querySelector('#progress')
let done = document.querySelector('#done') 
let dragEvent = null;


function addtask(title, desc, column){
    const div = document.createElement('div')

    div.classList.add('task')
    div.setAttribute('draggable', 'true')

    div.innerHTML = 
            `<h2>${title}</h2>
            <p>${desc}</p>
            <button>Delete</button>`

    column.appendChild(div)

    div.addEventListener('drag', (e)=>{
        dragEvent = div
    })

    const deleteButton = div.querySelector("button")
    deleteButton.addEventListener('click', ()=>{
        div.remove();
        updateTaskCount();
    })

    return div;
}

function updateTaskCount(){
    [todo, progress, done].forEach(col => {
        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.count');

        tasksData[col.id] = Array.from(tasks).map(t => {
            return{
                title: t.querySelector("h2").innerText,
                desc: t.querySelector('p').innerText
            }
        })
        localStorage.setItem("tasks", JSON.stringify(tasksData))
        count.innerText = tasks.length;
    })
}


if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"))
    
    for (const col in data) {
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task => {
           addtask(task.title, task.desc, column);
        })

        updateTaskCount();
    }
}

const tasks = document.querySelectorAll('.task')

tasks.forEach(task => {
    task.addEventListener('drag', (e)=>{
        dragEvent = task
    })
})

function addDragEventsOnColumn(column){
    column.addEventListener('dragenter', (e)=>{
        e.preventDefault()
        column.classList.add('hover_over')
    })
    column.addEventListener('dragleave', (e)=>{
        e.preventDefault()
        column.classList.remove('hover_over')
    })

    column.addEventListener('dragover', (e)=>{
        e.preventDefault()
    })
    column.addEventListener('drop', (e)=>{
        e.preventDefault()

        column.appendChild(dragEvent)
        column.classList.remove('hover_over');

        updateTaskCount();
        
    })
}

addDragEventsOnColumn(todo)
addDragEventsOnColumn(progress)
addDragEventsOnColumn(done)


// Modal //

const toggleModelButton = document.querySelector("#toggle_modal")
const modal = document.querySelector(".modal")
const modalBg = document.querySelector(".modal .bg")
const addTaskButton = document.querySelector("#add_new_task")


toggleModelButton.addEventListener('click', ()=>{
    modal.classList.toggle("active")
})

modalBg.addEventListener('click', ()=>{
    modal.classList.remove("active")
})

addTaskButton.addEventListener('click', ()=>{
    const taskTitle = document.querySelector('#task_input').value
    const taskDesc = document.querySelector('#task_desc').value

    addtask(taskTitle, taskDesc, todo);
    updateTaskCount();
    modal.classList.remove('active')

    document.querySelector('#task_input').value = ""
    document.querySelector('#task_desc').value = ""
})