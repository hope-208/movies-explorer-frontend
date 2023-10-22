import React from "react";
import {
    LENGHT_MOVIES_LIST_FOR_MORE_1280,
    LENGHT_MOVIES_LIST_FOR_MORE_768_LESS_1280,
    LENGHT_MOVIES_LIST_FOR_LESS_768,
    ROW_SIZE_3, ROW_SIZE_2
} from "../utils/constants.js";

export function useDefineWindowWidth() {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    const getWidthWindow = () => {
        const newWindowWidth = window.innerWidth;
        setWindowWidth(newWindowWidth);
    };

    const handleChangeWindow = () => {
        setTimeout(getWidthWindow, 1000);
    };

    React.useEffect(() => {
        window.addEventListener('resize', handleChangeWindow);

        return () => {
            window.removeEventListener('resize', handleChangeWindow);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return windowWidth;
}

export function useSizeMoviesList(windowWidth) {

    const [movies, setMovies] = React.useState(0);
    const [moreMovies, setMoreMovies] = React.useState(0);

    React.useEffect(() => {
        if (windowWidth >= 1280) {
            setMovies(LENGHT_MOVIES_LIST_FOR_MORE_1280);
            setMoreMovies(ROW_SIZE_3);
        } else
            if (windowWidth < 1280 && windowWidth >= 768) {
                setMovies(LENGHT_MOVIES_LIST_FOR_MORE_768_LESS_1280);
                setMoreMovies(ROW_SIZE_2);
            } else
                if (windowWidth < 768) {
                    setMovies(LENGHT_MOVIES_LIST_FOR_LESS_768);
                    setMoreMovies(ROW_SIZE_2);
                }

    }, [windowWidth]);

    function useHandleClickShowMore() {
        setMovies(movies + moreMovies);
    }


    return { movies, useHandleClickShowMore };
}