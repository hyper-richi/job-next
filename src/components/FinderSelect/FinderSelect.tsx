"use client";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styles from "./FinderSelect.module.scss";

const FinderSelect = () => {
    const [age, setAge] = React.useState("");
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <div className={styles.filters__selects}>
            <FormControl fullWidth>
                <InputLabel>Локация</InputLabel>
                <Select value={age} label="Локация" onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default FinderSelect;
