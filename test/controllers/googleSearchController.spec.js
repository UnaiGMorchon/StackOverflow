import googleSearchController from "../../controllers/googleSearchController";

/**
* se espera que la función pueda buscar en Google los enlaces correspondientes a una consulta determinada y que el enlace a la página de StackOverflow se encuentre entre ellos.
* que contenga el enlace a la página de StackOverflow. Configurada para finalizar después de 10000
* @class
*/

/**
 * Prueba unitaria para verificar que se puedan obtener los links de una búsqueda en Google.
 * @param {string} description - Descripción de la prueba.
 * @param {Function} test - Función que contiene la prueba unitaria.
 * @param {number} timeout - Tiempo máximo en milisegundos que se permite para la ejecución de la prueba.
 * @returns {void}
 */

describe ("Google Search controller", () => {
    
    it('Deberia conseguir los links de una busquedad de google', async()=> {
        const query = "stackoverflow";
        const links = await googleSearchController.searchLinks(query);
        expect(links).toContain("https://stackoverflow.com/");
    },10000)
})
