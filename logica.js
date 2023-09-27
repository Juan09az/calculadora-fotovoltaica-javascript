var cont=0;

function calcularRes(){
    var tipo = document.getElementById("tipo").value;

    var bombillas = document.getElementById("bombe").value;
    var hdusoBombe = document.getElementById("hdusoBombe").value;
    var DusoSemBombe = document.getElementById("DusoSemBombe").value;

    var cantidadLavadora = document.getElementById("cantidadLavadora").value;
    var potenciaLavadora = document.getElementById("potenciaLavadora").value;
    var tiempousoLavadora = document.getElementById("tiempousoLavadora").value;
    var DusoSemLav = document.getElementById("DusoSemLav").value;

    var cantidadNevera = document.getElementById("cantidadNevera").value;
    var potenciaNevera = document.getElementById("potenciaNevera").value;
    var tiempousoNevera = document.getElementById("tiempousoNevera").value;
    var DusoSemNev = document.getElementById("DusoSemNev").value;

    var cantidadEquipo = document.getElementById("cantidadEquipo").value;
    var potenciaEquipo = document.getElementById("potenciaEquipo").value;
    var tiempousoEquipo = document.getElementById("tiempousoEquipo").value;
    var DusoSemEqu = document.getElementById("DusoSemEqu").value;
    
    var cantidadTV = document.getElementById("cantidadTV").value;
    var potenciaTV = document.getElementById("potenciaTV").value;
    var tiempousoTV = document.getElementById("tiempousoTV").value;
    var DusoSemTV = document.getElementById("DusoSemTV").value;

    var cantidadPC = document.getElementById("cantidadPC").value;
    var potenciaPC = document.getElementById("potenciaPC").value;
    var tiempousoPC = document.getElementById("tiempousoPC").value;
    var DusoSemPC = document.getElementById("DusoSemPC").value;

    var cantidadHorno = document.getElementById("cantidadHorno").value;
    var potenciaHorno = document.getElementById("potenciaHorno").value;
    var tiempousoHorno = document.getElementById("tiempousoHorno").value;
    var DusoSemHorno = document.getElementById("DusoSemHorno").value;

    var cantidadExtra1 = document.getElementById("cantidadExtra1").value;
    var potenciaExtra1 = document.getElementById("potenciaExtra1").value;
    var tiempousoExtra1 = document.getElementById("tiempousoExtra1").value;
    var DusoSemExtra1 = document.getElementById("DusoSemExtra1").value;

    var cantidadExtra2 = document.getElementById("cantidadExtra2").value;
    var potenciaExtra2 = document.getElementById("potenciaExtra2").value;
    var tiempousoExtra2 = document.getElementById("tiempousoExtra2").value;
    var DusoSemExtra2 = document.getElementById("DusoSemExtra2").value;
    
    var wattsconsuLamp = 0;
    var WattsConsuNev = 0;
    var WattsConsuLav = 0;
    var WattsConsuTV = 0;
    var WattsConsuEqu = 0;
    var WattsConsuPC = 0;
    var WattsConsuHorno = 0;
    var WattsConsuExtra1 = 0;
    var WattsConsuExtra2 = 0;

    var wattsTotalesConsm = 0;
    var consmPromedioDiario = 0;
    var AhxDia = 0;

    var CargaDC = 48;
    var bateriasParalelo = 0;
    var bateriasSerie = 0;
    var amperesPico = 0;

    var panelesPara = 0;
    var panelesSer = 0;
    var panelesTot = 0;
    
    var calidadInversor = 0;
    var tamInversor = 0;

    var WattsLamp;

    /*
     PDF Calculos de Paneles Solares
     Pagina 78
     Procedimientos basados en el Ejemplo
     */

    if (tipo=="Fluorescente"){
        WattsLamp=11;
    }

    if(tipo=="Incandescente"){
        WattsLamp=60;
    }

    WattsConsuEqu = (cantidadEquipo * potenciaEquipo * tiempousoEquipo * DusoSemEqu) / 7;
    WattsConsuHorno = (cantidadHorno * potenciaHorno * tiempousoHorno * DusoSemHorno) / 7;
    WattsConsuLav = (cantidadLavadora * potenciaLavadora * tiempousoLavadora * DusoSemLav) / 7;
    WattsConsuNev = (cantidadNevera * potenciaNevera * tiempousoNevera * DusoSemNev) / 7;
    WattsConsuPC = (cantidadPC * potenciaPC * tiempousoPC * DusoSemPC) / 7;
    WattsConsuTV = (cantidadTV * potenciaTV * tiempousoTV * DusoSemTV) / 7;
    wattsconsuLamp = (bombillas * WattsLamp * hdusoBombe * DusoSemBombe) / 7;
    WattsConsuExtra1 = (cantidadExtra1 * potenciaExtra1 * tiempousoExtra1 * DusoSemExtra1) / 7;
    WattsConsuExtra2 = (cantidadExtra2 * potenciaExtra2 * tiempousoExtra2 * DusoSemExtra2) / 7;

    consmPromedioDiario = WattsConsuEqu + WattsConsuHorno + wattsconsuLamp + WattsConsuLav + WattsConsuNev + WattsConsuPC + WattsConsuTV + WattsConsuExtra1 + WattsConsuExtra2;
    wattsTotalesConsm = parseFloat(potenciaEquipo) + parseFloat(potenciaHorno) + parseFloat(WattsLamp) + parseFloat(potenciaLavadora) + parseFloat(potenciaNevera) + 
        parseFloat(potenciaPC) + parseFloat(potenciaTV) + parseFloat(potenciaExtra1) + parseFloat(potenciaExtra2);

    AhxDia = (consmPromedioDiario / 0.9 + 0) / 48;

    //bateriasParalelo = (AhxDia * dias de autonomia / profundidad de descarga) / Ah;
    bateriasParalelo = (AhxDia * 4 / 0.5) / 350;
    bateriasParalelo = Math.round(bateriasParalelo);
    var voltajeBater = 6;
    bateriasSerie = CargaDC / voltajeBater;

    //amperesPico = (AhxDia / eficiencia bateria) / horas solar pico/dia;
    amperesPico = (AhxDia / 0.8) / 4;

    //redondea hacia arriba
    panelesPara = Math.round(amperesPico / 5) + 1;
    //panelesSer = Carga del sistema / voltaje en el que operan los modulos fotovoltaicos;
    panelesSer = CargaDC / 12;

    panelesTot = panelesPara * panelesSer;
    
    if(consmPromedioDiario>2500){
        calidadInversor = consmPromedioDiario;
    }
    if(consmPromedioDiario<=2500){
        calidadInversor = consmPromedioDiario;
    }
    tamInversor = consmPromedioDiario/12;

    cont=cont+1;
    var resant = document.getElementById('respuesta');

    document.getElementById('respuesta').innerHTML = resant.value +"\n" + "CALCULO #" + cont + "\n" + "Tipo de bombilla: " + tipo + "\n" 
    + "Consumo Promedio Diario: " + consmPromedioDiario + "\n"
    + "Total Watts Consumidos: " + wattsTotalesConsm + "\n"
    + "A-h/dia: " + AhxDia + "\n"
    + "Baterias en Paralelo: " + bateriasParalelo + "\n"
    + "Baterias en Serie: " + bateriasSerie + "\n"
    + "Amperes Pico: " + amperesPico + "\n"
    + "Paneles en Paralelo: " + panelesPara + "\n"
    + "Paneles en Serie: " + panelesSer+ "\n" + "---------------------------------";
    
    resant.scrollTop = resant.scrollHeight;

    document.getElementById('paneles1').innerHTML = Math.round(panelesTot);
    document.getElementById('baterias1').innerHTML = Math.round(bateriasSerie*bateriasParalelo);

    const alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    window.scrollTo({
        top: alturaTotal,
        behavior: "smooth"
      });
    
}

function borrarTodo(){
    document.getElementById('respuesta').innerHTML = "";
    document.getElementById('paneles1').innerHTML = "";
    document.getElementById('baterias1').innerHTML = "";

    const alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    window.scrollTo({
        top: 128,
        behavior: "smooth"
      });
}