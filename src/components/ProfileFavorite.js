import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const ProfileFavorite = () => {
  return (
    <Card className="card-profile">
      <CardHeader
        className="card-header"
        title={<Typography variant="h5">Ulubione</Typography>}
      />
      <CardContent className="card-content">
        <Typography>W budowie...</Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileFavorite;
