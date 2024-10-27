class TodoList {
    constructor() {
        this.editingIndex = -1;
        this.addButton = document.getElementById('addButton');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        this.select = document.getElementById('combo-box');

        this.addButton.addEventListener('click', () => this.addOrUpdateTask());
        this.todoList.addEventListener('click', (e) => {
            const action = e.target.classList.contains('removeButton') ? 'remove' : 
                           e.target.classList.contains('editButton') ? 'edit' : 
                           e.target.classList.contains('doneButton') ? 'done' : null;
            if (action) this[action + 'Task'](e);
        });
        this.populateComboBox();
    }

    addOrUpdateTask() {
        const taskText = this.todoInput.value.trim();
        if (taskText) {
            this.editingIndex === -1 ? this.addTask(taskText) : this.updateTask(taskText);
            this.todoInput.value = '';
        }
    }

    addTask(taskText) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item todo-item';
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="timestamp" style="display: block; margin-top: 0.5rem; color: gray;">Date Added: ${new Date().toLocaleString()}</span>
            <div style="margin-top: 0.5rem;">
                <button class="btn btn-success btn-sm doneButton">Done</button>
                <button class="btn btn-warning btn-sm editButton">Edit</button>
                <button class="btn btn-danger btn-sm removeButton">Remove</button>
            </div>
        `;
        this.todoList.appendChild(listItem);
    }

    doneTask(event) {
        const taskItem = event.target.closest('.todo-item');
        const taskText = taskItem.querySelector('.task-text');
        taskText.classList.toggle('completed'); 

        const buttons = taskItem.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
    }

    updateTask(taskText) {
        this.todoList.children[this.editingIndex].querySelector('.task-text').textContent = taskText;
        this.resetEditing();
    }

    removeTask(event) {
        this.todoList.removeChild(event.target.closest('.todo-item'));
    }

    editTask(event) {
        const taskItem = event.target.closest('.todo-item');
        this.todoInput.value = taskItem.querySelector('.task-text').textContent;
        this.editingIndex = Array.from(this.todoList.children).indexOf(taskItem);
        this.addButton.textContent = 'Update';
    }

    resetEditing() {
        this.editingIndex = -1;
        this.addButton.textContent = 'Add';
    }
    async populateComboBox() {
        try {
            const response = await fetch('Classes\\Classes.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // Clear existing options
            this.select.innerHTML = '';
    
            // Iterate through each category in the JSON
            for (const [key, classes] of Object.entries(data)) {
                classes.forEach(className => {
                    const newOption = document.createElement('option');
                    newOption.value = className; // or use key if needed
                    newOption.textContent = className;
                    this.select.appendChild(newOption);
                });
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Optionally show an error message in the UI
            this.select.innerHTML = `<option disabled>Error loading options</option>`;
        }
    }
    updateSelectValue() {
        this.select.value = ""; // Optionally clear the select when typing
    }
    
}

class TimestampedTodoList extends TodoList {
    addTask(taskText) {
        super.addTask(taskText);
        const taskItem = this.todoList.lastChild; // Get the newly added task
        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        timestamp.textContent = new Date().toLocaleString();
        taskItem.appendChild(timestamp);
    }
}

document.addEventListener('DOMContentLoaded', () => new TodoList());