### Visión General del Proyecto
* Nombre del Proyecto: ICE - Inventario de Contenedores Econtainers

* Objetivo: Desarrollar una aplicación web para gestionar el inventario de contenedores marítimos de la compañía Econtainers Global, una compañía dedicada a la compra venta de contenedores a nivel mundial. La aplicación debe permitir la gestión del inventario de contenedores en diferentes países, ciudades y depósitos.  

* Tecnología Principal: Angular (versión 19).


### Decisiones Tecnológicas Clave (Impuestas/Adoptadas)

* Framework: Angular 19.

* Reactividad y Detección de Cambios: Basada en Angular Signals y un enfoque Zoneless (sin Zone.js explícito para detección de cambios, optimizando el rendimiento). Esta es una decisión clave para adoptar las últimas tendencias de Angular desde el inicio.

* Gestión de Estado: Los estados de la aplicación se gestiona centralmente por medio de servicios servicio utilizando WritableSignal y computed signals.

* Formularios: Se utiliza Angular Reactive Forms para la gestión de formularios y validación, proporcionando un control robusto sobre la entrada de datos.

* Comunicación con el Backend: Se usa Angular HttpClient para todas las operaciones de datos, configurado mediante provideHttpClient() (el método moderno para aplicaciones Standalone en Angular 19).

* Backend Simulado: inicialmente Para el desarrollo, se utiliza json-server como un backend REST API simulado, permitiendo la persistencia de datos en un archivo db.json local. Sin embargo en fases siguientes se debe conectar a una base de datos real

* Sintaxis de Plantillas: Se utiliza el nuevo flujo de control de Angular (@if, @for, @else, @empty) en las plantillas HTML para un mejor rendimiento y una sintaxis más limpia y clara.

* Estándar de Codificación: Todos los nombres de variables, constantes, interfaces, clases y demás identificadores en el código están en inglés para facilitar la colaboración global y el mantenimiento.

* Persistencia de Datos: Todas las operaciones CRUD interactúan con el backend simulado (json-server), asegurando que los cambios persistan incluso después de recargar la aplicación.

* Navegación: Implementación de enrutamiento con routerLink y router-outlet para una navegación fluida entre las vistas de lista y formulario.



4. Notas Importantes para el Desarrollo
Doble Terminal: Para ejecutar el proyecto, es esencial tener dos terminales separadas: una para ng serve (frontend en http://localhost:4200) y otra para json-server --watch db.json --port 3000 (backend en http://localhost:3000).

@types: Los errores de "Cannot find type definition file" se resolvieron instalando los paquetes @types/ correspondientes como devDependencies (npm install --save-dev @types/...).

Sincronización: Los cambios en db.json son visibles en la aplicación solo si ambas terminales (Angular y json-server) están activas.


### FUNCIONALIDADES REQUERIDAS

1. CONTENEDOR: CRUD
2. MOVIMIENTOS
  2.1. INGRESO
    2.1.1. COMPRA
    2.1.2. INGRESO DIRECTO
  2.2. SALIDA
    2.2.1. SALIDA POR VENTA
    2.2.2. SALIDA DIRECTA
  2.3. TRASLADO
    2.3.1. TRASLADO DE DEPÓSITO
    2.3.2. TRASLADO DE UBICACIÓN
3. VENTA
  3.1. RESERVA DE VENTA
  3.2. RELEASE
  3.3. SALIDA POR VENTA
4. ALQUILER
  4.1. RESERVA DE ALQUILER
  4.2. RELEASE
  4.3. SALDA ALQUILER
  4.4. DEVOLUCIÓN ALQUILER
5. MODIFICACIONES
  5.1. TRANSFORMACIÓN: se transforma un tipo de contenedor en otro tipo
  5.2. REPARACIÓN
  5.3. MANTENIMIENTO
  5.4. PTI
6. TERCEROS
  6.1. CLIENTE: CRUD
  6.2. PROVEEDOR: CRUD
  6.3. DEPÓSITO: CRUD
7. REPORTES
  7.1. INVENTARIO
  7.2. OPERACIONES
  7.3. FLOTA DE ALQUILER
8. DATOS MAESTROS
  8.1. EQUIPO
    8.1.1. CÓDIGOS DE PRODUCTO: CRUD
    8.1.2. TIPOS DE CONTENEDOR: CRUD
    CONDICIONES: CRUD
    CATEGORÍAS: CRUD
  8.2. GEOGRÁFICOS
    8.2.1. PAÍSES: CRUD
    8.2.2. CIUDADES: CRUD
  8.3. GENERAL
    8.3.1. COMPAÑÍAS: CRUD
    8.3.2. MONEDAS: CRUD
    8.3.4. TASAS DE CAMBIO: CRUD
9. CONFIGURACIÓN
  9.1. GESTIÓN DE ROLES 
  9.2. GESTIÓN DE USUARIOS

