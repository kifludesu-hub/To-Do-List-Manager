let inputField= document .querySelector(".inputField");
let date= document.querySelector('.date');
let addbtn= document.getElementById("addBtn");
let output= document.querySelector(".list-container");
let filterBtns=document.querySelector(".filterBtns");
let toDoList=JSON.parse(localStorage.getItem("todo")) || [];
console.table(toDoList);
let editingId= null;
let currentfilterd="all";
    function renderList(tasks=toDoList){
        output.innerHTML= "";
        tasks.forEach(item => {
            let listOfItems= document.createElement("div");
            listOfItems.classList.add("listOfItems");
            if(item.status==="completed"){
                listOfItems.classList.add("checked");

            }
    
            listOfItems.innerHTML =`<input type="checkbox" data-id="${item.id}" class="checkbox"  ${item.status === "completed" ? "checked":""} title="Complete task"><li>${item.name}</li><li>${item.date}</li><button class="edit" data-id="${item.id}" title="Edit task"><i class="bi bi-pencil-square"></i></button> <button class="deleteBtn" data-id="${item.id}" title="delete task"><i class="bi bi-trash"></i>
            </button> `;
            output.append(listOfItems);
        
        });
        

    }
   renderList();
   function removeList() {
    output.addEventListener("click", (event) => {
        const deleteButton = event.target.closest(".deleteBtn");
        if (deleteButton){
        const id = deleteButton.dataset.id;
        toDoList = toDoList.filter(item => item.id !== id);
        localStorage.setItem("todo", JSON.stringify(toDoList));
        displayTasks();
        }
    });
}
    removeList();
    function addTaskList(){
        addbtn.addEventListener("click", ()=>{
            if (editingId !== null) {

                const task = toDoList.find(
                    item => item.id === editingId
                );
                task.name = inputField.value;
                task.date = date.value;
                localStorage.setItem("todo", JSON.stringify(toDoList));
            
                editingId = null;
            
                addbtn.textContent = "Add";
                inputField.value = "";
                date.value = "";
            
               displayTasks();      
            }else{
            if(inputField.value==="" || date.value===""){
                const errorElement=document.querySelector(".noInput-Error");
                let div= document.createElement("div");
                div.classList.add("delete");
                    div.innerHTML=  `Please provide the task name and date! <button class="remove-notification">x</button>`;
                div.style.color="red";
                
              errorElement.append(div);
              setTimeout(()=>{errorElement.removeChild(div)},1000);
            }else{
                const id= crypto.randomUUID();
          
    /* let listOfItems= document.createElement("div");
       listOfItems.classList.add("listOfItems");
            
      listOfItems.innerHTML =`<input type="checkbox" data-id="${id}">
      <li>${inputField.value}</li>
      <li>${date.value}</li>
    
      <button class="edit" data-id="${id}">Edit</button>
       <button class="deleteBtn" data-id="${id}">Delete</button>
       `;
       output.append(listOfItems);*/
            toDoList.unshift({name:inputField.value, date:date.value, id:id,status:false});
            inputField.value="";
            date.value="";
        localStorage.setItem("todo",JSON.stringify(toDoList));
     
        }
        }
        renderList();
        });
    }
    addTaskList();
    function editTask(){
     
      output.addEventListener("click",(e)=>{
        const editBtn= e.target.closest(".edit");
        if(editBtn){
            editingId=editBtn.dataset.id;
            const task=toDoList.find(element=>element.id===editingId);
            inputField.value=task.name;
            date.value=task.date;
            addbtn.textContent="Save";
          localStorage.setItem("todo",JSON.stringify(toDoList));
           }
        });
        
    }
editTask();
function completedTask(){
    output.addEventListener("change", (e)=>{
        if(e.target.classList.contains("checkbox")){
           let checkbox= e.target.dataset.id;
           const task=toDoList.find(item=>item.id===checkbox);
           task.status = e.target.checked
           ? "completed"
           : false;
        localStorage.setItem("todo",JSON.stringify(toDoList));
        
        displayTasks();
        }
        
    });
    
}
completedTask();
function filterTask(){
        filterBtns.addEventListener("click",(e)=>{
            if(e.target.classList.contains("filter-task")){
                currentfilterd= e.target.dataset.filter;
            displayTasks();
            }
             });
     } 
filterTask();
function displayTasks(){

    let filteredTasks;
            if(currentfilterd==="all") {
                filteredTasks=toDoList;
                
            }else if(currentfilterd==="completed") {
                filteredTasks= toDoList.filter(item=>item.status==="completed");
            }
            else if(currentfilterd==="pending"){
                filteredTasks =toDoList.filter(item=>item.status!=="completed");
                  }
                 
            renderList(filteredTasks);
}
