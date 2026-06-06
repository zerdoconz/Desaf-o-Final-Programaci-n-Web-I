# 🇧🇴 Simulador de Abastecimiento y Economía Familiar

> **Proyecto Final - Programación Web I**  
> *"Herramienta educativa para la toma de decisiones informadas en el contexto actual"*

## 📌 Descripción del Proyecto
Este proyecto consiste en una página web interactiva diseñada para representar, calcular y visualizar problemas reales relacionados con el abastecimiento de recursos y la economía familiar. 

La finalidad de esta aplicación no es tomar una posición política, sino crear una herramienta educativa que ayude a comprender cómo ciertos factores (como el consumo de carburantes o los rumores de escasez) afectan el abastecimiento, y proporcionar un espacio para explorar estrategias de planificación y optimización de recursos.

## 🎯 Objetivos
- **General**: Desarrollar una página web interactiva utilizando HTML5, CSS y JavaScript que permita simular situaciones reales de abastecimiento y consumo, aplicando buenas prácticas de diseño web y programación.
- **Específicos**:
  - Utilizar estructura semántica en HTML5 y estilos CSS externos con una paleta de colores coherente.
  - Implementar JavaScript y manipulación del DOM para realizar cálculos matemáticos sencillos y mostrar resultados dinámicos en pantalla.
  - Garantizar un diseño responsivo que se adapte a computadoras, tablets y dispositivos móviles.
  - Incluir casos de estudio predefinidos para validar el correcto funcionamiento de los modelos matemáticos.

## ⚙️ Escenarios Implementados
El simulador cuenta con dos módulos interactivos principales:

1. **Escenario A: Simulador de Abastecimiento de Carburantes**  
   Permite calcular cuántos días durará una reserva de combustible según el consumo diario estimado y la tasa de reabastecimiento, alertando cuándo se alcanzará el nivel crítico.
2. **Escenario E: Simulador de Rumor de Escasez**  
   Modela cómo un aumento porcentual en la demanda (compras por pánico) afecta el stock disponible de un producto, calculando el déficit o sobrante de unidades.

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica (`header`, `nav`, `main`, `section`, `footer`).
- **CSS3**: Estilos externos, variables CSS, Flexbox/Grid y Media Queries para diseño responsivo.
- **JavaScript (Vanilla)**: Manipulación del DOM, eventos de formulario, validaciones de datos y lógica de cálculo.
- **Git & GitHub**: Control de versiones y alojamiento del código fuente.
- **GitHub Pages**: Publicación y despliegue de la página web en internet.

## 🚀 Cómo usar el proyecto
1. **En línea**: Visita la página publicada directamente en [GitHub Pages](https://tu-usuario.github.io/nombre-del-repositorio) *(Reemplazar con tu enlace real)*.
2. **Localmente**: 
   - Clona este repositorio: `git clone https://github.com/tu-usuario/nombre-del-repositorio.git`
   - Abre el archivo `index.html` en cualquier navegador web moderno (Chrome, Firefox, Edge).

## 📋 Casos de Estudio Incluidos
La página incluye una sección de "Casos de Estudio" con datos predefinidos para que el usuario pueda probar el simulador inmediatamente:
- **Caso 1 (Carburantes)**: Reserva inicial de 10,000 L, consumo de 1,200 L/día, reabastecimiento de 300 L/día y nivel crítico de 2,000 L. *(Resultado esperado: Nivel crítico en ~8-9 días)*.
- **Caso 2 (Rumor de Escasez)**: Demanda normal de 100 unidades, aumento del 40% por rumor y stock disponible de 120 unidades. *(Resultado esperado: Nueva demanda de 140 unidades, déficit de 20 unidades)*.

---

## 🏗️ Arquitectura del Proyecto
El proyecto está organizado siguiendo una estructura de carpetas clara y escalable, separando la estructura, el estilo y la lógica:

```text
proyecto-web-crisis/
│
├── index.html              # Archivo principal. Contiene la estructura semántica HTML5, 
│                           # los formularios, la navegación y los contenedores de resultados.
│
├── css/
│   └── estilos.css         # Hoja de estilos externa. Define la paleta de colores (formal 
│                           # y esperanzadora), el diseño responsivo (media queries) y los 
│                           # componentes visuales (tarjetas, botones, indicadores de alerta).
│
├── js/
│   └── script.js           # Lógica del programa. Maneja la captura de datos del DOM, 
│                           # validaciones de formularios, los modelos matemáticos de cálculo 
│                           # y la inyección dinámica de resultados en el HTML.
│
├── imagenes/                    # Carpeta destinada a recursos visuales (logos, imágenes de contexto).
│                           # (Actualmente el diseño utiliza placeholders CSS para ser ligero).
│
└── README.md               # Documentación del proyecto (este archivo).