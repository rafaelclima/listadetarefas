const btnExpandir = document.querySelector('.btn-expandir')
const btnFiltrar = document.querySelector('#btn-filtrar')
const btnSalvar = document.querySelector('#btn-salvar')
const diaDeHoje = document.querySelector('.data-atual')
const dataAtual = new Date()
const gridCard = document.querySelector('.grid-card')
const divWellcome = document.querySelector('.wellcome')
let contClick = 0
let arrLocalStorage = []

function recuperarLocalStorage() {

  if (localStorage.meusCards) {
    arrLocalStorage = JSON.parse(localStorage.getItem('meusCards'))
    divWellcome.style.display = 'none'
  }

  arrLocalStorage.forEach(cards => {

    if (cards.length === 6) {
      const [tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa, dataDeHoje, concluido] = cards;
      
      criarCardConcluido(tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa, concluido)

    }else {
      const [tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa, dataDeHoje] = cards;

      criarCard(tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa)
    }

  })
}

recuperarLocalStorage()

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
    gridCard.style.margin = 'auto auto auto 5%';
    btnExpandir.classList.remove('menu-aberto');

  } else { // Menu está fechado
    menuLateral.style.width = '15%';
    formulario.style.visibility = 'visible';
    iconeExpandir.style.visibility = 'hidden';
    iconeClose.style.visibility = 'visible';
    gridCard.style.width = 'calc(100% - 15%)';
    gridCard.style.margin = 'auto auto auto 15%';
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

    if (localStorage.meusCards) {
      arrLocalStorage = JSON.parse(localStorage.getItem('meusCards'))
    }

    arrLocalStorage.push([tituloTarefa, horarioAgendado, descricaoTarefa, prioridadeTarefa, dataDeHoje])
    localStorage.meusCards = JSON.stringify(arrLocalStorage)
  }

  clearInputs()
  abrirFecharMenu()

}


function criarCard(titulo, horario, descricao, prioridade) {

  const divCards = document.querySelector('.cards')
  const cardContent = document.createElement('div')
  cardContent.className = 'card-content'
  const itemBg = document.createElement('div')
  itemBg.className = 'item-bg'
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

  btnEditar.addEventListener('click', function(event) {
    const botaoClicado = event.target;
    editarTarefa(botaoClicado);
  });

  btnConcluir.addEventListener('click', function(event) {
    const botaoClicado = event.target;
    concluirTarefa(botaoClicado);
  });

  btnExcluir.addEventListener('click', function(event) {
    const botaoClicado = event.target;
    excluirTarefa(botaoClicado);
  });

  btnCards.append(btnEditar, btnEditarConcluir, btnConcluir, btnExcluir)
  cardContent.append(itemBg, tituloH2, horarioSpan, descricaoP, btnCards)
  divCards.append(cardContent)


  const allBtnsCard = btnCards.querySelectorAll('button')
  
  if (prioridade === 'alta') {
    itemBg.style.backgroundColor = '#E80E0C'
    allBtnsCard.forEach(addClass => {
      addClass.classList.add('btn-prioridade-alta')
    })
    
    cardContent.addEventListener('mouseenter', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.add('btn-prioridade-alta-hover')
      })
    })

    cardContent.addEventListener('mouseleave', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.remove('btn-prioridade-alta-hover')
      })
    })

  }else if (prioridade === 'media') {
    itemBg.style.backgroundColor = '#FFB819'

    allBtnsCard.forEach(addClass => {
      addClass.classList.add('btn-prioridade-media')
    })
    
    cardContent.addEventListener('mouseenter', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.add('btn-prioridade-media-hover')
      })
    })

    cardContent.addEventListener('mouseleave', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.remove('btn-prioridade-media-hover')
      })
    })

  }else if (prioridade === 'baixa') {
    itemBg.style.backgroundColor = '#099BB3'
    allBtnsCard.forEach(addClass => {
      addClass.classList.add('btn-prioridade-baixa')
    })
    
    cardContent.addEventListener('mouseenter', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.add('btn-prioridade-baixa-hover')
      })
    })

    cardContent.addEventListener('mouseleave', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.remove('btn-prioridade-baixa-hover')
      })
    })

  }

}

