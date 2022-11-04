import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const ProfileEdit = () => {
  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title={<Typography variant="h5">Edytuj profil</Typography>}
      />
      <CardContent className="card-content">
        jestem konentent edytuj profil
      </CardContent>
    </Card>
  );
};

export default ProfileEdit;
