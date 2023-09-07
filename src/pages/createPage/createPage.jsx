import React, { useContext, useState } from 'react';
import './createPage.css';
import background from '../../assets/fabrizio-conti-c3wsMnxQZDw-unsplash.jpg';
import { Context } from '../../Components/contexProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Create() {
  const [ToDos, setToDos] = useState({ task: '', time: '' });
  const [account, setAccount] = useContext(Context);
  const history = useNavigate();
  const [id, setId] = useState(1); // Initialize task ID with 1 and increment it

  // Define a function to handle adding a task
  const addToList = async () => {
    const newTask = {
      id: id, // Use the current taskId
      task: ToDos.task,
      time: ToDos.time,
    };

    // Send a POST request to your server to add the task to the user's profile
    const res = await fetch(`/addToList/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newTask,
      }),
      credentials: 'include',
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 401 || !data) {
      toast.error(data.error, {
        position: 'top-center',
        autoClose: 2000,
      });
    } else {
      toast.success(data.message, {
        position: 'top-center',
        autoClose: 2000,
      });
      // Update the user's account data with the new task
      setAccount(data.updatedAccount); // Assuming the server returns the updated account data
      // Increment the task ID for the next task
       setId(id + 1);
    }
  };

  return (
    <div
      className="bg-cover bg-center w-full h-screen background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="create shadow-2xl">
        <h1>ADD New Things</h1>
        <form className="menu" onSubmit={(e) => e.preventDefault()}>
          <div>
            <p>New Task:</p>
            <input
              type="text"
              placeholder="New Task"
              value={ToDos.task}
              onChange={(e) => setToDos({ ...ToDos, task: e.target.value })}
            />
          </div>
          <div>
            <p>Deadline:</p>
            <input
              type="time"
              placeholder="Time"
              value={ToDos.time}
              onChange={(e) => setToDos({ ...ToDos, time: e.target.value })}
            />
          </div>
        </form>
        <button
          className="hover:scale-105 duration-300"
          onClick={addToList}
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default Create;
