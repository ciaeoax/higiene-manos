valor= 1;
document.getElementById('categoria').addEventListener('change', function(event){
    initTime = new Date();
    console.log('Hora de inicio:', initTime.toLocaleString('es-mx'));
});
document.getElementById('omision').addEventListener('change', function(event){
    document.getElementById('guantes').disabled = false;
    document.getElementById('fm').checked = false;
    document.getElementById('lm').checked = false;
});
document.getElementById('fm').addEventListener('change', function(event){
    document.getElementById('omision').checked = false;
    document.getElementById('guantes').disabled = true;
    document.getElementById('guantes').checked = false;
});
document.getElementById('lm').addEventListener('change', function(event){
    document.getElementById('omision').checked = false;
    document.getElementById('guantes').disabled = true;
    document.getElementById('guantes').checked = false;
});
document.getElementById('servicio').addEventListener('change', function(event){
    if (document.getElementById('servicio').value=="Otro"){
        document.getElementById('serviciotag').hidden = false;
        document.getElementById('serviciotxt').hidden = false;
        document.getElementById('serviciotxt').required = true;
    }else{
        document.getElementById('serviciotag').hidden = true;
        document.getElementById('serviciotxt').hidden = true;
        document.getElementById('serviciotxt').required = false;
    }
});
document.getElementById('categoria').addEventListener('change', function(event){
    if (document.getElementById('categoria').value=="Otro"){
        document.getElementById('categoriatag').hidden = false;
        document.getElementById('categoriatxt').hidden = false;
        document.getElementById('categoriatxt').required = true;
    }else{
        document.getElementById('categoriatag').hidden = true;
        document.getElementById('categoriatxt').hidden = true;
        document.getElementById('categoriatxt').required = false;
    }
});
// ASIGNANDO EL EVENT AL BOTON
document.getElementById('buscar').addEventListener('click', search);

