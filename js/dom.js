// dom.js
export function obterTextoTarefa() {
  const input = document.querySelector("#input-tarefa");
  return input.value;
}

// Função para limpar o campo do input após adicionar uma tarefa
export function limparInput() {
  const input = document.querySelector("#input-tarefa");
  input.value = "";
  input.focus();
}

// Função para renderizar a lista de tarefas no DOM
export function renderizarTarefas(tarefas) {
  const lista = document.querySelector("#lista-tarefas");
  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.dataset.id = tarefa.id;

    const texto = document.createElement("span");
    texto.className = "tarefa-texto";
    texto.textContent = tarefa.texto;

    if (tarefa.concluida) {
      texto.style.textDecoration = "line-through";
      texto.style.opacity = "0.6";
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes-tarefa";

    const botaoConcluir = document.createElement("button");
    botaoConcluir.type = "button";
    botaoConcluir.dataset.action = "concluir";
    botaoConcluir.className = `btn-concluir ${tarefa.concluida ? "concluida" : ""}`;
    botaoConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir";

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.dataset.action = "excluir";
    botaoExcluir.className = "btn-excluir";
    botaoExcluir.textContent = "Excluir";

    acoes.append(botaoConcluir, botaoExcluir);
    li.append(texto, acoes);
    lista.appendChild(li);
  });
}

// Função para limpar a mensagem exibida no DOM
export function limparMensagem() {
  const areaMensagem = document.querySelector("#mensagem");

  if (areaMensagem) {
    areaMensagem.textContent = "";
    areaMensagem.style.color = "";

    if (areaMensagem.removeTimeout) {
      clearTimeout(areaMensagem.removeTimeout);
      areaMensagem.removeTimeout = null;
    }
  }
}

// Função para exibir mensagens de validação ou sucesso para o usuário
export function exibirMensagem(mensagem, tipo) {
  let areaMensagem = document.querySelector("#mensagem");

  if (!areaMensagem) {
    areaMensagem = document.createElement("p");
    areaMensagem.id = "mensagem";
    document.body.insertBefore(
      areaMensagem,
      document.querySelector("#lista-tarefas"),
    );
  }

  if (areaMensagem.removeTimeout) {
    clearTimeout(areaMensagem.removeTimeout);
    areaMensagem.removeTimeout = null;
  }

  areaMensagem.textContent = mensagem;

  if (tipo === "erro") {
    areaMensagem.style.color = "red";
  } else {
    areaMensagem.style.color = "green";

    if (mensagem) {
      areaMensagem.removeTimeout = setTimeout(() => {
        limparMensagem();
      }, 3000);
    }
  }
}

// Função exibir dados a API

export function exibirDica(dica) {
  let areaDica = document.querySelector("#dica");

  if (!areaDica) {
    areaDica = document.createElement("p");
    areaDica.id = "dica";
    document.body.appendChild(areaDica);
  }

  if (dica) {
    areaDica.textContent = `💡 Dica do dia: ${dica}`;
  } else {
    areaDica.textContent = `⚠️ Não foi possível obter carregar a dica.`;
  }
}
