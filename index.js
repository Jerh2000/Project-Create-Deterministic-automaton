 //#ARREGLO QUE ALAMCENARA LOS DATOS DE LA TRANSICIÓN
 var transitions = {};
 var alpha = [500,1000,2000,5000];

 var states = [];
var conexions = [];
var nodes;

function createTable(priceProduct){
    $("#table > tbody").empty();
    $("#d-price-product").text("$"+priceProduct);
    $(".disable").prop('disabled', true);
    //#ARREGLO QUE ME ALMACENA EL LENGUAJE DEL AUTOMATA
    //#ARREGLO AUXILIAR QUE ME IRA ALMACENADO LAS FILAS DE TRANSICION DE LA TABLA
    var rows  = [];

    //#CON ESTE ARREGLO EMPIEZO A CREAR LOS ESTADOS Y SOCIAR LAS TRANSICIONES CON EL LENGUAJE
    for(i = 0; i<=priceProduct; i+=500){
        var texto = "";
        var datos = [];
        datos.push(i);
        for(j = 0; j< alpha.length;j++){
            if((i+alpha[j]) <= priceProduct){
                // console.log(`${i} vs ${alpha[j]} == ${(i+alpha[j])}`);
                datos.push((i+alpha[j]));
            }else{
                datos.push("---");
            }
        }
        rows.push({ 
            "l1"    : datos[0],
            "l2"  : datos[1],
            "l3"    : datos[2],
            "l4"    : datos[3],
            "l5"    : datos[4],
        });
    }
    //#ASIGNO LAS FILAS AL ARREGLO DE TRANSICIONES
    transitions.elem = rows;

    //#LLENO LA TABLA CON LOS DATOS DE LAS TRANSCIONES
    for(i = 0; i< transitions.elem.length;i++){
        var tr = `<tr>
          <td class="text-center">`+transitions.elem[i].l1+`</td>
          <td class="text-center">`+transitions.elem[i].l2+`</td>
          <td class="text-center">`+transitions.elem[i].l3+`</td>
          <td class="text-center">`+transitions.elem[i].l4+`</td>
          <td class="text-center">`+transitions.elem[i].l5+`</td>
        </tr>`;
        $("#transitions-table").append(tr);
    }
    createAutomata(transitions);
}

function createAutomata(tableTransition){
      for (let i = 0; i < tableTransition.elem.length; i++) {
          states.push({
              id: tableTransition.elem[i].l1, label: ""+tableTransition.elem[i].l1, shape: "circle", size: 40, font: {size:30}
          })
      }

      for (let i = 0; i < tableTransition.elem.length; i++) {
        if(tableTransition.elem[i].l2 != "---"){
            conexions.push({
                from: tableTransition.elem[i].l1, to: tableTransition.elem[i].l2, label: ""+(tableTransition.elem[i].l2 - tableTransition.elem[i].l1)
            });
        }
        if(tableTransition.elem[i].l3 != "---"){
            conexions.push({
                from: tableTransition.elem[i].l1, to: tableTransition.elem[i].l3, label: ""+(tableTransition.elem[i].l3 - tableTransition.elem[i].l1)
            });
        }
        if(tableTransition.elem[i].l4 != "---"){
            conexions.push({
                from: tableTransition.elem[i].l1, to: tableTransition.elem[i].l4,label: ""+(tableTransition.elem[i].l4 - tableTransition.elem[i].l1)
            });
        }
        if(tableTransition.elem[i].l5 != "---"){
            conexions.push({
                from: tableTransition.elem[i].l1, to: tableTransition.elem[i].l5,label: ""+(tableTransition.elem[i].l5 - tableTransition.elem[i].l1)
            });
        }
    }
    //   console.log(states);
    //   console.log(conexions);
      var options = {
        physics: false,
        layout: {
            hierarchical: {
              direction: "UD",
              sortMethod: "directed",
            },
          },
        edges: {
          smooth: false,
          width: 2,
          arrows: "to",
        },
      };

    nodes = new vis.DataSet(states);
    
    var container = document.getElementById('visualization');
    var data = {
        nodes: nodes,
        edges: conexions
    };
    var network = new vis.Network(container, data, options);
}

function cancelar(){
    $(".disable").prop('disabled', false);
    $("#d-price-product").text("$0");
    $("#table > tbody").empty();
}
function changeNode(id) {
    var newColor = "#FE0400"
    nodes.update([{ id: id, color: { background: newColor } }]);
}