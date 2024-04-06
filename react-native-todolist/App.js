import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context'
import {s} from './App.style'
import { CardToDo } from "./components/CardTodo/CardToDo"
import { Header } from './components/Header/header'
import { TabButtom } from './components/TabButtomMenu/TabBottomMenu'
import { ButtonAdd } from './components/ButtonAdd/Button'
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';

let isitFirstTime = true;
let isLoadUpdated = false ; 

export default function App() {
const [toDoList , setToDoList] = useState(
  [

  ]


)





const [selectedTabName,setSelectedTabName] = useState("all");

const [isAddDialogDisplay,setShowAddDialog] = useState(false);

const [inputValue,setInputValue] = useState("")

useEffect(()=>{
  loadToDoList();
},[]);

useEffect (()=>{
  if(!isLoadUpdated){
    if(!isitFirstTime) {
      saveToDoList();
  }else{
  
    isitFirstTime = false;
  }
  }else{
      isLoadUpdated = false;
  }
},[toDoList]);

function getFilterList(){
  switch(selectedTabName){
    case "all":
      return toDoList;
    case "inProgress":
      return toDoList.filter((toDo)=>!toDo.isComleted);
    case "done": 
      return toDoList.filter((toDo)=>toDo.isComleted===true);
    default:
      return []; 
  }
}

async function loadToDoList(){
  console.log("load")

  try{

    const toDoListString  = await AsyncStorage.getItem("@todoList");
    const parsedToDoList = JSON.parse(toDoListString);
    isLoadUpdated = true;
    setToDoList(parsedToDoList || []);


  }catch(err){
    alert(err);
  }

}

async function saveToDoList(){

  console.log("save")
  try{

    await AsyncStorage.setItem("@todoList",JSON.stringify( toDoList));

  }catch(err){
    alert(err);
  }


}

function deleteTodo(todoToDelete){
  Alert.alert("Delete toDo","Are you sure you want to delete this?",
  [{text:"Delete",style:"destructive",onPress:()=>{
    setToDoList (toDoList.filter(t => t.id !== todoToDelete.id));

    
  },
},
{text:"Cancel", style:"cancel"},
]);
}

function renderToDoList(){
  return getFilterList().map((todo)=> (
  <View key={todo.id} style = {s.cardItem}> 
    <CardToDo onLongPress={deleteTodo} onPress = {updateTodo} todo={todo}/>
    </View>));
}


function updateTodo(todo){

  const updateTodo = {
    ...todo,
    isComleted: !todo.isComleted
  }
  const updatedTodoList = [...toDoList]
  const indexToUpdate =  updatedTodoList.findIndex((t) => t.id === updateTodo.id);
  updatedTodoList[indexToUpdate] = updateTodo;
  setToDoList(updatedTodoList);
  console.log(updateTodo);

}

function addToDo(){
  const newToDo = {
    id:uuid.v4(),
    title:inputValue,
    isComleted:false,

  };

  setToDoList([...toDoList,newToDo])
  setInputValue("");
  setShowAddDialog(false);

}

function renderAddDialog(){
  return (
  <Dialog.Container visible={isAddDialogDisplay} onBackdropPress={()=> setShowAddDialog(false)}>
  <Dialog.Title>
    Add new todo
  </Dialog.Title>
  <Dialog.Description>
    choose a name for your todo

  </Dialog.Description>
  <Dialog.Input onChangeText={(text)=>setInputValue(text)} placeholder="EX: Send Money To Hamed Tara"></Dialog.Input>
  <Dialog.Button label="Cancel" color="grey" onPress={()=> setShowAddDialog(false)}></Dialog.Button>
  <Dialog.Button disabled = {inputValue.length ===0} label = "Save" onPress={addToDo}></Dialog.Button>
</Dialog.Container>
  );
}

function showAddTodoDialog(){
    setShowAddDialog(true);
}

  return(

    <SafeAreaProvider>

      <SafeAreaView style = {s.app}>
        <View>
          <Text style = {s.header} >
            <Header/>
          </Text>
        </View>
        <View style = {s.body}>
          <ScrollView>
          {renderToDoList()}
          </ScrollView>
        </View>
        <ButtonAdd onPress = {showAddTodoDialog}></ButtonAdd>
        <View style = {s.footer}>
          <TabButtom 
          toDoList = {toDoList}
          onPress={setSelectedTabName}
           selectedTabName = {selectedTabName}>

           </TabButtom>
        </View>
       
      </SafeAreaView>
      {renderAddDialog()}
    </SafeAreaProvider>


  
  
);

}

