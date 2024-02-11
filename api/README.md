README

En este proyecto hemos creado una API para crear una base de datos para una página en la que se podrán introducir Viajes recomendados. Y se llama Wanderlust.

DESCRIPCIÓN

Implementar una API que permita gestionar un portal donde los usuarios puedan publicar recomendaciones de viaje de sitios o experiencias poco conocidas.

Las consultar y registros en la API se han dividido en dos tipos:

Las anónimas, esto se refiere a todos los usuarios no registrados, y que podrán hacer lo siguiente:

●Buscar recomendaciones por lugar, categoría; donde al realizar la búsqueda tendrá dos tipos de respuesta, una en la que coincidan ambas peticiones, si hubiera alguna entrada que cumpla esa condición, o bien que cumpla una de las peticiones, en el caso de lugar no será necerasio que escriba el nombre completo del lugar si hay algún tipo de coincidencia, tendrá resultado, además las peticiones de busqueda de recomendaciones se mostrarán de manera descendente según fecha.

●Poder ordenar los resultados de búsqueda por votos, las peticiones de busqueda tienen la opción de poder aparecer por el número de votaciones obtenidas, aparecerán primero las más votadas.

●Ver detalle de una recomendación, el usuario no registrado puede ver cualquier recomendación y como hemos visto antes buscar por lugar y categoría en orden de fecha o por los más votados.

●Login (con email y password), al ususario anónimo se le da la opción de poder logearse introduciendo email y contraseña, en el caso de estar registrado, sino lo estuviera se le ofrecerá la oportunidad de poder registrarse.

●Registro (nombre, email y password, confirmación de password), los ususarios anónimos pueden registrarse en la aplicación y deberá introducir un nombre, un email(válido) y una password.

En el caso de usuarios ya registrados podrán realizar además de todas las tareas de los usuarios anónimos, excepto la de volver a registrarse, las tareas siguientes:

●Publicar recomendaciones (título, categoría, lugar, breve descripción , descripción, entradilla , foto), en la publicación de recomendaciones, estará obligado a introducir un título, una categoría, el lugar,una breve descripción, el texto donde tendrá que realizar los comentarios que desee sobre dicha recomendación, y una foto, estos campos son todos obligatorios, al realizar una publicación de forma automática se generará la entradilla(fecha de entrada), y un id, para identificar dicha entrada.

●Votar recomendaciones de otros usuarios, el usuario registrado podrá votar las recomendaciones de otros usuarios, esos votos iran redireccionados a la base de datos a través de la id que lo identifica.

Además de todo esto, que era lo que se nos pedía como trabajo obligatorio, hemos realizado otra operación que los usuarios regirtrados pueden llegar a hacer:

○Borrar sus recomendaciones, el usuario registrado tiene la opción de poder borrar las entradas de recomendaciones que haya realizado en cualquier momento.

LOS ENDPOINTS UTILIZADOS SON LOS SIGUIENTES:

Listar entradas:

Listar entradas ordenando o no por votos, buscar por lugar y/o categoría con opción de ordenar por votos y consultar una entrada por Id:

GET /entries : Para listar entradas.
GET /entries/place/:entriesPlace/category/:entriesCategory : Para buscar entradas por lugar y/o categoría.
GET /entries/place/:entriesPlace: Para buscar entradas por lugar.
GET /entries/category/:entriesCategory: Para buscar entradas por categoría.
GET /entries/order/ordered-by-votes: Para buscar entradas por votos.
GET /entries/order/ordered-by-date: Para buscar entradas por fecha.
GET /entries/:id : Consulta por id de entrada de recomendación.

Login y registro:

POST /usuarios/registro : Para crear un nuevo usuario.
POST /usuarios/login : Para realizar el login (loguearse).

Entradas de viajes:

Crear entradas, votar entradas y opcion de borrar una entrada:

POST /entries : Para crear nuevas entradas de recomendaciones.

POST /entries/:entryId/votes : Para realizar las votaciones sobre las recomendaciones de viaje.

DELETE /entries/:id : Para borrar las entradas de alguna recomendación de viaje, sólo puede borrarla un usuario registrado , y el propietario de dicha publicación.