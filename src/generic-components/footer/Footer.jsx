import styles from "./Footer.module.css";


export default function Footer() {
    const dataTimestamp = "07/09/2024 00:48 AM";
	return (
		<div className={styles["landing-page-footer"]}>
			<p>Based on registration status report {dataTimestamp}</p>
			<p>
				Developed by{" "}
				<a href="https://www.linkedin.com/in/khalidmamdou7/" target="_blank" rel="noreferrer">
					Khaled Mamdouh
				</a>{" "}
				and{" "}
				<a href="https://www.instagram.com/o.al.sharif/" target="_blank" rel="noreferrer">
					Omar Al Sharif
				</a>
			</p>
			<p>
				Feel free to contribute to the{" "}
				<a href="https://github.com/Khalidmamdou7/college-dry-run">Github Repository</a>
			</p>
		</div>
	);
}
