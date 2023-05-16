window.onload = function() {
    // Obtener lista de documentos desde el servidor
    fetch("get_documents.php")
        .then(response => response.json())
        .then(data => {
            const documentosLista = document.getElementById("documentos-lista");
            data.forEach(documento => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <a href="${documento.url}" target="_blank">${documento.nombre}</a>
                    <span class="delete-button" data-id="${documento.id}">&#10006;</span>
                `;
                documentosLista.appendChild(li);
            });

            // Agregar evento de click a los botones de borrar
            const deleteButtons = document.getElementsByClassName("delete-button");
            for (let i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener("click", function() {
                    const id = this.getAttribute("data-id");
                    deleteDocumento(id);
                });
            }
        });
};

function deleteDocumento(id) {
    // Verificar si el usuario es administrador
    if (!esAdministrador()) {
        alert("No tienes permiso para borrar documentos.");
        return;
    }

    // Lógica para borrar el documento desde el servidor
    fetch(`delete_document.php?id=${id}`)
        .then(response => response.text())
        .then(result => {
            if (result === "success") {
                // Borrar el documento de la lista en el cliente
                const elemento = document.querySelector(`[data-id="${id}"]`);
                elemento.parentNode.remove();
            } else {
                alert("Error al borrar el documento.");
            }
        });
}

function esAdministrador() {
    // Aquí puedes implementar tu lógica para verificar si el usuario es administrador
    // Puede ser mediante una sesión de usuario, autenticación, etc.
    // En este ejemplo, siempre se devuelve true para simplificar.
    return true;
}
