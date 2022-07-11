const cachorros = require('./database/cachorros.json');
const fs = require('fs')
const path = require('path');
const { stringify } = require('querystring');

function salvar(){
    let arquivo = path.resolve('./database/cachorros.json')
    let json = JSON.stringify(cachorros, null, 4)

    fs.writeFileSync(arquivo, json)
}

function buscar(id){
    let temCachorroBuscado = cachorro => cachorro.id === id ? true : false
    let cachorroBuscado = cachorros.find(temCachorroBuscado)
    return cachorroBuscado ? cachorroBuscado : 'O cachorro não está cadastrado';
    }

    module.exports = {
    listar: () => {console.table(cachorros)} ,
    descrever: (id) => {
        let cachorroBuscado = buscar(id)
        return cachorroBuscado ? cachorroBuscado : `Não existe cachorro com o id ${id}`;
    },
    adicionar: (cachorro) => {
        let ultimocachorro = cachorros[cachorros.length-1]
        cachorro.id = ultimocachorro.id+1
        cachorro.vacinas = []
        cachorro.servicos = []
        cachorros.push(cachorro)
        salvar(cachorros)
    },
    vacinar: (id, nomeVac, dataVac) => {
        let cachorroVacinado = buscar(id)
        let novaVacina = new Object()
        novaVacina.nome = nomeVac
        novaVacina.data = dataVac
            if (cachorroVacinado.id) {
            cachorroVacinado.vacinas.push(novaVacina)  
        } else {
            console.log(`Não existe cachorro com o id ${id}`)
        } salvar()
    },
    servicos: (id, nomeServ, dataServ) => {
        let cachorroServico = buscar(id)
        let novoServ = new Object()
        novoServ.nome = nomeServ
        novoServ.data = dataServ
        if (cachorroServico.id) {
            cachorroServico.servicos.push(novoServ)  
        } else {
            console.log(`Não existe cachorro com o id ${id}`)
        } salvar()
    },
    remover: (id) => {
        let cachorroRemovido = buscar(id)
            if (cachorroRemovido.id){
            let i = id - 1
            cachorros.splice(i, 1)
        } else {
            console.log(`Não existe cachorro com o id ${id}`)
        } salvar()
    }
}
