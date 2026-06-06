/* =========================================
   SIMULADOR DE ABASTECIMIENTO Y ECONOMÍA FAMILIAR
   JavaScript Externo - Uso del DOM, Validaciones, Cálculos y Gráficos Simples
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 1. NAVEGACIÓN POR TABS
  const tabs = document.querySelectorAll('.tab-btn');
  const contenidos = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('activo'));
      contenidos.forEach(c => c.classList.remove('activo'));
      tab.classList.add('activo');
      const target = tab.getAttribute('data-tab');
      document.getElementById(target).classList.add('activo');
    });
  });

  // 2. UTILIDADES
  const formatoBs = (num) => `${parseFloat(num).toFixed(2)} Bs`;
  const validarPositivo = (valor) => !isNaN(valor) && valor !== '' && parseFloat(valor) >= 0;

  // 3. FORMULARIO: ESCENARIO A (CARBURANTES)
  const formCarbu = document.getElementById('form-carburantes');
  if (formCarbu) {
    formCarbu.addEventListener('submit', (e) => {
      e.preventDefault();
      const reserva = parseFloat(document.getElementById('reserva-inicial').value);
      const consumo = parseFloat(document.getElementById('consumo-diario').value);
      const reabaste = parseFloat(document.getElementById('reabastecimiento').value);
      const critico = parseFloat(document.getElementById('nivel-critico').value);

      if (!validarPositivo(reserva) || !validarPositivo(consumo) || !validarPositivo(reabaste) || !validarPositivo(critico)) {
        alert('Por favor, ingresa valores numéricos válidos y mayores o iguales a 0.');
        return;
      }

      if (consumo <= reabaste) {
        mostrarResultado('resultados-carburantes', `
          <div class="resultado-card exito">
            <h4>✅ Situación Controlada</h4>
            <p>El reabastecimiento cubre o supera el consumo. La reserva no se agotará en condiciones normales.</p>
          </div>
          <div class="grafico-barras">
            <div class="barra-item"><div class="barra barra-exito" style="height: 100%;"></div><div class="barra-label">Equilibrio</div></div>
          </div>
        `);
        return;
      }

      const netoDiario = consumo - reabaste;
      const disponible = reserva - critico;
      const diasHastaCritico = Math.floor(disponible / netoDiario);
      const diasHastaAgotamiento = Math.floor(reserva / netoDiario);

      let claseColor = 'barra-exito';
      if (diasHastaCritico < 5) claseColor = 'barra-alerta';
      if (diasHastaCritico < 2) claseColor = 'barra-alerta';

      mostrarResultado('resultados-carburantes', `
        <div class="resultado-card ${diasHastaCritico < 3 ? 'critico' : diasHastaCritico < 6 ? 'alerta' : 'exito'}">
          <h4>📊 Proyección de Reserva</h4>
          <p>La reserva alcanzará el nivel crítico en aproximadamente <strong>${diasHastaCritico} días</strong>.</p>
          <p>Se agotará por completo en <strong>${diasHastaAgotamiento} días</strong> si no cambia el consumo.</p>
        </div>
        <div class="progreso-reserva">
          <div class="progreso-barra" style="width: 100%; background: ${diasHastaCritico < 3 ? '#D32F2F' : diasHastaCritico < 6 ? '#FFA000' : '#388E3C'};">
            Reserva Inicial: ${reserva} L
          </div>
        </div>
        <div class="grafico-barras">
          <div class="barra-item"><div class="barra" style="height: 100%;"></div><div class="barra-label">Reserva Inicial</div></div>
          <div class="barra-item"><div class="barra ${claseColor}" style="height: ${Math.max(10, (critico/reserva)*100)}%;"></div><div class="barra-label">Nivel Crítico</div></div>
          <div class="barra-item"><div class="barra" style="height: ${(netoDiario/reserva)*100}%; background: #4A5568;"></div><div class="barra-label">Déficit Diario</div></div>
        </div>
      `);
    });
  }

  // 4. FORMULARIO: ESCENARIO E (RUMOR DE ESCASEZ)
  const formRumor = document.getElementById('form-rumor');
  if (formRumor) {
    formRumor.addEventListener('submit', (e) => {
      e.preventDefault();
      const demandaUnitaria = parseFloat(document.getElementById('demanda-normal').value);
      const personas = parseFloat(document.getElementById('numero-personas').value);
      const porcentaje = parseFloat(document.getElementById('porcentaje-aumento').value);
      const stock = parseFloat(document.getElementById('stock-disponible').value);

      if (!validarPositivo(demandaUnitaria) || !validarPositivo(personas) || !validarPositivo(porcentaje) || !validarPositivo(stock)) {
        alert('Por favor, ingresa valores numéricos válidos y mayores a 0.');
        return;
      }

      // Cálculos según el modelo matemático del enunciado
      const demandaBaseTotal = demandaUnitaria * personas;
      const nuevaDemanda = demandaBaseTotal + (demandaBaseTotal * (porcentaje / 100));
      const diferenciaDemanda = nuevaDemanda - demandaBaseTotal;
      const stockRestante = stock - nuevaDemanda;

      let clase = 'exito';
      let titulo = '✅ Stock Suficiente';
      let mensaje = `El stock alcanza. Sobran ${stockRestante.toFixed(0)} unidades.`;
      
      if (stockRestante < 0) {
        clase = 'critico';
        titulo = '❌ Alerta: Stock Insuficiente';
        mensaje = `El stock NO alcanza. Faltan ${Math.abs(stockRestante).toFixed(0)} unidades para cubrir la nueva demanda.`;
      }

      // Alturas para el gráfico simple (máximo 100%)
      const maxVal = Math.max(nuevaDemanda, stock, demandaBaseTotal);
      const hBase = (demandaBaseTotal / maxVal) * 100;
      const hNueva = (nuevaDemanda / maxVal) * 100;
      const hStock = (stock / maxVal) * 100;

      mostrarResultado('resultados-rumor', `
        <div class="resultado-card ${clase}">
          <h4>${titulo}</h4>
          <p><strong>Demanda base total:</strong> ${demandaBaseTotal.toFixed(0)} unidades</p>
          <p><strong>Nueva demanda (con pánico):</strong> ${nuevaDemanda.toFixed(0)} unidades (Aumento de ${diferenciaDemanda.toFixed(0)})</p>
          <p><strong>Stock restante:</strong> ${stockRestante >= 0 ? stockRestante.toFixed(0) : 'Déficit de ' + Math.abs(stockRestante).toFixed(0)} unidades</p>
          <p><em>${mensaje}</em></p>
        </div>
        <div class="grafico-barras">
          <div class="barra-item">
            <div class="barra" style="height: ${hBase}%;"></div>
            <div class="barra-label">Demanda Normal</div>
          </div>
          <div class="barra-item">
            <div class="barra barra-alerta" style="height: ${hNueva}%;"></div>
            <div class="barra-label">Nueva Demanda</div>
          </div>
          <div class="barra-item">
            <div class="barra barra-exito" style="height: ${hStock}%;"></div>
            <div class="barra-label">Stock Disponible</div>
          </div>
        </div>
      `);
    });
  }

  // FUNCIÓN AUXILIAR: MOSTRAR RESULTADOS
  function mostrarResultado(id, html) {
    const contenedor = document.getElementById(id);
    if (contenedor) contenedor.innerHTML = `<h3>Resultados</h3>${html}`;
  }
});

/* =========================================
   CASOS DE ESTUDIO (Precarga de datos)
   ========================================= */
function cargarCasoEstudio(caso) {
  if (caso === 1) {
    // Activar tab carburantes
    document.querySelectorAll('.tab-btn')[0].click();
    document.getElementById('reserva-inicial').value = 10000;
    document.getElementById('consumo-diario').value = 1200;
    document.getElementById('reabastecimiento').value = 300;
    document.getElementById('nivel-critico').value = 2000;
    document.getElementById('form-carburantes').dispatchEvent(new Event('submit'));
  } 
  else if (caso === 2) {
    // Activar tab de rumor
    document.querySelectorAll('.tab-btn')[1].click();
    document.getElementById('demanda-normal').value = 100;
    document.getElementById('numero-personas').value = 1;
    document.getElementById('porcentaje-aumento').value = 40;
    document.getElementById('stock-disponible').value = 120;
    document.getElementById('form-rumor').dispatchEvent(new Event('submit'));
  }
}