function criarCardConcluido(titulo, horario, descricao, prioridade, concluido) {

  const divCards = document.querySelector('.cards')
  const cardContent = document.createElement('div')
  cardContent.className = 'card-content'
  const itemBg = document.createElement('div')
  itemBg.className = 'item-bg'
  const tituloH2 = document.createElement('h2')
  tituloH2.innerHTML = titulo
  tituloH2.style.textDecoration = 'line-through'
  const horarioSpan = document.createElement('span')
  horarioSpan.innerHTML = horario
  horarioSpan.style.textDecoration = 'line-through'
  const descricaoP = document.createElement('p')
  descricaoP.innerHTML = descricao
  descricaoP.style.textDecoration = 'line-through'
  const btnCards = document.createElement('div')
  btnCards.className = 'btn-cards'

  const addIcon = document.createElement('i')
  addIcon.classList.add('bi', 'bi-check2-circle')
  const btnConcluir = document.createElement('button')
  btnConcluir.innerText = 'Tarefa Concluída'
  btnConcluir.classList = 'btn-concluir'
  btnConcluir.style.width = '45%'
  btnConcluir.style.backgroundColor = '#4ebc00'
  btnConcluir.disabled = 'true'
  const btnExcluir = document.createElement('button')
  btnExcluir.innerText = 'Excluir'
  btnExcluir.classList = 'btn-excluir'
  btnExcluir.style.width = '25%'

  btnExcluir.addEventListener('click', function(event) {
    const botaoClicado = event.target;
    excluirTarefa(botaoClicado);
  });

  btnCards.append(btnConcluir, btnExcluir)
  cardContent.append(addIcon ,itemBg, tituloH2, horarioSpan, descricaoP, btnCards)
  divCards.append(cardContent)

  const allBtnsCard = btnCards.querySelectorAll('button')
  
  if (prioridade === 'alta') {
    itemBg.style.backgroundColor = '#E80E0C'
    allBtnsCard.forEach(addClass => {
      addClass.classList.add('btn-prioridade-alta')
    })
    
    cardContent.addEventListener('mouseenter', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.add('btn-prioridade-alta-hover')
      })
    })

    cardContent.addEventListener('mouseleave', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.remove('btn-prioridade-alta-hover')
      })
    })

  }else if (prioridade === 'media') {
    itemBg.style.backgroundColor = '#FFB819'

    allBtnsCard.forEach(addClass => {
      addClass.classList.add('btn-prioridade-media')
    })
    
    cardContent.addEventListener('mouseenter', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.add('btn-prioridade-media-hover')
      })
    })

    cardContent.addEventListener('mouseleave', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.remove('btn-prioridade-media-hover')
      })
    })

  }else if (prioridade === 'baixa') {
    itemBg.style.backgroundColor = '#099BB3'
    allBtnsCard.forEach(addClass => {
      addClass.classList.add('btn-prioridade-baixa')
    })
    
    cardContent.addEventListener('mouseenter', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.add('btn-prioridade-baixa-hover')
      })
    })

    cardContent.addEventListener('mouseleave', () => {
      allBtnsCard.forEach(addClass => {
        addClass.classList.remove('btn-prioridade-baixa-hover')
      })
    })

  }

}


function editarTarefa(btnEdit) {
  const card = btnEdit.parentNode.parentNode;
  const titulo = card.querySelector('h2').innerText
  const span = card.querySelector('span').innerText
  const desc = card.querySelector('p').innerText
  const bgColorItemBg = card.querySelector('.item-bg')
  const computedStyles = getComputedStyle(bgColorItemBg);
  const backgroundColor = computedStyles.backgroundColor;
  
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
}


