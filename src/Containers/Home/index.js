import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container, H1, Image, ContainerItems, InputLabel, Input, Button} from './styles'
import UsersA from '../../assets users/Users.svg'
import { useState, useRef} from 'react';
function App() {

   const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputEmail = useRef(); 
  const inputPassword = useRef(); 
  const history = useHistory();

  async function addNewUser() {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    if (!isValidEmail(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    if (password.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
    try {
      const { data: newUser } = await axios.post(
        "https://api-register-node-users.vercel.app/users",
        {
          name: inputName.current.value,
          email: email,
          password: password,
        }
      );

      setUsers([...users, newUser]);
      history.push("/usuarios");
    } catch (error) {
      console.error("Erro ao adicionar novo usuário:", error);
    }
  }

  function isValidEmail(email) {
    return email.includes("@");
  }





  return (
    <Container>
      <Image alt="logo-imagem" src={UsersA} />
      <ContainerItems>
        <H1>  Cadastro de Usuários</H1>

        <InputLabel>Nome:</InputLabel>
        <Input ref={inputName} placeholder="Digite seu nome" />

        <InputLabel>E-mail</InputLabel>
        <Input ref={inputEmail} placeholder="Digite seu e-mail" />

        <InputLabel>Senha</InputLabel>
        <Input  ref={inputPassword} placeholder="Digite sua senha" />

      <Button  onClick={addNewUser}>Novo Cadastro</Button>


      </ContainerItems>
    </Container>
  );

}

export default App