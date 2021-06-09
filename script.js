var sonidoOn = false;
var cancion = new Audio("audio/tema1.mp3");
let colores = ['lightblue','lightpink', 'lightcoral', 'lightyellow', 'lightcyan']
let randIndex = Math.floor(Math.random() * colores.length)
var formularioCont = document.getElementById('formCont');
var htmlName = window.location.pathname.split('/').pop()
var todoCount = 0;


document.body.style.backgroundColor = colores[randIndex];

if(htmlName.includes('contacto')){
$(document).ready(validacionForm);
$(document).ready(todoHandles)
}

if(htmlName.includes('trabajos'))
$(document).ready(videoControl)

addHandlers();

function soundControl(){
    
    if (sonidoOn){
    cancion.pause();
    cancion.currentTime = 0;
    sonidoOn = false;
    $('#botonmusica').addClass('off');
    }
    else {
    cancion.play()
    sonidoOn = true;
    $('#botonmusica').removeClass('off');
    }

}

function validacionForm (){

    const nombre = document.contacto.nombre
    const mail = document.contacto.mail
    const consulta = document.contacto.consulta
    const enviar = document.contacto.submit

    consulta.setCustomValidity('Tu consulta debe tener mas de 10 caracteres')

   nombre.addEventListener('input', validarDatos, false)
   mail.addEventListener('input', validarDatos, false)
   consulta.addEventListener('input', validarDatos, false)
   enviar.addEventListener('click', enviarDatos)

}

function validarDatos(e){
    
    var elemento = e.target
    elemento.setCustomValidity('')

    if(!elemento.validity.valid)
        elemento.style.backgroundColor = '#fab8af'
    else
        elemento.style.backgroundColor = '#bfffc7'
    
}

function enviarDatos(){

    const consulta = document.contacto.consulta
    const nombre = document.contacto.nombre
    
    var valido = document.contacto.checkValidity()

    if (valido){
        alert('Gracias por enviar tu consulta, recibiras respuesta a la brevedad')
        document.contacto.submit()
        
    }else if (!nombre.validity.valid){
        nombre.setCustomValidity('Tu nombre debe contener mas de 3 letras y no presentar numeros ni simbolols')
    }else if (!consulta.validity.valid){
        consulta.setCustomValidity('Tu consulta debe contener mas de 10 caracteres')
    }
}

function videoControl(){
    const video = document.querySelector('#video_presenta video');
    console.log(video);
    video.addEventListener('click', videoClick);
}

function videoClick (e){
   const wrapper = document.getElementById('video_presenta');
   const video = e.target

   if(video.paused){
       video.play();
       wrapper.style.backgroundImage = 'url(imagenes/iconos/pause-icon.png';
   }else{
       video.pause();
       wrapper.style.backgroundImage = 'url(imagenes/iconos/play-icon.png';
   }
}

function todoHandles (){
    const addBtn = $('#btn-addtodo')
    
    const todoInput = $('#todo-input')
    const todoDate = $('input[name=fecha]')

    addBtn.click(addTodo)
    todoInput.change(validarDatos)
    todoDate.change(validarDatos)

    mostrarUserTodo();
}

function addTodo (){
    const todoInput = $('#todo-input')
    const todoPrior = $('select[name=prioridad]')
    const todoDate = $('input[name=fecha]')

    if(document.addtodo.checkValidity()){
    let todoKey = ++todoCount
    console.log(todoKey)
    localStorage.setItem(todoKey, JSON.stringify({todo: todoInput.val(), prior: todoPrior.val(), fecha: todoDate.val(), tacha: false}))
    todoInput.val('')
    showTodo(todoKey)
    }
}

function showTodo(key){

    const todoBox = $('.todo-box-area')
    let todoData = JSON.parse(localStorage.getItem(key))
    console.log(todoData)
    let tachado = todoData.tacha? "line-through":"none"
    const todo = 
    `<div class= "todo" id= "${key}">
        <input type="checkbox" name="realizacion" onchange=checkTodo(event)>
        <p class= "todo-text" style="text-decoration:${tachado}">${todoData.todo}</p>
        <p>${todoData.prior}</p>
        <p>${todoData.fecha}</p>
        <button class="btn-deltodo" onclick=delTodo(event)>x</button>
    </div>`

    todoBox.append(todo)

}
function mostrarUserTodo(){

    for(i = 1; i <= localStorage.length; i++){
      showTodo(i)
      todoCount++
    }
}

function delTodo(e){
    const todo = $(e.target).parent()
    todo.remove()
    localStorage.removeItem(todo.attr('id'))
    todoCount--
    console.log(todoCount)
}

function checkTodo (e) {
    const todoText = $(e.target).next()
    if(e.target.checked)
        todoText.css('textDecoration', 'line-through')
    else
        todoText.css('textDecoration', 'none')
}

function addHandlers (){
    const navToggler = document.getElementById('nav_toggler_button');

    navToggler.onclick = () => menuExpand();
}

function menuExpand (e){
    console.log('click');
    const navToggler = document.getElementById('nav_toggler_button');
    const nav = document.getElementsByClassName('nav_menu')[0]; 

    if(!nav.classList.contains('expand')){
        navToggler.classList.add('up');
        nav.classList.add('expand');
    }else{
        nav.onanimationend = () => nav.classList.remove('closing');
        navToggler.onanimationend = () => navToggler.classList.remove('down');
        nav.classList.remove('expand');
        nav.classList.add('closing');
        navToggler.classList.remove('up');
        navToggler.classList.add('down');
        
    }
}