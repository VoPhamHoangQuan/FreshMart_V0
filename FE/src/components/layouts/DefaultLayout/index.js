import clsx from "clsx";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className={clsx("container_lg col_lg_10_12")}>
                <div className="row">
                    <Sidebar />
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
