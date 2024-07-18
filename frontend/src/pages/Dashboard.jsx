import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <Balance value={28382} />
            <Users />
        </div>
    );
};

export default Dashboard;
