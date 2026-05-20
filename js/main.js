// Importando funções do módulo DOM
import {
  obterTextoTarefa,
  limparInput,
  renderizarTarefas,
  exibirMensagem,
  exibirDica,
} from "./dom.js";

// Importando funções do módulo Tarefas
import {
  validarTarefa,
  adicionarTarefa,
  obterTarefas,
  concluirTarefa,
  removerTarefa,
} from "./tarefas.js";

// Importando função para buscar dica
import { buscarDica } from "./api.js";

// Selicionar o formulário para adicionar um evento de submit
const form = document.querySelector("#form-tarefa");

// Função para inicar a aplicação, buscando uma dica e exibindo-a
async function iniciarAplicacao() {
  const dica = await buscarDica();
  exibirDica(dica);
}

// Evento de submit para adicionar um nova tarefa
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = obterTextoTarefa();
  const resultado = validarTarefa(texto);

  if (!resultado.valida) {
    exibirMensagem(resultado.mensagem, "erro");
    return;
  }

  adicionarTarefa(texto);
  renderizarTarefas(obterTarefas());
  exibirMensagem("Tarefa adicionada com sucesso!", "sucesso");
  limparInput();
});

// Evento de clique para concluir ou excluir tarefas
const listaTarefas = document.querySelector("#lista-tarefas");

listaTarefas.addEventListener("click", function (event) {
  const botao = event.target.closest("button");
  if (!botao) return;

  const acao = botao.dataset.action;
  const item = botao.closest("li");
  if (!item) return;

  const id = Number(item.dataset.id);

  if (acao === "concluir") {
    concluirTarefa(id);
    renderizarTarefas(obterTarefas());
    exibirMensagem("Tarefa atualizada.", "sucesso");
    return;
  }

  if (acao === "excluir") {
    removerTarefa(id);
    renderizarTarefas(obterTarefas());
    exibirMensagem("Tarefa excluída.", "sucesso");
  }
});

// Iniciar a aplicação ao carregar a página
iniciarAplicacao();
