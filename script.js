let todo = document.querySelector('#todo');
let progress = document.querySelector('#progress')
let done = document.querySelector('#done')
let dragEvent = null;

const tasks = document.querySelectorAll('.task')

tasks.forEach(task => {
    task.addEventListener('drag', (e)=>{
        // console.log("dragging", e);
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
        console.log('droped', dragEvent, column);

        column.appendChild(dragEvent)
        column.classList.remove('hover_over')
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

    const div = document.createElement('div')
    div.classList.add('task')
    div.setAttribute('draggable', 'true')

    div.innerHTML = 
            `<h2>${taskTitle}</h2>
            <p>${taskDesc}</p>
            <button>Delete</button>`

    todo.appendChild(div)

    div.addEventListener('drag', (e)=>{
        dragEvent = div
    })

    modal.classList.remove('active')
})