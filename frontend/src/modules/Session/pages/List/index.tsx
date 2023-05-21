import * as React from "react";
import { debounce } from "lodash";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Link from "@mui/material/Link";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useSessionListing } from "../../queries";
import { SessionStatus } from "../../interface";
import { LoadingHolder } from "./styledComponents";
import ProgramCard from "../../components/ProgramCard";

const MAX_ITEMS = 50;
const SessionList: React.FC = () => {
  const [shortTitle, setShortTitle] = React.useState<string>();
  const [shortTitleInput, setShortTitleInput] = React.useState<string>();
  const debounceShortTitleSearch = React.useCallback(
    debounce((nextValue) => setShortTitleInput(nextValue), 1000),
    []
  );
  const [status, setStatus] = React.useState<SessionStatus>();
  const { data: sessionsResponse, isFetching } = useSessionListing({
    short_title: shortTitleInput,
    status,
  });

  const handleStatusChange = React.useCallback((event: SelectChangeEvent) => {
    const value = event.target.value as SessionStatus;
    setStatus(value === SessionStatus.ALL ? undefined : value);
  }, []);

  const handleShortTitleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setShortTitle(value);
      debounceShortTitleSearch(value);
    },
    []
  );

  const handleResetShortTitle = React.useCallback(() => {
    setShortTitle("");
    debounceShortTitleSearch(undefined);
  }, []);

  const sessions = sessionsResponse?.data.slice(0, MAX_ITEMS) ?? [];

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <img
            src="https://uploads-ssl.webflow.com/5fe3b288d04785204ec97dd9/609c6e65c121d40425fba999_Group%201551.svg"
            loading="lazy"
            id="logo"
            alt=""
          />
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <FormControl sx={{ m: 1, width: 300 }}>
              <TextField
                placeholder="Search"
                type="text"
                value={shortTitle}
                onChange={handleShortTitleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: shortTitle && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleResetShortTitle}
                    >
                      <CancelRoundedIcon />
                    </IconButton>
                  ),
                }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="status-select">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="status-select"
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                {Object.values(SessionStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {isFetching ? (
            <LoadingHolder>
              <CircularProgress size={60} />
            </LoadingHolder>
          ) : sessions.length === 0 ? (
            <Typography gutterBottom variant="h5" component="h2">
              No program found.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {sessions.reduce<JSX.Element[]>((accumulate, session) => {
                const { id, program, start_date, end_date } = session;
                // Incase program has multiple elements
                const programs = program.map((prg) => (
                  <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                    <ProgramCard
                      thumbnailUrl={prg.thumbnail_img_url}
                      displayTitle={prg.display_title}
                      startDate={start_date}
                      endDate={end_date}
                    />
                  </Grid>
                ));
                return accumulate.concat(programs);
              }, [])}
            </Grid>
          )}
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit">Thanh Nguyen</Link> {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </>
  );
};

export default React.memo(SessionList);
