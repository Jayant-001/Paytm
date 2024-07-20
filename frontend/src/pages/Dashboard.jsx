import { useRecoilValue } from "recoil";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { userState } from "../state/authState";

const Dashboard = () => {

    const user = useRecoilValue(userState);
    return (
        <div className="container mx-auto p-4">
            <Balance value={user.balance.toFixed(2)} />
            <Users />
        </div>
    );
};

export default Dashboard;