async function search(){
    document.getElementById('field1').disabled = true;
    document.getElementById('field2').disabled = true;
    document.getElementById('1').disabled = true;
    document.getElementById('buscar').disabled = true;
    document.getElementById('matriculaOpo').disabled = true;
    if (document.getElementById('matriculaOpo').value == '') {
        alert('No se ha ingresado ninguna matrícula.')
        document.getElementById('buscar').disabled = false;
        document.getElementById('matriculaOpo').disabled = false;
        return;
    }
    if ((document.getElementById('matriculaOpo').value.length != 8 && document.getElementById('matriculaOpo').value.length != 9)){
        alert('Ingrese una Matricula del Observado correcta: 8-9 dígitos.');
        document.getElementById('buscar').disabled = false;
        document.getElementById('matriculaOpo').disabled = false;
        return;
    }
    if (document.getElementById('hospital').value == 'HGZ 01'){
        url = 'https://script.google.com/macros/s/AKfycbxZpscWA03Lv4FZq0qo9jqDz5TUFgMLC2zZZm8VZWiobudx867nfE9BYbeJAx-ndwBC/exec'//'https://script.google.com/macros/s/AKfycbygcC5d6p6p7vgO3IX7GqH5PGDSQGHe_u2hfTIK7FljMpR_BlMCzcEZNhUjrnuKReNs/exec'
    }else if (document.getElementById('hospital').value == 'HGZMF 02'){
        url = 'https://script.google.com/macros/s/AKfycbyX6SbFotXSYiKt0Q3IpGS2FtXQzafdOYto-cDZF8cXzoaH9RT746FvGiZk8wbeG0Q-/exec'
    }else if (document.getElementById('hospital').value == 'HGZ 03'){
        url = 'https://script.google.com/macros/s/AKfycbxGVe1hUxzoaVi87P1YgfXT7MqybGWIY0aXwm-f2A3epnuEt9lUszZlp1dwe9_jBnjFCg/exec'
    }else if (document.getElementById('hospital').value == 'HGSMF 41'){
        url = 'https://script.google.com/macros/s/AKfycbzdLMFb6Qvn-HIi0hpLVJaG8WwvhmVwbbjnC6RgQS0YLp-uQtadg1BPb-V4FGfyCAHv/exec'
    }else{
        alert('Unidad no seleccionada.')
        document.getElementById('buscar').disabled = false;
        document.getElementById('matriculaOpo').disabled = false;
        return;
    }
    const formData = {
        action: 'search',
        matricula2: document.getElementById('matriculaOpo').value
    };
    try {
        const response = await fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'success') {
            document.getElementById('field1').disabled = false;
            document.getElementById('field2').disabled = false;
            document.getElementById('buscar').disabled = false;
            document.getElementById('matriculaOpo').disabled = false;
            for (var i = 1; i <= 8; i++) {
                document.getElementById(i.toString()).checked = false;
                document.getElementById(i.toString()).disabled = false;
            }
            if (result.data.length >= 8){
                alert('Ha sobrepasado el límite de oportunidades para la matrícula observada.');
                document.getElementById('categoria').value = '';
                document.getElementById('matriculaOpo').value = '';
                document.getElementById('1').checked = true;
                for (var i = 2; i <= 8; i++) {
                    document.getElementById(i.toString()).disabled = true;
                }
                return;
            }
            //valor = valor + 1;
            for (var i = 1; i <= result.data.length+0; i++) {
                document.getElementById(i.toString()).checked = true;
                document.getElementById(i.toString()).disabled = true;
            }
            if ((result.data.length+1) <= 8) {                
                document.getElementById((result.data.length+1).toString()).checked = true;
            }
            for (var i = result.data.length+2; i <= 8; i++) {
                document.getElementById(i.toString()).disabled = true;
            }
        } else {
            console.error('Error:', result.message);
            document.getElementById('result').textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        console.error('Error submitting data:', error);
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}
async function submitForm() {
    var loader = document.getElementById('loader');
    loader.hidden = false;
    document.getElementById('submit').disabled = true;
    if (typeof initTime === 'undefined'){
        alert('Cambie Categoría a cualquier otro valor y regrese al valor original.');
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }
    if (!(document.getElementById('nombre').value).includes(" ")) {
        alert('Ingrese su Nombre Completo.');
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }
    if (document.getElementById('matricula').value.length != 8 && document.getElementById('matricula').value.length != 9){
        alert('Ingrese una Matricula de Observador correcta: 8-9 dígitos.');
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }
    if (document.getElementById('matriculaOpo').value.length != 8 && document.getElementById('matriculaOpo').value.length != 9){
        alert('Ingrese una Matricula del Observado correcta: 8-9 dígitos.');
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }
    if (document.getElementById('servicio').value=="Otro"){
        serviciovalue = document.getElementById('serviciotxt').value;
        if (serviciovalue == ''){
            document.getElementById('submit').disabled = false;
            loader.hidden = true;
            alert('Escriba el otro servicio. Seleccione un valor diferente y seleccione nuevamente Otro. O recargue.');
            return;
        }
    }else{
        serviciovalue = document.getElementById('servicio').value;
    }
    if (document.getElementById('categoria').value=="Otro"){
        categoriavalue = document.getElementById('categoriatxt').value;
        if (categoriavalue == ''){
            document.getElementById('submit').disabled = false;
            loader.hidden = true;
            alert('Escriba la otra categoría. Seleccione un valor diferente y seleccione nuevamente Otro. O recargue.');
            return;
        }
    }else{
        categoriavalue = document.getElementById('categoria').value;
    }
    const indicaciones = document.querySelectorAll('input[name="indicacion"]');
    const selected_ind = Array.from(indicaciones).some(indicacion => indicacion.checked);
    const values_ind = Array.from(indicaciones).filter(indicacion => indicacion.checked).map(indicacion => indicacion.value.toUpperCase());
    if (!selected_ind){
        alert('Seleccione al menos una indicación.')
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }
    //console.log(values_ind);
    //window.confirm("Se registrará otra oportunidad a la anterior?");
    // 

    endTime = new Date();
    var time = endTime - initTime;
    var minutes = Math.floor(time/(1000*60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    var seconds = Math.floor(time/1000).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) - (minutes * 60);
    var mseconds = time - (seconds * 1000) - (minutes * 60 * 1000);
    var duracion = minutes + ":" + seconds + "." + mseconds;    
    const formData = {
        action: 'form',
        turno: document.getElementById('turno').value.toUpperCase(),
        servicio: serviciovalue.toUpperCase(),
        nombre: document.getElementById('nombre').value.toUpperCase(),
        matricula: document.getElementById('matricula').value,
        categoria: categoriavalue.toUpperCase(),
        indicacion: values_ind, //document.querySelector("input[name=indicacion]:checked").value.toUpperCase(),
        accion: document.querySelector("input[name=accion]:checked").value.toUpperCase(),
        guantes: document.getElementById('guantes').checked,
        time: duracion,
        matricula2: document.getElementById('matriculaOpo').value
    };
    if (document.getElementById('hospital').value == 'HGZ 01'){
        console.log(document.getElementById('hospital').value);
        url = 'https://script.google.com/macros/s/AKfycbxZpscWA03Lv4FZq0qo9jqDz5TUFgMLC2zZZm8VZWiobudx867nfE9BYbeJAx-ndwBC/exec'//'https://script.google.com/macros/s/AKfycbygcC5d6p6p7vgO3IX7GqH5PGDSQGHe_u2hfTIK7FljMpR_BlMCzcEZNhUjrnuKReNs/exec'
    }else if (document.getElementById('hospital').value == 'HGZMF 02'){
        url = 'https://script.google.com/macros/s/AKfycbyX6SbFotXSYiKt0Q3IpGS2FtXQzafdOYto-cDZF8cXzoaH9RT746FvGiZk8wbeG0Q-/exec'
    }else if (document.getElementById('hospital').value == 'HGZ 03'){
        url = 'https://script.google.com/macros/s/AKfycbxGVe1hUxzoaVi87P1YgfXT7MqybGWIY0aXwm-f2A3epnuEt9lUszZlp1dwe9_jBnjFCg/exec'
    }else if (document.getElementById('hospital').value == 'HGSMF 41'){
        url = 'https://script.google.com/macros/s/AKfycbzdLMFb6Qvn-HIi0hpLVJaG8WwvhmVwbbjnC6RgQS0YLp-uQtadg1BPb-V4FGfyCAHv/exec'
    }else{
        alert('Unidad no seleccionada.')
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }
    try {
        const response = await fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'success') {
            for (var i = 1; i <= 8; i++) {
                document.getElementById(i.toString()).checked = false;
                document.getElementById(i.toString()).disabled = false;
            }
            if (result.data.length >= 8){
                alert('Ha alcanzado el límite de oportunidades para la matrícula observada. Ultimo registro hecho.');
                document.getElementById('categoria').value = '';
                document.getElementById('matriculaOpo').value = '';
                for (var i = 1; i <= 5; i++) {
                    document.getElementById('indicacion'+i.toString()).checked = false;
                }
                document.getElementById('1').checked = true;
                for (var i = 2; i <= 8; i++) {
                    document.getElementById(i.toString()).disabled = true;
                }
                document.querySelector("input[name=accion]:checked").checked = false;
                document.getElementById('guantes').checked = false;
                document.getElementById('submit').disabled = false;
                loader.hidden = true;
                return;
            }
            console.log('Data saved and received:', formData, result.data.length); 
            alert('Información registrada correctamente.');
            document.getElementById('guantes').checked = false;
            document.querySelector("input[name=accion]:checked").checked = false;
            document.getElementById('categoriatag').hidden = true;
            document.getElementById('categoriatxt').hidden = true;
            document.getElementById('categoriatxt').value = '';
            valor = valor + 1;
            document.getElementById('submit').disabled = false;
            for (var i = 1; i <= result.data.length+0; i++) {
                document.getElementById(i.toString()).checked = true;
                document.getElementById(i.toString()).disabled = true;
            }
            if ((result.data.length+1) <= 8) {                
                document.getElementById((result.data.length+1).toString()).checked = true;
            }
            for (var i = result.data.length+2; i <= 8; i++) {
                document.getElementById(i.toString()).disabled = true;
            }
            for (var i = 1; i <= 5; i++) {
                document.getElementById('indicacion'+i.toString()).checked = false;
            }
            loader.hidden = true;
        } else {
            console.error('Error:', result.message);
            document.getElementById('result').textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        console.error('Error submitting data:', error);
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}
document.getElementById('dataForm').addEventListener('reset', function(event){
    document.getElementById('serviciotag').hidden = true;
    document.getElementById('serviciotxt').hidden = true;
    document.getElementById('categoriatag').hidden = true;
    document.getElementById('categoriatxt').hidden = true;
    document.getElementById('hospital').value = "";
});
