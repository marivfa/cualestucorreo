# cualestucorreo

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Pruebas en las Vistas

* Inicio.


- Probar validaciones del nombre (requerido) y el dominio (requerido, solo letras, números y guion permitidos, separados del caracter punto (.)). Se emplean las validaciones nativas de angularjs
- Dejar datos por defecto, Rodrigo Blanco/filipinas.com -> ¡Email encontrado! ¿No es este el email que buscas? ¿Deseas realizar otra búsqueda?.
- Al cambiar solo el dominio -> Lamentamos decirte que.. Este servidor no permite verificación de correo electrónico.
- Al cambiar el nombre y el dominio -> ¡Oops! No hemos encontrado el email que buscas. Asegúrate de haber escrito bien nombres o dominio.
- Colocar "x" en el nombre -> ¡OPS! Se te han acabado las búsquedas.


* Precios / Adquiérelo Ahora.


- Cuando se ingresan los datos correctos se habilita el boton de Pagar. Se emplea el módulo angular-credit-cards y las validaciones nativas de angularjs.
