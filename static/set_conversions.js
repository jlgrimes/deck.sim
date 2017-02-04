function setConvert(abbr){
	if (abbr == "EVO")
		return "xy12";
	else if (abbr == "STS" || abbr == "STM")
		return "xy11";
	else if (abbr == "FAC" || abbr == "FCO")
		return "xy10";
	else if (abbr == "GEN")
		return "g1";
	else if (abbr == "BKP" || abbr == "BRP")
		return "xy9";
	else if (abbr == "BKT")
		return "xy8";
	else if (abbr == "AOR")
		return "xy7";
	else if (abbr == "ROS" || abbr == "RSK")
		return "xy6";
	else if (abbr == "DCR")
		return "dc1";
	else if (abbr == "PRC")
		return "xy5";
	else if (abbr == "PHF")
		return "xy4";
	else if (abbr == "FFI" || abbr == "FUF")
		return "xy3";
	else if (abbr == "FLF")
		return "xy2";
	else if (abbr == "XY ")
		return "xy1";
	else if (abbr == "KSS")
		return "xy0";
	else if (abbr == "PR" || abbr == " XY")
		return "xyp";
	else if (abbr == "LTR")
		return "bw11";
	else if (abbr == "PLB")
		return "bw10";
	else if (abbr == "PLF")
		return "bw9";
	else if (abbr == "PLS")
		return "bw8";
	else if (abbr == "BCR")
		return "bw7";
	else if (abbr == "DRV")
		return "dv1";
	else if (abbr == "DRX")
		return "bw6";
	else if (abbr == "DEX")
		return "bw5";
	else if (abbr == "NXD")
		return "bw4";
	else if (abbr == "NVI")
		return "bw3";
	else if (abbr == "EPO")
		return "bw2";
	else if (abbr == "BLW")
		return "bw1";
    else if (abbr == "SM" || abbr == "SAM" || abbr == "SUM")
        return "sm1";
}
