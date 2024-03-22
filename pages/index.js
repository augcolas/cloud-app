import * as React from 'react';
import {
    Typography,
    Container,
    Grid,
    Card,
    CardActionArea,
    Box,
    InputBase,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from "react";
import { useAuth } from '../src/contexts/auth.context';
import BurgerMenu from '../src/components/burger.menu.component';
import { useTheme } from '@mui/material/styles';

import styles from '../src/styles/index.module.css';
export default function Index() {

    const theme = useTheme();
    const { user, logout } = useAuth();

    const [movies, setMovies] = React.useState([]);

    useEffect(() => {
        fetch('/api/movies')
            .then(response => response.json())
            .then(json => {
                setMovies(json.data)
                console.log(json.data)
            });
    }, []);

    return (
        <div>
                <BurgerMenu user={user} logout={logout}/>
                <Container disableGutters className={styles.root}
                    style={{backgroundColor: theme.palette.common.dark}}
                >
                    <Box className={styles.title}>
                        <Typography variant={"h6"} color={theme.palette.common.light}>
                            What would you like to discover ?
                        </Typography>
                        <Box className={styles.searchBar}
                             style={{backgroundColor: theme.palette.common.light_grey}}
                        >
                            <IconButton type="button" aria-label="search" style={{
                                color: theme.palette.common.light
                            }}>
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                placeholder={"Search"}
                                inputProps={{ style: { color: theme.palette.common.light } }}
                            />
                        </Box>
                    </Box>
                    <Container>
                        <Grid container spacing={4}>
                            {movies.map((movie) => (
                                <Grid item key={movie.id} xs={12} sm={6} md={4}>
                                    <Card>
                                        <CardActionArea>
                                            <Box className={styles.cardImage}
                                                sx={{
                                                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                                                }}
                                            >
                                                <Typography gutterBottom variant="h5" component="div"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                                    color: 'white',
                                                    padding: 2,

                                                }}
                                                >
                                                    {movie.title}
                                                </Typography>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Container>
        </div>
    );
}