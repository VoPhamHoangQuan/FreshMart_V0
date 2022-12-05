import React from "react";
import Header from "../Header";
import UserSidebar from "../UserSidebar";
import Footer from "../Footer";

export default function ProfileLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container_lg col_lg_10_12">
                <div className="row mt-1 mb-1">
                    <UserSidebar />
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
}
