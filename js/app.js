// Problem : user interaction doesn't provide desired results
// Solution : Add interactivity so the user can manage daily task. 
var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first-button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); // incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

// New Task list item
var createNewTaskElement = function(taskString) {
    // Create list Item
    var listItem = document.createElement("li");
    
    // input (checkbox)
    var checkBox = document.createElement("input"); //checkbox
        // label
    var label = document.createElement("label");
        // input (text)
    var editInput = document.createElement("input");
        // button.edit
    var editButton = document.createElement("button");
        // button.delete
    var deleteButton = document.createElement("button");
    
    // Each element needs to be modified
    checkBox.type = "checkbox";
    editInput.type = "text";
    
    editButton.innerText = "Eidt";
    deleteButton.innerText = "Delete";
    editButton.className = "edit";
    deleteButton.className = "delete";
    
    label.innerText = taskString;
    
    
    // Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    return listItem;
}

// Add a new task
var addTask= function() {
    console.log("Add Task...");
    // create a new list item with the text from the #new-task:
    var listItem = createNewTaskElement("Some New Task");
    // Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);  
    bindTaskEvents(listItem, taskIncomplete);
    
    taskInput.value = "";
};

// Edit an existing task
var editTask = function(){
    console.log("Edit Task...");
    var listItem = this.parentNode;
    
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    
    var containsClass = listItem.classList.contains("editmode");
    //if the class of the parent is .editMode
    if(containsClass) {
        //Switch from .editMode
        //label text become the input's value
        label.innerText = editInput.value;
    }else {
        //switch to .editMode
        //input value becomes the label's text
        editInput.value = label.innerText;
    }
    
    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");
}

// Mark a Task as complete
var taskCompleted = function(){
    console.log("Task Complete...");
    //append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// Mark a Task as incomplete
var taskIncomplete = function() {
    console.log("Task Incomplete...");
        //append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}


// Delete an existing task
var deleteTask = function() {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //remove the parent list item from the ul
    ul.removeChild(listItem);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    // select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");;
    
    // bind the editTask to edit button
    editButton.onclick = editTask;
    // bind the deleteTask to the delete button
    deleteButton.onclick = deleteTask;
    // bind the checkBoxEventHandler to the checkbox
    checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function () {
    console.log("AJAX request");
}

// set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
   // bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// cycle over completedTasksHolder ul list items
        // bind events to list item's children (taskIncomplete)
for(var i = 0; i < completedTasksHolder.children.length; i++) {
   // bind events to list item's children (taskCompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}