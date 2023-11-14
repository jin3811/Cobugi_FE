import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { addDays, isBefore, isAfter } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, DateRangePicker } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import Avatar from "@mui/material/Avatar";
import { Message } from "iconsax-react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

export default function ProductModal(props) {
    const [state, setState] = React.useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);
    React.useEffect(() => {
        setState([
            {
                startDate: new Date(),
                endDate: new Date(),
                key: "selection",
            },
        ]);
    }, []);
    const disabledDates = props.reservedUsersInfo?.reduce((acc, reserved) => {
        // 예약된 날짜 범위를 disabledDates 배열에 추가
        const reservedStartDate = new Date(reserved.reservedStartDate);
        const reservedEndDate = new Date(reserved.reservedEndDate);

        for (
            let date = reservedStartDate;
            isBefore(date, reservedEndDate);
            date = addDays(date, 1)
        ) {
            acc.push(date);
        }

        return acc;
    }, []);
    return (
        <Modal
            keepMounted
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={{ ...style, position: "relative" }}>
                <Box sx={{ width: 200 }}>
                    <img
                        alt="제품 이미지"
                        src={props.productImage}
                        style={{
                            width: 300,
                            height: 300,
                            objectFit: "contain",
                        }}
                    />
                </Box>
                <Typography
                    color="#707070"
                    sx={{
                        fontSize: "11px",
                        marginBottom: "5px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        src="/broken-image.jpg"
                        sx={{ width: 24, height: 24, marginRight: 1 }}
                    />
                    {props.writer}
                </Typography>
                <Typography
                    gutterBottom
                    sx={{ fontSize: "15px", fontWeight: "bold" }}
                    component="div"
                >
                    {props.productTitle}
                </Typography>
                <Typography
                    sx={{ fontSize: "13px", marginBottom: "20px" }}
                    color="#4470E1"
                >
                    {props.productPrice} 원/일
                </Typography>
                <Typography sx={{ fontSize: "13px" }} component="div">
                    {props.productDescription}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "11px",
                        marginTop: "40px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            marginRight: 1,
                        }}
                        component="div"
                    >
                        대여장소
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }} component="div">
                        {props.place}
                    </Typography>
                </Typography>
                {props.type === "lending" && (
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        locale={locales["ko"]}
                        ranges={state}
                        disabledDates={disabledDates}
                    />
                )}

                <Button
                    variant="contained"
                    // sx={{
                    //     verticalAlign: "bottom",
                    // }}
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        margin: 3,
                    }}
                    endIcon={<Message size="16" color="white" />}
                >
                    대화하기
                </Button>
            </Box>
        </Modal>
    );
}
