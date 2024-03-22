import {useEffect, useState} from "react";
import BurgerMenu from "../../../src/components/burger.menu.component";
import * as React from "react";
import {useAuth} from "../../../src/contexts/auth.context";
import {Container} from "@mui/material";
import styles from "../../../src/styles/movie.module.css";
import {useTheme} from "@mui/material/styles";

export default function Movie() {
    const { user, logout } = useAuth();
    const [id, setId] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        setId(window.location.pathname.split('/').pop());
    }, []);

    return (
        <div>
            <BurgerMenu user={user} logout={logout}/>
            <Container disableGutters className={styles.root}
                   style={{backgroundColor: theme.palette.common.dark}}
            >

            </Container>
        </div>
    );
}