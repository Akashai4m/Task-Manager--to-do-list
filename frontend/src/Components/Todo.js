//Import Dependencies required For Navbar

import { Button, Card, Grid, Typography ,Box } from "@mui/material";
import  React ,{useState ,useEffect}  from "react";
import  axios  from "axios";
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {  Modal, TextField } from '@mui/material';


//Style Object for css
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:8
  };

export default function Todo() {
    const [arr, setArr] = useState(["gsgdb"]);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [deleteIndex, setDeleteIndex] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');
       

  //for opening Modal
    const handleOpen = () => {
        setOpen(true);
    };
         
    //for Closing Modal
    const handleClose = () => {
        setOpen(false);
        setModalVisible(false);
    };
        
   
          //Action On Clicking Done Button In modal
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token  = localStorage.getItem('token') ;
        try {
         const response =  await axios.post(
            'http://localhost:5000/add-task',
            { inputValue },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response.data['arr'])
          setArr(response.data['arr']) ;
          
        } catch (error) {
          console.error('Error adding task:', error);
        }
        setInputValue('');
            setOpen(false);
      };
    


            //Action For Deleting Task ON Clicking Delete Button Of Task

    const handleDeleteTask = async (taskId) => {
        try {
          // Send delete request to backend
          await axios.delete(`http://localhost:5000/todo-list/${taskId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          // Remove deleted task from todoList state
          setArr(arr.filter(task => task._id !== taskId));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
       fetchTodoList();
      };



   
        // Function to fetch todo list data from backend
        const fetchTodoList = async () => {
          try {
            // Make a GET request to fetch todo list data
            const response = await axios.get('http://localhost:5000/todo-list', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Send authorization token
              },
            });
    
            // Set the fetched todo list data in state
            setArr(response.data.todoList);
          } catch (error) {
            console.error('Error fetching todo list:', error);
            // Handle error
          }
        };
    
        // Call the fetchTodoList function when component mounts
        
        useEffect(()=>{
            fetchTodoList();
        } ,[]) ;

       
         //Action On Clicking Edit task button of Task
        const handleEditTask = (index) => {
            setEditTaskIndex(index);
            setEditedTask(arr[index]);
            setModalVisible(true);
          };
             
          //Action on Saving Edited Task on Clicking Done in Modal
          const handleSaveTask = async () => {
            try {
              // Make PUT request to update task
              console.log(editTaskIndex)
              await axios.put(`/todo-list-edit/${editTaskIndex}`, { updatedTask: editedTask });
              console.log("working")
              // Update todoList in state or re-fetch todoList from the server
               fetchTodoList();
        
              // Close modal
             
              setEditTaskIndex(null);
              setEditedTask('');
            } catch (error) {
              console.error('Error updating task:', error);
            }

            setModalVisible(false);
          };
        

     

    return (
        <>
            <div style={{display:"flex" ,justifyContent:"center"}}><h1>Tasks Manager</h1></div>
            <br />
            <div style={{ display: "flex", justifyContent: 'space-evenly' }}>
                <Button sx={{padding:'20px' ,borderRadius:'12px'  ,backgroundColor:"#00CED1" }}  size="large" variant="contained" onClick={handleOpen}>Add &nbsp; Task</Button>
                <Button  sx={{padding:'20px' ,borderRadius:'12px' ,backgroundColor:"#66cd00" }} variant="contained" >Completed</Button>
            </div>
            <br/>
            <div style={{ display: 'flex', justifyContent: "center", flexWrap: 'wrap' }}>
                {arr.map((todo, index) => (
                    <Card
                        key={index}
                        sx={{
                            margin: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            border: '1px solid black',
                            maxWidth: '800px', 
                            width: '100%', 
                            borderRadius:'20px',
                            boxShadow: 3  ,
                        }}
                    >
                      <Grid style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>  <Checkbox color="success" />
                        <Typography variant="h6" style={{ margin: '10px 0' }}>{todo}</Typography>
                        </Grid> 
                        <Grid style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <Button sx={{margin:'10px'}} variant="outlined" color="error" onClick={() => handleDeleteTask(index)} startIcon={<DeleteIcon />}>Delete</Button>
                            <Button sx={{margin:'10px'}} variant="outlined" color="secondary"  onClick={() => handleEditTask(index)} startIcon={<EditIcon />}>Edit</Button>
                        </Grid>
                    </Card>
                ))}
            </div>

            <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: 'white', borderRadius: '8px' }}>
        <h2 id="modal-modal-title">Add New Task</h2>
                    <TextField
                        label="Task"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        variant="outlined"
                        style={{ marginBottom: '10px' }}
                    />
                    <Button sx={{ width:'50%' ,padding:1 ,margin:2 ,borderRadius:2}}  variant="contained" onClick={handleSubmit}>Done</Button>
                </div>
        </Box>
      </Modal>

      <Modal
        keepMounted
        open={modalVisible}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: 'white', borderRadius: '8px' }}>
        <h2 id="modal-modal-title">Edit Your Task</h2><br/>
                    <TextField
                        label="Task"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        variant="outlined"
                        style={{ marginBottom: '10px' }}
                    />
                    <Button sx={{ width:'50%' ,padding:1 ,margin:2 ,borderRadius:2}} variant="contained" color="secondary" onClick={handleSaveTask}>Done</Button>
                </div>
        </Box>
      </Modal>
        </>
    );
}