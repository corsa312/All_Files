var agora = new Date()
var horas = agora.getHours()
console.log (`Agora são exatamente ${horas} horas.`);

if (horas <12) {
    console.log("Bom Dia");
}
else if (horas >12) {
    console.log("Boa Tarde");
} else {
    console.log("Boa Noite");
}