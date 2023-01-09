import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetShops } from "../services/shop";
import { ColorRing } from "react-loader-spinner";
import Loading from "./Loading";
import { GetAllUsers } from "../services/user";

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setError("");

    const populateUsers = async () => {
      const getUsersData = await GetAllUsers();
      if (!getUsersData.status) {
        setError(getUsersData.message);
        setLoading(false);
        return;
      }
      setUsers(getUsersData.content);
      setLoading(false);
    };

    setLoading(true);
    populateUsers();
  }, []);

  if (loading) return <Loading />;

  if (!users) return <Loading />;

  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title={<Typography variant="h5">Użytkownicy</Typography>}
      />
      {error && <div className="error">{error}</div>}
      <CardContent className="card-content">
        {users.map((user) => (
          <div
            key={user._id}
            style={{ borderBottom: "solid 1px black", padding: "10px 0" }}
          >
            <MuiLink component={Link} to={`/user/${user._id}`}>
              {user._id}
              <br />
              <strong>{user.email}</strong>
            </MuiLink>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
