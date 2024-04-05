import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useAuth } from '../src/contexts/auth.context';
import { useTheme } from '@mui/material/styles';
import BurgerMenu from '../src/components/burger.menu.component';
import {
    Typography,
    Container,
    Grid,
    Card,
    CardActionArea,
    Box,
    InputBase,
    IconButton,
    debounce,
    Pagination
} from '@mui/material';
import styles from '../src/styles/index.module.css';
import { getPosterPath } from "../src/services/ui/utils.service";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Index() {

    const theme = useTheme();
    const { user, logout } = useAuth();

    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [likedMovies, setLikedMovies] = useState(user?.likes || []);

    useEffect(() => {
        let url = '/api/movies?page='+currentPage;
        if(query!==''){
            url += '&query='+query;
        }
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setMovies(json.data.results)
                setCurrentPage(json.data.page)
                setTotalPages(json.data.total_pages)
            });
    }, [query,currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [currentPage]);

    useEffect(() => {
        if(user?.likes){
            setLikedMovies(user.likes);
        }
    }, [user]);

    const onChange = (e) => {
        setQuery(e.target.value);
        setCurrentPage(1);
    }
    const debouncedOnChange = debounce(onChange, 500);

    const onLike = async (movie) => {
        const url = '/api/movies/'+movie.id+'/likes';
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.token
            }
        })
            .then(response => response.json())
            .then(likes => {
                setLikedMovies(likes)
            });
    }

    const isLiked = (movie) => {
        if(!user){
            return null;
        }
        if(likedMovies.includes(movie.id)){
            return(
                <FavoriteIcon className={styles.cardLike} onClick={()=>onLike(movie)}/>
            )
        }
        else{
            return(
                <FavoriteBorderIcon className={styles.cardLike} onClick={()=>onLike(movie)}/>
            )
        }
    }

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
                            onChange={debouncedOnChange}
                        />
                    </Box>
                </Box>
                <Container>
                    <Grid container spacing={4} sx={{paddingBottom:10}}>
                        {movies.map((movie,index) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardActionArea
                                        onClick={() => window.location.href = `ui/movies/${movie.id}`}
                                    >
                                        <Box className={styles.cardImage}
                                            sx={{backgroundImage: getPosterPath(movie.poster_path)}}
                                        >
                                            <Container className={styles.cardBanner}
                                                onClick={(e) => {
                                                    //disable the card click
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <Typography gutterBottom variant="h5" component="div" className={styles.cardTitle}>
                                                    <span>{movie.title}</span>
                                                </Typography>

                                                {isLiked(movie)}
                                            </Container>

                                        </Box>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Container className={styles.pagination}>
                        <Pagination page={currentPage} count={totalPages}
                                    onChange={(e,page) => setCurrentPage(page)}
                        />
                    </Container>
                </Container>
            </Container>
        </div>
    );
}