import { useEffect, useState } from "react";
import RocketCard from "../components/RocketCard.tsx";
import styles from "./Home.module.css";

export type Rocket = {
    id: string;
    name: string;
    description: string;
    active: boolean;
    cost_per_launch: number;
    country: string;
    flickr_images: string[];
};

function Home() {
    const [loading, setLoading] = useState(true);
    const [rockets, setRockets] = useState<Rocket[]>([]);

    useEffect(() => {
        fetch("https://api.spacexdata.com/v4/rockets")
            .then(res => res.json())
            .then((data: Rocket[]) => {
                setRockets(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <h1 className={styles.title}>🚀 SpaceX Archive</h1>
            </header>

            <main className={styles.content}>
                {loading ? (
                    <div className={styles.loading}>SCANNING FOR ROCKETS...</div>
                ) : (
                    <div className={styles.flexContainer}>
                        {rockets.map(rocket => (
                            <div key={rocket.id} className={styles.flexItem}>
                                <RocketCard data={rocket} />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;
