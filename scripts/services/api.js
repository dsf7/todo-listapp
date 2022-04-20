const tokenJwt = localStorage.getItem("jwt");
const authenticate = async (email, password) => {
  const usuario = {
    email: "",
    password: "",
  };
  usuario.email = email;
  usuario.password = password;
  console.log(usuario);
  let endpoint = "https://ctd-todo-api.herokuapp.com/v1/users/login";
  let requisition = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  };

  await fetch(endpoint, requisition)
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      } else {
        throw "Algo deu errado. \n Verifique o e-mail e senha e tente novamente.";
      }
    })
    .then((res) => {
      spinnerOn();
      setTimeout(() => {
        console.log(res);
        window.localStorage.setItem("jwt", res.jwt);
        spinnerOff();
        window.location.href = "tarefas.html";
      }, 1000);
    })
    .catch((err) => {
      sendApiResponse(err, passVerify);
      console.log(err);
    });
};

const addUser = async (firstName, lastName, email, password) => {
  let endpoint = "https://ctd-todo-api.herokuapp.com/v1/users";
  let newUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.password = password;
  let requisition = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  };
  await fetch(endpoint, requisition)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return res.json();
      } else {
        throw "Algo deu errado, tente novamente.";
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("jwt", res.jwt);
      location.href = "tasks.html";
    })
    .catch((err) => {
      sendApiResponse(err);
    });
};

const findUser = async () => {
  let endpoint = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";
  let requisition = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `${tokenJwt}`,
    },
  };
  let user;
  await fetch(endpoint, requisition)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw "Usuário não encontrado.";
      }
    })
    .then((res) => {
      user = res;
    })
    .catch((err) => {});
  return user;
};

const createTask = async (description, status) => {
  const endpoint = "https://ctd-todo-api.herokuapp.com/v1/tasks";
  const task = {
    description: "",
    completed: "",
  };
  task.description = description;
  task.completed = status;
  console.log(task);
  const requisition = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${tokenJwt}`,
    },
    body: JSON.stringify(task),
  };

  await fetch(endpoint, requisition)
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        return res.json();
      } else {
        throw "Algo deu errado ao criar a tarefa, tente novamente.";
      }
    })
    .then((res) => {
      location.reload();
    })
    .catch((err) => {
      alert(err);
    });
};

const getTasks = async (loadingElement) => {
  let taskArray = [];
  const endpoint = "https://ctd-todo-api.herokuapp.com/v1/tasks";
  const requisition = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `${tokenJwt}`,
    },
  };
  await fetch(endpoint, requisition)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw "Algo deu errado, tente novamente.";
      }
    })
    .then((res) => {
      setTimeout( () => {
        loadingElement.removeAttribute("id");
      }, 1500)
      taskArray = res;
      
    })
    .catch((err) => {});
  return taskArray;
};

const updateTasks = async (id, flag, name) => {
  let userTask = {
    description: name,
    completed: flag ?? false,
  };
  const endpoint = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;
  const requisition = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `${tokenJwt}`,
    },
    body: JSON.stringify(userTask),
  };
  await fetch(endpoint, requisition)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      location.reload();
    })
    .catch((err) => {});
};

const deleteTask = async (id) => {
  const endpoint = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;
  const requisition = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: tokenJwt,
    },
  };

  await fetch(endpoint, requisition)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw "Erro ao eliminar a tarefa.";
      }
    })
    .then((res) => {
      location.reload();
    })
    .catch();
};
