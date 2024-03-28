import {useEffect, useState} from "react";
import BurgerMenu from "../../../src/components/burger.menu.component";
import * as React from "react";
import {useAuth} from "../../../src/contexts/auth.context";
import {Box, Container, Paper} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {getPosterPath} from "../../../src/services/ui/utils.service";
import styles from "../../../src/styles/movie.module.css";

export default function Movie() {
    const theme = useTheme();
    const { user, logout } = useAuth();

    const [id, setId] = useState(null);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        setId(window.location.pathname.split('/').pop());
    }, []);

    useEffect(() => {
        if(!id) return;
        fetch(`/api/movies/${id}`)
            .then(response => response.json())
            .then(json => {
                setMovie(json.data.movie);
            });
    }, [id]);

    useEffect(() => {
        console.log(movie);
    }, [movie]);

    return (
        movie && (
            <>
                <BurgerMenu user={user} logout={logout}/>
                <Container disableGutters className={styles.root}>
                    <Container>
                        <Box className={styles.image} sx={{backgroundImage: getPosterPath(movie.poster_path)}}/>
                    </Container>
                    <Container className={styles.info} sx={{color:theme.palette.common.light}}>
                        <h1>{movie.title}</h1>
                    </Container>
                </Container>
            </>
        )
    );
}