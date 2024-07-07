document.addEventListener('DOMContentLoaded', () => {
    let taskIdCounter = 1;
    const tasks = [
        { id: 1, description: 'Hacer mercado', completed: false },
        { id: 2, description: 'Estudiar para la prueba', completed: false },
        { id: 3, description: 'Sacar a pasear a Tobby', completed: false }
    ];
    
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const totalTasksElement = document.getElementById('total-tasks');
    const completedTasksElement = document.getElementById('completed-tasks');

    function updateSummary() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        totalTasksElement.textContent = totalTasks;
        completedTasksElement.textContent = completedTasks;
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const tr = document.createElement('tr');
            const tdId = document.createElement('td');
            const tdDescription = document.createElement('td');
            const tdActions = document.createElement('td');

            tdId.textContent = task.id;
            tdDescription.textContent = task.description;

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Realizado' : 'Completar';
            completeButton.className = 'complete';
            completeButton.onclick = () => {
                task.completed = !task.completed;
                renderTasks();
                updateSummary();
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => {
                const index = tasks.indexOf(task);
                tasks.splice(index, 1);
                renderTasks();
                updateSummary();
            };

            tdActions.appendChild(completeButton);
            tdActions.appendChild(deleteButton);
            tr.appendChild(tdId);
            tr.appendChild(tdDescription);
            tr.appendChild(tdActions);

            taskList.appendChild(tr);
        });
    }

    addTaskButton.addEventListener('click', () => {
        const description = newTaskInput.value.trim();
        if (description) {
            tasks.push({ id: taskIdCounter++, description, completed: false });
            newTaskInput.value = '';
            renderTasks();
            updateSummary();
        }
    });

    renderTasks();
    updateSummary();
});
