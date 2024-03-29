// Creamos un array vacío para almacenar las tareas
var listaTareas = [];

// Función para agregar una nueva tarea a la lista
function agregarTarea() {
    
    var tarea = prompt("Ingrese la nueva tarea:");

    // Si el usuario ingresa algo (y no cancela el prompt), agregamos la tarea a la lista
    if (tarea !== null && tarea !== "") {
        listaTareas.push(tarea);
        alert("Tarea agregada correctamente.");
    } else {
        alert("No se ha ingresado ninguna tarea.");
    }
}

// Función para mostrar la lista de tareas
function mostrarTareas() {
    var mensaje = "Lista de Tareas:\n";
    

    // Iteramos sobre el array de tareas para mostrarlas
    for (var i = 0; i < listaTareas.length; i++) {
        mensaje += (i + 1) + ". " + listaTareas[i] + "\n";
    }

    // Mostramos las tareas con un alert
    alert(mensaje);
}

// Función principal que controla el flujo del programa
function principal() {
    var opcion;

    // Mientras el usuario no elija salir, seguimos mostrando el menú
    while (true) {
        var nombre = prompt(" Ingrese su nombre");
        opcion = prompt("Seleccione una opción:\n1. Agregar Tarea\n2. Ver Tareas\n3. Salir");
        
        if (opcion === null || opcion === "") {
            alert("Por favor, ingrese una opción válida.");
            continue;
        }

        opcion = parseInt(opcion);

        if (opcion === 1) {
            agregarTarea();
        } else if (opcion === 2) {
            mostrarTareas();
        } else if (opcion === 3) {
            // Si el usuario elige salir, mostramos un mensaje de despedida y salimos del bucle
            alert("¡Hasta luego!");
            break;
        } else {
            alert("Opción inválida. Por favor, seleccione una opción válida.");
        }
    }
}

// Llamamos a la función principal para iniciar el programa
principal();