document.addEventListener('DOMContentLoaded', function() {
    const materias = document.querySelectorAll('.materia');

    materias.forEach(materia => {
        materia.addEventListener('click', function() {
            // No hacer nada si la materia está bloqueada
            if (this.classList.contains('bloqueada')) {
                return;
            }

            // Alternar la clase 'aprobada'
            this.classList.toggle('aprobada');

            // Revisar si esta materia es un prerrequisito para otra
            revisarPrerrequisitos(this.id);
        });
    });

    function revisarPrerrequisitos(idMateriaAprobada) {
        const materiasBloqueadas = document.querySelectorAll(`[data-requisito=${idMateriaAprobada}]`);

        materiasBloqueadas.forEach(materiaBloqueada => {
            const requisito = document.getElementById(materiaBloqueada.dataset.requisito);
            
            // Si el prerrequisito está aprobado, desbloquear la materia
            if (requisito.classList.contains('aprobada')) {
                materiaBloqueada.classList.remove('bloqueada');
            } else {
                // Si se desmarca el prerrequisito, volver a bloquear y desaprobar la materia dependiente
                materiaBloqueada.classList.add('bloqueada');
                materiaBloqueada.classList.remove('aprobada');
            }
        });
    }
});
