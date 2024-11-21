import { useEffect } from "react";


function WindowWidth({desktop}) {

    useEffect(() => {

        const handleResize = () => {

            window.innerWidth >= 1440 ? desktop(true) : desktop(false)

        }

        handleResize()
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    },[desktop])

    return ( 

        null

    );
}

export default WindowWidth;