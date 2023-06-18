import React, { useEffect, useState, usestate} from 'react';
import {View, Text, StyleSheet,FlatList, TouchableOpacity, Modal, TextInput, alert } from 'react-native';
import axios from 'axios';
import {Feather} from '@expo/vector-icons';

export default function App() {
const url= 'http://192.168.15.199:30000/usuarios';
const [usuarios, setUsuarios] = useState([]);
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [modalVisible, setModalVisible] = useState(false);
const[updateModalVisible, setUpdateModalVisible] = useState(false);
const [selectUser,setSelectUser]=useState(null);


const pegarUsuarios = ()=> {
  axios.get(url)
  .then(resposta => {
    setUsuarios(resposta.data);
  })
  .catch(erro => {
    console.log(erro)
  })
}
const limparCampos = () => {
  setNome('');
  setEmail('');
  setSenha('');
}
const axiliadoDeDelecao = (id) => {
  Alert.alert(
    'confirme',
    'tem certeza que deseja excluir o usuário?',
    [
      {
        text: 'Sim',
        onPress: () => deletarUsuario(id)
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]
  )
}
const deletarUsuario = (id) => {
  axios.delete(`${url}/${id}`)
  .then(() => {
    const usuariosAtualizados = usuarios.filter((usuario) => usuario.id !==id);
  })
  .catch((erros) =>{
   console.log(erros);
  })
}
const criarNovoUsuario = () => {
  axios.post(url,{
    name: nome,
    email: email,
    password: senha
  })
   .then(resposta =>{
    console.log(resposta.data);
    pegarUsuarios();
    setModalVisible(false);
    limparCampos();
   })
   .catch(erro => {
    console.log(erro);
   });
}
const atualizarUsuario = (usuario) => {
  const data = {
    name: nome || usuario.nome,
    email: email || usuario.email,
    password: senha || usuario.password
  }

  axios.put(`${url}/${usuario.id}`,data)
  .then((resposta) => {
    console.log(resposta.data);
    setUsuarios(
      usuarios.map((item)=>{
        if(item.id === usuario.id){
         return {
          ...item,
          name:data.nome,
          email:data.email
         } 
        }
        return item,
      })
    )
    setUpdateModalVisible(false);
    setNome('');
    setEmail('');
  })
  .catch((erros)=>{
    console.log(erros);
  })
}

const atualizarUsuario =(usuario) =>{
const data = {
  name: nome || usuario.nome,
  email: email || usuario.email,
  password: senha || usuario.password
}

axios.put(`$(url)/${usuario.id}`,data)
.then((resposta)=>{
  console.log(resposta.data);
  setUsuarios(
    usuarios.map((item)=>{
      if(item.id === usuario.id){
        return{
          ...item,
          name:data.name,
          email:data.email
        }
      }
      return item;
    })
  )
  setUpdateModalVisible(false);
  setNome('');
  setEmail('');
})
.catch((erros)=>{
  console.log(erros);
})
}

useEffect(() => {
  pegarUsuarios();
},[]);

const renderItem = ({ item }) => (
  <View style = {styles.itemContainer}>
  <Text style = {styles.itemName}>{item.name}</Text>
  <Text style = {styles.itemEmail}>{item.email}</Text>

<TouchableOpacity>
  onPress={() => {
    setUpdateModalVisible(true);
    setSelectUser(item);
    setNome(item.name);
    setEmail(item.email);
  }}
  
  <Feather name='edit' size={24} color={"#888"}/>
</TouchableOpacity>


<TouchableOpacity 
onPress={()=>{
  setUpdateModalVisible(true);
  setSelectUser(item);
  setNome(item.name);
  setEmail(item.email);
}}
>
  <Feather name='edit' size={24} color={"#888"}/>
  </TouchableOpacity>

  <TouchableOpacity onPress={()=> auxiliadorDeDelecao(item.id)}>
    <Feather name='edit' size={24} color={"#888"}/>
</TouchableOpacity>
</View>
)

return(
  <View style={styles.container}>
    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}> Adicionar usuario </Text>
        <TextInput 
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={text => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          />
          <TextInput
           style={styles.input}
           placeholder="Senha"
           value={senha}
           onChangeText={text => setSenha(text)} 
           />

          <TouchableOpacity style={styles.button} onPress={criarNovoUsuario}>
            <Text style={styles.buttonText}>
              Adicionar</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={()=> {
            setModalVisible(false);
            limparCampos();
           }}>
            <Text style={styles.buttonText}>cancelar
            </Text>
           </TouchableOpacity>
           </View>
           </Modal>

           <Modal 
           visible={updateModalVisible}
           animationType='slide'
           transparent={true}
           onRequestClose={() =>setUpdateModalVisible(false)}
          >
          <View style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <text style={styles.modalTitle}>Atualizar Usuario </text>

              <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={text=> setEmail(text)}
              />

             <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text=> setEmail(text)}
              />
                <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={text=> setSenha(text)}
              />


              <TouchableOpacity
              style={styles.button}
              onPress={() =>{
                atualizarUsuario(selectUser)
              }}
              >
                <Text style={styles.buttonText}>Atualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={() =>{
                  setUpdateModalVisible(false)
                  limparCampos()
                }}>
                  Cancelar
                </Text>
                </TouchableOpacity>
                </View>
                </View>
                </Modal>

                <Modal>
                 visible={updateModalVisible}
                 animationType='slide'
                 transparent={true}
                 onRequestClose={()=> setUpdateModalVisible(false)}
                 
                 <View style={styles.modalContainer}>
                 </View>
                 <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}> Atualizar Usuario</Text>

              <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={text=> setEmail(text)}
              />
                <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text=> setEmail(text)}
              />
            <TouchableOpacity style={styles.buton}
                onPress={()=>{
                  atualizarUsuario(selectUser)
                }}>
                  <Text style={styles.buttonText}>
                    Atualizar
                  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text> style={styles.buttonText} onPress={()=>{
                      setUpdateModalVisible(false)
                      limparCampos()
                    }}
                      Cancelar
                    </Text>

                  </TouchableOpacity>

                 </View>


                </Modal>

                <View style={styles.header}>
                <Text style={styles.headerText}>
                  Usuários</Text>
                  <TouchableOpacity style={styles.addButton} onPress={() =>
                  setModalVisible(true)}>
                    <Feather name="plus" size={24} color="white"/>
                  </TouchableOpacity>
                  </View>

                  <FlatList 
                  data={usuarios}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                  />
                  </View>
                
                );
                  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
  marginTop: 40,
  paddingHorizontal: 20,
  },
  header: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBotton: 20,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginBottom: 10,
  },
  itemName: {
  fontSize: 18,
  fontWeight: 'bold',
  },
  ItemEmail: {
    fontSize: 16,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttontext: {
  backgroundColor: 'blue',
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },


  });
