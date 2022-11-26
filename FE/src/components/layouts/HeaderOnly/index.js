import Footer from "../Footer";
import Header from "../Header";

function HeaderOnly({ children }) {
    return (
        <>
            <Header />
            <div className="container">{children}</div>
            <Footer />
        </>
    );
}

export default HeaderOnly;
