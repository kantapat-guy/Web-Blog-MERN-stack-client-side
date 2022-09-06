import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Form from "./form";
import SinglePage from "./singlePage";
import EditForm from "./editForm";
import { Login } from "./login";
import AdminRoute from "../adminRoute";

const MyRoute = () => {

    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/blog/:slug" element={<SinglePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<AdminRoute />}>
                        <Route path="/create" element={<Form />} />
                        <Route path="/blog/edit/:slug" element={<EditForm />} />
                    </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoute