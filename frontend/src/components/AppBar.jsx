import { Link } from "react-router-dom";

const Appbar = () => {
    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 text-xl items-center font-bold">
                PayTM App
            </div>
            <Link to="/profile" className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        J
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Appbar;
