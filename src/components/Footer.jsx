import React from "react";
import "./components.scss";

const Footer = () => {
	return (
		<div
			style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
			className="w-full h-[250px] px-12 md:px-16 lg:px-20 xl:px-24 mt-5 relative z-1000"
		>
			<div className="grid grid-cols-2  md:grid-cols-4 gap-x-4">
				<div className="text-slate-400 fontsml">
					<h1 className="mt-3">Audio Description</h1>
					<h1 className="mt-3">Investor Relations</h1>
					<h1 className="mt-3">Legal Notices</h1>
				</div>
				<div className="text-slate-400 fontsml">
					<h1 className="mt-3">Help Center</h1>
					<h1 className="mt-3">Jobs</h1>
					<h1 className="mt-3">Cookie Perferences</h1>
				</div>
				<div className="text-slate-400 fontsml ">
					<h1 className="mt-3">Gift Cards</h1>
					<h1 className="mt-3">Term of Use</h1>
					<h1 className="mt-3">Corporate Information</h1>
				</div>
				<div className="text-slate-400 fontsml">
					<h1 className="mt-3">Media Center</h1>
					<h1 className="mt-3">Privacy</h1>
					<h1 className="mt-3">Contact Us</h1>
				</div>
			</div>

			<a href="https://www.facebook.com/duongminhphuong078" className="text-white">
				Dương Minh Phương
			</a>
		</div>
	);
};

export default Footer;
