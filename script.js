document.addEventListener('DOMContentLoaded', function() {
    const materias = document.querySelectorAll('.materia');

    // Revisa el estado de todas las materias al cargar la página
    actualizarEstadoMaterias();

    materias.forEach(materia => {
        materia.addEventListener('click', function() {
            // No permite aprobar una materia que esté bloqueada
            if (this.classList.contains('bloqueada') && !this.classList.contains('aprobada')) {
                return;
            }

            // Alterna el estado de aprobación
            this.classList.toggle('aprobada');

            // Vuelve a revisar el estado de todas las materias para actualizar la cadena de prerrequisitos
            actualizarEstadoMaterias();
        });
    });

    function actualizarEstadoMaterias() {
        materias.forEach(materia => {
            const requisitos = materia.dataset.requisito;
            
            // Si la materia no tiene el atributo 'data-requisito', no hace nada.
            if (!requisitos) {
                return;
            }

            // Maneja el caso especial de prerrequisitos por créditos
            if (requisitos === "creditos") {
                return; // Mantiene estas materias bloqueadas por defecto
            }

            const listaRequisitos = requisitos.split(',').map(item => item.trim());
            let todosLosRequisitosAprobados = true;

            for (const reqId of listaRequisitos) {
                const elementoRequisito = document.getElementById(reqId);
                // Si un requisito no se encuentra o no está aprobado, se marca como no cumplido
                if (!elementoRequisito || !elementoRequisito.classList.contains('aprobada')) {
                    todosLosRequisitosAprobados = false;
                    break;
                }
            }

            if (todosLosRequisitosAprobados) {
                materia.classList.remove('bloqueada');
            } else {
                materia.classList.add('bloqueada');
                // Si una materia se vuelve a bloquear, también se le quita el estado de "aprobada"
                materia.classList.remove('aprobada');
            }
        });
    }
});
