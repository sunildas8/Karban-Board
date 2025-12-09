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