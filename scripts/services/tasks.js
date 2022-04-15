const userName = document.querySelector("#userName");
let tokenJwt = window.localStorage.getItem("jwt");

onload = () => {
  //Adicionado o token do usuário na Local Storage
  console.log(tokenJwt);

  //Trazendo o usuario logado;
  let endPointUsuario = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";

  let configuracaoRequisicaoUser = {
    method: "GET",

    headers: {
      "content-type": "application/json",
      Authorization: `${tokenJwt}`,
    },
  };

  fetch(endPointUsuario, configuracaoRequisicaoUser)
    .then((resultado) => {
      return resultado.json();
    })
    .then((resultado) => {
      userName.innerText = `${resultado.firstName} ${resultado.lastName}`;
    })
    .catch((erro) => {
      //console.log("erro"+erro);
    });

  //Adicionando Tarefas Dinamicas
  let formulario = document.querySelector("form");
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    let novaTarefaInput = document.querySelector("input[name='novaTarefa']");
    let novaTarefa = novaTarefaInput.value;

    let usuarioTarefa = {
      description: novaTarefa,
      completed: false,
    };

    let tarefaUsuarioJson = JSON.stringify(usuarioTarefa);

    let endPointCadastroTarefas = "https://ctd-todo-api.herokuapp.com/v1/tasks";

    fetch(endPointCadastroTarefas, {
      method: "POST",
      body: tarefaUsuarioJson,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${tokenJwt}`,
      },
    })
      .then((resultado) => {
        if (resultado.status !== 201) throw Error("Erro ao cadastrar tarefa");
        return resultado.json();
      })
      .then((resultado) => {
        location.reload();
      })
      .catch((erro) => {
        console.log("erro " + erro);
      });
  });

  //Listando as tarefas do usuário logado
  let endPointTarefas = "https://ctd-todo-api.herokuapp.com/v1/tasks";

  let configuracaoRequisicao = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `${tokenJwt}`,
    },
  };

  fetch(endPointTarefas, configuracaoRequisicao)
    .then((resultado) => {
      return resultado.json();
    })
    .then((resultado) => {
      manipulandoTarefasUsuario(resultado);
    })
    .catch((erro) => {
      //console.log("erro"+erro);
    });
};

function manipulandoTarefasUsuario(listaDeTarefas) {
  for (let tarefa of listaDeTarefas) {
    if (tarefa.completed) {
      //Tarefas Terminadas
      renderizaTarefasConcluidas(tarefa);
    } else {
      //Tarefas pendentes
      renderizaTarefasPendentes(tarefa);
    }
  }

  // console.log(listaDeTarefas);
}

let tarefasPendentesUl = document.querySelector(".tarefas-pendentes");
function renderizaTarefasPendentes(tarefa) {
  let liTarefasPendente = document.createElement("li");
  liTarefasPendente.classList.add("tarefa");

  let cardTarefasPendente = `
      <div onclick="changeList(${tarefa.id},${true})" class="not-done" id="${
    tarefa.id
  }"></div>
      <div class="descricao">
          <p class="nome">${tarefa.description}</p>
          <p class="timestamp"><i class="far fa-calendar-alt"></i> ${
            tarefa.createdAt
          }</p>
      </div>
  `;
  liTarefasPendente.id = tarefa.id;
  liTarefasPendente.innerHTML = cardTarefasPendente;
  tarefasPendentesUl.appendChild(liTarefasPendente);
}

let tarefasTerminadasUl = document.querySelector(".tarefas-terminadas");
function renderizaTarefasConcluidas(tarefa) {
  let liTarefasPendente = document.createElement("li");
  liTarefasPendente.classList.add("tarefa");

  let cardTarefasPendente = `
      <div class="done"></div>
      <div class="descricao">
      <p class="nome">${tarefa.description}</p>
      <div>
          <button onclick="changeList(${tarefa.id})"><i id="${tarefa.id}" class="fas fa-undo-alt change"></i></button>
          <button onclick="deleteTask(${tarefa.id})"><i id="${tarefa.id}" class="far fa-trash-alt"></i></button>
      </div>
      </div>
  `;
  liTarefasPendente.innerHTML = cardTarefasPendente;
  tarefasTerminadasUl.appendChild(liTarefasPendente);
}

function changeList(id, flag) {
  console.log(id);

  let usuarioTarefa = {
    completed: flag ?? false,
  };

  let tarefaUsuarioJson = JSON.stringify(usuarioTarefa);

  console.log(tarefaUsuarioJson);

  let endPointCadastroTarefas = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;

  fetch(endPointCadastroTarefas, {
    method: "PUT",
    body: tarefaUsuarioJson,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenJwt}`,
    },
  })
    .then((resultado) => {
      return resultado.json();
    })
    .then((resultado) => {
      location.reload();
    })
    .catch((erro) => {
      console.log("erro " + erro);
    });
}

function deleteTask(id) {
  let endPointCadastroTarefas = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;

  fetch(endPointCadastroTarefas, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenJwt}`,
    },
  })
    .then((resultado) => {
      return resultado.json();
    })
    .then((resultado) => {
      location.reload();
    })
    .catch((erro) => {
      console.log("erro " + erro);
    });
}
