const btnExpandir = document.querySelector('.btn-expandir')
const btnFiltrar = document.querySelector('#btn-filtrar')
const btnSalvar = document.querySelector('#btn-salvar')
const diaDeHoje = document.querySelector('.data-atual')
const dataAtual = new Date()
const gridCard = document.querySelector('.grid-card')
const divWellcome = document.querySelector('.wellcome')
let contClick = 0

diaDeHoje.innerText = formataData(dataAtual)

btnExpandir.addEventListener('click', abrirFecharMenu)
btnSalvar.addEventListener('click', salvarCard)

function formataData(data) {
  const dia = zeroEsquerda(data.getDate())
  const mes = zeroEsquerda(data.getMonth() + 1)
  const ano = zeroEsquerda(data.getFullYear())
  return `${dia}/${mes}/${ano}`
}

function zeroEsquerda(num) {
  return num < 10 ? `0${num}` : num
}

function clearInputs() {
  const titulo = document.getElementById('titulo')
  const horario = document.getElementById('horario')
  const descricao = document.getElementById('descricao')
  
  titulo.value = ''
  horario.value = ''
  descricao.value = ''
  
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.checked = false;
  });
}

function abrirFecharMenu() {
  const iconeExpandir = document.querySelector('.bi-list');
  const iconeClose = document.querySelector('.bi-x-lg');
  const menuLateral = document.querySelector('.menu-lateral');
  const formulario = document.getElementById('form-tarefa');

  if (btnExpandir.classList.contains('menu-aberto')) { // Verifica se o menu está aberto

    menuLateral.style.width = '5%';
    formulario.style.visibility = 'hidden';
    iconeClose.style.visibility = 'hidden';
    iconeExpandir.style.visibility = 'visible';
    gridCard.style.width = 'calc(100% - 5%)';
    gridCard.style.margin = '1.6rem auto auto 5%';
    btnExpandir.classList.remove('menu-aberto');

  } else { // Menu está fechado
    menuLateral.style.width = '15%';
    formulario.style.visibility = 'visible';
    iconeExpandir.style.visibility = 'hidden';
    iconeClose.style.visibility = 'visible';
    gridCard.style.width = 'calc(100% - 15%)';
    gridCard.style.margin = '1.6rem auto auto 15%';
    btnExpandir.classList.add('menu-aberto');

  }
}

function salvarCard() {
  
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

  clearInputs()

}


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
  btnEditar.classList = 'btn-edit'
  const btnEditarConcluir = document.createElement('button')
  btnEditarConcluir.innerText = 'Finalizar'
  btnEditarConcluir.classList = 'btn-edit-concluir'
  const btnConcluir = document.createElement('button')
  btnConcluir.innerText = 'Concluir'
  btnConcluir.classList = 'btn-concluir'
  const btnExcluir = document.createElement('button')
  btnExcluir.innerText = 'Excluir'
  btnExcluir.classList = 'btn-excluir'

  
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
  
  btnCards.append(btnEditar, btnEditarConcluir, btnConcluir, btnExcluir)
  cardContent.append(tituloH2, horarioSpan, descricaoP, btnCards)
  divCards.append(cardContent)

  btnEditar.addEventListener('click', function(event) {
    const botaoClicado = event.target;
    editarTarefa(botaoClicado);
  });
}


function editarTarefa(btnEdit) {
  const card = btnEdit.parentNode.parentNode;
  const titulo = card.querySelector('h2').innerText
  const span = card.querySelector('span').innerText
  const desc = card.querySelector('p').innerText
  const computedStyles = getComputedStyle(card);
  let backgroundColor = computedStyles.backgroundColor;
  
  if (backgroundColor === 'rgb(232, 14, 12)') {
    document.getElementById('prioridade-alta').checked = true
  } else if (backgroundColor === 'rgb(255, 184, 25)') {
    document.getElementById('prioridade-media').checked = true
  } else if (backgroundColor === 'rgb(9, 155, 179)') {
    document.getElementById('prioridade-baixa').checked = true
  }
  
  const tituloTarefa = document.querySelector('#titulo')
  tituloTarefa.value = titulo
  const spanTarefa = document.querySelector('#horario')
  spanTarefa.value = span
  const descricaoTarefa = document.querySelector('#descricao')
  descricaoTarefa.value = desc

  //card.parentNode.removeChild(card);
  const cardContentDiv = document.querySelectorAll('.card-content')
  cardContentDiv.forEach(function(cardsContent) {
    if (cardsContent != card)  {
      cardsContent.style.filter = 'blur(5px)'
    }
  })

  if (!btnExpandir.classList.contains('menu-aberto')) {
    abrirFecharMenu()
  }

  btnEdit.style.display = 'none';
  btnSalvar.disabled = true
  btnFiltrar.disabled = true
  fnEditFinalizar(card)
  
  // if (tdTarefa.isContentEditable) {
  //   tdTarefa.contentEditable = false;
  //   tdDesc.contentEditable = false;
  //   btnEdit.innerText = 'Editar';
  //   linha.classList.remove('editando')
  // } else {
  //   tdTarefa.contentEditable = true;
  //   tdDesc.contentEditable = true;
  //   btnEdit.innerText = 'Salvar';
  //   tdTarefa.focus()
  // }
  // salvarTarefas()
}


function fnEditFinalizar(ev) {
  const card = ev;
  const btnEditFinalizar = card.querySelector('.btn-edit-concluir');
  btnEditFinalizar.style.display = 'inline-block';
  
  const btnEditFinalizarClickHandler = () => {

    const tituloTarefa = document.querySelector('#titulo');
    const spanTarefa = document.querySelector('#horario');
    const descricaoTarefa = document.querySelector('#descricao');

    const tituloEditado = card.querySelector('h2');
    tituloEditado.innerText = tituloTarefa.value;
    const spanEditado = card.querySelector('span');
    spanEditado.innerText = spanTarefa.value;
    const descEditado = card.querySelector('p');
    descEditado.innerText = descricaoTarefa.value;
    const checkedRadio = document.querySelectorAll('input[type="radio"]');
    checkedRadio.forEach(radioChecked => {
      if (radioChecked.checked) {
        if (radioChecked.id === 'prioridade-alta') {
          card.style.backgroundColor = 'rgb(232, 14, 12)';
        } else if (radioChecked.id === 'prioridade-media') {
          card.style.backgroundColor = 'rgb(255, 184, 25)';
        } else if (radioChecked.id === 'prioridade-baixa') {
          card.style.backgroundColor = 'rgb(9, 155, 179)';
        }
      }
    });

    const cardContentDiv = document.querySelectorAll('.card-content')
    cardContentDiv.forEach(function(cardsContent) {
      if (cardsContent != card)  {
        cardsContent.style.filter = 'none'
      }
    })

    if (btnExpandir.classList.contains('menu-aberto')) {
      abrirFecharMenu()
    }
    
    btnEditFinalizar.style.display = 'none';
    const btnEdited = card.querySelector('.btn-edit');
    btnEdited.style.display = 'inline-block';
    btnEditFinalizar.removeEventListener('click', btnEditFinalizarClickHandler);
    clearInputs()
    btnSalvar.disabled = false
    btnFiltrar.disabled = false

  };
  
  btnEditFinalizar.addEventListener('click', btnEditFinalizarClickHandler);
}

