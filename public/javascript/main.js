window.onload = () => {
    app.init();
}

let app = {
    init: function () {
        this.addEvents();
        this.loadContent();
    },
    addEvents: function () {
        document.postForm.addEventListener("submit", (event) => {
            this.submitPost(event, this.addRow);
        });
    },
    addRow: function (data) {
        let tbody = document.getElementsByClassName("getAllFiles")[0];
        let tr = document.createElement("tr");
        tr.className = "table-dark";
        tr.innerHTML = `<th scope="row">
                        <i class="fas fa-file-pdf"></i>
                        ${data.nombreArchivo}
                        </th>
                        <td>${data.fecha}</td>
                        <td>${data.nombreUsuario}</td>
                        <td>${data.starred}</td>`;
        tbody.appendChild(tr);
    },
    loadContent: function () {
        fetch('/users/profile/mostrarTodosLosArchivos', {
                method: 'GET'
            }).then(res => {
                return res.json()
            })
            .then(data => {
                if (data.ok) {
                    console.log('llegue hasta aca x2')
                    console.log(data);
                    data.files.forEach(element => {
                        this.addRow(element);
                    });
                }
            })
    }

}