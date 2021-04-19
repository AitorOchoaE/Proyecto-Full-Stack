// function checkProperties(obj) {  //Para mirar si todos estan vacios.
//     for (var key in obj) {
//         if (obj[key] !== null && obj[key] != ""){
//             return false;
//         }    
//     }
//     return true;
// }
function checkProperties(obj) { //para mirar si alguno está vacío.
    for (var key in obj) {
        if (obj[key] === null || obj[key] == ""){
            return true;
        }    
    }
    return false;
}

module.exports = {checkProperties}