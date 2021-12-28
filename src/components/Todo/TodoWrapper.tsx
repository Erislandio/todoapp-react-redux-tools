import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Container, IconButton, List, ListItem, ListItemText, Box, Typography, TextField, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { remove, add } from '../../features/todo/todoSlider';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { TodoType } from "../../features/todo/todo.types";

const INITIAL_TODO_STATE = {
    description: '',
    finish: false,
    id: 0,
    name: ''
}

export default function TodoWrapper() {

    const todos = useSelector((state: RootState) => state.todo.todos);
    const dispatch = useDispatch();

    const [todo, setTodo] = useState<TodoType>(INITIAL_TODO_STATE);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(oldState => {
            return {
                ...oldState,
                [event.target.name]: event.target.value
            }
        })
    }, [todo])

    const disabledButton = useMemo(() => {
        return todo.name && todo.description;
    }, [todo]);

    const handleSubmit = () => {
        const newTodo = {
            ...todo,
            id: todos.length + 1
        }
        dispatch(add(newTodo))
        setTodo(INITIAL_TODO_STATE)
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                padding: 10
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: "sm",
                    justifyContent: 'space-between'
                }}
            >
                <TextField
                    onChange={handleChange}
                    required
                    name="name"
                    id="name"
                    label="Name"
                    value={todo.name}
                />
                <TextField
                    onChange={handleChange}
                    required
                    name="description"
                    id="description"
                    label="description"
                    value={todo.description}
                />
                <Button disabled={!disabledButton} onClick={() => handleSubmit()} variant="contained">
                    Adicionar
                </Button>
            </Box>

            <Box
                sx={{
                    marginTop: 2,
                    boxShadow: "",
                    border: "1px solid #dedede",
                    borderRadius: 2,
                }}
            >
                {
                    todos.length ? (
                        <List
                            sx={{
                                padding: 0,
                            }}
                        >
                            {
                                todos.map(todo => (
                                    <ListItem
                                        sx={{
                                            borderBottom: '1px solid #dedede',
                                            ":last-of-type": {
                                                border: 'none'
                                            }
                                        }}
                                        key={todo.id}
                                        secondaryAction={
                                            <IconButton onClick={() => dispatch(remove({ id: todo.id }))} edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={todo.description}
                                            secondary={todo.name}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 5,
                                flexDirection: 'column'
                            }}
                        >
                            <BookmarkAddIcon />
                            <Typography>
                                Sem Todos
                            </Typography>
                        </Box>
                    )
                }
            </Box>
        </Container>
    )
}