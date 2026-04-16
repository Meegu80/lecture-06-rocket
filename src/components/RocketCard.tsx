// 전달되는 props는 컴포넌트의 매개변수에서 받아줄 수 있음
import type { Rocket } from "../pages/Home.tsx";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

function RocketCard({ data }: { data: Rocket }) {
    // Home.tsx 화면에서 실질적으로
    // Rocket의 정보를 보여주는 컴포넌트
    return (
        <Link
            to={`/rocket/${data.id}`}
            className={twMerge(
                ["w-[calc((100%-60px)/4)]", "p-5", "box-border", "rounded-[18px]"],
                ["no-underline", "text-[#222]"],
                //["shadow-[0_6px_16px_rgba(0,0,0,0.08)]"]
                ["shadow-xl"],
                ["transition-all", "duration-500", "ease-linear"],
                ["hover:-translate-y-1", "hover:shadow-red-500"],
            )}>
            <h3 className={twMerge("mb-2.5")}>{data.name}</h3>
            <div className={twMerge("text-lg", "text-gray-600")}>{data.country}</div>
        </Link>
    );
}

export default RocketCard;
