

const button1 = document.querySelector("#boton1");
const button2 = document.querySelector("#boton2");
const button3 = document.querySelector("#boton3");
const button4 = document.querySelector("#boton4");

const button5 = document.querySelector("#btnConfirmarCuenta");

const OpExitosa = document.querySelector("#exitosa");
const OpCancelada = document.querySelector("#cancelada");
const OpDatos = document.querySelector("#datos-enviados");
const OpEnviada = document.querySelector("#op-enviada");

const OpCreada = document.querySelector("#cuenta-exito");

const oke = document.querySelector("#oke");
const okc = document.querySelector("#okc");
const okd = document.querySelector("#okd");
const okf = document.querySelector("#okf");
const okg = document.querySelector("#okg");

if(button1 != null)
button1.addEventListener('click', ()=>{
    OpExitosa.classList.remove("ventanas__close");
});
if(button2 != null)
button2.addEventListener('click', ()=>{
    OpCancelada.classList.remove("ventanas__close");
});
if(button3 != null)
button3.addEventListener('click', ()=>{
    OpDatos.classList.remove("ventanas__close");
});
if(button4 != null)
button4.addEventListener('click', ()=>{
    console.log("YA se dio click")
    OpEnviada.classList.remove("ventanas__close");
});
if(button5 != null)
    button5.addEventListener('click', ()=>{
        OpCreada.classList.remove("ventanas__close");
    });
if(oke != null)
oke.addEventListener('click', ()=>{
    OpExitosa.classList.add("ventanas__close");
});
if(okc != null)
okc.addEventListener('click', ()=>{
    OpCancelada.classList.add("ventanas__close");
});
if(okd != null)
okd.addEventListener('click', ()=>{
    OpDatos.classList.add("ventanas__close");
});
if(okf != null)
okf.addEventListener('click', ()=>{
    OpEnviada.classList.add("ventanas__close");
});
if(okg != null)
    okg.addEventListener('click', ()=>{
        OpCreada.classList.add("ventanas__close");
    });


