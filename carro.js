class Carro {
    constructor() {
        this.carros = localStorage.getItem('tableCarros') === null
        ? []
        : JSON.parse(localStorage.getItem('tableCarros'))
    }

    salva(carro){
        //o registro está sendo editado?
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
            this.apaga(carro.codigo)
        }
        this.carros.push(carro) //adiciona um novo elemento ao array
        localStorage.setItem('tableCarros', JSON.stringify(this.carros))
        Swal.fire(
            'Inserido!!',
            'Foi inserido com sucesso.',
            'success'
        )
        
    }

    apaga(codigo){
        
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você está prestes a excluir um registro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                let index = this.carros.findIndex(carro => carro.codigo == codigo)
                this.carros.splice(index, 1) //index é o elemento do array
                //salvamos a alteração
                localStorage.setItem('tableCarros',JSON.stringify(this.carros))
                Swal.fire(
                    'Deletado!',
                    'Foi deletado com sucesso.',
                    'success'
                )
                carro.atualiza()
                carro.atualizaId()
            }
          })
        
    }

    edita(carro){
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('codigo').value = carro.codigo
        document.getElementById('nomeCarro').value = carro.nome
        document.getElementById('nomeFab').value = carro.nomeFab
        document.getElementById('anoCarro').value = carro.anoCarro
        document.getElementById('cambio').value = carro.cambio
    }
    
    lista(){
        const listagem = this.carros.map((carro) => (
            `<tr>
            <td>${carro.codigo}</td>
            <td>${carro.nome}</td>
            <td>${carro.nomeFab}</td>
            <td>${carro.anoCarro}</td>
            <td>${carro.cambio}</td> 
           
            <td id="opcoes">
                <button id='apagar' onClick='carro.apaga(${carro.codigo})'>
                <i class="fas fa-times"></i>Apagar</button>
                <button id='editar' onClick='carro.edita(${JSON.stringify(carro)})'>
                <i class="fas fa-edit"></i>Editar</button>
            </td>
            </tr>
            `
        )).join('')
        return (`<table cellspacing="0" cellpadding="0" border='1' class='paleBlueRows'>
        <caption>Relação dos carros</caption>
        <thead>
            <th>Código</th>  
            <th>Nome do Carro</th> 
            <th>Fabricante</th> 
            <th>Ano de Fabricação</th> 
            <th>Cambio</th>  
            <th>Opções</th>
        </thead>
        <tbody>${listagem}</tbody>      
        </table>
        `)
    }

    atualiza(){
        document.getElementById('listagem').innerHTML = carro.lista()
    }
    atualizaId(){
        var valor = this.carros[this.carros.length -1];
        var code;
        console.log(valor)
        if(valor==null){
            
            code=1;
        }else{
            
            code=parseInt(valor.codigo)+1;
            
        }
        document.getElementById('codigo').value = code;
    }
}
//instanciamos um novo objeto
const carro = new Carro()
//tratamos o botão salvar
document.getElementById('salvar').onclick = function ()  {
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nomeCarro').value,
        nomeFab: document.getElementById('nomeFab').value,
        anoCarro: document.getElementById('anoCarro').value,
        cambio: document.getElementById('cambio').value,
    }
    if(!!registro.codigo && !!registro.nome && !!registro.nomeFab && !!registro.anoCarro && !!cambio){
        carro.salva(registro)
        updateAll()
    }else{
        Swal.fire(
            'Atenção',
            'Algum dos campos está vazio!',
            'warning'
          )
    }
    
}
function updateAll() {
    carro.atualiza()
    carro.atualizaId()
}
//tratamos a listagem
window.onload = function(){
    updateAll()
}


