console.log('RTVGHBNJ');

window.onload = function () {

    app.init();
}

let app = {
    init: function () {
        this.loadContent();
    },

    addRow: function (data) {
        let tbody = document.getElementsByClassName("posts")[0];
        let tr = document.createElement("tr");
        //  tr.className = "table-dark";

        tr.innerHTML = `<tr>
                        <td>${data.nombreArchivo}</td>
                        <td>${data.fecha}</td>
                        <td>${data.nombreUsuario}</td>
                        <td>${data.starred}</td>
                        </tr>`;
        tbody.appendChild(tr);
    },

    loadContent: function () {
        fetch('/users/profile/mostrarTodosLosArchivos', {
            method: 'GET'
        }).then(res =>
            res.json()
        )
            .then(data => {
                let filas = "";
                data.files.forEach(element => {
                    filas = filas + `
                        <tr >
                        <td>${element.nombreArchivo}</td>
                        <td>${element.fecha}</td>
                        <td>${element.nombreUsuario}</td>
                        <td>${element.starred}</td>
                        </tr>`
                });
                console.log(filas);
                document.querySelector(".getAllFiles")
                document.querySelector(".getAllFiles").innerHTML = filas;
                //onsole.log(element);
                //this.addRow(element);
            });

    }


}
