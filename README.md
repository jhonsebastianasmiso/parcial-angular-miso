# MISW-4104: Evaluación Práctica Angular - El aroma mágico

Este proyecto implementa la evaluación práctica de Angular para el curso **MISW-4104: Ingeniería de Software para Aplicaciones Web** (Maestría en Ingeniería de Software - MISO, Universidad de los Andes).

## ☕ Descripción de la Aplicación
La aplicación despliega el catálogo de variedades de café de la tienda **"El aroma mágico"**, consumiendo de forma asíncrona un listado desde GitHub Gist, presentándolo en una tabla estilizada con Bootstrap 5 y calculando dinámicamente las cantidades según su variedad.

---

## 🏛️ Arquitectura y Componentes
1. **Módulo `CafeModule` (`src/app/cafe/cafe.module.ts`):** Módulo desacoplado importado en `AppModule` con exportación de componentes.
2. **Modelo `Cafe` (`src/app/cafe/cafe.ts`):** Clase de datos con sus 7 atributos tipados (`id`, `nombre`, `tipo`, `region`, `sabor`, `altura`, `imagen`) y constructor.
3. **Servicio `CafeService` (`src/app/cafe/cafe.service.ts`):** Servicio inyectable que consulta vía HTTP el endpoint oficial mediante `HttpClient` y retorna un `Observable<Cafe[]>`.
4. **Componente `CafeListComponent` (`src/app/cafe/cafe-list/`):**
   * Encabezado con título *"El aroma mágico"* y banner recortado de la tienda.
   * Tabla responsive de Bootstrap (`table-dark`) mostrando `#`, `Nombre`, `Tipo` y `Región`.
   * **Conteo dinámico:** Cálculo en tiempo de ejecución de las variedades de café de origen (`totalCafeOrigen`) y café blend (`totalCafeBlend`).
   * **Detección de cambios inmediata:** Uso de `ChangeDetectorRef.detectChanges()` para garantizar la actualización inmediata del DOM al resolver la respuesta asíncrona del servicio.
   * Pie de página con información de contacto.

---

## 🚀 Ejecución del Proyecto

### 1. Servidor de desarrollo
Para iniciar el servidor local de desarrollo:
```bash
npm start
# o: ng serve
```
Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente ante cualquier cambio.

### 2. Pruebas Automatizadas
Para ejecutar la suite completa de pruebas unitarias y de integración:
```bash
npm test -- --watch=false
```

Las suites validan:
* Creación de componentes y servicios.
* Inyección y simulación de peticiones HTTP con `HttpClientTestingModule`.
* Verificación de la creación de la tabla con **3 filas de datos más 1 fila de encabezado** (4 filas `<tr>` en total en el DOM).
* Despliegue correcto de los atributos en cada columna y cálculo dinámico de variedades.

### 3. Compilación para Producción
```bash
npm run build
```
Genera los artefactos optimizados en la carpeta `dist/`.
