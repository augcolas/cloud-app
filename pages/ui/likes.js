import BurgerMenu from "../../src/components/burger.menu.component";
import {useAuth} from "../../src/contexts/auth.context";
import {useEffect, useState} from "react";
import { Container, Grid, Typography} from "@mui/material";


export default function likes () {
    const { user, logout } = useAuth();

    const [likedMovies, setLikedMovies] = useState([]);

    useEffect( () => {
        if(!user) return;
        getLikedMovies();
    }, [user]);

    const getLikedMovies = async () => {
        const movies = [];
        for (const movieId of user.likes) {
            const response = await fetch(`/api/movies/${movieId}`);
            const json = await response.json();
            movies.push(json.data.movie);
        }
        setLikedMovies(movies);
    }


    return (

        <div>
            <BurgerMenu user={user} logout={logout}/>

            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5
            }}>
                <Grid container spacing={2}>
                    {likedMovies.map((movie, index) => (
                        <Grid item xs={12} key={index} sx={{
                            width: '100%',
                            height: '50px', // fixed height
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                            marginLeft: 2,
                        }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>- {movie.title}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}