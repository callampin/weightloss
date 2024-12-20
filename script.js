document.getElementById('tmbForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    const sexo = document.getElementById('sexo').value;
    const edad = parseFloat(document.getElementById('edad').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const pesoActual = parseFloat(document.getElementById('pesoActual').value);
    const pesoMeta = parseFloat(document.getElementById('pesoMeta').value);
    const actividad = parseFloat(document.getElementById('actividad').value);
    const deficit = parseFloat(document.getElementById('deficit').value);

    const pesoMinimoAceptable = altura - 115;
    if (pesoMeta < pesoMinimoAceptable ) {
        document.getElementById('resultados').innerHTML = `
            <p>Este peso no es saludable de acuerdo a tu estatura. Por favor reconsidera tus metas.</p>
        `;
        return;
    }

    let tmb;
    if (sexo === 'hombre') {
        tmb = (10 * pesoActual) + (6.25 * altura) - (5 * edad) + 5;
    } else {
        tmb = (10 * pesoActual) + (6.25 * altura) - (5 * edad) - 161;
    }

    let velocidad;
    if (deficit === 550) {
        velocidad = 0.5;
    } else {
        velocidad = 1;
    }

    const kcalMantenimiento = tmb * actividad;
    const kcalAConsumir = kcalMantenimiento - deficit;
    const semanasNecesarias = (pesoActual - pesoMeta) / velocidad;
    const mesesNecesarios = semanasNecesarias / 4.35;

    // Cálculo del IMC
    const alturaMetros = altura / 100;
    const imc = pesoActual / (alturaMetros * alturaMetros);
    
    let categoriaIMC = "";
    if (imc <= 15.9) {
        categoriaIMC = "Falta de peso muy grave";
    } else if (imc >= 16.0 && imc <= 16.9) {
        categoriaIMC = "Falta de peso grave";
    } else if (imc >= 17.0 && imc <= 18.4) {
        categoriaIMC = "Falta de peso";
    } else if (imc >= 18.5 && imc <= 24.9) {
        categoriaIMC = "Normal";
    } else if (imc >= 25.0 && imc <= 29.9) {
        categoriaIMC = "Sobrepeso";
    } else if (imc >= 30.0 && imc <= 34.9) {
        categoriaIMC = "Obesidad clase 1";
    } else if (imc >= 35.0 && imc <= 39.9) {
        categoriaIMC = "Obesidad clase 2";
    } else {
        categoriaIMC = "Obesidad clase 3";
    }

    const tablaIMC = `
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="padding: 8px; border: 1px solid #ddd;">Categoría</th>
                    <th style="padding: 8px; border: 1px solid #ddd;">Rango</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Falta de peso muy grave</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">&lt;= 15.9</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Falta de peso grave</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">16.0 - 16.9</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Falta de peso</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">17.0 - 18.4</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Normal</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">18.5 - 24.9</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Sobrepeso</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">25.0 - 29.9</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Obesidad clase 1</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">30.0 - 34.9</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Obesidad clase 2</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">35.0 - 39.9</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Obesidad clase 3</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">&gt;= 40.0</td>
                </tr>
            </tbody>
        </table>
    `;


    document.getElementById('resultados').innerHTML = `
    <p>Calorías de mantenimiento: ${kcalMantenimiento.toFixed(1)} kcal</p>
    <p>Calorías diarias para alcanzar tu meta: ${kcalAConsumir.toFixed(1)} kcal</p>
    ${(sexo === 'hombre' && kcalAConsumir < 1200) ? 
        '<p style="color: red;">Se recomienda subir el factor de actividad o dejar el objetivo semanal en 0.5 (en caso de seguir este aviso, haz ambas). Recuerda que menos de 1200kcal diarias en hombres puede tener graves consecuencias para la salud como pérdida de masa muscular, bajo nivel de grasa corporal esencial que puede afectar en la producción de hormonas y la regulación de la temperatura corporal, problemas metabólicos, hipoglucemia, puede reducirse la producción de hormonas tiroideas causando hipotiroidismo, depresión y ansiedad, pérdida de concentración y memoria, problemas cardiovasculares, etc.</p>' : 
        (sexo === 'mujer' && kcalAConsumir < 1500) ? 
        '<p style="color: red;">Se recomienda subir el factor de actividad o dejar el objetivo semanal en 0.5 (en caso de seguir este aviso, haz ambas). Recuerda que menos de 1500kcal diarias en mujeres puede tener graves consecuencias para la salud como disrupción del ciclo menstrual, pérdida de masa muscular, bajo nivel de grasa corporal esencial que puede afectar en la producción de hormonas y la regulación de la temperatura corporal, problemas metabólicos, hipoglucemia, puede reducirse la producción de hormonas tiroideas causando hipotiroidismo, depresión y ansiedad, pérdida de concentración y memoria, problemas cardiovasculares, etc.</p>' : ''}
    <p>Tiempo aproximado para alcanzar tu meta: ${mesesNecesarios.toFixed(1)} meses</p>
    <p>Índice de Masa Corporal (IMC): ${imc.toFixed(1)}</p>
    <p>Categoría: ${categoriaIMC}</p>
    ${tablaIMC}
`;
});
