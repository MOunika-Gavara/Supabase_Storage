import { AppBar, Toolbar, Typography, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";

const supaList = [
    {
        name: "Upload",
        path: "/upload"
    }
]

const Header = ({ children }) => {
    return (
        <div>
            <AppBar className="appbar"
                style={{ backgroundColor: "#50394c" }}>
                <Toolbar>
                    <Typography>
                        <strong>Tasks</strong>
                    </Typography>
                    <div>
                        {supaList.map((s) => (
                            <NavLink className="link" to={s.path}>
                                <ListItemButton style={{ color: "white", marginLeft: 1000 }}>
                                    <strong>{s.name}</strong>
                                </ListItemButton>
                            </NavLink>
                        ))}
                    </div>
                </Toolbar>
            </AppBar>
            <main>{children}</main>

        </div>
    )
}
export default Header;