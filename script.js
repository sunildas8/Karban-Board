let tasksData = {}

let todo = document.querySelector('#todo');
let progress = document.querySelector('#progress')
let done = document.querySelector('#done') 
let dragEvent = null;

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"))
    
    for (const col in data) {
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task => {
            const div = document.createElement('div')

            div.classList.add('task')
            div.setAttribute('draggable', 'true')

            div.innerHTML = 
                    `<h2>${task.title}</h2>
                    <p>${task.desc}</p>
                    <button>Delete</button>`

            column.appendChild(div)

            div.addEventListener('drag', (e)=>{
                dragEvent = div
            })
        })

        const tasks = column.querySelectorAll('.task');
        const count = column.querySelector('.count');
        count.innerText = tasks.length;
    }
}

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
        console.log('dropped', dragEvent, column);

        column.appendChild(dragEvent)
        column.classList.remove('hover_over');

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

    todo.appendChild(div);

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

    div.addEventListener('drag', (e)=>{
        dragEvent = div
    })

    modal.classList.remove('active')
})