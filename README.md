# ☕ MISW-4104: Evaluación Práctica Angular – "El aroma mágico"

![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-8%2F8%20Passing-success?style=for-the-badge)

Repositorio correspondiente al parcial práctico de desarrollo frontend con Angular para el curso **MISW-4104: Ingeniería de Software para Aplicaciones Web**, perteneciente a la **Maestría en Ingeniería de Software (MISO)** de la **Universidad de los Andes**.

---

## 👤 Información del Estudiante

| Campo | Detalle |
| :--- | :--- |
| **Estudiante:** | Jhon Sebastian Agudelo Sierra |
| **Correo Institucional:** | [js.agudelos@uniandes.edu.co](mailto:js.agudelos@uniandes.edu.co) |
| **Programa Académico:** | Maestría en Ingeniería de Software (MISO) |
| **Universidad:** | Universidad de los Andes (Bogotá, Colombia) |
| **Curso:** | MISW-4104: Ingeniería de Software para Aplicaciones Web |
| **Evaluación:** | Evaluación Práctica de Angular (Parcial Grupo 3) |
| **Release de Entrega:** | `1.0.0` – Titulado `ParcialMISW4104` |

---

## ☁️ Ejecución en el Editor en la Nube (Cloud Editor)

Puedes inspeccionar y ejecutar este proyecto directamente en la nube sin necesidad de configurar un entorno local:

1. **GitHub Codespaces (Recomendado para ejecutar la app completa):**
   * Haz clic en el botón verde **Code** en la parte superior del repositorio.
   * Selecciona la pestaña **Codespaces** y haz clic en **Create codespace on main**.
   * Una vez abierto el contenedor en el navegador, ejecuta en la terminal integrada:
     ```bash
     npm install
     npm start
     ```
   * VS Code en la nube abrirá automáticamente el puerto `4200` para previsualizar la aplicación.

2. **GitHub.dev (Editor ligero en la nube para revisión de código):**
   * Presiona la tecla <kbd>.</kbd> (punto) en tu teclado mientras estás en la página del repositorio en GitHub, o cambia la URL de `github.com/...` a `github.dev/...`.
   * Esto abrirá Visual Studio Code para la Web instantáneamente en tu navegador.

---

## 📖 Descripción y Funcionamiento de la Aplicación

La aplicación web fue diseñada para la tienda de café **"El aroma mágico"**, permitiendo a los clientes y administradores visualizar las variedades disponibles:

1. **Consumo HTTP Asíncrono:** Consulta dinámicamente un conjunto de datos en formato JSON provisto mediante un endpoint en GitHub Gist:
   * `https://gist.githubusercontent.com/josejbocanegra/e9d24db370ce95b75555f7d1f8691805/raw/8a26ac2bca4183dc88545e14c45851d698911358/202212_MISW4104_Grupo3.json`
2. **Presentación Visual (Mockup):**
   * Encabezado institucional con el nombre comercial *"El aroma mágico"*.
   * Banner responsivo con la fotografía de granos de café y cuchara de barista.
   * Tabla con estilos de **Bootstrap 5**, encabezado oscuro (`table-dark`) y columnas: `#`, `Nombre`, `Tipo` y `Región`.
3. **Cálculo Dinámico de Variedades:**
   * La aplicación calcula en tiempo de ejecución las cantidades exactas de café según su clasificación (la tienda ofrece café de origen y café blend), mostrando bajo la tabla:
     * `Total café de origen: X`
     * `Total café blend: Y`
4. **Detección de Cambios Optimizada:**
   * Se gestiona la reactividad del ciclo de vida asíncrono con `ChangeDetectorRef.detectChanges()`, asegurando que la tabla se renderice de inmediato tan pronto como la respuesta HTTP es recibida, sin depender de eventos de interacción del usuario.

---

## 🏛️ Arquitectura del Software

Siguiendo las pautas de arquitectura modular (`@NgModule`) del curso MISW-4104:

```
src/app/
├── app-module.ts             # Módulo principal (AppModule) con importación de CafeModule y HttpClient
├── app.ts                    # Componente raíz (AppComponent)
├── app.html                  # Plantilla raíz que invoca <app-cafe-list>
├── app.spec.ts               # Prueba unitaria del componente raíz
└── cafe/
    ├── cafe.module.ts        # Módulo de funcionalidad (CafeModule) con exports de CafeListComponent
    ├── cafe.ts               # Modelo de Dominio (clase Cafe con sus 7 atributos tipados y constructor)
    ├── cafe.service.ts       # Servicio inyectable (@Injectable) para peticiones HTTP con HttpClient
    ├── cafe.service.spec.ts  # Pruebas unitarias del servicio con HttpClientTestingModule
    └── cafe-list/
        ├── cafe-list.component.ts    # Controlador: lógica de negocio, consumo y conteo dinámico
        ├── cafe-list.component.html  # Vista: tabla Bootstrap, banner, título, totales y footer
        ├── cafe-list.component.css   # Estilos locales de la vista
        └── cafe-list.component.spec.ts # Pruebas unitarias e integración (verificación 3 filas + encabezado)
```

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
* **Node.js:** Versión 18+ o 20+ LTS (comprobar con `node -v`).
* **npm:** Gestor de paquetes incluido con Node.js (comprobar con `npm -v`).
* **Git:** Para clonar el repositorio.

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/jhonsebastianasmiso/parcial-angular-miso.git
cd parcial-angular-miso
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Iniciar el servidor de desarrollo
```bash
npm start
# O alternativamente:
# npx ng serve
```

Una vez que la compilación finalice, abre tu navegador web en:
👉 **`http://localhost:4200/`**

La página se recargará automáticamente cada vez que realices modificaciones en el código fuente.

---

## 🧪 Ejecución de Pruebas Automatizadas (Testing)

El proyecto cuenta con un arnés completo de pruebas unitarias y de integración que validan el cumplimiento riguroso de la rúbrica de evaluación:

```bash
npm test -- --watch=false
```

### Cobertura de las Pruebas:
* **Prueba Nuclear del Punto 3:** Se genera una lista simulada de **3 cafés** y se inspecciona el DOM del componente para corroborar que la tabla renderiza exactamente **3 filas de datos (`tbody tr`) más 1 fila de encabezado (`thead tr`)**, confirmando un total de 4 elementos `<tr>` en la tabla:
  ```typescript
  expect(theadRows.length).toBe(1);
  expect(tbodyRows.length).toBe(3);
  expect(allRows.length).toBe(4);
  ```
* **Validación de Datos:** Se verifica que los textos de cada fila correspondan fielmente al `id`, `nombre`, `tipo` y `region` de cada café.
* **Validación de Totales:** Se prueba la función matemática `calcularTotalesPorTipo()` y su proyección en el HTML.
* **Pruebas de Servicio:** Verificación de peticiones GET asíncronas con `HttpClientTestingModule` y `HttpTestingController`.

**Resultado actual:** `8 passed (100% verde)`.

---

## 📦 Compilación para Producción (Build)

Para generar el paquete compilado y optimizado para despliegue:

```bash
npm run build
```

Los artefactos listos para producción se generarán en el directorio `dist/parcial-angular`.

---

## 📄 Licencia y Derechos de Autor
Desarrollado con fines académicos para el programa de **Maestría en Ingeniería de Software (MISO)** de la **Universidad de los Andes**. Prohibida su reproducción comercial no autorizada.
