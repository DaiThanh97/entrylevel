import { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { formatDateTime } from "../../../../utils/formatter";

export interface IProgramCardProps {
  thumbnailUrl: string;
  displayTitle: string;
  startDate: string;
  endDate: string;
}

const ProgramCard: React.FC<IProgramCardProps> = ({
  thumbnailUrl,
  displayTitle,
  startDate,
  endDate,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          pt: "56.25%",
        }}
        image={thumbnailUrl}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {displayTitle}
        </Typography>
        <Typography>
          {`${formatDateTime(startDate)} - ${formatDateTime(endDate)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(ProgramCard);
