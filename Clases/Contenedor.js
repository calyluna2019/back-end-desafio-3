class Contenedor {

    constructor(archivo, fs) {
        this.archivo = archivo;
        this.fs = fs;
    }

    async save(producto){
        try {
            let id;
            const todos = await this.getAll();
            if(todos.length>0){
                const ultim = todos.find((e) => {
                    return todos[todos.length - 1].id == e.id;
                })
                id = ultim.id + 1;
            } else {
                id = 1;
            }
            const prod = {...producto,id}
            todos.push(prod);
            this.fs.writeFile(this.archivo, JSON.stringify(todos));
            console.log(`Id del producto agregado: ${todos.pop().id}`);
            
        } catch (error) {
            console.log(`Error al guardar un producto: ${error}`)
        }
    }

    async getById(id) {
        const todos = await this.getAll();
        const byId = todos.find((e)=>e.id === id);
        return byId??null
    }

    async getAll() {
        try {
            const productos = await this.fs.readFile(this.archivo, 'utf-8');
            const productosParse = JSON.parse(productos);
            return productosParse;
          } catch (error) {
            console.log(`Error al obtener los productos: ${error}`);
          }
    }

    async deleteById(id) {
        const todos = await this.getAll();
        const byId = todos.find((e)=>e.id === id);
        if(byId){
            todos.splice(id-1,1)
            this.fs.writeFile(this.archivo, JSON.stringify(todos));
        } else {
            console.log("el id que quiere borrar no existe!!");
        }
    }

    async deleteAll() {
        this.fs.writeFile(this.archivo, "[]");
    }
}

module.exports = {
    Contenedor
};