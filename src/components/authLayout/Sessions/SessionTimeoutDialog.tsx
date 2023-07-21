import React from "react";
import {
    Modal,
    Button,
    Typography,
    Slider,
} from "antd";
import classNames from "classnames";

// const useStyles = makeStyles(() => ({
//   dialog: {
//     borderRadius: 0
//   },
//   button: {
//     borderRadius: 0,
//     textTransform: "none",
//     padding: 5
//   },
//   logout: {
//     color: "#fff",
//     backgroundColor: red[500],
//     "&:hover": {
//       backgroundColor: red[700]
//     }
//   },
//   countdown: {
//     color: red[700]
//   }
// }));
type SessionTimeoutDialogProps = {
    open: boolean,
    countdown: number,
    onLogout: () => void,
};

export const SessionTimeoutDialog:React.FC<SessionTimeoutDialogProps> = ({ open, countdown, onLogout }) => {

    return (
        <>
            <Modal
                open={open}
                title="Title"
                transitionName="ad"
                footer={[
                    <Button
                    onClick={onLogout}
                    // className={classNames(classes.logout, classes.button)}
                >
                    Logout
                </Button>
                ]}
            >
                <Typography>
                    The current session is about to expire in {" "}
                    <span className={""}>{countdown}</span> seconds.
                </Typography>
            </Modal>
        </>

    );
};