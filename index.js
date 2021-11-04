//#ARREGLO QUE ALAMCENARA LOS DATOS DE LA TRANSICIÓN
var transitions = {};
//VARIABLE DEL ALFABETO VALIDO
var alpha = [500,1000,2000,5000];
//PUNTERO DE MOVIMIENTO DE LOS ESTADOS EN EL GRAFICO
var pointer = 0;
//ARREGLO DE LOS ESTADOS VALIDOS
var states = [];
//ARREGLO DE CONEXIONES
var conexions = [];
//VARIABLE PARA CREAR NODOS A PARTIR DE ESTADOS Y CONEXIONES CON LA LIBRERIA vis.js
var nodes;

$(".pay").prop('disabled', true);
$("#retirar").prop('disabled', true);
$("#cancelar").prop('disabled', true);

//EVENTO ONCLICK DE LAS MONES Y BILLETES
$(".pay").on('click', (e)=>{
    let len = parseInt($(e.currentTarget).attr('val'));
    changeNode(len);
})

//EVENTO PARA RETIRAR EL CAFE
$("#retirar").on('click', (e)=>{
    retirar();
});


//FUNCION QUE CREA Y RELLENA LA TABLA DE TRANSICIONES
function createTable(priceProduct){
    pointer = 0;
    $("#table > tbody").empty();
    $("#d-price-product").text("$"+priceProduct);
    $(".disable").prop('disabled', true);
    $(".pay").prop('disabled', false);
    $("#cancelar").prop('disabled', false);
    //#ARREGLO QUE ME ALMACENA EL LENGUAJE DEL AUTOMATA
    //#ARREGLO AUXILIAR QUE ME IRA ALMACENADO LAS FILAS DE TRANSICION DE LA TABLA
    var rows  = [];

    //#CON ESTE ARREGLO EMPIEZO A CREAR LOS ESTADOS Y SOCIAR LAS TRANSICIONES CON EL LENGUAJE
    for(i = 0; i<=priceProduct; i+=500){
        var datos = [];
        datos.push(i);
        for(j = 0; j< alpha.length;j++){
            if((i+alpha[j]) <= priceProduct){
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
    transitions = rows;

    //#LLENO LA TABLA CON LOS DATOS DE LAS TRANSCIONES
    for(i = 0; i< transitions.length;i++){
        var tr = `<tr>
          <td class="text-center">`+transitions[i].l1+`</td>
          <td class="text-center">`+transitions[i].l2+`</td>
          <td class="text-center">`+transitions[i].l3+`</td>
          <td class="text-center">`+transitions[i].l4+`</td>
          <td class="text-center">`+transitions[i].l5+`</td>
        </tr>`;
        $("#transitions-table").append(tr);
    }
    createAutomata(transitions);
}
//FUNCION PARA CREAR EL GRAFICO DEL AUTOMATA
function createAutomata(tableTransition){
    //ARREGLO DE ESTADOS
    states = [];
    //ARREGLO QUE ME PERMITIRA CONECTAR LOS ESTADOS CON LAS TRNASICIONES
    conexions = [];
    //NODO DE ESTADOS
    nodes;

    //FOR PARA LLENAR EL ARREGLO DE ESTADOS DEPENDIENDO DEL PRECIO DEL PRODUCTO
    for (let i = 0; i < tableTransition.length; i++) {
        //CONDICIONAL PARA CREAR EL ESTADO INICIAL
        if(i == 0){
            states.push({
                id: tableTransition[i].l1, 
                label: ""+tableTransition[i].l1, 
                shape: "circle",
                color:{
                    background: "#FBFF00",
                    border: "#FBFF00", 
                    highlight: { background: "#FBFF00", border: "#FBFF00" },} ,
                size: 20, 
                font: {
                    size:20,
                    color: "#000000"
                },
            });
        //CONDICIONAL PARA CREAR EL ESTADO FINAL
        }else if(i == (tableTransition.length - 1)){
            states.push({
                id: tableTransition[i].l1, 
                label: ""+tableTransition[i].l1, 
                shape: "circle",
                color:{
                    background: "#49FF00",
                    border: "#49FF00", 
                    highlight: { background: "#49FF00", border: "#49FF00" },} ,
                size: 20, 
                font: {
                    size:20,
                    color: "#000000"
                },
            });
        //SE CREAN LOS ESTADOS NO FINALES NI INICIALES: LOS INTERMEDIOS
        }else{
            states.push({
                id: tableTransition[i].l1, 
                label: ""+tableTransition[i].l1, 
                shape: "circle",
                color:{
                    background: "#FF9300",
                    border: "#FF9300",
                    highlight: { background: "#FF9300",border:"#FF9300"}} ,
                size: 10,
                font: {
                    size:10,
                    color: "#000000"
                }
            });
        }
    }

    //ITERACION PARA LLENAR EL ARREGLO DE CONEXIONES ENTRE LOS ESTADOS: SE CREAN EN FUNCION DE LA MATRIZ DE TRANSIONES
    for (let i = 0; i < tableTransition.length; i++) {
        //VALIDO QUE SOLO HAGA LAS CONEXIONES CON ESTADOS VALIDOS
        if(tableTransition[i].l2 != "---"){
            conexions.push({
                from: tableTransition[i].l1, to: tableTransition[i].l2, label: ""+(tableTransition[i].l2 - tableTransition[i].l1)
            });
        }
        //VALIDO QUE SOLO HAGA LAS CONEXIONES CON ESTADOS VALIDOS
        if(tableTransition[i].l3 != "---"){
            conexions.push({
                from: tableTransition[i].l1, to: tableTransition[i].l3, label: ""+(tableTransition[i].l3 - tableTransition[i].l1)
            });
        }
        //VALIDO QUE SOLO HAGA LAS CONEXIONES CON ESTADOS VALIDOS
        if(tableTransition[i].l4 != "---"){
            conexions.push({
                from: tableTransition[i].l1, to: tableTransition[i].l4,label: ""+(tableTransition[i].l4 - tableTransition[i].l1)
            });
        }
        if(tableTransition[i].l5 != "---"){
            conexions.push({
                from: tableTransition[i].l1, to: tableTransition[i].l5,label: ""+(tableTransition[i].l5 - tableTransition[i].l1)
            });
        }
    }

    //VARIABLE DE ARREGLOS DE PARAMETROS OPCIONES PARA CONFIGURAR LOS GRAFICOS DEL AUTOMATA
    var options = {
        physics: false,
        autoResize: true,
        height: '100%',
        width: '100%',
        nodes:{
            borderWidth: 2,
            scaling: {
                min: 700,
                max: 1000,
            },
        },
        edges: {
            smooth: false,
            width: 1,
            length:100,
            color: {
                color: "black"
            },
            arrows: "to",
            font: { size: 15, color:"black", face: "sans",},
        },
        interaction: {hover:false}
    };

    //CREO LOS NODOS QUE SON LOS ESTADOS: ESTO CON LA LIBRERIA vis.js PARA DIBUJAR GRAFICOS
    nodes = new vis.DataSet(states);
    
    //OBTENGO EL ID DEL ELEMENTO CONTENEDOR DEL GRAFICO
    var container = document.getElementById('visualization');
    //CREO EL ARREGLO DE LAS CONEXIONES Y NODOS
    var data = {
        nodes: nodes,
        edges: conexions
    };
    //CREO EL GRAFO CON EL OBJETO NETWORK DE LA LIBRERIA vis.js: LOS PARAMETRO SON EL CONTENEDOR DEL GRAFICO
    //EL ARREGLO DE DATOS(CONEXIONES Y ESTADOS) Y EL ARREGLO DE CONFIGURACIONES O PARAMETRIZACION DEL GRAFICO
    var network = new vis.Network(container, data, options);

    //METODO PARA VALIDAR LAS TRNASIONES EN EL GRAFO Y PARA MOVER EL PUNTERO DEL MISMO
    changeNode(0);
}
//FUNCION QUE PERMITE MOVERSE ENTRE LOS ESTADOS DEL AUTOMATA
function changeNode(id) {
    //VARIABLE DEL LENGUAJE INGRESADO
    lenguague = id;
    //VARIABLE QUE ME CARGA LOS ESTADO PERMITIDOS POR CADA LENGUAJE
    let validStates = [];

    if(id == 0){
        nodes.update([{ id: id, color: { background: "#009BFF", border: "#0061FF" } }]);
    }

    if(lenguague == 500){ 
        for(i = 0; i< transitions.length;i++){
            if(transitions[i].l2 != "---")
            validStates.push(transitions[i].l2); 
        }
        validateTransition(id,validStates);
    }
    if(lenguague == 1000){
        for(i = 0; i< transitions.length;i++){
            if(transitions[i].l3 != "---")
            validStates.push(transitions[i].l3); 
        }
        validateTransition(id,validStates);
    }
    if(lenguague == 2000){
        for(i = 0; i< transitions.length;i++){
            if(transitions[i].l4 != "---")
            validStates.push(transitions[i].l4); 
        }
        validateTransition(id,validStates);
    }
    if(lenguague == 5000){
        for(i = 0; i< transitions.length;i++){
            if(transitions[i].l5 != "---")
            validStates.push(transitions[i].l5); 
        }
        validateTransition(id,validStates);
    }
}
//FUNCION QUE PERMITE VALIDADAR QUE UNA TRANSICION SEA VALIDA EN FUNCION DEL LENGUAJE INGRESADO
function validateTransition(id,validStates){
    //PUNTERO HACIA DONDE SE MOVERA EL AUTOMATA
    pointer += id;

    //VALIDO QUE EL DINERO INGRESADO POR EL USUARIO ES UN VALIDO DENTRO DE LA COLUMNA DE UN LENGUAJE
    if(validStates.includes(pointer)){ 
        var newColor = "#009BFF"
        nodes.update([{ id: pointer, color: { background: "#009BFF", border: "#0061FF" } }]);
        if((pointer - id) == 0){
            nodes.update([{ id: (pointer - id), color: { background: "#FBFF00", border: "#FBFF00"} }]);
        }else{
            nodes.update([{ id: (pointer - id), color: { background: "#FF9300", border: "#FF9300" } }]);
        }
        $("#d-acumulado").text("$"+pointer);
        if((validStates.length - 1) == validStates.indexOf(pointer)){
            $("#leyenda").text("Pago completado");
            $("#d-price-product").text("Presiones retirar");
            $("#retirar").prop('disabled', false);
            $(".pay").prop('disabled', true);
            $("#cancelar").prop('disabled', true);
            toastr.success("Pago completo. Presiones el boton retirar");
        }   
    }else{
        toastr.error("Rechazando Dinero porque excede el precio del producto");
        pointer = pointer - id;
    } 
}
//FUNCION PARA CANCELAR EL PAGO DE UN PRODUCTO
function cancelar(){
    $(".disable").prop('disabled', false);
    $("#d-price-product").text("$0");
    $("#d-acumulado").text("$0");
    $("#table > tbody").empty();
    $(".pay").prop('disabled', true);
    $("#visualization").empty();
    $("#retirar").prop('disabled', true);
    $("#cancelar").prop('disabled', true);
    toastr.error("Pago de producto cancelado");
}
//FUNCION PARA RETIRAR EL PRODUCTO
function retirar(){
    
    $("#coffee-out").animate({
        left: '0px',
        display: 'block',
        right: '0px',
        opacity: '0.9',
        height: '170px',
        width: '110px'
    },700);
    toastr.success("Sirviendo Café, Espere...");
    setTimeout(()=>{
        
        $('#coffee-out').animate({
            opacity: 0,
            width: 180,
            height: 250,
            left: '100px',
            display: 'none'
        }, 1500);  
    },3000);
    setTimeout(() => {
        $("#coffee-out").animate({
            height: '150px',
            width: '90px'
        },100);
        $(".disable").prop('disabled', false);
        $("#d-price-product").text("$0");
        $("#d-acumulado").text("$0");
        $("#leyenda").text('Precio producto')
        $("#table > tbody").empty();
        $(".pay").prop('disabled', true);
        $("#visualization").empty();
        $("#retirar").prop('disabled', true);
        toastr.success("Maquina disponible nuevamente");
    }, 5000);
    
}