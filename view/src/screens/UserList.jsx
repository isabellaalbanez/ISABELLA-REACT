import React, { useEffect, useState } from "react";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import "./UserList.css";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const pegaUsuarios = async () => {
    try {
      const resposta = await axios.get("http://localhost:30000/usuarios");
      setUsers(resposta.data);
    } catch (erros) {
      console.log(erros);
    }
  };

  const criaUsuario = async (novoUsuario) => {
    try {
      await axios.post("http://localhost:30000/usuarios", novoUsuario);
      pegaUsuarios();
    } catch (erros) {
      console.log(erros);
    }
  };

  const deletarUsuario = async (userId) => {
    const respostaConfirm = window.confirm(
      "Você quer realmente deletar esse usuario?"
    );

    if (respostaConfirm) {
      try {
        await axios.delete(`http://localhost:30000/usuarios/${userId}`);
        pegaUsuarios();
      } catch (erros) {
        console.log(erros);
      }
    }
  };

  const auxiliarEdicao = (user) => {
    setEditUser(user);
    setEditModalShow(true);
  };

  const atualizaUsuario = async (atualizaUsuario) => {
    try {
      await axios.put(
        `http://localhost:30000/usuarios/${atualizaUsuario.id}`,
        atualizaUsuario
      );
    } catch (erros) {
      console.log(erros);
    }
  };
  useEffect(() => {
    pegaUsuarios();
  }, []);
  return (
    <div>
      <div className="butonLeft">
      <h1>Lista de Usuarios</h1>
      <button
        className="btn btn-primary mb-2 "
        onClick={() => setAddModalShow(true)}
      >
        Adicionar Usuario
      </button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td className="emaiRes">{user.email}</td>
              <td className="tdButoResposive">
                <button className="btn btn-primary btR" onClick={() => auxiliarEdicao(user)}>
                  <i className="material-icons ">edit</i>
                </button>
                <button className="btn btn-primary btR" onClick={() => deletarUsuario(user.id)}>
                  <i className="material-icons ">delete</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {addModalShow && (
        <AddUser
          handleClose={() => setAddModalShow(false)}
          addUser={criaUsuario}
          pegarUsuarios={pegaUsuarios}
        />
      )}
      {editModalShow && (
        <EditUser
          handleClose={() => setEditModalShow(false)}
          user={editUser}
          atualizaUsuario={atualizaUsuario}
          pegaUsuarios={pegaUsuarios}
        />
      )}
    </div>
  );
}