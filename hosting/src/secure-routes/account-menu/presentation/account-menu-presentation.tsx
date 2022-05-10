import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

function useAccountMenuPresentationLogic() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return { menuIconElement: anchorEl, handleClose, handleMenuOpen: handleMenu };
}

export const AccountMenuPresentation: React.FC<{
  onSignOut: () => Promise<void>;
}> = ({ onSignOut }) => {
  const { menuIconElement, handleClose, handleMenuOpen } =
    useAccountMenuPresentationLogic();
  return (
    <>
      <IconButton
        size="large"
        aria-label="Minha conta"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id={"account-menu"}
        anchorEl={menuIconElement}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(menuIconElement)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            onSignOut().finally(() => {
              handleClose();
            });
          }}
        >
          Sair da conta
        </MenuItem>
      </Menu>
    </>
  );
};
