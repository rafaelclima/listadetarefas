const btnExpandir = document.querySelector('.btn-expandir')
let contClick = 0
btnExpandir.addEventListener('click', function(){

  if(contClick === 0) {
    contClick = 1

    const menuLateral = document.querySelector('.menu-lateral')
    menuLateral.style.width = '325px'
    const formulario = document.getElementById('form-tarefa')
    formulario.style.visibility = 'visible'
    const iconeExpandir = document.querySelector('.bi-list')
    iconeExpandir.style.display = 'none'
    const iconeClose = document.querySelector('.bi-x-lg')
    iconeClose.style.display = 'block'

  }else {
    contClick = 0

    const menuLateral = document.querySelector('.menu-lateral')
    menuLateral.style.width = '70px'
    const formulario = document.getElementById('form-tarefa')
    formulario.style.visibility = 'hidden'
    const iconeClose = document.querySelector('.bi-x-lg')
    iconeClose.style.display = 'none'
    const iconeExpandir = document.querySelector('.bi-list')
    iconeExpandir.style.display = 'block'

  }

})


const btnSalvar = document.querySelector('#btn-salvar')
const salvarTarefas = []
btnSalvar.addEventListener('click', function() {
  const tituloTarefa = document.getElementById('titulo').value
  const horarioAgendado = document.getElementById('horario').value
  const descricaoTarefa = document.getElementById('descricao').value
  const prioridadeTarefa = document.querySelector('input[type="radio"]:checked').value

  salvarTarefas.push({tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa})

  console.log(salvarTarefas)
})