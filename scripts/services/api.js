const authenticate = async (email, pass) => {
  const result = {
    email: email,
    password: pass,
  };
  await fetch("http://www.techrizzo.com/auth/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      document.cookie = `token=Bearer ${res.token}; path=/`;
      window.location.href = "/tarefas.html";
    })
    .catch((err) => console.log(err));
};
