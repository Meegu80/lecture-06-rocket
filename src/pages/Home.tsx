import { useEffect, useState } from "react";
import RocketCard from "../components/RocketCard.tsx";
import { twMerge } from "tailwind-merge";

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
            .then(response => response.json())
            .then((data: Rocket[]) => {
                setRockets(data);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div
                className={twMerge(
                    ["px-6", "py-10"],
                    ["text-white", "text-center"],
                    ["bg-linear-to-r from-red-500 to-blue-500"],
                )}>
                <h1 className={twMerge("m-0", "text-4xl", "font-bold")}>
                    🚀 SpaceX Rocket Archive
                </h1>
            </div>

            <div className={twMerge("py-8", "px-6")}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={twMerge("flex", "flex-wrap", "gap-5", "box-border")}>
                        {rockets.map((rocket, index) => {
                            return <RocketCard key={index} data={rocket} />;
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;
