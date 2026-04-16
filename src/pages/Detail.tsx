import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Rocket } from "./Home.tsx";
import { twMerge } from "tailwind-merge";

function Detail() {
    // API 주소 : https://api.spacexdata.com/v4/rockets/${id}
    // state -> loading, rocket
    const [loading, setLoading] = useState(true);
    const [rocket, setRocket] = useState<Rocket | null>(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
            .then(response => response.json())
            .then((data: Rocket) => {
                setRocket(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!rocket) {
        return <div>Not Found</div>;
    }

    return (
        <div
            className={twMerge(
                ["max-w-[800px]", "px-6", "py-10", "mx-auto"],
                ["flex", "flex-col", "box-border"],
            )}>
            <Link
                to={"/"}
                className={twMerge(
                    ["p-4", "mb-5"],
                    ["rounded-md", "bg-indigo-300", "text-indigo-800", "no-underline", "font-bold"],
                    ["hover:bg-indigo-400"],
                )}>
                &larr; Back to list
            </Link>

            <div className={twMerge(["rounded-2xl", "shadow-xl"], ["flex", "flex-col"])}>
                {rocket.flickr_images.length > 0 && (
                    <img
                        className={twMerge("rounded-t-2xl")}
                        src={rocket.flickr_images[0]}
                        alt={rocket.name}
                    />
                )}
                <div className={twMerge("p-6", "box-border")}>
                    <h2>{rocket.name}</h2>
                    <p>{rocket.description}</p>
                    <p>Cost per launch : ${rocket.cost_per_launch.toLocaleString()}</p>
                    <p>Country : {rocket.country}</p>
                </div>
            </div>
        </div>
    );
}

export default Detail;
