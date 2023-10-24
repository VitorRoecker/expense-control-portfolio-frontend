import { useRouter } from 'next/navigation'
import { useEffect } from "react"

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("Authentication")) {
            router.push("/auth");
        }
    }, [])

    return (
        <>
            <h1 className="text-white">
                HomePage
            </h1>
        </>
    )
}

export default Home;