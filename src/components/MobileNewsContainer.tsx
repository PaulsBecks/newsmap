import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import NewsEntry from "../types/NewsEntry";
import { Global } from "@emotion/react";
import { useState, useContext } from "react";
import NewsList from "./NewsList";
import DrawerDraggingContext from "../context/DrawerDraggingContext";

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const drawerBleeding = 56;

export default function MobileNewsContainer({
  news = [],
}: {
  news: NewsEntry[];
}) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const { setIsDrawerDragging } = useContext(DrawerDraggingContext);

  return (
    <Root
      onTouchStart={() => {
        console.log("touchstart");
        setIsDrawerDragging(true);
      }}
      onTouchEnd={() => {
        console.log("touchend");
        setIsDrawerDragging(false);
      }}
    >
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        onClick={toggleDrawer(!open)}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        hysteresis={0.1}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Container>
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              {news.length} Artikel in dieser Region
            </Typography>
          </Container>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Container>
            <NewsList news={news} />
          </Container>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
