import googleSearchController from "../../controllers/googleSearchController";

/**
* se espera que la función pueda buscar en Google los enlaces correspondientes a una consulta determinada y que el enlace a la página de StackOverflow se encuentre entre ellos.
* que contenga el enlace a la página de StackOverflow. Configurada para finalizar después de 10000
* @class
 */

describe ("Google Search controller", () => {
    
    it('Deberia conseguir los links de una busquedad de google', async()=> {
        const query = "stackoverflow";
        const links = await googleSearchController.searchLinks(query);
        expect(links).toContain("https://stackoverflow.com");
    },10000)
})
