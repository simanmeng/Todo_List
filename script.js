const newTodoForm = document.getElementById('new-todo-form');
const todoList = document.getElementById('todo-list');

const savedTodos =  JSON.parse(localStorage.getItem('todos')) || [];
for(let i = 0; i < savedTodos.length; i++){
    let newTodoDiv = document.createElement('div');
    let newTodo = document.createElement('li');
    let removeBtn = document.createElement('button');

    removeBtn.innerText = 'X';
    newTodo.innerText = savedTodos[i].task;
    newTodo.isCompleted = savedTodos[i].isCompleted? true: false;
    if(newTodo.isCompleted){
        newTodo.style.textDecoration = 'line-through';
    }
    newTodo.style.display = 'inline-block';
  
    todoList.appendChild(newTodoDiv);
    newTodoDiv.appendChild(newTodo);
    newTodoDiv.appendChild(removeBtn);
    
}

newTodoForm.addEventListener('submit',function(event){
    event.preventDefault();

    let removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';
    let newTodoDiv = document.createElement('div');
    let newTodo = document.createElement('li');
    let taskValue = document.getElementById('task').value;

    newTodo.innerText = taskValue;
    newTodo.isCompleted = false;
    newTodoForm.reset();
    newTodo.style.display = 'inline-block';

    todoList.appendChild(newTodoDiv)
    newTodoDiv.appendChild(newTodo);
    newTodoDiv.appendChild(removeBtn);
    
    savedTodos.push({ task: newTodo.innerText, isCompleted: false });
    localStorage.setItem('todos', JSON.stringify(savedTodos))
});

todoList.addEventListener('click',function(event){
    let clickedItem = event.target;
    const targetTag = event.target.tagName.toLowerCase();
    

    if(!clickedItem.isCompleted){
        clickedItem.style.textDecoration = 'line-through';
        clickedItem.isCompleted = true;
    } else {
        clickedItem.style.textDecoration = 'none';
        clickedItem.isCompleted = false;
    }

    for (let i = 0; i < savedTodos.length; i++) {
        if (savedTodos[i].task === clickedItem.innerText) {
          savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
          localStorage.setItem("todos", JSON.stringify(savedTodos));
        }
      }

    if(targetTag === 'button'){
        const taskToRemove = event.target.parentElement;
        const todoContent = event.target.previousElementSibling.innerText;

        for(let i = 0; i < savedTodos.length; i++){
            if((savedTodos[i].task) === todoContent){
                savedTodos.splice(i,1);
            }
        }
        localStorage.setItem('todos', JSON.stringify(savedTodos));
        taskToRemove.remove();
    }
});

// todoList.addEventListener('click',function(event){
//     const targetTag = event.target.tagName.toLowerCase();
//     const taskToRemove = event.target.parentElement;
//     const todoContent = event.target.previousElementSibling.innerText;

//     if(targetTag === 'button'){
        

//         for(let i = 0; i < savedTodos.length; i++){
//             if((savedTodos[i].task) === todoContent){
//                 savedTodos.splice(i,1);
//             }
//         }
//         localStorage.setItem('todos', JSON.stringify(savedTodos));
//         taskToRemove.remove();
//     }
// })

