const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody= document.querySelectorAll(".card-body")[0];
const secondCardBody= document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch")


let todos= []

runEvent();

function runEvent(){
    form.addEventListener("submit" , addTodo )
    document.addEventListener("DOMContentLoaded" , pageLoaded)
    secondCardBody.addEventListener("click", removeTodoUI)
    clearButton.addEventListener("click" , alltodosEveryhere)
    filterInput.addEventListener("keyup", filter)
}

function pageLoaded(){
    checkTodosFromStorage();  //-------------->>>> sayfa yenilenirse bile veriler kayıtlı kalır
    todos.forEach(function(todo){
        addTodoToUI(todo)
    });

}

 function filter(e){

   const filterValue = e.target.value.toLowerCase().trim();
   const todoListesi = document.querySelectorAll(".list-group-item");
    
   if( todoListesi.length>0 ){
    todoListesi.forEach(function(todo){                                         // trim() boşlukları yok sayar , includes() yarım kelimeyi bile arar
                                                                                // toLoweCase() buyuk küçük harf hassasiyetini yok sayar.
        if(todo.textContent.toLowerCase().trim().includes(filterValue)){
          
           todo.setAttribute("style" , "display : block");       
       
        }else{                                                     //--->> bootstrapteki özellikleri dikkate almaz "important" .
           todo.setAttribute("style" , "display : none !important");
        }
    });
   


   }else{
      showAlert("waring", "filtreleme yapmak için  en az bir todo olmalı ")

   }
 }


function alltodosEveryhere(){
    const todoListesi = document.querySelectorAll(".list-group-item")
    if(todoListesi.length>0){
        //ekrandan silme
    todoListesi.forEach(function(todo){
        todo.remove();
        showAlert("info" , "başarıyla silindi 😛");
    })
    todos= [];  //--->>> todos dizisini silme
    localStorage.setItem("todos" , JSON.stringify(todos)); //------->>> locali güncelleme
       // storageden silme
    }else{
        showAlert("warning" , "silmek için en az bir karakter giriniz ❗❗❗")
    }
}



function removeTodoUI(e){
    if(e.target.className==="fa fa-remove"){
     const todo = e.target.parentElement.parentElement;
     todo.remove();                                 ///------------>>>>> ekrandan silme

     //storageden sileme
     removeTodoToStorage(todo.textContent);

     showAlert("success" , "todo başarıyla silindi")
    }

}

function removeTodoToStorage(removeTodo){
   checkTodosFromStorage();
   todos.forEach(function(todo,index){
    if(removeTodo===todo){              //--------->>> todoları localden silme
        todos.splice(index,1);
    }
     });
    localStorage.setItem("todos" , JSON.stringify(todos));


}


function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText===null || inputText===""){  //--------->>>> input kısmı boş olursa
        showAlert("info","lütfen bir değer giriniz ❌" );

    }else{
        // arayüz ekleme ornekleri
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert( "sucess" ,"todo eklendi başarıyla eklendi ✅" )
    }
    // storage ekleme
   e.preventDefault( )
}

function addTodoToUI(newTodo){
    const li =document.createElement("li");
    li.className ="list-group-item d-flex justify-content-between"
    li.textContent=newTodo;

    const a = document.createElement("a");
    a.href="#";
    a.className="delete-item";


    const i = document.createElement("i");
    i.className="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoToStorage(newTodo){
         checkTodosFromStorage();
         todos.push(newTodo);
         localStorage.setItem("todos", JSON.stringify(todos));
}

function  checkTodosFromStorage(){
    
    if(localStorage.getItem("todos")===null){;
    todos = []
}else{
     
    todos = JSON.parse(localStorage.getItem( "todos"));
 }
}
function showAlert(type ,message ){
      
    const div = document.createElement("div");
    // div.className= "alert alert -"+ type;
    div.className= ` alert alert -${type}`; // template literal
    div.textContent = message;
    
    firstCardBody.appendChild(div);
    
    // belirtilen süre sonunda mesajı sil

    setTimeout(function() {
      div.remove();
    }, 2500 )
}

