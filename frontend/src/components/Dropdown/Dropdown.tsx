import { Dispatch } from "react";
import { styled, MenuProps, Menu, alpha } from "@mui/material";
import styles from "@components/Dropdown/Dropdown.module.scss"

interface DropdownProps {
    setLabel: Dispatch<string>;
    anchorEl: null | HTMLElement
    setAnchorEl: Dispatch<null | HTMLElement>;
}
const Dropdown = (props: DropdownProps) => {
    const open = Boolean(props.anchorEl);

    const options = [
        { key: 2, value: 'Architecture and Construction' },
        { key: 4, value: 'Business and Finance' },
        { key: 5, value: 'Education and Training' },
        { key: 6, value: 'Government and Public Administration' },
        { key: 7, value: 'Health Science' },
        { key: 8, value: 'Information Technology' },
        { key: 10, value: 'Marketing' },
    ];

    const handleClose = () => {
        props.setAnchorEl(null);
    };


    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={3}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            {...props}
        />
    ))(({ theme }) => ({
        "& .MuiPaper-root": {
            borderRadius: 0,
            marginTop: theme.spacing(-2),
            marginLeft: theme.spacing(-1),
            minWidth: "20vw",
            backgroundColor: "white",

            "& .MuiMenu-list": {
                color: "black",
                display: "flex",
                fontStyle: "bold",
                paddingLeft: 10,
                fontSize: 20
            },
            "& .MuiMenuItem-root": {
                "& .MuiSvgIcon-root": {
                    fontSize: 20,
                    color: "black",

                },
                "&:active": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity
                    )
                }
            }
        }
    }));
    return (
        <>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button"
                }}
                anchorEl={props.anchorEl}
                open={open}
                onClose={handleClose}
            >
                <div>
                    {options?.map((item) =>
                        <option className={styles.optionLabel_Container} key={item.key} value={item.value} onClick={(e) => {
                            props.setLabel(e.currentTarget.value);
                            props.setAnchorEl(null);
                        }}>
                            {item.value}
                        </option>
                    )}
                </div>
            </StyledMenu>
        </>
    )
}
export default Dropdown