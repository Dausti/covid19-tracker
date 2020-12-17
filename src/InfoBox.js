import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

//... <-- spread operator to handle other props that may come through e.g. onClick
function InfoBox({ title, cases, total, isRed, active, ...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <CardContent>
                {/* card title */}
                <Typography className="infoBox__title" color="textSecondary">{title}</Typography>

                {/* # of cases */}
                <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>
                
                {/* total cases */}
                <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
                
            </CardContent>
        </Card>
    )
}

export default InfoBox
