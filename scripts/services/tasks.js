onload = () => {
    
    let tokenJwt = window.localStorage.getItem('jwt');
    console.log(tokenJwt);
   
        //Trazendo o usuario logado;
        let endPointUsuario = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";
        
        let configuracaoRequisicaoUser = {
            method: 'GET',
           
            headers: {
                'content-type': 'application/json',
                'Authorization': `${tokenJwt}`
            }
        };
        
        fetch (endPointUsuario, configuracaoRequisicaoUser)
        .then(resultado=> {
           
            return resultado.json();
        })
        .then(
            resultado=>{
                console.log(resultado);
            }
        )
        .catch(
            erro => {
                //console.log("erro"+erro);
            }
        );

        //adicionando uma tarefa(por enquanto estatica)
        const usuarioTarefa = {
            "description": "Aprender Javascript6",
            "completed": false
        }

        let tarefaUsuarioJson = JSON.stringify(usuarioTarefa);
       
        let endPointCadastroTarefas = "https://ctd-todo-api.herokuapp.com/v1/tasks";
        
        let configuracaoRequisicaoCadastroTarefas = {
            method: 'POST',
            body: tarefaUsuarioJson,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenJwt}`
            }
        };
        
        fetch (endPointCadastroTarefas, configuracaoRequisicaoCadastroTarefas)
        .then(resultado=> {
           
            return resultado.json();
        })
        .then(
            resultado=>{
                //console.log(resultado);
            }
        )
        .catch(
            erro => {
                //console.log("erro"+erro);
            }
        );

       //Listando as tarefas do usuário logado
        let endPointTarefas = "https://ctd-todo-api.herokuapp.com/v1/tasks";
        
        let configuracaoRequisicao = {
            method: 'GET',
           
            headers: {
                'content-type': 'application/json',
                'Authorization': `${tokenJwt}`
            }
        };
        
        fetch (endPointTarefas, configuracaoRequisicao)
        .then(resultado=> {
            
            return resultado.json();
        })
        .then(
            resultado=>{
                console.log(resultado);
            }
        )
        .catch(
            erro => {
                //console.log("erro"+erro);
            }
        );
}