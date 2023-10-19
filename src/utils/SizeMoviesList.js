import React from "react";

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
            setMovies(12);
            setMoreMovies(3);
        } else
            if (windowWidth < 1280 && windowWidth >= 768) {
                setMovies(8);
                setMoreMovies(2);
            } else
                if (windowWidth < 768) {
                    setMovies(5);
                    setMoreMovies(2);
                }

    }, [windowWidth]);

    function useHandleClickShowMore() {
        setMovies(movies + moreMovies);
    }

    return { movies, useHandleClickShowMore };
}