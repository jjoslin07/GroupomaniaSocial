import "./selectCategory.css";
import { Label } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export const SelectCategory = () => {
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			const data = await axios.get(`/posts/category/all`);
			setCategories(data.data.map((cat) => cat.name));
		} catch (e) {
			console.error(e);
		}
	}

	const updateSelectCategory = (e) => {
		setCategory(e.target.value);
	};

	return (
		<div>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="category">Category</InputLabel>
				<Select
					style={{ margin: 15, color: "primary" }}
					labelId="category"
					className="dropDownMenu"
					IconComponent={Label}
					onChange={updateSelectCategory}
					value={category}
					label="Category"
				>
					{categories.map((item) => (
						<MenuItem key={item.id} value={item}>
							{item}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};
