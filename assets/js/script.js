const tareas = [
    {id: 1, nombre: 'Pasear al perrito', completado: false},
    {id: 2, nombre: 'Alimentar a los gatitos', completado: false},
    {id: 3, nombre: 'Ordenar la habitación', completado: false}
    
];

function renderTareas(tareasLista, contenedorId) {
    //Contenedor de HTML donde se agregan las tareas
    const contenedor = document.getElementById(contenedorId)

    //Variable para almacenar el html a renderizar
    let contenidoHtml = '';

    //Iteración sobre las tareas
    for (let tarea of tareasLista){
        //Crear la renderización con strings
        let tareaHtml = `
            <tr>
                <td>${tarea.id}</td>
                <td>${tarea.nombre}</td>
                <td>
                <input type = 'checkbox'
                    data-id='${tarea.id}'
                    ${tarea.completado ? 'checked':''}
                    onchange='actualizarEstado(${tarea.id}, this.checked)'>
                </td>
                <td>
                    <button onclick = 'eliminarTarea(${tarea.id})'>❎</button>
                </td>
            </tr>
        
        `;
        contenidoHtml += tareaHtml;
    }

    contenedor.innerHTML = contenidoHtml
}

//Función para eliminar una tarea
function eliminarTarea(id) {
    const index = tareas.findIndex(tarea => tarea.id === id);

    if(index!==-1) {
        tareas.splice(index,1);
        
        renderTareas(tareas, 'lista-tareas')
    }
}

//Función para agregar tareas desde input
let contadorId = 4
function agregarTarea() {
    
    const tareaInput =document.getElementById('agregar-tarea');
    const nombreTarea = tareaInput.value.trim();
    
    if (nombreTarea){
        const nuevaTarea = {
            id: contadorId++,
            nombre: nombreTarea,
            completado: false
        }
        tareas.push(nuevaTarea);

        renderTareas(tareas, 'lista-tareas');
        tareaInput.value = '';
    }
}
    
//Función para actualizar el estado
function actualizarEstado(id) {
    const task = tareas.find(task => task.id === id)

    if(task) {
        task.completado =!task.completado

        renderTareas(tareas, 'lista-tareas')
    }

}

window.onload = () => {
    //renderizar tareas en array tareas
    renderTareas(tareas, 'lista-tareas')

    //Agregar evento al boton de agregar tareas
    const btnAgregar = document.getElementById('btn-agregar');
    btnAgregar.addEventListener('click', agregarTarea);

    //Permitir ingresar tarea presionando tecla enter
    const enterInput = document.getElementById('agregar-tarea')
    enterInput.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            agregarTarea()
        }
    })

}
