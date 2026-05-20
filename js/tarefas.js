// Este módulo é responsável por validar as tarefas antes de adiciona-las

// Função para validar o texto da terefa, tem que ter ao menos 3 caracteres

// Array para armazenar as tarefas
let tarefas = [];

// Função para adicionar uma nova tarefa
export function adicionarTarefa(texto) {
  const tarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false,
  };

  tarefas.push(tarefa);
  return tarefa;
}

// Marca ou desmarca uma tarefa como concluída
export function concluirTarefa(id) {
  tarefas = tarefas.map((tarefa) => {
    if (tarefa.id === id) {
      return { ...tarefa, concluida: !tarefa.concluida };
    }
    return tarefa;
  });
}

// Remove uma tarefa da lista
export function removerTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
}

// Função para validar o texto da tarefa
export function validarTarefa(texto) {
  if (texto.trim() === "") {
    return {
      valida: false,
      mensagem: "A tarefa não pode estar vazia.",
    };
  }

  if (texto.length < 3) {
    return {
      valida: false,
      mensagem: "A tarefa deve ter ao menos 3 caracteres.",
    };
  }

  return { valida: true };
}

// Função para obter todas as tarefas
export function obterTarefas() {
  return tarefas;
}