function fnEditFinalizar(el) {
  const card = el;
  const btnEditFinalizar = card.querySelector('.btn-edit-concluir');
  btnEditFinalizar.style.display = 'inline-block';

  const divCards = document.querySelector('.cards');
  const cardContents = divCards.querySelectorAll('.card-content');
  
  cardContents.forEach((cardContent, index) => {
    cardContent.setAttribute('data-index', index);
  });

  const cardIndex = card.getAttribute('data-index')
  
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
    const itemBgCard = card.querySelector('.item-bg')
    const checkedRadio = document.querySelectorAll('input[type="radio"]');

    // const divBtnOnCard = card.querySelector('.btn-cards')
    const removeClassBgCard = card.querySelectorAll('button')
    removeClassBgCard.forEach(bgCard => {
      if (bgCard.classList.contains('btn-prioridade-alta')) {
        bgCard.classList.remove('btn-prioridade-alta')
        bgCard.classList.remove('btn-prioridade-alta-hover')
      }else if (bgCard.classList.contains('btn-prioridade-media')) {
        bgCard.classList.remove('btn-prioridade-media')
        bgCard.classList.remove('btn-prioridade-media-hover')
      }else if (bgCard.classList.contains('btn-prioridade-baixa')) {
        bgCard.classList.remove('btn-prioridade-baixa')
        bgCard.classList.remove('btn-prioridade-baixa-hover')
      }
    })

    let prioridadeEditada
    checkedRadio.forEach(radioChecked => {
      if (radioChecked.checked) {
        if (radioChecked.id === 'prioridade-alta') {
          prioridadeEditada = 'alta'
          itemBgCard.style.backgroundColor = 'rgb(232, 14, 12)';
          removeClassBgCard.forEach(addClass => {
            addClass.classList.add('btn-prioridade-alta')
            card.addEventListener('mouseenter', () => {
              addClass.classList.add('btn-prioridade-alta-hover')
            })
            card.addEventListener('mouseleave', () => {
              addClass.classList.remove('btn-prioridade-alta-hover')
            })
          })
        } else if (radioChecked.id === 'prioridade-media') {
          prioridadeEditada = 'media'
          itemBgCard.style.backgroundColor = 'rgb(255, 184, 25)';
          removeClassBgCard.forEach(addClass => {
            addClass.classList.add('btn-prioridade-media')
            card.addEventListener('mouseenter', () => {
              addClass.classList.add('btn-prioridade-media-hover')
            })
            card.addEventListener('mouseleave', () => {
              addClass.classList.remove('btn-prioridade-media-hover')
            })
          })
        } else if (radioChecked.id === 'prioridade-baixa') {
          prioridadeEditada = 'baixa'
          itemBgCard.style.backgroundColor = 'rgb(9, 155, 179)';
          removeClassBgCard.forEach(addClass => {
            addClass.classList.add('btn-prioridade-baixa')
            card.addEventListener('mouseenter', () => {
              addClass.classList.add('btn-prioridade-baixa-hover')
            })
            card.addEventListener('mouseleave', () => {
              addClass.classList.remove('btn-prioridade-baixa-hover')
            })
          })
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

    const novoTituloTarefa = tituloEditado.innerText;
    const novoHorarioAgendado = spanEditado.innerText;
    const novaDescricaoTarefa = descEditado.innerText;
    const novaPrioridadeTarefa = prioridadeEditada;

    arrLocalStorage[cardIndex] = [
      novoTituloTarefa,
      novoHorarioAgendado,
      novaDescricaoTarefa,
      novaPrioridadeTarefa
    ];

    localStorage.setItem('meusCards', JSON.stringify(arrLocalStorage));

  };
  
  btnEditFinalizar.addEventListener('click', btnEditFinalizarClickHandler);
}

function concluirTarefa(concluirCard) {
  const card = concluirCard.parentNode.parentNode;

  concluirCard.setAttribute('data-bs-toggle', 'modal');
  concluirCard.setAttribute('data-bs-target', '#staticBackdrop');
  const divModal = document.createElement('div')


  divModal.innerHTML = `
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Concluir tarefa</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <div class="modal-body">
          Deseja realmente concluir essa tarefa?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger btn-excluir-tarefa">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
  `

  // card.append(divModal)
  const gridCardElement = document.querySelector('.grid-card');
  gridCardElement.appendChild(divModal);

  const modalElement = document.querySelector('#staticBackdrop');
  const modal = new bootstrap.Modal(modalElement);

  const btnModalConcluirTarefa = divModal.querySelector('.btn.btn-danger.btn-excluir-tarefa');

  btnModalConcluirTarefa.addEventListener('click', () => {

    const divCards = document.querySelector('.cards');
    const cardContents = divCards.querySelectorAll('.card-content');
    if (!card.getAttribute('data-index')) {
      cardContents.forEach((cardContent, index) => {
        cardContent.setAttribute('data-index', index);
      });
    }

    const tituloCard = card.querySelector('h2')
    const horarioCard = card.querySelector('span')
    const descricaoCard = card.querySelector('p')
    const addIcon = document.createElement('i')
    addIcon.classList.add('bi', 'bi-check2-circle')
  
    card.append(addIcon)
  
    const btnEdit = card.querySelector('.btn-edit')
    const btnConcluir = card.querySelector('.btn-concluir')
    const btnExcluir = card.querySelector('.btn-excluir')
  
    btnEdit.style.display = 'none'
    btnConcluir.style.width = '45%'
    btnConcluir.style.backgroundColor = '#4ebc00'
    btnConcluir.innerText = 'Tarefa Concluída'
    btnConcluir.disabled = 'true'
    btnExcluir.style.width = '25%'
    
  
    tituloCard.style.textDecoration = 'line-through'
    horarioCard.style.textDecoration = 'line-through'
    descricaoCard.style.textDecoration = 'line-through'

    const cardIndex = card.getAttribute('data-index')

    arrLocalStorage[cardIndex].push(cardIndex)

    localStorage.setItem('meusCards', JSON.stringify(arrLocalStorage));

    modal.hide();
    divModal.remove(); // Remove o elemento do modal do DOM
  });

  modalElement.addEventListener('hidden.bs.modal', () => {
    divModal.remove(); // Remove o elemento do modal do DOM ao fechar o modal
  });
  modal.show();
}

function excluirTarefa(excluirCard) {
  const card = excluirCard.parentNode.parentNode;
  excluirCard.setAttribute('data-bs-toggle', 'modal');
  excluirCard.setAttribute('data-bs-target', '#staticBackdrop');

  const divCards = document.querySelector('.cards');
  const cardContents = divCards.querySelectorAll('.card-content');
  if (!card.getAttribute('data-index')) {
    cardContents.forEach((cardContent, index) => {
      cardContent.setAttribute('data-index', index);
    });
  }

  const cardIndex = card.getAttribute('data-index')

  const divModal = document.createElement('div')
  divModal.innerHTML = `
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Excluir Tarefa</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Deseja realmente excluir essa tarefa?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger btn-excluir-tarefa">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
  `

  // card.append(divModal)
  const gridCardElement = document.querySelector('.grid-card');
  gridCardElement.appendChild(divModal);

  const modalElement = document.querySelector('#staticBackdrop');
  const modal = new bootstrap.Modal(modalElement);

  const btnExcluirTarefa = divModal.querySelector('.btn.btn-danger.btn-excluir-tarefa');

  btnExcluirTarefa.addEventListener('click', () => {
    card.remove();
    modal.hide();
    divModal.remove(); // Remove o elemento do modal do DOM

    if (arrLocalStorage.length === 1) {
      arrLocalStorage.splice(cardIndex, 1);
      localStorage.clear()
      divWellcome.style.display = 'block'
      // localStorage.setItem('meusCards', JSON.stringify(arrLocalStorage));
    }else {
      arrLocalStorage.splice(cardIndex, 1);
      localStorage.setItem('meusCards', JSON.stringify(arrLocalStorage));
    }
  });

  modalElement.addEventListener('hidden.bs.modal', () => {
    divModal.remove(); // Remove o elemento do modal do DOM ao fechar o modal
  });

  modal.show();
}