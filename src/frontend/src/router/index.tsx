import { createBrowserRouter } from "react-router-dom";

import { App } from "../App";
import LandingPage from "../pages/LandingPage/index";
import AuthLayout from "../layout/auth/AuthLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UnauthorizeLayout from "../layout/auth/UnauthorizeLayout";
import AppLayout from "../layout/AppLayout";
import NotFound from "../pages/NotFound";
import ResetPassword from "../pages/ResetPassword";
import ConfirmEmail from "../pages/ConfirmEmail";
import ConfirmResetPassword from "../pages/ConfirmResetPassword";
import Overview from "../component/card/Overview";
import Dashboard from "../layout/Dashboard";
import ClassLayout from "../layout/ClassLayout";
import ClassroomMember from "../pages/class/components/ClassroomMember";
import GradeStructure from "../pages/class/components/GradeStructure";
import Grade from "../pages/class/components/Grade";

const BrowserRouter = createBrowserRouter([
	{
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				element: <UnauthorizeLayout />,
				children: [
					{
						path: "/",
						element: <LandingPage />,
					},
				],
			},
			{
				element: <UnauthorizeLayout />,
				children: [
					{
						path: "/sign-in",
						element: <SignIn />,
					},
					{
						path: "/sign-up",
						element: <SignUp />,
					},
					{
						path: "/reset-password",
						element: <ResetPassword />,
					},
					{
						path: "/reset-password/confirm",
						element: <ConfirmResetPassword />,
					},
					{
						path: "/activate-account/confirm",
						element: <ConfirmEmail />,
					},
				],
			},
			{
				element: <AuthLayout />,
				children: [
					{
						element: <AppLayout />,
						children: [
							{
								path: "/home",
								element: <Dashboard />,
							},
							{
								path: "/class/:id/*",
								element: <ClassLayout />,
								children: [
									{
										index: true,
										element: <AppLayout />,
									},
									{
										path: "overview",
										element: <Overview />,
									},
									{
										path: "work-class",
										element: <ClassroomMember />,
									},
									{
										path: "grade-structure",
										element: <GradeStructure />,
									},
									{
										path: "grade",
										element: <Grade />,
									},
								],
							},
						],
					},
				],
			},
		],
	},
]);

export default BrowserRouter;
