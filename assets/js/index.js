const btnExpandir = document.querySelector('.btn-expandir')
const diaDeHoje = document.querySelector('.data-atual')
const dataAtual = new Date()
const gridCard = document.querySelector('.grid-card')
const divWellcome = document.querySelector('.wellcome')
let contClick = 0

diaDeHoje.innerText = formataData(dataAtual)

function formataData(data) {
  const dia = zeroEsquerda(data.getDate())
  const mes = zeroEsquerda(data.getMonth() + 1)
  const ano = zeroEsquerda(data.getFullYear())
  return `${dia}/${mes}/${ano}`
}

function zeroEsquerda(num) {
  return num < 10 ? `0${num}` : num
}


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

    gridCard.style.width = 'calc(100% - 325px)'
    gridCard.style.margin = '1.6rem auto auto 325px'

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

    gridCard.style.width = 'calc(100% - 74px)'
    gridCard.style.margin = '1.6rem auto auto 74px'

  }

})


const btnSalvar = document.querySelector('#btn-salvar')
btnSalvar.addEventListener('click', function() {
  const salvarTarefas = []
  const tituloTarefa = document.getElementById('titulo').value
  const horarioAgendado = document.getElementById('horario').value
  const descricaoTarefa = document.getElementById('descricao').value
  const prioridadeTarefa = document.querySelector('input[type="radio"]:checked').value
  const dataDeHoje = formataData(dataAtual)

  if (salvarTarefas.length === 0) {

    divWellcome.style.display = 'none'
    salvarTarefas.push({tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa, dataDeHoje})

  }else {
    salvarTarefas.push({tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa, dataDeHoje})
  }

  if (salvarTarefas.length > 0) {
    const [objetoTarefa] = salvarTarefas
    const {tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa, dataDeHoje} = objetoTarefa;
    criarCard(tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa)
  }
})

function criarCard(titulo, horario, descricao, prioridade) {

  const divCards = document.querySelector('.cards')
  const cardContent = document.createElement('div')
  cardContent.className = 'card-content'
  const tituloH2 = document.createElement('h2')
  tituloH2.innerHTML = titulo
  const horarioSpan = document.createElement('span')
  horarioSpan.innerHTML = horario
  const descricaoP = document.createElement('p')
  descricaoP.innerHTML = descricao
  const btnCards = document.createElement('div')
  btnCards.className = 'btn-cards'
  const btnEditar = document.createElement('button')
  btnEditar.innerText = 'Editar'
  const btnConcluir = document.createElement('button')
  btnConcluir.innerText = 'Concluir'
  const btnExcluir = document.createElement('button')
  btnExcluir.innerText = 'Excluir'
  
  if (prioridade === 'alta') {
    cardContent.style.backgroundColor = '#E80E0C'
    tituloH2.style.color = '#fff'
    horarioSpan.style.color = '#fff'
    descricaoP.style.color = '#fff'
  }else if (prioridade === 'media') {
    cardContent.style.backgroundColor = '#FFB819'
    tituloH2.style.color = '#000'
    horarioSpan.style.color = '#000'
    descricaoP.style.color = '#000'
  }else if (prioridade === 'baixa') {
    cardContent.style.backgroundColor = '#099BB3'
    tituloH2.style.color = '#000'
    horarioSpan.style.color = '#000'
    descricaoP.style.color = '#000'
  }

  btnCards.append(btnEditar, btnConcluir, btnExcluir)
  cardContent.append(tituloH2, horarioSpan, descricaoP, btnCards)
  divCards.append(cardContent)

  
}