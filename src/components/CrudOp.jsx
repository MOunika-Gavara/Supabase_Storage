
import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { Button, Table, TableCell, TableHead, TableRow, TableBody } from "@mui/material";
import "./CrudOp.css"

const supabase = createClient("https://ujwwjqqefxojwljfvvos.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqd3dqcXFlZnhvandsamZ2dm9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzI4NzI1MywiZXhwIjoyMDA4ODYzMjUzfQ.TQY7KqF5KbpdgHw03P4B99NFribjloHIdTICIe1zZpk");

const CrudOp = () => {

    const [allTasks, setAllTasks] = useState([])

    const [enterTask, setEnterTask] = useState({
        id: '',
        name: ''
    })

    const [task, setTask] = useState({
        id: '',
        name: ''
    })
    const [taskName, setTaskName] = useState("");

    useEffect(() => {
        const callDb = async () => {
            await fetchTasks();
        };
        callDb();
    }, [])

    async function fetchTasks() {
        const { data } = await supabase
            .from('tasks')
            .select('*')
        setAllTasks(data)
    }

    function handleChange(event) {
        setEnterTask(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleChange2(event) {
        setTask(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    //Create a Task
    async function createTask() {
        await supabase
            .from('tasks')
            .insert({ name: enterTask.name })
        fetchTasks()
    }

    //Delete a task
    async function deleteTask(id) {
        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)
        fetchTasks()
        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
        }
    }

    function displayTask(Id) {
        allTasks.map((t) => {
            if (t.id == Id) {
                setTask({ id: t.id, name: t.name })
            }
        })
    }

    //Update a task
    async function updateTask(taskId) {
        const { data, error } = await supabase
            .from('tasks')
            .update({ id: task.id, name: task.name })
            .eq('id', taskId)
        console.log(data, "data")
        //await fetchTasks();
        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
        }
    }

    //Upsert a task
    async function upsertData(event, id) {
        event.preventDefault();
        console.log(taskName, "nameeee");
        const { data, error } = await supabase
            .from('tasks')
            .upsert(
                [{ id: id, taskName: taskName }],
                { onConflict: ['id'] }
            );
        console.log(data);
        if (error) {
            console.error(error);
            return;
        }
        if (data) {
            console.log(data);
        }
    }

    return (
        <div style={{ justifyContent: "center", marginLeft: 150 }}>
            <h3>Tasks</h3>
            <div style={{ display: "flex" }}>
                <form onSubmit={createTask}>
                    <input
                        type="text"
                        placeholder="create task"
                        name='name'
                        onChange={handleChange}
                    />
                    <Button type='submit'>Create</Button>
                </form>

                <form onSubmit={() => updateTask(task.id)}>
                    <input
                        type="text"
                        name="name"
                        placeholder="update task"
                        onChange={handleChange2}
                        defaultValue={task.name}>
                    </input>
                    <Button type='submit'>Update</Button>
                </form>

                <form type="submit" onSubmit={() => upsertData(taskName.id)}>
                    <input
                        type="text"
                        name="name"
                        placeholder="upsert task"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}>
                    </input>
                    <Button type="submit">upsert</Button >
                </form>
            </div>
            <Table style={{ border: "2px solid" }}>
                <TableHead>
                    <TableRow >
                        <TableCell>
                            <strong>Id</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Tasks</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Delete Task</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Edit Task</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allTasks.map((t) => (

                        <TableRow key={t.id} style={{ border: "2px solid" }}>
                            <TableCell>{t.id}</TableCell>
                            <TableCell>{t.name}</TableCell>
                            <TableCell>
                                <Button onClick={() => deleteTask(t.id)}>delete</Button >
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => displayTask(t.id)}>edit</Button >
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CrudOp;