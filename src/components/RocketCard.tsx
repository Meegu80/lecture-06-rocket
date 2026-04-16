import type { Rocket } from "../pages/Home.tsx";
import { Link } from "react-router";
import styles from "./RocketCard.module.css"; // CSS Module 임포트

function RocketCard({ data }: { data: Rocket }) {
    return (
        <Link to={`/rocket/${data.id}`} className={styles.card}>
            <h3 className={styles.name}>{data.name}</h3>
            <div className={styles.country}>{data.country}</div>
        </Link>
    );
}

export default RocketCard;
