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

const loginScreen = document.querySelector("#login-screen");
const taskScreen = document.querySelector("#task-screen");
const loginForm = document.querySelector("#form-login");
const loginInput = document.querySelector("#input-login");
const senhaInput = document.querySelector("#input-senha");
const mensagemLogin = document.querySelector("#mensagem-login");
const logoutBtn = document.querySelector("#logout-btn");
const form = document.querySelector("#form-tarefa");

function exibirMensagemLogin(mensagem) {
  mensagemLogin.textContent = mensagem;
}

function mostrarTelaLogin() {
  loginScreen.classList.remove("hidden");
  taskScreen.classList.add("hidden");
  loginInput.value = "";
  senhaInput.value = "";
  exibirMensagemLogin("");
}

function mostrarTelaTarefas(usuario) {
  loginScreen.classList.add("hidden");
  taskScreen.classList.remove("hidden");
  document.querySelector("#welcome-usuario").textContent = `Olá, ${usuario}!`;
  iniciarAplicacao();
  renderizarTarefas(obterTarefas());
}

// Função para inicar a aplicação, buscando uma dica e exibindo-a
async function iniciarAplicacao() {
  const dica = await buscarDica();
  exibirDica(dica);
}

// Evento de submit para o formulário de login
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usuario = loginInput.value.trim();
  const senha = senhaInput.value.trim();

  if (!usuario || !senha) {
    exibirMensagemLogin("Preencha nome e senha para continuar.");
    return;
  }

  sessionStorage.setItem("taskdev-user", usuario);
  mostrarTelaTarefas(usuario);
});

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

logoutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("taskdev-user");
  mostrarTelaLogin();
});

const usuarioSalvo = sessionStorage.getItem("taskdev-user");
if (usuarioSalvo) {
  mostrarTelaTarefas(usuarioSalvo);
} else {
  mostrarTelaLogin();
}
